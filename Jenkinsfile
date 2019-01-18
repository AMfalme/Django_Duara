/* import shared library */
@Library('jenkins-shared-library')_

pipeline {
  agent any

  environment {
    DOCKER_REGISTRY = "gcr.io"
    PROJECT_ID = "robotic-fuze-194312"
    NAME = "ddash"
    GIT_SHA = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    GCR_IMAGE = "$DOCKER_REGISTRY/$PROJECT_ID/$NAME"
    GCR_IMAGE_SHA = "$GCR_IMAGE:$GIT_SHA"
    GCR_IMAGE_LATEST = "$GCR_IMAGE:latest"

    EXPOSED_PORT="80"
    DOCKER_NET="docker-net"
    // Machines
    STAGING = "ddash.staging"
    DNS_SERVER = "10.0.0.2"
  }

  stages {
    stage('Build Image') {
      steps {
        script {
          docker.build(NAME, ".")
        }
      }
    }
    stage('Publish Image') {
      when {
          branch 'queens'
      }
      steps {
        script {
          withCredentials([[$class: 'FileBinding', credentialsId: "gcr-jenkins-ci-secret", variable: 'GCR_KEY_FILE']]) {
            sh "docker login -u _json_key --password-stdin https://gcr.io < $GCR_KEY_FILE \
            && docker tag $NAME $GCR_IMAGE_SHA \
            && docker push $GCR_IMAGE_SHA \
            && docker tag $NAME $GCR_IMAGE_LATEST \
            && docker push $GCR_IMAGE_LATEST"
          }
        }
      }
    }
    stage('Deploy Staging') {
        when {
            branch 'queens'
        }
        environment {
            ENV_FILE = "~/.env/ddash.staging.env"
            STAGE = "staging"
        }
        steps {
            script {
                def remote = [:]
                remote.name = "$STAGING"
                remote.host = "$STAGING"
                remote.allowAnyHosts = true
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-private-key', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                    remote.user = userName
                    remote.identityFile = identity
                    stage('Pull and Run image') {
                        sshCommand remote: remote, command: "docker stop $NAME || true"
                        sshCommand remote: remote, command: "docker rm $NAME || true"
                        sshCommand remote: remote, command: "docker pull $GCR_IMAGE_LATEST"
                        sshCommand remote: remote, command: "docker run --network $DOCKER_NET --name memcached -d memcached || true"
                        sshCommand remote: remote, command: "docker run -d -p $EXPOSED_PORT:$EXPOSED_PORT -e STAGE=$STAGE --network $DOCKER_NET --dns=$DNS_SERVER --env-file $ENV_FILE --restart=always --name $NAME $GCR_IMAGE_LATEST"
                        sshCommand remote: remote, command: "docker system prune -f"
                    }
                }
            }
        }
    }
  }
  post {
        always {
	          /* Use slackNotifier.groovy from shared library and provide current build result as parameter */
            slackNotifier(currentBuild.currentResult)
        }
  }
}
