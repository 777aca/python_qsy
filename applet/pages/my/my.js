(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/my/my" ], {
    "06e5": function(a, t, o) {
        "use strict";
        o.r(t);
        var e = o("6699"), n = o("73b8");
        for (var l in n) [ "default" ].indexOf(l) < 0 && function(a) {
            o.d(t, a, function() {
                return n[a];
            });
        }(l);
        o("3346");
        var i = o("828b"), u = Object(i["a"])(n["default"], e["b"], e["c"], !1, null, null, null, !1, e["a"], void 0);
        t["default"] = u.exports;
    },
    "1d97": function(a, t, o) {
        "use strict";
        (function(a) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var o = {
                data: function() {
                    return {
                        nickName: getApp().globalData.nickName,
                        avatarUrl: getApp().globalData.headUrl,
                        author: getApp().globalData.author,
                        autoCopy: getApp().globalData.autoCopy,
                        autoDownload: getApp().globalData.autoDownload,
                        myAd: getApp().globalData.myAd,
                        uid: getApp().globalData.uid,
                        globalColor: getApp().globalData.globalColor,
                        showAd: !1,
                        status: [ {
                            key: 1,
                            name: "教程",
                            url: "../../static/img/learn.png"
                        }, {
                            key: 2,
                            name: "解析记录",
                            url: "../../static/img/record.png"
                        }, {
                            key: 3,
                            name: "小程序码",
                            url: "../../static/img/qrcode.png"
                        } ],
                        menus: [ {
                            name: "联系作者",
                            icon: "../../static/img/concat.png",
                            key: 1
                        } ]
                    };
                },
                onLoad: function() {
                    this.myAd = getApp().globalData.myAd, this.showAd = !0;
                    var t = a.getStorageSync("autoCopy");
                    t && (this.autoCopy = t);
                },
                onShow: function() {
                    this.nickName = getApp().globalData.nickName, this.avatarUrl = getApp().globalData.headUrl;
                },
                onShareAppMessage: function(a) {
                    return {
                        title: "抖音、快手、皮皮虾短视频一键去水印,去水印还能这么简单,图片也可以去水印哟",
                        path: "/pages/index/index",
                        imageUrl: "http://parse-video-server.oss-cn-hangzhou.aliyuncs.com/share.png"
                    };
                },
                onShareTimeline: function() {
                    return {
                        title: getApp().globalData.shareTitle,
                        query: "/pages/index/index",
                        imageUrl: getApp().globalData.sharePic
                    };
                },
                methods: {
                    changeChecked: function() {
                        this.autoCopy = !this.autoCopy, getApp().globalData.autoCopy = this.autoCopy, a.setStorageSync("autoCopy", this.autoCopy);
                    },
                    toPage: function(t) {
                        console.log(t), 0 == t ? a.setClipboardData({
                            data: getApp().globalData.author,
                            success: function(t) {
                                a.showModal({
                                    content: "已复制作者微信"
                                });
                            }
                        }) : this.autoDownload ? (this.autoDownload = !1, getApp().globalData.autoDownload = !1, 
                        a.setStorageSync("autoDownload", !1), a.showModal({
                            content: "自动下载功能已经关闭，解析成功后需要手动点击保存到相册"
                        })) : (this.autoDownload = !0, getApp().globalData.autoDownload = !0, a.setStorageSync("autoDownload", !0), 
                        a.showModal({
                            content: "自动下载功能已经开启，解析成功后系统自动保存到相册"
                        }));
                    },
                    page: function(t) {
                        if (0 == t) a.navigateTo({
                            url: "../parse/parse?conId=3"
                        }); else if (1 == t) a.navigateTo({
                            url: "../list/list"
                        }); else if (2 == t) {
                            a.previewImage({
                                urls: [ getApp().globalData.shareImg ],
                                longPressActions: {
                                    itemList: [ "发送给朋友", "保存图片", "收藏" ]
                                }
                            });
                        } else {
                            a.previewImage({
                                urls: [ getApp().globalData.prizeImg ],
                                longPressActions: {
                                    itemList: [ "发送给朋友", "保存图片", "收藏" ]
                                }
                            });
                        }
                    }
                },
                computed: {}
            };
            t.default = o;
        }).call(this, o("df3c")["default"]);
    },
    3346: function(a, t, o) {
        "use strict";
        var e = o("d600"), n = o.n(e);
        n.a;
    },
    6699: function(a, t, o) {
        "use strict";
        o.d(t, "b", function() {
            return e;
        }), o.d(t, "c", function() {
            return n;
        }), o.d(t, "a", function() {});
        var e = function() {
            var a = this.$createElement;
            this._self._c;
        }, n = [];
    },
    "73b8": function(a, t, o) {
        "use strict";
        o.r(t);
        var e = o("1d97"), n = o.n(e);
        for (var l in e) [ "default" ].indexOf(l) < 0 && function(a) {
            o.d(t, a, function() {
                return e[a];
            });
        }(l);
        t["default"] = n.a;
    },
    b45c: function(a, t, o) {
        "use strict";
        (function(a, t) {
            var e = o("47a9");
            o("37d4");
            e(o("3240"));
            var n = e(o("06e5"));
            a.__webpack_require_UNI_MP_PLUGIN__ = o, t(n.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    d600: function(a, t, o) {}
}, [ [ "b45c", "common/runtime", "common/vendor" ] ] ]);