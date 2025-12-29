pipeline{
	agent any
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

	stages {
		stage('Build') {
			steps {
				sh 'docker build -t jenkins-app:latest .'
			}
		}

		stage('Login') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}
		
		stage('View Images') {
			steps {
				sh 'docker images'
			}
		}
		
		stage('Docker Tag') {
			steps {
				sh 'docker tag jenkins-app 23127264/jenkins-app'
			}
		}

		stage('Push') {
			steps {
				sh 'docker push 23127264/jenkins-app'
			}
		}
		
		stage('Remove current container if it exists') {
			steps {
				sh 'docker rm -f jenkins-mmt || true'
			}
		}
		
		stage('Run in Container') {
			steps {
				sh 'docker run --publish 3000:3000 --name jenkins-mmt -d --rm 23127264/jenkins-app:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}