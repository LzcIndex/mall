<template>
  <van-tabbar route fixed>
    <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="apps-o" to="/home/classify"
      >分类</van-tabbar-item
    >
    <van-tabbar-item
      name="friends"
      icon="cart-o"
      to="/home/shopping"
      id="shop-car"
      :badge="badge" 
      >购物车</van-tabbar-item
    >
    <van-tabbar-item name="setting" icon="user-circle-o" to="/other"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  props:{
    badge:{
      type:[String , Number],
      default:''
    }
  }
};
</script>

<style>
</style>