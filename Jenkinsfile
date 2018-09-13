pipeline {
  agent any

  environment {
    registryCredential = "duara-cloud"
    dockerImage = ''
  }

  stages {

    stage('Build Image') {
      steps {
        script {
          dockerImage = docker.build "${env.DOCKER_REGISTRY}/${env.JOB_NAME}:${env.BUILD_NUMBER}"
        }
      }
    }
    stage('Push Image') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
            dockerImage.push()
          }
        }
      }
    }

  }
}
