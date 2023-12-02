<template>
  <view class="menu_options_container">
    <uni-popup ref="popRef" type="bottom">
      <view class="menu_handler_box">
        <view class="title">歌曲：{{ musicInfo.songName }}</view>

        <view
          class="menu_items"
          v-for="(item, index) in popupMenuList"
          :key="index"
        >
          <uni-icons :type="item.icon" size="25"></uni-icons>
          <text class="menu_name">{{ item.name }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, defineProps, defineExpose } from "vue";
import { cloundMenuList } from "@/utils/static.js";

const prop = defineProps({
  musicInfo: {
    type: Object,
    default: {},
  },
});
const popRef = ref(null);
const musicInfo = ref({});
const popupMenuList = ref([]);

// 展示菜单操作对话框
const showPopup = (val) => {
  musicInfo.value = { ...val };
  popupMenuList.value = cloundMenuList.map((item) => {
    return {
      ...item,
      name: item.name === "歌手" ? `歌手：${val.artist}` : item.name,
    };
  });
  popRef.value.open();
};

defineExpose({
  showPopup,
});
</script>

<style lang="scss" scoped>
.menu_handler_box {
  width: 100%;
  padding-bottom: 100rpx;
  border-radius: 50rpx 50rpx 0 0;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    padding: 24rpx 40rpx;
    border-bottom: 1px solid #ddd;
  }

  .menu_items {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80rpx;
    padding: 0 40rpx;

    .menu_name {
      color: #333;
      font-size: 30rpx;
      margin-left: 12rpx;
    }
  }
}
</style>
