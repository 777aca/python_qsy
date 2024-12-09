Page({
  data: {
    globalColor: getApp().globalData.globalColor,
    resultData: null,
    hasWatchedAd: false,
    adWatchedTimestamp: null,
    currentAction: null,
    adUnitId: "", // 广告单元 ID
    downloadList: [
      // 合法 download 列表
    ],
  },

  onLoad: function (options) {
    const resultData = JSON.parse(decodeURIComponent(options.data));
    const hasWatchedAd = wx.getStorageSync("hasWatchedAd");
    const adWatchedTimestamp = wx.getStorageSync("adWatchedTimestamp");

    this.setData({
      resultData,
      hasWatchedAd: !!hasWatchedAd,
      adWatchedTimestamp: adWatchedTimestamp || null,
    });
  },

  // 执行具体动作
  handleButtonClick: function (e) {
    const action = e.currentTarget.dataset.action;
    console.log(action);

    switch (action) {
      case "copyTitle":
        this.copyToClipboard(
          this.data.resultData.title + this.data.resultData.decs,
          "复制成功"
        );
        break;
      case "downloadVideo":
        this.downloadVideo(this.data.resultData.video);
        break;
      case "downloadAllPics":
        this.downloadAllPics(this.data.resultData.resourcePath);
        break;
      case "downloadCurrentVideo":
        this.downloadCurrentVideo();
        break;
      default:
        break;
    }
  },

  // 下载当前 live 视频
  downloadCurrentVideo: function () {
    const videoUrl = this.data.currentVideoUrl; // 获取当前视频 URL

    if (!videoUrl || !this.isUrlInDownloadList(videoUrl)) {
      wx.showToast({ title: "链接不合法", icon: "none" });
      return;
    }

    wx.showLoading({ title: "下载视频中..." });
    wx.downloadFile({
      url: videoUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          this.saveFile(
            res.tempFilePath,
            "saveVideoToPhotosAlbum",
            "视频保存成功"
          );
        } else {
          wx.showToast({ title: "视频下载失败", icon: "none" });
        }
      },
      fail: () =>
        wx.showToast({
          title: "下载失败，请复制链接后用浏览器下载",
          icon: "none",
        }),
      complete: () => wx.hideLoading(),
    });
  },

  // 保存文件到相册
  saveFile: function (filePath, saveMethod, successMessage) {
    wx[saveMethod]({
      filePath,
      success: () => wx.showToast({ title: successMessage, icon: "success" }),
      fail: () => wx.showToast({ title: "保存到相册失败", icon: "none" }),
    });
  },

  // 判断 URL 是否在合法列表
  isUrlInDownloadList: function (url) {
    return this.data.downloadList.some((validUrl) => url.includes(validUrl));
  },
  // 下载视频
  downloadVideo: function (url) {
    wx.downloadFile({
      url,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: "视频已保存",
              });
            },
            fail() {
              wx.showToast({
                title: "保存失败",
                icon: "none",
              });
            },
          });
        }
      },
    });
  },
  downloadAllPics: function () {
    const imageUrls = this.data.resultData.resourcePath;
    imageUrls.forEach((url) => {
      wx.downloadFile({
        url: url,
        success(res) {
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: "图片已保存",
                });
              },
              fail() {
                wx.showToast({
                  title: "保存失败",
                  icon: "none",
                });
              },
            });
          }
        },
      });
    });
  },

  // 复制到剪贴板
  copyToClipboard: function (data, successMessage) {
    wx.setClipboardData({
      data,
      success: () => wx.showToast({ title: successMessage, icon: "success" }),
    });
  },
});
