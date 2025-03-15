pipeline {
    agent any
    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'   
         }

    
    tools {
        nodejs 'nodejs'  // يجب أن يكون مطابقًا لاسم الأداة في إعدادات Jenkins
    }
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'http://localhost:3000/ShadyYasser2003/sonarqube.git'
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
                 withSonarQubeEnv('SonarQube') { // استخدام البيئة المعرفة في Jenkins
                    sh '''
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectKey=sonar \
                            -Dsonar.sources=. 

                '''
            }
        }
        
    }
}
