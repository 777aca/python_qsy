Page({
  data: {
    globalColor: getApp().globalData.globalColor,
    resultData: null,
    hasWatchedAd: false,
    adWatchedTimestamp: null,
    currentAction: null,
    adUnitId: "", // 广告单元 ID
    selectedVideos: new Set(), // 存储已选中的视频
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

  // 处理勾选框变化
  onCheckboxChange: function (e) {
    const selectedValues = e.detail.value;
    const selectedVideos = new Set(selectedValues); // 使用 Set 更新选中的视频
    console.log(selectedVideos);
    this.setData({
      selectedVideos,
    });
  },
  // 判断视频是否选中
  isChecked: function (item) {
    return this.data.selectedVideos.has(item); // 使用 Set 的 has 方法判断
  },

  // 执行具体动作
  handleButtonClick: function (e) {
    const action = e.currentTarget.dataset.action;
    switch (action) {
      case "copyTitle":
        this.copyToClipboard(
          `${this.data.resultData.title}`,
          "复制成功"
        );
        break;
      case "downloadVideo":
        this.downloadVideo(this.data.resultData.video);
        break;
      case "downloadAllPics":
        this.downloadAllPics(this.data.resultData.resourcePath);
        break;
      case "downloadSelectedVideos":
        this.downloadSelectedVideos();
        break;
      default:
        break;
    }
  },

  downloadSelectedVideos: function () {
    const selectedVideos = this.data.selectedVideos;
    if (!selectedVideos.size) {
      wx.showToast({
        title: "请选择视频",
        icon: "none",
      });
      return;
    }

    // 这里可以进行下载操作
    selectedVideos.forEach((videoUrl) => {
      wx.downloadFile({
        url: videoUrl,
        success(res) {
          console.log(res);
          if (res.statusCode === 200) {
            // 调用 saveVideoToPhotosAlbum 直接保存到相册
            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: "视频保存成功",
                  icon: "success",
                });
              },
              fail() {
                wx.showToast({
                  title: "视频保存失败",
                  icon: "none",
                });
              },
            });
          } else {
            wx.showToast({
              title: "下载失败",
              icon: "none",
            });
          }
        },
        fail() {
          wx.showToast({
            title: "下载失败",
            icon: "none",
          });
        },
      });
    });
  },

  // 保存文件到相册
  saveFile: function (filePath, saveMethod, successMessage) {
    wx[saveMethod]({
      filePath,
      success: () =>
        wx.showToast({
          title: successMessage,
          icon: "success",
        }),
      fail: () =>
        wx.showToast({
          title: "保存到相册失败",
          icon: "none",
        }),
    });
  },

  // 判断 URL 是否在合法列表
  isUrlInDownloadList: function (url) {
    return this.data.downloadList.some((validUrl) => url.includes(validUrl));
  },
  previewImage: function (e) {
    const current = e.target.dataset.src; // 获取当前点击的图片URL
    wx.previewImage({
      current: current, // 当前显示的图片链接
      urls: this.data.resultData.resourcePath, // 需要预览的图片http链接列表
    });
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
      success: () =>
        wx.showToast({
          title: successMessage,
          icon: "success",
        }),
    });
  },
});
