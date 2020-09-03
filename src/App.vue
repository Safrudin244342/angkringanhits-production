<template>
  <div id="app">
    <AppHeader />

    <main>
      <AppNav />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppNav from './components/Nav'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav
  }
}
</script>

<style>
  main{
    display: flex;
  }
</style>
