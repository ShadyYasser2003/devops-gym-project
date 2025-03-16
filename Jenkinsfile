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
        
        stage('Run Tests & Generate Coverage') {
            steps {
                sh 'npm test'  // تشغيل Mocha
                sh 'npm run coverage'  // تشغيل Jest لتوليد تقارير التغطية
            }
        }

        stage('SonarQube Analysis') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') { 
                    withSonarQubeEnv('SonarQube') {
                        // استخدام catchError لجعل المرحلة UNSTABLE عند الفشل
                            sh '''
                                ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                                    -Dsonar.projectKey=sonar \
                                    -Dsonar.sources=. \
                                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                    -Dsonar.junit.reportPaths=coverage/mocha-results.xml \
                                    -Dsonar.coverage.cobertura.reportPath=coverage/cobertura-coverage.xml
                            '''
                            waitForQualityGate abortPipeline: true
                        
                    }
                }
            }
        }
    }
}