pipeline {
  agent any
    
  tools {nodejs "Node14"}
    
  stages {
     
    stage('Build') {
      steps {
      sh 'npm install'
        sh 'npm run report:firstPromoter'
      }
    }  
    stage ('Upload report') {
        steps {
           sh 'aws s3 cp cypress/ProdReports/html/mochawesome-bundle.html s3://batch-qa-automation/firstpromoter/report.html'
        }
  }
  }
  post
  {
    always 
    {
        cleanWs()
    }
 }
}
