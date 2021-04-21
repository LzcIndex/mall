<template>
  <div class="tab-container" ref="tabContainer">
    <div
      class="tab-item"
      v-for="(item, i) in menuList"
      :key="item.title"
      :class="{ active: active === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-box">
        <img :src="item.imgURL" />
      </div>
      <div class="title-box">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      move: false,
      timeOutMove:false,
      menuList: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
        },
        {
          title: "某手美食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
        },
        {
          title: "个人护理",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
      ],
    };
  },
  methods: {
    scrollTo(index, e) {
      console.log(this.move)
      if (this.move || this.timeOutMove) {
        return;
      }
      this.active = index;
      //计算移动距离
      const { tabContainer } = this.$refs;
      const containerWidth = tabContainer.offsetWidth;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      // tabContainer.scrollLeft += itemLeft + itemWidth / 2 - containerWidth / 2;
      this.moveTo(tabContainer.scrollLeft,itemLeft + itemWidth / 2 - containerWidth / 2,tabContainer)
    },
    moveTo(start, end, dom) {
      let dis = 0;
      let speed = 5;
      this.timeOutMove = true;
      if (end < 0) {
        speed *= -1;
      }
      let timer = setInterval(() => {
        dis += speed;
        dom.scrollLeft = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          dom.scrollLeft = start + end;
          clearInterval(timer);
          this.timeOutMove = false;
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-container {
  display: flex;
  height: 104px;
  overflow-x: auto;
  overflow-y: hidden;
  // scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .tab-item {
    flex-shrink: 0;
    width: 50px;
    padding: 10px 5px;
    text-align: center;
    .img-box {
      width: 100%;
      height: 50px;
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-radius: 50%;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        transform: translateY(-50%);
        position: relative;
        top: 50%;
      }
    }
    .title-box {
      margin-top: 5px;
      font-size: 12px;
    }
    &.active {
      .img-box {
        background: #fff;
        border-color: #d13193;
      }
      .title-box {
        color: #fff;
        background: #d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }
  }
}
</style>