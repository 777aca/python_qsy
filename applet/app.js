App({
  // 初始化基础数据
  initBaseData() {
    const defaultGlobalData = {
      userInfo: null,
      reqUrl: "https://777aca.cn/",
      uid: 0,
      isFirstLogin: false,
      showVideoCourse: false,
      author: "微信:btc403",
      notice: "有问题请及时联系作者进行反馈",
      x: 0,
      y: 0,
      width: 10,
      height: 10,
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
      nickName: "用户",
      headUrl: "",
      watchTimes: 1,
      autoDownload: false,
      adTip: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
      sharePic: "",
      playAddr: null,
      cover: null,
      shareBtn: "分享给好友",
      indexAd: "",
      videoAd: "",
      videoAdReward: "",
      videoAdCard: "",
      toolAd: "",
      myAd: "",
      videoAdAfter: "",
      parseAd: "",
      parseAdCard: "",
      batchAd: "",
      fontAd: "",
      md5Ad: "",
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
    };

    // 合并已有数据，防止被覆盖
    this.globalData = { ...defaultGlobalData, ...this.globalData };
  },

  // 用户注册逻辑
  registerUser() {
    // const logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync("logs", logs);
    // wx.login({
    //   success: (res) => {
    //     if (res.code) {
    //       console.log("登录成功，Code:", res.code);
    //       // TODO: 发送 res.code 到后台获取 openId, sessionKey, unionId
    //     } else {
    //       console.error("登录失败：", res.errMsg);
    //     }
    //   },
    // });
  },

  // App生命周期事件
  onLaunch() {
    console.log("App Launch");
    this.initBaseData();
    this.registerUser();
  },

  onShow() {
    console.log("App Show");
  },

  onHide() {
    console.log("App Hide");
  },

  // 全局数据
  globalData: {
    // 可扩展全局数据
  },
});
