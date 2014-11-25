/*
 * Ext JS Library 3.1+ Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
window.undefined = window.undefined;
Ext = {
	version : "3.1.0"
};
Ext.apply = function(d, e, b) {
	if (b) {
		Ext.apply(d, b)
	}
	if (d && e && typeof e == "object") {
		for (var a in e) {
			d[a] = e[a]
		}
	}
	return d
};
(function() {
	var g = 0, s = Object.prototype.toString, t = navigator.userAgent
			.toLowerCase(), y = function(e) {
		return e.test(t)
	}, i = document, l = i.compatMode == "CSS1Compat", A = y(/opera/), h = y(/chrome/), u = y(/webkit/), x = !h
			&& y(/safari/), f = x && y(/applewebkit\/4/), b = x
			&& y(/version\/3/), B = x && y(/version\/4/), r = !A && y(/msie/), p = r
			&& y(/msie 7/), o = r && y(/msie 8/), q = r && !p && !o, n = !u
			&& y(/gecko/), d = n && y(/rv:1\.8/), a = n && y(/rv:1\.9/), v = r
			&& !l, z = y(/windows|win32/), k = y(/macintosh|mac os x/), j = y(/adobeair/), m = y(/linux/), c = /^https/i
			.test(window.location.protocol);
	if (q) {
		try {
			i.execCommand("BackgroundImageCache", false, true)
		} catch (w) {
		}
	}
	Ext.apply(Ext, {
		SSL_SECURE_URL : c && r ? 'javascript:""' : "about:blank",
		isStrict : l,
		isSecure : c,
		isReady : false,
		enableGarbageCollector : true,
		enableListenerCollection : false,
		enableNestedListenerRemoval : false,
		USE_NATIVE_JSON : false,
		applyIf : function(C, D) {
			if (C) {
				for (var e in D) {
					if (!Ext.isDefined(C[e])) {
						C[e] = D[e]
					}
				}
			}
			return C
		},
		id : function(e, C) {
			return (e = Ext.getDom(e) || {}).id = e.id || (C || "ext-gen")
					+ (++g)
		},
		extend : function() {
			var C = function(E) {
				for (var D in E) {
					this[D] = E[D]
				}
			};
			var e = Object.prototype.constructor;
			return function(J, G, I) {
				if (Ext.isObject(G)) {
					I = G;
					G = J;
					J = I.constructor != e ? I.constructor : function() {
						G.apply(this, arguments)
					}
				}
				var E = function() {
				}, H, D = G.prototype;
				E.prototype = D;
				H = J.prototype = new E();
				H.constructor = J;
				J.superclass = D;
				if (D.constructor == e) {
					D.constructor = G
				}
				J.override = function(F) {
					Ext.override(J, F)
				};
				H.superclass = H.supr = (function() {
					return D
				});
				H.override = C;
				Ext.override(J, I);
				J.extend = function(F) {
					return Ext.extend(J, F)
				};
				return J
			}
		}(),
		override : function(e, D) {
			if (D) {
				var C = e.prototype;
				Ext.apply(C, D);
				if (Ext.isIE && D.hasOwnProperty("toString")) {
					C.toString = D.toString
				}
			}
		},
		namespace : function() {
			var C, e;
			Ext.each(arguments, function(D) {
						e = D.split(".");
						C = window[e[0]] = window[e[0]] || {};
						Ext.each(e.slice(1), function(E) {
									C = C[E] = C[E] || {}
								})
					});
			return C
		},
		urlEncode : function(G, F) {
			var D, C = [], E = encodeURIComponent;
			Ext.iterate(G, function(e, H) {
						D = Ext.isEmpty(H);
						Ext.each(D ? e : H, function(I) {
									C
											.push(
													"&",
													E(e),
													"=",
													(!Ext.isEmpty(I) && (I != e || !D))
															? (Ext.isDate(I)
																	? Ext
																			.encode(I)
																			.replace(
																					/"/g,
																					"")
																	: E(I))
															: "")
								})
					});
			if (!F) {
				C.shift();
				F = ""
			}
			return F + C.join("")
		},
		urlDecode : function(D, C) {
			if (Ext.isEmpty(D)) {
				return {}
			}
			var G = {}, F = D.split("&"), H = decodeURIComponent, e, E;
			Ext.each(F, function(I) {
						I = I.split("=");
						e = H(I[0]);
						E = H(I[1]);
						G[e] = C || !G[e] ? E : [].concat(G[e]).concat(E)
					});
			return G
		},
		urlAppend : function(e, C) {
			if (!Ext.isEmpty(C)) {
				return e + (e.indexOf("?") === -1 ? "?" : "&") + C
			}
			return e
		},
		toArray : function() {
			return r ? function(D, G, E, F) {
				F = [];
				for (var C = 0, e = D.length; C < e; C++) {
					F.push(D[C])
				}
				return F.slice(G || 0, E || F.length)
			} : function(e, D, C) {
				return Array.prototype.slice.call(e, D || 0, C || e.length)
			}
		}(),
		isIterable : function(e) {
			if (Ext.isArray(e) || e.callee) {
				return true
			}
			if (/NodeList|HTMLCollection/.test(s.call(e))) {
				return true
			}
			return ((e.nextNode || e.item) && Ext.isNumber(e.length))
		},
		each : function(F, E, D) {
			if (Ext.isEmpty(F, true)) {
				return
			}
			if (!Ext.isIterable(F) || Ext.isPrimitive(F)) {
				F = [F]
			}
			for (var C = 0, e = F.length; C < e; C++) {
				if (E.call(D || F[C], F[C], C, F) === false) {
					return C
				}
			}
		},
		iterate : function(D, C, e) {
			if (Ext.isEmpty(D)) {
				return
			}
			if (Ext.isIterable(D)) {
				Ext.each(D, C, e);
				return
			} else {
				if (Ext.isObject(D)) {
					for (var E in D) {
						if (D.hasOwnProperty(E)) {
							if (C.call(e || D, E, D[E], D) === false) {
								return
							}
						}
					}
				}
			}
		},
		getDom : function(e) {
			if (!e || !i) {
				return null
			}
			return e.dom ? e.dom : (Ext.isString(e) ? i.getElementById(e) : e)
		},
		getBody : function() {
			return Ext.get(i.body || i.documentElement)
		},
		removeNode : r && !o ? function() {
			var e;
			return function(C) {
				if (C && C.tagName != "BODY") {
					(Ext.enableNestedListenerRemoval) ? Ext.EventManager
							.purgeElement(C, true) : Ext.EventManager
							.removeAll(C);
					e = e || i.createElement("div");
					e.appendChild(C);
					e.innerHTML = "";
					delete Ext.elCache[C.id]
				}
			}
		}() : function(e) {
			if (e && e.parentNode && e.tagName != "BODY") {
				(Ext.enableNestedListenerRemoval) ? Ext.EventManager
						.purgeElement(e, true) : Ext.EventManager.removeAll(e);
				e.parentNode.removeChild(e);
				delete Ext.elCache[e.id]
			}
		},
		isEmpty : function(C, e) {
			return C === null || C === undefined
					|| ((Ext.isArray(C) && !C.length))
					|| (!e ? C === "" : false)
		},
		isArray : function(e) {
			return s.apply(e) === "[object Array]"
		},
		isDate : function(e) {
			return s.apply(e) === "[object Date]"
		},
		isObject : function(e) {
			return !!e
					&& Object.prototype.toString.call(e) === "[object Object]"
		},
		isPrimitive : function(e) {
			return Ext.isString(e) || Ext.isNumber(e) || Ext.isBoolean(e)
		},
		isFunction : function(e) {
			return s.apply(e) === "[object Function]"
		},
		isNumber : function(e) {
			return typeof e === "number" && isFinite(e)
		},
		isString : function(e) {
			return typeof e === "string"
		},
		isBoolean : function(e) {
			return typeof e === "boolean"
		},
		isElement : function(e) {
			return !!e && e.tagName
		},
		isDefined : function(e) {
			return typeof e !== "undefined"
		},
		isOpera : A,
		isWebKit : u,
		isChrome : h,
		isSafari : x,
		isSafari3 : b,
		isSafari4 : B,
		isSafari2 : f,
		isIE : r,
		isIE6 : q,
		isIE7 : p,
		isIE8 : o,
		isGecko : n,
		isGecko2 : d,
		isGecko3 : a,
		isBorderBox : v,
		isLinux : m,
		isWindows : z,
		isMac : k,
		isAir : j
	});
	Ext.ns = Ext.namespace
})();
Ext.ns("Ext.util", "Ext.lib", "Ext.data");
Ext.elCache = {};
Ext.apply(Function.prototype, {
			createInterceptor : function(b, a) {
				var c = this;
				return !Ext.isFunction(b) ? this : function() {
					var e = this, d = arguments;
					b.target = e;
					b.method = c;
					return (b.apply(a || e || window, d) !== false) ? c.apply(e
									|| window, d) : null
				}
			},
			createCallback : function() {
				var a = arguments, b = this;
				return function() {
					return b.apply(window, a)
				}
			},
			createDelegate : function(c, b, a) {
				var d = this;
				return function() {
					var f = b || arguments;
					if (a === true) {
						f = Array.prototype.slice.call(arguments, 0);
						f = f.concat(b)
					} else {
						if (Ext.isNumber(a)) {
							f = Array.prototype.slice.call(arguments, 0);
							var e = [a, 0].concat(b);
							Array.prototype.splice.apply(f, e)
						}
					}
					return d.apply(c || window, f)
				}
			},
			defer : function(c, e, b, a) {
				var d = this.createDelegate(e, b, a);
				if (c > 0) {
					return setTimeout(d, c)
				}
				d();
				return 0
			}
		});
Ext.applyIf(String, {
			format : function(b) {
				var a = Ext.toArray(arguments, 1);
				return b.replace(/\{(\d+)\}/g, function(c, d) {
							return a[d]
						})
			}
		});
Ext.applyIf(Array.prototype, {
			indexOf : function(b, c) {
				var a = this.length;
				c = c || 0;
				c += (c < 0) ? a : 0;
				for (; c < a; ++c) {
					if (this[c] === b) {
						return c
					}
				}
				return -1
			},
			remove : function(b) {
				var a = this.indexOf(b);
				if (a != -1) {
					this.splice(a, 1)
				}
				return this
			}
		});
Ext.ns("Ext.grid", "Ext.list", "Ext.dd", "Ext.tree", "Ext.form", "Ext.menu",
		"Ext.state", "Ext.layout", "Ext.app", "Ext.ux", "Ext.chart",
		"Ext.direct");
Ext.apply(Ext, function() {
	var c = Ext, a = 0, b = null;
	return {
		emptyFn : function() {
		},
		BLANK_IMAGE_URL : Ext.isIE6 || Ext.isIE7 || Ext.isAir
				? "http://extjs.com/s.gif"
				: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
		extendX : function(d, e) {
			return Ext.extend(d, e(d.prototype))
		},
		getDoc : function() {
			return Ext.get(document)
		},
		num : function(e, d) {
			e = Number(Ext.isEmpty(e) || Ext.isBoolean(e) ? NaN : e);
			return isNaN(e) ? d : e
		},
		value : function(f, d, e) {
			return Ext.isEmpty(f, e) ? d : f
		},
		escapeRe : function(d) {
			return d.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
		},
		sequence : function(g, d, f, e) {
			g[d] = g[d].createSequence(f, e)
		},
		addBehaviors : function(h) {
			if (!Ext.isReady) {
				Ext.onReady(function() {
							Ext.addBehaviors(h)
						})
			} else {
				var e = {}, g, d, f;
				for (d in h) {
					if ((g = d.split("@"))[1]) {
						f = g[0];
						if (!e[f]) {
							e[f] = Ext.select(f)
						}
						e[f].on(g[1], h[d])
					}
				}
				e = null
			}
		},
		getScrollBarWidth : function(f) {
			if (!Ext.isReady) {
				return 0
			}
			if (f === true || b === null) {
				var h = Ext
						.getBody()
						.createChild('<div class="x-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'), g = h
						.child("div", true);
				var e = g.offsetWidth;
				h.setStyle("overflow", (Ext.isWebKit || Ext.isGecko)
								? "auto"
								: "scroll");
				var d = g.offsetWidth;
				h.remove();
				b = e - d + 2
			}
			return b
		},
		combine : function() {
			var f = arguments, e = f.length, h = [];
			for (var g = 0; g < e; g++) {
				var d = f[g];
				if (Ext.isArray(d)) {
					h = h.concat(d)
				} else {
					if (d.length !== undefined && !d.substr) {
						h = h.concat(Array.prototype.slice.call(d, 0))
					} else {
						h.push(d)
					}
				}
			}
			return h
		},
		copyTo : function(d, e, f) {
			if (Ext.isString(f)) {
				f = f.split(/[,;\s]/)
			}
			Ext.each(f, function(g) {
						if (e.hasOwnProperty(g)) {
							d[g] = e[g]
						}
					}, this);
			return d
		},
		destroy : function() {
			Ext.each(arguments, function(d) {
						if (d) {
							if (Ext.isArray(d)) {
								this.destroy.apply(this, d)
							} else {
								if (Ext.isFunction(d.destroy)) {
									d.destroy()
								} else {
									if (d.dom) {
										d.remove()
									}
								}
							}
						}
					}, this)
		},
		destroyMembers : function(k, h, f, g) {
			for (var j = 1, e = arguments, d = e.length; j < d; j++) {
				Ext.destroy(k[e[j]]);
				delete k[e[j]]
			}
		},
		clean : function(d) {
			var e = [];
			Ext.each(d, function(f) {
						if (!!f) {
							e.push(f)
						}
					});
			return e
		},
		unique : function(d) {
			var e = [], f = {};
			Ext.each(d, function(g) {
						if (!f[g]) {
							e.push(g)
						}
						f[g] = true
					});
			return e
		},
		flatten : function(d) {
			var f = [];
			function e(g) {
				Ext.each(g, function(h) {
							if (Ext.isArray(h)) {
								e(h)
							} else {
								f.push(h)
							}
						});
				return f
			}
			return e(d)
		},
		min : function(d, e) {
			var f = d[0];
			e = e || function(h, g) {
				return h < g ? -1 : 1
			};
			Ext.each(d, function(g) {
						f = e(f, g) == -1 ? f : g
					});
			return f
		},
		max : function(d, e) {
			var f = d[0];
			e = e || function(h, g) {
				return h > g ? 1 : -1
			};
			Ext.each(d, function(g) {
						f = e(f, g) == 1 ? f : g
					});
			return f
		},
		mean : function(d) {
			return Ext.sum(d) / d.length
		},
		sum : function(d) {
			var e = 0;
			Ext.each(d, function(f) {
						e += f
					});
			return e
		},
		partition : function(d, e) {
			var f = [[], []];
			Ext.each(d, function(h, j, g) {
						f[(e && e(h, j, g)) || (!e && h) ? 0 : 1].push(h)
					});
			return f
		},
		invoke : function(d, e) {
			var g = [], f = Array.prototype.slice.call(arguments, 2);
			Ext.each(d, function(h, j) {
						if (h && Ext.isFunction(h[e])) {
							g.push(h[e].apply(h, f))
						} else {
							g.push(undefined)
						}
					});
			return g
		},
		pluck : function(d, f) {
			var e = [];
			Ext.each(d, function(g) {
						e.push(g[f])
					});
			return e
		},
		zip : function() {
			var m = Ext.partition(arguments, function(i) {
						return !Ext.isFunction(i)
					}), h = m[0], l = m[1][0], d = Ext.max(Ext.pluck(h,
					"length")), g = [];
			for (var k = 0; k < d; k++) {
				g[k] = [];
				if (l) {
					g[k] = l.apply(l, Ext.pluck(h, k))
				} else {
					for (var f = 0, e = h.length; f < e; f++) {
						g[k].push(h[f][k])
					}
				}
			}
			return g
		},
		getCmp : function(d) {
			return Ext.ComponentMgr.get(d)
		},
		useShims : c.isIE6 || (c.isMac && c.isGecko2),
		type : function(e) {
			if (e === undefined || e === null) {
				return false
			}
			if (e.htmlElement) {
				return "element"
			}
			var d = typeof e;
			if (d == "object" && e.nodeName) {
				switch (e.nodeType) {
					case 1 :
						return "element";
					case 3 :
						return (/\S/).test(e.nodeValue)
								? "textnode"
								: "whitespace"
				}
			}
			if (d == "object" || d == "function") {
				switch (e.constructor) {
					case Array :
						return "array";
					case RegExp :
						return "regexp";
					case Date :
						return "date"
				}
				if (Ext.isNumber(e.length) && Ext.isFunction(e.item)) {
					return "nodelist"
				}
			}
			return d
		},
		intercept : function(g, d, f, e) {
			g[d] = g[d].createInterceptor(f, e)
		},
		callback : function(d, g, f, e) {
			if (Ext.isFunction(d)) {
				if (e) {
					d.defer(e, g, f || [])
				} else {
					d.apply(g, f || [])
				}
			}
		}
	}
}());
Ext.apply(Function.prototype, {
			createSequence : function(b, a) {
				var c = this;
				return !Ext.isFunction(b) ? this : function() {
					var d = c.apply(this || window, arguments);
					b.apply(a || this || window, arguments);
					return d
				}
			}
		});
Ext.applyIf(String, {
			escape : function(a) {
				return a.replace(/('|\\)/g, "\\$1")
			},
			leftPad : function(d, b, c) {
				var a = String(d);
				if (!c) {
					c = " "
				}
				while (a.length < b) {
					a = c + a
				}
				return a
			}
		});
String.prototype.toggle = function(b, a) {
	return this == b ? a : b
};
String.prototype.trim = function() {
	var a = /^\s+|\s+$/g;
	return function() {
		return this.replace(a, "")
	}
}();
Date.prototype.getElapsed = function(a) {
	return Math.abs((a || new Date()).getTime() - this.getTime())
};
Ext.applyIf(Number.prototype, {
			constrain : function(b, a) {
				return Math.min(Math.max(this, b), a)
			}
		});
Ext.util.TaskRunner = function(e) {
	e = e || 10;
	var f = [], a = [], b = 0, g = false, d = function() {
		g = false;
		clearInterval(b);
		b = 0
	}, h = function() {
		if (!g) {
			g = true;
			b = setInterval(i, e)
		}
	}, c = function(j) {
		a.push(j);
		if (j.onStop) {
			j.onStop.apply(j.scope || j)
		}
	}, i = function() {
		var l = a.length, n = new Date().getTime();
		if (l > 0) {
			for (var p = 0; p < l; p++) {
				f.remove(a[p])
			}
			a = [];
			if (f.length < 1) {
				d();
				return
			}
		}
		for (var p = 0, o, k, m, j = f.length; p < j; ++p) {
			o = f[p];
			k = n - o.taskRunTime;
			if (o.interval <= k) {
				m = o.run.apply(o.scope || o, o.args || [++o.taskRunCount]);
				o.taskRunTime = n;
				if (m === false || o.taskRunCount === o.repeat) {
					c(o);
					return
				}
			}
			if (o.duration && o.duration <= (n - o.taskStartTime)) {
				c(o)
			}
		}
	};
	this.start = function(j) {
		f.push(j);
		j.taskStartTime = new Date().getTime();
		j.taskRunTime = 0;
		j.taskRunCount = 0;
		h();
		return j
	};
	this.stop = function(j) {
		c(j);
		return j
	};
	this.stopAll = function() {
		d();
		for (var k = 0, j = f.length; k < j; k++) {
			if (f[k].onStop) {
				f[k].onStop()
			}
		}
		f = [];
		a = []
	}
};
Ext.TaskMgr = new Ext.util.TaskRunner();
if (typeof jQuery == "undefined") {
	throw "Unable to load Ext, jQuery not found."
}
(function() {
	var b;
	Ext.lib.Dom = {
		getViewWidth : function(d) {
			return d ? Math.max(jQuery(document).width(), jQuery(window)
							.width()) : jQuery(window).width()
		},
		getViewHeight : function(d) {
			return d ? Math.max(jQuery(document).height(), jQuery(window)
							.height()) : jQuery(window).height()
		},
		isAncestor : function(e, f) {
			var d = false;
			e = Ext.getDom(e);
			f = Ext.getDom(f);
			if (e && f) {
				if (e.contains) {
					return e.contains(f)
				} else {
					if (e.compareDocumentPosition) {
						return !!(e.compareDocumentPosition(f) & 16)
					} else {
						while (f = f.parentNode) {
							d = f == e || d
						}
					}
				}
			}
			return d
		},
		getRegion : function(d) {
			return Ext.lib.Region.getRegion(d)
		},
		getY : function(d) {
			return this.getXY(d)[1]
		},
		getX : function(d) {
			return this.getXY(d)[0]
		},
		getXY : function(f) {
			var e, j, l, m, i = (document.body || document.documentElement);
			f = Ext.getDom(f);
			if (f == i) {
				return [0, 0]
			}
			if (f.getBoundingClientRect) {
				l = f.getBoundingClientRect();
				m = c(document).getScroll();
				return [Math.round(l.left + m.left), Math.round(l.top + m.top)]
			}
			var n = 0, k = 0;
			e = f;
			var d = c(f).getStyle("position") == "absolute";
			while (e) {
				n += e.offsetLeft;
				k += e.offsetTop;
				if (!d && c(e).getStyle("position") == "absolute") {
					d = true
				}
				if (Ext.isGecko) {
					j = c(e);
					var o = parseInt(j.getStyle("borderTopWidth"), 10) || 0;
					var g = parseInt(j.getStyle("borderLeftWidth"), 10) || 0;
					n += g;
					k += o;
					if (e != f && j.getStyle("overflow") != "visible") {
						n += g;
						k += o
					}
				}
				e = e.offsetParent
			}
			if (Ext.isSafari && d) {
				n -= i.offsetLeft;
				k -= i.offsetTop
			}
			if (Ext.isGecko && !d) {
				var h = c(i);
				n += parseInt(h.getStyle("borderLeftWidth"), 10) || 0;
				k += parseInt(h.getStyle("borderTopWidth"), 10) || 0
			}
			e = f.parentNode;
			while (e && e != i) {
				if (!Ext.isOpera
						|| (e.tagName != "TR" && c(e).getStyle("display") != "inline")) {
					n -= e.scrollLeft;
					k -= e.scrollTop
				}
				e = e.parentNode
			}
			return [n, k]
		},
		setXY : function(d, e) {
			d = Ext.fly(d, "_setXY");
			d.position();
			var f = d.translatePoints(e);
			if (e[0] !== false) {
				d.dom.style.left = f.left + "px"
			}
			if (e[1] !== false) {
				d.dom.style.top = f.top + "px"
			}
		},
		setX : function(e, d) {
			this.setXY(e, [d, false])
		},
		setY : function(d, e) {
			this.setXY(d, [false, e])
		}
	};
	function c(d) {
		if (!b) {
			b = new Ext.Element.Flyweight()
		}
		b.dom = d;
		return b
	}
	Ext.lib.Event = {
		getPageX : function(d) {
			d = d.browserEvent || d;
			return d.pageX
		},
		getPageY : function(d) {
			d = d.browserEvent || d;
			return d.pageY
		},
		getXY : function(d) {
			d = d.browserEvent || d;
			return [d.pageX, d.pageY]
		},
		getTarget : function(d) {
			return d.target
		},
		on : function(h, d, g, f, e) {
			jQuery(h).bind(d, g)
		},
		un : function(f, d, e) {
			jQuery(f).unbind(d, e)
		},
		purgeElement : function(d) {
			jQuery(d).unbind()
		},
		preventDefault : function(d) {
			d = d.browserEvent || d;
			if (d.preventDefault) {
				d.preventDefault()
			} else {
				d.returnValue = false
			}
		},
		stopPropagation : function(d) {
			d = d.browserEvent || d;
			if (d.stopPropagation) {
				d.stopPropagation()
			} else {
				d.cancelBubble = true
			}
		},
		stopEvent : function(d) {
			this.preventDefault(d);
			this.stopPropagation(d)
		},
		onAvailable : function(j, e, d) {
			var i = new Date();
			var g = function() {
				if (i.getElapsed() > 10000) {
					clearInterval(h)
				}
				var f = document.getElementById(j);
				if (f) {
					clearInterval(h);
					e.call(d || window, f)
				}
			};
			var h = setInterval(g, 50)
		},
		resolveTextNode : Ext.isGecko ? function(e) {
			if (!e) {
				return
			}
			var d = HTMLElement.prototype.toString.call(e);
			if (d == "[xpconnect wrapped native prototype]"
					|| d == "[object XULElement]") {
				return
			}
			return e.nodeType == 3 ? e.parentNode : e
		} : function(d) {
			return d && d.nodeType == 3 ? d.parentNode : d
		},
		getRelatedTarget : function(e) {
			e = e.browserEvent || e;
			var d = e.relatedTarget;
			if (!d) {
				if (e.type == "mouseout") {
					d = e.toElement
				} else {
					if (e.type == "mouseover") {
						d = e.fromElement
					}
				}
			}
			return this.resolveTextNode(d)
		}
	};
	Ext.lib.Ajax = function() {
		var d = function(f) {
			return function(h, g) {
				if ((g == "error" || g == "timeout") && f.failure) {
					f.failure.call(f.scope || window, e(f, h))
				} else {
					if (f.success) {
						f.success.call(f.scope || window, e(f, h))
					}
				}
			}
		};
		var e = function(f, l) {
			var h = {}, j, g, i;
			try {
				j = l.getAllResponseHeaders();
				Ext.each(j.replace(/\r\n/g, "\n").split("\n"), function(m) {
							g = m.indexOf(":");
							if (g >= 0) {
								i = m.substr(0, g).toLowerCase();
								if (m.charAt(g + 1) == " ") {
									++g
								}
								h[i] = m.substr(g + 1)
							}
						})
			} catch (k) {
			}
			return {
				responseText : l.responseText,
				responseXML : l.responseXML,
				argument : f.argument,
				status : l.status,
				statusText : l.statusText,
				getResponseHeader : function(m) {
					return h[m.toLowerCase()]
				},
				getAllResponseHeaders : function() {
					return j
				}
			}
		};
		return {
			request : function(l, i, f, j, g) {
				var k = {
					type : l,
					url : i,
					data : j,
					timeout : f.timeout,
					complete : d(f)
				};
				if (g) {
					var h = g.headers;
					if (g.xmlData) {
						k.data = g.xmlData;
						k.processData = false;
						k.type = (l ? l : (g.method ? g.method : "POST"));
						if (!h || !h["Content-Type"]) {
							k.contentType = "text/xml"
						}
					} else {
						if (g.jsonData) {
							k.data = typeof g.jsonData == "object" ? Ext
									.encode(g.jsonData) : g.jsonData;
							k.processData = false;
							k.type = (l ? l : (g.method ? g.method : "POST"));
							if (!h || !h["Content-Type"]) {
								k.contentType = "application/json"
							}
						}
					}
					if (h) {
						k.beforeSend = function(n) {
							for (var m in h) {
								if (h.hasOwnProperty(m)) {
									n.setRequestHeader(m, h[m])
								}
							}
						}
					}
				}
				jQuery.ajax(k)
			},
			formRequest : function(j, i, g, k, f, h) {
				jQuery.ajax({
							type : Ext.getDom(j).method || "POST",
							url : i,
							data : jQuery(j).serialize() + (k ? "&" + k : ""),
							timeout : g.timeout,
							complete : d(g)
						})
			},
			isCallInProgress : function(f) {
				return false
			},
			abort : function(f) {
				return false
			},
			serializeForm : function(f) {
				return jQuery(f.dom || f).serialize()
			}
		}
	}();
	Ext.lib.Anim = function() {
		var d = function(e, f) {
			var g = true;
			return {
				stop : function(h) {
				},
				isAnimated : function() {
					return g
				},
				proxyCallback : function() {
					g = false;
					Ext.callback(e, f)
				}
			}
		};
		return {
			scroll : function(h, f, j, k, e, g) {
				var i = d(e, g);
				h = Ext.getDom(h);
				if (typeof f.scroll.to[0] == "number") {
					h.scrollLeft = f.scroll.to[0]
				}
				if (typeof f.scroll.to[1] == "number") {
					h.scrollTop = f.scroll.to[1]
				}
				i.proxyCallback();
				return i
			},
			motion : function(h, f, i, j, e, g) {
				return this.run(h, f, i, j, e, g)
			},
			color : function(h, f, j, k, e, g) {
				var i = d(e, g);
				i.proxyCallback();
				return i
			},
			run : function(g, q, j, p, h, s, r) {
				var l = d(h, s), m = Ext.fly(g, "_animrun");
				var f = {};
				for (var i in q) {
					switch (i) {
						case "points" :
							var n, u;
							m.position();
							if (n = q.points.by) {
								var t = m.getXY();
								u = m
										.translatePoints([t[0] + n[0],
												t[1] + n[1]])
							} else {
								u = m.translatePoints(q.points.to)
							}
							f.left = u.left;
							f.top = u.top;
							if (!parseInt(m.getStyle("left"), 10)) {
								m.setLeft(0)
							}
							if (!parseInt(m.getStyle("top"), 10)) {
								m.setTop(0)
							}
							if (q.points.from) {
								m.setXY(q.points.from)
							}
							break;
						case "width" :
							f.width = q.width.to;
							if (q.width.from) {
								m.setWidth(q.width.from)
							}
							break;
						case "height" :
							f.height = q.height.to;
							if (q.height.from) {
								m.setHeight(q.height.from)
							}
							break;
						case "opacity" :
							f.opacity = q.opacity.to;
							if (q.opacity.from) {
								m.setOpacity(q.opacity.from)
							}
							break;
						case "left" :
							f.left = q.left.to;
							if (q.left.from) {
								m.setLeft(q.left.from)
							}
							break;
						case "top" :
							f.top = q.top.to;
							if (q.top.from) {
								m.setTop(q.top.from)
							}
							break;
						case "callback" :
						case "scope" :
							break;
						default :
							f[i] = q[i].to;
							if (q[i].from) {
								m.setStyle(i, q[i].from)
							}
							break
					}
				}
				jQuery(g).animate(f, j * 1000, undefined, l.proxyCallback);
				return l
			}
		}
	}();
	Ext.lib.Region = function(f, g, d, e) {
		this.top = f;
		this[1] = f;
		this.right = g;
		this.bottom = d;
		this.left = e;
		this[0] = e
	};
	Ext.lib.Region.prototype = {
		contains : function(d) {
			return (d.left >= this.left && d.right <= this.right
					&& d.top >= this.top && d.bottom <= this.bottom)
		},
		getArea : function() {
			return ((this.bottom - this.top) * (this.right - this.left))
		},
		intersect : function(h) {
			var f = Math.max(this.top, h.top);
			var g = Math.min(this.right, h.right);
			var d = Math.min(this.bottom, h.bottom);
			var e = Math.max(this.left, h.left);
			if (d >= f && g >= e) {
				return new Ext.lib.Region(f, g, d, e)
			} else {
				return null
			}
		},
		union : function(h) {
			var f = Math.min(this.top, h.top);
			var g = Math.max(this.right, h.right);
			var d = Math.max(this.bottom, h.bottom);
			var e = Math.min(this.left, h.left);
			return new Ext.lib.Region(f, g, d, e)
		},
		constrainTo : function(d) {
			this.top = this.top.constrain(d.top, d.bottom);
			this.bottom = this.bottom.constrain(d.top, d.bottom);
			this.left = this.left.constrain(d.left, d.right);
			this.right = this.right.constrain(d.left, d.right);
			return this
		},
		adjust : function(f, e, d, g) {
			this.top += f;
			this.left += e;
			this.right += g;
			this.bottom += d;
			return this
		}
	};
	Ext.lib.Region.getRegion = function(g) {
		var i = Ext.lib.Dom.getXY(g);
		var f = i[1];
		var h = i[0] + g.offsetWidth;
		var d = i[1] + g.offsetHeight;
		var e = i[0];
		return new Ext.lib.Region(f, h, d, e)
	};
	Ext.lib.Point = function(d, e) {
		if (Ext.isArray(d)) {
			e = d[1];
			d = d[0]
		}
		this.x = this.right = this.left = this[0] = d;
		this.y = this.top = this.bottom = this[1] = e
	};
	Ext.lib.Point.prototype = new Ext.lib.Region();
	if (Ext.isIE) {
		function a() {
			var d = Function.prototype;
			delete d.createSequence;
			delete d.defer;
			delete d.createDelegate;
			delete d.createCallback;
			delete d.createInterceptor;
			window.detachEvent("onunload", a)
		}
		window.attachEvent("onunload", a)
	}
})();