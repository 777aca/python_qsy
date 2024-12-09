(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/picInfo/picInfo" ], {
    "44ef": function(t, e, o) {
        "use strict";
        o.d(e, "b", function() {
            return a;
        }), o.d(e, "c", function() {
            return d;
        }), o.d(e, "a", function() {
            return n;
        });
        var n = {
            privacyPopup: function() {
                return o.e("components/privacy-popup/privacy-popup").then(o.bind(null, "298e"));
            }
        }, a = function() {
            var t = this, e = t.$createElement, o = (t._self._c, t.__map(t.productList, function(e, o) {
                var n = t.__get_orig(e), a = (o + 1) % 2 != 0 ? t.selectImgArr.indexOf(o) : null;
                return {
                    $orig: n,
                    g0: a
                };
            })), n = t.__map(t.productList, function(e, o) {
                var n = t.__get_orig(e), a = (o + 1) % 2 == 0 ? t.selectImgArr.indexOf(o) : null;
                return {
                    $orig: n,
                    g1: a
                };
            });
            t.$mp.data = Object.assign({}, {
                $root: {
                    l0: o,
                    l1: n
                }
            });
        }, d = [];
    },
    c2c7: function(t, e, o) {
        "use strict";
        (function(t, n) {
            var a = o("47a9");
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var d = a(o("7eb4")), i = a(o("ee10")), r = {
                components: {},
                data: function() {
                    return {
                        current: 0,
                        productList: [],
                        pageIndex: 1,
                        loadding: !1,
                        pullUpOn: !0,
                        initAd: !1,
                        adError: 0,
                        rewardedVideoAd: null,
                        downloadIndex: -1,
                        globalColor: getApp().globalData.globalColor,
                        selectImgArr: []
                    };
                },
                onLoad: function(t) {
                    var e = this, o = getApp().globalData.pics, n = JSON.parse(o);
                    this.productList = n.pics, this.productList.map(function(t, o) {
                        e.selectImgArr.push(o);
                    }), t.initAd ? (this.initAd = !0, this.createRewardVideo()) : this.adError = 1;
                },
                methods: {
                    checkAd: function(t) {
                        this.downloadIndex = t, console.log(t), this.initAd ? this.downFile() : -1 == this.downloadIndex ? this.startDownload() : this.downLoad(this.downloadIndex);
                    },
                    downFile: function() {
                        var e = this;
                        t.showLoading({
                            title: "初始化资源"
                        }), t.request({
                            url: e.$reqUrl + "/lyz/getUserAdTimes?uid=" + getApp().globalData.uid,
                            method: "get",
                            success: function(o) {
                                t.hideLoading(), o.data.data < getApp().globalData.watchTimes && 1 != e.adError ? t.showModal({
                                    content: getApp().globalData.adTip,
                                    success: function(o) {
                                        if (o.confirm) try {
                                            e.rewardedVideoAd.show().catch(function() {
                                                e.rewardedVideoAd.load().then(function() {
                                                    return e.rewardedVideoAd.show();
                                                }).catch(function(t) {
                                                    -1 == e.downloadIndex ? e.startDownload() : e.downLoad(e.downloadIndex);
                                                });
                                            });
                                        } catch (n) {
                                            n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                                            -1 == e.downloadIndex ? e.startDownload() : e.downLoad(e.downloadIndex);
                                        } else t.showToast({
                                            title: "看完广告才能下载，免费软件支持一下"
                                        });
                                    }
                                }) : (console.log("------走的是我----"), -1 == e.downloadIndex ? e.startDownload() : e.downLoad(e.downloadIndex));
                            },
                            fail: function() {
                                t.hideLoading();
                            }
                        });
                    },
                    createRewardVideo: function() {
                        var e = this;
                        try {
                            this.rewardedVideoAd = n.createRewardedVideoAd({
                                adUnitId: getApp().globalData.videoAdReward
                            }), this.rewardedVideoAd.onError(function(t) {
                                e.adError = 1;
                            }), e.rewardedVideoAd.onClose(function(o) {
                                o && o.isEnded ? (console.log("===========广告看完了==========="), t.request({
                                    url: e.$reqUrl + "/lyz/updateUserAdTimes?uid=" + getApp().globalData.uid,
                                    method: "get",
                                    success: function(t) {
                                        console.log(t.data);
                                    }
                                }), -1 == e.downloadIndex ? e.startDownload() : e.downLoad(e.downloadIndex)) : t.showModal({
                                    content: getApp().globalData.adTip
                                });
                            });
                        } catch (o) {
                            o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                            e.adError = 1, console.log(o);
                        }
                    },
                    copyTitle: function() {
                        t.setClipboardData({
                            data: getApp().globalData.title
                        });
                    },
                    copyPic: function(e) {
                        var o = this;
                        t.setClipboardData({
                            data: o.productList[e],
                            success: function() {
                                t.setStorageSync(o.productList[e], o.productList[e]);
                            }
                        });
                    },
                    previewPic: function(e) {
                        t.previewImage({
                            urls: [ this.productList[e] ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ]
                            }
                        });
                    },
                    startDownload: function() {
                        var e = this;
                        return (0, i.default)(d.default.mark(function o() {
                            var n, a, i, r;
                            return d.default.wrap(function(o) {
                                while (1) switch (o.prev = o.next) {
                                  case 0:
                                    n = e, a = 0;

                                  case 2:
                                    if (!(a < n.selectImgArr.length)) {
                                        o.next = 23;
                                        break;
                                    }
                                    return i = a + 1, t.showLoading({
                                        title: "正在下载第" + i + "张图片"
                                    }), o.prev = 5, r = "", o.next = 9, e.getDownloadAddress(n.productList[n.selectImgArr[a]]).then(function(t) {
                                        console.log(t), r = t.data.data;
                                    }).catch(function(t) {
                                        console.log(t);
                                    });

                                  case 9:
                                    return console.log("准备下载的图片地址:" + r), o.next = 12, e.signleDownload(r);

                                  case 12:
                                    o.next = 17;
                                    break;

                                  case 14:
                                    o.prev = 14, o.t0 = o["catch"](5), console.log(o.t0);

                                  case 17:
                                    return o.prev = 17, t.hideLoading(), o.finish(17);

                                  case 20:
                                    a++, o.next = 2;
                                    break;

                                  case 23:
                                  case "end":
                                    return o.stop();
                                }
                            }, o, null, [ [ 5, 14, 17, 20 ] ]);
                        }))();
                    },
                    getDownloadAddress: function(e) {
                        var o = this;
                        return new Promise(function(n, a) {
                            t.request({
                                url: o.$reqUrl + "/lyz/getDownLoadFileUrl",
                                method: "POST",
                                data: {
                                    link: e,
                                    type: 2,
                                    source: o.$source
                                },
                                success: function(t) {
                                    n(t);
                                },
                                fail: function(t) {
                                    a(t);
                                }
                            });
                        });
                    },
                    signleDownload: function(e) {
                        return new Promise(function(o, n) {
                            t.downloadFile({
                                url: e,
                                success: function(e) {
                                    200 === e.statusCode && t.saveImageToPhotosAlbum({
                                        filePath: e.tempFilePath
                                    }), o(e);
                                },
                                fail: function(t) {
                                    n(t);
                                }
                            });
                        });
                    },
                    downLoad: function(e) {
                        if (t.showLoading({
                            title: "正在下载图片中",
                            mask: !0
                        }), -1 == e) {
                            for (var o = 0; o < this.productList.length; o++) {
                                t.downloadFile({
                                    url: this.productList[o],
                                    success: function(e) {
                                        200 === e.statusCode && t.saveImageToPhotosAlbum({
                                            filePath: e.tempFilePath
                                        });
                                    }
                                });
                                t.showToast({
                                    icon: "none",
                                    title: "已下载" + (o + 1) + "张图片"
                                });
                            }
                            t.showToast({
                                icon: "success",
                                title: "图片全部下载完成"
                            });
                        } else {
                            t.downloadFile({
                                url: this.productList[e],
                                success: function(e) {
                                    200 === e.statusCode && t.saveImageToPhotosAlbum({
                                        filePath: e.tempFilePath
                                    });
                                }
                            });
                            t.showToast({
                                icon: "success",
                                title: "已保存到相册"
                            });
                        }
                    },
                    selectImg: function(t) {
                        console.log("12313");
                        var e = this.selectImgArr.indexOf(t);
                        -1 == e ? this.selectImgArr.push(t) : this.selectImgArr.splice(e, 1);
                    }
                }
            };
            e.default = r;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    cddc: function(t, e, o) {},
    d7fa: function(t, e, o) {
        "use strict";
        (function(t, e) {
            var n = o("47a9");
            o("37d4");
            n(o("3240"));
            var a = n(o("e9eb"));
            t.__webpack_require_UNI_MP_PLUGIN__ = o, e(a.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    e9eb: function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o("44ef"), a = o("ed1a");
        for (var d in a) [ "default" ].indexOf(d) < 0 && function(t) {
            o.d(e, t, function() {
                return a[t];
            });
        }(d);
        o("ebae");
        var i = o("828b"), r = Object(i["a"])(a["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], void 0);
        e["default"] = r.exports;
    },
    ebae: function(t, e, o) {
        "use strict";
        var n = o("cddc"), a = o.n(n);
        a.a;
    },
    ed1a: function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o("c2c7"), a = o.n(n);
        for (var d in n) [ "default" ].indexOf(d) < 0 && function(t) {
            o.d(e, t, function() {
                return n[t];
            });
        }(d);
        e["default"] = a.a;
    }
}, [ [ "d7fa", "common/runtime", "common/vendor" ] ] ]);