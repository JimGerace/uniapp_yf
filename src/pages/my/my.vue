<template>
  <view class="my_page">
    <!-- 搜索栏目 -->
    <view class="search_container">
      <view class="search_box">
        <uni-icons type="search" size="25"></uni-icons>
        <text class="placeholder">搜索</text>
        <uni-icons type="scan" size="25"></uni-icons>
      </view>
    </view>

    <view class="container">
      <!-- 用户信息 -->
      <view class="userinfo_container">
        <view class="userinfo_box">
          <image
            class="icon_user"
            :src="userInfo.avatarUrl + '?param=120y120'"
            mode="scaleToFill"
          />
          <text class="nickname">{{ userInfo.nickname }}</text>
        </view>

        <uni-icons type="forward" size="30"></uni-icons>
      </view>

      <!-- 菜单列表 -->
      <view class="menu_container">
        <view
          class="menu_items"
          @click="toPage(item.path)"
          v-for="(item, index) in menulist"
          :key="index"
        >
          <view class="left">
            <uni-icons :type="item.icon" size="50" color="#f93b3b"></uni-icons>
            <text class="menu_name">{{ item.name }}</text>
          </view>

          <uni-icons type="forward" size="30"></uni-icons>
        </view>
      </view>

      <!-- 收藏歌单 -->
      <view class="collect_container">
        <view class="title_box">
          <uni-icons type="star-filled" size="30" color="#f93b3b"></uni-icons>
          <text class="title_name">收藏歌单</text>
        </view>

        <view class="list_box" v-if="showCollectList">
          <view class="items" v-for="(item, index) in playList" :key="index">
            <image
              class="icon_playlist"
              :src="item.coverImgUrl + '?param=120y120'"
              mode="widthFix"
            />
            <view class="info_box">
              <text class="name">{{ item.name }}</text>
              <text class="count"
                >{{ item.trackCount }}首 by {{ item.creator.nickname }}</text
              >
            </view>
          </view>
        </view>

        <!-- 暂无数据 -->
        <NoData v-else />
      </view>
    </view>
  </view>
</template>

<script setup>
import { menulist } from "@/utils/static.js";
import { appStore } from "@/store/index.js";
import { computed, onMounted, getCurrentInstance, ref } from "vue";
import NoData from "@/components/NoData/index.vue";
import { uni } from "@dcloudio/uni-h5";

const store = appStore();
const _this = getCurrentInstance().appContext.config.globalProperties;

const playList = ref([]);
const userInfo = computed(() => {
  return store.userInfo;
});
const showCollectList = computed(() => {
  return playList.value.length ? true : false;
});

onMounted(() => {
  getUserPlayList();
});

// 获取歌单列表
const getUserPlayList = () => {
  _this.$api.PlayList({ uid: userInfo.value.userId }).then((res) => {
    if (res.code == 200) {
      playList.value = res.playlist;
    }
  });
};

// 进入菜单选项页面
const toPage = (url) => {
  uni.navigateTo({
    url,
  });
};
</script>

<style lang="scss" scoped>
.my_page {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 100rpx;
  background-color: #f2f2f2;

  .search_container {
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 110rpx;
    padding: 0 24rpx;
    background-color: #fff;
    border-bottom: 2rpx solid #ddd;

    .search_box {
      display: flex;
      align-items: center;
      width: 100%;
      height: 70rpx;
      padding: 0 24rpx;
      border-radius: 50rpx;
      border: 2rpx solid #eee;
      background-color: #f2f2f2;
    }

    .placeholder {
      flex: 1;
      color: #999;
      padding: 0 12rpx;
    }
  }

  .container {
    width: 100%;
    padding: 24rpx;
    .userinfo_container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 150rpx;
      padding: 24rpx;
      border-radius: 8rpx;
      border: 2rpx solid #eee;
      background-color: #fff;
      box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1);

      .userinfo_box {
        flex: 1;
        display: flex;
        align-items: center;
        column-gap: 24rpx;

        .icon_user {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          border: 2rpx solid #eee;
        }

        .nickname {
          flex: 1;
          color: #333;
          font-size: 36rpx;
          font-weight: bold;
        }
      }
    }

    .menu_container {
      width: 100%;
      margin-top: 24rpx;
      border-radius: 6rpx;
      background-color: #fff;
      border: 2rpx solid #eee;
      box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1);

      .menu_items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 12rpx 24rpx;
        border-bottom: 2rpx solid #eee;

        .left {
          display: flex;
          align-items: center;
          column-gap: 24rpx;

          .menu_name {
            color: #333;
            font-size: 32rpx;
          }
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }

    .collect_container {
      width: 100%;
      margin-top: 24rpx;
      padding: 12rpx 24rpx;
      border-radius: 6rpx;
      border: 2rpx solid #eee;
      background-color: #fff;
      box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1);

      .title_box {
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 12rpx;
        border-bottom: 2rpx solid #eee;
      }

      .items {
        display: flex;
        align-items: center;
        column-gap: 24rpx;
        margin-top: 12rpx;

        .icon_playlist {
          width: 120rpx;
          height: 120rpx;
          border-radius: 8rpx;
        }

        .info_box {
          flex: 1;
          display: flex;
          flex-direction: column;

          .name {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #333;
            font-size: 32rpx;
          }

          .count {
            color: #999;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>
