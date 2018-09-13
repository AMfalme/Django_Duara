pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
          docker.build "gcr.io/robotic-fuze-194312/ddash:$BUILD_NUMBER"
        }
      }
    }
}
