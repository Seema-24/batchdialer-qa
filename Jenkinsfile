pipeline {
  agent any
    
  tools {nodejs "Node14"}
    
  stages {
     
    stage('Build') {
      steps {
        sh 'npm run report:firstPromoter'
      }
    }  
  }
}
