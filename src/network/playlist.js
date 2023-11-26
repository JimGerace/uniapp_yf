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

export default {
  PlayList,
  CloudList,
  RecentList,
};
