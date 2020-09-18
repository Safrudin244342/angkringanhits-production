<template>
  <div class='modal' v-if="showModal">
    <div class='register'>
    
      <div class='header'>
        <div class="title">
          Register
        </div>

        <div class="navigation">
          <button @click="closeModal()">
            x
          </button>
        </div>
      </div>

      <div class='body'>
        
        <div class="item">  
          <div class="title">Username</div>
          <div class="action">
            <input type="text" v-model="username">
          </div>
        </div>

        <div class="item">  
          <div class="title">Password</div>
          <div class="action">
            <input type="password" v-model="password">
          </div>
        </div>

      </div>

      <div class='footer'>
        <button style="background-color: #F24F8A;" @click="closeModal()">Cancel</button>
        <button style="background-color: #57CAD5;" @click="register()">Register</button>
      </div>
    
    </div>
  </div>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  props: {
    closeModal: {
      type: Function,
      require: true
    },
    showModal: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      axios.post(process.env.VUE_APP_API + '/user', { username: this.username, password: this.password })
        .then(res => {
          if (res.data.error) return this.$store.dispatch('showNotif', { message: res.data.errMsg, status: 'error', show: true })
          this.$store.dispatch('showNotif', { message: 'Success', status: 'success', show: true })
          this.closeModal()
          this.username = ''
          this.password = ''
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  .modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 20px;
    z-index: 1;
  }

  .modal .register{
    justify-self: center;
    width: 35%;
    height: auto;
    background-color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
  }

  .register .header{
    display: flex;
    justify-content: space-between;
  }

  .register .header .title{
    font-size: 20pt;
  }

  .register .header .navigation{
    display: flex;
    justify-content: flex-end;
  }

  .register .header .navigation button{
    border: none;
    font-size: 20pt;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
  }

  .register .body .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .register .body .item .title{
    width: 40%;
    font-size: 15pt;
  }

  .register .body .item .action{
    flex: 1;
  }

  .register .body .item .action input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-weight: bold;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
    border: 0px;
    border-radius: 10px;
    height: 40px;
  }

  .register .footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .register .footer button{
    margin: 5px;
    border: none;
    color: white;
    font-weight: bold;
    padding: 10px;
    width: 100px;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
