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
				sh 'docker tag jenkins-app 2312726423127316/jenkins-app'
			}
		}

		stage('Push') {
			steps {
				sh 'docker push 2312726423127316/jenkins-app'
			}
		}
		
		stage('Remove current container if it exists') {
			steps {
				sh 'docker rm -f jenkins-cicd || true'
			}
		}
		
		stage('Run in Container') {
			steps {
				sh 'docker run --publish 3000:3000 --name jenkins-cicd -d --rm 2312726423127316/jenkins-app:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}
}