<template>
  <view class="recently_page">
    <view class="title_box">
      <image
        class="icon_play"
        src="@/static/images/my/icon_play.png"
        mode="widthFix"
      />
      <view class="count_box">
        <text class="count_txt">播放全部</text>
        <text class="count_num" v-if="total">({{ total }})</text>
      </view>
    </view>

    <view class="music_list" v-if="showType === 'data'">
      <view class="music_items" v-for="(item, index) in musicList" :key="index">
        <view class="left">
          <text class="music_name">{{ item.name }}</text>
          <text class="music_artist">{{ item.ar }} - {{ item.al }}</text>
        </view>

        <uni-icons
          type="settings"
          size="30"
          @click="toShowPopup(item)"
        ></uni-icons>
      </view>
    </view>

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
</template>

<script setup>
import { cloundMenuList } from "@/utils/static.js";
import NoData from "@/components/NoData/index.vue";
import { ref, getCurrentInstance, onMounted, computed } from "vue";

const _this = getCurrentInstance().appContext.config.globalProperties;
const showType = ref("");
const popRef = ref(null);
const musicList = ref([]);
const musicInfo = ref({});
const popupMenuList = ref([]);

const total = computed(() => {
  return musicList.value.length;
});

onMounted(() => {
  getPlayList();
});

// 获取播放列表
const getPlayList = () => {
  _this.$api
    .RecentList({ limit: 1000 })
    .then((res) => {
      if (res.code == 200) {
        musicList.value = res.data.list.map((item) => {
          return {
            dt: item.data.dt,
            name: item.data.name,
            ar: item.data.ar.map((ar) => ar.name).join("、"),
            al: item.data.al.name,
            id: item.data.id,
          };
        });
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
      name: item.name === "歌手" ? `歌手：${val.ar}` : item.name,
    };
  });
  popRef.value.open();
};
</script>

<style lang="scss" scoped>
.recently_page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;

  .title_box {
    display: flex;
    align-items: center;
    column-gap: 12rpx;
    width: 100%;
    height: 100rpx;
    padding: 0 24rpx;
    border-bottom: 2rpx solid #ddd;

    .icon_play {
      width: 60rpx;
      height: 60rpx;
    }

    .count_box {
      display: flex;
      align-items: flex-end;

      .count_txt {
        color: #000;
        font-size: 32rpx;
      }

      .count_num {
        font-size: 28rpx;
      }
    }
  }

  .music_list {
    flex: 1;
    overflow-y: auto;
    position: relative;
    width: 100%;

    .music_items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 90rpx;
      padding: 0 24rpx;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .music_name {
          color: #333;
          font-size: 32rpx;
        }

        .music_artist {
          width: 100%;
          color: #999;
          font-size: 24rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .uni-icons {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
}

:deep(.noData_container) {
  margin-top: 200rpx;
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
