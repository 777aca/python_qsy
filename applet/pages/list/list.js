(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "pages/list/list" ], {
    "088a": function(t, a, n) {
        "use strict";
        n.d(a, "b", function() {
            return e;
        }), n.d(a, "c", function() {
            return i;
        }), n.d(a, "a", function() {});
        var e = function() {
            var t = this.$createElement;
            this._self._c;
        }, i = [];
    },
    "0903": function(t, a, n) {
        "use strict";
        n.r(a);
        var e = n("9021"), i = n.n(e);
        for (var l in e) [ "default" ].indexOf(l) < 0 && function(t) {
            n.d(a, t, function() {
                return e[t];
            });
        }(l);
        a["default"] = i.a;
    },
    "6db1": function(t, a, n) {
        "use strict";
        (function(t, a) {
            var e = n("47a9");
            n("37d4");
            e(n("3240"));
            var i = e(n("cef2"));
            t.__webpack_require_UNI_MP_PLUGIN__ = n, a(i.default);
        }).call(this, n("3223")["default"], n("df3c")["createPage"]);
    },
    "8ce2": function(t, a, n) {
        "use strict";
        var e = n("b682"), i = n.n(e);
        i.a;
    },
    9021: function(t, a, n) {
        "use strict";
        (function(t) {
            Object.defineProperty(a, "__esModule", {
                value: !0
            }), a.default = void 0;
            var n = {
                data: function() {
                    return {
                        analyseList: [],
                        pageId: -1,
                        globalColor: getApp().globalData.globalColor
                    };
                },
                onLoad: function() {
                    this.initAnalyseList(this.pageId);
                },
                methods: {
                    initAnalyseList: function(a) {
                        var n = this, e = this;
                        t.request({
                            url: e.$reqUrl + "lyz/getAnalyseList?pageId=" + a + "&uid=" + getApp().globalData.uid,
                            success: function(t) {
                                if (console.log(t.data.data), t.data.data.length > 0) {
                                    for (var a = 0; a < t.data.data.length; a++) e.analyseList.push(t.data.data[a]);
                                    n.pageId = t.data.data[t.data.data.length - 1].id;
                                }
                            }
                        });
                    },
                    detail: function(a) {
                        console.log(a);
                        var n = this.analyseList[a].analyseUrl;
                        t.setClipboardData({
                            data: n
                        });
                    }
                }
            };
            a.default = n;
        }).call(this, n("df3c")["default"]);
    },
    b682: function(t, a, n) {},
    cef2: function(t, a, n) {
        "use strict";
        n.r(a);
        var e = n("088a"), i = n("0903");
        for (var l in i) [ "default" ].indexOf(l) < 0 && function(t) {
            n.d(a, t, function() {
                return i[t];
            });
        }(l);
        n("8ce2");
        var o = n("828b"), u = Object(o["a"])(i["default"], e["b"], e["c"], !1, null, null, null, !1, e["a"], void 0);
        a["default"] = u.exports;
    }
}, [ [ "6db1", "common/runtime", "common/vendor" ] ] ]);