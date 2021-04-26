<template>
  <div id="app">
    <transition
      :name="transitionName"
      :mode="$router.back ? 'out-in' : 'in-out'"
    >
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  created() {
    let counterMap = JSON.parse(localStorage.getItem("goods")) || {};
    this.$store.commit("classify/setCounterMap", counterMap);
  },
  watch: {
    $route(to, from) {
      if(to.name && !from.name){
        this.transitionName = ''
        return
      }
      console.log(to.name,from.name)
      if (to.name === "Classify" && from.name === "Search") {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
}
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all .3s ease-out;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}

</style>
