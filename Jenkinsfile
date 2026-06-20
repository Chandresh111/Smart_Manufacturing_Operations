pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // This tells Jenkins to pull the code from GitHub
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                echo 'Simulating Docker Build...'
                // We will add the actual "docker build" command here next
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Simulating automated testing...'
            }
        }
    }
}