App({
  // 全局数据
  globalData: {
    created_at: "",
    openid: "",
    userInfo: null,
    reqUrl: "https://777aca.cn",
    uid: 0,
    isFirstLogin: false,
    showVideoCourse: false,
    author: "微信:btc403",
    notice: "有问题请及时联系作者进行反馈",
    prizeContent: "赞赏下作者 下载提速",
    prizePath: "pages/apps/largess/detail?id=fmpt2URXZgCgPc1CLmE7uw%3D%3D",
    banner: [{
      imgUrl: "https://777aca.cn/wp-content/uploads/2024/12/mine_bg_3x.png",
      type: 0,
    }],
    videoAdTimes: 3,
    batchAnalyse: 2,
    shareImg: "",
    shareTitle: "抖音、快手、皮皮虾短视频一键去水印,去水印还能这么简单",
    prizeImg: "",
    prizeType: 0,
    nickName: "",
    headUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
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
    try {
      // 先进行微信登录，然后调用登录请求
      const code = await this.wxLogin();
      await this.sendLoginRequest(code);
    } catch (err) {
      this.showError('微信登录失败，请重试');
    }
  },

  // 微信登录
  wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code); // 返回登录的 code
          } else {
            reject('未获取到 code');
          }
        },
        fail: (err) => {
          reject('微信登录失败：' + err.errMsg);
        }
      });
    });
  },

  // 发送登录请求到后端
  sendLoginRequest(code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://777aca.cn/api/login`, // 后端登录接口
        method: 'POST',
        data: {
          code: code
        },
        success: (response) => {
          if (response.data && response.data.openid) {
            wx.setStorageSync('openid', response.data.openid);
            this.globalData.openid = response.data.openid; // 更新 globalData 中的 openid
            this.getUser();
            resolve(response);
          } else {
            this.showError('登录失败，返回数据不完整');
            reject('返回数据不完整');
          }
        },
        fail: (error) => {
          this.showError('登录请求失败，请重试');
          reject(error);
        }
      });
    });
  },

  // 获取用户信息
  async getUser() {
    const openid = wx.getStorageSync("openid");
    if (!openid) {
      this.showError('未找到openid，请重新登录');
      return;
    }
    wx.showLoading({
      title: "加载中..."
    });

    const response = await this.fetchUserInfo(openid);
    if (response.statusCode == 200 && response.data) {
      const {
        nickname,
        uid,
        created_at
      } = response.data;
      this.globalData.nickName = nickname;
      this.globalData.uid = uid;
      this.globalData.created_at = created_at;
      this.globalData.openid = openid;
      wx.hideLoading()
    } else {
      this.showError('查询失败');
      wx.hideLoading()
    }
  },

  // 发起获取用户信息请求
  fetchUserInfo(openid) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://777aca.cn/api/get_user_info`, // 后端接口
        method: 'POST',
        data: {
          openid
        },
        success: (response) => {
          resolve(response); // 成功时返回
        },
        fail: (error) => {
          reject(error); // 请求失败时进入 reject
        }
      });
    });
  },


  // 统一显示错误提示
  showError(message) {
    wx.showToast({
      title: message,
      icon: 'none',
    });
  },

  // 统一显示成功提示
  showSuccess(message) {
    wx.showToast({
      title: message,
      icon: 'success',
    });
  },

  // App生命周期事件
  onLaunch() {
    // 检查是否有新版本
    const updateManager = wx.getUpdateManager();
    
    updateManager.onCheckForUpdate(function (res) {
      // 返回结果 res.hasUpdate 说明是否有新版本
      if (res.hasUpdate) {
        // 如果有新版本，进行处理
        wx.showToast({
          title: '有新版本啦，正在更新...',
          icon: 'none',
        });
      }
    });
    
    updateManager.onUpdateReady(function () {
      // 新版本下载完成，提示用户重启小程序
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否重启小程序？',
        success(res) {
          if (res.confirm) {
            // 应用新版本，重启小程序
            updateManager.applyUpdate();
          }
        }
      });
    });
    
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showToast({
        title: '新版本更新失败',
        icon: 'none',
      });
    });
    const openid = wx.getStorageSync("openid");
    if (openid) {
      this.getUser(); // 登录后调用获取用户信息
    } else {
      this.registerUser(); // 如果没有openid则进行注册
    }
  },

  onShow() {
    
  },
});