(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/picTool/picTool" ], {
    "7c15": function(e, t, o) {
        "use strict";
        o.r(t);
        var n = o("ba39"), a = o.n(n);
        for (var c in n) [ "default" ].indexOf(c) < 0 && function(e) {
            o.d(t, e, function() {
                return n[e];
            });
        }(c);
        t["default"] = a.a;
    },
    "86c2": function(e, t, o) {
        "use strict";
        var n = o("cb91"), a = o.n(n);
        a.a;
    },
    "994b": function(e, t, o) {
        "use strict";
        (function(e, t) {
            var n = o("47a9");
            o("37d4");
            n(o("3240"));
            var a = n(o("d4c3"));
            e.__webpack_require_UNI_MP_PLUGIN__ = o, t(a.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    b566: function(e, t, o) {
        "use strict";
        o.d(t, "b", function() {
            return a;
        }), o.d(t, "c", function() {
            return c;
        }), o.d(t, "a", function() {
            return n;
        });
        var n = {
            cropper: function() {
                return o.e("components/cropper/cropper").then(o.bind(null, "85b7"));
            },
            privacyPopup: function() {
                return o.e("components/privacy-popup/privacy-popup").then(o.bind(null, "298e"));
            }
        }, a = function() {
            var e = this.$createElement;
            this._self._c;
        }, c = [];
    },
    ba39: function(e, t, o) {
        "use strict";
        (function(e, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = {
                data: function() {
                    return {
                        tempFilePath: "",
                        cropFilePath: "",
                        result: !1,
                        text: "",
                        handleFaceStatus: !1,
                        resultImg: "",
                        globalColor: getApp().globalData.globalColor
                    };
                },
                components: {
                    Cropper: function() {
                        o.e("components/cropper/cropper").then(function() {
                            return resolve(o("85b7"));
                        }.bind(null, o)).catch(o.oe);
                    }
                },
                methods: {
                    upload: function() {
                        var t = this, o = this;
                        e.chooseImage({
                            count: 1,
                            sizeType: [ "original", "compressed" ],
                            sourceType: [ "album" ],
                            success: function(e) {
                                t.tempFilePath = e.tempFilePaths.shift(), o.handleFaceStatus = !0;
                            }
                        });
                    },
                    previewPic: function() {
                        e.previewImage({
                            urls: [ this.resultImg ],
                            longPressActions: {
                                itemList: [ "发送给朋友", "保存图片", "收藏" ],
                                success: function(e) {
                                    console.log("选中了第" + (e.tapIndex + 1) + "个按钮,第" + (e.index + 1) + "张图片");
                                },
                                fail: function(e) {
                                    console.log(e.errMsg);
                                }
                            }
                        });
                    },
                    cancel: function() {
                        this.result = !1, this.handleFaceStatus = !1;
                    },
                    complete: function() {
                        var t = this;
                        e.showLoading({
                            title: "处理中"
                        });
                        var o = getApp().globalData;
                        e.uploadFile({
                            url: t.$qrCodeUrl + "/upload/file",
                            filePath: t.tempFilePath,
                            name: "file",
                            formData: {
                                user: "test"
                            },
                            success: function(a) {
                                var c = JSON.parse(a.data).data;
                                console.log(c), n.login({
                                    success: function(n) {
                                        var a = n.code;
                                        e.request({
                                            url: t.$qrCodeUrl + "/upload/clearPic",
                                            data: {
                                                x: o.x,
                                                y: o.y,
                                                width: o.width,
                                                height: o.height,
                                                filePath: c,
                                                source: t.$source,
                                                code: a
                                            },
                                            method: "POST",
                                            success: function(o) {
                                                "0001" === o.data.code ? (console.log(o.data), t.handleFaceStatus = !1, t.resultImg = o.data.data) : e.showModal({
                                                    content: "未知错误，请联系作者进行解决"
                                                });
                                            },
                                            complete: function(t) {
                                                e.hideLoading();
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function() {
                                e.hideLoading();
                            }
                        });
                    },
                    startDownLoad: function(t, o) {
                        var n = this;
                        e.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                e.showLoading({
                                    title: "加载下载资源中"
                                }), e.request({
                                    url: n.$reqUrl + "/lyz/getFileUrl",
                                    method: "POST",
                                    data: {
                                        link: o,
                                        type: t,
                                        source: n.$source
                                    },
                                    success: function(t) {
                                        if ("0001" === t.data.code) e.downloadFile({
                                            url: t.data.data,
                                            success: function(t) {
                                                200 === t.statusCode && e.saveImageToPhotosAlbum({
                                                    filePath: t.tempFilePath
                                                });
                                            },
                                            fail: function() {
                                                e.showModal({
                                                    content: "下载失败，请复制无水印链接到浏览器下载"
                                                });
                                            }
                                        }); else e.showModal({
                                            content: "资源文件暂时无法下载 请复制链接到浏览器下载 有疑问请联系微信 " + getApp().globalData.author
                                        });
                                    },
                                    complete: function() {
                                        e.hideLoading();
                                    }
                                });
                            },
                            fail: function(t) {
                                e.showModal({
                                    content: "您没有同意相册权限,视频无法保存[请点击小程序右上角设置按钮 开启相册权限]"
                                });
                            }
                        });
                    }
                }
            };
            t.default = a;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    cb91: function(e, t, o) {},
    d4c3: function(e, t, o) {
        "use strict";
        o.r(t);
        var n = o("b566"), a = o("7c15");
        for (var c in a) [ "default" ].indexOf(c) < 0 && function(e) {
            o.d(t, e, function() {
                return a[e];
            });
        }(c);
        o("86c2");
        var i = o("828b"), u = Object(i["a"])(a["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], void 0);
        t["default"] = u.exports;
    }
}, [ [ "994b", "common/runtime", "common/vendor" ] ] ]);