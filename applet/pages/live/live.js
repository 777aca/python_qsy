Page({
  data: {
    inputUrl: "",
    hasWatchedAd: false,
    showPopup: false,
    popupAnimation: {},
    interstitialAd: null,
    globalColor: getApp().globalData.globalColor,
    appName: getApp().globalData.parseTitle,
    showTip: true,
    banner: getApp().globalData.banner,
    prizeType: getApp().globalData.prizeType,
    reqUrl: getApp().globalData.reqUrl,
  },

  onLoad: function () {
    const hasWatchedAd = wx.getStorageSync("hasWatchedAd");
    const showTip = wx.getStorageSync("autoTip").length <= 5;

    this.setData({
      hasWatchedAd: !!hasWatchedAd,
      showTip,
    });

    setTimeout(() => this.closeNotice(), 3000);
  },

  closeNotice: function () {
    this.setData({ showTip: false });
    wx.setStorageSync("autoTip", "autoTip");
  },

  onInputUrl: function (e) {
    this.setData({ inputUrl: e.detail.value });
  },

  onClear: function () {
    this.setData({ inputUrl: "" });
  },

  onShare: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },

  onPasteAndParse: function () {
    this.onClear();
    wx.getClipboardData({
      success: (res) => {
        const inputUrl = res.data || "";
        this.setData({ inputUrl });

        if (inputUrl.length === 0) {
          wx.showModal({
            content: "未检测到视频地址",
            showCancel: false,
          });
        }
      },
      fail: (err) => {
        const errMsg =
          err.errno === 1512001
            ? "没有检测到有效的链接地址"
            : "粘贴链接失败，请手动粘贴到输入框";
        wx.showModal({
          title: "提示",
          content: errMsg,
          showCancel: false,
        });
      },
    });
  },

  onParse: function () {
    const link = this.extractUrl(this.data.inputUrl);
    if (!link) {
      wx.showToast({
        title: "请输入有效的链接",
        icon: "none",
      });
      return;
    }

    this.requestParse(link);
  },

  extractUrl: function (text) {
    const match = text.match(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/);
    return match ? match[0] : null;
  },

  requestParse: function (link) {
    wx.showLoading({ title: "解析中..." });

    wx.request({
      url: `${this.data.reqUrl}parse_video`,
      method: "POST",
      data: { link, type: "live" },
      success: (res) => {
        wx.hideLoading();
        const data = res.data.data;

        if (data) {
          const resultData = data;

          if (resultData) {
            wx.navigateTo({
              url: `/pages/video/video?data=${encodeURIComponent(
                JSON.stringify(resultData)
              )}`,
            });
          }
        } else {
          this.showToast(res.data.msg || "解析失败");
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error("接口失败原因:", err);
        this.showToast("接口请求失败，请稍后重试");
      },
    });
  },

  showToast: function (message) {
    wx.showToast({
      title: message,
      icon: "none",
    });
  },
});
