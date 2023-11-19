<template>
  <view class="cloud_page">
    <view class="title_container">
      <view class="left">
        <image
          class="icon_play"
          src="@/static/images/my/icon_play.png"
          mode="widthFix"
        />
        <text class="label">播放全部({{ total }})</text>
      </view>

      <uni-icons type="search" size="30" @click="showSearch = true"></uni-icons>
    </view>

    <template v-if="showType === 'data'">
      <view class="list_container">
        <MusicRow
          v-for="(item, index) in musicList"
          :key="index"
          :index="index + 1"
          :row="item"
          @clickEvent="toShowPopup"
        />
      </view>
    </template>

    <NoData v-if="showType === 'noData'" />
  </view>

  <!-- 弹出层 -->
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

  <!-- 搜索内容 -->
  <Search
    v-if="showSearch"
    :list="musicList"
    placeholder="搜索云盘内歌曲"
    @close="showSearch = false"
    @clickEvent="toShowPopup"
  />
</template>

<script setup>
import { cloundMenuList } from "@/utils/static.js";
import NoData from "@/components/NoData/index.vue";
import Search from "@/components/Search/index.vue";
import MusicRow from "@/components/MusicRow/index.vue";
import { onMounted, getCurrentInstance, ref } from "vue";

const _this = getCurrentInstance().appContext.config.globalProperties;
const popRef = ref(null);
const total = ref(0);
const showType = ref(null);
const showSearch = ref(false);
const musicList = ref([]);
const musicInfo = ref({});
const popupMenuList = ref([]);

onMounted(() => {
  getMusicList();
});

// 获取歌曲列表
const getMusicList = () => {
  _this.$api
    .CloudList({ limit: 10000 })
    .then((res) => {
      if (res.code == 200) {
        const { count, data } = res;
        total.value = count;
        musicList.value = data;
      }
    })
    .finally(() => {
      showType.value = musicList.value.length ? "data" : "noData";
    });
};

// 展示菜单操作对话框
const toShowPopup = (val) => {
  musicInfo.value = { ...val };
  popupMenuList.value = cloundMenuList.map((item) => {
    return {
      ...item,
      name: item.name === "歌手" ? `歌手：${val.artist}` : item.name,
    };
  });
  popRef.value.open();
};
</script>

<style lang="scss" scoped>
.cloud_page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .title_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16rpx 24rpx;
    border-bottom: 2rpx solid #eee;

    .left {
      display: flex;
      align-items: center;
      column-gap: 12rpx;

      .icon_play {
        width: 60rpx;
      }
    }
  }

  .list_container {
    flex: 1;
    overflow: auto;
    position: relative;
    width: 100%;
    padding: 12rpx 24rpx;
  }
}

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
