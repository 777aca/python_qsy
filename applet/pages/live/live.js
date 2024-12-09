(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/clear/clear" ], {
    4988: function(e, t, o) {
        "use strict";
        (function(e, a) {
            var n = o("47a9");
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, i = n(o("7ca3")), s = n(o("7504")), r = {
                components: {
                    cmdProgress: function() {
                        o.e("components/cmd-progress/cmd-progress").then(function() {
                            return resolve(o("37ea"));
                        }.bind(null, o)).catch(o.oe);
                    },
                    ratePopup: function() {
                        Promise.all([ o.e("common/vendor"), o.e("components/rate-popup/rate-popup") ]).then(function() {
                            return resolve(o("7617"));
                        }.bind(null, o)).catch(o.oe);
                    }
                },
                data: function() {
                    var e;
                    return e = {
                        textareaAValue: "",
                        rewardedVideoAd: null,
                        currentTimeStamp: null,
                        videoUrl: "",
                        percent: 0,
                        fileStatus: "success"
                    }, (0, i.default)(e, "rewardedVideoAd", null), (0, i.default)(e, "videoType", 0), 
                    (0, i.default)(e, "prizeContent", getApp().globalData.prizeContent), (0, i.default)(e, "rewardedVideoAd", null), 
                    (0, i.default)(e, "author", getApp().globalData.author), (0, i.default)(e, "cover", null), 
                    (0, i.default)(e, "music", null), (0, i.default)(e, "title", null), (0, i.default)(e, "result", !1), 
                    (0, i.default)(e, "fileType", 0), (0, i.default)(e, "downLoadType", 1), (0, i.default)(e, "showAd", !1), 
                    (0, i.default)(e, "ad", ""), (0, i.default)(e, "adError", 0), (0, i.default)(e, "size", 0), 
                    (0, i.default)(e, "playAddr", ""), (0, i.default)(e, "analyseType", 1), (0, i.default)(e, "downLoadType", 2), 
                    (0, i.default)(e, "prizeType", getApp().globalData.prizeType), (0, i.default)(e, "type", null), 
                    (0, i.default)(e, "flag", null), (0, i.default)(e, "fileUrl", null), (0, i.default)(e, "actionType", 1), 
                    (0, i.default)(e, "globalColor", getApp().globalData.globalColor), (0, i.default)(e, "coverList", [ "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg" ]), 
                    e;
                },
                onLoad: function(e) {
                    this.ad = getApp().globalData.toolAd, this.showAd = !0, null != e.link && "undefined" != typeof e.link && (this.textareaAValue = e.link, 
                    this.adAnalyse()), null != e.videoMsg && "undefined" != typeof e.videoMsg && (this.videoUrl = e.videoMsg, 
                    this.result = !0), this.createRewardVideo(), this.createRewardCard(), null != e.skipType && "undefined" != typeof e.skipType && (this.textareaAValue = getApp().globalData.analyseUrl, 
                    this.adAnalyse());
                },
                onShow: function() {},
                onShareAppMessage: function(e) {
                    return {
                        title: "视频去水印工具，背景音乐提取，图片去水印，超多好用工具 快来试试吧~",
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
                methods: (l = {
                    checkAction: function() {
                        1 == this.actionType ? this.downFileFun() : this.toSetData();
                    },
                    adAnalyse: function() {
                        var t = this;
                        this.analyseType = 1, 0 != getApp().globalData.fileType ? (e.showLoading({
                            title: "初始化资源"
                        }), e.request({
                            url: t.$reqUrl + "/lyz/getUserAdTimes?uid=" + getApp().globalData.uid,
                            method: "get",
                            success: function(o) {
                                o.data.data < getApp().globalData.watchTimes && 0 == t.adError ? e.showModal({
                                    content: getApp().globalData.adTip,
                                    success: function(o) {
                                        o.confirm ? t.rewardedVideoAd.show().catch(function() {
                                            t.rewardedVideoAd.load().then(function() {
                                                return t.rewardedVideoAd.show();
                                            }).catch(function(e) {
                                                t.videoAnalyse();
                                            });
                                        }) : e.showToast({
                                            title: "看完广告才可以使用",
                                            icon: "none"
                                        });
                                    }
                                }) : t.videoAnalyse();
                            },
                            complete: function(t) {
                                e.hideLoading();
                            }
                        })) : t.videoAnalyse();
                    },
                    tabSelect: function(e) {
                        this.TabCur = e.currentTarget.dataset.id, this.scrollLeft = 60 * (e.currentTarget.dataset.id - 1);
                    },
                    textareaBInput: function(e) {
                        this.textareaAValue = e.detail.value;
                    },
                    clearText: function() {
                        console.log("=================="), this.textareaAValue = "";
                    },
                    toSetData: function() {
                        var t = this;
                        t.actionType = 2, e.getClipboardData({
                            success: function(o) {
                                e.hideToast(), e.showToast({
                                    icon: "success",
                                    title: "粘贴成功"
                                }), o.data.length < 2 ? e.showModal({
                                    content: "您的剪切板没有链接哦"
                                }) : t.textareaAValue = o.data;
                            },
                            fail: function(t) {
                                console.log("============剪切板异常码============="), console.log(t.errno), 1512001 === t.errno ? (console.log(t), 
                                e.showModal({
                                    title: "提示",
                                    content: "没有检测到有效的链接地址",
                                    showCancel: !1
                                })) : e.showModal({
                                    title: "提示",
                                    content: "粘贴链接失败，请手动粘贴到输入框",
                                    showCancel: !1
                                });
                            }
                        });
                    },
                    page: function(t) {
                        console.log("==========================" + t), 1 == t ? e.navigateTo({
                            url: "../parse/parse?conId=100019"
                        }) : e.navigateTo({
                            url: "../parse/parse?conId=27"
                        });
                    },
                    skipToPrize: function() {
                        e.previewImage({
                            urls: [ getApp().globalData.prizeImg ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ]
                            }
                        });
                    },
                    videoAnalyse: function() {
                        for (var t = this, o = getApp().globalData.skipList, a = 0; a < o.length; a++) {
                            var n = o[a];
                            if (-1 != t.textareaAValue.indexOf(n.url)) return void (0 == n.status ? e.showModal({
                                content: n.title
                            }) : 1 == n.status && (console.log("开始跳转"), e.navigateToMiniProgram({
                                appId: n.appId
                            })));
                        }
                        e.showLoading({
                            title: "解析中",
                            mask: !0
                        }), t.result = !1;
                        var l = Date.parse(new Date()) / 1e3;
                        console.log(t.textareaAValue + "######" + l + "######" + getApp().globalData.token + "######" + t.$source), 
                        e.request({
                            url: t.$reqUrl + "/lyz/platWeChatAnalyse",
                            data: {
                                link: t.textareaAValue,
                                source: t.$source,
                                timestamp: l,
                                signature: t.encrypt(t.textareaAValue + "######" + l + "######" + getApp().globalData.token + "######" + t.$source),
                                version: 1
                            },
                            header: {
                                token: getApp().globalData.token
                            },
                            method: "POST",
                            success: function(o) {
                                if (console.log(o.data), "0002" === o.data.code || "0009" === o.data.code) e.showModal({
                                    content: o.data.message
                                }); else if ("0001" === o.data.code) {
                                    var a = o.data.data;
                                    getApp().globalData.title = a.desc, 2 == a.type ? (getApp().globalData.pics = JSON.stringify(a), 
                                    e.navigateTo({
                                        url: "../picInfo/picInfo?initAd=true"
                                    })) : (getApp().globalData.playAddr = a.playAddr, getApp().globalData.cover = a.cover, 
                                    getApp().globalData.title = a.desc, getApp().globalData.size = a.size, t.videoUrl = a.playAddr, 
                                    t.cover = a.cover, t.title = a.desc, t.music = a.music, t.size = a.size, t.result = !0);
                                } else e.showModal({
                                    content: "未知错误，请联系作者进行解决"
                                });
                            },
                            fail: function(t) {
                                e.showModal({
                                    content: "服务器维护中 请稍后重试 有问题请联系作者"
                                });
                            },
                            complete: function(t) {
                                e.hideLoading();
                            }
                        });
                    },
                    encrypt: function(e) {
                        var t = s.default.enc.Utf8.parse(getApp().globalData.access), o = s.default.enc.Utf8.parse(e), a = s.default.AES.encrypt(o, t, {
                            mode: s.default.mode.ECB,
                            padding: s.default.pad.Pkcs7
                        });
                        return a.toString();
                    },
                    createRewardVideo: function() {
                        var t = this;
                        try {
                            this.rewardedVideoAd = a.createRewardedVideoAd({
                                adUnitId: getApp().globalData.videoAdReward
                            }), this.rewardedVideoAd.onError(function(e) {
                                console.log(e), t.adError = 1;
                            }), t.rewardedVideoAd.onClose(function(o) {
                                o && o.isEnded ? (console.log("===========广告看完了==========="), e.request({
                                    url: t.$reqUrl + "/lyz/updateUserAdTimes?uid=" + getApp().globalData.uid,
                                    method: "get",
                                    success: function(e) {
                                        console.log(e.data);
                                    }
                                }), 1 == t.analyseType ? t.videoAnalyse() : 2 == t.downLoadType ? t.startDownLoad(t.downLoadType, t.cover) : t.startDownLoad(t.downLoadType, t.videoUrl)) : e.showModal({
                                    content: getApp().globalData.adTip
                                });
                            });
                        } catch (o) {
                            o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                            console.log(o), t.adError = 1;
                        }
                    },
                    createRewardCard: function() {
                        var t = null;
                        if (a.createInterstitialAd) {
                            t = a.createInterstitialAd({
                                adUnitId: getApp().globalData.videoAdCard
                            }), t.onLoad(function() {
                                console.log("onLoad event emit");
                            }), t.onError(function(e) {
                                console.log("onError event emit", e);
                            }), t.onClose(function(e) {
                                console.log("onClose event emit", e);
                            });
                            var o = new Date().getTime() / 1e3;
                            console.log(o);
                            var n = e.getStorageSync("cardAds");
                            if (n && console.log("当前间隔" + (o - n)), console.log("当前的curTime:" + n), n) {
                                if (n || !(o - n > 21600)) return void console.log("=========不满足插屏展示条件============");
                                console.log("过了时间限制 需要展示插屏" + (o - n));
                            } else console.log("第一次 需要展示插屏广告"), e.setStorageSync("cardAds", o);
                            t.show().catch(function(e) {
                                console.error(e);
                            });
                        }
                    },
                    copyMusic: function(t, o) {
                        e.setClipboardData({
                            data: this.cover,
                            success: function() {
                                e.setStorageSync(o, o), e.showModal({
                                    content: "已经复制链接到剪切板"
                                });
                            }
                        });
                    },
                    copyMvUrl: function() {
                        var t = this;
                        e.setClipboardData({
                            data: t.videoUrl,
                            success: function() {
                                e.hideToast(), e.show, e.setStorageSync(t.videoUrl, t.videoUrl), e.showModal({
                                    content: "复制成功"
                                });
                            }
                        });
                    },
                    copyTitle: function() {
                        e.setClipboardData({
                            data: this.title,
                            success: function() {}
                        });
                    }
                }, (0, i.default)(l, "skipToPrize", function() {
                    1 == getApp().globalData.prizeType ? e.previewImage({
                        urls: [ getApp().globalData.prizeImg ],
                        longPressActions: {
                            itemList: [ "发送给朋友", "保存图片", "收藏" ]
                        }
                    }) : e.navigateToMiniProgram({
                        appId: "wx18a2ac992306a5a4",
                        path: getApp().globalData.prizePath
                    });
                }), (0, i.default)(l, "skipToWeb", function(t) {
                    e.navigateTo({
                        url: "../parse/parse?conId=5"
                    });
                }), (0, i.default)(l, "downFile", function(e, t) {
                    this.type = e, this.actionType = 1, this.fileUrl = t, console.log(this.$refs.privacyPopup), 
                    this.$refs.privacyPopup.proactive(), this.downLoadType = e, this.analyseType = 2;
                }), (0, i.default)(l, "downFileFun", function() {
                    var t = this;
                    e.showLoading({
                        title: "初始化资源"
                    }), e.request({
                        url: t.$reqUrl + "/lyz/getUserAdTimes?uid=" + getApp().globalData.uid,
                        method: "get",
                        success: function(o) {
                            o.data.data < getApp().globalData.watchTimes && 0 == t.adError ? e.showModal({
                                content: getApp().globalData.adTip,
                                success: function(o) {
                                    o.confirm ? t.rewardedVideoAd.show().catch(function() {
                                        t.rewardedVideoAd.load().then(function() {
                                            return t.rewardedVideoAd.show();
                                        }).catch(function(e) {
                                            t.startDownLoad(t.type, t.fileUrl);
                                        });
                                    }) : e.showToast({
                                        title: "看完广告即可下载视频哟",
                                        icon: "none"
                                    });
                                },
                                fail: function(e) {}
                            }) : t.startDownLoad(t.type, t.fileUrl);
                        },
                        complete: function(t) {
                            e.hideLoading();
                        }
                    });
                }), (0, i.default)(l, "startDownLoad", function(t, o, a) {
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
                                    link: o,
                                    type: t,
                                    source: n.$source,
                                    origin: a
                                },
                                success: function(o) {
                                    if (e.hideLoading(), e.showLoading({
                                        title: "下载中"
                                    }), "0001" === o.data.code) {
                                        var a = o.data.data;
                                        console.log(a);
                                        var l = e.downloadFile({
                                            url: o.data.data,
                                            success: function(o) {
                                                200 === o.statusCode ? (e.hideLoading(), 1 == t ? (e.saveVideoToPhotosAlbum({
                                                    filePath: o.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, e.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(e) {
                                                        n.targetMp4Download(t, a);
                                                    }
                                                }), console.log("保存视频到相册")) : 2 == t && (e.saveImageToPhotosAlbum({
                                                    filePath: o.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, console.log("save success"), e.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(e) {
                                                        n.targetMp4Download(t, a);
                                                    }
                                                }), console.log("保存图片到相册"))) : e.showModal({
                                                    content: "资源无法访问，请联系作者反馈"
                                                });
                                            },
                                            fail: function() {
                                                e.hideLoading(), e.showModal({
                                                    content: "下载失败，请复制无水印链接到浏览器下载"
                                                });
                                            }
                                        });
                                        l.onProgressUpdate(function(e) {
                                            n.percent = e.progress, console.log(n.percent), e.progress;
                                        });
                                    } else e.showModal({
                                        content: "资源文件暂时无法下载 请复制无水印链接到浏览器下载 有疑问请联系微信 " + getApp().globalData.author
                                    });
                                },
                                fail: function() {
                                    e.hideLoading();
                                },
                                complete: function() {}
                            });
                        },
                        fail: function(t) {
                            e.hideLoading(), e.showModal({
                                content: "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]"
                            });
                        }
                    });
                }), (0, i.default)(l, "targetMp4Download", function(t, o) {
                    var n = this;
                    e.showToast({
                        title: "保存相册中",
                        icon: "loading"
                    }), n.percent = 0, n.fileStatus = "active";
                    var l = Math.random().toString(36).substr(2), i = null;
                    i = 1 == t ? l + ".mp4" : l + ".png";
                    var s = a.env.USER_DATA_PATH + "/" + i;
                    e.showLoading({
                        title: "下载中"
                    });
                    var r = e.downloadFile({
                        url: o,
                        filePath: s,
                        success: function(o) {
                            e.hideLoading(), 200 === o.statusCode ? 1 == t ? (e.saveVideoToPhotosAlbum({
                                filePath: s,
                                success: function() {
                                    n.percent = 100, console.log("save success"), e.showToast({
                                        icon: "success",
                                        duration: 2e3,
                                        title: "已保存到相册"
                                    });
                                },
                                fail: function(e) {
                                    console.log("save error" + e);
                                }
                            }), console.log("保存视频到相册")) : 2 == t && (e.saveImageToPhotosAlbum({
                                filePath: s
                            }), n.percent = 100, console.log("save success"), e.showToast({
                                icon: "success",
                                duration: 2e3,
                                title: "已保存到相册"
                            })) : e.showModal({
                                content: "资源无法访问，请联系作者反馈"
                            });
                        },
                        fail: function() {
                            e.hideLoading(), e.showModal({
                                content: "下载失败，请复制无水印链接到浏览器下载"
                            });
                        }
                    });
                    r.onProgressUpdate(function(e) {
                        n.percent = e.progress, e.progress;
                    });
                }), l)
            };
            t.default = r;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    bef6: function(e, t, o) {
        "use strict";
        o.d(t, "b", function() {
            return n;
        }), o.d(t, "c", function() {
            return l;
        }), o.d(t, "a", function() {
            return a;
        });
        var a = {
            cmdProgress: function() {
                return o.e("components/cmd-progress/cmd-progress").then(o.bind(null, "37ea"));
            },
            privacyPopup: function() {
                return o.e("components/privacy-popup/privacy-popup").then(o.bind(null, "298e"));
            }
        }, n = function() {
            var e = this.$createElement;
            this._self._c;
        }, l = [];
    },
    c89c: function(e, t, o) {
        "use strict";
        var a = o("f745"), n = o.n(a);
        n.a;
    },
    cfc5: function(e, t, o) {
        "use strict";
        o.r(t);
        var a = o("bef6"), n = o("e701");
        for (var l in n) [ "default" ].indexOf(l) < 0 && function(e) {
            o.d(t, e, function() {
                return n[e];
            });
        }(l);
        o("c89c");
        var i = o("828b"), s = Object(i["a"])(n["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], void 0);
        t["default"] = s.exports;
    },
    e701: function(e, t, o) {
        "use strict";
        o.r(t);
        var a = o("4988"), n = o.n(a);
        for (var l in a) [ "default" ].indexOf(l) < 0 && function(e) {
            o.d(t, e, function() {
                return a[e];
            });
        }(l);
        t["default"] = n.a;
    },
    f745: function(e, t, o) {},
    fac3: function(e, t, o) {
        "use strict";
        (function(e, t) {
            var a = o("47a9");
            o("37d4");
            a(o("3240"));
            var n = a(o("cfc5"));
            e.__webpack_require_UNI_MP_PLUGIN__ = o, t(n.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    }
}, [ [ "fac3", "common/runtime", "common/vendor" ] ] ]);