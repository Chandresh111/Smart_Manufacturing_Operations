pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code from GitHub
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Smart Factory Docker Image...'
                // This runs the actual Docker build command on the Jenkins server
                sh 'docker build -t smart-factory-app:latest .'
            }
        }
        
        stage('Simulate Deployment') {
            steps {
                echo 'Image built successfully! Ready for deployment.'
            }
        }
    }
}