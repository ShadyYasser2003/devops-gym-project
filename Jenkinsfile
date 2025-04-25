pipeline {
    agent any  // يحدد أن البايب لاين يمكن تشغيله على أي وكيل متاح

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner' // تعيين مسار أداة SonarScanner في Jenkins
        GITEA_TOKEN=credentials('gitea-credential')
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

        stage('Check User') {
          steps {
               sh 'whoami'
            }
        }
        stage('Test Docker Access') {
            steps {
                    sh 'docker info'
                }
            }
       
        stage('Install Dependencies') { // مرحلة تثبيت التبعيات
            steps {
                sh 'npm install' // تثبيت الحزم المطلوبة من package.json
            }
        }

     /*    stage('Run Tests & Generate Coverage') { // مرحلة تشغيل الاختبارات وتوليد تقارير التغطية
            steps {
                sh 'npm test'  // تشغيل Mocha لاختبارات الوحدة
                sh 'npm run coverage'  // تشغيل Jest لإنشاء تقارير التغطية البرمجية
            }
        }
 */
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

        stage('build image') {
            steps {
                sh ' docker build -t shady203/myproject:$GIT_COMMIT . '
            }
        }

        stage('Trivy Vulnerability Scanner') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') { //
                sh '''
                    trivy image shady203/myproject:$GIT_COMMIT \
                    --severity LOW,MEDIUM,HIGH \
                    --exit-code 0 \
                    --quiet \
                    --format json -o trivy-image-MEDIUM-results.json

                    trivy image shady203/myproject:$GIT_COMMIT \
                    --severity CRITICAL \
                    --exit-code 1 \
                    --quiet \
                    --format json -o trivy-image-CRITICAL-results.json
            '''

            }    }
            post {
                always {
                sh '''
                    trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                        --output trivy-image-MEDIUM-results.html trivy-image-MEDIUM-results.json

                    trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                        --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json

                    trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                        --output trivy-image-MEDIUM-results.xml trivy-image-MEDIUM-results.json

                    trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                        --output trivy-image-CRITICAL-results.xml trivy-image-CRITICAL-results.json
                '''
                    }
                }

        } 
        stage('push image to docker hub'){
                    steps{
                        withDockerRegistry(credentialsId: 'DockerHub-credentials', url: "" ) {
                        sh ' docker push  shady203/myproject:$GIT_COMMIT '
                    }
                }
            }


        /* stage('Deploy - AWS ec2')
            {
                when{
                    branch 'main'
                }
                steps{
                    script {
                        sshagent(['ssh access to aws']) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ec2-user@3.88.38.130 "
                                    if sudo docker ps -a | grep -q "solar-system" ; then
                                        echo " Container found . Stopping ... "
                                        sudo docker stop "solar-system" && sudo docker rm "solar-system"
                                        echo " Container stopped and removed . "
                                    fi
                                    sudo docker run --name solar-system \
                                    -p 3001:3001 -d shady203/myproject:$GIT_COMMIT

                                "
                            '''
                        }
                    }


                }
            } */


        stage('Exchange docker image in kubernetes') {
                steps {
                    sh '''
                        git clone -b main http://localhost:3000/ShadyYasser2003/sonarqube
                        ##### Replace Docker Tag #####
                        git checkout main
                        git checkout -b feature-${BUILD_ID}
                        sed -i "s#shady203/myproject:.*#shady203/myproject:${GIT_COMMIT}#g" kubernetes/deployment.yaml     
                        cat kubernetes/deployment.yaml
                        ##### Commit and Push to Feature Branch #####
                        git config --global user.email "shady@yasser.com"
                        git config --global user.name "shady feature"
                        git add .   
                        git commit -am "Updated docker image"
                        git push -u origin feature-${BUILD_ID}
                    '''
                }
            post {
                always {
                    script {
                        if (fileExists('sonarqube')) {
                            sh 'rm -rf sonarqube'
                        }
                    }
                }
            }
        }
    }
}