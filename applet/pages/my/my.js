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
    menus: [{
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

  onLoad() {
    this.initGlobalData();
  },

  onShow() {
    this.initGlobalData(); // 保持数据实时同步
  },

  initGlobalData() {
    const {
      globalData
    } = app;
    this.setData({
      nickName: globalData.nickName,
      avatarUrl: globalData.headUrl,
      author: globalData.author,
      autoCopy: wx.getStorageSync("autoCopy") || globalData.autoCopy,
      autoDownload: globalData.autoDownload,
      myAd: globalData.myAd,
      globalColor: globalData.globalColor,
    });
  },

  // 微信授权登录
  // 微信授权登录
  authorizeLogin() {
    // 获取用户信息
    this.getUserProfile()
      .then(userInfo => {
        // 获取到用户信息后，发起登录请求
        return this.wxLogin()
          .then(code => this.sendLoginRequest(code, userInfo));
      })
      .catch(err => {
        console.error('授权失败:', err);
        wx.showToast({
          title: '授权失败',
          icon: 'none',
        });
      });
  },

  // 获取用户信息
  getUserProfile() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '获取用户信息', // 用于提示用户授权的用途
        success: (res) => {
          console.log('获取用户信息成功', res);
          resolve(res.userInfo); // 通过 Promise 返回用户信息
        },
        fail: (err) => {
          reject(err); // 如果获取失败，reject
        }
      });
    });
  },

  // 微信登录
  wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('微信登录成功，code:', res.code);
            resolve(res.code); // 返回登录的 code
          } else {
            reject('微信登录失败，未获取到code');
          }
        },
        fail: (err) => {
          reject('微信登录失败：' + err.errMsg);
        }
      });
    });
  },

  // 发送登录请求到后端
  sendLoginRequest(code, userInfo) {
    wx.request({
      url: 'https://777aca.cn/api/login', // 后端登录接口
      method: 'POST',
      data: {
        code: code
      },
      success: (response) => {
        if (response.data.openid && response.data.session_key) {
          wx.setStorageSync('openid', response.data.openid);
          console.log('用户登录成功', response.data);
          // 保存用户信息到全局
          const app = getApp();
          app.globalData.nickName = userInfo.nickName;
          app.globalData.headUrl = userInfo.avatarUrl;

          // 更新页面数据
          this.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
          });
        } else {
          wx.showToast({
            title: '登录失败，返回数据不完整',
            icon: 'none',
          });
        }
      },
      fail: (error) => {
        console.error('登录请求失败', error);
        wx.showToast({
          title: '登录请求失败',
          icon: 'none',
        });
      }
    });
  },


  onShareTimeline() {
    const {
      globalData
    } = app;
    return {
      title: globalData.shareTitle,
      query: "/pages/index/index",
      imageUrl: globalData.sharePic,
    };
  },

  navigateToPage(event) {
    const {
      key
    } = event.currentTarget.dataset;

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
      url
    });
  },
});