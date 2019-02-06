/* import shared library */
@Library('jenkins-shared-library')_

pipeline {
  agent any

  environment {
    DOCKER_REGISTRY = "gcr.io"
    PROJECT_ID = "robotic-fuze-194312"
    NAME = "${env.JOB_NAME}"
    GIT_SHA = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    GCR_IMAGE = "$DOCKER_REGISTRY/$PROJECT_ID/$NAME"

    CONTAINER_PORT="80"
    PROD_HOST_PORT="8080"
    STAGING_HOST_PORT="9080"
    DOCKER_NET="docker-net"
    // Machines
    PROD_MACHINE = "ddash.staging"
    DEV_MACHINE = "diam.staging"
    DNS_SERVER = "10.0.0.2"
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
          branch 'master'
          branch 'release'
        }
      }
      steps {
        script {
          withCredentials([[$class: 'FileBinding', credentialsId: "gcr-jenkins-ci-secret", variable: 'GCR_KEY_FILE']]) {
            sh "docker login -u _json_key --password-stdin https://gcr.io < $GCR_KEY_FILE \
            && docker tag $NAME $GIT_SHA \
            && docker tag $NAME latest \
            && docker push $NAME \
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
