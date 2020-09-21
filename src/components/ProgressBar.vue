<template>
  <vue-topprogress ref="topProgress"></vue-topprogress>
</template>

<script>

import { vueTopprogress } from 'vue-top-progress'

export default {
  mounted () {
    this.$store.dispatch('setupProgressBar', this.$refs.topProgress)
    // this.$store.getters.getProgressBar.start()

    // // Use setTimeout for demo
    // setTimeout(() => {
    //   this.$store.getters.getProgressBar.done()
    // }, 2000)
  },

  components: {
    vueTopprogress
  }
}
</script>