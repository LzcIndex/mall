<template>
  <div class="search-container">
    <div class="search-head">
      <van-icon
        name="arrow-left"
        class="arr-left"
        @click="$router.goBack()"
      ></van-icon>
      <van-search
        class="search-inp"
        v-model="value"
        show-action
        :placeholder="placeholder"
        @search="onSearch"
        @input="onInput"
        @focus="onFocus"
        autofocus
      >
        <template #action>
          <div @touchend="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="!showList">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          :title="item"
          @click="onSearch(item)"
        >
          <template #title>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-card" v-else>
      <van-list
        finished-text="没有更多了"
        :finished="finished"
        v-model="loading"
        @load="onLoad"
      >
        <Card
          v-for="(good, i) in goodsList"
          :key="i"
          :good="good"
          :num="counterMap[good.id]"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { likeSearch, search } from "@/api/search";
import Card from "@/components/Card";
import { mapState } from "vuex";
export default {
  components: {
    Card,
  },
  data() {
    return {
      value: "",
      placeholder: "酒",
      timer: null,
      page: 1,
      size: 5,
      finished: false,
      loading: false,
      goodsList: [],
      likeList: [],
      showList:false,
      total:0
    };
  },
  computed: {
    ...mapState("classify", ["counterMap"]),
    badge() {
      let counters = Object.values(this.counterMap).reduce(
        (pre, next) => pre + next,
        0
      );
      if (counters > 99) {
        counters = "99+";
      }
      return counters;
    },
  },
  methods: {
    formatHTML(str) {
      const reg = new RegExp(this.value, "g");
      return str.replace(reg, this.value.fontcolor("red"));
    },
    async onLoad() {
      this.page++
      let resp = search(this.value,this.page,this.size)
      this.total = resp.total
      this.goodsList = [...this.goodsList,...resp.list]
      this.showList = true
    },
    async onSearch(val) {
      if (val && typeof val == "string") {
        this.value = val;
      }
      let resp = await search(this.value, this.page, this.size);
      this.showList = true
      console.log(resp);
    },
    onInput() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(async () => {
        let resp = await likeSearch(this.value.trim() || this.placeholder);
        console.log(resp);
        clearTimeout(this.timer);
        this.timer = null;
      }, 300);
    },
    onFocus() {
      this.showList = false
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .search-inp {
      flex: 1;
    }
  }
  like-search {
    position: relative;
    top: 50px;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
}
</style>>