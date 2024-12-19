const {
  loginAndGetToken,
  setToken,
  setOpenid,
  getOpenid,
  request,
} = require("./utils/util.js");

App({
  // 全局数据
  globalData: {
    created_at: "",
    openid: getOpenid(),
    userInfo: null,
    reqUrl: "https://777aca.cn",
    uid: 0,
    isFirstLogin: false,
    showVideoCourse: false,
    author: "微信:btc403",
    notice: "有问题请及时联系作者进行反馈",
    prizeContent: "赞赏下作者 下载提速",
    prizePath: "pages/apps/largess/detail?id=fmpt2URXZgCgPc1CLmE7uw%3D%3D",
    banner: [
      {
        imgUrl: "https://777aca.cn/wp-content/uploads/2024/12/mine_bg_3x.png",
        type: 0,
      },
    ],
    videoAdTimes: 3,
    batchAnalyse: 2,
    shareImg: "",
    shareTitle: "抖音、快手、皮皮虾短视频一键去水印,去水印还能这么简单",
    prizeImg: "",
    prizeType: 0,
    nickName: "",
    headUrl:
      "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    watchTimes: 1,
    autoDownload: false,
    adTip: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
    sharePic: "",
    playAddr: null,
    cover: null,
    shareBtn: "分享给好友",
    videoAdReward: "",
    videoAdCard: "",
    videoAdAfter: "",
    picToTextAd: "",
    barHeight: 60,
    analyseUrl: "请输入视频链接",
    title: "",
    token: "",
    fileType: 0,
    access: "yytkjfgzmnklfgyy",
    pics: [],
    skipList: [],
    course: 0,
    unPlat: [],
    globalColor: "bg-blue",
    parseSkip: 0,
    parseTitle: "爱酱去水印",
  },

  // 用户注册逻辑
  async registerUser() {
    loginAndGetToken()
      .then((response) => {
        setToken(response.data.token);
        setOpenid(response.data.openid);
        this.getUser();
      })
      .catch((error) => {
        console.error("登录失败:", error);
        wx.showToast({
          title: "登录失败",
          icon: "none",
        });
      });
  },

  // 获取用户信息
  async getUser() {
    wx.showLoading({
      title: "加载中...",
    });

    try {
      const response = await this.fetchUserInfo();
      console.log(response);
      if (response.statusCode == 200 && response.data) {
        const { nickname, uid, created_at } = response.data;
        this.globalData.nickName = nickname;
        this.globalData.uid = uid;
        this.globalData.created_at = created_at;
        wx.hideLoading();
      } else {
        this.showError("查询失败");
        wx.hideLoading();
      }
    } catch (e) {
      console.log(e);
    } finally {
      wx.hideLoading();
    }
  },

  // 发起获取用户信息请求
  fetchUserInfo() {
    return new Promise((resolve, reject) => {
      request({
        url: `https://777aca.cn/api/get_user_info`, // 后端接口
        method: "POST",
        data:{
          openid: getOpenid(),
        }
      })
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  // 统一显示错误提示
  showError(message) {
    wx.showToast({
      title: message,
      icon: "none",
    });
  },

  // 统一显示成功提示
  showSuccess(message) {
    wx.showToast({
      title: message,
      icon: "success",
    });
  },

  // App生命周期事件
  onLaunch() {
    console.log("App Launch");

    this.globalData.openid = getOpenid();
    if (getOpenid()) {
      this.getUser(); // 登录后调用获取用户信息
    } else {
      this.registerUser(); // 如果没有openid则进行注册
    }
  },

  autoUpdate() {
    var self = this;
    // 获取小程序更新机制兼容
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: "更新提示",
            content: "检测到新版本，是否下载新版本并重启小程序？",
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager);
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: "温馨提示~",
                  content:
                    "本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~",
                  showCancel: false, //隐藏取消按钮
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager);
                    }
                  },
                });
              }
            },
          });
        }
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate(updateManager) {
    var self = this;
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading();
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate();
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: "已经有新版本了哟~",
        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
      });
    });
  },

  onShow() {
    console.log("App onShow");
    this.autoUpdate();
  },
});
