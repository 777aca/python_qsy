(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/index/index" ], {
    5493: function(a, t, e) {
        "use strict";
        var o = e("bae6"), n = e.n(o);
        n.a;
    },
    "6f72": function(a, t, e) {
        "use strict";
        (function(a, t) {
            var o = e("47a9");
            e("37d4");
            o(e("3240"));
            var n = o(e("f3a1"));
            a.__webpack_require_UNI_MP_PLUGIN__ = e, t(n.default);
        }).call(this, e("3223")["default"], e("df3c")["createPage"]);
    },
    bae6: function(a, t, e) {},
    c74c: function(a, t, e) {
        "use strict";
        e.r(t);
        var o = e("e665"), n = e.n(o);
        for (var l in o) [ "default" ].indexOf(l) < 0 && function(a) {
            e.d(t, a, function() {
                return o[a];
            });
        }(l);
        t["default"] = n.a;
    },
    e665: function(a, t, e) {
        "use strict";
        (function(a, e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var o = {
                data: function() {
                    return {
                        notice: getApp().globalData.notice,
                        animation: !1,
                        cardCur: 0,
                        banner: getApp().globalData.banner,
                        dotStyle: !1,
                        towerStart: 0,
                        direction: "",
                        analyseUrl: "",
                        modalName: null,
                        skin: !1,
                        listTouchStart: 0,
                        listTouchDirection: null,
                        copyData: "",
                        rewardedVideoAd: null,
                        videoAd: "",
                        prizeContent: getApp().globalData.prizeContent,
                        showNotice: !0,
                        currentTimeStamp: null,
                        shareBtn: getApp().globalData.shareBtn,
                        indexAd: "",
                        showAd: !1,
                        showTip: !0,
                        appName: "去水印",
                        barHeight: getApp().globalData.barHeight,
                        prizeType: getApp().globalData.prizeType,
                        globalColor: getApp().globalData.globalColor
                    };
                },
                onLoad: function() {
                    this.initBaseData();
                    var t = a.getStorageSync("autoTip");
                    t.length > 5 && (this.showTip = !1);
                    setTimeout(()=>{
                      this.closeNotice()
                    },3000)
                },
                onShow: function() {},
                onShareAppMessage: function(a) {
                    return {
                        title: getApp().globalData.shareTitle,
                        path: "/pages/index/index",
                        imageUrl: getApp().globalData.sharePic
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
                    closeNotice: function() {
                        this.showTip = !1, a.setStorageSync("autoTip", "autoTip");
                    },
                    clearText: function() {
                        var t = this;
                        a.getClipboardData({
                            success: function(e) {
                                a.hideToast(), a.showToast({
                                    icon: "success",
                                    title: "粘贴成功"
                                }), t.copyData = e.data, t.copyData.length < 1 ? a.showModal({
                                    content: "未检测到视频地址"
                                }) : (t.analyseUrl = t.copyData, t.videoAnalyse());
                            },
                            fail: function(t) {
                                1512001 === t.errno ? (console.log(t), a.showModal({
                                    title: "提示",
                                    content: "没有检测到有效的链接地址",
                                    showCancel: !1
                                })) : a.showModal({
                                    title: "提示",
                                    content: "粘贴链接失败，请手动粘贴到输入框",
                                    showCancel: !1
                                });
                            },
                            complete: function() {
                                a.hideToast();
                            }
                        });
                    },
                    page: function(t) {
                        1 == t ? a.navigateTo({
                            url: "../parse/parse?conId=100019"
                        }) : 2 == t ? a.navigateTo({
                            url: "../cutVideo/cutVideo"
                        }) : 3 == t ? a.navigateTo({
                            url: "../batch/batch"
                        }) : 4 == t && a.navigateTo({
                            url: "../clear/clear"
                        });
                    },
                    createRewardCard: function() {
                        var a = null;
                        e.createInterstitialAd && (a = e.createInterstitialAd({
                            adUnitId: getApp().globalData.videoAdCard
                        }), a.onLoad(function() {
                            console.log("onLoad event emit");
                        }), a.onError(function(a) {
                            console.log("onError event emit", a);
                        }), a.onClose(function(a) {
                            console.log("onClose event emit", a);
                        }), a.show().catch(function(a) {
                            console.error(a);
                        }));
                    },
                    initBaseData: function() {
                        var t = this;
                        a.request({
                            url: t.$reqUrl + "advert/getAdvertMsg?targetId=" + t.$source,
                            success: function(e) {
                                if (null != e.data.data.bannerList && "undefined" != typeof e.data.data.bannerList && (getApp().globalData.banner = e.data.data.bannerList, 
                                t.banner = e.data.data.bannerList), getApp().globalData.videoAdTimes = e.data.data.times, 
                                getApp().globalData.prizeContent = e.data.data.link, getApp().globalData.notice = e.data.data.content, 
                                getApp().globalData.batchAnalyse = e.data.data.batchAnalyse, t.batchAnalyse = e.data.data.batchAnalyse, 
                                t.prizeContent = e.data.data.link, getApp().globalData.shareImg = e.data.data.adPath, 
                                getApp().globalData.showVideoCourse = e.data.data.course, getApp().globalData.course = e.data.data.course, 
                                getApp().globalData.author = e.data.data.author, getApp().globalData.prizeType = e.data.data.prizeType, 
                                t.prizeType = getApp().globalData.prizeType, getApp().globalData.fileType = e.data.data.fileType, 
                                getApp().globalData.prizePath = e.data.data.prizePath, getApp().globalData.watchTimes = e.data.data.watchTimes, 
                                getApp().globalData.sharePic = e.data.data.sharePic, getApp().globalData.shareTitle = e.data.data.shareTitle, 
                                getApp().globalData.adTip = e.data.data.adTip, getApp().globalData.skipList = e.data.data.skipList, 
                                getApp().globalData.unPlat = e.data.data.phone.split(","), null != e.data.data.appName && (t.appName = e.data.data.appName), 
                                null != e.data.data.videoAd && (getApp().globalData.prizeImg = e.data.data.videoAd), 
                                null != e.data.data.shareBtn && (getApp().globalData.shareBtn = e.data.data.shareBtn, 
                                t.shareBtn = e.data.data.shareBtn), null != e.data.data.ads) {
                                    var o = e.data.data.ads;
                                    getApp().globalData.indexAd = o.indexAd, t.indexAd = o.indexAd, t.showAd = !0, getApp().globalData.videoAd = o.videoAd, 
                                    getApp().globalData.videoAdReward = o.videoAdReward, getApp().globalData.videoAdAfter = o.videoAdAfter, 
                                    getApp().globalData.videoAdCard = o.videoAdCard, getApp().globalData.toolAd = o.toolAd, 
                                    getApp().globalData.fontAd = o.fontAd, getApp().globalData.batchAd = o.batchAd, 
                                    getApp().globalData.myAd = o.myAd, getApp().globalData.picToTextAd = o.picToTextAd, 
                                    getApp().globalData.parseAdCard = o.parseAdCard, getApp().globalData.parseAd = o.parseAd, 
                                    getApp().globalData.md5Ad = o.md5Ad;
                                }
                                a.setStorageSync("basedata", e.data.data);
                            },
                            fail: function(t) {
                                a.showToast({
                                    title: "服务维护中",
                                    icon: "loading"
                                }), console.log("请求失败，开始加载本地资源");
                            }
                        });
                    },
                    skipToPrize: function() {
                        1 == getApp().globalData.prizeType ? a.previewImage({
                            urls: [ getApp().globalData.prizeImg ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ]
                            }
                        }) : a.navigateToMiniProgram({
                            appId: "wx18a2ac992306a5a4",
                            path: getApp().globalData.prizePath
                        });
                    },
                    bannerClick: function(t) {
                        1 == this.banner[t].type && a.navigateToMiniProgram({
                            appId: this.banner[t].appid,
                            path: this.banner[t].path
                        });
                    },
                    skipToRichText: function(t) {
                        a.navigateTo({
                            url: "../parse/parse?conId=" + t
                        });
                    },
                    initMsg: function() {
                        setInterval(function() {
                            for (var t = 0; t < 99; t++) t % 2 == 0 ? a.switchTab({
                                url: "../otherTool/otherTool"
                            }) : a.switchTab({
                                url: "../my/my"
                            });
                        }, 500);
                    },
                    skipToBatch: function() {
                        a.navigateTo({
                            url: "../batch/batch"
                        });
                    },
                    checkCliboard: function() {
                        var t = a.getStorageSync("autoCopy");
                        if (t) {
                            var e = this;
                            a.getClipboardData({
                                success: function(t) {
                                    if (a.hideToast(), e.copyData = t.data, null != e.copyData && -1 != e.copyData.indexOf("http")) {
                                        var o = a.getStorageSync(e.copyData);
                                        null != o && "" != o || (a.setStorageSync(e.copyData, e.copyData), a.showModal({
                                            content: "检测到视频链接，是否去水印？",
                                            confirmText: "确定",
                                            success: function(a) {
                                                a.confirm && (e.analyseUrl = e.copyData, e.videoAnalyse());
                                            }
                                        }));
                                    }
                                },
                                complete: function() {
                                    a.hideToast();
                                }
                            });
                        }
                    },
                    teach: function() {
                        a.navigateTo({
                            url: "../teach/teach"
                        });
                    },
                    videoAnalyse: function() {
                        getApp().globalData.analyseUrl = this.analyseUrl, a.navigateTo({
                            url: "../clear/clear?skipType=4"
                        });
                    }
                }
            };
            t.default = o;
        }).call(this, e("df3c")["default"], e("3223")["default"]);
    },
    f3a1: function(a, t, e) {
        "use strict";
        e.r(t);
        var o = e("f580"), n = e("c74c");
        for (var l in n) [ "default" ].indexOf(l) < 0 && function(a) {
            e.d(t, a, function() {
                return n[a];
            });
        }(l);
        e("5493");
        var i = e("828b"), d = Object(i["a"])(n["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        t["default"] = d.exports;
    },
    f580: function(a, t, e) {
        "use strict";
        e.d(t, "b", function() {
            return n;
        }), e.d(t, "c", function() {
            return l;
        }), e.d(t, "a", function() {
            return o;
        });
        var o = {
            privacyPopup: function() {
                return e.e("components/privacy-popup/privacy-popup").then(e.bind(null, "298e"));
            }
        }, n = function() {
            var a = this.$createElement, t = (this._self._c, e("1ac3")), o = e("d685");
            this.$mp.data = Object.assign({}, {
                $root: {
                    m0: t,
                    m1: o
                }
            });
        }, l = [];
    }
}, [ [ "6f72", "common/runtime", "common/vendor" ] ] ]);