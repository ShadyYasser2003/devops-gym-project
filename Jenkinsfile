pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = credentials('sonarqube-token')  // تأكد من إنشاء التوكن في Jenkins
    }
    tools {
        nodejs 'NodeJS'  // يجب أن يكون مطابقًا لاسم الأداة في إعدادات Jenkins
        sonarScanner 'SonarScanner'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repo/sonar-node.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}

