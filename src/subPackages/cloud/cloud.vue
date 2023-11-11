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

      <uni-icons type="search" size="30"></uni-icons>
    </view>

    <template v-if="showType === 'data'">
      <view class="list_container">
        <view class="items" v-for="(item, index) in musicList" :key="index">
          <view class="left">
            <text class="index">{{ index + 1 }}</text>
            <view class="music_info">
              <text class="music_name">{{ item.songName }}</text>
              <text class="artist">{{ item.artist }}</text>
            </view>
          </view>

          <uni-icons type="settings" size="30"></uni-icons>
        </view>
      </view>
    </template>

    <NoData v-if="showType === 'noData'" />
  </view>
</template>

<script setup>
import NoData from "@/components/NoData/index.vue";
import { onMounted, getCurrentInstance, ref } from "vue";
const _this = getCurrentInstance().appContext.config.globalProperties;

const total = ref(0);
const showType = ref(null);
const musicList = ref([]);

onMounted(() => {
  getMusicList();
});

// 获取歌曲列表
const getMusicList = () => {
  _this.$api
    .CloudList()
    .then((res) => {
      if (res.code == 200) {
        const { count, data } = res;
        total.value = count;
        musicList.value = data;
      }
    })
    .finally(() => {
      if (musicList.value.length) {
        showType.value = "data";
      } else {
        showType.value = "noData";
      }
    });
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
    padding: 12rpx 24rpx;
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

    .items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12rpx 0;

      .left {
        flex: 1;
        display: flex;
        align-items: center;
        column-gap: 12rpx;

        .index {
          color: #999;
          width: 80rpx;
          text-align: center;
        }

        .music_info {
          flex: 1;
          display: flex;
          flex-direction: column;

          .music_name,
          .artist {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .music_name {
            color: #333;
            font-size: 32rpx;
          }

          .artist {
            color: #999;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
