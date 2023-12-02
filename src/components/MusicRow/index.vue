<template>
  <view class="music_row">
    <view class="left">
      <text class="index" v-if="index">{{ index }}</text>
      <view class="music_info">
        <text class="music_name">{{ row.songName }}</text>

        <view class="song_info">
          <text class="artist" v-if="row.artist">{{ row.artist }}</text>
          <text class="album" v-if="row.album">-{{ row.album }}</text>
        </view>
      </view>
    </view>

    <uni-icons type="settings" size="30" @click="toClickEvent"></uni-icons>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emits = defineEmits(["clickEvent"]);
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  row: {
    type: Object,
  },
});

// 点击菜单操作图标
const toClickEvent = () => {
  emits("clickEvent", props.row);
};
</script>

<style lang="scss" scoped>
.music_row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 0;

  .left {
    flex: 1;
    overflow: hidden;
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
      overflow: hidden;
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
      .album {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #999;
        font-size: 24rpx;
      }

      .song_info {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        width: 100%;
      }
    }
  }
}
</style>
