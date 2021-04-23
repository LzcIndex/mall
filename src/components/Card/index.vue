<template>
  <div class="card-container van-hairline--top-bottom">
    <div class="card-img">
      <img :src="good.images[0]" ref="img" />
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{ good.title }}</div>
      <div class="desc overflow-hidden">{{ good.desc }}</div>
      <div class="tags overflow-hidden">
        <div v-for="item in good.tags" :key="item">{{ item }}</div>
      </div>
      <div class="prices overflow-hidden">
        <div class="price-off">￥{{ good.priceOff || good.price }}</div>
        <div class="price" v-if="good.priceOff">￥{{ good.price }}</div>
      </div>
      <div class="counter">
        <div v-if="num" @touchend="counter(good.id, -1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div @touchend="counter(good.id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flyAnimation from '@/tools/animate'
export default {
  props: ["good", "num"],
  methods: {
    counter(id, value) {
      this.$store.commit("classify/storageChange", { id, value });
      if (value == 1) {
        this.fly();
      }
    },
    fly() {
      const shopCar = document.querySelector("#shop-car");
      const img = this.$refs.img;
      const { top:startY, left:startX } = img.getBoundingClientRect();
      const { top:carTop, left:carLeft } = shopCar.getBoundingClientRect();
      const { offsetHeight: carHeight, offsetWidth: carWidth } = shopCar;
      const { offsetHeight: height, offsetWidth: width } = shopCar;
      const endY = carTop + carHeight / 2
      const endX = carLeft + carWidth / 2
      flyAnimation({
        startY,
        startX,
        endY,
        endX,
        src:img.src,
        width,
        height
      })
    },
  },
};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    position: relative;
    flex: 1;
    > div:not(.smaller) {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        border: 1px solid #aaa;
        padding: 1px 2px 2px 2px;
        color: #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      .price-off {
        font-size: 14px;
        color: #ff1a90;
        font-weight: 600;
        margin-right: 5px;
      }
      .price {
        font-size: 12px;
        color: #aaa;
        text-decoration: line-through;
      }
    }
  }
  .counter {
    display: flex;
    position: absolute;
    bottom: 12px;
    right: 15px;
    justify-content: flex-end;
    align-items: center;
    > div:not(.num) {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>