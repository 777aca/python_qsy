const app = getApp();

// 菜单键值常量
const MENU_KEYS = {
  CONTACT: 0,
  RECORD: 1,
  SHARE_IMG: 2,
  PRIZE_IMG: 3,
};

Page({
  data: {
    nickName: "",
    avatarUrl: "",
    author: "",
    autoCopy: false,
    autoDownload: false,
    myAd: "",
    uid: "",
    globalColor: "",
    showAd: false,
    menus: [
      {
        name: "联系作者",
        icon: "../../images/concat.png",
        key: MENU_KEYS.CONTACT,
      },
      {
        name: "解析记录",
        icon: "../../images/record.png",
        key: MENU_KEYS.RECORD,
      },
    ],
  },

  onLoad() {
    this.initGlobalData();
  },

  onShow() {
    this.initGlobalData(); // 保持数据实时同步
  },

  initGlobalData() {
    const { globalData } = app;
    this.setData({
      nickName: globalData.nickName,
      avatarUrl: globalData.headUrl,
      author: globalData.author,
      autoCopy: wx.getStorageSync("autoCopy") || globalData.autoCopy,
      autoDownload: globalData.autoDownload,
      myAd: globalData.myAd,
      globalColor: globalData.globalColor,
      showAd: true,
    });
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
      success: () => this.showModal(successMessage),
    });
  },

  showModal(content) {
    wx.showModal({ content });
  },

  navigate(url) {
    wx.navigateTo({ url });
  },
});
