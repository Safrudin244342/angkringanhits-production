<template>
  <div class='login'>
    <!-- Form Login -->
    <div class='form'>
      <h1>Form login</h1>
    </div>

    <!-- User Setting -->
    <div class='setting' v-if="rule === 'user' || rule === 'admin'">
      <h1>Form setting</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  computed: {
    rule() {
      return this.$store.getters.getRule
    }
  }  
}
</script>

<style scoped>
  .login {
    margin-top: 80px;
    margin-left: 70px;
  }
</style>
