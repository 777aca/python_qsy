(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/cleanService/cleanService" ], {
    "1b86": function(a, t, e) {
        "use strict";
        (function(a, o) {
            var n = e("47a9");
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, i = n(e("7ca3")), d = n(e("7504")), s = {
                components: {
                    cmdProgress: function() {
                        e.e("components/cmd-progress/cmd-progress").then(function() {
                            return resolve(e("37ea"));
                        }.bind(null, e)).catch(e.oe);
                    }
                },
                data: function() {
                    var a;
                    return a = {
                        textareaAValue: "",
                        rewardedVideoAd: null,
                        currentTimeStamp: null,
                        videoUrl: "",
                        percent: 0,
                        fileStatus: "success"
                    }, (0, i.default)(a, "rewardedVideoAd", null), (0, i.default)(a, "videoType", 0), 
                    (0, i.default)(a, "prizeContent", getApp().globalData.prizeContent), (0, i.default)(a, "rewardedVideoAd", null), 
                    (0, i.default)(a, "author", getApp().globalData.author), (0, i.default)(a, "cover", null), 
                    (0, i.default)(a, "music", null), (0, i.default)(a, "title", null), (0, i.default)(a, "result", !1), 
                    (0, i.default)(a, "fileType", 0), (0, i.default)(a, "downLoadType", 1), (0, i.default)(a, "showAd", !1), 
                    (0, i.default)(a, "ad", ""), (0, i.default)(a, "adError", 0), (0, i.default)(a, "size", 0), 
                    (0, i.default)(a, "playAddr", ""), (0, i.default)(a, "analyseType", 1), (0, i.default)(a, "downLoadType", 2), 
                    (0, i.default)(a, "parseTitle", getApp().globalData.parseTitle), (0, i.default)(a, "type", null), 
                    (0, i.default)(a, "flag", null), (0, i.default)(a, "fileUrl", null), (0, i.default)(a, "actionType", 1), 
                    (0, i.default)(a, "globalColor", getApp().globalData.globalColor), (0, i.default)(a, "coverList", [ "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2401491928,907118315&fm=27&gp=0.jpg" ]), 
                    a;
                },
                onLoad: function(a) {
                    this.initBaseData(), null != a.link && "undefined" != typeof a.link && (this.textareaAValue = a.link, 
                    this.adAnalyse()), null != a.videoMsg && "undefined" != typeof a.videoMsg && (this.videoUrl = a.videoMsg, 
                    this.result = !0), null != a.skipType && "undefined" != typeof a.skipType && (this.textareaAValue = getApp().globalData.analyseUrl, 
                    this.adAnalyse());
                },
                onShow: function() {},
                onShareAppMessage: function(a) {
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
                    initBaseData: function() {
                        var t = this;
                        a.request({
                            url: t.$reqUrl + "advert/getAdvertMsg?targetId=" + t.$source,
                            success: function(e) {
                                if (null != e.data.data.bannerList && "undefined" != typeof e.data.data.bannerList && (getApp().globalData.banner = e.data.data.bannerList), 
                                getApp().globalData.videoAdTimes = e.data.data.times, getApp().globalData.prizeContent = e.data.data.link, 
                                getApp().globalData.notice = e.data.data.content, getApp().globalData.batchAnalyse = e.data.data.batchAnalyse, 
                                getApp().globalData.hide = e.data.data.batchAnalyse, getApp().globalData.watchTimes = e.data.data.watchTimes, 
                                getApp().globalData.platTip = e.data.data.prizePath, getApp().globalData.freeType = e.data.data.freeType, 
                                getApp().globalData.course = e.data.data.course, getApp().globalData.skipList = e.data.data.skipList, 
                                getApp().globalData.shareImg = e.data.data.adPath, getApp().globalData.shareTitle = e.data.data.shareTitle, 
                                getApp().globalData.showVideoCourse = e.data.data.course, getApp().globalData.author = e.data.data.author, 
                                getApp().globalData.batchAnalyse = e.data.data.batchAnalyse, getApp().globalData.adImg = e.data.data.videoAd, 
                                getApp().globalData.adTip = e.data.data.adTip, getApp().globalData.skipType = e.data.data.fileType, 
                                getApp().globalData.shareBtn = e.data.data.shareBtn, getApp().globalData.parseSkip = e.data.data.parseSkip, 
                                getApp().globalData.parseTitle = e.data.data.parseTitle, t.parseTitle = e.data.data.parseTitle, 
                                getApp().globalData.unPlat = e.data.data.phone.split(","), null != e.data.data.videoAd && (getApp().globalData.prizeImg = e.data.data.videoAd), 
                                null != e.data.data.ads) {
                                    var o = e.data.data.ads;
                                    getApp().globalData.indexAd = o.indexAd, getApp().globalData.videoAd = o.videoAd, 
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
                            },
                            complete: function(a) {
                                console.log("================");
                            }
                        });
                    },
                    checkCliboard: function() {
                        var t = a.getStorageSync("autoCopy");
                        if (t) {
                            var e = this;
                            e.actionType = 2, a.getClipboardData({
                                success: function(t) {
                                    if (a.hideToast(), e.copyData = t.data, null != e.copyData && -1 != e.copyData.indexOf("http")) {
                                        var o = a.getStorageSync(e.copyData);
                                        null != o && "" != o || (a.setStorageSync(e.copyData, e.copyData), a.showModal({
                                            content: "检测到视频链接，是否去水印？",
                                            confirmText: "确定",
                                            success: function(a) {
                                                a.confirm && (e.textareaAValue = e.copyData, e.videoAnalyse());
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
                        this.analyseType = 1, this.videoAnalyse();
                    },
                    tabSelect: function(a) {
                        this.TabCur = a.currentTarget.dataset.id, this.scrollLeft = 60 * (a.currentTarget.dataset.id - 1);
                    },
                    textareaBInput: function(a) {
                        this.textareaAValue = a.detail.value;
                    },
                    clearText: function() {
                        console.log("=================="), this.textareaAValue = "";
                    },
                    toSetData: function() {
                        var t = this;
                        t.actionType = 2, a.getClipboardData({
                            success: function(e) {
                                a.hideToast(), a.showToast({
                                    icon: "success",
                                    title: "粘贴成功"
                                }), e.data.length < 2 ? a.showModal({
                                    content: "您的剪切板没有链接哦"
                                }) : t.textareaAValue = e.data;
                            },
                            fail: function(t) {
                                console.log("============剪切板异常码============="), console.log(t.errno), 1512001 === t.errno ? (console.log(t), 
                                a.showModal({
                                    title: "提示",
                                    content: "没有检测到有效的链接地址",
                                    showCancel: !1
                                })) : a.showModal({
                                    title: "提示",
                                    content: "粘贴链接失败，请手动粘贴到输入框",
                                    showCancel: !1
                                });
                            }
                        });
                    },
                    page: function(t) {
                        console.log("==========================" + t), 1 == t ? a.navigateTo({
                            url: "../parse/parse?conId=100019"
                        }) : a.navigateTo({
                            url: "../parse/parse?conId=27"
                        });
                    },
                    skipToPrize: function() {
                        a.previewImage({
                            urls: [ getApp().globalData.prizeImg ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ]
                            }
                        });
                    },
                    videoAnalyse: function() {
                        for (var t = this, e = getApp().globalData.skipList, o = 0; o < e.length; o++) {
                            var n = e[o];
                            if (-1 != t.textareaAValue.indexOf(n.url) && 1 == getApp().globalData.parseSkip) return void (0 == n.status ? a.showModal({
                                content: n.title
                            }) : 1 == n.status && (console.log("开始跳转"), a.navigateToMiniProgram({
                                appId: n.appId
                            })));
                        }
                        a.showLoading({
                            title: "解析中",
                            mask: !0
                        }), t.result = !1;
                        var l = Date.parse(new Date()) / 1e3;
                        console.log(t.textareaAValue + "######" + l + "######" + getApp().globalData.token + "######" + t.$source), 
                        a.request({
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
                            success: function(e) {
                                if (console.log(e.data), "0002" === e.data.code || "0009" === e.data.code) a.showModal({
                                    content: e.data.message
                                }); else if ("0001" === e.data.code) {
                                    var o = e.data.data;
                                    getApp().globalData.title = o.desc, 2 == o.type ? (getApp().globalData.pics = JSON.stringify(o), 
                                    a.navigateTo({
                                        url: "../picInfo/picInfo?initAd=false"
                                    })) : (getApp().globalData.playAddr = o.playAddr, getApp().globalData.cover = o.cover, 
                                    getApp().globalData.title = o.desc, getApp().globalData.size = o.size, t.videoUrl = o.playAddr, 
                                    t.cover = o.cover, t.title = o.desc, t.music = o.music, t.size = o.size, t.result = !0);
                                } else a.showModal({
                                    content: "未知错误，请联系作者进行解决"
                                });
                            },
                            fail: function(t) {
                                a.showModal({
                                    content: "服务器维护中 请稍后重试 有问题请联系作者"
                                });
                            },
                            complete: function(t) {
                                a.hideLoading();
                            }
                        });
                    },
                    encrypt: function(a) {
                        var t = d.default.enc.Utf8.parse(getApp().globalData.access), e = d.default.enc.Utf8.parse(a), o = d.default.AES.encrypt(e, t, {
                            mode: d.default.mode.ECB,
                            padding: d.default.pad.Pkcs7
                        });
                        return o.toString();
                    },
                    createRewardVideo: function() {
                        var t = this;
                        try {
                            this.rewardedVideoAd = o.createRewardedVideoAd({
                                adUnitId: getApp().globalData.videoAdReward
                            }), this.rewardedVideoAd.onError(function(a) {
                                console.log(a), t.adError = 1;
                            }), t.rewardedVideoAd.onClose(function(e) {
                                e && e.isEnded ? (console.log("===========广告看完了==========="), a.request({
                                    url: t.$reqUrl + "/lyz/updateUserAdTimes?uid=" + getApp().globalData.uid,
                                    method: "get",
                                    success: function(a) {
                                        console.log(a.data);
                                    }
                                }), 1 == t.analyseType ? t.videoAnalyse() : 2 == t.downLoadType ? t.startDownLoad(t.downLoadType, t.cover) : t.startDownLoad(t.downLoadType, t.videoUrl)) : a.showModal({
                                    content: getApp().globalData.adTip
                                });
                            });
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            console.log(e), t.adError = 1;
                        }
                    },
                    createRewardCard: function() {
                        var a = null;
                        o.createInterstitialAd && (a = o.createInterstitialAd({
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
                    copyMusic: function(t, e) {
                        a.setClipboardData({
                            data: this.cover,
                            success: function() {
                                a.setStorageSync(e, e), a.showModal({
                                    content: "已经复制链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    copyMvUrl: function() {
                        var t = this;
                        a.setClipboardData({
                            data: t.videoUrl,
                            success: function() {
                                a.hideToast(), a.setStorageSync(t.videoUrl, t.videoUrl), a.showModal({
                                    content: "复制成功"
                                });
                            }
                        });
                    },
                    copyTitle: function() {
                        a.setClipboardData({
                            data: this.title,
                            success: function() {}
                        });
                    }
                }, (0, i.default)(l, "skipToPrize", function() {
                    1 == getApp().globalData.prizeType ? a.previewImage({
                        urls: [ getApp().globalData.prizeImg ],
                        longPressActions: {
                            itemList: [ "发送给朋友", "保存图片", "收藏" ]
                        }
                    }) : a.navigateToMiniProgram({
                        appId: "wx18a2ac992306a5a4",
                        path: getApp().globalData.prizePath
                    });
                }), (0, i.default)(l, "skipToWeb", function(t) {
                    a.navigateTo({
                        url: "../parse/parse?conId=5"
                    });
                }), (0, i.default)(l, "downFile", function(a, t) {
                    this.type = a, this.actionType = 1, this.fileUrl = t, console.log(this.$refs.privacyPopup), 
                    this.$refs.privacyPopup.proactive(), this.downLoadType = a, this.analyseType = 2;
                }), (0, i.default)(l, "downFileFun", function() {
                    this.startDownLoad(this.type, this.fileUrl);
                }), (0, i.default)(l, "startDownLoad", function(t, e, o) {
                    var n = this;
                    a.showLoading({
                        title: "加载下载资源中"
                    }), a.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function() {
                            n.percent = 0, n.fileStatus = "active", a.request({
                                url: n.$reqUrl + "/lyz/getDownLoadFileUrl",
                                method: "POST",
                                timeout: 35e3,
                                data: {
                                    link: e,
                                    type: t,
                                    source: n.$source,
                                    origin: o
                                },
                                success: function(e) {
                                    if (a.hideLoading(), a.showLoading({
                                        title: "下载中"
                                    }), "0001" === e.data.code) {
                                        var o = e.data.data;
                                        console.log(o);
                                        var l = a.downloadFile({
                                            url: e.data.data,
                                            success: function(e) {
                                                200 === e.statusCode ? (a.hideLoading(), 1 == t ? (a.saveVideoToPhotosAlbum({
                                                    filePath: e.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, a.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(a) {
                                                        n.targetMp4Download(t, o);
                                                    }
                                                }), console.log("保存视频到相册")) : 2 == t && (a.saveImageToPhotosAlbum({
                                                    filePath: e.tempFilePath,
                                                    success: function() {
                                                        n.percent = 100, console.log("save success"), a.showToast({
                                                            icon: "success",
                                                            duration: 2e3,
                                                            title: "已保存到相册"
                                                        });
                                                    },
                                                    fail: function(a) {
                                                        n.targetMp4Download(t, o);
                                                    }
                                                }), console.log("保存图片到相册"))) : a.showModal({
                                                    content: "资源无法访问，请联系作者反馈"
                                                });
                                            },
                                            fail: function() {
                                                a.hideLoading(), a.showModal({
                                                    content: "下载失败，请复制无水印链接到浏览器下载"
                                                });
                                            }
                                        });
                                        l.onProgressUpdate(function(a) {
                                            n.percent = a.progress, console.log(n.percent), a.progress;
                                        });
                                    } else a.showModal({
                                        content: "资源文件暂时无法下载 请复制无水印链接到浏览器下载 有疑问请联系微信 " + getApp().globalData.author
                                    });
                                },
                                fail: function() {
                                    a.hideLoading();
                                },
                                complete: function() {}
                            });
                        },
                        fail: function(t) {
                            a.hideLoading(), a.showModal({
                                content: "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]"
                            });
                        }
                    });
                }), (0, i.default)(l, "targetMp4Download", function(t, e) {
                    var n = this;
                    a.showToast({
                        title: "保存相册中",
                        icon: "loading"
                    }), n.percent = 0, n.fileStatus = "active";
                    var l = Math.random().toString(36).substr(2), i = null;
                    i = 1 == t ? l + ".mp4" : l + ".png";
                    var d = o.env.USER_DATA_PATH + "/" + i;
                    a.showLoading({
                        title: "下载中"
                    });
                    var s = a.downloadFile({
                        url: e,
                        filePath: d,
                        success: function(e) {
                            a.hideLoading(), 200 === e.statusCode ? 1 == t ? (a.saveVideoToPhotosAlbum({
                                filePath: d,
                                success: function() {
                                    n.percent = 100, console.log("save success"), a.showToast({
                                        icon: "success",
                                        duration: 2e3,
                                        title: "已保存到相册"
                                    });
                                },
                                fail: function(a) {
                                    console.log("save error" + a);
                                }
                            }), console.log("保存视频到相册")) : 2 == t && (a.saveImageToPhotosAlbum({
                                filePath: d
                            }), n.percent = 100, console.log("save success"), a.showToast({
                                icon: "success",
                                duration: 2e3,
                                title: "已保存到相册"
                            })) : a.showModal({
                                content: "资源无法访问，请联系作者反馈"
                            });
                        },
                        fail: function() {
                            a.hideLoading(), a.showModal({
                                content: "下载失败，请复制无水印链接到浏览器下载"
                            });
                        }
                    });
                    s.onProgressUpdate(function(a) {
                        n.percent = a.progress, a.progress;
                    });
                }), l)
            };
            t.default = s;
        }).call(this, e("df3c")["default"], e("3223")["default"]);
    },
    "48cd": function(a, t, e) {
        "use strict";
        e.r(t);
        var o = e("70ea"), n = e("a42e");
        for (var l in n) [ "default" ].indexOf(l) < 0 && function(a) {
            e.d(t, a, function() {
                return n[a];
            });
        }(l);
        e("d6d3");
        var i = e("828b"), d = Object(i["a"])(n["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        t["default"] = d.exports;
    },
    "70ea": function(a, t, e) {
        "use strict";
        e.d(t, "b", function() {
            return n;
        }), e.d(t, "c", function() {
            return l;
        }), e.d(t, "a", function() {
            return o;
        });
        var o = {
            cmdProgress: function() {
                return e.e("components/cmd-progress/cmd-progress").then(e.bind(null, "37ea"));
            },
            privacyPopup: function() {
                return e.e("components/privacy-popup/privacy-popup").then(e.bind(null, "298e"));
            }
        }, n = function() {
            var a = this.$createElement;
            this._self._c;
        }, l = [];
    },
    "877f": function(a, t, e) {},
    a42e: function(a, t, e) {
        "use strict";
        e.r(t);
        var o = e("1b86"), n = e.n(o);
        for (var l in o) [ "default" ].indexOf(l) < 0 && function(a) {
            e.d(t, a, function() {
                return o[a];
            });
        }(l);
        t["default"] = n.a;
    },
    cd21: function(a, t, e) {
        "use strict";
        (function(a, t) {
            var o = e("47a9");
            e("37d4");
            o(e("3240"));
            var n = o(e("48cd"));
            a.__webpack_require_UNI_MP_PLUGIN__ = e, t(n.default);
        }).call(this, e("3223")["default"], e("df3c")["createPage"]);
    },
    d6d3: function(a, t, e) {
        "use strict";
        var o = e("877f"), n = e.n(o);
        n.a;
    }
}, [ [ "cd21", "common/runtime", "common/vendor" ] ] ]);