<template>
  <view class="cloud_page">
    <PlayTitle
      :total="total"
      :showSearchBtn="true"
      @clickEvent="showSearch = true"
    />

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
  <MenuOptions ref="menuRef" />

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
import PlayTitle from "@/components/PlayTitle/index.vue";
import NoData from "@/components/NoData/index.vue";
import Search from "@/components/Search/index.vue";
import MusicRow from "@/components/MusicRow/index.vue";
import MenuOptions from "@/components/MenuOptions/index.vue";
import { onMounted, getCurrentInstance, ref } from "vue";

const _this = getCurrentInstance().appContext.config.globalProperties;
const total = ref(0);
const showType = ref(null);
const menuRef = ref(null);
const showSearch = ref(false);
const musicList = ref([]);

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
        musicList.value = data.map((item) => {
          return {
            id: item.songId,
            artist: item.artist,
            album: item.album,
            songName: item.songName,
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
  menuRef.value.showPopup(val);
};
</script>

<style lang="scss" scoped>
.cloud_page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .list_container {
    flex: 1;
    overflow: auto;
    position: relative;
    width: 100%;
    padding: 12rpx 24rpx;
  }
}

:deep(.noData_container) {
  margin-top: 200rpx;
}
</style>
