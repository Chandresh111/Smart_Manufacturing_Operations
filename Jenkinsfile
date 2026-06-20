pipeline {
    agent any
    
    environment {
        // Use Your Data
        AWS_REGION = 'ap-south-1' 
        REGISTRY_URL = '762185909305.dkr.ecr.ap-south-1.amazonaws.com'
        REPO_NAME = 'smart-factory-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building image for AWS...'
                sh 'docker build -t ${REGISTRY_URL}/${REPO_NAME}:latest .'
            }
        }
        
        stage('Push to AWS ECR') {
            steps {
                echo 'Authenticating and pushing to AWS...'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-ecr-creds', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL}
                    docker push ${REGISTRY_URL}/${REPO_NAME}:latest
                    '''
                }
            }
        }
    }
}