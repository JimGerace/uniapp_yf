<template>
  <view class="search_page">
    <view class="input_box">
      <uni-icons type="arrow-left" size="30" @click="toBackPage"></uni-icons>
      <uni-easyinput
        v-model="searchKey"
        prefixIcon="search"
        placeholderStyle="font-size:32rpx;"
        :placeholder="placeholder"
        @input="watchSearchChange"
      ></uni-easyinput>
      <text class="search_txt">搜索</text>
    </view>

    <view class="container">
      <view class="history_container" v-show="showHistory">
        <view class="title_box">
          <text class="title">搜索历史</text>

          <uni-icons
            type="trash"
            color="#999"
            size="30"
            @click="clearSearchHistory"
          ></uni-icons>
        </view>

        <view class="list_box">
          <text
            class="li_item"
            v-for="(item, index) in historyList"
            :key="index"
            >{{ item }}</text
          >
        </view>
      </view>

      <view class="hot_container" v-show="showHotContainer">
        <view class="title_box">
          <text>热搜榜</text>
        </view>

        <view class="list_item" v-for="(item, index) in hotList" :key="index">
          <text class="index" :class="index + 1 <= 3 ? 'colorRed' : ''">{{
            index + 1
          }}</text>
          <text class="name" :class="index + 1 <= 3 ? 'bold' : ''">{{
            item.first
          }}</text>
        </view>
      </view>

      <view class="search_container" v-show="showSearchContainer">
        <template v-show="searchList.length">
          <view
            class="search_item"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <uni-icons type="search" size="25"></uni-icons>
            <text class="search_name">{{ item.keyword }}</text>
          </view>
        </template>

        <view class="no_data" v-show="!isLoading && !searchList.length"
          >暂未搜索到相关歌曲</view
        >
      </view>

      <view v-show="isLoading">
        <view class="loading_container">
          <Loading />
          <text class="loading_text">加载中...</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { appStore } from "@/store/index.js";
import { onLoad } from "@dcloudio/uni-app";
import Loading from "@/components/Loading/index.vue";
import { computed, ref, getCurrentInstance } from "vue";

const store = appStore();
const _this = getCurrentInstance().appContext.config.globalProperties;
const isLoading = ref(false);
const searchKey = ref(null);
const placeholder = ref(null);
const hotList = ref([]);
const searchList = ref([]);

const historyList = computed(() => {
  return store.searchHistory;
});
const showHistory = computed(() => {
  return !searchKey.value && store.searchHistory.length;
});
const showHotContainer = computed(() => {
  return !searchKey.value && hotList.value.length;
});
const showSearchContainer = computed(() => {
  return searchKey.value;
});

onLoad((options) => {
  const { key } = options || {};
  placeholder.value = key;
  getHotList();
});

// 获取热搜列表
const getHotList = () => {
  _this.$api.SearchHot().then((res) => {
    if (res.code == 200) {
      hotList.value = res.result.hots;
    }
  });
};

// 获取搜索建议
const getSuggestList = (keywords) => {
  isLoading.value = true;
  const data = {
    keywords,
    type: "mobile",
  };
  _this.$api
    .SearchSuggest(data)
    .then((res) => {
      if (res.code == 200) {
        searchList.value = res.result.allMatch || [];
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 监听输入框内容变化
const watchSearchChange = (val) => {
  searchList.value = [];
  val && getSuggestList(val);
};

// 清空历史记录
const clearSearchHistory = () => {
  store.setSearchHistory([]);
};

// 返回上一页
const toBackPage = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.colorRed {
  color: red;
}
.search_page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 24rpx 0 0;
  background-color: #f8f9fd;

  .input_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 75rpx;
    padding: 0 24rpx;
    column-gap: 16rpx;
  }

  .container {
    flex: 1;
    overflow-y: auto;
    width: 100%;
    margin-top: 24rpx;

    .history_container {
      width: 100%;
      padding: 0 24rpx;
      .title_box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          color: #333;
          font-size: 32rpx;
          font-weight: bold;
        }
      }

      .list_box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        column-gap: 24rpx;
        margin-top: 12rpx;

        .li_item {
          margin-bottom: 18rpx;
          padding: 4rpx 24rpx;
          border-radius: 40rpx;
          background-color: #fff;
          border: 2rpx solid #ddd;
        }
      }
    }

    .hot_container {
      width: calc(100% - 48rpx);
      margin: 24rpx auto;
      padding: 12rpx 24rpx 34rpx;
      border-radius: 6rpx;
      border: 2rpx solid #eee;
      background-color: #fff;

      .title_box {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        color: #333;
        font-size: 32rpx;
        font-weight: bold;
        border-bottom: 2rpx solid #eee;
      }

      .list_item {
        display: flex;
        align-items: center;
        margin-top: 24rpx;

        .index {
          width: 55rpx;
        }

        .name {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &.bold {
            font-weight: bold;
          }
        }
      }
    }

    .search_container {
      width: 100%;

      .search_item {
        display: flex;
        align-items: center;
        column-gap: 12rpx;
        width: 100%;
        height: 80rpx;
        padding: 0 24rpx;

        .search_name {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 100%;
          line-height: 80rpx;
          border-bottom: 2rpx solid #eee;
        }
      }

      .no_data {
        color: #999;
        margin-top: 120rpx;
        text-align: center;
      }
    }

    .loading_container {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      color: #999;
      font-size: 28rpx;
      margin-top: 120rpx;

      .loading_text {
        margin-left: 12rpx;
      }
    }
  }
}

:deep(.uni-easyinput__content) {
  height: 75rpx;
  border-radius: 50rpx;
}
</style>
