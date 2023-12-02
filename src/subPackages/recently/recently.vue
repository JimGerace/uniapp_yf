<template>
  <view class="recently_page">
    <PlayTitle :total="total" />

    <view class="music_list" v-if="showType === 'data'">
      <MusicRow
        v-for="(item, index) in musicList"
        :key="index"
        :row="item"
        @clickEvent="toShowPopup"
      />
    </view>

    <NoData v-if="showType === 'noData'" />
  </view>

  <!-- 弹出层 -->
  <MenuOptions ref="menuRef" />
</template>

<script setup>
import NoData from "@/components/NoData/index.vue";
import PlayTitle from "@/components/PlayTitle/index.vue";
import MusicRow from "@/components/MusicRow/index.vue";
import MenuOptions from "@/components/MenuOptions/index.vue";
import { ref, getCurrentInstance, onMounted, computed } from "vue";

const _this = getCurrentInstance().appContext.config.globalProperties;
const showType = ref("");
const menuRef = ref(null);
const musicList = ref([]);

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
            id: item.data.id,
            songName: item.data.name,
            album: item.data.al.name,
            artist: item.data.ar.map((ar) => ar.name).join("、"),
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
.recently_page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;

  .music_list {
    flex: 1;
    overflow-y: auto;
    position: relative;
    width: 100%;
    padding: 0 24rpx;
  }
}

:deep(.noData_container) {
  margin-top: 200rpx;
}
</style>
