<template>
  <view class="login_page">
    <image class="backImg" src="@/static/images/login/backImg.png" />

    <view class="title">现场监管移动服务平台</view>

    <view class="input_container">
      <view class="input_item">
        <text class="label">账号</text>
        <uni-easyinput
          v-model="state.userInfo"
          type="text"
          :styles="userInfoStyles"
          placeholderStyle="font-size: 28rpx;"
          placeholder="请输入账号"
          :suffixIcon="suffixIcon"
        />
      </view>

      <view class="input_item">
        <text class="label">密码</text>
        <uni-easyinput
          v-model="state.password"
          type="password"
          :styles="passwordStyles"
          placeholderStyle="font-size: 28rpx;"
          placeholder="请输入密码"
        />
      </view>

      <button type="default" @click="toLogin">登录</button>
    </view>

    <view class="footer">技术支持：广州粤建三和软件股份有限公司</view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
const state = ref({
  userInfo: "",
  password: "",
});

const userInfoStyles = computed(() => {
  return {
    borderColor: state.value.userInfo ? "#347bef" : "#ccc",
    backgroundColor: "#fff",
  };
});
const passwordStyles = computed(() => {
  return {
    borderColor: state.value.password ? "#347bef" : "#ccc",
    backgroundColor: "#fff",
  };
});
const suffixIcon = computed(() => {
  return state.value.userInfo.length >= 6 ? "checkmarkempty" : "";
});

// 点击登录按钮
const toLogin = () => {
  const tips = {
    userInfo: "请输入账号",
    password: "请输入密码",
  };

  for (let key in tips) {
    if (!state.value[key]) {
      uni.showToast({
        title: tips[key],
        icon: "none",
      });
      return;
    }
  }

  if (state.value.userInfo.length < 6) {
    uni.showToast({
      title: "请输入正确的账号",
      icon: "none",
    });
    return;
  }
};
</script>

<style scoped lang="scss">
.login_page {
  position: relative;
  width: 100vw;
  height: 100vh;

  .backImg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .title {
    color: #333;
    font-size: 45rpx;
    font-weight: bold;
    width: 100vw;
    padding-top: 200rpx;
    text-align: center;
    letter-spacing: 2rpx;
  }

  .input_container {
    width: 600rpx;
    margin: 100rpx auto 0;

    .input_item {
      width: 100%;
      margin-bottom: 60rpx;

      .label {
        display: inline-block;
        color: #333;
        font-size: 36rpx;
        margin-left: 30rpx;
        margin-bottom: 12rpx;
      }
    }

    button {
      color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 80rpx;
      background-color: #347bef;
    }
  }

  .footer {
    position: absolute;
    left: 50%;
    bottom: 40rpx;
    transform: translateX(-50%);
    color: #999;
    font-size: 28rpx;
    white-space: nowrap;
  }
}

:deep(.is-input-border) {
  padding: 0 4rpx 0 12rpx;
  border-radius: 40rpx;
}
:deep(.uni-icons) {
  color: #347bef !important;
}
</style>
