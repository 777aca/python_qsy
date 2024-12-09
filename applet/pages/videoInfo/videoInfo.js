(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/videoInfo/videoInfo" ], {
    "2d37": function(e, o, t) {
        "use strict";
        var a = t("c21d"), n = t.n(a);
        n.a;
    },
    "4f34": function(e, o, t) {
        "use strict";
        (function(e, o) {
            var a = t("47a9");
            t("37d4");
            a(t("3240"));
            var n = a(t("7305"));
            e.__webpack_require_UNI_MP_PLUGIN__ = t, o(n.default);
        }).call(this, t("3223")["default"], t("df3c")["createPage"]);
    },
    "63bf": function(e, o, t) {
        "use strict";
        t.r(o);
        var a = t("d593"), n = t.n(a);
        for (var r in a) [ "default" ].indexOf(r) < 0 && function(e) {
            t.d(o, e, function() {
                return a[e];
            });
        }(r);
        o["default"] = n.a;
    },
    7305: function(e, o, t) {
        "use strict";
        t.r(o);
        var a = t("e3e4"), n = t("63bf");
        for (var r in n) [ "default" ].indexOf(r) < 0 && function(e) {
            t.d(o, e, function() {
                return n[e];
            });
        }(r);
        t("2d37");
        var l = t("828b"), i = Object(l["a"])(n["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], void 0);
        o["default"] = i.exports;
    },
    c21d: function(e, o, t) {},
    d593: function(e, o, t) {
        "use strict";
        (function(e, a) {
            var n = t("47a9");
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var r = n(t("7ca3")), l = {
                components: {
                    cmdProgress: function() {
                        t.e("components/cmd-progress/cmd-progress").then(function() {
                            return resolve(t("37ea"));
                        }.bind(null, t)).catch(t.oe);
                    }
                },
                data: function() {
                    var e;
                    return e = {
                        videoUrl: getApp().globalData.playAddr,
                        percent: 0,
                        fileStatus: "success",
                        rewardedVideoAd: null,
                        videoType: 0,
                        prizeContent: getApp().globalData.prizeContent
                    }, (0, r.default)(e, "rewardedVideoAd", null), (0, r.default)(e, "author", getApp().globalData.author), 
                    (0, r.default)(e, "cover", getApp().globalData.cover), (0, r.default)(e, "title", null), 
                    (0, r.default)(e, "currentTimeStamp", null), (0, r.default)(e, "showAd", !1), (0, 
                    r.default)(e, "ad", ""), (0, r.default)(e, "videoAfterAd", ""), (0, r.default)(e, "downLoadType", 1), 
                    (0, r.default)(e, "adError", 0), (0, r.default)(e, "globalColor", getApp().globalData.globalColor), 
                    e;
                },
                onLoad: function(e) {
                    this.ad = getApp().globalData.videoAd, this.showAd = !0, this.createRewardCard(), 
                    this.createRewardVideo(), this.percent = 0;
                    var o = getApp().globalData.autoDownload;
                    null != e.type && (this.videoType = e.type), null != o && 1 == o && this.downFile(1, this.videoUrl);
                },
                onShareAppMessage: function(e) {
                    return {
                        title: getApp().globalData.shareTitle,
                        path: "/pages/index/index",
                        imageUrl: getApp().globalData.sharePic
                    };
                },
                methods: {
                    back: function() {
                        e.switchTab({
                            url: "../index/index"
                        });
                    },
                    createRewardVideo: function() {
                        var o = this;
                        try {
                            this.rewardedVideoAd = a.createRewardedVideoAd({
                                adUnitId: getApp().globalData.videoAdReward
                            }), this.rewardedVideoAd.onError(function(e) {
                                console.log("=============================" + e), o.adError = 1;
                            }), o.rewardedVideoAd.onClose(function(t) {
                                t && t.isEnded ? (console.log("===========广告看完了==========="), e.request({
                                    url: o.$reqUrl + "/lyz/updateUserAdTimes?uid=" + getApp().globalData.uid,
                                    method: "get",
                                    success: function(e) {
                                        console.log(e.data);
                                    }
                                }), o.startDownLoad(o.downLoadType, o.videoUrl)) : e.showModal({
                                    content: getApp().globalData.adTip
                                });
                            });
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            console.log("========ssssssss=====================" + err), o.adError = 1, o.startDownLoad(o.downLoadType, o.videoUrl), 
                            console.log(t);
                        }
                    },
                    createRewardCard: function() {
                        var e = null;
                        if (a.createInterstitialAd) {
                            e = a.createInterstitialAd({
                                adUnitId: getApp().globalData.videoAdCard
                            }), e.onLoad(function() {
                                console.log("onLoad event emit");
                            }), e.onError(function(e) {
                                console.log("onError event emit", e);
                            }), e.onClose(function(e) {
                                console.log("onClose event emit", e);
                            });
                            var o = Math.floor(10 * Math.random());
                            4 != o && 8 != o || e.show().catch(function(e) {
                                console.error(e);
                            });
                        }
                    },
                    copyCover: function() {
                        e.setClipboardData({
                            data: getApp().globalData.cover,
                            success: function() {
                                e.showModal({
                                    content: "已经复制链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    copyMvUrl: function() {
                        var o = this;
                        e.setClipboardData({
                            data: o.videoUrl,
                            success: function() {
                                e.setStorageSync(o.videoUrl, o.videoUrl), e.showModal({
                                    content: "已经复制无水印链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    skipToPrize: function() {
                        1 == getApp().globalData.prizeType ? e.previewImage({
                            urls: [ getApp().globalData.prizeImg ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ]
                            }
                        }) : e.navigateToMiniProgram({
                            appId: "wx18a2ac992306a5a4",
                            path: getApp().globalData.prizePath
                        });
                    },
                    skipToWeb: function(o) {
                        e.navigateTo({
                            url: "../parse/parse?conId=27"
                        });
                    },
                    downFile: function(o, t) {
                        var a = this;
                        a.downLoadType = o;
                        var n = new Date().valueOf();
                        if (console.log(n), null == a.currentTimeStamp) a.currentTimeStamp = n; else {
                            if (n - a.currentTimeStamp < 5e3) return void e.showModal({
                                content: "下载频率过快，请两秒后重新下载"
                            });
                            a.currentTimeStamp = n;
                        }
                        1 != a.videoType || 1 != o ? (e.showLoading({
                            title: "初始化资源"
                        }), e.request({
                            url: a.$reqUrl + "/lyz/getUserAdTimes?uid=" + getApp().globalData.uid,
                            method: "get",
                            success: function(e) {
                                if (e.data.data < getApp().globalData.watchTimes && 0 == a.adError) try {
                                    a.rewardedVideoAd.show().catch(function() {
                                        a.rewardedVideoAd.load().then(function() {
                                            return a.rewardedVideoAd.show();
                                        }).catch(function(e) {
                                            a.startDownLoad(o, t);
                                        });
                                    });
                                } catch (n) {
                                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                                    a.startDownLoad(o, t);
                                } else a.startDownLoad(o, t);
                            },
                            complete: function(o) {
                                e.hideLoading();
                            }
                        })) : e.showModal({
                            content: "该视频超过50M,请复制视频链接到浏览器下载"
                        });
                    },
                    startDownLoad: function(o, t, a) {
                        var n = this;
                        e.showLoading({
                            title: "加载下载资源中"
                        }), e.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                n.percent = 0, n.fileStatus = "active", e.request({
                                    url: n.$reqUrl + "/lyz/getDownLoadFileUrl",
                                    method: "POST",
                                    timeout: 35e3,
                                    data: {
                                        link: t,
                                        type: o,
                                        source: n.$source,
                                        origin: a
                                    },
                                    success: function(t) {
                                        if ("0001" === t.data.code) {
                                            var a = e.downloadFile({
                                                url: t.data.data,
                                                success: function(t) {
                                                    200 === t.statusCode ? 1 == o ? (e.saveVideoToPhotosAlbum({
                                                        filePath: t.tempFilePath
                                                    }), console.log("保存视频到相册")) : 2 == o && (e.saveImageToPhotosAlbum({
                                                        filePath: t.tempFilePath
                                                    }), console.log("保存图片到相册")) : e.showModal({
                                                        content: "资源无法访问，请联系作者反馈"
                                                    });
                                                },
                                                fail: function() {
                                                    e.showModal({
                                                        content: "下载失败，请复制无水印链接到浏览器下载"
                                                    });
                                                }
                                            });
                                            a.onProgressUpdate(function(o) {
                                                n.percent = o.progress, 100 == o.progress && e.showToast({
                                                    icon: "success",
                                                    title: "文件已保存到相册"
                                                });
                                            });
                                        } else e.showModal({
                                            content: "资源文件暂时无法下载 请复制无水印链接到浏览器下载 有疑问请联系微信 " + getApp().globalData.author
                                        });
                                    },
                                    complete: function() {
                                        e.hideLoading();
                                    }
                                });
                            },
                            fail: function(o) {
                                e.hideLoading(), e.showModal({
                                    content: "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]"
                                });
                            }
                        });
                    },
                    targetMp4Download: function(o, t) {
                        var n = this;
                        e.showToast({
                            title: "保存相册中",
                            icon: "loading"
                        }), n.percent = 0, n.fileStatus = "active";
                        var r = Math.random().toString(36).substr(2), l = null;
                        l = 1 == o ? r + ".mp4" : r + ".png";
                        var i = a.env.USER_DATA_PATH + "/" + l, d = e.downloadFile({
                            url: t,
                            filePath: i,
                            success: function(t) {
                                200 === t.statusCode ? 1 == o ? (e.saveVideoToPhotosAlbum({
                                    filePath: i,
                                    success: function() {
                                        console.log("save success");
                                    },
                                    fail: function(e) {
                                        console.log("save error" + e);
                                    }
                                }), console.log("保存视频到相册")) : 2 == o && (e.saveImageToPhotosAlbum({
                                    filePath: i
                                }), console.log("保存图片到相册")) : e.showModal({
                                    content: "资源无法访问，请联系作者反馈"
                                });
                            },
                            fail: function() {
                                e.showModal({
                                    content: "下载失败，请复制无水印链接到浏览器下载"
                                });
                            }
                        });
                        d.onProgressUpdate(function(o) {
                            n.percent = o.progress, 100 == o.progress && e.showToast({
                                icon: "success",
                                title: "文件已保存到相册"
                            });
                        });
                    }
                }
            };
            o.default = l;
        }).call(this, t("df3c")["default"], t("3223")["default"]);
    },
    e3e4: function(e, o, t) {
        "use strict";
        t.d(o, "b", function() {
            return n;
        }), t.d(o, "c", function() {
            return r;
        }), t.d(o, "a", function() {
            return a;
        });
        var a = {
            cmdProgress: function() {
                return t.e("components/cmd-progress/cmd-progress").then(t.bind(null, "37ea"));
            },
            privacyPopup: function() {
                return t.e("components/privacy-popup/privacy-popup").then(t.bind(null, "298e"));
            }
        }, n = function() {
            var e = this.$createElement;
            this._self._c;
        }, r = [];
    }
}, [ [ "4f34", "common/runtime", "common/vendor" ] ] ]);