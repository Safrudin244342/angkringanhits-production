<template>
  <div class='user'>
    <!-- Form Login -->
    <Form v-if="rule === ''"/>

    <!-- User Setting -->
    <div class='setting' v-if="rule === 'user' || rule === 'admin'">
      <h1>Form setting</h1>
    </div>
  </div>
</template>

<script>
import Form from '@/components/User/Form'

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
  components: {
    Form
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
