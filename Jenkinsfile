/* import shared library */
@Library('jenkins-shared-library')_

pipeline {
  options { buildDiscarder(logRotator(numToKeepStr: '5')) }

  agent any

  environment {
    DOCKER_REGISTRY = "gcr.io"
    PROJECT_ID = "robotic-fuze-194312"
    NAME = "home"
    GIT_SHA = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    GCR_IMAGE = "$DOCKER_REGISTRY/$PROJECT_ID/$NAME"
    GCR_IMAGE_SHA = "$GCR_IMAGE:$GIT_SHA"
    GCR_IMAGE_LATEST = "$GCR_IMAGE:latest"
  }

  stages {
    stage('Build Image') {
      steps {
        script {
          docker.build(GCR_IMAGE, ".")
        }
      }
    }
    stage('Publish Image') {
      when {
        anyOf {
          branch 'master';
          branch 'release'
        }
      }
      steps {
        script {
          withCredentials([[$class: 'FileBinding', credentialsId: "gcr-jenkins-ci-secret", variable: 'GCR_KEY_FILE']]) {
            sh "docker login -u _json_key --password-stdin https://gcr.io < $GCR_KEY_FILE \
              && docker tag $GCR_IMAGE $GCR_IMAGE_SHA \
              && docker tag $GCR_IMAGE $GCR_IMAGE_LATEST \
              && docker push $GCR_IMAGE_SHA \
              && docker push $GCR_IMAGE_LATEST"
          }
        }
      }
    }
    stage('Deploy Staging') {
      when {
        branch 'master'
      }
      environment {
        STAGING_SWARM_MASTER_IP = "172.16.1.112"
        STAGING_SWARM_MASTER_PORT = "2335"
        DOCKER_COMPOSE_OVERRIDE = "docker-compose-staging.yml"
      }
      steps {
        script {
          def remote = [:]
          remote.name = "staging-worker0.maas"
          remote.host = "$STAGING_SWARM_MASTER_IP"
          remote.allowAnyHosts = true
          withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-private-key', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName'),]) {
            remote.user = userName
            remote.identityFile = identity
            sshCommand remote: remote, sudo: true, command: "mkdir -p /var/log/$NAME"
            sshCommand remote: remote, sudo: true, command: "chown -R daemon:daemon /var/log/$NAME"
          }

          docker.withServer("tcp://$STAGING_SWARM_MASTER_IP:$STAGING_SWARM_MASTER_PORT") {
            withCredentials([[$class: 'FileBinding', credentialsId: "gcr-jenkins-ci-secret", variable: 'GCR_KEY_FILE']]) {
              sh "docker login -u _json_key --password-stdin https://gcr.io < $GCR_KEY_FILE \
              && docker pull $GCR_IMAGE_LATEST \
              && docker stack deploy -c docker-compose.yml -c $DOCKER_COMPOSE_OVERRIDE $NAME --with-registry-auth"
            }
          }
        }
      }
    }
    stage ('Cleanup') {
      steps {
        sh "docker rmi $GCR_IMAGE_SHA || true"
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
