<template>
  <div class="shopping-container">
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <Card
            :good="item"
            :isFly="true"
            :num="counterMap[item.id]"
            @changeHandler="addCounter"
          />
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      />
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${totalNum})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { mapState } from "vuex";
import { getGoodsByIds } from "@/api/shopping";
import Card from "@/components/Card";
export default {
  components: {
    Card,
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  created() {
    this.getAllData();
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  computed: {
    ...mapState("classify", ["counterMap"]),
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce(
        (pre, next) => pre + (this.counterMap[next.id] || 0),
        0
      );
      return res;
    },
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((pre, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100 || 0) + pre;
      }, 0);
      return res;
    },
  },
  methods: {
    async getAllData() {
      let value = Object.keys(this.counterMap);
      console.log(value.join());
      let resp = await getGoodsByIds(value.join());
      this.list = resp.list;
    },
    onSubmit() {},
    checkAll() {
      if (!this.$refs.checkboxGroup) {
        Toast("购物车没有任何有效商品");
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    del() {
      if (!this.result.length) {
        Toast("你沒有选中商品");
      }
      Dialog.confirm({ message: "您是否要删除已选中商品" })
        .then(() => {
          this.result.forEach((e) => {
            this.$store.commit("classify/storageChange", { id: e, value: -1 });
            this.list = this.list.filter((item) => {
              let index = this.result.findIndex((x) => x === item.id);
              if (index == -1) {
                return true;
              }
              this.result.splice(index, 1);
              return false;
            });
            if (this.list.length === 0) {
              this.checked = false;
            }
          });
        })
        .catch(() => {});
    },
    async addCounter(id, value) {
      if (this.counterMap[id] == 1 && value == -1) {
        Dialog.confirm({ message: "您是否要删除已选中商品" })
          .then(() => {
            this.list = this.list.filter((item) => item.id !== id);
          })
          .catch(() => {});
      }
      this.$store.commit("classify/storageChange", { id, value });
    },
  },
};
</script>

<style lang="less" scoped>
.shopping-container {
  .card-list {
    .card-box {
      display: flex;
      .check {
        margin: 0 15px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>