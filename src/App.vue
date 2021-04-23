<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created(){
    let counterMap = JSON.parse(localStorage.getItem('goods')) || {}
    this.$store.commit('classify/setCounterMap',counterMap)
  }
}
</script>

<style>
*{
  margin: 0;
}
#app {
 
}
</style>
