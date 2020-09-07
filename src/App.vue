<template>
  <div id="app">
    <AppHeader />

    <main>
      <AppNav />
      <router-view></router-view>
    </main>
    <div class='modal' v-if="notif.show">
      <div class='notif' :style="[notif.status === 'success' ? {'background-color':'#00ff00'}:{'background-color':'#ff4d4d'}]">
        <div class='title'>
          {{ notif.message }}
        </div>
        <div class='nav' @click="removeNotif()">
          x
        </div>
      </div>
    </div>
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
  },
  computed: {
    notif(){
      return this.$store.getters.getNotif
    }
  },
  methods: {
    removeNotif() {
      this.$store.dispatch('removeNotif')
    }
  },
  updated() {
    const path = this.$router.history.current.path
    this.$store.dispatch('changePath', path)
  },
  mounted() {
    const path = this.$router.history.current.path
    this.$store.dispatch('changePath', path)
  }
}
</script>

<style>
  main{
    display: flex;
  }

  .modal {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 10px;
  }

  .modal .notif {
    width: 25%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px 0px #f5f5f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal .nav {
    cursor: pointer;
  }
</style>
