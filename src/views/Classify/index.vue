<template>
  <div class="classify-container">
    <router-link tag="div" class="search-btn" to="/search">
      <van-icon name="search" />
      <div class="search-value">{{ place }}</div>
    </router-link>
    <Tab />
    <SideBar />
    <GoodsList />
    <template v-if="isLoading">
      <van-loading type="spinner" color="#ff1a90" vertical/>
    </template>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import SideBar from "@/components/sideBar";
import GoodsList from "@/components/GoodsList";
import { mapState } from 'vuex'
export default {
  components: {
    Tab,
    SideBar,
    GoodsList
  },
  data() {
    return {
      place: "荔枝水果9.99",
    };
  },
  computed:mapState('classify',['isLoading'])
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
    margin: 10.5px 10.5px 0;
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