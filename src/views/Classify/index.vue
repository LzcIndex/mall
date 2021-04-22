<template>
  <div class="classify-container">
    <router-link tag="div" class="search-btn" to="/search">
      <van-icon name="search" />
      <div class="search-value">{{ place }}</div>
    </router-link>
    <Tab />
    <SideBar />
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import SideBar from "@/components/SideBar";
export default {
  components: {
    Tab,
    SideBar,
  },
  data() {
    return {
      place: "荔枝水果9.99",
    };
  },
};
</script>

<style lang="less" scoped>
.classify-container {
  width: 100%;
  font-size: 14px;
  min-height: 100vh;
  position: absolute;
  .search-btn {
    height: 31.5px;
    line-height: 31.5px;
    margin: 10.5px auto 0;
    background: #eee;
    border-radius: 10px;
    text-align: center;
    color: #a1a1a1;
    > * {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>>