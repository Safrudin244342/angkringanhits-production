def builderDocker

pipeline {

  agent any

  parameters {
    choice(name: 'CICD', choices: ['CICD', 'CI'], description: 'Pilih salah satu')
    booleanParam(name: 'RMI', defaultValue: true, description: 'Remove image after build')
  }

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
            api_host = 'https://3.90.0.218'
          } else if (env.GIT_BRANCH == 'dev') {
            api_host = 'https://3.90.0.218'
          } else {
            api_host = 'https://3.90.0.218'
          }

          sshPublisher(
            publishers: [
              sshPublisherDesc(
                configName: "ansible-master",
                verbose: false,
                transfers: [
                  sshTransfer(
                    execCommand: "ansible-playbook ansible/frontend/build.yml -e 'branch=${env.GIT_BRANCH}' -e 'ansible_python_interpreter=/usr/bin/python2.7' -e 'api_host=${api_host}'",
                    execTimeout: 120000
                  )
                ]
              )
            ]
          )
        }
      }

    }

    stage('deploy') {
      when {
        expression {
          env.GIT_BRANCH == 'dev' || env.GIT_BRANCH == 'master'
          params.CICD == 'CICD'
        }
      }

      steps {
        
        script {

          if (env.GIT_BRANCH == 'master') {
            host = "angkringanstag"
            port = "8080"
          } else if (env.GIT_BRANCH == 'dev') {
            host = "angkringanstag"
            port = "8080"
          }

          sshPublisher(
            publishers: [
              sshPublisherDesc(
                configName: "ansible-master",
                verbose: false,
                transfers: [
                  sshTransfer(
                    execCommand: "ansible-playbook -i ansible/hosts ansible/frontend/deploy.yml -e 'branch=${env.GIT_BRANCH}' -e 'host=${host}' -e 'port=${port}'",
                    execTimeout: 120000
                  )
                ]
              )
            ]
          )
        
        }
      }
    }

  }
}