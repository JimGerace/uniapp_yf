import api from "./config";

// 歌单列表
const PlayList = (data) => {
  return api({
    url: "/user/playlist",
    method: "GET",
    data,
    hideLoading: true,
  });
};

// 云盘列表
const CloudList = (data) => {
  return api({
    url: "/user/cloud",
    method: "GET",
    data,
  });
};

// 最近播放列表
const RecentList = (data) => {
  return api({
    url: "/record/recent/song",
    method: "GET",
    data,
  });
};

// 歌单详情
const PlayDetail = (data) => {
  return api({
    url: "/playlist/detail",
    method: "GET",
    data,
    hideLoading: true,
  });
};

// 歌单所有歌曲
const TrackAll = (data) => {
  return api({
    url: "/playlist/track/all",
    method: "GET",
    data,
    hideLoading: true,
  });
};

// 默认搜索关键词
const SearchDefault = (data) => {
  return api({
    url: "/search/default",
    method: "GET",
    data,
    hideLoading: true,
  });
};

// 热搜列表(简略)
const SearchHot = (data) => {
  return api({
    url: "/search/hot",
    method: "GET",
    data,
  });
};

// 搜索建议
const SearchSuggest = (data) => {
  return api({
    url: "/search/suggest",
    method: "GET",
    data,
    hideLoading: true,
  });
};

export default {
  PlayList,
  CloudList,
  RecentList,
  PlayDetail,
  TrackAll,
  SearchDefault,
  SearchHot,
  SearchSuggest,
};
