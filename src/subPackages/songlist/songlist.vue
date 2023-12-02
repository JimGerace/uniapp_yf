<template>
  <view class="songlist_page">
    <view class="top_container">
      <view class="song_info_container">
        <view class="top_box">
          <image
            class="cover_image"
            :src="detailInfo.coverImgUrl + '?param=120y120'"
            mode="widthFix"
          />

          <view class="right">
            <text class="play_name">{{ detailInfo.name }}</text>
            <view class="creator_box">
              <image
                class="creator_img"
                :src="artist.avatarUrl + '?param=120y120'"
                mode="widthFix"
              />

              <text class="nickname">{{ artist.nickname }}</text>
            </view>
          </view>
        </view>

        <view class="des_box">{{ detailInfo.description }}</view>
      </view>
    </view>

    <view class="bottom_container">
      <PlayTitle
        :total="total"
        :showSearchBtn="true"
        @clickEvent="showSearch = true"
      />

      <view class="music_list">
        <template v-if="showType === 'data'">
          <MusicRow
            v-for="(item, index) in songlist"
            :key="index"
            :index="index + 1"
            :row="item"
            @clickEvent="showMenuPopup"
          />
        </template>

        <NoData v-if="showType === 'noData'" />
      </view>
    </view>
  </view>

  <MenuOptions ref="menuRef" />

  <!-- 搜索内容 -->
  <Search
    v-if="showSearch"
    :list="songlist"
    placeholder="搜索歌单内歌曲"
    @close="showSearch = false"
    @clickEvent="showMenuPopup"
  />
</template>

<script setup>
import NoData from "@/components/NoData/index.vue";
import Search from "@/components/Search/index.vue";
import PlayTitle from "@/components/PlayTitle/index.vue";
import MusicRow from "@/components/MusicRow/index.vue";
import MenuOptions from "@/components/MenuOptions/index.vue";
import { getCurrentInstance, onMounted, ref, computed } from "vue";

const instance = getCurrentInstance();
const _this = instance.appContext.config.globalProperties;
const showType = ref("");
const showSearch = ref(false);
const menuRef = ref(null);
const detailInfo = ref({});
const songlist = ref([]);
const artist = ref({});

const total = computed(() => {
  return songlist.value.length;
});

onMounted(() => {
  init();
});

// 初始化
const init = () => {
  const loading = uni.showLoading({ title: "加载中..." });
  Promise.all([getDetailInfo(), getAllMusic()])
    .then((result) => {
      const [deRes, allRes] = result;

      if (deRes.code == 200) {
        const { coverImgUrl, name, creator, description, id } = deRes.playlist;
        detailInfo.value = {
          id,
          name,
          coverImgUrl,
          description,
        };
        artist.value = creator;
      }

      if (allRes.code == 200) {
        songlist.value = allRes.songs.map((item) => {
          return {
            id: item.id,
            songName: item.name,
            album: item.al.name,
            artist: item.ar.map((ar) => ar.name).join("、"),
          };
        });
      }
    })
    .catch(() => {
      _this.$message({
        title: "网络异常，请稍后再试",
      });
    })
    .finally(() => {
      loading && uni.hideLoading();
      showType.value = songlist.value.length ? "data" : "noData";
    });
};

// 获取歌单详情
const getDetailInfo = () => {
  return _this.$api.PlayDetail({ id: instance.parent.attrs.id });
};

// 获取歌单所有歌曲
const getAllMusic = () => {
  return _this.$api.TrackAll({ id: instance.parent.attrs.id });
};

// 展示菜单列表对话框
const showMenuPopup = (val) => {
  menuRef.value.showPopup(val);
};
</script>

<style lang="scss" scoped>
.songlist_page {
  position: relative;
  width: 100%;
  height: 100vh;

  .top_container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 400rpx;
    background: linear-gradient(to bottom, #8b6a47, #a78363);

    .song_info_container {
      width: 100%;
      padding: 90rpx 24rpx 30rpx;

      .top_box {
        display: flex;
        justify-content: space-between;
        column-gap: 24rpx;

        .cover_image {
          width: 180rpx;
          height: 180rpx;
          border-radius: 10rpx;
          filter: brightness(90%);
        }

        .right {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          color: #fff;

          .play_name {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            width: 100%;
            font-size: 32rpx;
            margin-bottom: 18rpx;
          }

          .creator_box {
            display: flex;
            align-items: center;
            column-gap: 12rpx;

            .creator_img {
              width: 70rpx;
              height: 70rpx;
              border-radius: 50%;
            }

            .nickname {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 28rpx;
              width: 100%;
            }
          }
        }
      }

      .des_box {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        font-size: 32rpx;
        margin-top: 12rpx;
      }
    }
  }

  .bottom_container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 380rpx;
    left: 0;
    width: 100%;
    height: calc(100vh - 380rpx);
    border-radius: 20rpx 20rpx 0 0;
    background-color: #fff;

    .music_list {
      flex: 1;
      overflow-y: auto;
      width: 100%;
      padding: 0 24rpx;
    }
  }
}

:deep(.noData_container) {
  margin-top: 200rpx;
}
</style>
