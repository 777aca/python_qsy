(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/cropper/cropper" ], {
    "02ee": function(e, t, o) {
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
            var e = this, t = e.$createElement;
            e._self._c;
            e._isMounted || (e.e0 = function(t) {
                e.resultImg = null;
            });
        }, c = [];
    },
    "0406": function(e, t, o) {
        "use strict";
        (function(e, t) {
            var n = o("47a9");
            o("37d4");
            n(o("3240"));
            var a = n(o("f095"));
            e.__webpack_require_UNI_MP_PLUGIN__ = o, t(a.default);
        }).call(this, o("3223")["default"], o("df3c")["createPage"]);
    },
    "17d1": function(e, t, o) {
        "use strict";
        (function(e, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = {
                data: function() {
                    return {
                        imageData: null,
                        resultImg: "",
                        uploadData: ""
                    };
                },
                components: {
                    cropper: function() {
                        o.e("components/yankai-cropper/cropper").then(function() {
                            return resolve(o("38c8"));
                        }.bind(null, o)).catch(o.oe);
                    }
                },
                onLoad: function() {
                    console.log(this.cropper);
                },
                methods: {
                    complete: function(t) {
                        e.showLoading({
                            title: "去水印中"
                        });
                        var o = this;
                        console.log(t);
                        var a = t.param;
                        n.login({
                            success: function(t) {
                                var n = t.code;
                                e.request({
                                    url: o.$qrCodeUrl + "/upload/cleanPic",
                                    data: {
                                        x: a.x,
                                        y: a.y,
                                        width: a.width,
                                        height: a.height,
                                        filePath: o.uploadData,
                                        source: o.$source,
                                        code: n
                                    },
                                    method: "POST",
                                    success: function(t) {
                                        "0001" === t.data.code ? o.resultImg = t.data.data : e.showModal({
                                            content: t.data.message
                                        }), e.hideLoading();
                                    },
                                    fail: function() {
                                        e.hideLoading(), e.showModal({
                                            content: t.data.message
                                        });
                                    },
                                    complete: function(e) {
                                        o.$refs.cropper.close(!1);
                                    }
                                });
                            }
                        });
                    },
                    cancel: function() {
                        this.$refs.cropper.close(!1);
                    },
                    saveImg: function() {
                        e.showLoading({
                            title: "保存中"
                        });
                        e.downloadFile({
                            url: this.resultImg,
                            success: function(t) {
                                200 === t.statusCode && (e.saveImageToPhotosAlbum({
                                    filePath: t.tempFilePath
                                }), console.log("保存图片到相册"));
                            },
                            fail: function() {
                                e.showModal({
                                    content: "下载失败，联系作者反馈问题"
                                });
                            },
                            complete: function() {
                                e.hideLoading();
                            }
                        });
                    },
                    chooseImage: function() {
                        var t = this;
                        e.chooseImage({
                            count: 1,
                            sizeType: [ "original", "compressed" ],
                            sourceType: [ "album" ],
                            success: function(o) {
                                e.getImageInfo({
                                    src: o.tempFilePaths[0],
                                    success: function(o) {
                                        t.imageData = o, e.showLoading({
                                            title: "图片检测中"
                                        }), e.uploadFile({
                                            url: t.$qrCodeUrl + "/upload/file",
                                            filePath: t.imageData.path,
                                            name: "file",
                                            formData: {
                                                user: "test"
                                            },
                                            success: function(o) {
                                                var n = JSON.parse(o.data).data;
                                                t.uploadData = n, e.request({
                                                    url: t.$qrCodeUrl + "upload/checkImg",
                                                    method: "post",
                                                    data: {
                                                        uid: getApp().globalData.uid,
                                                        source: t.$source,
                                                        path: n
                                                    },
                                                    success: function(o) {
                                                        e.hideLoading();
                                                        var n = o.data;
                                                        "0001" == n.code ? t.$refs.cropper.init(t.imageData.path) : e.showModal({
                                                            content: o.data.message
                                                        });
                                                    },
                                                    fail: function(t) {
                                                        e.hideLoading();
                                                    }
                                                });
                                            },
                                            fail: function() {
                                                e.showModal({
                                                    content: "处理失败，请联系作者反馈问题"
                                                }), e.hideLoading();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            };
            t.default = a;
        }).call(this, o("df3c")["default"], o("3223")["default"]);
    },
    "1f11": function(e, t, o) {
        "use strict";
        o.r(t);
        var n = o("17d1"), a = o.n(n);
        for (var c in n) [ "default" ].indexOf(c) < 0 && function(e) {
            o.d(t, e, function() {
                return n[e];
            });
        }(c);
        t["default"] = a.a;
    },
    "295f": function(e, t, o) {
        "use strict";
        var n = o("7bef"), a = o.n(n);
        a.a;
    },
    "7bef": function(e, t, o) {},
    f095: function(e, t, o) {
        "use strict";
        o.r(t);
        var n = o("02ee"), a = o("1f11");
        for (var c in a) [ "default" ].indexOf(c) < 0 && function(e) {
            o.d(t, e, function() {
                return a[e];
            });
        }(c);
        o("295f");
        var i = o("828b"), u = Object(i["a"])(a["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], void 0);
        t["default"] = u.exports;
    }
}, [ [ "0406", "common/runtime", "common/vendor" ] ] ]);