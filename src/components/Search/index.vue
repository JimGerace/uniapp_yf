<template>
  <view class="search_container">
    <view class="header_box">
      <uni-icons type="arrow-left" size="30" @click="comeBack"></uni-icons>
      <uni-easyinput
        v-model="searchKey"
        :placeholder="placeholder"
        placeholderStyle="font-size: 30rpx;"
        @input="watchInputVal"
      ></uni-easyinput>
    </view>

    <view class="search_list">
      <view v-show="showList">
        <MusicRow
          v-for="(item, index) in filterList"
          :key="index"
          :row="item"
          @clickEvent="showMenuPopup"
        />
      </view>

      <view v-show="showNoData" class="has_noData"
        >未找到与"{{ searchKey }}"相关的内容</view
      >
    </view>
  </view>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits } from "vue";
import MusicRow from "@/components/MusicRow/index.vue";

const emits = defineEmits(["close", "clickEvent"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "搜索",
  },
  list: {
    type: Array,
    default: [],
  },
});

const searchKey = ref(null);
const filterList = ref([]);

const showList = computed(() => {
  return searchKey.value && filterList.value.length;
});
const showNoData = computed(() => {
  return searchKey.value && !filterList.value.length;
});

// 监听输入框内容变化
const watchInputVal = (val) => {
  if (!val) {
    filterList.value = [];
    return;
  }
  filterList.value = props.list.filter((item) => {
    return item.songName.includes(val);
  });
};

// 展示菜单对话框
const showMenuPopup = (val) => {
  emits("clickEvent", val);
};

// 点击返回图标按钮
const comeBack = () => {
  emits("close");
};
</script>

<style lang="scss" scoped>
.search_container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  .header_box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12rpx 24rpx;
  }

  .search_list {
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding: 0 24rpx;

    .has_noData {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100rpx;
      color: #999;
      font-size: 32rpx;
    }
  }
}

:deep(.is-input-border) {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #ddd;
}
:deep(.uni-easyinput__content-input) {
  font-size: 30rpx;
}
</style>
