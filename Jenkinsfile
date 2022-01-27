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
            slackUploadFile credentialId: 'slack-test-devops-channel-notification-token' , channel: '#test-devops', filePath: 'cypress/ProdReports/html/mochawesome-bundle.html', initialComment: 'first promoter report'
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