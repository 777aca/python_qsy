(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/md5/md5" ], {
    "0314": function(e, n, t) {
        "use strict";
        (function(e, n) {
            var o = t("47a9");
            t("37d4");
            o(t("3240"));
            var i = o(t("cacc"));
            e.__webpack_require_UNI_MP_PLUGIN__ = t, n(i.default);
        }).call(this, t("3223")["default"], t("df3c")["createPage"]);
    },
    2417: function(e, n, t) {
        "use strict";
        t.d(n, "b", function() {
            return i;
        }), t.d(n, "c", function() {
            return a;
        }), t.d(n, "a", function() {
            return o;
        });
        var o = {
            privacyPopup: function() {
                return t.e("components/privacy-popup/privacy-popup").then(t.bind(null, "298e"));
            }
        }, i = function() {
            var e = this.$createElement;
            this._self._c;
        }, a = [];
    },
    "27be": function(e, n, t) {
        "use strict";
        var o = t("5a27"), i = t.n(o);
        i.a;
    },
    "5a27": function(e, n, t) {},
    "6ef7": function(e, n, t) {
        "use strict";
        t.r(n);
        var o = t("8c2b"), i = t.n(o);
        for (var a in o) [ "default" ].indexOf(a) < 0 && function(e) {
            t.d(n, e, function() {
                return o[e];
            });
        }(a);
        n["default"] = i.a;
    },
    "8c2b": function(e, n, t) {
        "use strict";
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            }), n.default = void 0;
            var t = {
                data: function() {
                    return {
                        visiable: !1,
                        videoUrl: "",
                        addVisiable: !0,
                        size: 0,
                        length: "15秒",
                        newMd5: "singsdasfh34fdsfddsf3",
                        showAd: !1,
                        userType: getApp().globalData.userType,
                        ad: getApp().globalData.md5Ad
                    };
                },
                onLoad: function() {
                    this.showAd = !0;
                },
                methods: {
                    skipToWeb: function() {
                        e.navigateTo({
                            url: "../parse/parse?conId=17"
                        });
                    },
                    chooseVideo: function() {
                        var n = this;
                        e.chooseVideo({
                            sourceType: [ "album" ],
                            success: function(e) {
                                n.videoUrl = e.tempFilePath, n.size = (e.size / 1048576).toFixed(2), n.length = e.duration, 
                                n.visiable = !0, n.addVisiable = !1, n.newMd5 = n.randomString(28);
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    },
                    randomString: function(e) {
                        e = e || 32;
                        for (var n = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", t = n.length, o = "", i = 0; i < e; i++) o += n.charAt(Math.floor(Math.random() * t));
                        return o;
                    },
                    clear: function() {
                        this.visiable = !1, this.addVisiable = !0;
                    },
                    save: function() {
                        this.size > 10 ? e.showModal({
                            content: "视频超过10M，无法保存"
                        }) : e.saveFile({
                            tempFilePath: this.videoUrl,
                            success: function(n) {
                                e.saveVideoToPhotosAlbum({
                                    filePath: n.savedFilePath,
                                    success: function(n) {
                                        e.showModal({
                                            content: "已经保存到手机"
                                        });
                                    },
                                    fail: function(n) {
                                        e.showModal({
                                            content: "出现错误 暂时无法保存"
                                        });
                                    }
                                });
                            },
                            fail: function(n) {
                                console.log(n), e.showModal({
                                    content: "出现错误 暂时无法保存"
                                });
                            }
                        });
                    }
                }
            };
            n.default = t;
        }).call(this, t("df3c")["default"]);
    },
    cacc: function(e, n, t) {
        "use strict";
        t.r(n);
        var o = t("2417"), i = t("6ef7");
        for (var a in i) [ "default" ].indexOf(a) < 0 && function(e) {
            t.d(n, e, function() {
                return i[e];
            });
        }(a);
        t("27be");
        var c = t("828b"), s = Object(c["a"])(i["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        n["default"] = s.exports;
    }
}, [ [ "0314", "common/runtime", "common/vendor" ] ] ]);