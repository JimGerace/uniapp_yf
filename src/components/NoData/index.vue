<template>
  <view class="noData_container">
    <image
      class="icon_noData"
      src="@/static/images/common/icon_nodata.png"
      mode="widthFix"
    />
    <text class="text_name">{{ label }}</text>
  </view>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "暂无数据~",
  },
});
</script>

<style lang="scss" scoped>
.noData_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 24rpx;

  .icon_noData {
    width: 200rpx;
  }

  .text_name {
    color: #999;
    font-size: 32rpx;
    margin-top: 24rpx;
  }
}
</style>
