const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

// utils.js

function getToken() {
  return wx.getStorageSync("token");
}

function setToken(token) {
  wx.setStorageSync("token", token);
}

function getOpenid() {
  return wx.getStorageSync("openid");
}

function setOpenid(openid) {
  wx.setStorageSync("openid", openid);
}

function loginAndGetToken() {
  return new Promise((resolve, reject) => {
    // 调用 wx.login 获取 code
    wx.login({
      success: (res) => {
        if (res.code) {
          // 获取 code 后，发送请求到后端登录接口
          wx.request({
            url: "https://777aca.cn/api/login", // 后端登录接口
            method: "POST",
            data: { code: res.code }, // 将 code 发送给后端
            success: (response) => {
              if (response.data && response.data.token) {
                // 成功获取 token 和 openid
                setToken(response.data.token);
                setOpenid(response.data.openid);
                resolve(response);
              } else {
                reject("登录失败，返回数据不完整");
              }
            },
            fail: (error) => {
              reject("登录请求失败，请重试");
            },
          });
        } else {
          reject("未获取到 code");
        }
      },
      fail: (err) => {
        reject("微信登录失败：" + err.errMsg);
      },
    });
  });
}

// 请求封装
function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    wx.request({
      ...options, // 扩展 options（这会把 options 的所有属性先放到请求中）
      data: {
        ...options.data, // 保留原本的 data，并且追加 openid
        openid: getOpenid(),
      },
      header: {
        ...options.header, // 保留原本的 headers，并添加 Authorization
        Authorization: `Bearer ${token}`,
      },
      success(res) {
        if (res.statusCode === 401) {
          reject("Token失效，请刷新页面");
          loginAndGetToken()
            .then((response) => {
              console.log("登录成功，获取 token:", response);
              setToken(response.data.token);
              setOpenid(response.data.openid);
              // 重新加载数据或页面
              getApp().onLaunch();
            })
            .catch((error) => {
              console.error("登录失败:", error);
              wx.showToast({
                title: "登录失败",
                icon: "none",
              });
              reject(error);
            });
        } else if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          reject(res.error);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

module.exports = {
  formatTime,
  request,
  loginAndGetToken,
  getOpenid,
  setOpenid,
  getToken,
  setToken,
};
