import api from "./config";

// 歌单列表
const PlayList = (data) => {
  return api({
    url: "/user/playlist",
    method: "GET",
    data,
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

export default {
  PlayList,
  CloudList,
  RecentList,
  PlayDetail,
  TrackAll,
};
