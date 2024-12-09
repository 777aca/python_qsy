(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/clearMusic/clearMusic" ], {
    "24c0": function(t, e, o) {
        "use strict";
        (function(t, n) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var a = {
                components: {
                    cmdProgress: function() {
                        o.e("components/cmd-progress/cmd-progress").then(function() {
                            return resolve(o("37ea"));
                        }.bind(null, o)).catch(o.oe);
                    }
                },
                data: function() {
                    return {
                        tempFilePath: "",
                        result: !1,
                        text: "",
                        handleFaceStatus: !1,
                        resultImg: "",
                        musicUrl: "",
                        showMusic: !1,
                        percent: 0,
                        globalColor: getApp().globalData.globalColor
                    };
                },
                onLoad: function() {},
                methods: {
                    copyMusic: function() {
                        var e = this;
                        t.setClipboardData({
                            data: e.tempFilePath,
                            success: function() {
                                t.setStorageSync(e.tempFilePath, e.tempFilePath), t.showModal({
                                    content: "已经复制链接到剪切板,请粘贴到浏览器下载"
                                });
                            }
                        });
                    },
                    upload: function() {
                        var e = this;
                        t.chooseVideo({
                            count: 1,
                            sourceType: [ "album" ],
                            success: function(o) {
                                e.showMusic = !1;
                                var n = (o.size / 1048576).toFixed(2);
                                console.log("视频大小:" + n), n > 30 ? t.showModal({
                                    content: "视频超过30M,暂时无法处理"
                                }) : (e.tempFilePath = o.tempFilePath, e.result = !0);
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
                                var a = JSON.parse(o.data).data;
                                n.login({
                                    success: function(o) {
                                        var n = o.code;
                                        t.request({
                                            url: e.$qrCodeUrl + "/upload/clearMusic",
                                            data: {
                                                code: n,
                                                filePath: a,
                                                source: e.$source
                                            },
                                            method: "POST",
                                            success: function(o) {
                                                e.result = !1, t.showToast({
                                                    title: "去除成功"
                                                }), "0001" === o.data.code ? (console.log(o.data), e.tempFilePath = o.data.data, 
                                                e.showMusic = !0) : t.showModal({
                                                    content: "未知错误，请联系作者进行解决"
                                                });
                                            },
                                            fail: function(e) {
                                                t.showModal({
                                                    content: "去除失败，请联系作者进行解决"
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
                        var e = this;
                        t.showLoading({
                            title: "加载下载资源中"
                        }), t.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                e.percent = 0, e.fileStatus = "active";
                                var o = t.downloadFile({
                                    url: e.tempFilePath,
                                    success: function(e) {
                                        200 === e.statusCode && t.saveVideoToPhotosAlbum({
                                            filePath: e.tempFilePath
                                        });
                                    },
                                    fail: function() {
                                        t.showModal({
                                            content: "下载失败，请复制无水印链接到浏览器下载"
                                        });
                                    }
                                });
                                o.onProgressUpdate(function(o) {
                                    e.percent = o.progress, 100 == o.progress && t.showToast({
                                        icon: "success",
                                        title: "文件已保存到相册"
                                    });
                                });
                            },
                            fail: function(e) {
                                t.showModal({
                                    content: "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]"
                                });
                            },
                            complete: function(e) {
                                t.hideLoading();
                            }
                        });
                    }
                }
            };
            e.default = a;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    "6f2a": function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o("ab12"), a = o("b69d");
        for (var c in a) [ "default" ].indexOf(c) < 0 && function(t) {
            o.d(e, t, function() {
                return a[t];
            });
        }(c);
        o("b7ce");
        var s = o("828b"), i = Object(s["a"])(a["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], void 0);
        e["default"] = i.exports;
    },
    a905: function(t, e, o) {
        "use strict";
        (function(t, e) {
            var n = o("47a9");
            o("37d4");
            n(o("3240"));
            var a = n(o("6f2a"));
            t.__webpack_require_UNI_MP_PLUGIN__ = o, e(a.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    ab12: function(t, e, o) {
        "use strict";
        o.d(e, "b", function() {
            return a;
        }), o.d(e, "c", function() {
            return c;
        }), o.d(e, "a", function() {
            return n;
        });
        var n = {
            cmdProgress: function() {
                return o.e("components/cmd-progress/cmd-progress").then(o.bind(null, "37ea"));
            },
            privacyPopup: function() {
                return o.e("components/privacy-popup/privacy-popup").then(o.bind(null, "298e"));
            }
        }, a = function() {
            var t = this.$createElement;
            this._self._c;
        }, c = [];
    },
    aeb5: function(t, e, o) {},
    b69d: function(t, e, o) {
        "use strict";
        o.r(e);
        var n = o("24c0"), a = o.n(n);
        for (var c in n) [ "default" ].indexOf(c) < 0 && function(t) {
            o.d(e, t, function() {
                return n[t];
            });
        }(c);
        e["default"] = a.a;
    },
    b7ce: function(t, e, o) {
        "use strict";
        var n = o("aeb5"), a = o.n(n);
        a.a;
    }
}, [ [ "a905", "common/runtime", "common/vendor" ] ] ]);