pipeline {
    agent any

    environment {
        APP_NAME        = 'test-events'
        DOCKER_REGISTRY = 'https://registry-1.docker.io'          // Ganti dengan registry kamu
        IMAGE_NAME      = "${DOCKER_REGISTRY}/${APP_NAME}"
        IMAGE_TAG       = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        DOCKER_CREDS    = credentials('docker-registry-creds')  // ID credentials di Jenkins
        NODE_VERSION    = '18'
    }

    tools {
        nodejs "NodeJS-${NODE_VERSION}"   // Harus sudah dikonfigurasi di Jenkins → Global Tools
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {

        // ─────────────────────────────────────────────
        // Stage 1: Checkout
        // ─────────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo "========== Checkout Source Code =========="
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    echo "Commit: ${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        // ─────────────────────────────────────────────
        // Stage 2: Install Dependencies
        // ─────────────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                echo "========== Installing Dependencies =========="
                sh '''
                    node --version
                    npm --version
                    npm install
                    npm ci --prefer-offline
                '''
            }
        }

        // ─────────────────────────────────────────────
        // Stage 3: Lint (opsional, pakai ESLint bawaan CRA)
        // ─────────────────────────────────────────────
        stage('Lint') {
            steps {
                echo "========== Running ESLint =========="
                sh 'npx eslint src/ --ext .js,.jsx --max-warnings=0 || true'
            }
        }

        // ─────────────────────────────────────────────
        // Stage 4: Unit Test
        // ─────────────────────────────────────────────
        // stage('Test') {
        //     steps {
        //         echo "========== Running Unit Tests =========="
        //         sh '''
        //             CI=true npm test -- \
        //                 --coverage \
        //                 --watchAll=false \
        //                 --forceExit \
        //                 --reporters=default
        //         '''
        //     }
        //     post {
        //         always {
        //             // Publish coverage report jika tersedia
        //             publishHTML(target: [
        //                 allowMissing         : true,
        //                 alwaysLinkToLastBuild: true,
        //                 keepAll              : true,
        //                 reportDir            : 'coverage/lcov-report',
        //                 reportFiles          : 'index.html',
        //                 reportName           : 'Coverage Report'
        //             ])
        //         }
        //     }
        // }

        // ─────────────────────────────────────────────
        // Stage 5: Build React App
        // ─────────────────────────────────────────────
        stage('Build React App') {
            steps {
                echo "========== Building React App =========="
                sh 'CI=false npm run build'
            }
            post {
                success {
                    echo "React build artifact tersedia di folder: build/"
                }
            }
        }

        // ─────────────────────────────────────────────
        // Stage 6: Build Docker Image
        // ─────────────────────────────────────────────
        stage('Build Docker Image') {
            steps {
                echo "========== Building Docker Image =========="
                script {
                    docker.build(
                        "${IMAGE_NAME}:${IMAGE_TAG}",
                        "--label git-commit=${env.GIT_COMMIT_SHORT} \
                         --label build-date=\$(date -u +%Y-%m-%dT%H:%M:%SZ) \
                         --no-cache ."
                    )

                    // Juga tag sebagai 'latest' jika branch main/master
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') {
                        sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        // ─────────────────────────────────────────────
        // Stage 7: Push Docker Image ke Registry
        // ─────────────────────────────────────────────
        stage('Push Docker Image') {
            steps {
                echo "========== Pushing Docker Image to Registry =========="
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-creds') {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()

                        if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') {
                            docker.image("${IMAGE_NAME}:latest").push()
                            echo "Tag 'latest' juga di-push karena branch: ${env.BRANCH_NAME}"
                        }
                    }
                }
            }
        }

        // ─────────────────────────────────────────────
        // Stage 8: Deploy (opsional, uncomment jika perlu)
        // ─────────────────────────────────────────────
        // stage('Deploy to Staging') {
        //     when {
        //         branch 'main'
        //     }
        //     steps {
        //         echo "========== Deploying to Staging =========="
        //         sh """
        //             docker pull ${IMAGE_NAME}:${IMAGE_TAG}
        //             docker stop ${APP_NAME} || true
        //             docker rm   ${APP_NAME} || true
        //             docker run -d \
        //                 --name ${APP_NAME} \
        //                 -p 3000:3000 \
        //                 --restart unless-stopped \
        //                 ${IMAGE_NAME}:${IMAGE_TAG}
        //         """
        //     }
        // }

    } // end stages

    // ─────────────────────────────────────────────────
    // Post Actions
    // ─────────────────────────────────────────────────
    post {
        always {
            echo "========== Cleaning Up =========="
            // Hapus image lokal agar tidak memenuhi disk
            sh """
                docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true
                docker rmi ${IMAGE_NAME}:latest       || true
            """
            cleanWs()
        }
        success {
            echo """
            ✅ Pipeline BERHASIL
            App      : ${APP_NAME}
            Image    : ${IMAGE_NAME}:${IMAGE_TAG}
            Branch   : ${env.BRANCH_NAME}
            Commit   : ${env.GIT_COMMIT_SHORT}
            Build No : ${env.BUILD_NUMBER}
            """
        }
        failure {
            echo """
            ❌ Pipeline GAGAL
            Branch   : ${env.BRANCH_NAME}
            Build No : ${env.BUILD_NUMBER}
            Silakan cek log di: ${env.BUILD_URL}
            """
            // Uncomment untuk notifikasi Slack / email:
            // slackSend channel: '#ci-cd', color: 'danger',
            //     message: "Build FAILED: ${APP_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
        unstable {
            echo "⚠️ Pipeline UNSTABLE — ada test yang gagal, periksa laporan test."
        }
    }
}
