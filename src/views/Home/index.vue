<template>
  <div class="home-container">
      <router-view></router-view>
      <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  components:{
    TabBar
  }
}
</script>

<style>

</style>