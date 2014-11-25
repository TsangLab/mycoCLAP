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
(function() {
	var e, a = Prototype.Version.split("."), h = (parseInt(a[0]) >= 2)
			|| (parseInt(a[1]) >= 7) || (parseInt(a[2]) >= 1), g = {}, d = function(
			i, j) {
		if (i && i.firstChild) {
			while (j) {
				if (j === i) {
					return true
				}
				j = j.parentNode;
				if (j && (j.nodeType != 1)) {
					j = null
				}
			}
		}
		return false
	}, b = function(i) {
		return !d(i.currentTarget, pub.getRelatedTarget(i))
	};
	Ext.lib.Dom = {
		getViewWidth : function(i) {
			return i ? this.getDocumentWidth() : this.getViewportWidth()
		},
		getViewHeight : function(i) {
			return i ? this.getDocumentHeight() : this.getViewportHeight()
		},
		getDocumentHeight : function() {
			var i = (document.compatMode != "CSS1Compat")
					? document.body.scrollHeight
					: document.documentElement.scrollHeight;
			return Math.max(i, this.getViewportHeight())
		},
		getDocumentWidth : function() {
			var i = (document.compatMode != "CSS1Compat")
					? document.body.scrollWidth
					: document.documentElement.scrollWidth;
			return Math.max(i, this.getViewportWidth())
		},
		getViewportHeight : function() {
			var i = self.innerHeight;
			var j = document.compatMode;
			if ((j || Ext.isIE) && !Ext.isOpera) {
				i = (j == "CSS1Compat")
						? document.documentElement.clientHeight
						: document.body.clientHeight
			}
			return i
		},
		getViewportWidth : function() {
			var i = self.innerWidth;
			var j = document.compatMode;
			if (j || Ext.isIE) {
				i = (j == "CSS1Compat")
						? document.documentElement.clientWidth
						: document.body.clientWidth
			}
			return i
		},
		isAncestor : function(j, k) {
			var i = false;
			j = Ext.getDom(j);
			k = Ext.getDom(k);
			if (j && k) {
				if (j.contains) {
					return j.contains(k)
				} else {
					if (j.compareDocumentPosition) {
						return !!(j.compareDocumentPosition(k) & 16)
					} else {
						while (k = k.parentNode) {
							i = k == j || i
						}
					}
				}
			}
			return i
		},
		getRegion : function(i) {
			return Ext.lib.Region.getRegion(i)
		},
		getY : function(i) {
			return this.getXY(i)[1]
		},
		getX : function(i) {
			return this.getXY(i)[0]
		},
		getXY : function(k) {
			var j, o, r, s, n = (document.body || document.documentElement);
			k = Ext.getDom(k);
			if (k == n) {
				return [0, 0]
			}
			if (k.getBoundingClientRect) {
				r = k.getBoundingClientRect();
				s = f(document).getScroll();
				return [Math.round(r.left + s.left), Math.round(r.top + s.top)]
			}
			var t = 0, q = 0;
			j = k;
			var i = f(k).getStyle("position") == "absolute";
			while (j) {
				t += j.offsetLeft;
				q += j.offsetTop;
				if (!i && f(j).getStyle("position") == "absolute") {
					i = true
				}
				if (Ext.isGecko) {
					o = f(j);
					var u = parseInt(o.getStyle("borderTopWidth"), 10) || 0;
					var l = parseInt(o.getStyle("borderLeftWidth"), 10) || 0;
					t += l;
					q += u;
					if (j != k && o.getStyle("overflow") != "visible") {
						t += l;
						q += u
					}
				}
				j = j.offsetParent
			}
			if (Ext.isSafari && i) {
				t -= n.offsetLeft;
				q -= n.offsetTop
			}
			if (Ext.isGecko && !i) {
				var m = f(n);
				t += parseInt(m.getStyle("borderLeftWidth"), 10) || 0;
				q += parseInt(m.getStyle("borderTopWidth"), 10) || 0
			}
			j = k.parentNode;
			while (j && j != n) {
				if (!Ext.isOpera
						|| (j.tagName != "TR" && f(j).getStyle("display") != "inline")) {
					t -= j.scrollLeft;
					q -= j.scrollTop
				}
				j = j.parentNode
			}
			return [t, q]
		},
		setXY : function(i, j) {
			i = Ext.fly(i, "_setXY");
			i.position();
			var k = i.translatePoints(j);
			if (j[0] !== false) {
				i.dom.style.left = k.left + "px"
			}
			if (j[1] !== false) {
				i.dom.style.top = k.top + "px"
			}
		},
		setX : function(j, i) {
			this.setXY(j, [i, false])
		},
		setY : function(i, j) {
			this.setXY(i, [false, j])
		}
	};
	Ext.lib.Event = {
		getPageX : function(i) {
			return Event.pointerX(i.browserEvent || i)
		},
		getPageY : function(i) {
			return Event.pointerY(i.browserEvent || i)
		},
		getXY : function(i) {
			i = i.browserEvent || i;
			return [Event.pointerX(i), Event.pointerY(i)]
		},
		getTarget : function(i) {
			return Event.element(i.browserEvent || i)
		},
		resolveTextNode : Ext.isGecko ? function(j) {
			if (!j) {
				return
			}
			var i = HTMLElement.prototype.toString.call(j);
			if (i == "[xpconnect wrapped native prototype]"
					|| i == "[object XULElement]") {
				return
			}
			return j.nodeType == 3 ? j.parentNode : j
		} : function(i) {
			return i && i.nodeType == 3 ? i.parentNode : i
		},
		getRelatedTarget : function(j) {
			j = j.browserEvent || j;
			var i = j.relatedTarget;
			if (!i) {
				if (j.type == "mouseout") {
					i = j.toElement
				} else {
					if (j.type == "mouseover") {
						i = j.fromElement
					}
				}
			}
			return this.resolveTextNode(i)
		},
		on : function(k, i, j) {
			if ((i == "mouseenter" || i == "mouseleave") && !h) {
				var l = g[k.id] || (g[k.id] = {});
				l[i] = j;
				j = j.createInterceptor(b);
				i = (i == "mouseenter") ? "mouseover" : "mouseout"
			}
			Event.observe(k, i, j, false)
		},
		un : function(k, i, j) {
			if ((i == "mouseenter" || i == "mouseleave") && !h) {
				var m = g[k.id], l = m && m[i];
				if (l) {
					j = l.fn;
					delete m[i];
					i = (i == "mouseenter") ? "mouseover" : "mouseout"
				}
			}
			Event.stopObserving(k, i, j, false)
		},
		purgeElement : function(i) {
		},
		preventDefault : function(i) {
			i = i.browserEvent || i;
			if (i.preventDefault) {
				i.preventDefault()
			} else {
				i.returnValue = false
			}
		},
		stopPropagation : function(i) {
			i = i.browserEvent || i;
			if (i.stopPropagation) {
				i.stopPropagation()
			} else {
				i.cancelBubble = true
			}
		},
		stopEvent : function(i) {
			Event.stop(i.browserEvent || i)
		},
		onAvailable : function(n, j, i) {
			var m = new Date(), l;
			var k = function() {
				if (m.getElapsed() > 10000) {
					clearInterval(l)
				}
				var o = document.getElementById(n);
				if (o) {
					clearInterval(l);
					j.call(i || window, o)
				}
			};
			l = setInterval(k, 50)
		}
	};
	Ext.lib.Ajax = function() {
		var k = function(l) {
			return l.success ? function(m) {
				l.success.call(l.scope || window, i(l, m))
			} : Ext.emptyFn
		};
		var j = function(l) {
			return l.failure ? function(m) {
				l.failure.call(l.scope || window, i(l, m))
			} : Ext.emptyFn
		};
		var i = function(l, r) {
			var n = {}, p, m, o;
			try {
				p = r.getAllResponseHeaders();
				Ext.each(p.replace(/\r\n/g, "\n").split("\n"), function(s) {
							m = s.indexOf(":");
							if (m >= 0) {
								o = s.substr(0, m).toLowerCase();
								if (s.charAt(m + 1) == " ") {
									++m
								}
								n[o] = s.substr(m + 1)
							}
						})
			} catch (q) {
			}
			return {
				responseText : r.responseText,
				responseXML : r.responseXML,
				argument : l.argument,
				status : r.status,
				statusText : r.statusText,
				getResponseHeader : function(s) {
					return n[s.toLowerCase()]
				},
				getAllResponseHeaders : function() {
					return p
				}
			}
		};
		return {
			request : function(s, p, l, q, m) {
				var r = {
					method : s,
					parameters : q || "",
					timeout : l.timeout,
					onSuccess : k(l),
					onFailure : j(l)
				};
				if (m) {
					var n = m.headers;
					if (n) {
						r.requestHeaders = n
					}
					if (m.xmlData) {
						s = (s ? s : (m.method ? m.method : "POST"));
						if (!n || !n["Content-Type"]) {
							r.contentType = "text/xml"
						}
						r.postBody = m.xmlData;
						delete r.parameters
					}
					if (m.jsonData) {
						s = (s ? s : (m.method ? m.method : "POST"));
						if (!n || !n["Content-Type"]) {
							r.contentType = "application/json"
						}
						r.postBody = typeof m.jsonData == "object" ? Ext
								.encode(m.jsonData) : m.jsonData;
						delete r.parameters
					}
				}
				new Ajax.Request(p, r)
			},
			formRequest : function(p, o, m, q, l, n) {
				new Ajax.Request(o, {
							method : Ext.getDom(p).method || "POST",
							parameters : Form.serialize(p) + (q ? "&" + q : ""),
							timeout : m.timeout,
							onSuccess : k(m),
							onFailure : j(m)
						})
			},
			isCallInProgress : function(l) {
				return false
			},
			abort : function(l) {
				return false
			},
			serializeForm : function(l) {
				return Form.serialize(l.dom || l)
			}
		}
	}();
	Ext.lib.Anim = function() {
		var i = {
			easeOut : function(k) {
				return 1 - Math.pow(1 - k, 2)
			},
			easeIn : function(k) {
				return 1 - Math.pow(1 - k, 2)
			}
		};
		var j = function(k, l) {
			return {
				stop : function(m) {
					this.effect.cancel()
				},
				isAnimated : function() {
					return this.effect.state == "running"
				},
				proxyCallback : function() {
					Ext.callback(k, l)
				}
			}
		};
		return {
			scroll : function(n, l, p, q, k, m) {
				var o = j(k, m);
				n = Ext.getDom(n);
				if (typeof l.scroll.to[0] == "number") {
					n.scrollLeft = l.scroll.to[0]
				}
				if (typeof l.scroll.to[1] == "number") {
					n.scrollTop = l.scroll.to[1]
				}
				o.proxyCallback();
				return o
			},
			motion : function(n, l, o, p, k, m) {
				return this.run(n, l, o, p, k, m)
			},
			color : function(n, l, o, p, k, m) {
				return this.run(n, l, o, p, k, m)
			},
			run : function(m, v, r, u, n, x, w) {
				var l = {};
				for (var q in v) {
					switch (q) {
						case "points" :
							var t, z, s = Ext.fly(m, "_animrun");
							s.position();
							if (t = v.points.by) {
								var y = s.getXY();
								z = s
										.translatePoints([y[0] + t[0],
												y[1] + t[1]])
							} else {
								z = s.translatePoints(v.points.to)
							}
							l.left = z.left + "px";
							l.top = z.top + "px";
							break;
						case "width" :
							l.width = v.width.to + "px";
							break;
						case "height" :
							l.height = v.height.to + "px";
							break;
						case "opacity" :
							l.opacity = String(v.opacity.to);
							break;
						default :
							l[q] = String(v[q].to);
							break
					}
				}
				var p = j(n, x);
				p.effect = new Effect.Morph(Ext.id(m), {
							duration : r,
							afterFinish : p.proxyCallback,
							transition : i[u] || Effect.Transitions.linear,
							style : l
						});
				return p
			}
		}
	}();
	function f(i) {
		if (!e) {
			e = new Ext.Element.Flyweight()
		}
		e.dom = i;
		return e
	}
	Ext.lib.Region = function(k, m, i, j) {
		this.top = k;
		this[1] = k;
		this.right = m;
		this.bottom = i;
		this.left = j;
		this[0] = j
	};
	Ext.lib.Region.prototype = {
		contains : function(i) {
			return (i.left >= this.left && i.right <= this.right
					&& i.top >= this.top && i.bottom <= this.bottom)
		},
		getArea : function() {
			return ((this.bottom - this.top) * (this.right - this.left))
		},
		intersect : function(n) {
			var k = Math.max(this.top, n.top);
			var m = Math.min(this.right, n.right);
			var i = Math.min(this.bottom, n.bottom);
			var j = Math.max(this.left, n.left);
			if (i >= k && m >= j) {
				return new Ext.lib.Region(k, m, i, j)
			} else {
				return null
			}
		},
		union : function(n) {
			var k = Math.min(this.top, n.top);
			var m = Math.max(this.right, n.right);
			var i = Math.max(this.bottom, n.bottom);
			var j = Math.min(this.left, n.left);
			return new Ext.lib.Region(k, m, i, j)
		},
		constrainTo : function(i) {
			this.top = this.top.constrain(i.top, i.bottom);
			this.bottom = this.bottom.constrain(i.top, i.bottom);
			this.left = this.left.constrain(i.left, i.right);
			this.right = this.right.constrain(i.left, i.right);
			return this
		},
		adjust : function(k, j, i, m) {
			this.top += k;
			this.left += j;
			this.right += m;
			this.bottom += i;
			return this
		}
	};
	Ext.lib.Region.getRegion = function(m) {
		var o = Ext.lib.Dom.getXY(m);
		var k = o[1];
		var n = o[0] + m.offsetWidth;
		var i = o[1] + m.offsetHeight;
		var j = o[0];
		return new Ext.lib.Region(k, n, i, j)
	};
	Ext.lib.Point = function(i, j) {
		if (Ext.isArray(i)) {
			j = i[1];
			i = i[0]
		}
		this.x = this.right = this.left = this[0] = i;
		this.y = this.top = this.bottom = this[1] = j
	};
	Ext.lib.Point.prototype = new Ext.lib.Region();
	if (Ext.isIE) {
		function c() {
			var i = Function.prototype;
			delete i.createSequence;
			delete i.defer;
			delete i.createDelegate;
			delete i.createCallback;
			delete i.createInterceptor;
			window.detachEvent("onunload", c)
		}
		window.attachEvent("onunload", c)
	}
})();