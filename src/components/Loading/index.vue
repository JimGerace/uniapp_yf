<template>
  <view class="loading_box_">
    <view class="line _1"></view>
    <view class="line _2"></view>
    <view class="line _3"></view>
    <view class="line _4"></view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading_box_ {
  display: flex;
  align-items: flex-end;
  column-gap: 10%;
  width: 50rpx;
  height: 50rpx;

  .line {
    width: 17.5%;
    height: 0;
    border-radius: 10rpx 10rpx 0 0;
    background-color: #df2f27;

    &._1 {
      height: 10%;
      animation: sliderHeight 1.5s infinite;
    }
    &._2 {
      animation: sliderHeight 1.5s 0.3s infinite;
    }
    &._3 {
      height: 20%;
      animation: sliderHeight 1.5s 0.5s infinite;
    }
    &._4 {
      height: 30%;
      animation: sliderHeight 1.5s 0.2s infinite;
    }
  }
}

@keyframes sliderHeight {
  0% {
    height: 10%;
  }
  50% {
    height: 100%;
  }
  100% {
    height: 20%;
  }
}
</style>
