(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "common/main" ], {
    "10c4": function(t, e, o) {},
    "24f0": function(t, e, o) {
        "use strict";
        var a = o("10c4"), n = o.n(a);
        n.a;
    },
    "5b35": function(t, e, o) {
        "use strict";
        (function(t, a) {
            var n = o("47a9");
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var r = n(o("3240")), i = {
                onLaunch: function() {
                    console.log("App Launch"), this.initBaseData(), this.registerUser();
                    var e = this;
                    t.getSystemInfo({
                        success: function(t) {
                            r.default.prototype.StatusBar = t.statusBarHeight;
                            var o = a.getMenuButtonBoundingClientRect();
                            r.default.prototype.Custom = o, r.default.prototype.CustomBar = o.bottom + o.top - t.statusBarHeight, 
                            e.globalData.barHeight = r.default.prototype.CustomBar;
                        }
                    });
                },
                onShow: function() {
                    console.log("App Show");
                },
                onHide: function() {
                    console.log("App Hide");
                },
                globalData: {
                    uid: 0,
                    isFirstLogin: !1,
                    showVideoCourse: !1,
                    author: "微信:btc403",
                    notice: "有问题请及时联系作者进行反馈",
                    x: 0,
                    y: 0,
                    width: 10,
                    height: 10,
                    prizeContent: "赞赏下作者 下载提速",
                    prizePath: "pages/apps/largess/detail?id=fmpt2URXZgCgPc1CLmE7uw%3D%3D",
                    banner: [ {
                        imgUrl: "http://parse-video-server.oss-cn-hangzhou.aliyuncs.com/oDXAOay1MYfbl7h.png",
                        type: 0
                    } ],
                    videoAdTimes: 3,
                    batchAnalyse: 2,
                    shareImg: "http://parse-video-server.oss-cn-hangzhou.aliyuncs.com/share/mangguogongju.png",
                    shareTitle: "抖音、快手、皮皮虾短视频一键去水印,去水印还能这么简单",
                    prizeImg: "http://parse-video-server.oss-cn-hangzhou.aliyuncs.com/share/prizeImg.png",
                    prizeType: 0,
                    nickName: "用户",
                    headUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg",
                    watchTimes: 1,
                    autoDownload: !1,
                    adTip: "还没有看完广告 一天仅需看一次广告 24小时免除广告",
                    sharePic: "http://parse-video-server.oss-cn-hangzhou.aliyuncs.com/share.png",
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
                    parseTitle: "爱酱去水印"
                },
                methods: {
                    initBaseData: function() {
                        var e = t.getStorageSync("autoDownload");
                        null != e && "undefined" != typeof e && (this.$options.globalData.autoDownload = e);
                        var o = t.getStorageSync("basedata");
                        null != o && "undefined" != typeof o && "" != o && (console.log("加载本地缓存中的基础数据"), 
                        null != o.author && (this.$options.globalData.author = o.author), null != o.videoAd && (this.$options.globalData.prizeImg = o.videoAd), 
                        this.$options.globalData.prizeContent = o.link, this.$options.globalData.showVideoCourse = o.course, 
                        this.$options.globalData.notice = o.content, this.$options.globalData.prizePath = o.prizePath, 
                        this.$options.globalData.banner = o.bannerList, this.$options.globalData.batchAnalyse = o.batchAnalyse, 
                        this.$options.globalData.shareImg = o.adPath);
                    },
                    registerUser: function() {
                        var e = this, o = t.getStorageSync("token");
                        o && (console.log(o), e.$options.globalData.token = o), a.login({
                            success: function(o) {
                                var a = o.code;
                                t.request({
                                    url: e.$reqUrl + "/video/registryUser",
                                    data: {
                                        code: a,
                                        programType: e.$source
                                    },
                                    success: function(o) {
                                        "0001" == o.data.code ? (console.log(o.data.data), t.setStorageSync("userId", o.data.data.userId), 
                                        e.$options.globalData.uid = o.data.data.userId, e.$options.globalData.token = o.data.data.token, 
                                        t.setStorageSync("token", o.data.data.token)) : t.showModal({
                                            content: "注册用户信息异常"
                                        });
                                    },
                                    fail: function(e) {
                                        t.showModal({
                                            content: "服务器维护中 请稍后重试 有问题请联系作者"
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            };
            e.default = i;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    c815: function(t, e, o) {
        "use strict";
        (function(t, e) {
            var a = o("47a9"), n = a(o("7ca3"));
            o("37d4");
            var r = a(o("3240")), i = a(o("e50b"));
            function s(t, e) {
                var o = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(t);
                    e && (a = a.filter(function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })), o.push.apply(o, a);
                }
                return o;
            }
            t.__webpack_require_UNI_MP_PLUGIN__ = o, r.default.config.productionTip = !1, r.default.prototype.$reqUrl = "https://analyse.layzz.cn/", 
            r.default.prototype.$qrCodeUrl = "https://qrcode.layzz.cn/", r.default.prototype.prizeContent = "赞赏下作者,下载提个速", 
            r.default.prototype.$source = 33;
            r.default.component("cu-custom", function() {
                o.e("colorui/components/cu-custom").then(function() {
                    return resolve(o("e1ad"));
                }.bind(null, o)).catch(o.oe);
            }), r.default.component("PrivacyPopup", function() {
                o.e("components/privacy-popup/privacy-popup").then(function() {
                    return resolve(o("298e"));
                }.bind(null, o)).catch(o.oe);
            });
            r.default.prototype.tui = {}, r.default.prototype.$eventHub = r.default.prototype.$eventHub || new r.default(), 
            i.default.mpType = "app";
            var l = new r.default(function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var o = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? s(Object(o), !0).forEach(function(e) {
                        (0, n.default)(t, e, o[e]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : s(Object(o)).forEach(function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));
                    });
                }
                return t;
            }({}, i.default));
            e(l).$mount();
        }).call(this, o("3223")["default"], o("df3c")["createApp"]);
    },
    da71: function(t, e, o) {
        "use strict";
        o.r(e);
        var a = o("5b35"), n = o.n(a);
        for (var r in a) [ "default" ].indexOf(r) < 0 && function(t) {
            o.d(e, t, function() {
                return a[t];
            });
        }(r);
        e["default"] = n.a;
    },
    e50b: function(t, e, o) {
        "use strict";
        o.r(e);
        var a = o("da71");
        for (var n in a) [ "default" ].indexOf(n) < 0 && function(t) {
            o.d(e, t, function() {
                return a[t];
            });
        }(n);
        o("24f0");
        var r = o("828b"), i = Object(r["a"])(a["default"], void 0, void 0, !1, null, null, null, !1, void 0, void 0);
        e["default"] = i.exports;
    }
}, [ [ "c815", "common/runtime", "common/vendor" ] ] ]);