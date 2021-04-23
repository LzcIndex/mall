<template>
  <div class="home-container">
      <router-view></router-view>
      <TabBar :badge="badge"/>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import { mapState } from 'vuex'
export default {
  components:{
    TabBar
  },
  computed:{
    ...mapState('classify',['counterMap']),
    badge(){
     let counters = Object.values(this.counterMap).reduce((pre,next)=> pre + next,0)
      if(counters > 99){
        counters = '99+'
      }
      return counters
    }
  }
}
</script>

<style>

</style>