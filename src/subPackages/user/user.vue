<template>
  <view class="user_page">
    <image
      class="backImg"
      src="@/static/images/user/backImg.jpg"
      mode="widthFix"
    />

    <view class="container" v-if="userInfo.nickname">
      <view class="userInfo_container">
        <image
          class="icon_avatar"
          :src="userInfo.avatarUrl + '?param=120y120'"
          mode="widthFix"
        />
        <view class="info_container">
          <text class="nickName">{{ userInfo.nickname }}</text>
          <view class="info_items">
            <text>IP:广东</text>
            <text>Lv.{{ userInfo.level }}</text>
          </view>

          <view class="info_items">
            <text>
              <image
                class="icon_gender"
                v-if="userInfo.gender !== 2"
                src="@/static/images/user/icon_man.png"
                mode="widthFix"
              />
              <image
                class="icon_gender"
                v-else
                src="@/static/images/user/icon_man.png"
                mode="widthFix"
              />
              {{ userInfo.starSign }}
            </text>

            <text>{{ userInfo.provinceTxt }} {{ userInfo.cityTxt }}</text>
            <text>村龄{{ userInfo.createDays }}年</text>
          </view>
        </view>
      </view>

      <view class="music_container">
        <text class="title">音乐品味</text>
        <view class="music_box">
          <view class="items pink">
            <text class="items_label">我喜欢的歌单</text>
            <text class="value">{{ userInfo.playlistCount }}个</text>
          </view>

          <view class="items green">
            <text class="items_label">累计听歌</text>
            <text class="value">{{ userInfo.listenSongs }}首</text>
          </view>

          <view class="items blue">
            <text class="items_label">被关注人数</text>
            <text class="value">{{ userInfo.follows }}个</text>
          </view>
        </view>
      </view>

      <button type="default" hover-class="btn_hover" @click="toLogout">
        退出登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { appStore } from "@/store/index.js";
import { province_list, city_list } from "@/utils/area.js";
import { uni } from "@dcloudio/uni-h5";
import { ref, getCurrentInstance, onMounted } from "vue";

const store = appStore();
const _this = getCurrentInstance().appContext.config.globalProperties;
const userInfo = ref({});

onMounted(() => {
  getUserInfo();
});

// 获取用户信息
const getUserInfo = () => {
  _this.$api.UserDetail({ uid: store.userInfo.userId }).then((res) => {
    if (res.code == 200) {
      const { createDays, level, listenSongs, profile } = res || {};
      userInfo.value = {
        createDays: Math.floor(createDays / 365),
        level,
        listenSongs,
        ...profile,
        starSign: handleBirthday(profile.birthday),
        provinceTxt: province_list[profile.province],
        cityTxt: city_list[profile.city],
      };
    }
  });
};

// 点击退出登录按钮
const toLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确认要退出登录？",
    showCancel: true,
    confirmColor: "#fe473d",
    success: ({ confirm, cancel }) => {
      if (confirm) {
        _this.$api.Logout().then((res) => {
          if (res.code == 200) {
            store.resetState();
            uni.reLaunch({
              url: "../../pages/login/login",
              success: () => {
                _this.$message({
                  title: "退出登录成功!",
                  icon: "success",
                });
              },
            });
          }
        });
      } else if (cancel) {
        _this.$message({
          title: "已取消操作",
        });
      }
    },
  });
};

// 判断星座
const handleBirthday = (time) => {
  let year = new Date(time).getFullYear();
  let TT = new Date(time).getTime();
  if (TT >= getTime(`${year}-01-20`) && TT <= getTime(`${year}-02-18`)) {
    return "水瓶座";
  } else if (TT >= getTime(`${year}-02-19`) && TT <= getTime(`${yaer}-03-20`)) {
    return "双鱼座";
  } else if (TT >= getTime(`${year}-03-21`) && TT <= getTime(`${yaer}-04-19`)) {
    return "白羊座";
  } else if (TT >= getTime(`${year}-04-20`) && TT <= getTime(`${yaer}-05-20`)) {
    return "金牛座";
  } else if (TT >= getTime(`${year}-05-21`) && TT <= getTime(`${yaer}-06-21`)) {
    return "双子座";
  } else if (TT >= getTime(`${year}-06-22`) && TT <= getTime(`${yaer}-07-22`)) {
    return "巨蟹座";
  } else if (TT >= getTime(`${year}-07-23`) && TT <= getTime(`${yaer}-08-22`)) {
    return "狮子座";
  } else if (TT >= getTime(`${year}-08-23`) && TT <= getTime(`${yaer}-09-22`)) {
    return "处女座";
  } else if (TT >= getTime(`${year}-09-23`) && TT <= getTime(`${yaer}-10-23`)) {
    return "天秤座";
  } else if (TT >= getTime(`${year}-10-24`) && TT <= getTime(`${yaer}-11-22`)) {
    return "天蝎座";
  } else if (TT >= getTime(`${year}-11-23`) && TT <= getTime(`${yaer}-12-21`)) {
    return "射手座";
  } else {
    return "魔蝎座";
  }
};

// 获取时间戳
const getTime = (val) => {
  return new Date(val).getTime();
};
</script>

<style lang="scss" scoped>
.user_page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #eceff7;

  .backImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 500rpx;
  }

  .container {
    position: absolute;
    top: 450rpx;
    left: 50%;
    transform: translate(-50%);

    .userInfo_container {
      width: 700rpx;
      min-height: 200rpx;
      padding-bottom: 24rpx;
      border-radius: 6rpx;
      background-color: #fff;
      border: 2rpx solid #ddd;
      box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1);

      .icon_avatar {
        position: absolute;
        top: -75rpx;
        left: 50%;
        transform: translate(-50%);
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        border: 4rpx solid #fff;
      }

      .info_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding-top: 80rpx;

        .nickName {
          color: #333;
          font-size: 40rpx;
        }

        .info_items {
          display: flex;
          align-items: center;
          column-gap: 24rpx;
          color: #999;
          font-size: 22rpx;
          margin-top: 12rpx;

          text {
            display: flex;
            align-items: center;
            padding: 3rpx 16rpx;
            border-radius: 50rpx;
            border: 2rpx solid #ccc;
          }

          .icon_gender {
            width: 20rpx;
          }
        }
      }
    }

    .music_container {
      width: 100%;
      margin-top: 24rpx;
      padding: 18rpx 24rpx;
      border-radius: 6rpx;
      border: 2rpx solid #ddd;
      background-color: #fff;
      box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1);

      .title {
        color: #333;
        font-size: 32rpx;
      }

      .music_box {
        display: flex;
        align-items: center;
        justify-content: space-around;
        column-gap: 12rpx;
        margin-top: 12rpx;

        .items {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 200rpx;
          padding: 12rpx;
          border-radius: 6rpx;
          border: 2rpx solid #eee;

          .items_label {
            color: #666;
            font-size: 24rpx;
          }

          .value {
            color: #333;
            font-size: 32rpx;
            margin-top: 8rpx;
          }
        }
      }
    }

    button {
      color: #fff;
      font-size: 36rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin-top: 48rpx;
      border-radius: 80rpx;
      letter-spacing: 8rpx;
      background-color: #fe473d;
    }
  }
}

.pink {
  background: linear-gradient(to bottom, #fbf1f2, #fefafa);
}
.green {
  background: linear-gradient(to bottom, #fdf5e6, #fdfcf8);
}
.blue {
  background: linear-gradient(to bottom, #f0f4fc, #fcfdff);
}
.btn_hover {
  opacity: 0.8;
}
</style>
