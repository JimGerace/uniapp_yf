<template>
  <view class="login_page">
    <view class="backImg_container">
      <image
        class="icon_logo"
        src="@/static/logo_white.png"
        mode="scaleToFill"
      />
    </view>

    <view class="input_container">
      <view class="input_item">
        <text class="label">手机号</text>
        <uni-easyinput
          v-model="state.phone"
          type="number"
          :styles="userInfoStyles"
          placeholderStyle="font-size: 28rpx;"
          placeholder="请输入手机号"
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

      <button type="default" @click="toLogin" hover-class="btn_hover">
        登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { appStore } from "@/store/index.js";
import { computed, getCurrentInstance, ref } from "vue";

const regPhone = /^1[3-9]{1}[0-9]{9}$/;
const store = appStore();
const _this = getCurrentInstance().appContext.config.globalProperties;
const state = ref({
  phone: "",
  password: "",
});

const userInfoStyles = computed(() => {
  return {
    borderColor: state.value.phone ? "#347bef" : "#ccc",
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
  return regPhone.test(state.value.phone) ? "checkmarkempty" : "";
});

// 点击登录按钮
const toLogin = () => {
  if (!handleCheckInfo()) return;

  _this.$api.PhoneLogin(state.value).then((res) => {
    if (res.code == 200) {
      const { token, profile, cookie } = res;
      store.setToken(token);
      store.setCookie(cookie);
      store.setUserInfo(profile);

      uni.switchTab({
        url: "../my/my",
        success: () => {
          _this.$message({
            title: "登录成功！",
            icon: "success",
          });
        },
      });
    }
    console.log(res, "res");
  });
};

// 校验登录信息
const handleCheckInfo = () => {
  const tips = {
    phone: "请输入手机号",
    password: "请输入密码",
  };

  for (let key in tips) {
    if (!state.value[key]) {
      _this.$message({
        title: tips[key],
      });
      return false;
    }
  }

  if (!regPhone.test(state.value.phone)) {
    _this.$message({
      title: "请输入正确的手机号",
    });
    return false;
  } else if (state.value.password.length < 6) {
    _this.$message({
      title: "请输入正确的密码",
    });
    return false;
  }

  return true;
};
</script>

<style scoped lang="scss">
.login_page {
  position: relative;
  width: 100vw;
  height: 100vh;

  .backImg_container {
    position: absolute;
    top: 100rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 120rpx;
    height: 120rpx;
    padding: 16rpx;
    border-radius: 50%;
    background-color: red;

    .icon_logo {
      width: 100%;
      height: 100%;
    }
  }

  .input_container {
    position: absolute;
    top: 300rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 600rpx;
    margin: 0 auto;

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
      font-size: 36rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 80rpx;
      letter-spacing: 8rpx;
      background-color: #fe473d;
    }
  }
}

:deep(.is-input-border) {
  padding: 0 4rpx 0 12rpx;
  border-radius: 40rpx;
}
:deep(.uni-icons) {
  color: #fe473d !important;
}
.btn_hover {
  opacity: 0.8;
}
</style>
