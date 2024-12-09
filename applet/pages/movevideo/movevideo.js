(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/movevideo/movevideo" ], {
    "1d91": function(e, t, a) {
        "use strict";
        (function(e, o) {
            var n = a("47a9");
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, i = n(a("7ca3")), s = n(a("7504")), c = {
                components: {
                    cmdProgress: function() {
                        a.e("components/cmd-progress/cmd-progress").then(function() {
                            return resolve(a("37ea"));
                        }.bind(null, a)).catch(a.oe);
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
                    (0, i.default)(e, "type", null), (0, i.default)(e, "flag", null), (0, i.default)(e, "fileUrl", null), 
                    (0, i.default)(e, "actionType", 1), (0, i.default)(e, "globalColor", getApp().globalData.globalColor), 
                    (0, i.default)(e, "coverList", [ "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg" ]), 
                    e;
                },
                onLoad: function(e) {
                    this.ad = getApp().globalData.toolAd, this.showAd = !0, null != e.link && "undefined" != typeof e.link && (this.textareaAValue = e.link, 
                    this.adAnalyse()), null != e.videoMsg && "undefined" != typeof e.videoMsg && (this.videoUrl = e.videoMsg, 
                    this.result = !0), null != e.skipType && "undefined" != typeof e.skipType && (this.textareaAValue = getApp().globalData.analyseUrl, 
                    this.adAnalyse());
                },
                onShow: function() {
                    this.checkCliboard();
                },
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
                    checkCliboard: function() {
                        var t = e.getStorageSync("autoCopy");
                        if (t) {
                            var a = this;
                            a.actionType = 2, e.getClipboardData({
                                success: function(t) {
                                    if (e.hideToast(), a.copyData = t.data, null != a.copyData && -1 != a.copyData.indexOf("http")) {
                                        var o = e.getStorageSync(a.copyData);
                                        null != o && "" != o || (e.setStorageSync(a.copyData, a.copyData), e.showModal({
                                            content: "检测到视频链接，是否去水印？",
                                            confirmText: "确定",
                                            success: function(e) {
                                                e.confirm && (a.textareaAValue = a.copyData, a.videoAnalyse());
                                            }
                                        }));
                                    }
                                }
                            });
                        }
                    },
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
                            success: function(a) {
                                a.data.data < getApp().globalData.watchTimes && 0 == t.adError ? e.showModal({
                                    content: getApp().globalData.adTip,
                                    success: function(a) {
                                        a.confirm ? t.rewardedVideoAd.show().catch(function() {
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
                            success: function(a) {
                                e.hideToast(), e.showToast({
                                    icon: "success",
                                    title: "粘贴成功"
                                }), a.data.length < 2 ? e.showModal({
                                    content: "您的剪切板没有链接哦"
                                }) : t.textareaAValue = a.data;
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
                            url: "../parse/parse?conId=3"
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
                        for (var t = this, a = getApp().globalData.skipList, o = 0; o < a.length; o++) {
                            var n = a[o];
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
                            success: function(a) {
                                if (console.log(a.data), "0002" === a.data.code || "0009" === a.data.code) e.showModal({
                                    content: a.data.message
                                }); else if ("0001" === a.data.code) {
                                    var o = a.data.data;
                                    getApp().globalData.title = o.desc, 2 == o.type ? (getApp().globalData.pics = JSON.stringify(o), 
                                    e.navigateTo({
                                        url: "../picInfo/picInfo?initAd=false"
                                    })) : (getApp().globalData.playAddr = o.playAddr, getApp().globalData.cover = o.cover, 
                                    getApp().globalData.title = o.desc, getApp().globalData.size = o.size, t.videoUrl = o.playAddr, 
                                    t.cover = o.cover, t.title = o.desc, t.music = o.music, t.size = o.size, t.result = !0);
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
                        var t = s.default.enc.Utf8.parse(getApp().globalData.access), a = s.default.enc.Utf8.parse(e), o = s.default.AES.encrypt(a, t, {
                            mode: s.default.mode.ECB,
                            padding: s.default.pad.Pkcs7
                        });
                        return o.toString();
                    },
                    createRewardVideo: function() {
                        var t = this;
                        try {
                            this.rewardedVideoAd = o.createRewardedVideoAd({
                                adUnitId: getApp().globalData.videoAdReward
                            }), this.rewardedVideoAd.onError(function(e) {
                                console.log(e), t.adError = 1;
                            }), t.rewardedVideoAd.onClose(function(a) {
                                a && a.isEnded ? (console.log("===========广告看完了==========="), e.request({
                                    url: t.$reqUrl + "/lyz/updateUserAdTimes?uid=" + getApp().globalData.uid,
                                    method: "get",
                                    success: function(e) {
                                        console.log(e.data);
                                    }
                                }), 1 == t.analyseType ? t.videoAnalyse() : 2 == t.downLoadType ? t.startDownLoad(t.downLoadType, t.cover) : t.startDownLoad(t.downLoadType, t.videoUrl)) : e.showModal({
                                    content: getApp().globalData.adTip
                                });
                            });
                        } catch (a) {
                            a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                            console.log(a), t.adError = 1;
                        }
                    },
                    createRewardCard: function() {
                        var e = null;
                        o.createInterstitialAd && (e = o.createInterstitialAd({
                            adUnitId: getApp().globalData.videoAdCard
                        }), e.onLoad(function() {
                            console.log("onLoad event emit");
                        }), e.onError(function(e) {
                            console.log("onError event emit", e);
                        }), e.onClose(function(e) {
                            console.log("onClose event emit", e);
                        }), e.show().catch(function(e) {
                            console.error(e);
                        }));
                    },
                    copyMusic: function(t, a) {
                        e.setClipboardData({
                            data: this.cover,
                            success: function() {
                                e.setStorageSync(a, a), e.showModal({
                                    content: "已经复制链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    copyMvUrl: function() {
                        var t = this;
                        e.setClipboardData({
                            data: t.videoUrl,
                            success: function() {
                                e.hideToast(), e.setStorageSync(t.videoUrl, t.videoUrl), e.showModal({
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
                    this.startDownLoad(this.type, this.fileUrl);
                }), (0, i.default)(l, "startDownLoad", function(t, a, o) {
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
                                    link: a,
                                    type: t,
                                    source: n.$source,
                                    origin: o
                                },
                                success: function(a) {
                                    if (e.hideLoading(), e.showLoading({
                                        title: "下载中"
                                    }), "0001" === a.data.code) {
                                        var o = a.data.data;
                                        console.log(o);
                                        var l = e.downloadFile({
                                            url: a.data.data,
                                            success: function(a) {
                                                200 === a.statusCode ? (e.hideLoading(), 1 == t ? (e.saveVideoToPhotosAlbum({
                                                    filePath: a.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, e.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(e) {
                                                        n.targetMp4Download(t, o);
                                                    }
                                                }), console.log("保存视频到相册")) : 2 == t && (e.saveImageToPhotosAlbum({
                                                    filePath: a.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, console.log("save success"), e.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(e) {
                                                        n.targetMp4Download(t, o);
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
                }), (0, i.default)(l, "targetMp4Download", function(t, a) {
                    var n = this;
                    e.showToast({
                        title: "保存相册中",
                        icon: "loading"
                    }), n.percent = 0, n.fileStatus = "active";
                    var l = Math.random().toString(36).substr(2), i = null;
                    i = 1 == t ? l + ".mp4" : l + ".png";
                    var s = o.env.USER_DATA_PATH + "/" + i;
                    e.showLoading({
                        title: "下载中"
                    });
                    var c = e.downloadFile({
                        url: a,
                        filePath: s,
                        success: function(a) {
                            e.hideLoading(), 200 === a.statusCode ? 1 == t ? (e.saveVideoToPhotosAlbum({
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
                    c.onProgressUpdate(function(e) {
                        n.percent = e.progress, e.progress;
                    });
                }), l)
            };
            t.default = c;
        }).call(this, a("df3c")["default"], a("3223")["default"]);
    },
    2831: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return n;
        }), a.d(t, "c", function() {
            return l;
        }), a.d(t, "a", function() {
            return o;
        });
        var o = {
            cmdProgress: function() {
                return a.e("components/cmd-progress/cmd-progress").then(a.bind(null, "37ea"));
            },
            privacyPopup: function() {
                return a.e("components/privacy-popup/privacy-popup").then(a.bind(null, "298e"));
            }
        }, n = function() {
            var e = this.$createElement;
            this._self._c;
        }, l = [];
    },
    "3a60": function(e, t, a) {
        "use strict";
        (function(e, t) {
            var o = a("47a9");
            a("37d4");
            o(a("3240"));
            var n = o(a("fdf1"));
            e.__webpack_require_UNI_MP_PLUGIN__ = a, t(n.default);
        }).call(this, a("3223")["default"], a("df3c")["createPage"]);
    },
    c3ec: function(e, t, a) {},
    c6aa: function(e, t, a) {
        "use strict";
        a.r(t);
        var o = a("1d91"), n = a.n(o);
        for (var l in o) [ "default" ].indexOf(l) < 0 && function(e) {
            a.d(t, e, function() {
                return o[e];
            });
        }(l);
        t["default"] = n.a;
    },
    f4eb: function(e, t, a) {
        "use strict";
        var o = a("c3ec"), n = a.n(o);
        n.a;
    },
    fdf1: function(e, t, a) {
        "use strict";
        a.r(t);
        var o = a("2831"), n = a("c6aa");
        for (var l in n) [ "default" ].indexOf(l) < 0 && function(e) {
            a.d(t, e, function() {
                return n[e];
            });
        }(l);
        a("f4eb");
        var i = a("828b"), s = Object(i["a"])(n["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        t["default"] = s.exports;
    }
}, [ [ "3a60", "common/runtime", "common/vendor" ] ] ]);