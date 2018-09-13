pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
          script {
            docker.build "${env.DOCKER_REGISTRY}/${env.JOB_NAME}:${env.BUILD_NUMBER}"
          }
        }
      }
    }
}
