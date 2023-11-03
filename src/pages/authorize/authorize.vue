<template>
  <view class="auth_page">
    <image class="backImg" src="@/static/images/authorize/backImg.png" />

    <view class="title">现场监管移动服务平台</view>

    <view class="btn_auth" v-if="showAuthBtn">
      <button type="default" @click="toAuthorize">授权登录</button>
    </view>

    <view class="footer">技术支持：广州粤建三和软件股份有限公司</view>
  </view>
</template>

<script setup>
import { appStore } from "@/store/index.js";
import { getCurrentInstance, onMounted, ref } from "vue";

const store = appStore();
const _this = getCurrentInstance().appContext.config.globalProperties;
const showAuthBtn = ref(false);

onMounted(() => {
  getUserCodeInfo();
});

// 点击登录授权按钮
const toAuthorize = () => {
  getUserCodeInfo();
};

// 获取用户code值
const getUserCodeInfo = () => {
  uni.getProvider({
    service: "oauth",
    success: ({ service, provider }) => {
      uni.login({
        provider,
        success: (result) => {
          getUserOpenidInfo(result.code);
        },
        fail: (error) => {
          showAuthBtn.value = true;
        },
      });
    },
    fail: (error) => {
      showAuthBtn.value = true;
    },
  });
};

// 将code 发送给后端换取openid信息
const getUserOpenidInfo = (code) => {
  _this.$api
    .openIdInfo({ code })
    .then((res) => {
      if (res.code == 200) {
        getUserTokenInfo(res.msg);
      } else {
        showAuthBtn.value = true;
      }
    })
    .catch(() => {
      showAuthBtn.value = true;
    });
};

// 获取token信息
const getUserTokenInfo = (openId) => {
  _this.$api
    .tokenInfo({ openId })
    .then((res) => {
      if (res.code == 200) {
        store.setToken(res.data);
      } else {
        uni.redirectTo({
          url: "../login/login",
        });
      }
    })
    .catch(() => {
      showAuthBtn.value = true;
    });
};
</script>

<style scoped lang="scss">
.auth_page {
  position: relative;
  width: 100vw;
  height: 100vh;

  .backImg {
    z-index: -1;
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .title {
    color: #333;
    font-size: 46rpx;
    font-weight: bold;
    text-align: center;
    line-height: 300rpx;
    letter-spacing: 2rpx;
  }

  .btn_auth {
    position: absolute;
    top: 800rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 600rpx;

    button {
      color: #fff;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 80rpx;
      background-color: #347bef;
    }
  }

  .footer {
    white-space: nowrap;
    position: absolute;
    left: 50%;
    bottom: 60rpx;
    transform: translateX(-50%);
    color: #999;
    font-size: 28rpx;
    text-align: center;
  }
}
</style>
