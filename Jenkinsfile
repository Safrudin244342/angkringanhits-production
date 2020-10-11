def builderDocker

pipeline {

  agent any

  stages {
    
    stage('build project') {

      steps {
        nodejs('yarn') {
          sh 'yarn install'
          echo 'build finish'
        }
      }
    }

    stage('build docker image') {
      
      steps {
        script {
          if (env.GIT_BRANCH == 'master') {
            api_host = '100.26.51.189'
          } else if (env.GIT_BRANCH == 'dev') {
            api_host = '34.205.68.49'
          } else {
            api_host = '52.90.170.145'
          }

          commitHash = sh (script : "git log -n 1 --pretty=format:'%H'", returnStdout: true)
          builderDocker = docker.build("244342/angkringanfrontend:${commitHash}", "--build-arg api_host=http://${api_host}/api", "./Dockerfile")
        }
      }

    }

    stage('push image') {

      steps {
        script {
          builderDocker.push("${env.GIT_BRANCH}")
        }
      }

    }

    stage('deploy') {
      when {
        expression {
          env.GIT_BRANCH == 'dev' || env.GIT_BRANCH == 'master'
        }
      }

      steps {
        
        script {
          if (env.GIT_BRANCH == 'master') {
            server = 'angkringan-production'
          } else if (env.GIT_BRANCH == 'dev') {
            server = 'angkringan-dev'
          }

          sshPublisher(
            publishers: [
              sshPublisherDesc(
                configName: "${server}",
                verbose: false,
                transfers: [
                  sshTransfer(
                    execCommand: "docker pull 244342/angkringanfrontend:${env.GIT_BRANCH}",
                    execTimeout: 120000
                  )
                ]
              )
            ]
          )
        }

      }
    }

    stage('remove local images') {
      
      steps {
        script {
          sh("docker image rm 244342/angkringanfrontend:${commitHash}")
          sh("docker image rm 244342/angkringanfrontend:${env.GIT_BRANCH}")
        }
      }

    }

  }
}