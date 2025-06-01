"use strict";
let G = null;
class H {
}
function copyText(t) {
    if (navigator.clipboard)
        navigator.clipboard.writeText(t);
    else {
        var e = document.createElement("textarea");
        e.value = t,
            e.style.top = "0",
            e.style.left = "0",
            e.style.position = "fixed",
            document.body.appendChild(e),
            e.focus(),
            e.select(),
            document.execCommand("copy"),
            document.body.removeChild(e)
    }
}
H.render = function(t, e) {
    G(t, e)
}
    ,
    self.QrCreator = H,
    function(t) {
        function e(e, r, n, a) {
            var i = {}
                , o = t(n, r);
            o.u(e),
                o.J(),
                a = a || 0;
            var c = o.h()
                , l = o.h() + 2 * a;
            return i.text = e,
                i.level = r,
                i.version = n,
                i.O = l,
                i.a = function(t, e) {
                    return e -= a,
                    !(0 > (t -= a) || t >= c || 0 > e || e >= c) && o.a(t, e)
                }
                ,
                i
        }
        function r(t, e, r, n, a, i, o, c, l, s) {
            function u(e, r, n, a, o, c, l) {
                e ? (t.lineTo(r + c, n + l),
                    t.arcTo(r, n, a, o, i)) : t.lineTo(r, n)
            }
            o ? t.moveTo(e + i, r) : t.moveTo(e, r),
                u(c, n, r, n, a, -i, 0),
                u(l, n, a, e, a, 0, -i),
                u(s, e, a, e, r, i, 0),
                u(o, e, r, n, r, 0, i)
        }
        function n(t, e, r, n, a, i, o, c, l, s) {
            function u(e, r, n, a) {
                t.moveTo(e + n, r),
                    t.lineTo(e, r),
                    t.lineTo(e, r + a),
                    t.arcTo(e, r, e + n, r, i)
            }
            o && u(e, r, i, i),
            c && u(n, r, -i, i),
            l && u(n, a, -i, -i),
            s && u(e, a, i, -i)
        }
        function a(t, a) {
            t: {
                var i = a.text
                    , o = a.v
                    , c = a.N
                    , l = a.K
                    , s = a.P;
                for (c = Math.max(1, c || 1),
                         l = Math.min(40, l || 40); c <= l; c += 1)
                    try {
                        var u = e(i, o, c, s);
                        break t
                    } catch (t) {}
                u = void 0
            }
            if (!u)
                return null;
            for (i = t.getContext("2d"),
                 a.background && (i.fillStyle = a.background,
                     i.fillRect(a.left, a.top, a.size, a.size)),
                     o = u.O,
                     l = a.size / o,
                     i.beginPath(),
                     s = 0; s < o; s += 1)
                for (c = 0; c < o; c += 1) {
                    var f = i
                        , d = a.left + c * l
                        , p = a.top + s * l
                        , h = s
                        , m = c
                        , v = u.a
                        , g = d + l
                        , w = p + l
                        , y = h - 1
                        , b = h + 1
                        , k = m - 1
                        , $ = m + 1
                        , x = Math.floor(Math.min(.5, Math.max(0, a.R)) * l)
                        , C = v(h, m)
                        , T = v(y, k)
                        , q = v(y, m);
                    y = v(y, $);
                    var E = v(h, $);
                    $ = v(b, $),
                        m = v(b, m),
                        b = v(b, k),
                        h = v(h, k),
                        d = Math.round(d),
                        p = Math.round(p),
                        g = Math.round(g),
                        w = Math.round(w),
                        C ? r(f, d, p, g, w, x, !q && !h, !q && !E, !m && !E, !m && !h) : n(f, d, p, g, w, x, q && h && T, q && E && y, m && E && $, m && h && b)
                }
            return function(t, e) {
                var r = e.fill;
                if ("string" == typeof r)
                    t.fillStyle = r;
                else {
                    var n = r.type
                        , a = r.colorStops;
                    if (r = r.position.map((t => Math.round(t * e.size))),
                    "linear-gradient" === n)
                        var i = t.createLinearGradient.apply(t, r);
                    else {
                        if ("radial-gradient" !== n)
                            throw Error("Unsupported fill");
                        i = t.createRadialGradient.apply(t, r)
                    }
                    a.forEach(( ([t,e]) => {
                            i.addColorStop(t, e)
                        }
                    )),
                        t.fillStyle = i
                }
            }(i, a),
                i.fill(),
                t
        }
        var i = {
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: .5,
            quiet: 0
        };
        G = function(t, e) {
            var r = {};
            Object.assign(r, i, t),
                r.N = r.minVersion,
                r.K = r.maxVersion,
                r.v = r.ecLevel,
                r.left = r.left,
                r.top = r.top,
                r.size = r.size,
                r.fill = r.fill,
                r.background = r.background,
                r.text = r.text,
                r.R = r.radius,
                r.P = r.quiet,
                e instanceof HTMLCanvasElement ? (e.width === r.size && e.height === r.size || (e.width = r.size,
                    e.height = r.size),
                    e.getContext("2d").clearRect(0, 0, e.width, e.height),
                    a(e, r)) : ((t = document.createElement("canvas")).width = r.size,
                    t.height = r.size,
                    r = a(t, r),
                    e.appendChild(r))
        }
    }(function() {
        function t(a, o) {
            function c(t, e) {
                for (var r = -1; 7 >= r; r += 1)
                    if (!(-1 >= t + r || f <= t + r))
                        for (var n = -1; 7 >= n; n += 1)
                            -1 >= e + n || f <= e + n || (u[t + r][e + n] = 0 <= r && 6 >= r && (0 == n || 6 == n) || 0 <= n && 6 >= n && (0 == r || 6 == r) || 2 <= r && 4 >= r && 2 <= n && 4 >= n)
            }
            function l(t, r) {
                for (var o = f = 4 * a + 17, l = Array(o), h = 0; h < o; h += 1) {
                    l[h] = Array(o);
                    for (var m = 0; m < o; m += 1)
                        l[h][m] = null
                }
                for (u = l,
                         c(0, 0),
                         c(f - 7, 0),
                         c(0, f - 7),
                         o = n.G(a),
                         l = 0; l < o.length; l += 1)
                    for (h = 0; h < o.length; h += 1) {
                        m = o[l];
                        var v = o[h];
                        if (null == u[m][v])
                            for (var g = -2; 2 >= g; g += 1)
                                for (var w = -2; 2 >= w; w += 1)
                                    u[m + g][v + w] = -2 == g || 2 == g || -2 == w || 2 == w || 0 == g && 0 == w
                    }
                for (o = 8; o < f - 8; o += 1)
                    null == u[o][6] && (u[o][6] = 0 == o % 2);
                for (o = 8; o < f - 8; o += 1)
                    null == u[6][o] && (u[6][o] = 0 == o % 2);
                for (o = n.w(s << 3 | r),
                         l = 0; 15 > l; l += 1)
                    h = !t && 1 == (o >> l & 1),
                        u[6 > l ? l : 8 > l ? l + 1 : f - 15 + l][8] = h,
                        u[8][8 > l ? f - l - 1 : 9 > l ? 15 - l : 14 - l] = h;
                if (u[f - 8][8] = !t,
                7 <= a) {
                    for (o = n.A(a),
                             l = 0; 18 > l; l += 1)
                        h = !t && 1 == (o >> l & 1),
                            u[Math.floor(l / 3)][l % 3 + f - 8 - 3] = h;
                    for (l = 0; 18 > l; l += 1)
                        h = !t && 1 == (o >> l & 1),
                            u[l % 3 + f - 8 - 3][Math.floor(l / 3)] = h
                }
                if (null == d) {
                    for (t = i.I(a, s),
                             o = function() {
                                 var t = []
                                     , e = 0
                                     , r = {
                                     B: function() {
                                         return t
                                     },
                                     c: function(e) {
                                         return 1 == (t[Math.floor(e / 8)] >>> 7 - e % 8 & 1)
                                     },
                                     put: function(t, e) {
                                         for (var n = 0; n < e; n += 1)
                                             r.m(1 == (t >>> e - n - 1 & 1))
                                     },
                                     f: function() {
                                         return e
                                     },
                                     m: function(r) {
                                         var n = Math.floor(e / 8);
                                         t.length <= n && t.push(0),
                                         r && (t[n] |= 128 >>> e % 8),
                                             e += 1
                                     }
                                 };
                                 return r
                             }(),
                             l = 0; l < p.length; l += 1)
                        h = p[l],
                            o.put(4, 4),
                            o.put(h.b(), n.f(4, a)),
                            h.write(o);
                    for (l = h = 0; l < t.length; l += 1)
                        h += t[l].j;
                    if (o.f() > 8 * h)
                        throw Error("code length overflow. (" + o.f() + ">" + 8 * h + ")");
                    for (o.f() + 4 <= 8 * h && o.put(0, 4); 0 != o.f() % 8; )
                        o.m(!1);
                    for (; !(o.f() >= 8 * h) && (o.put(236, 8),
                        !(o.f() >= 8 * h)); )
                        o.put(17, 8);
                    var y = 0;
                    for (h = l = 0,
                             m = Array(t.length),
                             v = Array(t.length),
                             g = 0; g < t.length; g += 1) {
                        var b = t[g].j
                            , k = t[g].o - b;
                        for (l = Math.max(l, b),
                                 h = Math.max(h, k),
                                 m[g] = Array(b),
                                 w = 0; w < m[g].length; w += 1)
                            m[g][w] = 255 & o.B()[w + y];
                        for (y += b,
                                 w = n.C(k),
                                 b = e(m[g], w.b() - 1).l(w),
                                 v[g] = Array(w.b() - 1),
                                 w = 0; w < v[g].length; w += 1)
                            k = w + b.b() - v[g].length,
                                v[g][w] = 0 <= k ? b.c(k) : 0
                    }
                    for (w = o = 0; w < t.length; w += 1)
                        o += t[w].o;
                    for (o = Array(o),
                             w = y = 0; w < l; w += 1)
                        for (g = 0; g < t.length; g += 1)
                            w < m[g].length && (o[y] = m[g][w],
                                y += 1);
                    for (w = 0; w < h; w += 1)
                        for (g = 0; g < t.length; g += 1)
                            w < v[g].length && (o[y] = v[g][w],
                                y += 1);
                    d = o
                }
                for (t = d,
                         o = -1,
                         l = f - 1,
                         h = 7,
                         m = 0,
                         r = n.F(r),
                         v = f - 1; 0 < v; v -= 2)
                    for (6 == v && --v; ; ) {
                        for (g = 0; 2 > g; g += 1)
                            null == u[l][v - g] && (w = !1,
                            m < t.length && (w = 1 == (t[m] >>> h & 1)),
                            r(l, v - g) && (w = !w),
                                u[l][v - g] = w,
                            -1 == --h && (m += 1,
                                h = 7));
                        if (0 > (l += o) || f <= l) {
                            l -= o,
                                o = -o;
                            break
                        }
                    }
            }
            var s = r[o]
                , u = null
                , f = 0
                , d = null
                , p = []
                , h = {
                u: function(e) {
                    e = function(e) {
                        var r = t.s(e);
                        return {
                            S: function() {
                                return 4
                            },
                            b: function() {
                                return r.length
                            },
                            write: function(t) {
                                for (var e = 0; e < r.length; e += 1)
                                    t.put(r[e], 8)
                            }
                        }
                    }(e),
                        p.push(e),
                        d = null
                },
                a: function(t, e) {
                    if (0 > t || f <= t || 0 > e || f <= e)
                        throw Error(t + "," + e);
                    return u[t][e]
                },
                h: function() {
                    return f
                },
                J: function() {
                    for (var t = 0, e = 0, r = 0; 8 > r; r += 1) {
                        l(!0, r);
                        var a = n.D(h);
                        (0 == r || t > a) && (t = a,
                            e = r)
                    }
                    l(!1, e)
                }
            };
            return h
        }
        function e(t, r) {
            if (void 0 === t.length)
                throw Error(t.length + "/" + r);
            var n = function() {
                for (var e = 0; e < t.length && 0 == t[e]; )
                    e += 1;
                for (var n = Array(t.length - e + r), a = 0; a < t.length - e; a += 1)
                    n[a] = t[a + e];
                return n
            }()
                , i = {
                c: function(t) {
                    return n[t]
                },
                b: function() {
                    return n.length
                },
                multiply: function(t) {
                    for (var r = Array(i.b() + t.b() - 1), n = 0; n < i.b(); n += 1)
                        for (var o = 0; o < t.b(); o += 1)
                            r[n + o] ^= a.i(a.g(i.c(n)) + a.g(t.c(o)));
                    return e(r, 0)
                },
                l: function(t) {
                    if (0 > i.b() - t.b())
                        return i;
                    for (var r = a.g(i.c(0)) - a.g(t.c(0)), n = Array(i.b()), o = 0; o < i.b(); o += 1)
                        n[o] = i.c(o);
                    for (o = 0; o < t.b(); o += 1)
                        n[o] ^= a.i(a.g(t.c(o)) + r);
                    return e(n, 0).l(t)
                }
            };
            return i
        }
        t.s = function(t) {
            for (var e = [], r = 0; r < t.length; r++) {
                var n = t.charCodeAt(r);
                128 > n ? e.push(n) : 2048 > n ? e.push(192 | n >> 6, 128 | 63 & n) : 55296 > n || 57344 <= n ? e.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (r++,
                    n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(r)),
                    e.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
            }
            return e
        }
        ;
        var r = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2
        }
            , n = function() {
            function t(t) {
                for (var e = 0; 0 != t; )
                    e += 1,
                        t >>>= 1;
                return e
            }
            var r = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]]
                , n = {
                w: function(e) {
                    for (var r = e << 10; 0 <= t(r) - t(1335); )
                        r ^= 1335 << t(r) - t(1335);
                    return 21522 ^ (e << 10 | r)
                },
                A: function(e) {
                    for (var r = e << 12; 0 <= t(r) - t(7973); )
                        r ^= 7973 << t(r) - t(7973);
                    return e << 12 | r
                },
                G: function(t) {
                    return r[t - 1]
                },
                F: function(t) {
                    switch (t) {
                        case 0:
                            return function(t, e) {
                                return 0 == (t + e) % 2
                            }
                                ;
                        case 1:
                            return function(t) {
                                return 0 == t % 2
                            }
                                ;
                        case 2:
                            return function(t, e) {
                                return 0 == e % 3
                            }
                                ;
                        case 3:
                            return function(t, e) {
                                return 0 == (t + e) % 3
                            }
                                ;
                        case 4:
                            return function(t, e) {
                                return 0 == (Math.floor(t / 2) + Math.floor(e / 3)) % 2
                            }
                                ;
                        case 5:
                            return function(t, e) {
                                return 0 == t * e % 2 + t * e % 3
                            }
                                ;
                        case 6:
                            return function(t, e) {
                                return 0 == (t * e % 2 + t * e % 3) % 2
                            }
                                ;
                        case 7:
                            return function(t, e) {
                                return 0 == (t * e % 3 + (t + e) % 2) % 2
                            }
                                ;
                        default:
                            throw Error("bad maskPattern:" + t)
                    }
                },
                C: function(t) {
                    for (var r = e([1], 0), n = 0; n < t; n += 1)
                        r = r.multiply(e([1, a.i(n)], 0));
                    return r
                },
                f: function(t, e) {
                    if (4 != t || 1 > e || 40 < e)
                        throw Error("mode: " + t + "; type: " + e);
                    return 10 > e ? 8 : 16
                },
                D: function(t) {
                    for (var e = t.h(), r = 0, n = 0; n < e; n += 1)
                        for (var a = 0; a < e; a += 1) {
                            for (var i = 0, o = t.a(n, a), c = -1; 1 >= c; c += 1)
                                if (!(0 > n + c || e <= n + c))
                                    for (var l = -1; 1 >= l; l += 1)
                                        0 > a + l || e <= a + l || (0 != c || 0 != l) && o == t.a(n + c, a + l) && (i += 1);
                            5 < i && (r += 3 + i - 5)
                        }
                    for (n = 0; n < e - 1; n += 1)
                        for (a = 0; a < e - 1; a += 1)
                            i = 0,
                            t.a(n, a) && (i += 1),
                            t.a(n + 1, a) && (i += 1),
                            t.a(n, a + 1) && (i += 1),
                            t.a(n + 1, a + 1) && (i += 1),
                            (0 == i || 4 == i) && (r += 3);
                    for (n = 0; n < e; n += 1)
                        for (a = 0; a < e - 6; a += 1)
                            t.a(n, a) && !t.a(n, a + 1) && t.a(n, a + 2) && t.a(n, a + 3) && t.a(n, a + 4) && !t.a(n, a + 5) && t.a(n, a + 6) && (r += 40);
                    for (a = 0; a < e; a += 1)
                        for (n = 0; n < e - 6; n += 1)
                            t.a(n, a) && !t.a(n + 1, a) && t.a(n + 2, a) && t.a(n + 3, a) && t.a(n + 4, a) && !t.a(n + 5, a) && t.a(n + 6, a) && (r += 40);
                    for (a = i = 0; a < e; a += 1)
                        for (n = 0; n < e; n += 1)
                            t.a(n, a) && (i += 1);
                    return r + Math.abs(100 * i / e / e - 50) / 5 * 10
                }
            };
            return n
        }()
            , a = function() {
            for (var t = Array(256), e = Array(256), r = 0; 8 > r; r += 1)
                t[r] = 1 << r;
            for (r = 8; 256 > r; r += 1)
                t[r] = t[r - 4] ^ t[r - 5] ^ t[r - 6] ^ t[r - 8];
            for (r = 0; 255 > r; r += 1)
                e[t[r]] = r;
            return {
                g: function(t) {
                    if (1 > t)
                        throw Error("glog(" + t + ")");
                    return e[t]
                },
                i: function(e) {
                    for (; 0 > e; )
                        e += 255;
                    for (; 256 <= e; )
                        e -= 255;
                    return t[e]
                }
            }
        }()
            , i = function() {
            function t(t, n) {
                switch (n) {
                    case r.L:
                        return e[4 * (t - 1)];
                    case r.M:
                        return e[4 * (t - 1) + 1];
                    case r.Q:
                        return e[4 * (t - 1) + 2];
                    case r.H:
                        return e[4 * (t - 1) + 3]
                }
            }
            var e = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]]
                , n = {
                I: function(e, r) {
                    var n = t(e, r);
                    if (void 0 === n)
                        throw Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + r);
                    e = n.length / 3,
                        r = [];
                    for (var a = 0; a < e; a += 1)
                        for (var i = n[3 * a], o = n[3 * a + 1], c = n[3 * a + 2], l = 0; l < i; l += 1) {
                            var s = c
                                , u = {};
                            u.o = o,
                                u.j = s,
                                r.push(u)
                        }
                    return r
                }
            };
            return n
        }();
        return t
    }());
var username = document.head.querySelector('link[rel="canonical"]').href.split("/")[3]
    , copying = !1;
function t(t) {
    return i18n[t] || t
}
var em = document.querySelector("a[data-em]");
em && em.setAttribute("href", "mailto:" + decodeURIComponent(atob(em.dataset.em)));
var add = document.getElementById("add");
add && (add.onclick = function() {
        var t = username + "/vcf" + ("" === window.location.pathname.split("/")[1] ? "/1" : "");
        location.href = encodeURIComponent(t)
    }
);
var contactUrls = ["tel", "sms", "mailto"];
function split(t, e) {
    var r = t.indexOf(e);
    return r > 0 ? t.slice(0, r) : ""
}
function cc(t) {
    var e = t.metaKey || t.ctrlKey || "contextmenu" === t.type || "_blank" === t.currentTarget.target
        , r = t.currentTarget.href
        , n = t.currentTarget.querySelector(".link-title-copy-overlay");
    if (e || t.preventDefault(),
    window.fbq && (n || contactUrls.indexOf(split(r, ":")) > -1 ? fbq("track", "Contact") : fbq("trackCustom", "LinkClick", {
        url: r
    })),
    window.ttq && ttq.track("ClickButton", {
        content_type: "link"
    }),
        n) {
        if (r = "#",
            copying)
            return;
        if (copying = !0,
            window.jQuery) {
            var a = $(t.currentTarget).find(".link-block-text-wrapper")
                , i = $(n).find(".link-url")
                , o = a.find(".link-url").text() === i.text() && "‎" !== a.find(".link-name").text();
            copyText(i.text()),
                (a = o ? a.find(".link-name") : a).animate({
                    opacity: 0
                }, 300).delay(550).animate({
                    opacity: 1
                }, 300),
            o && i.css("opacity", 0),
                $(n).animate({
                    opacity: 1
                }, 300).delay(550).animate({
                    opacity: 0
                }, {
                    duration: 300,
                    complete: function() {
                        copying = !1
                    }
                })
        }
    } else if (r.includes("amazon.com") && !r.includes("/shop/")) {
        const t = new URL(r);
        "amazon.com" !== t.hostname.replace(/^www\./, "") || t.searchParams.has("tag") || (t.searchParams.append("tag", "pageview-20"),
            r = t.href)
    } else
        r.includes("apple.com") ? r = pa(r, "link") : r.includes("ticketmaster.com") && (r = "https://ticketmaster.evyy.net/c/5270152/264167/4272?u=" + encodeURIComponent(r));
    count(t.currentTarget.id, r, e)
}
for (var link = document.getElementsByClassName("link-button"), i = 0; i < link.length; i++)
    link[i].addEventListener("click", cc, !0),
        link[i].addEventListener("contextmenu", cc, !0);
function ec(t) {
    var e = t.metaKey || t.ctrlKey || "contextmenu" === t.type
        , r = t.currentTarget.href;
    r ? contactUrls.indexOf(split(r, ":")) > -1 || "telegram" === t.currentTarget.id ? (window.fbq && (fbq("track", "Contact"),
    e || (t.preventDefault(),
        setTimeout((function() {
                location.href = r
            }
        ), 100))),
    window.ttq && ttq.track("ClickButton", {
        content_type: "button"
    })) : (e || t.preventDefault(),
    window.fbq && fbq("trackCustom", "LinkClick", {
        url: r
    }),
    window.ttq && ttq.track("ClickButton", {
        content_type: "button"
    }),
    r.includes("apple.com") && (r = pa(r, "social")),
        count(t.currentTarget.id, r, e)) : count(t.currentTarget.id)
}
var soc = document.querySelectorAll(".minimal-button, .action-button, .contact-button:not(div)");
for (i = 0; i < soc.length; i++)
    soc[i].addEventListener("click", ec, !0),
        soc[i].addEventListener("contextmenu", ec, !0);
function count(t, e="#", r=!0) {
    var n = new XMLHttpRequest;
    n.open("POST", "/count"),
        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        n.onload = r || "#" === e ? "" : function() {
            location.href = e
        }
        ,
        n.send("id=" + encodeURIComponent(t) + "&page=" + encodeURIComponent(username))
}
function pa(t, e) {
    const r = new URL(t);
    if (!r.searchParams.has("at")) {
        const n = r.hostname.slice(0, -10)
            , a = ["music", "geo.music", "itunes", "geo.itunes"];
        r.searchParams.append("at", "1000l3auP"),
            r.searchParams.set("itscg", "30200"),
            r.searchParams.set("ls", "1"),
            r.searchParams.set("ct", e),
            a.includes(n) ? ("geo.music.apple.com" !== r.hostname && (r.hostname = "music.apple.com"),
                r.searchParams.set("itsct", "music_box_link"),
                r.searchParams.set("app", "music"),
                t = r.href) : "podcasts" === n ? (r.searchParams.set("itsct", "podcast_box"),
                t = r.href) : "books" === n && (r.searchParams.set("itsct", "books_box_link"),
                t = r.href)
    }
    return t
}
if (window.jQuery) {
    function e(t, e) {
        QrCreator.render({
            text: e,
            radius: .2,
            ecLevel: "M",
            size: 400,
            fill: "#111111",
            background: "#fff"
        }, document.querySelector("#" + t)),
            $("#" + t + " > canvas").css({
                width: "180px",
                height: "180px"
            })
    }
    function r(t, e) {
        copying || (copying = !0,
            copyText(e),
            t.animate({
                opacity: 0
            }, 300).delay(550).animate({
                opacity: 1
            }, 300),
            t.next().css("display", "flex").animate({
                opacity: 1
            }, 300).delay(550).animate({
                opacity: 0
            }, {
                duration: 300,
                complete: function() {
                    copying = !1,
                        $(this).css("display", "none")
                }
            }))
    }
    $("div[data-addr]").click((function() {
            var t = $(this).find(".minimal-button-icon")
                , r = "sol" === this.id && $(".modal-content-card-dark").length
                , n = t.attr("src").replace(/(\-min)?(\-dark|\-fill)?\.svg$/, (r ? "" : "-fill") + ".svg")
                , a = t.attr("alt")
                , i = $(this).data("addr");
            $("#qr-code-addr > canvas").remove(),
                e("qr-code-addr", i),
                $("#copy-addr").next().removeClass("crypto-modal-icon-black-bg").addClass(r ? "crypto-modal-icon-black-bg" : "").attr("src", n).prop({
                    title: a,
                    alt: a
                }).next().prop("title", i).text(i.slice(0, 6) + "..." + i.slice(-6)),
                $("#qr-addr-modal").animate({
                    opacity: 1
                }, 250, (function() {
                        $("body").css({
                            overflow: "hidden",
                            bottom: 0,
                            left: 0,
                            position: "fixed",
                            right: 0,
                            top: 0
                        })
                    }
                )).css("display", "flex")
        }
    )),
        $("#copy-addr").click((function() {
                r($(this).next().next(), $("#copy-addr-text").prop("title"))
            }
        ));
    var attr = "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height="
        , linkUrl = "https://" + $("#copy-link-page").text()
        , encodedUrl = encodeURIComponent(linkUrl);
    $(".page-share").click((function() {
            $("#share-modal").animate({
                opacity: 1
            }, 250, (function() {
                    $("body").css({
                        overflow: "hidden",
                        bottom: 0,
                        left: 0,
                        position: "fixed",
                        right: 0,
                        top: 0
                    })
                }
            )).css("display", "flex")
        }
    )),
        $(".upgrade-modal-close-button").click((function() {
                $(this).closest(".modal-wrapper").css("display", "none").css("opacity", 0),
                    $("body").css({
                        overflow: "",
                        bottom: "",
                        left: "",
                        position: "",
                        right: "",
                        top: ""
                    })
            }
        )),
        $("#copy-link").click((function() {
                r($(this).next(), linkUrl)
            }
        )),
        $("#share-facebook").click((function() {
                window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl, "targetWindow", attr + "350")
            }
        )),
        $("#share-x").click((function() {
                window.open("https://twitter.com/intent/tweet?text=" + encodedUrl, "targetWindow", attr + "350")
            }
        )),
        $("#share-linkedin").click((function() {
                window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + encodedUrl, "targetWindow", attr + "600")
            }
        )),
        $("#share-whatsapp").click((function() {
                window.open("https://wa.me/?text=" + encodedUrl, "targetWindow", attr + "600")
            }
        )),
        $("#share-messenger").click((function() {
                /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? location.href = "fb-messenger://share/?link=" + encodedUrl + "&app_id=296276052300089" : window.open("http://www.facebook.com/dialog/send?app_id=296276052300089&link=" + encodedUrl + "&redirect_uri=" + encodedUrl, "_blank")
            }
        )),
        $("#share-email").click((function() {
                $("#mail-link").prop("href", "mailto:?body=" + encodeURI(linkUrl)),
                    document.getElementById("mail-link").click()
            }
        )),
        $("#share-qr").click((function() {
                $("#qr-code > canvas").length || e("qr-code", linkUrl),
                    $("#share-modal").css({
                        opacity: 0,
                        display: "none"
                    }),
                    $("#qr-modal").css({
                        opacity: 1,
                        display: "flex"
                    })
            }
        )),
        $("#discord").click((function() {
                copying || (copying = !0,
                    copyText($(this).data("username")),
                    $(this).find(".contact-button-image, .contact-button-text").animate({
                        opacity: 0
                    }, 300).delay(550).animate({
                        opacity: 1
                    }, 300),
                    $(this).find(".contact-button-copy-overlay").animate({
                        opacity: 1
                    }, 300).delay(550).animate({
                        opacity: 0
                    }, {
                        duration: 300,
                        complete: function() {
                            copying = !1
                        }
                    }))
            }
        ));
    var capture = document.getElementById("email-form");
    if (capture) {
        function n(e) {
            if ("#" === $(e).attr("action")) {
                $.ajaxSetup({
                    headers: {
                        "X-CSRF-TOKEN": $(e).find("input[name=_token]").val()
                    }
                });
                var r = {
                    type: "POST",
                    url: encodeURIComponent(username + "/cap"),
                    success: function(t) {
                        $(".blank-success-message").show()
                    }
                }
            } else
                r = {
                    url: $(e).attr("action").replace("/post?", "/post-json?"),
                    jsonp: "c",
                    dataType: "jsonp",
                    cache: !1,
                    success: function(e) {
                        if ("success" !== e.result) {
                            var r = "Error: try again later";
                            e.msg.search("already subscribed") > -1 ? r = "Already subscribed" : e.msg.search("too many") > -1 ? r = "Too many recent attempts" : e.msg.search("captcha") > -1 ? r = "Error: reCAPTCHA must be disabled" : e.msg.search("enter a value") > -1 ? r = "Error: non-email field set to required" : console.log(e.msg.replace(/(<([^>]+)>(.*?)<([^>]+)>)/, "")),
                                $(".capture-success").html(t(r))
                        }
                        $(".blank-success-message").show()
                    }
                };
            var n = {
                data: $(e).serialize(),
                error: function(e) {
                    $(".blank-success-message").show().find(".capture-success").html(t("Error: invalid integration setup")),
                        console.log(e)
                },
                complete: function() {
                    $("#email-form, .capture-legal-wrapper").hide(),
                    window.fbq && fbq("trackCustom", "EmailCapture"),
                    window.ttq && ttq.track("ClickButton", {
                        content_type: "form"
                    })
                }
            };
            $.extend(r, n),
                $.ajax(r)
        }
        capture.addEventListener("submit", (function(t) {
                t.preventDefault(),
                    this.querySelector('button[type="submit"]').disabled = !0,
                "" === $("#comment").val() && n(this)
            }
        )),
            $("#email, #phone, #fname").on({
                focusin: function() {
                    var t = $(".capture-multi-field");
                    if (t.height() < 60) {
                        var e = t.css({
                            height: "auto"
                        }).height();
                        t.css("height", ""),
                            t.animate({
                                height: e
                            }, 150)
                    }
                    $(".capture-legal-wrapper").animate({
                        opacity: ["show"],
                        height: ["show"]
                    }, 100)
                },
                focusout: function() {
                    var t = ($("#email").val() || "") + ($("#phone").val() || "") + ($("#fname").val() || "");
                    setTimeout((function() {
                            if ("" === t && -1 === $.inArray(document.activeElement.id, ["email", "phone", "fname"])) {
                                var e = $(".capture-multi-field")
                                    , r = e.css({
                                    height: ""
                                }).height();
                                e.css("height", "auto"),
                                    e.animate({
                                        height: r
                                    }, 150),
                                    $(".capture-legal-wrapper").animate({
                                        opacity: ["hide"],
                                        height: ["hide"]
                                    }, 150)
                            }
                        }
                    ), 100)
                }
            })
    }
    var search = document.getElementById("search-form");
    if (search) {
        function a() {
            var t = $(".profile-link-wrapper").find(".link-item-wrapper, .rich-media-wrapper");
            $(".link-item-wrapper-full-width").removeClass("link-item-wrapper-full-width").find(".link-button-full-width").removeClass("link-button-full-width");
            var e = t.filter((function() {
                    return "flex" === $(this).css("display")
                }
            ))
                , r = $(".rich-media-wrapper, .divider-wrapper").filter((function() {
                    return "block" === $(this).css("display")
                }
            ));
            r.length > 0 ? $(".profile-search-wrapper").add(r).each((function(t) {
                    var e = $(this).nextUntil(r[t]).filter(".link-item-wrapper");
                    1 & e.length && e.first().fullWidth()
                }
            )) : 1 & e.length && e.first().fullWidth(),
                $(".divider-wrapper-top").removeClass("divider-wrapper-top"),
                $(".profile-search-wrapper").next(".divider-wrapper").addClass("divider-wrapper-top")
        }
        function o() {
            $(".profile-search-clear-button").hide(),
                $(".link-item-wrapper, .divider-wrapper, .rich-media-wrapper, .capture-wrapper").show()
        }
        $.fn.fullWidth = function() {
            this.addClass("link-item-wrapper-full-width").find(".link-button").addClass("link-button-full-width")
        }
            ,
            $.expr[":"].contains = $.expr.createPseudo((function(t) {
                    return function(e) {
                        return $(e).text().toUpperCase().indexOf(t.toUpperCase()) >= 0
                    }
                }
            )),
            $("#search").on("input", (function() {
                    var t = $(this).val();
                    "" !== t ? ($(this).next().show(),
                        $(".link-item-wrapper, .divider-wrapper, .rich-media-wrapper").hide(),
                        $(".link-item-wrapper-full-width").removeClass("link-item-wrapper-full-width").find(".link-button-full-width").removeClass("link-button-full-width"),
                        $(".profile-search-wrapper").nextAll(".capture-wrapper").hide(),
                        $(".link-name:contains(" + t + "), .link-url:contains(" + t + ")").closest(".link-item-wrapper").show()) : o(),
                        a()
                }
            )),
            $("#search-form").on("submit", (function(t) {
                    t.preventDefault(),
                        $("#search").blur()
                }
            )),
            $(".profile-search-clear-icon").click((function() {
                    $("#search-form").trigger("reset"),
                        o(),
                        a()
                }
            ))
    }
    $(".seated-load-button").click((function() {
            $(this).closest(".rich-media-wrapper").find(".seated-event-row").css("display", "flex").end().find(".seated-follow-box").show(),
                $(this).hide()
        }
    ));
    var tipJar = $("#tip-form");
    if (tipJar.length) {
        function c(t) {
            var e = tipJar.find(":submit");
            if (e.prop("disabled"))
                return !1;
            e.prop("disabled", !0),
                $.ajax({
                    type: "POST",
                    url: tipJar.attr("action"),
                    data: {
                        value: t
                    },
                    success: function(t) {
                        e.prop("disabled", !1),
                            window.location.href = t.url
                    },
                    error: function(t) {
                        window.location.reload()
                    }
                })
        }
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": tipJar.find('input[name="_token"]').val()
            }
        }),
            $("#tip-custom").click((function() {
                    $(this).hide().next().show().find("#tip_custom").focus()
                }
            )),
            $("#tip_custom").on("input", (function() {
                    this.value = this.value.replace(/^0|[^0-9]/g, "")
                }
            )),
            $("#tip-1, #tip-2, #tip-3").click((function() {
                    c($(this).data("value"))
                }
            )),
            $("#tip-form").on("submit", (function(t) {
                    t.preventDefault(),
                        c($("#tip_custom").val())
                }
            ))
    }
}
var btn = document.getElementsByClassName("twitch-chat-open")
    , toggleChat = function() {
    var e = this.previousElementSibling
        , r = this.firstChild
        , n = this.lastChild;
    0 === parseFloat(getComputedStyle(e, null).height.replace("px", "")) ? (r.innerHTML = t("Close Chat"),
        e.style.height = "400px",
        n.style.transform = "rotate(180deg)") : (r.innerHTML = t("Open Chat"),
        e.style.height = "0",
        n.style.transform = "rotate(0deg)")
};
for (i = 0; i < btn.length; i++)
    btn[i].addEventListener("click", toggleChat, !1);
