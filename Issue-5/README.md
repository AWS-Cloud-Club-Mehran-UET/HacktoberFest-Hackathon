first i make the docker image the command is = docker run image_name
now when you push to Docker hub then first you make the repo the command is = docker tag image_name repo_name
Now we push to DOcker hub the command is = docker push repo_name

Now i run my application On AWS so the pipeline code i used that is 

pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/fk0786/dockerprojectms.git'
            }
        }
        stage('build') {
            steps {
                sh 'docker build -t $image .'
            }
        }
        stage('tag') {
            steps {
                sh 'docker tag $image $repos'
            }
        }
        stage('push') {
            steps {
                sh 'docker login -u user -p password'
                sh 'docker push $repos:latest'
            }
        }
    }
}
