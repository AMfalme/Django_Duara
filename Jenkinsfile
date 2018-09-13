pipeline {
  agent any
    stages {
      stage('Build') {
        steps {
          sh "docker build . -t gcr.io/robotic-fuze-194312/ddash:$BUILD_NUMBER"
        }
      }
    }
}
