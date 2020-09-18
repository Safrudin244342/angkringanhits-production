<template>
  <div class='form'>
    
    <div class='header'>
      <img src="@/assets/icon/user.png">
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
      <button style="background-color: #F24F8A;" @click="showModal()">Register</button>
      <button style="background-color: #57CAD5;" @click="Login()">Login</button>
    </div>

  </div>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'form login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    showModal: {
      type: Function,
      require: true
    }
  },
  methods: {
    Login() {
      console.log(this.username, this.password)
      axios.post(process.env.VUE_APP_API + '/user/auth', {
        username: this.username,
        password: this.password
      })
        .then(res => {
          if (res.data.error) {
            const newNotif = {
              message: res.data.errMsg,
              status: 'error',
              show: true
            }
            return this.$store.dispatch('showNotif', newNotif)
          }
          this.$store.dispatch('changeToken', res.data.values[0].token)
          this.$router.push({ path: '/' })
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  .form {
    width: 35%;
    height: auto;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
    margin: 20px;
  }

  .form .header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .form .header img {
    width: 80px;
    height: 80px;
  }

  .body{
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .body .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .body .item .title{
    width: 40%;
    font-size: 15pt;
  }

  .body .item .action{
    flex: 1;
  }

  .body .item .action .dropdown, .body .item .action input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-weight: bold;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
    border: 0px;
    border-radius: 10px;
    height: 40px;
  }

  .footer{
    display: flex;
    justify-content: flex-end;
  }

  .footer button{
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
