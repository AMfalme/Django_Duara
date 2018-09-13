pipeline {
  agent any

  environment {
    registryCredential = "duara-cloud Google Container Registry Account"
    dockerImage = "${env.DOCKER_REGISTRY}/${env.JOB_NAME}:${env.BUILD_NUMBER}"
  }

  stages {

    stage('Build Image') {
      steps {
        script {
          docker.build dockerImage 
        }
      }
    }
    stage('Push Image') {
      steps {
        script {
          withCredentials([[$class: 'FileBinding', credentialsId: "gcr-jenkins-secret", variable: 'GCR_KEY_FILE']]) {
            sh "docker login -u _json_key --password-stdin https://gcr.io < $GCR_KEY_FILE && docker push $dockerImage"
          } 
        }
      }
    }

  }
}
