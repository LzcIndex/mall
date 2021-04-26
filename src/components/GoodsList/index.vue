<template>
  <div class="goods-list-container">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type === 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: type === 'sale' }" @touchend="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type === 'price-up',
          'price-down': type === 'price-down',
        }"
        @touchend="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content" v-if="goodsList.length">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        head-height="80"
      >
        <van-list
          finished-text="没有更多了"
          :finished="finished"
          v-model="loading"
          @load="onLoad"
        >
          <Card v-for="(good, i) in goodsList" :key="i" :good="good" :num="counterMap[good.id]" @changeHandler="addCounter"/>
        </van-list>
      </van-pull-refresh>
    </div>
    <template v-else>
        <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        :description="`没有相关商品`"
      />
    </template>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Card,
  },
  data() {
    return {
      type: "all",
      isLoading: false,
      loading: false,
      finished: false,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("classify", ["goodsList",'counterMap',"currentSideBar"]),
    ...mapGetters("classify", ["isFinished"]),
  },
  methods: {
    onRefresh() {
      this.$store.commit("classify/resetGoodsList");
      this.currentPage = 0;
      this.finished = false;
      this.loading = false
      this.onLoad();
      this.isLoading = false;
    },
    changeType(type) {
      if (type === "price") {
        if (this.type === "price-up") {
          this.type = "price-down";
        } else {
          this.type = "price-up";
        }
      } else {
        this.type = type;
      }
      this.currentPage = 1;
      this.$store.commit("classify/resetGoodsList"); //类型切换,需要重置商品列表
      this.$store.dispatch("classify/getGoodList", {
        sort: this.type,
        page: this.currentPage,
      });
      this.finished = false;
      this.loading = false;
    },
    onLoad() {
      if(!this.currentSideBar){
        this.loading = false
        return
      }
      if (this.finished) {
        return;
      }
      this.currentPage++;
      this.$store.dispatch("classify/getGoodList", {
        page: this.currentPage,
        sort:this.type,
        cb: () => {
          this.loading = false
          if (this.isFinished) {
            this.finished = true;
          }
        },
      });
    },
    addCounter(id, value){
      this.$store.commit("classify/storageChange", { id, value });
    }
  },
  watch:{
    //一级导航变动时重新触发加载
    currentSideBar(){
      this.finished = false
       this.loading = false
      this.currentPage = 1
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list-container {
  position: fixed;
  width: 296px;
  top: 135px;
  left: 79px;
  bottom: 50px;
  overflow-y: auto;
  .list-header {
    position: sticky;
    top: 0;
    display: flex;
    height: 25px;
    width: 280px;
    padding: 0 8px;
    justify-content: flex-end;
    align-items: center;
    background: #fff;
    z-index: 100;
    & > div {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      color: #aaa;
      position: relative;
      &.active,
      &.price-up,
      &.price-down {
        color: #ff1a90;
        font-weight: bold;
      }
      .borderstyle() {
        content: "";
        position: absolute;
        right: 0;
        border: 4px solid transparent;
      }
      &.price {
        &::before {
          .borderstyle;
          top: 4px;
          border-bottom-color: #aaa;
        }
        &::after {
          .borderstyle;
          bottom: 4px;
          border-top-color: #aaa;
        }
        &.price-up::before {
          border-bottom-color: #ff1a90;
        }
        &.price-down::after {
          border-top-color: #ff1a90;
        }
      }
    }
  }
   /deep/.custom-image .van-empty__image {
    width: 70px;
    height: 70px;
  }
}
</style>>