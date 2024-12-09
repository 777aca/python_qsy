(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "uni_modules/uni-popup/components/uni-popup/uni-popup" ], {
    "2c44": function(t, i, o) {
        "use strict";
        o.r(i);
        var s = o("e075"), n = o("4b23");
        for (var e in n) [ "default" ].indexOf(e) < 0 && function(t) {
            o.d(i, t, function() {
                return n[t];
            });
        }(e);
        o("468b");
        var a = o("828b"), r = Object(a["a"])(n["default"], s["b"], s["c"], !1, null, null, null, !1, s["a"], void 0);
        i["default"] = r.exports;
    },
    "3f26": function(t, i, o) {},
    "468b": function(t, i, o) {
        "use strict";
        var s = o("3f26"), n = o.n(s);
        n.a;
    },
    "4b23": function(t, i, o) {
        "use strict";
        o.r(i);
        var s = o("bc02"), n = o.n(s);
        for (var e in s) [ "default" ].indexOf(e) < 0 && function(t) {
            o.d(i, t, function() {
                return s[t];
            });
        }(e);
        i["default"] = n.a;
    },
    bc02: function(t, i, o) {
        "use strict";
        (function(t) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.default = void 0;
            var o = {
                name: "uniPopup",
                components: {},
                emits: [ "change", "maskClick" ],
                props: {
                    animation: {
                        type: Boolean,
                        default: !0
                    },
                    type: {
                        type: String,
                        default: "center"
                    },
                    isMaskClick: {
                        type: Boolean,
                        default: null
                    },
                    maskClick: {
                        type: Boolean,
                        default: null
                    },
                    backgroundColor: {
                        type: String,
                        default: "none"
                    },
                    safeArea: {
                        type: Boolean,
                        default: !0
                    },
                    maskBackgroundColor: {
                        type: String,
                        default: "rgba(0, 0, 0, 0.4)"
                    }
                },
                watch: {
                    type: {
                        handler: function(t) {
                            this.config[t] && this[this.config[t]](!0);
                        },
                        immediate: !0
                    },
                    isDesktop: {
                        handler: function(t) {
                            this.config[t] && this[this.config[this.type]](!0);
                        },
                        immediate: !0
                    },
                    maskClick: {
                        handler: function(t) {
                            this.mkclick = t;
                        },
                        immediate: !0
                    },
                    isMaskClick: {
                        handler: function(t) {
                            this.mkclick = t;
                        },
                        immediate: !0
                    },
                    showPopup: function(t) {}
                },
                data: function() {
                    return {
                        duration: 300,
                        ani: [],
                        showPopup: !1,
                        showTrans: !1,
                        popupWidth: 0,
                        popupHeight: 0,
                        config: {
                            top: "top",
                            bottom: "bottom",
                            center: "center",
                            left: "left",
                            right: "right",
                            message: "top",
                            dialog: "center",
                            share: "bottom"
                        },
                        maskClass: {
                            position: "fixed",
                            bottom: 0,
                            top: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.4)"
                        },
                        transClass: {
                            position: "fixed",
                            left: 0,
                            right: 0
                        },
                        maskShow: !0,
                        mkclick: !0,
                        popupstyle: "top"
                    };
                },
                computed: {
                    isDesktop: function() {
                        return this.popupWidth >= 500 && this.popupHeight >= 500;
                    },
                    bg: function() {
                        return "" === this.backgroundColor || "none" === this.backgroundColor ? "transparent" : this.backgroundColor;
                    }
                },
                mounted: function() {
                    var i = this;
                    (function() {
                        var o = t.getSystemInfoSync(), s = o.windowWidth, n = o.windowHeight, e = o.windowTop, a = o.safeArea, r = o.screenHeight;
                        o.safeAreaInsets;
                        i.popupWidth = s, i.popupHeight = n + (e || 0), a && i.safeArea ? i.safeAreaInsets = r - a.bottom : i.safeAreaInsets = 0;
                    })();
                },
                destroyed: function() {
                    this.setH5Visible();
                },
                created: function() {
                    null === this.isMaskClick && null === this.maskClick ? this.mkclick = !0 : this.mkclick = null !== this.isMaskClick ? this.isMaskClick : this.maskClick, 
                    this.animation ? this.duration = 300 : this.duration = 0, this.messageChild = null, 
                    this.clearPropagation = !1, this.maskClass.backgroundColor = this.maskBackgroundColor;
                },
                methods: {
                    setH5Visible: function() {},
                    closeMask: function() {
                        this.maskShow = !1;
                    },
                    disableMask: function() {
                        this.mkclick = !1;
                    },
                    clear: function(t) {
                        t.stopPropagation(), this.clearPropagation = !0;
                    },
                    open: function(t) {
                        if (!this.showPopup) {
                            t && -1 !== [ "top", "center", "bottom", "left", "right", "message", "dialog", "share" ].indexOf(t) || (t = this.type), 
                            this.config[t] ? (this[this.config[t]](), this.$emit("change", {
                                show: !0,
                                type: t
                            })) : console.error("缺少类型：", t);
                        }
                    },
                    close: function(t) {
                        var i = this;
                        this.showTrans = !1, this.$emit("change", {
                            show: !1,
                            type: this.type
                        }), clearTimeout(this.timer), this.timer = setTimeout(function() {
                            i.showPopup = !1;
                        }, 300);
                    },
                    touchstart: function() {
                        this.clearPropagation = !1;
                    },
                    onTap: function() {
                        this.clearPropagation ? this.clearPropagation = !1 : (this.$emit("maskClick"), this.mkclick && this.close());
                    },
                    top: function(t) {
                        var i = this;
                        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top", this.ani = [ "slide-top" ], 
                        this.transClass = {
                            position: "fixed",
                            left: 0,
                            right: 0,
                            backgroundColor: this.bg
                        }, t || (this.showPopup = !0, this.showTrans = !0, this.$nextTick(function() {
                            i.messageChild && "message" === i.type && i.messageChild.timerClose();
                        }));
                    },
                    bottom: function(t) {
                        this.popupstyle = "bottom", this.ani = [ "slide-bottom" ], this.transClass = {
                            position: "fixed",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            paddingBottom: this.safeAreaInsets + "px",
                            backgroundColor: this.bg
                        }, t || (this.showPopup = !0, this.showTrans = !0);
                    },
                    center: function(t) {
                        this.popupstyle = "center", this.ani = [ "zoom-out", "fade" ], this.transClass = {
                            position: "fixed",
                            display: "flex",
                            flexDirection: "column",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0,
                            justifyContent: "center",
                            alignItems: "center"
                        }, t || (this.showPopup = !0, this.showTrans = !0);
                    },
                    left: function(t) {
                        this.popupstyle = "left", this.ani = [ "slide-left" ], this.transClass = {
                            position: "fixed",
                            left: 0,
                            bottom: 0,
                            top: 0,
                            backgroundColor: this.bg,
                            display: "flex",
                            flexDirection: "column"
                        }, t || (this.showPopup = !0, this.showTrans = !0);
                    },
                    right: function(t) {
                        this.popupstyle = "right", this.ani = [ "slide-right" ], this.transClass = {
                            position: "fixed",
                            bottom: 0,
                            right: 0,
                            top: 0,
                            backgroundColor: this.bg,
                            display: "flex",
                            flexDirection: "column"
                        }, t || (this.showPopup = !0, this.showTrans = !0);
                    }
                }
            };
            i.default = o;
        }).call(this, o("df3c")["default"]);
    },
    e075: function(t, i, o) {
        "use strict";
        o.d(i, "b", function() {
            return n;
        }), o.d(i, "c", function() {
            return e;
        }), o.d(i, "a", function() {
            return s;
        });
        var s = {
            uniTransition: function() {
                return Promise.all([ o.e("common/vendor"), o.e("uni_modules/uni-transition/components/uni-transition/uni-transition") ]).then(o.bind(null, "ad0b"));
            }
        }, n = function() {
            var t = this.$createElement;
            this._self._c;
        }, e = [];
    }
} ]);

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ "uni_modules/uni-popup/components/uni-popup/uni-popup-create-component", {
    "uni_modules/uni-popup/components/uni-popup/uni-popup-create-component": function(module, exports, __webpack_require__) {
        __webpack_require__("df3c")["createComponent"](__webpack_require__("2c44"));
    }
}, [ [ "uni_modules/uni-popup/components/uni-popup/uni-popup-create-component" ] ] ]);