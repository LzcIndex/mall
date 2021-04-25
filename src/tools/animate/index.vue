<template>
  <div
    class="item"
    v-if="exist"
    :style="{
      width:width + 'px',
      height:height + 'px',
      transform: `translate(${moveX}px,${moveY}px) scale(${sx},${sy})`,
      opacity,
    }"
  >
    <img :src="src">
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
  .item {
    position: fixed;
    transition: all .7s;
    z-index: 100;
    top: 0;
    left: 0;
    transform-origin: 5% 0%;
  }
  .item > img {
    width: 100%;
    border-radius: 50%;
  }
</style>