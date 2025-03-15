pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = credentials('SonarQube')  // تأكد من إنشاء التوكن في Jenkins
        SONAR_SCANNER_HOME = tool 'SonarScanner'    }

    
    tools {
        nodejs 'nodejs'  // يجب أن يكون مطابقًا لاسم الأداة في إعدادات Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'http://localhost:3000/ShadyYasser2003/sonarqube.git'
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
                sh '''
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=sonar \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${SONARQUBE_URL} \
                        -Dsonar.login=${SONARQUBE_TOKEN}
                '''
            }
        }
        
    }
}
