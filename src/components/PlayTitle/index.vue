<template>
  <view class="play_title_container">
    <view class="left">
      <image
        class="icon_play"
        src="@/static/images/my/icon_play.png"
        mode="widthFix"
      />
      <text class="label">播放全部({{ total }})</text>
    </view>

    <uni-icons
      v-if="showSearchBtn"
      type="search"
      size="30"
      @click="handleClickEvent"
    ></uni-icons>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["clickEvent"]);
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  showSearchBtn: {
    type: Boolean,
    default: false,
  },
});

// 点击搜索图标
const handleClickEvent = () => {
  emit("clickEvent");
};
</script>

<style lang="scss" scoped>
.play_title_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16rpx 24rpx;
  border-bottom: 2rpx solid #ddd;

  .left {
    display: flex;
    align-items: center;
    column-gap: 12rpx;

    .icon_play {
      width: 60rpx;
    }
  }
}
</style>
