const app = getApp();
const { getOpenid } = require("../../utils/util");

// 菜单键值常量
const MENU_KEYS = {
  CONTACT: 0,
  RECORD: 1,
  SHARE_IMG: 2,
  PRIZE_IMG: 3,
};

Page({
  data: {
    uid: "",
    nickName: "",
    avatarUrl: "",
    author: "",
    uid: "",
    globalColor: "",
    openid: "",
    menus: [
      {
        name: "联系作者",
        icon: "../../images/concat.png",
        key: MENU_KEYS.CONTACT,
      },
      // {
      //   name: "解析记录",
      //   icon: "../../images/record.png",
      //   key: MENU_KEYS.RECORD,
      // },
    ],
  },

  onShow() {
    console.log(app.globalData);
    console.log(getOpenid());
    this.initGlobalData();
  },

  initGlobalData() {
    const { globalData } = app;
    this.setData({
      uid: globalData.uid,
      nickName: globalData.nickName,
      avatarUrl: globalData.headUrl,
      author: globalData.author,
      globalColor: globalData.globalColor,
      openid: getOpenid(),
      reqUrl: globalData.reqUrl,
    });
    console.log(this.data, "this.data");
  },
  onShareTimeline() {
    const { globalData } = app;
    return {
      title: globalData.shareTitle,
      query: "/pages/index/index",
      imageUrl: globalData.sharePic,
    };
  },

  navigateToPage(event) {
    const { key } = event.currentTarget.dataset;

    // 路由处理逻辑
    const routes = {
      [MENU_KEYS.CONTACT]: () =>
        this.copyToClipboard(this.data.author, "已复制作者微信"),
      [MENU_KEYS.RECORD]: () => this.navigate("../list/list"),
    };

    const action = routes[key];
    if (action) {
      action();
    }
  },

  copyToClipboard(data, successMessage) {
    wx.setClipboardData({
      data,
      success: () => {},
    });
  },

  navigate(url) {
    wx.navigateTo({
      url,
    });
  },
});
