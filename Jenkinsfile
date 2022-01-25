pipeline {
  agent any
    
  tools {nodejs "Node12"}
    
  stages {
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh 'npm run report'
      }
    }  
  }
}
