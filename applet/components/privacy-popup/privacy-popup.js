(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "components/privacy-popup/privacy-popup" ], {
    "298e": function(t, o, e) {
        "use strict";
        e.r(o);
        var n = e("4cc9"), i = e("9ed7");
        for (var c in i) [ "default" ].indexOf(c) < 0 && function(t) {
            e.d(o, t, function() {
                return i[t];
            });
        }(c);
        e("2d06");
        var a = e("828b"), r = Object(a["a"])(i["default"], n["b"], n["c"], !1, null, "55fba30f", null, !1, n["a"], void 0);
        o["default"] = r.exports;
    },
    "2d06": function(t, o, e) {
        "use strict";
        var n = e("89a7"), i = e.n(n);
        i.a;
    },
    "4cc9": function(t, o, e) {
        "use strict";
        e.d(o, "b", function() {
            return n;
        }), e.d(o, "c", function() {
            return i;
        }), e.d(o, "a", function() {});
        var n = function() {
            var t = this.$createElement;
            this._self._c;
        }, i = [];
    },
    "89a7": function(t, o, e) {},
    "8dea": function(t, o, e) {
        "use strict";
        (function(t, e) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var n = {
                data: function() {
                    return {
                        agree: !1,
                        showPop: !1,
                        privacyAuthorization: null,
                        privacyResolves: new Set(),
                        closeOtherPagePopUpHooks: new Set(),
                        privacyContractName: "用户隐私保护指引"
                    };
                },
                mounted: function() {
                    this.init(), this.curPageShow();
                },
                created: function() {
                    var o = this;
                    try {
                        t.getPrivacySetting({
                            success: function(t) {
                                console.log("隐私政策信息", t), console.log(t.privacyContractName), o.privacyContractName = t.privacyContractName;
                            }
                        });
                    } catch (e) {
                        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                        console.log("=========低版本基础库==========");
                    }
                },
                methods: {
                    init: function() {
                        var o = this;
                        t.onNeedPrivacyAuthorization && t.onNeedPrivacyAuthorization(function(t) {
                            "function" === typeof o.privacyAuthorization && (console.log(t), o.privacyAuthorization(t));
                        });
                    },
                    proactive: function() {
                        var o = this, e = this;
                        t.getPrivacySetting ? t.getPrivacySetting({
                            success: function(t) {
                                console.log(t), t.needAuthorization ? (e.popUp(), o.closeOtherPagePopUp(o.disPopUp)) : o.$emit("agree");
                            }
                        }) : this.$emit("agree");
                    },
                    curPageShow: function() {
                        var t = this;
                        this.privacyAuthorization = function(o) {
                            t.privacyResolves.add(o), t.popUp(), t.closeOtherPagePopUp(t.disPopUp);
                        }, this.closeOtherPagePopUpHooks.add(this.disPopUp);
                    },
                    closeOtherPagePopUp: function(t) {
                        this.closeOtherPagePopUpHooks.forEach(function(o) {
                            t !== o && o();
                        });
                    },
                    openPrivacyContract: function() {
                        t.openPrivacyContract({
                            success: function(t) {
                                console.log("打开隐私协议", t);
                            },
                            fail: function(t) {
                                console.error("打开隐私协议失败", t);
                            }
                        });
                    },
                    handleDisagree: function() {
                        var t = this;
                        this.privacyResolves.forEach(function(t) {
                            t({
                                event: "disagree"
                            });
                        }), this.privacyResolves.clear(), this.disPopUp(), e.showModal({
                            content: "未同意隐私协议，无法使用相关功能",
                            showCancel: !1,
                            success: function() {
                                t.$emit("disagree");
                            }
                        });
                    },
                    handleAgree: function() {
                        this.privacyResolves.forEach(function(t) {
                            t({
                                event: "agree",
                                buttonId: "agree-btn"
                            });
                        }), this.privacyResolves.clear(), this.disPopUp(), this.$emit("agree");
                    },
                    popUp: function() {
                        !1 === this.showPop && (this.showPop = !0);
                    },
                    disPopUp: function() {
                        !0 === this.showPop && (this.showPop = !1);
                    }
                }
            };
            o.default = n;
        }).call(this, e("3223")["default"], e("df3c")["default"]);
    },
    "9ed7": function(t, o, e) {
        "use strict";
        e.r(o);
        var n = e("8dea"), i = e.n(n);
        for (var c in n) [ "default" ].indexOf(c) < 0 && function(t) {
            e.d(o, t, function() {
                return n[t];
            });
        }(c);
        o["default"] = i.a;
    }
} ]);

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ "components/privacy-popup/privacy-popup-create-component", {
    "components/privacy-popup/privacy-popup-create-component": function(module, exports, __webpack_require__) {
        __webpack_require__("df3c")["createComponent"](__webpack_require__("298e"));
    }
}, [ [ "components/privacy-popup/privacy-popup-create-component" ] ] ]);