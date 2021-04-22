<template>
  <div
    class="side-bar-container"
    ref="sideBarContainer"
    @touchstart="move = false"
    @touchmove="move = true"
  >
    <div
      class="item"
      v-for="(item, i) in sideBarList"
      :key="item"
      :class="{ active: index == i }"
      @touchend="scrollTo(item, i,$event)"
    >
      {{ i === 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moveTo from "@/mixin/moveTo";
export default {
  mixins: [moveTo],
  data() {
    return {
      index: "",
    };
  },
  computed: mapState("sideBar", ["sideBarList"]),
  methods: {
    scrollTo(value,i,e) {
       if (this.move) {
        return;
      }
      this.index = i;
      //计算滚动距离
      const { sideBarContainer } = this.$refs;
      const itemTop = e.target.getBoundingClientRect().top;
      const itemHeight = e.target.offsetHeight;
      const sideBarContainerHeight = sideBarContainer.offsetHeight;
      const pTop = sideBarContainer.getBoundingClientRect().top
      const end = itemTop + itemHeight / 2 - pTop - sideBarContainerHeight / 2
      this.moveTo(
        sideBarContainer.scrollTop,
        end,
        sideBarContainer,
        "scrollTop"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.side-bar-container {
  position: fixed;
  left: 0;
  top: 135px;
  bottom: 1.333333rem;
  width: 79px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f8f8f8;
  &::-webkit-scrollbar {
    width: 0;
    background: none;
  }
  .item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    font-size: 12px;
    &.active {
      font-weight: bold;
      color: #ff1a90;
      &::before {
        position: absolute;
        width: 6px;
        height: 18px;
        background: #ff1a90;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        content: "";
      }
    }
  }
}
</style>