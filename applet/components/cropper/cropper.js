(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ [ "components/cropper/cropper" ], {
    "18aa": function(t, i, e) {},
    2966: function(t, i, e) {
        "use strict";
        var a = e("18aa"), o = e.n(a);
        o.a;
    },
    "61c9": function(t, i, e) {
        "use strict";
        e.r(i);
        var a = e("85f5"), o = e.n(a);
        for (var s in a) [ "default" ].indexOf(s) < 0 && function(t) {
            e.d(i, t, function() {
                return a[t];
            });
        }(s);
        i["default"] = o.a;
    },
    "85b7": function(t, i, e) {
        "use strict";
        e.r(i);
        var a = e("aaef"), o = e("61c9");
        for (var s in o) [ "default" ].indexOf(s) < 0 && function(t) {
            e.d(i, t, function() {
                return o[t];
            });
        }(s);
        e("2966");
        var h = e("828b"), c = Object(h["a"])(o["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], void 0);
        i["default"] = c.exports;
    },
    "85f5": function(t, i, e) {
        "use strict";
        (function(t, e) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.default = void 0;
            var a = 0, o = 0, s = 0, h = 0, c = 0, n = 0, p = 0, u = 0, r = 1, l = 0, f = 0, d = 0, g = 0, b = 0, x = 0, v = 0, R = 0, m = {
                name: "cropper",
                props: {
                    quality: {
                        type: Number,
                        default: 1
                    },
                    imagePath: {
                        type: String,
                        default: ""
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
                        default: .05
                    },
                    minBoxHeightRatio: {
                        type: Number,
                        default: .05
                    },
                    initialBoxWidthRatio: {
                        type: Number,
                        default: .6
                    },
                    initialBoxHeightRatio: {
                        type: Number,
                        default: .6
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
                        canvasHeight: 0
                    };
                },
                mounted: function() {
                    var t = this;
                    setTimeout(function() {
                        t.init();
                    }, 150);
                },
                methods: {
                    resetCrop: function() {
                        this.$emit("reset"), this.init();
                    },
                    cancelCrop: function() {
                        this.$emit("cancel");
                    },
                    completeCrop: function() {
                        var i = this, e = this.imagePath, a = t.createCanvasContext("canvas", this), o = this.boxLeft, s = this.boxTop, h = this.boxWidth, c = this.boxHeight, n = Math.ceil(o * r), p = Math.ceil(s * r), u = Math.ceil(h * r), l = Math.ceil(c * r), f = Math.ceil(1 * u), d = Math.ceil(1 * l), g = {
                            x: n,
                            y: p,
                            width: f,
                            height: d,
                            rotate: 0,
                            scaleX: 1,
                            scaleY: 1
                        };
                        getApp().globalData.x = n, getApp().globalData.y = p, getApp().globalData.width = f, 
                        getApp().globalData.height = d;
                        getApp().globalData;
                        a.drawImage(e, n, p, u, l, 0, 0, f, d), a.draw(!1, function() {
                            t.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                width: f,
                                height: d,
                                destWidth: u,
                                destHeight: l,
                                canvasId: "canvas",
                                fileType: i.outputFileType,
                                quality: i.quality,
                                success: function(t) {
                                    i.$emit("complete", {
                                        param: g,
                                        path: t.tempFilePath
                                    });
                                }
                            }, i);
                        });
                    },
                    touchMove: function(t) {
                        var i = t.target.id, e = t.touches[0], a = e.pageX, o = e.pageY, s = a - v, h = o - R;
                        if ("box" == i) {
                            var p = d + s, u = g + h;
                            p < 0 && (p = 0), u < 0 && (u = 0), p + b > c && (p = c - b), u + x > n && (u = n - x), 
                            this.boxLeft = p, this.boxTop = u;
                        } else if ("lt" == i) {
                            this.aspectRatio && (h = s / this.aspectRatio);
                            var r = d + s, m = g + h;
                            r < 0 && (r = 0), m < 0 && (m = 0), g + x - m < f && (m = g + x - f);
                            var y = x - (m - g);
                            this.boxTop = m, this.boxHeight = y;
                        } else if ("rt" == i) {
                            this.aspectRatio && (h = -s / this.aspectRatio);
                            var H = b + s;
                            H < l && (H = l), d + H > c && (H = c - d);
                            var W = g + h;
                            W < 0 && (W = 0), g + x - W < f && (W = g + x - f);
                            var T = x - (W - g);
                            0 == W && this.aspectRatio && H != c - d && (H = T * this.aspectRatio), H == c - d && this.aspectRatio && (T = H / this.aspectRatio, 
                            W = x - T + g), H == l && this.aspectRatio && (T = H / this.aspectRatio, W = x - T + g), 
                            this.boxTop = W, this.boxHeight = T, this.boxWidth = H;
                        } else if ("lb" == i) {
                            this.aspectRatio && (h = -s / this.aspectRatio);
                            var w = d + s;
                            w < 0 && (w = 0), d + b - w < l && (w = d + b - l);
                            var B = b - (w - d);
                            this.boxLeft = w, this.boxWidth = B;
                        } else if ("rb" == i) {
                            this.aspectRatio && (h = s / this.aspectRatio);
                            var L = b + s;
                            L < l && (L = l), d + L > c && (L = c - d);
                            var M = x + h;
                            M < f && (M = f), g + M > n && (M = n - g), M == n - g && this.aspectRatio && L != c - d && (L = M * this.aspectRatio), 
                            L == c - d && this.aspectRatio && (M = L / this.aspectRatio), L == l && this.aspectRatio && (M = L / this.aspectRatio), 
                            this.boxWidth = L, this.boxHeight = M;
                        }
                    },
                    touchStart: function(t) {
                        var i = t.touches[0], e = i.pageX, a = i.pageY;
                        v = e, R = a, d = this.boxLeft, g = this.boxTop, b = this.boxWidth, x = this.boxHeight;
                    },
                    init: function() {
                        var i = this;
                        e.createSelectorQuery().in(this).select(".cropper-body").boundingClientRect(function(e) {
                            e.left, e.top, a = e.width, o = e.height, t.getImageInfo({
                                src: i.imagePath,
                                success: function(t) {
                                    console.log(t), p = t.width, u = t.height;
                                    var e = p / u, d = a / o;
                                    e >= d ? (c = a, n = c / e, r = u / n) : (n = o, c = o * e, r = p / c), s = (a - c) / 2, 
                                    h = (o - n) / 2, l = c * i.minBoxWidthRatio, f = n * i.minBoxHeightRatio;
                                    var g = c * i.initialBoxWidthRatio, b = n * i.initialBoxHeightRatio;
                                    i.aspectRatio && (b = g / i.aspectRatio), b > n && (b = n, g = b * i.aspectRatio);
                                    var x = (c - g) / 2, v = (n - b) / 2;
                                    i.canvasWidth = 1 * p, i.canvasHeight = 1 * u, i.stageLeft = s, i.stageTop = h, 
                                    i.stageWidth = c, i.stageHeight = n, i.boxWidth = g, i.boxHeight = b, i.boxLeft = x, 
                                    i.boxTop = v;
                                }
                            });
                        }).exec();
                    }
                }
            };
            i.default = m;
        }).call(this, e("3223")["default"], e("df3c")["default"]);
    },
    aaef: function(t, i, e) {
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
    }
} ]);

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([ "components/cropper/cropper-create-component", {
    "components/cropper/cropper-create-component": function(module, exports, __webpack_require__) {
        __webpack_require__("df3c")["createComponent"](__webpack_require__("85b7"));
    }
}, [ [ "components/cropper/cropper-create-component" ] ] ]);