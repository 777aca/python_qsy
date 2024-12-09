(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/otherTool/otherTool" ], {
    "350d": function(e, t, a) {},
    "4dfb": function(e, t, a) {
        "use strict";
        a.r(t);
        var o = a("8d73"), n = a.n(o);
        for (var i in o) [ "default" ].indexOf(i) < 0 && function(e) {
            a.d(t, e, function() {
                return o[e];
            });
        }(i);
        t["default"] = n.a;
    },
    "8d73": function(e, t, a) {
        "use strict";
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = {
                data: function() {
                    return {
                        tempFilePath: "",
                        cropFilePath: "",
                        showAd: !1,
                        ad: "",
                        globalColor: getApp().globalData.globalColor
                    };
                },
                onLoad: function() {
                    this.ad = getApp().globalData.toolAd, console.log(getApp().globalData.toolAd), this.showAd = !0;
                },
                onShareAppMessage: function(e) {
                    return {
                        title: "抖音、快手、皮皮虾短视频一键去水印,去水印还能这么简单,图片也可以去水印哟",
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
                methods: {
                    toPage: function(t) {
                        if (console.log(t), 1 == t) e.navigateTo({
                            url: "../md5/md5"
                        }); else if (2 == t) e.navigateTo({
                            url: "../cropper/cropper"
                        }); else if (3 == t) e.navigateTo({
                            url: "../music/music"
                        }); else if (4 == t) e.navigateTo({
                            url: "../fontToVoice/fontToVoice"
                        }); else if (5 == t) e.navigateTo({
                            url: "../imgageToText/imgageToText"
                        }); else if (6 == t) e.navigateTo({
                            url: "../easyCode/easyCode"
                        }); else if (7 == t) {
                            e.previewImage({
                                urls: [ getApp().globalData.shareImg ],
                                longPressActions: {
                                    itemList: [ "发送给朋友", "保存图片", "收藏" ]
                                }
                            });
                        } else 8 == t && e.navigateTo({
                            url: "../clearMusic/clearMusic"
                        });
                    }
                }
            };
            t.default = a;
        }).call(this, a("df3c")["default"]);
    },
    "91d7": function(e, t, a) {
        "use strict";
        a.r(t);
        var o = a("e2be"), n = a("4dfb");
        for (var i in n) [ "default" ].indexOf(i) < 0 && function(e) {
            a.d(t, e, function() {
                return n[e];
            });
        }(i);
        a("ef20");
        var l = a("828b"), r = Object(l["a"])(n["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], void 0);
        t["default"] = r.exports;
    },
    e2be: function(e, t, a) {
        "use strict";
        a.d(t, "b", function() {
            return o;
        }), a.d(t, "c", function() {
            return n;
        }), a.d(t, "a", function() {});
        var o = function() {
            var e = this.$createElement;
            this._self._c;
        }, n = [];
    },
    ec5e: function(e, t, a) {
        "use strict";
        (function(e, t) {
            var o = a("47a9");
            a("37d4");
            o(a("3240"));
            var n = o(a("91d7"));
            e.__webpack_require_UNI_MP_PLUGIN__ = a, t(n.default);
        }).call(this, a("3223")["default"], a("df3c")["createPage"]);
    },
    ef20: function(e, t, a) {
        "use strict";
        var o = a("350d"), n = a.n(o);
        n.a;
    }
}, [ [ "ec5e", "common/runtime", "common/vendor" ] ] ]);