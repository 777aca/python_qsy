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
    avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    author: "",
    autoCopy: false,
    autoDownload: false,
    myAd: "",
    uid: "",
    globalColor: "",
    openid: "",
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
      openid: wx.getStorageSync("openid"),
      reqUrl: getApp().globalData.reqUrl,
    });

    if (this.data.openid) {
      this.getUser()
    }
  },

  // 微信授权登录
  authorizeLogin() {
    // 获取用户信息
    this.getUserProfile()
      .then(userInfo => {
        console.log(userInfo);
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
  // 获取用户信息
  getUser() {
    wx.request({
      url: `${this.data.reqUrl}/api/get_user_info`, // 后端登录接口
      method: 'POST',
      data: {
        openid: this.data.openid,
      },
      success: (response) => {
        if (response.statusCode == 200) {
          this.setData({
            avatarUrl: response.data.avatar_url,
            nickName: response.data.nickname,
          })
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
          });
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        });
      }
    });
  },

  // 发送登录请求到后端
  sendLoginRequest(code, userInfo) {
    wx.request({
      url: `${this.data.reqUrl}/api/login`, // 后端登录接口
      method: 'POST',
      data: {
        code: code
      },
      success: (response) => {
        console.log(response);
        if (response.data.openid && response.data.session_key) {
          this.saveUserInfo(userInfo.avatarUrl, userInfo.nickName,response.data.openid)
          wx.setStorageSync('openid', response.data.openid);
          this.setData({
            openid:response.data.openid
          })
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
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.saveUserInfo(avatarUrl)

  },
  saveUserInfo(avatar_url, nickname,openid) {
    wx.request({
      url: `${this.data.reqUrl}/api/save_user_info`, // 后端登录接口
      method: 'POST',
      data: {
        openid:openid?openid:this.data.openid,
        avatar_url,
        nickname
      },
      success: (response) => {
        console.log(response);
        if (response.statusCode == 200) {
          // 更新页面数据
          this.setData({
            nickName: response.data.nickname,
            avatarUrl: response.data.avatar_url,
          });
          this.getUser()
          wx.showToast({
            // title: '修改成功',
            icon: 'none',
          });
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
          });
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '修改失败',
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