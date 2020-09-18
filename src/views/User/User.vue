<template>
  <div class='user'>
    <!-- Form Login -->
    <Form v-if="rule === ''" :showModal='this.changeModal'/>

    <!-- User Setting -->
    <div class='setting' v-if="rule === 'user' || rule === 'admin'">
      <h1>Form setting</h1>
    </div>

    <Register :showModal='showModal' :closeModal='this.changeModal'/>
  </div>
</template>

<script>
import Form from '@/components/User/Form'
import Register from '@/components/User/Register'

export default {
  name: 'user',
  computed: {
    rule() {
      return this.$store.getters.getRule
    },
    token() {
      return this.$store.getters.getToken
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  components: {
    Form,
    Register
  },
  methods: {
    changeModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>
  .user {
    margin-top: 80px;
    margin-left: 70px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
