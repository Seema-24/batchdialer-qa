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

post {
        success {
            slackSend color: "good", message: "Job: ${env.JOB_NAME} with BN #${env.BUILD_NUMBER} was successful after ${currentBuild.durationString.minus(' and counting')} (<${env.BUILD_URL}|Open>)",  attachments: "cypress/ProdReports/html/mochawesome-bundle.html"
        }
        failure {
            slackSend color: "danger", message: "Job: ${env.JOB_NAME} with BN #${env.BUILD_NUMBER} was failed after ${currentBuild.durationString.minus(' and counting')} (<${env.BUILD_URL}|Open>)"
        }
		unstable {
			slackSend color: "warning", message: "Job: ${env.JOB_NAME} with BN #${env.BUILD_NUMBER} was unstable after ${currentBuild.durationString.minus(' and counting')} (<${env.BUILD_URL}|Open>)"
		}
		always {
            slackSend color: 'always', message: "${currentBuild.result}"
        }
    }
}