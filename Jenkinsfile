pipeline {
    agent any  // يحدد أن البايب لاين يمكن تشغيله على أي وكيل متاح

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner' // تعيين مسار أداة SonarScanner في Jenkins
    }

    tools {
        nodejs 'nodejs'  // تحديد أداة Node.js، ويجب أن يكون الاسم مطابقًا للإعدادات في Jenkins
    }

    stages {
        stage('Checkout SCM') { // مرحلة استخراج الكود من Git
            steps {
                git branch: 'main', // تحديد الفرع الرئيسي
                    url: 'http://localhost:3000/ShadyYasser2003/sonarqube.git' // رابط المستودع
            }
        }

        stage('Install Dependencies') { // مرحلة تثبيت التبعيات
            steps {
                sh 'npm install' // تثبيت الحزم المطلوبة من package.json
            }
        }
        
   /*       stage('Run Tests & Generate Coverage') { // مرحلة تشغيل الاختبارات وتوليد تقارير التغطية
            steps {
                sh 'npm test'  // تشغيل Mocha لاختبارات الوحدة
                sh 'npm run coverage'  // تشغيل Jest لإنشاء تقارير التغطية البرمجية
            }
        }

            stage('SonarQube Analysis') { // مرحلة تحليل الكود باستخدام SonarQube
             steps { 
                timeout(time: 5, unit: 'MINUTES') { // تحديد مهلة زمنية للمرحلة بـ 5 دقائق
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') { 
                       
                            withSonarQubeEnv('SonarQube') { // ضبط بيئة SonarQube
                                sh '''
                                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                                        -Dsonar.projectKey=sonar \
                                        -Dsonar.sources=. \
                                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                        -Dsonar.junit.reportPaths=coverage/mocha-results.xml \
                                        -Dsonar.coverage.cobertura.reportPath=coverage/cobertura-coverage.xml
                                '''
                            }
                            waitForQualityGate abortPipeline: true // انتظار نتائج SonarQube ووقف البايب لاين في حالة الفشل
                        
                    }
                }
            }
        }
        */
        stage('build image')
        {
            steps{
                sh '''

                
                docker build -t myproject:$GIT_COMMIT . 
                
                '''
            }
        }

    }
}
