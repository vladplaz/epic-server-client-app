<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
    <notifications/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  mounted() {
    this.$store.dispatch('loginFromStore')
  },
  components: {
    Navbar
  }
}
</script>
