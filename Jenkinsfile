pipeline{
    agent {
        label 'workers'
    }

    environment {
       REGISTRY = credentials('inquiry-registry')
       IMAGE_NAME = credentials("inquiry-${env.BRANCH_NAME}-image")
       REGISTRY_CREDENTIALS = 'ecr:ap-southeast-1:inquiry'
       CLIENT_SSH_CREDENTIALS = "inquiry-${env.BRANCH_NAME}"
       SSH_USER_HOST = credentials("inquiry-${env.BRANCH_NAME}-host-user")
       SSH_SCRIPT = credentials("inquiry-${env.BRANCH_NAME}-script")
    }

    
    stages{
        stage('Checkout'){
            steps{
                checkout scm
            }
        }

        stage('Add Config files') {
            steps {
                configFileProvider([configFile(fileId: "${env.BRANCH_NAME}-env", targetLocation: '.env')]) {}
            }
        }

        stage('Build'){
            steps{
                script {
                    app = docker.build(env.IMAGE_NAME)
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script{
                    sh ('rm -f ~/.dockercfg ~/.docker/config.json || true')
                    docker.withRegistry(env.REGISTRY, env.REGISTRY_CREDENTIALS) {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sshagent(credentials: [env.CLIENT_SSH_CREDENTIALS]) {
                    sh """
                        ssh -t -t ${env.SSH_USER_HOST} -p 2345 -o StrictHostKeyChecking=no "${env.SSH_SCRIPT}"
                    """
                }
            }
        }
    }
}

def commitID() {
    sh 'git rev-parse HEAD > .git/commitID'
    def commitID = readFile('.git/commitID').trim()
    sh 'rm .git/commitID'
    commitID
}
