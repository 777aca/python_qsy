(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/music/music" ], {
    "00d5": function(t, e, n) {
        "use strict";
        (function(t, e) {
            var o = n("47a9");
            n("37d4");
            o(n("3240"));
            var i = o(n("87f9"));
            t.__webpack_require_UNI_MP_PLUGIN__ = n, e(i.default);
        }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    "67c0": function(t, e, n) {
        "use strict";
        n.r(e);
        var o = n("c29c"), i = n.n(o);
        for (var a in o) [ "default" ].indexOf(a) < 0 && function(t) {
            n.d(e, t, function() {
                return o[t];
            });
        }(a);
        e["default"] = i.a;
    },
    8242: function(t, e, n) {
        "use strict";
        var o = n("a2e9"), i = n.n(o);
        i.a;
    },
    "87f9": function(t, e, n) {
        "use strict";
        n.r(e);
        var o = n("a24f"), i = n("67c0");
        for (var a in i) [ "default" ].indexOf(a) < 0 && function(t) {
            n.d(e, t, function() {
                return i[t];
            });
        }(a);
        n("8242");
        var u = n("828b"), c = Object(u["a"])(i["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        e["default"] = c.exports;
    },
    a24f: function(t, e, n) {
        "use strict";
        n.d(e, "b", function() {
            return i;
        }), n.d(e, "c", function() {
            return a;
        }), n.d(e, "a", function() {
            return o;
        });
        var o = {
            privacyPopup: function() {
                return n.e("components/privacy-popup/privacy-popup").then(n.bind(null, "298e"));
            }
        }, i = function() {
            var t = this.$createElement;
            this._self._c;
        }, a = [];
    },
    a2e9: function(t, e, n) {},
    c29c: function(t, e, n) {
        "use strict";
        (function(t, n) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = {
                data: function() {
                    return {
                        tempFilePath: "",
                        result: !1,
                        text: "",
                        handleFaceStatus: !1,
                        resultImg: "",
                        musicUrl: "",
                        innerAudioContext: null,
                        showMusic: !1
                    };
                },
                onLoad: function() {
                    this.initAudio();
                },
                onShareAppMessage: function(t) {
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
                    initAudio: function() {
                        this.innerAudioContext = t.createInnerAudioContext();
                    },
                    copyMusic: function() {
                        var e = this;
                        t.setClipboardData({
                            data: e.musicUrl,
                            success: function() {
                                t.setStorageSync(e.musicUrl, e.musicUrl), t.showModal({
                                    content: "已经复制链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    handleAudio: function(t) {
                        1 == t ? this.innerAudioContext.play() : this.innerAudioContext.stop();
                    },
                    upload: function() {
                        var e = this;
                        t.chooseVideo({
                            count: 1,
                            sourceType: [ "album" ],
                            success: function(n) {
                                e.showMusic = !1;
                                var o = (n.size / 1048576).toFixed(2);
                                console.log("视频大小:" + o), o > 30 ? t.showModal({
                                    content: "视频超过30M,暂时无法处理"
                                }) : (e.tempFilePath = n.tempFilePath, e.result = !0);
                            }
                        });
                    },
                    complete: function() {
                        var e = this;
                        t.showLoading({
                            title: "处理中"
                        });
                        getApp().globalData;
                        t.uploadFile({
                            url: e.$qrCodeUrl + "/upload/file",
                            filePath: e.tempFilePath,
                            name: "file",
                            formData: {
                                user: "test"
                            },
                            success: function(o) {
                                console.log(o);
                                var i = JSON.parse(o.data).data;
                                console.log(i), n.login({
                                    success: function(n) {
                                        var o = n.code;
                                        t.request({
                                            url: e.$qrCodeUrl + "/upload/videoMusic",
                                            data: {
                                                code: o,
                                                filePath: i,
                                                source: e.$source
                                            },
                                            method: "POST",
                                            success: function(n) {
                                                t.showToast({
                                                    title: "提取成功"
                                                }), "0001" === n.data.code ? (console.log(n.data), e.musicUrl = n.data.data, e.innerAudioContext.src = e.musicUrl, 
                                                e.showMusic = !0) : t.showModal({
                                                    content: "未知错误，请联系作者进行解决"
                                                });
                                            },
                                            complete: function(e) {
                                                t.hideLoading();
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function(e) {
                                t.showModal({
                                    content: "上传失败，请联系作者进行解决"
                                }), t.hideLoading();
                            }
                        });
                    },
                    downloadFile: function() {
                        t.showLoading({
                            title: "下载中",
                            mask: !0
                        }), t.downloadFile({
                            url: this.musicUrl,
                            success: function(e) {
                                200 === e.statusCode ? t.saveFile({
                                    tempFilePath: e.tempFilePath,
                                    success: function(e) {
                                        var n = e.savedFilePath;
                                        t.showModal({
                                            title: "文件路径:" + n
                                        });
                                    }
                                }) : t.showModal({
                                    title: "下载失败，请复制音乐链接，打开手机浏览器下载"
                                });
                            },
                            fail: function() {
                                t.showModal({
                                    content: "下载失败，请复制音乐链接到浏览器下载"
                                });
                            },
                            complete: function() {
                                t.hideLoading();
                            }
                        });
                    }
                }
            };
            e.default = o;
        }).call(this, n("df3c")["default"], n("3223")["default"]);
    }
}, [ [ "00d5", "common/runtime", "common/vendor" ] ] ]);