(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "components/yankai-cropper/cropper" ], {
    1342: function(t, i, e) {
        "use strict";
        (function(t, e) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.default = void 0;
            var a = 0, o = 0, s = 0, h = 0, c = 0, n = 0, p = 0, u = 0, r = 1, l = 0, f = 0, d = 0, g = 0, b = 0, x = 0, R = 0, v = 0, m = {
                name: "cropper",
                props: {
                    quality: {
                        type: Number,
                        default: 1
                    },
                    outputFileType: {
                        type: String,
                        default: "jpg"
                    },
                    aspectRatio: {
                        type: [ Number, null ],
                        default: null
                    },
                    minBoxWidthRatio: {
                        type: Number,
                        default: .15
                    },
                    minBoxHeightRatio: {
                        type: Number,
                        default: .15
                    },
                    initialBoxWidthRatio: {
                        type: Number,
                        default: .8
                    },
                    initialBoxHeightRatio: {
                        type: Number,
                        default: .8
                    }
                },
                data: function() {
                    return {
                        stageLeft: 0,
                        stageTop: 0,
                        stageWidth: 0,
                        stageHeight: 0,
                        boxWidth: 0,
                        boxHeight: 0,
                        boxLeft: 0,
                        boxTop: 0,
                        canvasWidth: 0,
                        canvasHeight: 0,
                        show: !1,
                        imagePath: "",
                        showCut: !0
                    };
                },
                mounted: function() {},
                methods: {
                    resetCrop: function() {
                        this.$emit("reset"), this.init(this.imagePath);
                    },
                    cancelCrop: function() {
                        this.$emit("cancel");
                    },
                    completeCrop: function() {
                        var i = this;
                        t.showLoading({
                            title: "去水印中..."
                        });
                        var a = this.imagePath, o = e.createCanvasContext("canvas", this), s = this.boxLeft, h = this.boxTop, c = this.boxWidth, n = this.boxHeight, p = Math.ceil(s * r), u = Math.ceil(h * r), l = Math.ceil(c * r), f = Math.ceil(n * r), d = Math.ceil(1 * l), g = Math.ceil(1 * f), b = {
                            x: p,
                            y: u,
                            width: d,
                            height: g,
                            rotate: 0,
                            scaleX: 1,
                            scaleY: 1
                        };
                        o.drawImage(a, p, u, l, f, 0, 0, d, g), o.draw(!1, function() {
                            e.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: d,
                                height: g,
                                destWidth: l,
                                destHeight: f,
                                canvasId: "canvas",
                                fileType: i.outputFileType,
                                quality: i.quality,
                                success: function(t) {
                                    i.$emit("complete", {
                                        param: b,
                                        path: t.tempFilePath,
                                        source: i.imagePath
                                    });
                                }
                            }, i);
                        });
                    },
                    touchMove: function(t) {
                        var i = t.target.id, e = t.touches[0], a = e.pageX, o = e.pageY, s = a - R, h = o - v;
                        if ("box" == i) {
                            var p = d + s, u = g + h;
                            p < 0 && (p = 0), u < 0 && (u = 0), p + b > c && (p = c - b), u + x > n && (u = n - x), 
                            this.boxLeft = p, this.boxTop = u;
                        } else if ("lt" == i) {
                            this.aspectRatio && (h = s / this.aspectRatio);
                            var r = d + s, m = g + h;
                            r < 0 && (r = 0), m < 0 && (m = 0), d + b - r < l && (r = d + b - l), g + x - m < f && (m = g + x - f);
                            var y = b - (r - d), H = x - (m - g);
                            0 == m && this.aspectRatio && 0 != r && (y = H * this.aspectRatio, r = b - y + d), 
                            0 == r && this.aspectRatio && (H = y / this.aspectRatio, m = x - H + g), y == l && this.aspectRatio && (H = y / this.aspectRatio, 
                            m = x - H + g), this.boxTop = m, this.boxLeft = r, this.boxWidth = y, this.boxHeight = H;
                        } else if ("rt" == i) {
                            this.aspectRatio && (h = -s / this.aspectRatio);
                            var W = b + s;
                            W < l && (W = l), d + W > c && (W = c - d);
                            var T = g + h;
                            T < 0 && (T = 0), g + x - T < f && (T = g + x - f);
                            var w = x - (T - g);
                            0 == T && this.aspectRatio && W != c - d && (W = w * this.aspectRatio), W == c - d && this.aspectRatio && (w = W / this.aspectRatio, 
                            T = x - w + g), W == l && this.aspectRatio && (w = W / this.aspectRatio, T = x - w + g), 
                            this.boxTop = T, this.boxHeight = w, this.boxWidth = W;
                        } else if ("lb" == i) {
                            this.aspectRatio && (h = -s / this.aspectRatio);
                            var L = d + s;
                            L < 0 && (L = 0), d + b - L < l && (L = d + b - l);
                            var P = b - (L - d), B = x + h;
                            B < f && (B = f), g + B > n && (B = n - g), B == n - g && this.aspectRatio && 0 != L && (P = B * this.aspectRatio, 
                            L = b - P + d), 0 == L && this.aspectRatio && (B = P / this.aspectRatio), P == l && this.aspectRatio && (B = P / this.aspectRatio), 
                            this.boxLeft = L, this.boxWidth = P, this.boxHeight = B;
                        } else if ("rb" == i) {
                            this.aspectRatio && (h = s / this.aspectRatio);
                            var M = b + s;
                            M < l && (M = l), d + M > c && (M = c - d);
                            var C = x + h;
                            C < f && (C = f), g + C > n && (C = n - g), C == n - g && this.aspectRatio && M != c - d && (M = C * this.aspectRatio), 
                            M == c - d && this.aspectRatio && (C = M / this.aspectRatio), M == l && this.aspectRatio && (C = M / this.aspectRatio), 
                            this.boxWidth = M, this.boxHeight = C;
                        }
                    },
                    touchStart: function(t) {
                        var i = t.touches[0], e = i.pageX, a = i.pageY;
                        R = e, v = a, d = this.boxLeft, g = this.boxTop, b = this.boxWidth, x = this.boxHeight;
                    },
                    close: function() {
                        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        this.show = !1, t && (this.imagePath = "");
                    },
                    init: function(i) {
                        var d = this;
                        if (!i) return "";
                        this.imagePath = i, t.showLoading({
                            mask: !0,
                            title: "载入图片中"
                        }), t.createSelectorQuery().in(this).select(".cropper-body").boundingClientRect(function(i) {
                            i.left, i.top, a = i.width, o = i.height, e.getImageInfo({
                                src: d.imagePath,
                                success: function(i) {
                                    p = i.width, u = i.height;
                                    var e = p / u, g = a / o;
                                    e >= g ? (c = a, n = c / e, r = u / n) : (n = o, c = o * e, r = p / c), s = (a - c) / 2, 
                                    h = (o - n) / 2, l = c * d.minBoxWidthRatio, f = n * d.minBoxHeightRatio;
                                    var b = c * d.initialBoxWidthRatio, x = n * d.initialBoxHeightRatio;
                                    d.aspectRatio && (x = b / d.aspectRatio), x > n && (x = n, b = x * d.aspectRatio);
                                    var R = (c - b) / 2, v = (n - x) / 2;
                                    d.canvasWidth = 1 * p, d.canvasHeight = 1 * u, d.stageLeft = s, d.stageTop = h, 
                                    d.stageWidth = c, d.stageHeight = n, d.boxWidth = b, d.boxHeight = x, d.boxLeft = R, 
                                    d.boxTop = v, setTimeout(function() {
                                        t.hideLoading(), d.show = !0;
                                    }, 100);
                                },
                                fail: function() {
                                    t.showToast({
                                        icon: "none",
                                        title: "图片载入失败"
                                    });
                                }
                            });
                        }).exec();
                    }
                }
            };
            i.default = m;
        }).call(this, e("df3c")["default"], e("3223")["default"]);
    },
    3630: function(t, i, e) {
        "use strict";
        var a = e("7021"), o = e.n(a);
        o.a;
    },
    "38c8": function(t, i, e) {
        "use strict";
        e.r(i);
        var a = e("e614"), o = e("f5b1");
        for (var s in o) [ "default" ].indexOf(s) < 0 && function(t) {
            e.d(i, t, function() {
                return o[t];
            });
        }(s);
        e("3630");
        var h = e("828b"), c = Object(h["a"])(o["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], void 0);
        i["default"] = c.exports;
    },
    7021: function(t, i, e) {},
    e614: function(t, i, e) {
        "use strict";
        e.d(i, "b", function() {
            return a;
        }), e.d(i, "c", function() {
            return o;
        }), e.d(i, "a", function() {});
        var a = function() {
            var t = this.$createElement;
            this._self._c;
        }, o = [];
    },
    f5b1: function(t, i, e) {
        "use strict";
        e.r(i);
        var a = e("1342"), o = e.n(a);
        for (var s in a) [ "default" ].indexOf(s) < 0 && function(t) {
            e.d(i, t, function() {
                return a[t];
            });
        }(s);
        i["default"] = o.a;
    }
} ]);

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ "components/yankai-cropper/cropper-create-component", {
    "components/yankai-cropper/cropper-create-component": function(module, exports, __webpack_require__) {
        __webpack_require__("df3c")["createComponent"](__webpack_require__("38c8"));
    }
}, [ [ "components/yankai-cropper/cropper-create-component" ] ] ]);