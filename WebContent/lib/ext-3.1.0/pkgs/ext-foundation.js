/*
 * Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.DomHelper = function() {
	var t = null, k = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i, m = /^table|tbody|tr|td$/i, q, n = "afterbegin", o = "afterend", c = "beforebegin", p = "beforeend", a = "<table>", h = "</table>", b = a
			+ "<tbody>", j = "</tbody>" + h, l = b + "<tr>", s = "</tr>" + j;
	function g(x, z, y, A, w, u) {
		var v = q.insertHtml(A, Ext.getDom(x), r(z));
		return y ? Ext.get(v, true) : v
	}
	function r(A) {
		var w = "", v, z, y, u, B;
		if (Ext.isString(A)) {
			w = A
		} else {
			if (Ext.isArray(A)) {
				for (var x = 0; x < A.length; x++) {
					if (A[x]) {
						w += r(A[x])
					}
				}
			} else {
				w += "<" + (A.tag = A.tag || "div");
				Ext.iterate(A, function(C, D) {
							if (!/tag|children|cn|html$/i.test(C)) {
								if (Ext.isObject(D)) {
									w += " " + C + '="';
									Ext.iterate(D, function(F, E) {
												w += F + ":" + E + ";"
											});
									w += '"'
								} else {
									w += " " + ({
										cls : "class",
										htmlFor : "for"
									}[C] || C) + '="' + D + '"'
								}
							}
						});
				if (k.test(A.tag)) {
					w += "/>"
				} else {
					w += ">";
					if ((B = A.children || A.cn)) {
						w += r(B)
					} else {
						if (A.html) {
							w += A.html
						}
					}
					w += "</" + A.tag + ">"
				}
			}
		}
		return w
	}
	function e(B, y, x, z) {
		t.innerHTML = [y, x, z].join("");
		var u = -1, w = t, v;
		while (++u < B) {
			w = w.firstChild
		}
		if (v = w.nextSibling) {
			var A = document.createDocumentFragment();
			while (w) {
				v = w.nextSibling;
				A.appendChild(w);
				w = v
			}
			w = A
		}
		return w
	}
	function d(u, v, x, w) {
		var y, z;
		t = t || document.createElement("div");
		if (u == "td" && (v == n || v == p) || !/td|tr|tbody/i.test(u)
				&& (v == c || v == o)) {
			return
		}
		z = v == c ? x : v == o ? x.nextSibling : v == n ? x.firstChild : null;
		if (v == c || v == o) {
			x = x.parentNode
		}
		if (u == "td" || (u == "tr" && (v == p || v == n))) {
			y = e(4, l, w, s)
		} else {
			if ((u == "tbody" && (v == p || v == n))
					|| (u == "tr" && (v == c || v == o))) {
				y = e(3, b, w, j)
			} else {
				y = e(2, a, w, h)
			}
		}
		x.insertBefore(y, z);
		return y
	}
	q = {
		markup : function(u) {
			return r(u)
		},
		applyStyles : function(x, y) {
			if (y) {
				var v = 0, u, w;
				x = Ext.fly(x);
				if (Ext.isFunction(y)) {
					y = y.call()
				}
				if (Ext.isString(y)) {
					y = y.trim().split(/\s*(?::|;)\s*/);
					for (u = y.length; v < u;) {
						x.setStyle(y[v++], y[v++])
					}
				} else {
					if (Ext.isObject(y)) {
						x.setStyle(y)
					}
				}
			}
		},
		insertHtml : function(z, u, A) {
			var y = {}, w, C, B, D, x, v;
			z = z.toLowerCase();
			y[c] = ["BeforeBegin", "previousSibling"];
			y[o] = ["AfterEnd", "nextSibling"];
			if (u.insertAdjacentHTML) {
				if (m.test(u.tagName)
						&& (v = d(u.tagName.toLowerCase(), z, u, A))) {
					return v
				}
				y[n] = ["AfterBegin", "firstChild"];
				y[p] = ["BeforeEnd", "lastChild"];
				if ((w = y[z])) {
					u.insertAdjacentHTML(w[0], A);
					return u[w[1]]
				}
			} else {
				B = u.ownerDocument.createRange();
				C = "setStart" + (/end/i.test(z) ? "After" : "Before");
				if (y[z]) {
					B[C](u);
					D = B.createContextualFragment(A);
					u.parentNode.insertBefore(D, z == c ? u : u.nextSibling);
					return u[(z == c ? "previous" : "next") + "Sibling"]
				} else {
					x = (z == n ? "first" : "last") + "Child";
					if (u.firstChild) {
						B[C](u[x]);
						D = B.createContextualFragment(A);
						if (z == n) {
							u.insertBefore(D, u.firstChild)
						} else {
							u.appendChild(D)
						}
					} else {
						u.innerHTML = A
					}
					return u[x]
				}
			}
			throw 'Illegal insertion point -> "' + z + '"'
		},
		insertBefore : function(u, w, v) {
			return g(u, w, v, c)
		},
		insertAfter : function(u, w, v) {
			return g(u, w, v, o, "nextSibling")
		},
		insertFirst : function(u, w, v) {
			return g(u, w, v, n, "firstChild")
		},
		append : function(u, w, v) {
			return g(u, w, v, p, "", true)
		},
		overwrite : function(u, w, v) {
			u = Ext.getDom(u);
			u.innerHTML = r(w);
			return v ? Ext.get(u.firstChild) : u.firstChild
		},
		createHtml : r
	};
	return q
}();
Ext.apply(Ext.DomHelper, function() {
	var d, a = "afterbegin", g = "afterend", h = "beforebegin", c = "beforeend";
	function e(m, p, n, q, l, j) {
		m = Ext.getDom(m);
		var k;
		if (d.useDom) {
			k = b(p, null);
			if (j) {
				m.appendChild(k)
			} else {
				(l == "firstChild" ? m : m.parentNode).insertBefore(k, m[l]
								|| m)
			}
		} else {
			k = Ext.DomHelper.insertHtml(q, m, Ext.DomHelper.createHtml(p))
		}
		return n ? Ext.get(k, true) : k
	}
	function b(q, k) {
		var m, n = document, l, j, p, r;
		if (Ext.isArray(q)) {
			m = n.createDocumentFragment();
			Ext.each(q, function(o) {
						b(o, m)
					})
		} else {
			if (Ext.isString(q)) {
				m = n.createTextNode(q)
			} else {
				m = n.createElement(q.tag || "div");
				l = !!m.setAttribute;
				Ext.iterate(q, function(o, s) {
							if (!/tag|children|cn|html|style/.test(o)) {
								if (o == "cls") {
									m.className = s
								} else {
									if (l) {
										m.setAttribute(o, s)
									} else {
										m[o] = s
									}
								}
							}
						});
				Ext.DomHelper.applyStyles(m, q.style);
				if ((r = q.children || q.cn)) {
					b(r, m)
				} else {
					if (q.html) {
						m.innerHTML = q.html
					}
				}
			}
		}
		if (k) {
			k.appendChild(m)
		}
		return m
	}
	d = {
		createTemplate : function(k) {
			var j = Ext.DomHelper.createHtml(k);
			return new Ext.Template(j)
		},
		useDom : false,
		insertBefore : function(j, l, k) {
			return e(j, l, k, h)
		},
		insertAfter : function(j, l, k) {
			return e(j, l, k, g, "nextSibling")
		},
		insertFirst : function(j, l, k) {
			return e(j, l, k, a, "firstChild")
		},
		append : function(j, l, k) {
			return e(j, l, k, c, "", true)
		},
		createDom : b
	};
	return d
}());
Ext.Template = function(d) {
	var e = this, b = arguments, c = [];
	if (Ext.isArray(d)) {
		d = d.join("")
	} else {
		if (b.length > 1) {
			Ext.each(b, function(a) {
						if (Ext.isObject(a)) {
							Ext.apply(e, a)
						} else {
							c.push(a)
						}
					});
			d = c.join("")
		}
	}
	e.html = d;
	if (e.compiled) {
		e.compile()
	}
};
Ext.Template.prototype = {
	re : /\{([\w-]+)\}/g,
	applyTemplate : function(a) {
		var b = this;
		return b.compiled ? b.compiled(a) : b.html.replace(b.re,
				function(c, d) {
					return a[d] !== undefined ? a[d] : ""
				})
	},
	set : function(a, c) {
		var b = this;
		b.html = a;
		b.compiled = null;
		return c ? b.compile() : b
	},
	compile : function() {
		var me = this, sep = Ext.isGecko ? "+" : ",";
		function fn(m, name) {
			name = "values['" + name + "']";
			return "'" + sep + "(" + name + " == undefined ? '' : " + name
					+ ")" + sep + "'"
		}
		eval("this.compiled = function(values){ return "
				+ (Ext.isGecko ? "'" : "['")
				+ me.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g, "\\n")
						.replace(/'/g, "\\'").replace(this.re, fn)
				+ (Ext.isGecko ? "';};" : "'].join('');};"));
		return me
	},
	insertFirst : function(b, a, c) {
		return this.doInsert("afterBegin", b, a, c)
	},
	insertBefore : function(b, a, c) {
		return this.doInsert("beforeBegin", b, a, c)
	},
	insertAfter : function(b, a, c) {
		return this.doInsert("afterEnd", b, a, c)
	},
	append : function(b, a, c) {
		return this.doInsert("beforeEnd", b, a, c)
	},
	doInsert : function(c, e, b, a) {
		e = Ext.getDom(e);
		var d = Ext.DomHelper.insertHtml(c, e, this.applyTemplate(b));
		return a ? Ext.get(d, true) : d
	},
	overwrite : function(b, a, c) {
		b = Ext.getDom(b);
		b.innerHTML = this.applyTemplate(a);
		return c ? Ext.get(b.firstChild, true) : b.firstChild
	}
};
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.Template.from = function(b, a) {
	b = Ext.getDom(b);
	return new Ext.Template(b.value || b.innerHTML, a || "")
};
Ext.apply(Ext.Template.prototype, {
	disableFormats : false,
	re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
	applyTemplate : function(b) {
		var g = this, a = g.disableFormats !== true, e = Ext.util.Format, c = g;
		if (g.compiled) {
			return g.compiled(b)
		}
		function d(j, l, p, k) {
			if (p && a) {
				if (p.substr(0, 5) == "this.") {
					return c.call(p.substr(5), b[l], b)
				} else {
					if (k) {
						var o = /^\s*['"](.*)["']\s*$/;
						k = k.split(",");
						for (var n = 0, h = k.length; n < h; n++) {
							k[n] = k[n].replace(o, "$1")
						}
						k = [b[l]].concat(k)
					} else {
						k = [b[l]]
					}
					return e[p].apply(e, k)
				}
			} else {
				return b[l] !== undefined ? b[l] : ""
			}
		}
		return g.html.replace(g.re, d)
	},
	compile : function() {
		var me = this, fm = Ext.util.Format, useF = me.disableFormats !== true, sep = Ext.isGecko
				? "+"
				: ",", body;
		function fn(m, name, format, args) {
			if (format && useF) {
				args = args ? "," + args : "";
				if (format.substr(0, 5) != "this.") {
					format = "fm." + format + "("
				} else {
					format = 'this.call("' + format.substr(5) + '", ';
					args = ", values"
				}
			} else {
				args = "";
				format = "(values['" + name + "'] == undefined ? '' : "
			}
			return "'" + sep + format + "values['" + name + "']" + args + ")"
					+ sep + "'"
		}
		if (Ext.isGecko) {
			body = "this.compiled = function(values){ return '"
					+ me.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g,
							"\\n").replace(/'/g, "\\'").replace(this.re, fn)
					+ "';};"
		} else {
			body = ["this.compiled = function(values){ return ['"];
			body.push(me.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g,
					"\\n").replace(/'/g, "\\'").replace(this.re, fn));
			body.push("'].join('');};");
			body = body.join("")
		}
		eval(body);
		return me
	},
	call : function(c, b, a) {
		return this[c](b, a)
	}
});
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.DomQuery = function() {
	var cache = {}, simpleCache = {}, valueCache = {}, nonSpace = /\S/, trimRe = /^\s+|\s+$/g, tplRe = /\{(\d+)\}/g, modeRe = /^(\s?[\/>+~]\s?|\s|$)/, tagTokenRe = /^(#)?([\w-\*]+)/, nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/, isIE = window.ActiveXObject
			? true
			: false, key = 30803;
	eval("var batch = 30803;");
	function child(p, index) {
		var i = 0, n = p.firstChild;
		while (n) {
			if (n.nodeType == 1) {
				if (++i == index) {
					return n
				}
			}
			n = n.nextSibling
		}
		return null
	}
	function next(n) {
		while ((n = n.nextSibling) && n.nodeType != 1) {
		}
		return n
	}
	function prev(n) {
		while ((n = n.previousSibling) && n.nodeType != 1) {
		}
		return n
	}
	function children(d) {
		var n = d.firstChild, ni = -1, nx;
		while (n) {
			nx = n.nextSibling;
			if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
				d.removeChild(n)
			} else {
				n.nodeIndex = ++ni
			}
			n = nx
		}
		return this
	}
	function byClassName(c, a, v) {
		if (!v) {
			return c
		}
		var r = [], ri = -1, cn;
		for (var i = 0, ci; ci = c[i]; i++) {
			if ((" " + ci.className + " ").indexOf(v) != -1) {
				r[++ri] = ci
			}
		}
		return r
	}
	function attrValue(n, attr) {
		if (!n.tagName && typeof n.length != "undefined") {
			n = n[0]
		}
		if (!n) {
			return null
		}
		if (attr == "for") {
			return n.htmlFor
		}
		if (attr == "class" || attr == "className") {
			return n.className
		}
		return n.getAttribute(attr) || n[attr]
	}
	function getNodes(ns, mode, tagName) {
		var result = [], ri = -1, cs;
		if (!ns) {
			return result
		}
		tagName = tagName || "*";
		if (typeof ns.getElementsByTagName != "undefined") {
			ns = [ns]
		}
		if (!mode) {
			for (var i = 0, ni; ni = ns[i]; i++) {
				cs = ni.getElementsByTagName(tagName);
				for (var j = 0, ci; ci = cs[j]; j++) {
					result[++ri] = ci
				}
			}
		} else {
			if (mode == "/" || mode == ">") {
				var utag = tagName.toUpperCase();
				for (var i = 0, ni, cn; ni = ns[i]; i++) {
					cn = ni.childNodes;
					for (var j = 0, cj; cj = cn[j]; j++) {
						if (cj.nodeName == utag || cj.nodeName == tagName
								|| tagName == "*") {
							result[++ri] = cj
						}
					}
				}
			} else {
				if (mode == "+") {
					var utag = tagName.toUpperCase();
					for (var i = 0, n; n = ns[i]; i++) {
						while ((n = n.nextSibling) && n.nodeType != 1) {
						}
						if (n
								&& (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
							result[++ri] = n
						}
					}
				} else {
					if (mode == "~") {
						var utag = tagName.toUpperCase();
						for (var i = 0, n; n = ns[i]; i++) {
							while ((n = n.nextSibling)) {
								if (n.nodeName == utag || n.nodeName == tagName
										|| tagName == "*") {
									result[++ri] = n
								}
							}
						}
					}
				}
			}
		}
		return result
	}
	function concat(a, b) {
		if (b.slice) {
			return a.concat(b)
		}
		for (var i = 0, l = b.length; i < l; i++) {
			a[a.length] = b[i]
		}
		return a
	}
	function byTag(cs, tagName) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!tagName) {
			return cs
		}
		var r = [], ri = -1;
		tagName = tagName.toLowerCase();
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byId(cs, attr, id) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!id) {
			return cs
		}
		var r = [], ri = -1;
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci && ci.id == id) {
				r[++ri] = ci;
				return r
			}
		}
		return r
	}
	function byAttribute(cs, attr, value, op, custom) {
		var r = [], ri = -1, st = custom == "{", f = Ext.DomQuery.operators[op];
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType != 1) {
				continue
			}
			var a;
			if (st) {
				a = Ext.DomQuery.getStyle(ci, attr)
			} else {
				if (attr == "class" || attr == "className") {
					a = ci.className
				} else {
					if (attr == "for") {
						a = ci.htmlFor
					} else {
						if (attr == "href") {
							a = ci.getAttribute("href", 2)
						} else {
							a = ci.getAttribute(attr)
						}
					}
				}
			}
			if ((f && f(a, value)) || (!f && a)) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byPseudo(cs, name, value) {
		return Ext.DomQuery.pseudos[name](cs, value)
	}
	function nodupIEXml(cs) {
		var d = ++key, r;
		cs[0].setAttribute("_nodup", d);
		r = [cs[0]];
		for (var i = 1, len = cs.length; i < len; i++) {
			var c = cs[i];
			if (!c.getAttribute("_nodup") != d) {
				c.setAttribute("_nodup", d);
				r[r.length] = c
			}
		}
		for (var i = 0, len = cs.length; i < len; i++) {
			cs[i].removeAttribute("_nodup")
		}
		return r
	}
	function nodup(cs) {
		if (!cs) {
			return []
		}
		var len = cs.length, c, i, r = cs, cj, ri = -1;
		if (!len || typeof cs.nodeType != "undefined" || len == 1) {
			return cs
		}
		if (isIE && typeof cs[0].selectSingleNode != "undefined") {
			return nodupIEXml(cs)
		}
		var d = ++key;
		cs[0]._nodup = d;
		for (i = 1; c = cs[i]; i++) {
			if (c._nodup != d) {
				c._nodup = d
			} else {
				r = [];
				for (var j = 0; j < i; j++) {
					r[++ri] = cs[j]
				}
				for (j = i + 1; cj = cs[j]; j++) {
					if (cj._nodup != d) {
						cj._nodup = d;
						r[++ri] = cj
					}
				}
				return r
			}
		}
		return r
	}
	function quickDiffIEXml(c1, c2) {
		var d = ++key, r = [];
		for (var i = 0, len = c1.length; i < len; i++) {
			c1[i].setAttribute("_qdiff", d)
		}
		for (var i = 0, len = c2.length; i < len; i++) {
			if (c2[i].getAttribute("_qdiff") != d) {
				r[r.length] = c2[i]
			}
		}
		for (var i = 0, len = c1.length; i < len; i++) {
			c1[i].removeAttribute("_qdiff")
		}
		return r
	}
	function quickDiff(c1, c2) {
		var len1 = c1.length, d = ++key, r = [];
		if (!len1) {
			return c2
		}
		if (isIE && typeof c1[0].selectSingleNode != "undefined") {
			return quickDiffIEXml(c1, c2)
		}
		for (var i = 0; i < len1; i++) {
			c1[i]._qdiff = d
		}
		for (var i = 0, len = c2.length; i < len; i++) {
			if (c2[i]._qdiff != d) {
				r[r.length] = c2[i]
			}
		}
		return r
	}
	function quickId(ns, mode, root, id) {
		if (ns == root) {
			var d = root.ownerDocument || root;
			return d.getElementById(id)
		}
		ns = getNodes(ns, mode, "*");
		return byId(ns, null, id)
	}
	return {
		getStyle : function(el, name) {
			return Ext.fly(el).getStyle(name)
		},
		compile : function(path, type) {
			type = type || "select";
			var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"], q = path, mode, lq, tk = Ext.DomQuery.matchers, tklen = tk.length, mm, lmode = q
					.match(modeRe);
			if (lmode && lmode[1]) {
				fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
				q = q.replace(lmode[1], "")
			}
			while (path.substr(0, 1) == "/") {
				path = path.substr(1)
			}
			while (q && lq != q) {
				lq = q;
				var tm = q.match(tagTokenRe);
				if (type == "select") {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = quickId(n, mode, root, "'
									+ tm[2] + '");'
						} else {
							fn[fn.length] = 'n = getNodes(n, mode, "' + tm[2]
									+ '");'
						}
						q = q.replace(tm[0], "")
					} else {
						if (q.substr(0, 1) != "@") {
							fn[fn.length] = 'n = getNodes(n, mode, "*");'
						}
					}
				} else {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = byId(n, null, "' + tm[2]
									+ '");'
						} else {
							fn[fn.length] = 'n = byTag(n, "' + tm[2] + '");'
						}
						q = q.replace(tm[0], "")
					}
				}
				while (!(mm = q.match(modeRe))) {
					var matched = false;
					for (var j = 0; j < tklen; j++) {
						var t = tk[j];
						var m = q.match(t.re);
						if (m) {
							fn[fn.length] = t.select.replace(tplRe, function(x,
											i) {
										return m[i]
									});
							q = q.replace(m[0], "");
							matched = true;
							break
						}
					}
					if (!matched) {
						throw 'Error parsing selector, parsing failed at "' + q
								+ '"'
					}
				}
				if (mm[1]) {
					fn[fn.length] = 'mode="' + mm[1].replace(trimRe, "") + '";';
					q = q.replace(mm[1], "")
				}
			}
			fn[fn.length] = "return nodup(n);\n}";
			eval(fn.join(""));
			return f
		},
		select : function(path, root, type) {
			if (!root || root == document) {
				root = document
			}
			if (typeof root == "string") {
				root = document.getElementById(root)
			}
			var paths = path.split(","), results = [];
			for (var i = 0, len = paths.length; i < len; i++) {
				var p = paths[i].replace(trimRe, "");
				if (!cache[p]) {
					cache[p] = Ext.DomQuery.compile(p);
					if (!cache[p]) {
						throw p + " is not a valid selector"
					}
				}
				var result = cache[p](root);
				if (result && result != document) {
					results = results.concat(result)
				}
			}
			if (paths.length > 1) {
				return nodup(results)
			}
			return results
		},
		selectNode : function(path, root) {
			return Ext.DomQuery.select(path, root)[0]
		},
		selectValue : function(path, root, defaultValue) {
			path = path.replace(trimRe, "");
			if (!valueCache[path]) {
				valueCache[path] = Ext.DomQuery.compile(path, "select")
			}
			var n = valueCache[path](root), v;
			n = n[0] ? n[0] : n;
			if (typeof n.normalize == "function") {
				n.normalize()
			}
			v = (n && n.firstChild ? n.firstChild.nodeValue : null);
			return ((v === null || v === undefined || v === "")
					? defaultValue
					: v)
		},
		selectNumber : function(path, root, defaultValue) {
			var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
			return parseFloat(v)
		},
		is : function(el, ss) {
			if (typeof el == "string") {
				el = document.getElementById(el)
			}
			var isArray = Ext.isArray(el), result = Ext.DomQuery.filter(isArray
							? el
							: [el], ss);
			return isArray ? (result.length == el.length) : (result.length > 0)
		},
		filter : function(els, ss, nonMatches) {
			ss = ss.replace(trimRe, "");
			if (!simpleCache[ss]) {
				simpleCache[ss] = Ext.DomQuery.compile(ss, "simple")
			}
			var result = simpleCache[ss](els);
			return nonMatches ? quickDiff(result, els) : result
		},
		matchers : [{
					re : /^\.([\w-]+)/,
					select : 'n = byClassName(n, null, " {1} ");'
				}, {
					re : /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
					select : 'n = byPseudo(n, "{1}", "{2}");'
				}, {
					re : /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
					select : 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
				}, {
					re : /^#([\w-]+)/,
					select : 'n = byId(n, null, "{1}");'
				}, {
					re : /^@([\w-]+)/,
					select : 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
				}],
		operators : {
			"=" : function(a, v) {
				return a == v
			},
			"!=" : function(a, v) {
				return a != v
			},
			"^=" : function(a, v) {
				return a && a.substr(0, v.length) == v
			},
			"$=" : function(a, v) {
				return a && a.substr(a.length - v.length) == v
			},
			"*=" : function(a, v) {
				return a && a.indexOf(v) !== -1
			},
			"%=" : function(a, v) {
				return (a % v) == 0
			},
			"|=" : function(a, v) {
				return a && (a == v || a.substr(0, v.length + 1) == v + "-")
			},
			"~=" : function(a, v) {
				return a && (" " + a + " ").indexOf(" " + v + " ") != -1
			}
		},
		pseudos : {
			"first-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.previousSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"last-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.nextSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"nth-child" : function(c, a) {
				var r = [], ri = -1, m = nthRe.exec(a == "even" && "2n"
						|| a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a
						|| a), f = (m[1] || 1) - 0, l = m[2] - 0;
				for (var i = 0, n; n = c[i]; i++) {
					var pn = n.parentNode;
					if (batch != pn._batch) {
						var j = 0;
						for (var cn = pn.firstChild; cn; cn = cn.nextSibling) {
							if (cn.nodeType == 1) {
								cn.nodeIndex = ++j
							}
						}
						pn._batch = batch
					}
					if (f == 1) {
						if (l == 0 || n.nodeIndex == l) {
							r[++ri] = n
						}
					} else {
						if ((n.nodeIndex + l) % f == 0) {
							r[++ri] = n
						}
					}
				}
				return r
			},
			"only-child" : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (!prev(ci) && !next(ci)) {
						r[++ri] = ci
					}
				}
				return r
			},
			empty : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var cns = ci.childNodes, j = 0, cn, empty = true;
					while (cn = cns[j]) {
						++j;
						if (cn.nodeType == 1 || cn.nodeType == 3) {
							empty = false;
							break
						}
					}
					if (empty) {
						r[++ri] = ci
					}
				}
				return r
			},
			contains : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if ((ci.textContent || ci.innerText || "").indexOf(v) != -1) {
						r[++ri] = ci
					}
				}
				return r
			},
			nodeValue : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (ci.firstChild && ci.firstChild.nodeValue == v) {
						r[++ri] = ci
					}
				}
				return r
			},
			checked : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (ci.checked == true) {
						r[++ri] = ci
					}
				}
				return r
			},
			not : function(c, ss) {
				return Ext.DomQuery.filter(c, ss, true)
			},
			any : function(c, selectors) {
				var ss = selectors.split("|"), r = [], ri = -1, s;
				for (var i = 0, ci; ci = c[i]; i++) {
					for (var j = 0; s = ss[j]; j++) {
						if (Ext.DomQuery.is(ci, s)) {
							r[++ri] = ci;
							break
						}
					}
				}
				return r
			},
			odd : function(c) {
				return this["nth-child"](c, "odd")
			},
			even : function(c) {
				return this["nth-child"](c, "even")
			},
			nth : function(c, a) {
				return c[a - 1] || []
			},
			first : function(c) {
				return c[0] || []
			},
			last : function(c) {
				return c[c.length - 1] || []
			},
			has : function(c, ss) {
				var s = Ext.DomQuery.select, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (s(ss, ci).length > 0) {
						r[++ri] = ci
					}
				}
				return r
			},
			next : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var n = next(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			},
			prev : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var n = prev(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			}
		}
	}
}();
Ext.query = Ext.DomQuery.select;
Ext.util.DelayedTask = function(d, c, a) {
	var e = this, g, b = function() {
		clearInterval(g);
		g = null;
		d.apply(c, a || [])
	};
	e.delay = function(j, l, k, h) {
		e.cancel();
		d = l || d;
		c = k || c;
		a = h || a;
		g = setInterval(b, j)
	};
	e.cancel = function() {
		if (g) {
			clearInterval(g);
			g = null
		}
	}
};
(function() {
	var j = Ext.util, m = Ext.toArray, l = Ext.each, a = Ext.isObject, h = true, k = false;
	j.Observable = function() {
		var n = this, o = n.events;
		if (n.listeners) {
			n.on(n.listeners);
			delete n.listeners
		}
		n.events = o || {}
	};
	j.Observable.prototype = {
		filterOptRe : /^(?:scope|delay|buffer|single)$/,
		fireEvent : function() {
			var n = m(arguments), p = n[0].toLowerCase(), r = this, o = h, t = r.events[p], s, u;
			if (r.eventsSuspended === h) {
				if (s = r.eventQueue) {
					s.push(n)
				}
			} else {
				if (a(t) && t.bubble) {
					if (t.fire.apply(t, n.slice(1)) === k) {
						return k
					}
					u = r.getBubbleTarget && r.getBubbleTarget();
					if (u && u.enableBubble) {
						if (!u.events[p] || !Ext.isObject(u.events[p])
								|| !u.events[p].bubble) {
							u.enableBubble(p)
						}
						return u.fireEvent.apply(u, n)
					}
				} else {
					if (a(t)) {
						n.shift();
						o = t.fire.apply(t, n)
					}
				}
			}
			return o
		},
		addListener : function(q, t, v, p) {
			var s = this, r, w, u, n;
			if (a(q)) {
				p = q;
				for (r in p) {
					w = p[r];
					if (!s.filterOptRe.test(r)) {
						s.addListener(r, w.fn || w, w.scope || p.scope, w.fn
										? w
										: p)
					}
				}
			} else {
				q = q.toLowerCase();
				n = s.events[q] || h;
				if (Ext.isBoolean(n)) {
					s.events[q] = n = new j.Event(s, q)
				}
				n.addListener(t, v, a(p) ? p : {})
			}
		},
		removeListener : function(n, p, o) {
			var q = this.events[n.toLowerCase()];
			if (a(q)) {
				q.removeListener(p, o)
			}
		},
		purgeListeners : function() {
			var p = this.events, n, o;
			for (o in p) {
				n = p[o];
				if (a(n)) {
					n.clearListeners()
				}
			}
		},
		addEvents : function(r) {
			var q = this;
			q.events = q.events || {};
			if (Ext.isString(r)) {
				var n = arguments, p = n.length;
				while (p--) {
					q.events[n[p]] = q.events[n[p]] || h
				}
			} else {
				Ext.applyIf(q.events, r)
			}
		},
		hasListener : function(n) {
			var o = this.events[n];
			return a(o) && o.listeners.length > 0
		},
		suspendEvents : function(n) {
			this.eventsSuspended = h;
			if (n && !this.eventQueue) {
				this.eventQueue = []
			}
		},
		resumeEvents : function() {
			var n = this, o = n.eventQueue || [];
			n.eventsSuspended = k;
			delete n.eventQueue;
			l(o, function(p) {
						n.fireEvent.apply(n, p)
					})
		}
	};
	var e = j.Observable.prototype;
	e.on = e.addListener;
	e.un = e.removeListener;
	j.Observable.releaseCapture = function(n) {
		n.fireEvent = e.fireEvent
	};
	function g(p, q, n) {
		return function() {
			if (q.target == arguments[0]) {
				p.apply(n, m(arguments))
			}
		}
	}
	function c(q, r, p, n) {
		p.task = new j.DelayedTask();
		return function() {
			p.task.delay(r.buffer, q, n, m(arguments))
		}
	}
	function d(p, q, o, n) {
		return function() {
			q.removeListener(o, n);
			return p.apply(n, arguments)
		}
	}
	function b(q, r, p, n) {
		return function() {
			var o = new j.DelayedTask();
			if (!p.tasks) {
				p.tasks = []
			}
			p.tasks.push(o);
			o.delay(r.delay || 10, q, n, m(arguments))
		}
	}
	j.Event = function(o, n) {
		this.name = n;
		this.obj = o;
		this.listeners = []
	};
	j.Event.prototype = {
		addListener : function(q, p, o) {
			var r = this, n;
			p = p || r.obj;
			if (!r.isListening(q, p)) {
				n = r.createListener(q, p, o);
				if (r.firing) {
					r.listeners = r.listeners.slice(0)
				}
				r.listeners.push(n)
			}
		},
		createListener : function(r, q, s) {
			s = s || {}, q = q || this.obj;
			var n = {
				fn : r,
				scope : q,
				options : s
			}, p = r;
			if (s.target) {
				p = g(p, s, q)
			}
			if (s.delay) {
				p = b(p, s, r, q)
			}
			if (s.single) {
				p = d(p, this, r, q)
			}
			if (s.buffer) {
				p = c(p, s, r, q)
			}
			n.fireFn = p;
			return n
		},
		findListener : function(r, q) {
			var t = this.listeners, o = t.length, n, p;
			while (o--) {
				n = t[o];
				if (n) {
					p = n.scope;
					if (n.fn == r && (p == q || p == this.obj)) {
						return o
					}
				}
			}
			return -1
		},
		isListening : function(o, n) {
			return this.findListener(o, n) != -1
		},
		removeListener : function(s, r) {
			var q, n, o, t = this, p = k;
			if ((q = t.findListener(s, r)) != -1) {
				if (t.firing) {
					t.listeners = t.listeners.slice(0)
				}
				n = t.listeners[q].fn;
				if (n.task) {
					n.task.cancel();
					delete n.task
				}
				o = n.tasks && n.tasks.length;
				if (o) {
					while (o--) {
						n.tasks[o].cancel()
					}
					delete n.tasks
				}
				t.listeners.splice(q, 1);
				p = h
			}
			return p
		},
		clearListeners : function() {
			var p = this, n = p.listeners, o = n.length;
			while (o--) {
				p.removeListener(n[o].fn, n[o].scope)
			}
		},
		fire : function() {
			var s = this, p = m(arguments), r = s.listeners, n = r.length, q = 0, o;
			if (n > 0) {
				s.firing = h;
				for (; q < n; q++) {
					o = r[q];
					if (o
							&& o.fireFn.apply(o.scope || s.obj || window, p) === k) {
						return (s.firing = k)
					}
				}
			}
			s.firing = k;
			return h
		}
	}
})();
Ext.apply(Ext.util.Observable.prototype, function() {
	function a(k) {
		var j = (this.methodEvents = this.methodEvents || {})[k], d, c, g, h = this;
		if (!j) {
			this.methodEvents[k] = j = {};
			j.originalFn = this[k];
			j.methodName = k;
			j.before = [];
			j.after = [];
			var b = function(m, l, e) {
				if (!Ext.isEmpty(c = m.apply(l || h, e))) {
					if (Ext.isObject(c)) {
						d = !Ext.isEmpty(c.returnValue) ? c.returnValue : c;
						g = !!c.cancel
					} else {
						if (c === false) {
							g = true
						} else {
							d = c
						}
					}
				}
			};
			this[k] = function() {
				var e = Ext.toArray(arguments);
				d = c = undefined;
				g = false;
				Ext.each(j.before, function(l) {
							b(l.fn, l.scope, e);
							if (g) {
								return d
							}
						});
				if (!Ext.isEmpty(c = j.originalFn.apply(h, e))) {
					d = c
				}
				Ext.each(j.after, function(l) {
							b(l.fn, l.scope, e);
							if (g) {
								return d
							}
						});
				return d
			}
		}
		return j
	}
	return {
		beforeMethod : function(d, c, b) {
			a.call(this, d).before.push({
						fn : c,
						scope : b
					})
		},
		afterMethod : function(d, c, b) {
			a.call(this, d).after.push({
						fn : c,
						scope : b
					})
		},
		removeMethodListener : function(h, c, b) {
			var g = a.call(this, h), d = false;
			Ext.each(g.before, function(j, k, e) {
						if (j.fn == c && j.scope == b) {
							e.splice(k, 1);
							d = true;
							return false
						}
					});
			if (!d) {
				Ext.each(g.after, function(j, k, e) {
							if (j.fn == c && j.scope == b) {
								e.splice(k, 1);
								return false
							}
						})
			}
		},
		relayEvents : function(e, b) {
			var d = this;
			function c(g) {
				return function() {
					return d.fireEvent.apply(d, [g].concat(Ext
									.toArray(arguments)))
				}
			}
			Ext.each(b, function(g) {
						d.events[g] = d.events[g] || true;
						e.on(g, c(g), d)
					})
		},
		enableBubble : function(b) {
			var c = this;
			if (!Ext.isEmpty(b)) {
				b = Ext.isArray(b) ? b : Ext.toArray(arguments);
				Ext.each(b, function(d) {
							d = d.toLowerCase();
							var e = c.events[d] || true;
							if (Ext.isBoolean(e)) {
								e = new Ext.util.Event(c, d);
								c.events[d] = e
							}
							e.bubble = true
						})
			}
		}
	}
}());
Ext.util.Observable.capture = function(c, b, a) {
	c.fireEvent = c.fireEvent.createInterceptor(b, a)
};
Ext.util.Observable.observeClass = function(b, a) {
	if (b) {
		if (!b.fireEvent) {
			Ext.apply(b, new Ext.util.Observable());
			Ext.util.Observable.capture(b.prototype, b.fireEvent, b)
		}
		if (Ext.isObject(a)) {
			b.on(a)
		}
		return b
	}
};
Ext.EventManager = function() {
	var v, n, j = false, m = Ext.lib.Event, o = Ext.lib.Dom, b = document, w = window, e = "ie-deferred-loader", p = "DOMContentLoaded", g = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, r = [];
	function l(z) {
		var C = false, y = 0, x = r.length, C = false, A = false, B;
		if (z) {
			if (z.getElementById || z.navigator) {
				for (; y < x; ++y) {
					B = r[y];
					if (B.el === z) {
						C = B.id;
						break
					}
				}
				if (!C) {
					C = Ext.id(z);
					r.push({
								id : C,
								el : z
							});
					A = true
				}
			} else {
				C = Ext.id(z)
			}
			if (!Ext.elCache[C]) {
				Ext.Element.addToCache(new Ext.Element(z), C);
				if (A) {
					Ext.elCache[C].skipGC = true
				}
			}
		}
		return C
	}
	function k(z, A, D, y, F) {
		z = Ext.getDom(z);
		var x = l(z), E = Ext.elCache[x].events, B;
		B = m.on(z, A, y);
		E[A] = E[A] || [];
		E[A].push([D, y, F, B]);
		if (A == "mousewheel" && z.addEventListener) {
			var C = ["DOMMouseScroll", y, false];
			z.addEventListener.apply(z, C);
			Ext.EventManager.addListener(w, "unload", function() {
						z.removeEventListener.apply(z, C)
					})
		}
		if (A == "mousedown" && z == document) {
			Ext.EventManager.stoppedMouseDownEvent.addListener(y)
		}
	}
	function c() {
		if (!j) {
			Ext.isReady = j = true;
			if (n) {
				clearInterval(n)
			}
			if (Ext.isGecko || Ext.isOpera) {
				b.removeEventListener(p, c, false)
			}
			if (Ext.isIE) {
				var x = b.getElementById(e);
				if (x) {
					x.onreadystatechange = null;
					x.parentNode.removeChild(x)
				}
			}
			if (v) {
				v.fire();
				v.listeners = []
			}
		}
	}
	function a() {
		var x = "complete";
		v = new Ext.util.Event();
		if (Ext.isGecko || Ext.isOpera) {
			b.addEventListener(p, c, false)
		} else {
			if (Ext.isIE) {
				b.write("<script id=" + e
						+ ' defer="defer" src="//:"><\/script>');
				b.getElementById(e).onreadystatechange = function() {
					if (this.readyState == x) {
						c()
					}
				}
			} else {
				if (Ext.isWebKit) {
					n = setInterval(function() {
								if (b.readyState == x) {
									c()
								}
							}, 10)
				}
			}
		}
		m.on(w, "load", c)
	}
	function t(x, y) {
		return function() {
			var z = Ext.toArray(arguments);
			if (y.target == Ext.EventObject.setEvent(z[0]).target) {
				x.apply(this, z)
			}
		}
	}
	function u(z, A, y) {
		y.task = new Ext.util.DelayedTask(z);
		var x = function(B) {
			y.task.delay(A.buffer, z, null, [new Ext.EventObjectImpl(B)])
		};
		return x
	}
	function q(B, A, x, z, y) {
		return function(C) {
			Ext.EventManager.removeListener(A, x, z, y);
			B(C)
		}
	}
	function d(y, z, x) {
		return function(B) {
			var A = new Ext.util.DelayedTask(y);
			if (!x.tasks) {
				x.tasks = []
			}
			x.tasks.push(A);
			A.delay(z.delay || 10, y, null, [new Ext.EventObjectImpl(B)])
		}
	}
	function h(z, y, x, D, C) {
		var E = !Ext.isObject(x) ? {} : x, B = Ext.getDom(z);
		D = D || E.fn;
		C = C || E.scope;
		if (!B) {
			throw 'Error listening for "' + y + '". Element "' + z
					+ "\" doesn't exist."
		}
		function A(G) {
			if (!Ext) {
				return
			}
			G = Ext.EventObject.setEvent(G);
			var F;
			if (E.delegate) {
				if (!(F = G.getTarget(E.delegate, B))) {
					return
				}
			} else {
				F = G.target
			}
			if (E.stopEvent) {
				G.stopEvent()
			}
			if (E.preventDefault) {
				G.preventDefault()
			}
			if (E.stopPropagation) {
				G.stopPropagation()
			}
			if (E.normalized) {
				G = G.browserEvent
			}
			D.call(C || B, G, F, E)
		}
		if (E.target) {
			A = t(A, E)
		}
		if (E.delay) {
			A = d(A, E, D)
		}
		if (E.single) {
			A = q(A, B, y, D, C)
		}
		if (E.buffer) {
			A = u(A, E, D)
		}
		k(B, y, D, A, C);
		return A
	}
	var s = {
		addListener : function(z, x, B, A, y) {
			if (Ext.isObject(x)) {
				var E = x, C, D;
				for (C in E) {
					D = E[C];
					if (!g.test(C)) {
						if (Ext.isFunction(D)) {
							h(z, C, E, D, E.scope)
						} else {
							h(z, C, D)
						}
					}
				}
			} else {
				h(z, x, y, B, A)
			}
		},
		removeListener : function(A, E, G, H) {
			A = Ext.getDom(A);
			var x = l(A), F = A && (Ext.elCache[x].events)[E] || [], y, D, B, C, z;
			for (D = 0, len = F.length; D < len; D++) {
				if (Ext.isArray(F[D]) && F[D][0] == G && (!H || F[D][2] == H)) {
					if (G.task) {
						G.task.cancel();
						delete G.task
					}
					C = G.tasks && G.tasks.length;
					if (C) {
						while (C--) {
							G.tasks[C].cancel()
						}
						delete G.tasks
					}
					z = y = F[D][1];
					if (m.extAdapter) {
						z = F[D][3]
					}
					m.un(A, E, z);
					F.splice(D, 1);
					if (F.length === 0) {
						delete Ext.elCache[x].events[E]
					}
					for (C in Ext.elCache[x].events) {
						return false
					}
					Ext.elCache[x].events = {};
					return false
				}
			}
			if (E == "mousewheel" && A.addEventListener && y) {
				A.removeEventListener("DOMMouseScroll", y, false)
			}
			if (E == "mousedown" && A == b && y) {
				Ext.EventManager.stoppedMouseDownEvent.removeListener(y)
			}
		},
		removeAll : function(y) {
			y = Ext.getDom(y);
			var x = l(y), D = Ext.elCache[x] || {}, G = D.events || {}, C, B, E, z, F, A;
			for (z in G) {
				if (G.hasOwnProperty(z)) {
					C = G[z];
					for (B = 0, E = C.length; B < E; B++) {
						F = C[B][0];
						if (F.task) {
							F.task.cancel();
							delete F.task
						}
						if (F.tasks && (A = F.tasks.length)) {
							while (A--) {
								F.tasks[A].cancel()
							}
							delete F.tasks
						}
						m.un(y, z, m.extAdapter ? C[B][3] : C[B][1])
					}
				}
			}
			if (Ext.elCache[x]) {
				Ext.elCache[x].events = {}
			}
		},
		getListeners : function(A, x) {
			A = Ext.getDom(A);
			var C = l(A), y = Ext.elCache[C] || {}, B = y.events || {}, z = [];
			if (B && B[x]) {
				return B[x]
			} else {
				return null
			}
		},
		purgeElement : function(z, x, B) {
			z = Ext.getDom(z);
			var y = l(z), E = Ext.elCache[y] || {}, F = E.events || {}, A, D, C;
			if (B) {
				if (F && F.hasOwnProperty(B)) {
					D = F[B];
					for (A = 0, C = D.length; A < C; A++) {
						Ext.EventManager.removeListener(z, B, D[A][0])
					}
				}
			} else {
				Ext.EventManager.removeAll(z)
			}
			if (x && z && z.childNodes) {
				for (A = 0, C = z.childNodes.length; A < C; A++) {
					Ext.EventManager.purgeElement(z.childNodes[A], x, B)
				}
			}
		},
		_unload : function() {
			var x;
			for (x in Ext.elCache) {
				Ext.EventManager.removeAll(x)
			}
		},
		onDocumentReady : function(z, y, x) {
			if (j) {
				v.addListener(z, y, x);
				v.fire();
				v.listeners = []
			} else {
				if (!v) {
					a()
				}
				x = x || {};
				x.delay = x.delay || 1;
				v.addListener(z, y, x)
			}
		}
	};
	s.on = s.addListener;
	s.un = s.removeListener;
	s.stoppedMouseDownEvent = new Ext.util.Event();
	return s
}();
Ext.onReady = Ext.EventManager.onDocumentReady;
(function() {
	var a = function() {
		var c = document.body || document.getElementsByTagName("body")[0];
		if (!c) {
			return false
		}
		var b = [
				" ",
				Ext.isIE ? "ext-ie "
						+ (Ext.isIE6 ? "ext-ie6" : (Ext.isIE7
								? "ext-ie7"
								: "ext-ie8")) : Ext.isGecko
						? "ext-gecko "
								+ (Ext.isGecko2 ? "ext-gecko2" : "ext-gecko3")
						: Ext.isOpera ? "ext-opera" : Ext.isWebKit
								? "ext-webkit"
								: ""];
		if (Ext.isSafari) {
			b.push("ext-safari "
					+ (Ext.isSafari2 ? "ext-safari2" : (Ext.isSafari3
							? "ext-safari3"
							: "ext-safari4")))
		} else {
			if (Ext.isChrome) {
				b.push("ext-chrome")
			}
		}
		if (Ext.isMac) {
			b.push("ext-mac")
		}
		if (Ext.isLinux) {
			b.push("ext-linux")
		}
		if (Ext.isStrict || Ext.isBorderBox) {
			var d = c.parentNode;
			if (d) {
				d.className += Ext.isStrict ? " ext-strict" : " ext-border-box"
			}
		}
		c.className += b.join(" ");
		return true
	};
	if (!a()) {
		Ext.onReady(a)
	}
})();
Ext.EventObject = function() {
	var b = Ext.lib.Event, a = {
		3 : 13,
		63234 : 37,
		63235 : 39,
		63232 : 38,
		63233 : 40,
		63276 : 33,
		63277 : 34,
		63272 : 46,
		63273 : 36,
		63275 : 35
	}, c = Ext.isIE ? {
		1 : 0,
		4 : 1,
		2 : 2
	} : (Ext.isWebKit ? {
		1 : 0,
		2 : 1,
		3 : 2
	} : {
		0 : 0,
		1 : 1,
		2 : 2
	});
	Ext.EventObjectImpl = function(d) {
		if (d) {
			this.setEvent(d.browserEvent || d)
		}
	};
	Ext.EventObjectImpl.prototype = {
		setEvent : function(g) {
			var d = this;
			if (g == d || (g && g.browserEvent)) {
				return g
			}
			d.browserEvent = g;
			if (g) {
				d.button = g.button
						? c[g.button]
						: (g.which ? g.which - 1 : -1);
				if (g.type == "click" && d.button == -1) {
					d.button = 0
				}
				d.type = g.type;
				d.shiftKey = g.shiftKey;
				d.ctrlKey = g.ctrlKey || g.metaKey || false;
				d.altKey = g.altKey;
				d.keyCode = g.keyCode;
				d.charCode = g.charCode;
				d.target = b.getTarget(g);
				d.xy = b.getXY(g)
			} else {
				d.button = -1;
				d.shiftKey = false;
				d.ctrlKey = false;
				d.altKey = false;
				d.keyCode = 0;
				d.charCode = 0;
				d.target = null;
				d.xy = [0, 0]
			}
			return d
		},
		stopEvent : function() {
			var d = this;
			if (d.browserEvent) {
				if (d.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(d)
				}
				b.stopEvent(d.browserEvent)
			}
		},
		preventDefault : function() {
			if (this.browserEvent) {
				b.preventDefault(this.browserEvent)
			}
		},
		stopPropagation : function() {
			var d = this;
			if (d.browserEvent) {
				if (d.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(d)
				}
				b.stopPropagation(d.browserEvent)
			}
		},
		getCharCode : function() {
			return this.charCode || this.keyCode
		},
		getKey : function() {
			return this.normalizeKey(this.keyCode || this.charCode)
		},
		normalizeKey : function(d) {
			return Ext.isSafari ? (a[d] || d) : d
		},
		getPageX : function() {
			return this.xy[0]
		},
		getPageY : function() {
			return this.xy[1]
		},
		getXY : function() {
			return this.xy
		},
		getTarget : function(e, g, d) {
			return e ? Ext.fly(this.target).findParent(e, g, d) : (d ? Ext
					.get(this.target) : this.target)
		},
		getRelatedTarget : function() {
			return this.browserEvent
					? b.getRelatedTarget(this.browserEvent)
					: null
		},
		getWheelDelta : function() {
			var d = this.browserEvent;
			var g = 0;
			if (d.wheelDelta) {
				g = d.wheelDelta / 120
			} else {
				if (d.detail) {
					g = -d.detail / 3
				}
			}
			return g
		},
		within : function(g, h, d) {
			if (g) {
				var e = this[h ? "getRelatedTarget" : "getTarget"]();
				return e
						&& ((d ? (e == Ext.getDom(g)) : false) || Ext.fly(g)
								.contains(e))
			}
			return false
		}
	};
	return new Ext.EventObjectImpl()
}();
Ext.apply(Ext.EventManager, function() {
	var c, k, e, b, a = Ext.lib.Dom, j = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, h = 0, g = 0, d = Ext.isWebKit
			? Ext.num(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1]) >= 525
			: !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera);
	return {
		doResizeEvent : function() {
			var m = a.getViewHeight(), l = a.getViewWidth();
			if (g != m || h != l) {
				c.fire(h = l, g = m)
			}
		},
		onWindowResize : function(n, m, l) {
			if (!c) {
				c = new Ext.util.Event();
				k = new Ext.util.DelayedTask(this.doResizeEvent);
				Ext.EventManager.on(window, "resize", this.fireWindowResize,
						this)
			}
			c.addListener(n, m, l)
		},
		fireWindowResize : function() {
			if (c) {
				if ((Ext.isIE || Ext.isAir) && k) {
					k.delay(50)
				} else {
					c.fire(a.getViewWidth(), a.getViewHeight())
				}
			}
		},
		onTextResize : function(o, n, l) {
			if (!e) {
				e = new Ext.util.Event();
				var m = new Ext.Element(document.createElement("div"));
				m.dom.className = "x-text-resize";
				m.dom.innerHTML = "X";
				m.appendTo(document.body);
				b = m.dom.offsetHeight;
				setInterval(function() {
							if (m.dom.offsetHeight != b) {
								e.fire(b, b = m.dom.offsetHeight)
							}
						}, this.textResizeInterval)
			}
			e.addListener(o, n, l)
		},
		removeResizeListener : function(m, l) {
			if (c) {
				c.removeListener(m, l)
			}
		},
		fireResize : function() {
			if (c) {
				c.fire(a.getViewWidth(), a.getViewHeight())
			}
		},
		textResizeInterval : 50,
		ieDeferSrc : false,
		useKeydown : d
	}
}());
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.apply(Ext.EventObjectImpl.prototype, {
			BACKSPACE : 8,
			TAB : 9,
			NUM_CENTER : 12,
			ENTER : 13,
			RETURN : 13,
			SHIFT : 16,
			CTRL : 17,
			CONTROL : 17,
			ALT : 18,
			PAUSE : 19,
			CAPS_LOCK : 20,
			ESC : 27,
			SPACE : 32,
			PAGE_UP : 33,
			PAGEUP : 33,
			PAGE_DOWN : 34,
			PAGEDOWN : 34,
			END : 35,
			HOME : 36,
			LEFT : 37,
			UP : 38,
			RIGHT : 39,
			DOWN : 40,
			PRINT_SCREEN : 44,
			INSERT : 45,
			DELETE : 46,
			ZERO : 48,
			ONE : 49,
			TWO : 50,
			THREE : 51,
			FOUR : 52,
			FIVE : 53,
			SIX : 54,
			SEVEN : 55,
			EIGHT : 56,
			NINE : 57,
			A : 65,
			B : 66,
			C : 67,
			D : 68,
			E : 69,
			F : 70,
			G : 71,
			H : 72,
			I : 73,
			J : 74,
			K : 75,
			L : 76,
			M : 77,
			N : 78,
			O : 79,
			P : 80,
			Q : 81,
			R : 82,
			S : 83,
			T : 84,
			U : 85,
			V : 86,
			W : 87,
			X : 88,
			Y : 89,
			Z : 90,
			CONTEXT_MENU : 93,
			NUM_ZERO : 96,
			NUM_ONE : 97,
			NUM_TWO : 98,
			NUM_THREE : 99,
			NUM_FOUR : 100,
			NUM_FIVE : 101,
			NUM_SIX : 102,
			NUM_SEVEN : 103,
			NUM_EIGHT : 104,
			NUM_NINE : 105,
			NUM_MULTIPLY : 106,
			NUM_PLUS : 107,
			NUM_MINUS : 109,
			NUM_PERIOD : 110,
			NUM_DIVISION : 111,
			F1 : 112,
			F2 : 113,
			F3 : 114,
			F4 : 115,
			F5 : 116,
			F6 : 117,
			F7 : 118,
			F8 : 119,
			F9 : 120,
			F10 : 121,
			F11 : 122,
			F12 : 123,
			isNavKeyPress : function() {
				var b = this, a = this.normalizeKey(b.keyCode);
				return (a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB
						|| a == b.ESC
			},
			isSpecialKey : function() {
				var a = this.normalizeKey(this.keyCode);
				return (this.type == "keypress" && this.ctrlKey)
						|| this.isNavKeyPress() || (a == this.BACKSPACE)
						|| (a >= 16 && a <= 20) || (a >= 44 && a <= 45)
			},
			getPoint : function() {
				return new Ext.lib.Point(this.xy[0], this.xy[1])
			},
			hasModifier : function() {
				return ((this.ctrlKey || this.altKey) || this.shiftKey)
			}
		});
(function() {
	var k = document;
	Ext.Element = function(p, q) {
		var r = typeof p == "string" ? k.getElementById(p) : p, s;
		if (!r) {
			return null
		}
		s = r.id;
		if (!q && s && Ext.elCache[s]) {
			return Ext.elCache[s].el
		}
		this.dom = r;
		this.id = s || Ext.id(r)
	};
	var a = Ext.lib.Dom, g = Ext.DomHelper, n = Ext.lib.Event, e = Ext.lib.Anim, h = Ext.Element, b = Ext.elCache;
	h.prototype = {
		set : function(t, q) {
			var r = this.dom, p, s, q = (q !== false) && !!r.setAttribute;
			for (p in t) {
				if (t.hasOwnProperty(p)) {
					s = t[p];
					if (p == "style") {
						g.applyStyles(r, s)
					} else {
						if (p == "cls") {
							r.className = s
						} else {
							if (q) {
								r.setAttribute(p, s)
							} else {
								r[p] = s
							}
						}
					}
				}
			}
			return this
		},
		defaultUnit : "px",
		is : function(p) {
			return Ext.DomQuery.is(this.dom, p)
		},
		focus : function(s, r) {
			var p = this, r = r || p.dom;
			try {
				if (Number(s)) {
					p.focus.defer(s, null, [null, r])
				} else {
					r.focus()
				}
			} catch (q) {
			}
			return p
		},
		blur : function() {
			try {
				this.dom.blur()
			} catch (p) {
			}
			return this
		},
		getValue : function(p) {
			var q = this.dom.value;
			return p ? parseInt(q, 10) : q
		},
		addListener : function(p, s, r, q) {
			Ext.EventManager.on(this.dom, p, s, r || this, q);
			return this
		},
		removeListener : function(p, r, q) {
			Ext.EventManager.removeListener(this.dom, p, r, q || this);
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			return this
		},
		purgeAllListeners : function() {
			Ext.EventManager.purgeElement(this, true);
			return this
		},
		addUnits : function(p) {
			if (p === "" || p == "auto" || p === undefined) {
				p = p || ""
			} else {
				if (!isNaN(p) || !l.test(p)) {
					p = p + (this.defaultUnit || "px")
				}
			}
			return p
		},
		load : function(q, r, p) {
			Ext.Ajax.request(Ext.apply({
						params : r,
						url : q.url || q,
						callback : p,
						el : this.dom,
						indicatorText : q.indicatorText || ""
					}, Ext.isObject(q) ? q : {}));
			return this
		},
		isBorderBox : function() {
			return j[(this.dom.tagName || "").toLowerCase()] || Ext.isBorderBox
		},
		remove : function() {
			var p = this, q = p.dom;
			if (q) {
				delete p.dom;
				Ext.removeNode(q)
			}
		},
		hover : function(q, p, s, r) {
			var t = this;
			t.on("mouseenter", q, s || t.dom, r);
			t.on("mouseleave", p, s || t.dom, r);
			return t
		},
		contains : function(p) {
			return !p ? false : Ext.lib.Dom.isAncestor(this.dom, p.dom
							? p.dom
							: p)
		},
		getAttributeNS : function(q, p) {
			return this.getAttribute(p, q)
		},
		getAttribute : Ext.isIE ? function(p, r) {
			var s = this.dom, q = typeof s[r + ":" + p];
			if (["undefined", "unknown"].indexOf(q) == -1) {
				return s[r + ":" + p]
			}
			return s[p]
		} : function(p, q) {
			var r = this.dom;
			return r.getAttributeNS(q, p) || r.getAttribute(q + ":" + p)
					|| r.getAttribute(p) || r[p]
		},
		update : function(p) {
			if (this.dom) {
				this.dom.innerHTML = p
			}
			return this
		}
	};
	var o = h.prototype;
	h.addMethods = function(p) {
		Ext.apply(o, p)
	};
	o.on = o.addListener;
	o.un = o.removeListener;
	o.autoBoxAdjust = true;
	var l = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i, d;
	h.get = function(q) {
		var p, t, s;
		if (!q) {
			return null
		}
		if (typeof q == "string") {
			if (!(t = k.getElementById(q))) {
				return null
			}
			if (b[q] && b[q].el) {
				p = b[q].el;
				p.dom = t
			} else {
				p = h.addToCache(new h(t))
			}
			return p
		} else {
			if (q.tagName) {
				if (!(s = q.id)) {
					s = Ext.id(q)
				}
				if (b[s] && b[s].el) {
					p = b[s].el;
					p.dom = q
				} else {
					p = h.addToCache(new h(q))
				}
				return p
			} else {
				if (q instanceof h) {
					if (q != d) {
						q.dom = k.getElementById(q.id) || q.dom
					}
					return q
				} else {
					if (q.isComposite) {
						return q
					} else {
						if (Ext.isArray(q)) {
							return h.select(q)
						} else {
							if (q == k) {
								if (!d) {
									var r = function() {
									};
									r.prototype = h.prototype;
									d = new r();
									d.dom = k
								}
								return d
							}
						}
					}
				}
			}
		}
		return null
	};
	h.addToCache = function(p, q) {
		q = q || p.id;
		b[q] = {
			el : p,
			data : {},
			events : {}
		};
		return p
	};
	h.data = function(q, p, r) {
		q = h.get(q);
		if (!q) {
			return null
		}
		var s = b[q.id].data;
		if (arguments.length == 2) {
			return s[p]
		} else {
			return (s[p] = r)
		}
	};
	function m() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(h.collectorThreadId)
		} else {
			var p, r, u, s;
			for (p in b) {
				s = b[p];
				if (s.skipGC) {
					continue
				}
				r = s.el;
				u = r.dom;
				if (!u || !u.parentNode
						|| (!u.offsetParent && !k.getElementById(p))) {
					if (Ext.enableListenerCollection) {
						Ext.EventManager.removeAll(u)
					}
					delete b[p]
				}
			}
			if (Ext.isIE) {
				var q = {};
				for (p in b) {
					q[p] = b[p]
				}
				b = Ext.elCache = q
			}
		}
	}
	h.collectorThreadId = setInterval(m, 30000);
	var c = function() {
	};
	c.prototype = h.prototype;
	h.Flyweight = function(p) {
		this.dom = p
	};
	h.Flyweight.prototype = new c();
	h.Flyweight.prototype.isFlyweight = true;
	h._flyweights = {};
	h.fly = function(r, p) {
		var q = null;
		p = p || "_global";
		if (r = Ext.getDom(r)) {
			(h._flyweights[p] = h._flyweights[p] || new h.Flyweight()).dom = r;
			q = h._flyweights[p]
		}
		return q
	};
	Ext.get = h.get;
	Ext.fly = h.fly;
	var j = Ext.isStrict ? {
		select : 1
	} : {
		input : 1,
		select : 1,
		textarea : 1
	};
	if (Ext.isIE || Ext.isGecko) {
		j.button = 1
	}
	Ext.EventManager.on(window, "unload", function() {
				delete b;
				delete h._flyweights
			})
})();
Ext.Element.addMethods({
	swallowEvent : function(a, b) {
		var d = this;
		function c(g) {
			g.stopPropagation();
			if (b) {
				g.preventDefault()
			}
		}
		if (Ext.isArray(a)) {
			Ext.each(a, function(g) {
						d.on(g, c)
					});
			return d
		}
		d.on(a, c);
		return d
	},
	relayEvent : function(a, b) {
		this.on(a, function(c) {
					b.fireEvent(a, c)
				})
	},
	clean : function(b) {
		var d = this, e = d.dom, g = e.firstChild, c = -1;
		if (Ext.Element.data(e, "isCleaned") && b !== true) {
			return d
		}
		while (g) {
			var a = g.nextSibling;
			if (g.nodeType == 3 && !/\S/.test(g.nodeValue)) {
				e.removeChild(g)
			} else {
				g.nodeIndex = ++c
			}
			g = a
		}
		Ext.Element.data(e, "isCleaned", true);
		return d
	},
	load : function() {
		var a = this.getUpdater();
		a.update.apply(a, arguments);
		return this
	},
	getUpdater : function() {
		return this.updateManager
				|| (this.updateManager = new Ext.Updater(this))
	},
	update : function(html, loadScripts, callback) {
		if (!this.dom) {
			return this
		}
		html = html || "";
		if (loadScripts !== true) {
			this.dom.innerHTML = html;
			if (Ext.isFunction(callback)) {
				callback()
			}
			return this
		}
		var id = Ext.id(), dom = this.dom;
		html += '<span id="' + id + '"></span>';
		Ext.lib.Event.onAvailable(id, function() {
			var DOC = document, hd = DOC.getElementsByTagName("head")[0], re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i, match, attrs, srcMatch, typeMatch, el, s;
			while ((match = re.exec(html))) {
				attrs = match[1];
				srcMatch = attrs ? attrs.match(srcRe) : false;
				if (srcMatch && srcMatch[2]) {
					s = DOC.createElement("script");
					s.src = srcMatch[2];
					typeMatch = attrs.match(typeRe);
					if (typeMatch && typeMatch[2]) {
						s.type = typeMatch[2]
					}
					hd.appendChild(s)
				} else {
					if (match[2] && match[2].length > 0) {
						if (window.execScript) {
							window.execScript(match[2])
						} else {
							window.eval(match[2])
						}
					}
				}
			}
			el = DOC.getElementById(id);
			if (el) {
				Ext.removeNode(el)
			}
			if (Ext.isFunction(callback)) {
				callback()
			}
		});
		dom.innerHTML = html.replace(
				/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
		return this
	},
	removeAllListeners : function() {
		this.removeAnchor();
		Ext.EventManager.removeAll(this.dom);
		return this
	},
	createProxy : function(a, e, d) {
		a = Ext.isObject(a) ? a : {
			tag : "div",
			cls : a
		};
		var c = this, b = e ? Ext.DomHelper.append(e, a, true) : Ext.DomHelper
				.insertBefore(c.dom, a, true);
		if (d && c.setBox && c.getBox) {
			b.setBox(c.getBox())
		}
		return b
	}
});
Ext.Element.prototype.getUpdateManager = Ext.Element.prototype.getUpdater;
Ext.Element.addMethods({
	getAnchorXY : function(e, m, t) {
		e = (e || "tl").toLowerCase();
		t = t || {};
		var l = this, b = l.dom == document.body || l.dom == document, p = t.width
				|| b ? Ext.lib.Dom.getViewWidth() : l.getWidth(), j = t.height
				|| b ? Ext.lib.Dom.getViewHeight() : l.getHeight(), q, a = Math.round, c = l
				.getXY(), n = l.getScroll(), k = b ? n.left : !m ? c[0] : 0, g = b
				? n.top
				: !m ? c[1] : 0, d = {
			c : [a(p * 0.5), a(j * 0.5)],
			t : [a(p * 0.5), 0],
			l : [0, a(j * 0.5)],
			r : [p, a(j * 0.5)],
			b : [a(p * 0.5), j],
			tl : [0, 0],
			bl : [0, j],
			br : [p, j],
			tr : [p, 0]
		};
		q = d[e];
		return [q[0] + k, q[1] + g]
	},
	anchorTo : function(b, h, c, a, l, m) {
		var j = this, e = j.dom, k = !Ext.isEmpty(l), d = function() {
			Ext.fly(e).alignTo(b, h, c, a);
			Ext.callback(m, Ext.fly(e))
		}, g = this.getAnchor();
		this.removeAnchor();
		Ext.apply(g, {
					fn : d,
					scroll : k
				});
		Ext.EventManager.onWindowResize(d, null);
		if (k) {
			Ext.EventManager.on(window, "scroll", d, null, {
						buffer : !isNaN(l) ? l : 50
					})
		}
		d.call(j);
		return j
	},
	removeAnchor : function() {
		var b = this, a = this.getAnchor();
		if (a && a.fn) {
			Ext.EventManager.removeResizeListener(a.fn);
			if (a.scroll) {
				Ext.EventManager.un(window, "scroll", a.fn)
			}
			delete a.fn
		}
		return b
	},
	getAnchor : function() {
		var b = Ext.Element.data, c = this.dom;
		if (!c) {
			return
		}
		var a = b(c, "_anchor");
		if (!a) {
			a = b(c, "_anchor", {})
		}
		return a
	},
	getAlignToXY : function(g, B, C) {
		g = Ext.get(g);
		if (!g || !g.dom) {
			throw "Element.alignToXY with an element that doesn't exist"
		}
		C = C || [0, 0];
		B = (!B || B == "?" ? "tl-bl?" : (!/-/.test(B) && B !== ""
				? "tl-" + B
				: B || "tl-bl")).toLowerCase();
		var L = this, I = L.dom, N, M, q, n, t, G, z, u = Ext.lib.Dom
				.getViewWidth()
				- 10, H = Ext.lib.Dom.getViewHeight() - 10, b, j, k, l, v, A, O = document, K = O.documentElement, s = O.body, F = (K.scrollLeft
				|| s.scrollLeft || 0)
				+ 5, E = (K.scrollTop || s.scrollTop || 0) + 5, J = false, e = "", a = "", D = B
				.match(/^([a-z]+)-([a-z]+)(\?)?$/);
		if (!D) {
			throw "Element.alignTo with an invalid alignment " + B
		}
		e = D[1];
		a = D[2];
		J = !!D[3];
		N = L.getAnchorXY(e, true);
		M = g.getAnchorXY(a, false);
		q = M[0] - N[0] + C[0];
		n = M[1] - N[1] + C[1];
		if (J) {
			t = L.getWidth();
			G = L.getHeight();
			z = g.getRegion();
			b = e.charAt(0);
			j = e.charAt(e.length - 1);
			k = a.charAt(0);
			l = a.charAt(a.length - 1);
			v = ((b == "t" && k == "b") || (b == "b" && k == "t"));
			A = ((j == "r" && l == "l") || (j == "l" && l == "r"));
			if (q + t > u + F) {
				q = A ? z.left - t : u + F - t
			}
			if (q < F) {
				q = A ? z.right : F
			}
			if (n + G > H + E) {
				n = v ? z.top - G : H + E - G
			}
			if (n < E) {
				n = v ? z.bottom : E
			}
		}
		return [q, n]
	},
	alignTo : function(c, a, e, b) {
		var d = this;
		return d.setXY(d.getAlignToXY(c, a, e), d.preanim && !!b ? d.preanim(
						arguments, 3) : false)
	},
	adjustForConstraints : function(c, a, b) {
		return this.getConstrainToXY(a || document, false, b, c) || c
	},
	getConstrainToXY : function(b, a, c, e) {
		var d = {
			top : 0,
			left : 0,
			bottom : 0,
			right : 0
		};
		return function(j, A, l, n) {
			j = Ext.get(j);
			l = l ? Ext.applyIf(l, d) : d;
			var z, D, v = 0, u = 0;
			if (j.dom == document.body || j.dom == document) {
				z = Ext.lib.Dom.getViewWidth();
				D = Ext.lib.Dom.getViewHeight()
			} else {
				z = j.dom.clientWidth;
				D = j.dom.clientHeight;
				if (!A) {
					var t = j.getXY();
					v = t[0];
					u = t[1]
				}
			}
			var r = j.getScroll();
			v += l.left + r.left;
			u += l.top + r.top;
			z -= l.right;
			D -= l.bottom;
			var B = v + z;
			var g = u + D;
			var k = n
					|| (!A ? this.getXY() : [this.getLeft(true),
							this.getTop(true)]);
			var p = k[0], o = k[1];
			var q = this.dom.offsetWidth, C = this.dom.offsetHeight;
			var m = false;
			if ((p + q) > B) {
				p = B - q;
				m = true
			}
			if ((o + C) > g) {
				o = g - C;
				m = true
			}
			if (p < v) {
				p = v;
				m = true
			}
			if (o < u) {
				o = u;
				m = true
			}
			return m ? [p, o] : false
		}
	}(),
	getCenterXY : function() {
		return this.getAlignToXY(document, "c-c")
	},
	center : function(a) {
		return this.alignTo(a || document, "c-c")
	}
});
Ext.Element.addMethods(function() {
	var d = "parentNode", b = "nextSibling", c = "previousSibling", e = Ext.DomQuery, a = Ext.get;
	return {
		findParent : function(n, m, h) {
			var k = this.dom, g = document.body, l = 0, j;
			if (Ext.isGecko
					&& Object.prototype.toString.call(k) == "[object XULElement]") {
				return null
			}
			m = m || 50;
			if (isNaN(m)) {
				j = Ext.getDom(m);
				m = Number.MAX_VALUE
			}
			while (k && k.nodeType == 1 && l < m && k != g && k != j) {
				if (e.is(k, n)) {
					return h ? a(k) : k
				}
				l++;
				k = k.parentNode
			}
			return null
		},
		findParentNode : function(k, j, g) {
			var h = Ext.fly(this.dom.parentNode, "_internal");
			return h ? h.findParent(k, j, g) : null
		},
		up : function(h, g) {
			return this.findParentNode(h, g, true)
		},
		select : function(g) {
			return Ext.Element.select(g, this.dom)
		},
		query : function(g) {
			return e.select(g, this.dom)
		},
		child : function(g, h) {
			var j = e.selectNode(g, this.dom);
			return h ? j : a(j)
		},
		down : function(g, h) {
			var j = e.selectNode(" > " + g, this.dom);
			return h ? j : a(j)
		},
		parent : function(g, h) {
			return this.matchNode(d, d, g, h)
		},
		next : function(g, h) {
			return this.matchNode(b, b, g, h)
		},
		prev : function(g, h) {
			return this.matchNode(c, c, g, h)
		},
		first : function(g, h) {
			return this.matchNode(b, "firstChild", g, h)
		},
		last : function(g, h) {
			return this.matchNode(c, "lastChild", g, h)
		},
		matchNode : function(h, l, g, j) {
			var k = this.dom[l];
			while (k) {
				if (k.nodeType == 1 && (!g || e.is(k, g))) {
					return !j ? a(k) : k
				}
				k = k[h]
			}
			return null
		}
	}
}());
Ext.Element.addMethods({
			select : function(a, b) {
				return Ext.Element.select(a, b, this.dom)
			}
		});
Ext.Element.addMethods(function() {
			var c = Ext.getDom, a = Ext.get, b = Ext.DomHelper;
			return {
				appendChild : function(d) {
					return a(d).appendTo(this)
				},
				appendTo : function(d) {
					c(d).appendChild(this.dom);
					return this
				},
				insertBefore : function(d) {
					(d = c(d)).parentNode.insertBefore(this.dom, d);
					return this
				},
				insertAfter : function(d) {
					(d = c(d)).parentNode.insertBefore(this.dom, d.nextSibling);
					return this
				},
				insertFirst : function(e, d) {
					e = e || {};
					if (e.nodeType || e.dom || typeof e == "string") {
						e = c(e);
						this.dom.insertBefore(e, this.dom.firstChild);
						return !d ? a(e) : e
					} else {
						return this.createChild(e, this.dom.firstChild, d)
					}
				},
				replace : function(d) {
					d = a(d);
					this.insertBefore(d);
					d.remove();
					return this
				},
				replaceWith : function(d) {
					var e = this;
					if (d.nodeType || d.dom || typeof d == "string") {
						d = c(d);
						e.dom.parentNode.insertBefore(d, e.dom)
					} else {
						d = b.insertBefore(e.dom, d)
					}
					delete Ext.elCache[e.id];
					Ext.removeNode(e.dom);
					e.id = Ext.id(e.dom = d);
					Ext.Element.addToCache(e.isFlyweight
							? new Ext.Element(e.dom)
							: e);
					return e
				},
				createChild : function(e, d, g) {
					e = e || {
						tag : "div"
					};
					return d
							? b.insertBefore(d, e, g !== true)
							: b[!this.dom.firstChild ? "overwrite" : "append"](
									this.dom, e, g !== true)
				},
				wrap : function(d, e) {
					var g = b.insertBefore(this.dom, d || {
								tag : "div"
							}, !e);
					g.dom ? g.dom.appendChild(this.dom) : g
							.appendChild(this.dom);
					return g
				},
				insertHtml : function(e, g, d) {
					var h = b.insertHtml(e, this.dom, g);
					return d ? Ext.get(h) : h
				}
			}
		}());
Ext.apply(Ext.Element.prototype, function() {
			var c = Ext.getDom, a = Ext.get, b = Ext.DomHelper;
			return {
				insertSibling : function(j, g, h) {
					var k = this, e, d = (g || "before").toLowerCase() == "after", l;
					if (Ext.isArray(j)) {
						l = k;
						Ext.each(j, function(m) {
									e = Ext.fly(l, "_internal").insertSibling(
											m, g, h);
									if (d) {
										l = e
									}
								});
						return e
					}
					j = j || {};
					if (j.nodeType || j.dom) {
						e = k.dom.parentNode.insertBefore(c(j), d
										? k.dom.nextSibling
										: k.dom);
						if (!h) {
							e = a(e)
						}
					} else {
						if (d && !k.dom.nextSibling) {
							e = b.append(k.dom.parentNode, j, !h)
						} else {
							e = b[d ? "insertAfter" : "insertBefore"](k.dom, j,
									!h)
						}
					}
					return e
				}
			}
		}());
Ext.Element.addMethods(function() {
	var h = {}, y = /(-[a-z])/gi, b = {}, t = document.defaultView, v = Ext.isIE
			? "styleFloat"
			: "cssFloat", D = /alpha\(opacity=(.*)\)/i, m = /^\s+|\s+$/g, B = Ext.Element, d = "padding", c = "margin", z = "border", u = "-left", r = "-right", x = "-top", p = "-bottom", k = "-width", s = Math, A = "hidden", e = "isClipped", l = "overflow", o = "overflow-x", n = "overflow-y", C = "originalClip", j = {
		l : z + u + k,
		r : z + r + k,
		t : z + x + k,
		b : z + p + k
	}, g = {
		l : d + u,
		r : d + r,
		t : d + x,
		b : d + p
	}, a = {
		l : c + u,
		r : c + r,
		t : c + x,
		b : c + p
	}, E = Ext.Element.data;
	function q(F, G) {
		return G.charAt(1).toUpperCase()
	}
	function w(F) {
		return h[F] || (h[F] = F == "float" ? v : F.replace(y, q))
	}
	return {
		adjustWidth : function(F) {
			var G = this;
			var H = Ext.isNumber(F);
			if (H && G.autoBoxAdjust && !G.isBorderBox()) {
				F -= (G.getBorderWidth("lr") + G.getPadding("lr"))
			}
			return (H && F < 0) ? 0 : F
		},
		adjustHeight : function(F) {
			var G = this;
			var H = Ext.isNumber(F);
			if (H && G.autoBoxAdjust && !G.isBorderBox()) {
				F -= (G.getBorderWidth("tb") + G.getPadding("tb"))
			}
			return (H && F < 0) ? 0 : F
		},
		addClass : function(I) {
			var J = this, H, F, G;
			I = Ext.isArray(I) ? I : [I];
			for (H = 0, F = I.length; H < F; H++) {
				G = I[H];
				if (G) {
					J.dom.className += (!J.hasClass(G) && G ? " " + G : "")
				}
			}
			return J
		},
		radioClass : function(I) {
			var J = this.dom.parentNode.childNodes, G;
			I = Ext.isArray(I) ? I : [I];
			for (var H = 0, F = J.length; H < F; H++) {
				G = J[H];
				if (G && G.nodeType == 1) {
					Ext.fly(G, "_internal").removeClass(I)
				}
			}
			return this.addClass(I)
		},
		removeClass : function(I) {
			var J = this, G;
			I = Ext.isArray(I) ? I : [I];
			if (J.dom && J.dom.className) {
				for (var H = 0, F = I.length; H < F; H++) {
					G = I[H];
					if (G) {
						J.dom.className = J.dom.className.replace(b[G] = b[G]
										|| new RegExp("(?:^|\\s+)" + G
														+ "(?:\\s+|$)", "g"),
								" ")
					}
				}
			}
			return J
		},
		toggleClass : function(F) {
			return this.hasClass(F) ? this.removeClass(F) : this.addClass(F)
		},
		hasClass : function(F) {
			return F
					&& (" " + this.dom.className + " ").indexOf(" " + F + " ") != -1
		},
		replaceClass : function(G, F) {
			return this.removeClass(G).addClass(F)
		},
		isStyle : function(F, G) {
			return this.getStyle(F) == G
		},
		getStyle : function() {
			return t && t.getComputedStyle ? function(L) {
				var I = this.dom, F, H, G, J, K = Ext.isWebKit, J;
				if (I == document) {
					return null
				}
				L = w(L);
				if (K && /marginRight/.test(L)) {
					J = this.getStyle("display");
					I.style.display = "inline-block"
				}
				G = (F = I.style[L]) ? F : (H = t.getComputedStyle(I, ""))
						? H[L]
						: null;
				if (K) {
					if (G == "rgba(0, 0, 0, 0)") {
						G = "transparent"
					} else {
						if (J) {
							I.style.display = J
						}
					}
				}
				return G
			} : function(J) {
				var H = this.dom, F, G;
				if (H == document) {
					return null
				}
				if (J == "opacity") {
					if (H.style.filter.match) {
						if (F = H.style.filter.match(D)) {
							var I = parseFloat(F[1]);
							if (!isNaN(I)) {
								return I ? I / 100 : 0
							}
						}
					}
					return 1
				}
				J = w(J);
				return H.style[J] || ((G = H.currentStyle) ? G[J] : null)
			}
		}(),
		getColor : function(F, G, K) {
			var I = this.getStyle(F), H = Ext.isDefined(K) ? K : "#", J;
			if (!I || /transparent|inherit/.test(I)) {
				return G
			}
			if (/^r/.test(I)) {
				Ext.each(I.slice(4, I.length - 1).split(","), function(L) {
							J = parseInt(L, 10);
							H += (J < 16 ? "0" : "") + J.toString(16)
						})
			} else {
				I = I.replace("#", "");
				H += I.length == 3 ? I
						.replace(/^(\w)(\w)(\w)$/, "$1$1$2$2$3$3") : I
			}
			return (H.length > 5 ? H.toLowerCase() : G)
		},
		setStyle : function(J, I) {
			var G, H, F;
			if (!Ext.isObject(J)) {
				G = {};
				G[J] = I;
				J = G
			}
			for (H in J) {
				I = J[H];
				H == "opacity" ? this.setOpacity(I) : this.dom.style[w(H)] = I
			}
			return this
		},
		setOpacity : function(G, F) {
			var J = this, H = J.dom.style;
			if (!F || !J.anim) {
				if (Ext.isIE) {
					var I = G < 1 ? "alpha(opacity=" + G * 100 + ")" : "", K = H.filter
							.replace(D, "").replace(m, "");
					H.zoom = 1;
					H.filter = K + (K.length > 0 ? " " : "") + I
				} else {
					H.opacity = G
				}
			} else {
				J.anim({
							opacity : {
								to : G
							}
						}, J.preanim(arguments, 1), null, 0.35, "easeIn")
			}
			return J
		},
		clearOpacity : function() {
			var F = this.dom.style;
			if (Ext.isIE) {
				if (!Ext.isEmpty(F.filter)) {
					F.filter = F.filter.replace(D, "").replace(m, "")
				}
			} else {
				F.opacity = F["-moz-opacity"] = F["-khtml-opacity"] = ""
			}
			return this
		},
		getHeight : function(H) {
			var G = this, J = G.dom, I = Ext.isIE
					&& G.isStyle("display", "none"), F = s.max(J.offsetHeight,
					I ? 0 : J.clientHeight)
					|| 0;
			F = !H ? F : F - G.getBorderWidth("tb") - G.getPadding("tb");
			return F < 0 ? 0 : F
		},
		getWidth : function(G) {
			var H = this, J = H.dom, I = Ext.isIE
					&& H.isStyle("display", "none"), F = s.max(J.offsetWidth, I
							? 0
							: J.clientWidth)
					|| 0;
			F = !G ? F : F - H.getBorderWidth("lr") - H.getPadding("lr");
			return F < 0 ? 0 : F
		},
		setWidth : function(G, F) {
			var H = this;
			G = H.adjustWidth(G);
			!F || !H.anim ? H.dom.style.width = H.addUnits(G) : H.anim({
						width : {
							to : G
						}
					}, H.preanim(arguments, 1));
			return H
		},
		setHeight : function(F, G) {
			var H = this;
			F = H.adjustHeight(F);
			!G || !H.anim ? H.dom.style.height = H.addUnits(F) : H.anim({
						height : {
							to : F
						}
					}, H.preanim(arguments, 1));
			return H
		},
		getBorderWidth : function(F) {
			return this.addStyles(F, j)
		},
		getPadding : function(F) {
			return this.addStyles(F, g)
		},
		clip : function() {
			var F = this, G = F.dom;
			if (!E(G, e)) {
				E(G, e, true);
				E(G, C, {
							o : F.getStyle(l),
							x : F.getStyle(o),
							y : F.getStyle(n)
						});
				F.setStyle(l, A);
				F.setStyle(o, A);
				F.setStyle(n, A)
			}
			return F
		},
		unclip : function() {
			var F = this, H = F.dom;
			if (E(H, e)) {
				E(H, e, false);
				var G = E(H, C);
				if (G.o) {
					F.setStyle(l, G.o)
				}
				if (G.x) {
					F.setStyle(o, G.x)
				}
				if (G.y) {
					F.setStyle(n, G.y)
				}
			}
			return F
		},
		addStyles : function(K, J) {
			var L = 0, G = K.match(/\w/g), I;
			for (var H = 0, F = G.length; H < F; H++) {
				I = G[H] && parseInt(this.getStyle(J[G[H]]), 10);
				if (I) {
					L += s.abs(I)
				}
			}
			return L
		},
		margins : a
	}
}());
Ext.Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
Ext.Element.addMethods(function() {
	var a = "_internal", b = /(\d+)px/;
	return {
		applyStyles : function(c) {
			Ext.DomHelper.applyStyles(this.dom, c);
			return this
		},
		getStyles : function() {
			var c = {};
			Ext.each(arguments, function(d) {
						c[d] = this.getStyle(d)
					}, this);
			return c
		},
		getStyleSize : function() {
			var j = this, c, g, k = this.dom, e = k.style;
			if (e.width && e.width != "auto") {
				c = parseInt(e.width, 10);
				if (j.isBorderBox()) {
					c -= j.getFrameWidth("lr")
				}
			}
			if (e.height && e.height != "auto") {
				g = parseInt(e.height, 10);
				if (j.isBorderBox()) {
					g -= j.getFrameWidth("tb")
				}
			}
			return {
				width : c || j.getWidth(true),
				height : g || j.getHeight(true)
			}
		},
		setOverflow : function(c) {
			var d = this.dom;
			if (c == "auto" && Ext.isMac && Ext.isGecko2) {
				d.style.overflow = "hidden";
(function		() {
					d.style.overflow = "auto"
				}).defer(1)
			} else {
				d.style.overflow = c
			}
		},
		boxWrap : function(c) {
			c = c || "x-box";
			var d = Ext.get(this.insertHtml("beforeBegin", "<div class='" + c
							+ "'>" + String.format(Ext.Element.boxMarkup, c)
							+ "</div>"));
			Ext.DomQuery.selectNode("." + c + "-mc", d.dom)
					.appendChild(this.dom);
			return d
		},
		setSize : function(e, c, d) {
			var g = this;
			if (Ext.isObject(e)) {
				c = e.height;
				e = e.width
			}
			e = g.adjustWidth(e);
			c = g.adjustHeight(c);
			if (!d || !g.anim) {
				g.dom.style.width = g.addUnits(e);
				g.dom.style.height = g.addUnits(c)
			} else {
				g.anim({
							width : {
								to : e
							},
							height : {
								to : c
							}
						}, g.preanim(arguments, 2))
			}
			return g
		},
		getComputedHeight : function() {
			var d = this, c = Math.max(d.dom.offsetHeight, d.dom.clientHeight);
			if (!c) {
				c = parseInt(d.getStyle("height"), 10) || 0;
				if (!d.isBorderBox()) {
					c += d.getFrameWidth("tb")
				}
			}
			return c
		},
		getComputedWidth : function() {
			var c = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
			if (!c) {
				c = parseInt(this.getStyle("width"), 10) || 0;
				if (!this.isBorderBox()) {
					c += this.getFrameWidth("lr")
				}
			}
			return c
		},
		getFrameWidth : function(d, c) {
			return c && this.isBorderBox() ? 0 : (this.getPadding(d) + this
					.getBorderWidth(d))
		},
		addClassOnOver : function(c) {
			this.hover(function() {
						Ext.fly(this, a).addClass(c)
					}, function() {
						Ext.fly(this, a).removeClass(c)
					});
			return this
		},
		addClassOnFocus : function(c) {
			this.on("focus", function() {
						Ext.fly(this, a).addClass(c)
					}, this.dom);
			this.on("blur", function() {
						Ext.fly(this, a).removeClass(c)
					}, this.dom);
			return this
		},
		addClassOnClick : function(c) {
			var d = this.dom;
			this.on("mousedown", function() {
						Ext.fly(d, a).addClass(c);
						var g = Ext.getDoc(), e = function() {
							Ext.fly(d, a).removeClass(c);
							g.removeListener("mouseup", e)
						};
						g.on("mouseup", e)
					});
			return this
		},
		getViewSize : function(j) {
			var q = document, l = this, g = l.dom, k = Ext.lib.Dom, m = (g == q || g == q.body), o, r, e, n = 0, s = 0, c = 0, p = 0;
			if (m) {
				return {
					width : k.getViewWidth(),
					height : k.getViewHeight()
				}
			}
			o = l.isBorderBox();
			n = l.getBorderWidth("tb");
			s = l.getBorderWidth("lr");
			c = l.getPadding("tb");
			p = l.getPadding("lr");
			if (r = l.getStyle("width").match(b)) {
				if ((r = parseInt(r[1], 10)) && o) {
					r -= (s + p)
				}
				if (!j) {
					r += p
				}
			} else {
				if (!(r = g.clientWidth) && (r = g.offsetWidth)) {
					r -= s
				}
				if (r && j) {
					r -= p
				}
			}
			if (e = l.getStyle("height").match(b)) {
				if ((e = parseInt(e[1], 10)) && o) {
					e -= (n + c)
				}
				if (!j) {
					e += c
				}
			} else {
				if (!(e = g.clientHeight) && (e = g.offsetHeight)) {
					e -= n
				}
				if (e && j) {
					e -= c
				}
			}
			return {
				width : r,
				height : e
			}
		},
		getSize : function(c) {
			return {
				width : this.getWidth(c),
				height : this.getHeight(c)
			}
		},
		repaint : function() {
			var c = this.dom;
			this.addClass("x-repaint");
			setTimeout(function() {
						Ext.fly(c).removeClass("x-repaint")
					}, 1);
			return this
		},
		unselectable : function() {
			this.dom.unselectable = "on";
			return this
					.swallowEvent("selectstart", true)
					.applyStyles("-moz-user-select:none;-khtml-user-select:none;")
					.addClass("x-unselectable")
		},
		getMargins : function(d) {
			var e = this, c, g = {
				t : "top",
				l : "left",
				r : "right",
				b : "bottom"
			}, h = {};
			if (!d) {
				for (c in e.margins) {
					h[g[c]] = parseInt(e.getStyle(e.margins[c]), 10) || 0
				}
				return h
			} else {
				return e.addStyles.call(e, d, e.margins)
			}
		}
	}
}());
(function() {
	var a = Ext.lib.Dom, b = "left", g = "right", d = "top", j = "bottom", h = "position", c = "static", e = "relative", k = "auto", l = "z-index";
	Ext.Element.addMethods({
				getX : function() {
					return a.getX(this.dom)
				},
				getY : function() {
					return a.getY(this.dom)
				},
				getXY : function() {
					return a.getXY(this.dom)
				},
				getOffsetsTo : function(m) {
					var p = this.getXY(), n = Ext.fly(m, "_internal").getXY();
					return [p[0] - n[0], p[1] - n[1]]
				},
				setX : function(m, n) {
					return this.setXY([m, this.getY()], this.animTest(
									arguments, n, 1))
				},
				setY : function(n, m) {
					return this.setXY([this.getX(), n], this.animTest(
									arguments, m, 1))
				},
				setLeft : function(m) {
					this.setStyle(b, this.addUnits(m));
					return this
				},
				setTop : function(m) {
					this.setStyle(d, this.addUnits(m));
					return this
				},
				setRight : function(m) {
					this.setStyle(g, this.addUnits(m));
					return this
				},
				setBottom : function(m) {
					this.setStyle(j, this.addUnits(m));
					return this
				},
				setXY : function(o, m) {
					var n = this;
					if (!m || !n.anim) {
						a.setXY(n.dom, o)
					} else {
						n.anim({
									points : {
										to : o
									}
								}, n.preanim(arguments, 1), "motion")
					}
					return n
				},
				setLocation : function(m, o, n) {
					return this.setXY([m, o], this.animTest(arguments, n, 2))
				},
				moveTo : function(m, o, n) {
					return this.setXY([m, o], this.animTest(arguments, n, 2))
				},
				getLeft : function(m) {
					return !m ? this.getX() : parseInt(this.getStyle(b), 10)
							|| 0
				},
				getRight : function(m) {
					var n = this;
					return !m ? n.getX() + n.getWidth() : (n.getLeft(true) + n
							.getWidth())
							|| 0
				},
				getTop : function(m) {
					return !m ? this.getY() : parseInt(this.getStyle(d), 10)
							|| 0
				},
				getBottom : function(m) {
					var n = this;
					return !m ? n.getY() + n.getHeight() : (n.getTop(true) + n
							.getHeight())
							|| 0
				},
				position : function(q, p, m, o) {
					var n = this;
					if (!q && n.isStyle(h, c)) {
						n.setStyle(h, e)
					} else {
						if (q) {
							n.setStyle(h, q)
						}
					}
					if (p) {
						n.setStyle(l, p)
					}
					if (m || o) {
						n.setXY([m || false, o || false])
					}
				},
				clearPositioning : function(m) {
					m = m || "";
					this.setStyle({
								left : m,
								right : m,
								top : m,
								bottom : m,
								"z-index" : "",
								position : c
							});
					return this
				},
				getPositioning : function() {
					var m = this.getStyle(b);
					var n = this.getStyle(d);
					return {
						position : this.getStyle(h),
						left : m,
						right : m ? "" : this.getStyle(g),
						top : n,
						bottom : n ? "" : this.getStyle(j),
						"z-index" : this.getStyle(l)
					}
				},
				setPositioning : function(m) {
					var o = this, n = o.dom.style;
					o.setStyle(m);
					if (m.right == k) {
						n.right = ""
					}
					if (m.bottom == k) {
						n.bottom = ""
					}
					return o
				},
				translatePoints : function(m, u) {
					u = isNaN(m[1]) ? u : m[1];
					m = isNaN(m[0]) ? m : m[0];
					var q = this, r = q.isStyle(h, e), s = q.getXY(), n = parseInt(
							q.getStyle(b), 10), p = parseInt(q.getStyle(d), 10);
					n = !isNaN(n) ? n : (r ? 0 : q.dom.offsetLeft);
					p = !isNaN(p) ? p : (r ? 0 : q.dom.offsetTop);
					return {
						left : (m - s[0] + n),
						top : (u - s[1] + p)
					}
				},
				animTest : function(n, m, o) {
					return !!m && this.preanim ? this.preanim(n, o) : false
				}
			})
})();
Ext.Element.addMethods({
	setBox : function(e, g, b) {
		var d = this, a = e.width, c = e.height;
		if ((g && !d.autoBoxAdjust) && !d.isBorderBox()) {
			a -= (d.getBorderWidth("lr") + d.getPadding("lr"));
			c -= (d.getBorderWidth("tb") + d.getPadding("tb"))
		}
		d.setBounds(e.x, e.y, a, c, d.animTest.call(d, arguments, b, 2));
		return d
	},
	getBox : function(k, q) {
		var n = this, x, e, p, d = n.getBorderWidth, s = n.getPadding, g, a, v, o;
		if (!q) {
			x = n.getXY()
		} else {
			e = parseInt(n.getStyle("left"), 10) || 0;
			p = parseInt(n.getStyle("top"), 10) || 0;
			x = [e, p]
		}
		var c = n.dom, u = c.offsetWidth, j = c.offsetHeight, m;
		if (!k) {
			m = {
				x : x[0],
				y : x[1],
				0 : x[0],
				1 : x[1],
				width : u,
				height : j
			}
		} else {
			g = d.call(n, "l") + s.call(n, "l");
			a = d.call(n, "r") + s.call(n, "r");
			v = d.call(n, "t") + s.call(n, "t");
			o = d.call(n, "b") + s.call(n, "b");
			m = {
				x : x[0] + g,
				y : x[1] + v,
				0 : x[0] + g,
				1 : x[1] + v,
				width : u - (g + a),
				height : j - (v + o)
			}
		}
		m.right = m.x + m.width;
		m.bottom = m.y + m.height;
		return m
	},
	move : function(k, b, c) {
		var g = this, n = g.getXY(), l = n[0], j = n[1], d = [l - b, j], m = [
				l + b, j], h = [l, j - b], a = [l, j + b], e = {
			l : d,
			left : d,
			r : m,
			right : m,
			t : h,
			top : h,
			up : h,
			b : a,
			bottom : a,
			down : a
		};
		k = k.toLowerCase();
		g.moveTo(e[k][0], e[k][1], g.animTest.call(g, arguments, c, 2))
	},
	setLeftTop : function(d, c) {
		var b = this, a = b.dom.style;
		a.left = b.addUnits(d);
		a.top = b.addUnits(c);
		return b
	},
	getRegion : function() {
		return Ext.lib.Dom.getRegion(this.dom)
	},
	setBounds : function(b, g, d, a, c) {
		var e = this;
		if (!c || !e.anim) {
			e.setSize(d, a);
			e.setLocation(b, g)
		} else {
			e.anim({
						points : {
							to : [b, g]
						},
						width : {
							to : e.adjustWidth(d)
						},
						height : {
							to : e.adjustHeight(a)
						}
					}, e.preanim(arguments, 4), "motion")
		}
		return e
	},
	setRegion : function(b, a) {
		return this.setBounds(b.left, b.top, b.right - b.left,
				b.bottom - b.top, this.animTest.call(this, arguments, a, 1))
	}
});
Ext.Element.addMethods({
	isScrollable : function() {
		var a = this.dom;
		return a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth
	},
	scrollTo : function(a, b) {
		this.dom["scroll" + (/top/i.test(a) ? "Top" : "Left")] = b;
		return this
	},
	getScroll : function() {
		var j = this.dom, h = document, a = h.body, c = h.documentElement, b, g, e;
		if (j == h || j == a) {
			if (Ext.isIE && Ext.isStrict) {
				b = c.scrollLeft;
				g = c.scrollTop
			} else {
				b = window.pageXOffset;
				g = window.pageYOffset
			}
			e = {
				left : b || (a ? a.scrollLeft : 0),
				top : g || (a ? a.scrollTop : 0)
			}
		} else {
			e = {
				left : j.scrollLeft,
				top : j.scrollTop
			}
		}
		return e
	}
});
Ext.Element.addMethods({
	scrollTo : function(b, d, a) {
		var e = /top/i.test(b), c = this, g = c.dom, h;
		if (!a || !c.anim) {
			h = "scroll" + (e ? "Top" : "Left"), g[h] = d
		} else {
			h = "scroll" + (e ? "Left" : "Top"), c.anim({
						scroll : {
							to : e ? [g[h], d] : [d, g[h]]
						}
					}, c.preanim(arguments, 2), "scroll")
		}
		return c
	},
	scrollIntoView : function(e, j) {
		var q = Ext.getDom(e) || Ext.getBody().dom, h = this.dom, g = this
				.getOffsetsTo(q), m = g[0] + q.scrollLeft, v = g[1]
				+ q.scrollTop, s = v + h.offsetHeight, d = m + h.offsetWidth, a = q.clientHeight, n = parseInt(
				q.scrollTop, 10), u = parseInt(q.scrollLeft, 10), k = n + a, p = u
				+ q.clientWidth;
		if (h.offsetHeight > a || v < n) {
			q.scrollTop = v
		} else {
			if (s > k) {
				q.scrollTop = s - a
			}
		}
		q.scrollTop = q.scrollTop;
		if (j !== false) {
			if (h.offsetWidth > q.clientWidth || m < u) {
				q.scrollLeft = m
			} else {
				if (d > p) {
					q.scrollLeft = d - q.clientWidth
				}
			}
			q.scrollLeft = q.scrollLeft
		}
		return this
	},
	scrollChildIntoView : function(b, a) {
		Ext.fly(b, "_scrollChildIntoView").scrollIntoView(this, a)
	},
	scroll : function(n, b, d) {
		if (!this.isScrollable()) {
			return
		}
		var e = this.dom, g = e.scrollLeft, q = e.scrollTop, o = e.scrollWidth, m = e.scrollHeight, j = e.clientWidth, a = e.clientHeight, c = false, p, k = {
			l : Math.min(g + b, o - j),
			r : p = Math.max(g - b, 0),
			t : Math.max(q - b, 0),
			b : Math.min(q + b, m - a)
		};
		k.d = k.b;
		k.u = k.t;
		n = n.substr(0, 1);
		if ((p = k[n]) > -1) {
			c = true;
			this.scrollTo(n == "l" || n == "r" ? "left" : "top", p, this
							.preanim(arguments, 2))
		}
		return c
	}
});
Ext.Element.VISIBILITY = 1;
Ext.Element.DISPLAY = 2;
Ext.Element.addMethods(function() {
	var h = "visibility", d = "display", b = "hidden", k = "none", a = "originalDisplay", c = "visibilityMode", e = Ext.Element.DISPLAY, g = Ext.Element.data, j = function(
			n) {
		var m = g(n, a);
		if (m === undefined) {
			g(n, a, m = "")
		}
		return m
	}, l = function(o) {
		var n = g(o, c);
		if (n === undefined) {
			g(o, c, n = 1)
		}
		return n
	};
	return {
		originalDisplay : "",
		visibilityMode : 1,
		setVisibilityMode : function(m) {
			g(this.dom, c, m);
			return this
		},
		animate : function(n, p, o, q, m) {
			this.anim(n, {
						duration : p,
						callback : o,
						easing : q
					}, m);
			return this
		},
		anim : function(p, q, n, s, o, m) {
			n = n || "run";
			q = q || {};
			var r = this, t = Ext.lib.Anim[n](r.dom, p, (q.duration || s)
							|| 0.35, (q.easing || o) || "easeOut", function() {
						if (m) {
							m.call(r)
						}
						if (q.callback) {
							q.callback.call(q.scope || r, r, q)
						}
					}, r);
			q.anim = t;
			return t
		},
		preanim : function(m, n) {
			return !m[n] ? false : (Ext.isObject(m[n]) ? m[n] : {
				duration : m[n + 1],
				callback : m[n + 2],
				easing : m[n + 3]
			})
		},
		isVisible : function() {
			return !this.isStyle(h, b) && !this.isStyle(d, k)
		},
		setVisible : function(q, n) {
			var o = this, p = o.dom, m = l(this.dom) == e;
			if (!n || !o.anim) {
				if (m) {
					o.setDisplayed(q)
				} else {
					o.fixDisplay();
					p.style.visibility = q ? "visible" : b
				}
			} else {
				if (q) {
					o.setOpacity(0.01);
					o.setVisible(true)
				}
				o.anim({
							opacity : {
								to : (q ? 1 : 0)
							}
						}, o.preanim(arguments, 1), null, 0.35, "easeIn",
						function() {
							if (!q) {
								p.style[m ? d : h] = (m) ? k : b;
								Ext.fly(p).setOpacity(1)
							}
						})
			}
			return o
		},
		toggle : function(m) {
			var n = this;
			n.setVisible(!n.isVisible(), n.preanim(arguments, 0));
			return n
		},
		setDisplayed : function(m) {
			if (typeof m == "boolean") {
				m = m ? j(this.dom) : k
			}
			this.setStyle(d, m);
			return this
		},
		fixDisplay : function() {
			var m = this;
			if (m.isStyle(d, k)) {
				m.setStyle(h, b);
				m.setStyle(d, j(this.dom));
				if (m.isStyle(d, k)) {
					m.setStyle(d, "block")
				}
			}
		},
		hide : function(m) {
			this.setVisible(false, this.preanim(arguments, 0));
			return this
		},
		show : function(m) {
			this.setVisible(true, this.preanim(arguments, 0));
			return this
		}
	}
}());
Ext.Element.addMethods(function() {
	var d = "visibility", b = "display", a = "hidden", h = "none", c = "x-masked", g = "x-masked-relative", e = Ext.Element.data;
	return {
		isVisible : function(j) {
			var k = !this.isStyle(d, a) && !this.isStyle(b, h), l = this.dom.parentNode;
			if (j !== true || !k) {
				return k
			}
			while (l && !/body/i.test(l.tagName)) {
				if (!Ext.fly(l, "_isVisible").isVisible()) {
					return false
				}
				l = l.parentNode
			}
			return true
		},
		isDisplayed : function() {
			return !this.isStyle(b, h)
		},
		enableDisplayMode : function(j) {
			this.setVisibilityMode(Ext.Element.DISPLAY);
			if (!Ext.isEmpty(j)) {
				e(this.dom, "originalDisplay", j)
			}
			return this
		},
		mask : function(k, o) {
			var q = this, m = q.dom, p = Ext.DomHelper, n = "ext-el-mask-msg", j, r;
			if (q.getStyle("position") == "static") {
				q.addClass(g)
			}
			if ((j = e(m, "maskMsg"))) {
				j.remove()
			}
			if ((j = e(m, "mask"))) {
				j.remove()
			}
			r = p.append(m, {
						cls : "ext-el-mask"
					}, true);
			e(m, "mask", r);
			q.addClass(c);
			r.setDisplayed(true);
			if (typeof k == "string") {
				var l = p.append(m, {
							cls : n,
							cn : {
								tag : "div"
							}
						}, true);
				e(m, "maskMsg", l);
				l.dom.className = o ? n + " " + o : n;
				l.dom.firstChild.innerHTML = k;
				l.setDisplayed(true);
				l.center(q)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& q.getStyle("height") == "auto") {
				r.setSize(undefined, q.getHeight())
			}
			return r
		},
		unmask : function() {
			var l = this, m = l.dom, j = e(m, "mask"), k = e(m, "maskMsg");
			if (j) {
				if (k) {
					k.remove();
					e(m, "maskMsg", undefined)
				}
				j.remove();
				e(m, "mask", undefined)
			}
			l.removeClass([c, g])
		},
		isMasked : function() {
			var j = e(this.dom, "mask");
			return j && j.isVisible()
		},
		createShim : function() {
			var j = document.createElement("iframe"), k;
			j.frameBorder = "0";
			j.className = "ext-shim";
			j.src = Ext.SSL_SECURE_URL;
			k = Ext.get(this.dom.parentNode.insertBefore(j, this.dom));
			k.autoBoxAdjust = false;
			return k
		}
	}
}());
Ext.Element.addMethods({
			addKeyListener : function(b, d, c) {
				var a;
				if (!Ext.isObject(b) || Ext.isArray(b)) {
					a = {
						key : b,
						fn : d,
						scope : c
					}
				} else {
					a = {
						key : b.key,
						shift : b.shift,
						ctrl : b.ctrl,
						alt : b.alt,
						fn : d,
						scope : c
					}
				}
				return new Ext.KeyMap(this, a)
			},
			addKeyMap : function(a) {
				return new Ext.KeyMap(this, a)
			}
		});
(function() {
	var z = null, B = undefined, l = true, u = false, k = "setX", h = "setY", a = "setXY", o = "left", m = "bottom", t = "top", n = "right", r = "height", g = "width", j = "points", x = "hidden", A = "absolute", v = "visible", e = "motion", p = "position", s = "easeOut", d = new Ext.Element.Flyweight(), w = {}, y = function(
			C) {
		return C || {}
	}, q = function(C) {
		d.dom = C;
		d.id = Ext.id(C);
		return d
	}, c = function(C) {
		if (!w[C]) {
			w[C] = []
		}
		return w[C]
	}, b = function(D, C) {
		w[D] = C
	};
	Ext.enableFx = l;
	Ext.Fx = {
		switchStatements : function(D, E, C) {
			return E.apply(this, C[D])
		},
		slideIn : function(I, F) {
			F = y(F);
			var K = this, H = K.dom, N = H.style, P, C, M, E, D, N, J, O, L, G;
			I = I || "t";
			K.queueFx(F, function() {
				P = q(H).getXY();
				q(H).fixDisplay();
				C = q(H).getFxRestore();
				M = {
					x : P[0],
					y : P[1],
					0 : P[0],
					1 : P[1],
					width : H.offsetWidth,
					height : H.offsetHeight
				};
				M.right = M.x + M.width;
				M.bottom = M.y + M.height;
				q(H).setWidth(M.width).setHeight(M.height);
				E = q(H).fxWrap(C.pos, F, x);
				N.visibility = v;
				N.position = A;
				function Q() {
					q(H).fxUnwrap(E, C.pos, F);
					N.width = C.width;
					N.height = C.height;
					q(H).afterFx(F)
				}
				O = {
					to : [M.x, M.y]
				};
				L = {
					to : M.width
				};
				G = {
					to : M.height
				};
				function R(V, S, W, T, Y, aa, ad, ac, ab, X, U) {
					var Z = {};
					q(V).setWidth(W).setHeight(T);
					if (q(V)[Y]) {
						q(V)[Y](aa)
					}
					S[ad] = S[ac] = "0";
					if (ab) {
						Z.width = ab
					}
					if (X) {
						Z.height = X
					}
					if (U) {
						Z.points = U
					}
					return Z
				}
				J = q(H).switchStatements(I.toLowerCase(), R, {
							t : [E, N, M.width, 0, z, z, o, m, z, G, z],
							l : [E, N, 0, M.height, z, z, n, t, L, z, z],
							r : [E, N, M.width, M.height, k, M.right, o, t, z,
									z, O],
							b : [E, N, M.width, M.height, h, M.bottom, o, t, z,
									G, O],
							tl : [E, N, 0, 0, z, z, n, m, L, G, O],
							bl : [E, N, 0, 0, h, M.y + M.height, n, t, L, G, O],
							br : [E, N, 0, 0, a, [M.right, M.bottom], o, t, L,
									G, O],
							tr : [E, N, 0, 0, k, M.x + M.width, o, m, L, G, O]
						});
				N.visibility = v;
				q(E).show();
				arguments.callee.anim = q(E).fxanim(J, F, e, 0.5, s, Q)
			});
			return K
		},
		slideOut : function(G, E) {
			E = y(E);
			var I = this, F = I.dom, L = F.style, M = I.getXY(), D, C, J, K, H = {
				to : 0
			};
			G = G || "t";
			I.queueFx(E, function() {
						C = q(F).getFxRestore();
						J = {
							x : M[0],
							y : M[1],
							0 : M[0],
							1 : M[1],
							width : F.offsetWidth,
							height : F.offsetHeight
						};
						J.right = J.x + J.width;
						J.bottom = J.y + J.height;
						q(F).setWidth(J.width).setHeight(J.height);
						D = q(F).fxWrap(C.pos, E, v);
						L.visibility = v;
						L.position = A;
						q(D).setWidth(J.width).setHeight(J.height);
						function N() {
							E.useDisplay ? q(F).setDisplayed(u) : q(F).hide();
							q(F).fxUnwrap(D, C.pos, E);
							L.width = C.width;
							L.height = C.height;
							q(F).afterFx(E)
						}
						function O(P, X, V, Y, T, W, S, U, R) {
							var Q = {};
							P[X] = P[V] = "0";
							Q[Y] = T;
							if (W) {
								Q[W] = S
							}
							if (U) {
								Q[U] = R
							}
							return Q
						}
						K = q(F).switchStatements(G.toLowerCase(), O, {
									t : [L, o, m, r, H],
									l : [L, n, t, g, H],
									r : [L, o, t, g, H, j, {
												to : [J.right, J.y]
											}],
									b : [L, o, t, r, H, j, {
												to : [J.x, J.bottom]
											}],
									tl : [L, n, m, g, H, r, H],
									bl : [L, n, t, g, H, r, H, j, {
												to : [J.x, J.bottom]
											}],
									br : [L, o, t, g, H, r, H, j, {
												to : [J.x + J.width, J.bottom]
											}],
									tr : [L, o, m, g, H, r, H, j, {
												to : [J.right, J.y]
											}]
								});
						arguments.callee.anim = q(D).fxanim(K, E, e, 0.5, s, N)
					});
			return I
		},
		puff : function(I) {
			I = y(I);
			var G = this, H = G.dom, D = H.style, E, C, F;
			G.queueFx(I, function() {
						E = q(H).getWidth();
						C = q(H).getHeight();
						q(H).clearOpacity();
						q(H).show();
						F = q(H).getFxRestore();
						function J() {
							I.useDisplay ? q(H).setDisplayed(u) : q(H).hide();
							q(H).clearOpacity();
							q(H).setPositioning(F.pos);
							D.width = F.width;
							D.height = F.height;
							D.fontSize = "";
							q(H).afterFx(I)
						}
						arguments.callee.anim = q(H).fxanim({
									width : {
										to : q(H).adjustWidth(E * 2)
									},
									height : {
										to : q(H).adjustHeight(C * 2)
									},
									points : {
										by : [-E * 0.5, -C * 0.5]
									},
									opacity : {
										to : 0
									},
									fontSize : {
										to : 200,
										unit : "%"
									}
								}, I, e, 0.5, s, J)
					});
			return G
		},
		switchOff : function(G) {
			G = y(G);
			var E = this, F = E.dom, C = F.style, D;
			E.queueFx(G, function() {
				q(F).clearOpacity();
				q(F).clip();
				D = q(F).getFxRestore();
				function H() {
					G.useDisplay ? q(F).setDisplayed(u) : q(F).hide();
					q(F).clearOpacity();
					q(F).setPositioning(D.pos);
					C.width = D.width;
					C.height = D.height;
					q(F).afterFx(G)
				}
				q(F).fxanim({
							opacity : {
								to : 0.3
							}
						}, z, z, 0.1, z, function() {
							q(F).clearOpacity();
							(function() {
								q(F).fxanim({
											height : {
												to : 1
											},
											points : {
												by : [0, q(F).getHeight() * 0.5]
											}
										}, G, e, 0.3, "easeIn", H)
							}).defer(100)
						})
			});
			return E
		},
		highlight : function(E, I) {
			I = y(I);
			var G = this, H = G.dom, C = I.attr || "backgroundColor", D = {}, F;
			G.queueFx(I, function() {
						q(H).clearOpacity();
						q(H).show();
						function J() {
							H.style[C] = F;
							q(H).afterFx(I)
						}
						F = H.style[C];
						D[C] = {
							from : E || "ffff9c",
							to : I.endColor || q(H).getColor(C) || "ffffff"
						};
						arguments.callee.anim = q(H).fxanim(D, I, "color", 1,
								"easeIn", J)
					});
			return G
		},
		frame : function(C, F, I) {
			I = y(I);
			var E = this, H = E.dom, D, G;
			E.queueFx(I, function() {
						C = C || "#C3DAF9";
						if (C.length == 6) {
							C = "#" + C
						}
						F = F || 1;
						q(H).show();
						var M = q(H).getXY(), K = {
							x : M[0],
							y : M[1],
							0 : M[0],
							1 : M[1],
							width : H.offsetWidth,
							height : H.offsetHeight
						}, J = function() {
							D = q(document.body || document.documentElement)
									.createChild({
												style : {
													position : A,
													"z-index" : 35000,
													border : "0px solid " + C
												}
											});
							return D.queueFx({}, L)
						};
						arguments.callee.anim = {
							isAnimated : true,
							stop : function() {
								F = 0;
								D.stopFx()
							}
						};
						function L() {
							var N = Ext.isBorderBox ? 2 : 1;
							G = D.anim({
										top : {
											from : K.y,
											to : K.y - 20
										},
										left : {
											from : K.x,
											to : K.x - 20
										},
										borderWidth : {
											from : 0,
											to : 10
										},
										opacity : {
											from : 1,
											to : 0
										},
										height : {
											from : K.height,
											to : K.height + 20 * N
										},
										width : {
											from : K.width,
											to : K.width + 20 * N
										}
									}, {
										duration : I.duration || 1,
										callback : function() {
											D.remove();
											--F > 0 ? J() : q(H).afterFx(I)
										}
									});
							arguments.callee.anim = {
								isAnimated : true,
								stop : function() {
									G.stop()
								}
							}
						}
						J()
					});
			return E
		},
		pause : function(E) {
			var D = this.dom, C;
			this.queueFx({}, function() {
						C = setTimeout(function() {
									q(D).afterFx({})
								}, E * 1000);
						arguments.callee.anim = {
							isAnimated : true,
							stop : function() {
								clearTimeout(C);
								q(D).afterFx({})
							}
						}
					});
			return this
		},
		fadeIn : function(E) {
			E = y(E);
			var C = this, D = C.dom, F = E.endOpacity || 1;
			C.queueFx(E, function() {
						q(D).setOpacity(0);
						q(D).fixDisplay();
						D.style.visibility = v;
						arguments.callee.anim = q(D).fxanim({
									opacity : {
										to : F
									}
								}, E, z, 0.5, s, function() {
									if (F == 1) {
										q(D).clearOpacity()
									}
									q(D).afterFx(E)
								})
					});
			return C
		},
		fadeOut : function(F) {
			F = y(F);
			var D = this, E = D.dom, C = E.style, G = F.endOpacity || 0;
			D.queueFx(F, function() {
				arguments.callee.anim = q(E).fxanim({
							opacity : {
								to : G
							}
						}, F, z, 0.5, s, function() {
							if (G == 0) {
								Ext.Element.data(E, "visibilityMode") == Ext.Element.DISPLAY
										|| F.useDisplay
										? C.display = "none"
										: C.visibility = x;
								q(E).clearOpacity()
							}
							q(E).afterFx(F)
						})
			});
			return D
		},
		scale : function(C, D, E) {
			this.shift(Ext.apply({}, E, {
						width : C,
						height : D
					}));
			return this
		},
		shift : function(E) {
			E = y(E);
			var D = this.dom, C = {};
			this.queueFx(E, function() {
						for (var F in E) {
							if (E[F] != B) {
								C[F] = {
									to : E[F]
								}
							}
						}
						C.width ? C.width.to = q(D).adjustWidth(E.width) : C;
						C.height ? C.height.to = q(D).adjustWidth(E.height) : C;
						if (C.x || C.y || C.xy) {
							C.points = C.xy || {
								to : [C.x ? C.x.to : q(D).getX(),
										C.y ? C.y.to : q(D).getY()]
							}
						}
						arguments.callee.anim = q(D).fxanim(C, E, e, 0.35, s,
								function() {
									q(D).afterFx(E)
								})
					});
			return this
		},
		ghost : function(F, D) {
			D = y(D);
			var H = this, E = H.dom, K = E.style, I = {
				opacity : {
					to : 0
				},
				points : {}
			}, L = I.points, C, J, G;
			F = F || "b";
			H.queueFx(D, function() {
						C = q(E).getFxRestore();
						J = q(E).getWidth();
						G = q(E).getHeight();
						function M() {
							D.useDisplay ? q(E).setDisplayed(u) : q(E).hide();
							q(E).clearOpacity();
							q(E).setPositioning(C.pos);
							K.width = C.width;
							K.height = C.height;
							q(E).afterFx(D)
						}
						L.by = q(E).switchStatements(F.toLowerCase(),
								function(O, N) {
									return [O, N]
								}, {
									t : [0, -G],
									l : [-J, 0],
									r : [J, 0],
									b : [0, G],
									tl : [-J, -G],
									bl : [-J, G],
									br : [J, G],
									tr : [J, -G]
								});
						arguments.callee.anim = q(E).fxanim(I, D, e, 0.5, s, M)
					});
			return H
		},
		syncFx : function() {
			var C = this;
			C.fxDefaults = Ext.apply(C.fxDefaults || {}, {
						block : u,
						concurrent : l,
						stopFx : u
					});
			return C
		},
		sequenceFx : function() {
			var C = this;
			C.fxDefaults = Ext.apply(C.fxDefaults || {}, {
						block : u,
						concurrent : u,
						stopFx : u
					});
			return C
		},
		nextFx : function() {
			var C = c(this.dom.id)[0];
			if (C) {
				C.call(this)
			}
		},
		hasActiveFx : function() {
			return c(this.dom.id)[0]
		},
		stopFx : function(C) {
			var D = this, F = D.dom.id;
			if (D.hasActiveFx()) {
				var E = c(F)[0];
				if (E && E.anim) {
					if (E.anim.isAnimated) {
						b(F, [E]);
						E.anim.stop(C !== undefined ? C : l)
					} else {
						b(F, [])
					}
				}
			}
			return D
		},
		beforeFx : function(C) {
			if (this.hasActiveFx() && !C.concurrent) {
				if (C.stopFx) {
					this.stopFx();
					return l
				}
				return u
			}
			return l
		},
		hasFxBlock : function() {
			var C = c(this.dom.id);
			return C && C[0] && C[0].block
		},
		queueFx : function(F, C) {
			var D = q(this.dom);
			if (!D.hasFxBlock()) {
				Ext.applyIf(F, D.fxDefaults);
				if (!F.concurrent) {
					var E = D.beforeFx(F);
					C.block = F.block;
					c(D.dom.id).push(C);
					if (E) {
						D.nextFx()
					}
				} else {
					C.call(D)
				}
			}
			return D
		},
		fxWrap : function(I, G, E) {
			var F = this.dom, D, C;
			if (!G.wrap || !(D = Ext.getDom(G.wrap))) {
				if (G.fixPosition) {
					C = q(F).getXY()
				}
				var H = document.createElement("div");
				H.style.visibility = E;
				D = F.parentNode.insertBefore(H, F);
				q(D).setPositioning(I);
				if (q(D).isStyle(p, "static")) {
					q(D).position("relative")
				}
				q(F).clearPositioning("auto");
				q(D).clip();
				D.appendChild(F);
				if (C) {
					q(D).setXY(C)
				}
			}
			return D
		},
		fxUnwrap : function(D, G, F) {
			var E = this.dom;
			q(E).clearPositioning();
			q(E).setPositioning(G);
			if (!F.wrap) {
				var C = q(D).dom.parentNode;
				C.insertBefore(E, D);
				q(D).remove()
			}
		},
		getFxRestore : function() {
			var C = this.dom.style;
			return {
				pos : this.getPositioning(),
				width : C.width,
				height : C.height
			}
		},
		afterFx : function(D) {
			var C = this.dom, E = C.id;
			if (D.afterStyle) {
				q(C).setStyle(D.afterStyle)
			}
			if (D.afterCls) {
				q(C).addClass(D.afterCls)
			}
			if (D.remove == l) {
				q(C).remove()
			}
			if (D.callback) {
				D.callback.call(D.scope, q(C))
			}
			if (!D.concurrent) {
				c(E).shift();
				q(C).nextFx()
			}
		},
		fxanim : function(F, G, D, H, E, C) {
			D = D || "run";
			G = G || {};
			var I = Ext.lib.Anim[D](this.dom, F, (G.duration || H) || 0.35,
					(G.easing || E) || s, C, this);
			G.anim = I;
			return I
		}
	};
	Ext.Fx.resize = Ext.Fx.scale;
	Ext.Element.addMethods(Ext.Fx)
})();
Ext.CompositeElementLite = function(b, a) {
	this.elements = [];
	this.add(b, a);
	this.el = new Ext.Element.Flyweight()
};
Ext.CompositeElementLite.prototype = {
	isComposite : true,
	getElement : function(a) {
		var b = this.el;
		b.dom = a;
		b.id = a.id;
		return b
	},
	transformElement : function(a) {
		return Ext.getDom(a)
	},
	getCount : function() {
		return this.elements.length
	},
	add : function(d, b) {
		var e = this, g = e.elements;
		if (!d) {
			return this
		}
		if (Ext.isString(d)) {
			d = Ext.Element.selectorFunction(d, b)
		} else {
			if (d.isComposite) {
				d = d.elements
			} else {
				if (!Ext.isIterable(d)) {
					d = [d]
				}
			}
		}
		for (var c = 0, a = d.length; c < a; ++c) {
			g.push(e.transformElement(d[c]))
		}
		return e
	},
	invoke : function(d, b) {
		var g = this, c = g.elements, a = c.length, h;
		for (i = 0; i < a; i++) {
			h = c[i];
			if (h) {
				Ext.Element.prototype[d].apply(g.getElement(h), b)
			}
		}
		return g
	},
	item : function(b) {
		var d = this, c = d.elements[b], a = null;
		if (c) {
			a = d.getElement(c)
		}
		return a
	},
	addListener : function(b, j, h, g) {
		var d = this.elements, a = d.length, c, k;
		for (c = 0; c < a; c++) {
			k = d[c];
			if (k) {
				Ext.EventManager.on(k, b, j, h || k, g)
			}
		}
		return this
	},
	each : function(g, d) {
		var h = this, c = h.elements, a = c.length, b, j;
		for (b = 0; b < a; b++) {
			j = c[b];
			if (j) {
				j = this.getElement(j);
				if (g.call(d || j, j, h, b)) {
					break
				}
			}
		}
		return h
	},
	fill : function(a) {
		var b = this;
		b.elements = [];
		b.add(a);
		return b
	},
	filter : function(a) {
		var b = [], d = this, e = d.elements, c = Ext.isFunction(a)
				? a
				: function(g) {
					return g.is(a)
				};
		d.each(function(j, g, h) {
					if (c(j, h) !== false) {
						b[b.length] = d.transformElement(j)
					}
				});
		d.elements = b;
		return d
	},
	indexOf : function(a) {
		return this.elements.indexOf(this.transformElement(a))
	},
	replaceElement : function(e, c, a) {
		var b = !isNaN(e) ? e : this.indexOf(e), g;
		if (b > -1) {
			c = Ext.getDom(c);
			if (a) {
				g = this.elements[b];
				g.parentNode.insertBefore(c, g);
				Ext.removeNode(g)
			}
			this.elements.splice(b, 1, c)
		}
		return this
	},
	clear : function() {
		this.elements = []
	}
};
Ext.CompositeElementLite.prototype.on = Ext.CompositeElementLite.prototype.addListener;
(function() {
	var c, b = Ext.Element.prototype, a = Ext.CompositeElementLite.prototype;
	for (c in b) {
		if (Ext.isFunction(b[c])) {
			(function(d) {
				a[d] = a[d] || function() {
					return this.invoke(d, arguments)
				}
			}).call(a, c)
		}
	}
})();
if (Ext.DomQuery) {
	Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function(a, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
			throw "Invalid selector"
		}
	}
	return new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
Ext.apply(Ext.CompositeElementLite.prototype, {
			addElements : function(c, a) {
				if (!c) {
					return this
				}
				if (typeof c == "string") {
					c = Ext.Element.selectorFunction(c, a)
				}
				var b = this.elements;
				Ext.each(c, function(d) {
							b.push(Ext.get(d))
						});
				return this
			},
			first : function() {
				return this.item(0)
			},
			last : function() {
				return this.item(this.getCount() - 1)
			},
			contains : function(a) {
				return this.indexOf(a) != -1
			},
			removeElement : function(d, e) {
				var c = this, a = this.elements, b;
				Ext.each(d, function(g) {
							if ((b = (a[g] || a[g = c.indexOf(g)]))) {
								if (e) {
									if (b.dom) {
										b.remove()
									} else {
										Ext.removeNode(b)
									}
								}
								a.splice(g, 1)
							}
						});
				return this
			}
		});
Ext.CompositeElement = function(b, a) {
	this.elements = [];
	this.add(b, a)
};
Ext.extend(Ext.CompositeElement, Ext.CompositeElementLite, {
			getElement : function(a) {
				return a
			},
			transformElement : function(a) {
				return Ext.get(a)
			}
		});
Ext.Element.select = function(a, d, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
			throw "Invalid selector"
		}
	}
	return (d === true)
			? new Ext.CompositeElement(c)
			: new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
(function() {
	var b = "beforerequest", e = "requestcomplete", d = "requestexception", h = undefined, c = "load", j = "POST", a = "GET", g = window;
	Ext.data.Connection = function(k) {
		Ext.apply(this, k);
		this.addEvents(b, e, d);
		Ext.data.Connection.superclass.constructor.call(this)
	};
	Ext.extend(Ext.data.Connection, Ext.util.Observable, {
		timeout : 30000,
		autoAbort : false,
		disableCaching : true,
		disableCachingParam : "_dc",
		request : function(q) {
			var t = this;
			if (t.fireEvent(b, t, q)) {
				if (q.el) {
					if (!Ext.isEmpty(q.indicatorText)) {
						t.indicatorText = '<div class="loading-indicator">'
								+ q.indicatorText + "</div>"
					}
					if (t.indicatorText) {
						Ext.getDom(q.el).innerHTML = t.indicatorText
					}
					q.success = (Ext.isFunction(q.success)
							? q.success
							: function() {
							}).createInterceptor(function(o) {
								Ext.getDom(q.el).innerHTML = o.responseText
							})
				}
				var m = q.params, l = q.url || t.url, k, r = {
					success : t.handleResponse,
					failure : t.handleFailure,
					scope : t,
					argument : {
						options : q
					},
					timeout : q.timeout || t.timeout
				}, n, u;
				if (Ext.isFunction(m)) {
					m = m.call(q.scope || g, q)
				}
				m = Ext.urlEncode(t.extraParams, Ext.isObject(m) ? Ext
								.urlEncode(m) : m);
				if (Ext.isFunction(l)) {
					l = l.call(q.scope || g, q)
				}
				if ((n = Ext.getDom(q.form))) {
					l = l || n.action;
					if (q.isUpload
							|| /multipart\/form-data/i.test(n
									.getAttribute("enctype"))) {
						return t.doFormUpload.call(t, q, m, l)
					}
					u = Ext.lib.Ajax.serializeForm(n);
					m = m ? (m + "&" + u) : u
				}
				k = q.method || t.method
						|| ((m || q.xmlData || q.jsonData) ? j : a);
				if (k === a && (t.disableCaching && q.disableCaching !== false)
						|| q.disableCaching === true) {
					var s = q.disableCachingParam || t.disableCachingParam;
					l = Ext.urlAppend(l, s + "=" + (new Date().getTime()))
				}
				q.headers = Ext.apply(q.headers || {}, t.defaultHeaders || {});
				if (q.autoAbort === true || t.autoAbort) {
					t.abort()
				}
				if ((k == a || q.xmlData || q.jsonData) && m) {
					l = Ext.urlAppend(l, m);
					m = ""
				}
				return (t.transId = Ext.lib.Ajax.request(k, l, r, m, q))
			} else {
				return q.callback ? q.callback.apply(q.scope, [q, h, h]) : null
			}
		},
		isLoading : function(k) {
			return k ? Ext.lib.Ajax.isCallInProgress(k) : !!this.transId
		},
		abort : function(k) {
			if (k || this.isLoading()) {
				Ext.lib.Ajax.abort(k || this.transId)
			}
		},
		handleResponse : function(k) {
			this.transId = false;
			var l = k.argument.options;
			k.argument = l ? l.argument : null;
			this.fireEvent(e, this, k, l);
			if (l.success) {
				l.success.call(l.scope, k, l)
			}
			if (l.callback) {
				l.callback.call(l.scope, l, true, k)
			}
		},
		handleFailure : function(k, m) {
			this.transId = false;
			var l = k.argument.options;
			k.argument = l ? l.argument : null;
			this.fireEvent(d, this, k, l, m);
			if (l.failure) {
				l.failure.call(l.scope, k, l)
			}
			if (l.callback) {
				l.callback.call(l.scope, l, false, k)
			}
		},
		doFormUpload : function(r, k, l) {
			var m = Ext.id(), w = document, s = w.createElement("iframe"), n = Ext
					.getDom(r.form), v = [], u, q = "multipart/form-data", p = {
				target : n.target,
				method : n.method,
				encoding : n.encoding,
				enctype : n.enctype,
				action : n.action
			};
			Ext.fly(s).set({
						id : m,
						name : m,
						cls : "x-hidden",
						src : Ext.SSL_SECURE_URL
					});
			w.body.appendChild(s);
			if (Ext.isIE) {
				document.frames[m].name = m
			}
			Ext.fly(n).set({
						target : m,
						method : j,
						enctype : q,
						encoding : q,
						action : l || p.action
					});
			Ext.iterate(Ext.urlDecode(k, false), function(x, o) {
						u = w.createElement("input");
						Ext.fly(u).set({
									type : "hidden",
									value : o,
									name : x
								});
						n.appendChild(u);
						v.push(u)
					});
			function t() {
				var y = this, x = {
					responseText : "",
					responseXML : null,
					argument : r.argument
				}, B, A;
				try {
					B = s.contentWindow.document || s.contentDocument
							|| g.frames[m].document;
					if (B) {
						if (B.body) {
							if (/textarea/i
									.test((A = B.body.firstChild || {}).tagName)) {
								x.responseText = A.value
							} else {
								x.responseText = B.body.innerHTML
							}
						}
						x.responseXML = B.XMLDocument || B
					}
				} catch (z) {
				}
				Ext.EventManager.removeListener(s, c, t, y);
				y.fireEvent(e, y, x, r);
				function o(E, D, C) {
					if (Ext.isFunction(E)) {
						E.apply(D, C)
					}
				}
				o(r.success, r.scope, [x, r]);
				o(r.callback, r.scope, [r, true, x]);
				if (!y.debugUploads) {
					setTimeout(function() {
								Ext.removeNode(s)
							}, 100)
				}
			}
			Ext.EventManager.on(s, c, t, this);
			n.submit();
			Ext.fly(n).set(p);
			Ext.each(v, function(o) {
						Ext.removeNode(o)
					})
		}
	})
})();
Ext.Ajax = new Ext.data.Connection({
			autoAbort : false,
			serializeForm : function(a) {
				return Ext.lib.Ajax.serializeForm(a)
			}
		});
Ext.UpdateManager = Ext.Updater = Ext.extend(Ext.util.Observable, function() {
	var b = "beforeupdate", d = "update", c = "failure";
	function a(h) {
		var j = this;
		j.transaction = null;
		if (h.argument.form && h.argument.reset) {
			try {
				h.argument.form.reset()
			} catch (k) {
			}
		}
		if (j.loadScripts) {
			j.renderer.render(j.el, h, j, g.createDelegate(j, [h]))
		} else {
			j.renderer.render(j.el, h, j);
			g.call(j, h)
		}
	}
	function g(h, j, k) {
		this.fireEvent(j || d, this.el, h);
		if (Ext.isFunction(h.argument.callback)) {
			h.argument.callback.call(h.argument.scope, this.el, Ext.isEmpty(k)
							? true
							: false, h, h.argument.options)
		}
	}
	function e(h) {
		g.call(this, h, c, !!(this.transaction = null))
	}
	return {
		constructor : function(j, h) {
			var k = this;
			j = Ext.get(j);
			if (!h && j.updateManager) {
				return j.updateManager
			}
			k.el = j;
			k.defaultUrl = null;
			k.addEvents(b, d, c);
			Ext.apply(k, Ext.Updater.defaults);
			k.transaction = null;
			k.refreshDelegate = k.refresh.createDelegate(k);
			k.updateDelegate = k.update.createDelegate(k);
			k.formUpdateDelegate = (k.formUpdate || function() {
			}).createDelegate(k);
			k.renderer = k.renderer || k.getDefaultRenderer();
			Ext.Updater.superclass.constructor.call(k)
		},
		setRenderer : function(h) {
			this.renderer = h
		},
		getRenderer : function() {
			return this.renderer
		},
		getDefaultRenderer : function() {
			return new Ext.Updater.BasicRenderer()
		},
		setDefaultUrl : function(h) {
			this.defaultUrl = h
		},
		getEl : function() {
			return this.el
		},
		update : function(j, p, q, m) {
			var l = this, h, k;
			if (l.fireEvent(b, l.el, j, p) !== false) {
				if (Ext.isObject(j)) {
					h = j;
					j = h.url;
					p = p || h.params;
					q = q || h.callback;
					m = m || h.discardUrl;
					k = h.scope;
					if (!Ext.isEmpty(h.nocache)) {
						l.disableCaching = h.nocache
					}
					if (!Ext.isEmpty(h.text)) {
						l.indicatorText = '<div class="loading-indicator">'
								+ h.text + "</div>"
					}
					if (!Ext.isEmpty(h.scripts)) {
						l.loadScripts = h.scripts
					}
					if (!Ext.isEmpty(h.timeout)) {
						l.timeout = h.timeout
					}
				}
				l.showLoading();
				if (!m) {
					l.defaultUrl = j
				}
				if (Ext.isFunction(j)) {
					j = j.call(l)
				}
				var n = Ext.apply({}, {
					url : j,
					params : (Ext.isFunction(p) && k) ? p.createDelegate(k) : p,
					success : a,
					failure : e,
					scope : l,
					callback : undefined,
					timeout : (l.timeout * 1000),
					disableCaching : l.disableCaching,
					argument : {
						options : h,
						url : j,
						form : null,
						callback : q,
						scope : k || window,
						params : p
					}
				}, h);
				l.transaction = Ext.Ajax.request(n)
			}
		},
		formUpdate : function(l, h, k, m) {
			var j = this;
			if (j.fireEvent(b, j.el, l, h) !== false) {
				if (Ext.isFunction(h)) {
					h = h.call(j)
				}
				l = Ext.getDom(l);
				j.transaction = Ext.Ajax.request({
							form : l,
							url : h,
							success : a,
							failure : e,
							scope : j,
							timeout : (j.timeout * 1000),
							argument : {
								url : h,
								form : l,
								callback : m,
								reset : k
							}
						});
				j.showLoading.defer(1, j)
			}
		},
		startAutoRefresh : function(j, k, m, n, h) {
			var l = this;
			if (h) {
				l.update(k || l.defaultUrl, m, n, true)
			}
			if (l.autoRefreshProcId) {
				clearInterval(l.autoRefreshProcId)
			}
			l.autoRefreshProcId = setInterval(l.update.createDelegate(l, [
									k || l.defaultUrl, m, n, true]), j * 1000)
		},
		stopAutoRefresh : function() {
			if (this.autoRefreshProcId) {
				clearInterval(this.autoRefreshProcId);
				delete this.autoRefreshProcId
			}
		},
		isAutoRefreshing : function() {
			return !!this.autoRefreshProcId
		},
		showLoading : function() {
			if (this.showLoadIndicator) {
				this.el.dom.innerHTML = this.indicatorText
			}
		},
		abort : function() {
			if (this.transaction) {
				Ext.Ajax.abort(this.transaction)
			}
		},
		isUpdating : function() {
			return this.transaction
					? Ext.Ajax.isLoading(this.transaction)
					: false
		},
		refresh : function(h) {
			if (this.defaultUrl) {
				this.update(this.defaultUrl, null, h, true)
			}
		}
	}
}());
Ext.Updater.defaults = {
	timeout : 30,
	disableCaching : false,
	showLoadIndicator : true,
	indicatorText : '<div class="loading-indicator">Loading...</div>',
	loadScripts : false,
	sslBlankUrl : Ext.SSL_SECURE_URL
};
Ext.Updater.updateElement = function(d, c, e, b) {
	var a = Ext.get(d).getUpdater();
	Ext.apply(a, b);
	a.update(c, e, b ? b.callback : null)
};
Ext.Updater.BasicRenderer = function() {
};
Ext.Updater.BasicRenderer.prototype = {
	render : function(c, a, b, d) {
		c.update(a.responseText, b.loadScripts, d)
	}
};
(function() {
	Date.useStrict = false;
	function b(d) {
		var c = Array.prototype.slice.call(arguments, 1);
		return d.replace(/\{(\d+)\}/g, function(e, g) {
					return c[g]
				})
	}
	Date.formatCodeToRegex = function(d, c) {
		var e = Date.parseCodes[d];
		if (e) {
			e = typeof e == "function" ? e() : e;
			Date.parseCodes[d] = e
		}
		return e ? Ext.applyIf({
					c : e.c ? b(e.c, c || "{0}") : e.c
				}, e) : {
			g : 0,
			c : null,
			s : Ext.escapeRe(d)
		}
	};
	var a = Date.formatCodeToRegex;
	Ext.apply(Date, {
		parseFunctions : {
			"M$" : function(d, c) {
				var e = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
				var g = (d || "").match(e);
				return g ? new Date(((g[1] || "") + g[2]) * 1) : null
			}
		},
		parseRegexes : [],
		formatFunctions : {
			"M$" : function() {
				return "\\/Date(" + this.getTime() + ")\\/"
			}
		},
		y2kYear : 50,
		MILLI : "ms",
		SECOND : "s",
		MINUTE : "mi",
		HOUR : "h",
		DAY : "d",
		MONTH : "mo",
		YEAR : "y",
		defaults : {},
		dayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday"],
		monthNames : ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November",
				"December"],
		monthNumbers : {
			Jan : 0,
			Feb : 1,
			Mar : 2,
			Apr : 3,
			May : 4,
			Jun : 5,
			Jul : 6,
			Aug : 7,
			Sep : 8,
			Oct : 9,
			Nov : 10,
			Dec : 11
		},
		getShortMonthName : function(c) {
			return Date.monthNames[c].substring(0, 3)
		},
		getShortDayName : function(c) {
			return Date.dayNames[c].substring(0, 3)
		},
		getMonthNumber : function(c) {
			return Date.monthNumbers[c.substring(0, 1).toUpperCase()
					+ c.substring(1, 3).toLowerCase()]
		},
		formatCodes : {
			d : "String.leftPad(this.getDate(), 2, '0')",
			D : "Date.getShortDayName(this.getDay())",
			j : "this.getDate()",
			l : "Date.dayNames[this.getDay()]",
			N : "(this.getDay() ? this.getDay() : 7)",
			S : "this.getSuffix()",
			w : "this.getDay()",
			z : "this.getDayOfYear()",
			W : "String.leftPad(this.getWeekOfYear(), 2, '0')",
			F : "Date.monthNames[this.getMonth()]",
			m : "String.leftPad(this.getMonth() + 1, 2, '0')",
			M : "Date.getShortMonthName(this.getMonth())",
			n : "(this.getMonth() + 1)",
			t : "this.getDaysInMonth()",
			L : "(this.isLeapYear() ? 1 : 0)",
			o : "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
			Y : "this.getFullYear()",
			y : "('' + this.getFullYear()).substring(2, 4)",
			a : "(this.getHours() < 12 ? 'am' : 'pm')",
			A : "(this.getHours() < 12 ? 'AM' : 'PM')",
			g : "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
			G : "this.getHours()",
			h : "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
			H : "String.leftPad(this.getHours(), 2, '0')",
			i : "String.leftPad(this.getMinutes(), 2, '0')",
			s : "String.leftPad(this.getSeconds(), 2, '0')",
			u : "String.leftPad(this.getMilliseconds(), 3, '0')",
			O : "this.getGMTOffset()",
			P : "this.getGMTOffset(true)",
			T : "this.getTimezone()",
			Z : "(this.getTimezoneOffset() * -60)",
			c : function() {
				for (var k = "Y-m-dTH:i:sP", h = [], g = 0, d = k.length; g < d; ++g) {
					var j = k.charAt(g);
					h.push(j == "T" ? "'T'" : Date.getFormatCode(j))
				}
				return h.join(" + ")
			},
			U : "Math.round(this.getTime() / 1000)"
		},
		isValid : function(o, c, n, k, g, j, e) {
			k = k || 0;
			g = g || 0;
			j = j || 0;
			e = e || 0;
			var l = new Date(o, c - 1, n, k, g, j, e);
			return o == l.getFullYear() && c == l.getMonth() + 1
					&& n == l.getDate() && k == l.getHours()
					&& g == l.getMinutes() && j == l.getSeconds()
					&& e == l.getMilliseconds()
		},
		parseDate : function(d, g, c) {
			var e = Date.parseFunctions;
			if (e[g] == null) {
				Date.createParser(g)
			}
			return e[g](d, Ext.isDefined(c) ? c : Date.useStrict)
		},
		getFormatCode : function(d) {
			var c = Date.formatCodes[d];
			if (c) {
				c = typeof c == "function" ? c() : c;
				Date.formatCodes[d] = c
			}
			return c || ("'" + String.escape(d) + "'")
		},
		createFormat : function(h) {
			var g = [], c = false, e = "";
			for (var d = 0; d < h.length; ++d) {
				e = h.charAt(d);
				if (!c && e == "\\") {
					c = true
				} else {
					if (c) {
						c = false;
						g.push("'" + String.escape(e) + "'")
					} else {
						g.push(Date.getFormatCode(e))
					}
				}
			}
			Date.formatFunctions[h] = new Function("return " + g.join("+"))
		},
		createParser : function() {
			var c = [
					"var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
					"def = Date.defaults,",
					"results = String(input).match(Date.parseRegexes[{0}]);",
					"if(results){",
					"{1}",
					"if(u != null){",
					"v = new Date(u * 1000);",
					"}else{",
					"dt = (new Date()).clearTime();",
					"y = y >= 0? y : Ext.num(def.y, dt.getFullYear());",
					"m = m >= 0? m : Ext.num(def.m - 1, dt.getMonth());",
					"d = d >= 0? d : Ext.num(def.d, dt.getDate());",
					"h  = h || Ext.num(def.h, dt.getHours());",
					"i  = i || Ext.num(def.i, dt.getMinutes());",
					"s  = s || Ext.num(def.s, dt.getSeconds());",
					"ms = ms || Ext.num(def.ms, dt.getMilliseconds());",
					"if(z >= 0 && y >= 0){",
					"v = new Date(y, 0, 1, h, i, s, ms);",
					"v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);",
					"}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){",
					"v = null;",
					"}else{",
					"v = new Date(y, m, d, h, i, s, ms);",
					"}",
					"}",
					"}",
					"if(v){",
					"if(zz != null){",
					"v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
					"}else if(o){",
					"v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
					"}", "}", "return v;"].join("\n");
			return function(m) {
				var e = Date.parseRegexes.length, n = 1, g = [], l = [], k = false, d = "";
				for (var j = 0; j < m.length; ++j) {
					d = m.charAt(j);
					if (!k && d == "\\") {
						k = true
					} else {
						if (k) {
							k = false;
							l.push(String.escape(d))
						} else {
							var h = a(d, n);
							n += h.g;
							l.push(h.s);
							if (h.g && h.c) {
								g.push(h.c)
							}
						}
					}
				}
				Date.parseRegexes[e] = new RegExp("^" + l.join("") + "$", "i");
				Date.parseFunctions[m] = new Function("input", "strict", b(c,
								e, g.join("")))
			}
		}(),
		parseCodes : {
			d : {
				g : 1,
				c : "d = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			j : {
				g : 1,
				c : "d = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,2})"
			},
			D : function() {
				for (var c = [], d = 0; d < 7; c.push(Date.getShortDayName(d)), ++d) {
				}
				return {
					g : 0,
					c : null,
					s : "(?:" + c.join("|") + ")"
				}
			},
			l : function() {
				return {
					g : 0,
					c : null,
					s : "(?:" + Date.dayNames.join("|") + ")"
				}
			},
			N : {
				g : 0,
				c : null,
				s : "[1-7]"
			},
			S : {
				g : 0,
				c : null,
				s : "(?:st|nd|rd|th)"
			},
			w : {
				g : 0,
				c : null,
				s : "[0-6]"
			},
			z : {
				g : 1,
				c : "z = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,3})"
			},
			W : {
				g : 0,
				c : null,
				s : "(?:\\d{2})"
			},
			F : function() {
				return {
					g : 1,
					c : "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
					s : "(" + Date.monthNames.join("|") + ")"
				}
			},
			M : function() {
				for (var c = [], d = 0; d < 12; c.push(Date
						.getShortMonthName(d)), ++d) {
				}
				return Ext.applyIf({
							s : "(" + c.join("|") + ")"
						}, a("F"))
			},
			m : {
				g : 1,
				c : "m = parseInt(results[{0}], 10) - 1;\n",
				s : "(\\d{2})"
			},
			n : {
				g : 1,
				c : "m = parseInt(results[{0}], 10) - 1;\n",
				s : "(\\d{1,2})"
			},
			t : {
				g : 0,
				c : null,
				s : "(?:\\d{2})"
			},
			L : {
				g : 0,
				c : null,
				s : "(?:1|0)"
			},
			o : function() {
				return a("Y")
			},
			Y : {
				g : 1,
				c : "y = parseInt(results[{0}], 10);\n",
				s : "(\\d{4})"
			},
			y : {
				g : 1,
				c : "var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
				s : "(\\d{1,2})"
			},
			a : {
				g : 1,
				c : "if (results[{0}] == 'am') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
				s : "(am|pm)"
			},
			A : {
				g : 1,
				c : "if (results[{0}] == 'AM') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
				s : "(AM|PM)"
			},
			g : function() {
				return a("G")
			},
			G : {
				g : 1,
				c : "h = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,2})"
			},
			h : function() {
				return a("H")
			},
			H : {
				g : 1,
				c : "h = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			i : {
				g : 1,
				c : "i = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			s : {
				g : 1,
				c : "s = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			u : {
				g : 1,
				c : "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
				s : "(\\d+)"
			},
			O : {
				g : 1,
				c : [
						"o = results[{0}];",
						"var sn = o.substring(0,1),",
						"hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
						"mn = o.substring(3,5) % 60;",
						"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"]
						.join("\n"),
				s : "([+-]\\d{4})"
			},
			P : {
				g : 1,
				c : [
						"o = results[{0}];",
						"var sn = o.substring(0,1),",
						"hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
						"mn = o.substring(4,6) % 60;",
						"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"]
						.join("\n"),
				s : "([+-]\\d{2}:\\d{2})"
			},
			T : {
				g : 0,
				c : null,
				s : "[A-Z]{1,4}"
			},
			Z : {
				g : 1,
				c : "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
				s : "([+-]?\\d{1,5})"
			},
			c : function() {
				var e = [], c = [a("Y", 1), a("m", 2), a("d", 3), a("h", 4),
						a("i", 5), a("s", 6), {
							c : "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
						}, {
							c : ["if(results[8]) {", "if(results[8] == 'Z'){",
									"zz = 0;",
									"}else if (results[8].indexOf(':') > -1){",
									a("P", 8).c, "}else{", a("O", 8).c, "}",
									"}"].join("\n")
						}];
				for (var g = 0, d = c.length; g < d; ++g) {
					e.push(c[g].c)
				}
				return {
					g : 1,
					c : e.join(""),
					s : [c[0].s, "(?:", "-", c[1].s, "(?:", "-", c[2].s, "(?:",
							"(?:T| )?", c[3].s, ":", c[4].s, "(?::", c[5].s,
							")?", "(?:(?:\\.|,)(\\d+))?",
							"(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"]
							.join("")
				}
			},
			U : {
				g : 1,
				c : "u = parseInt(results[{0}], 10);\n",
				s : "(-?\\d+)"
			}
		}
	})
}());
Ext.apply(Date.prototype, {
	dateFormat : function(a) {
		if (Date.formatFunctions[a] == null) {
			Date.createFormat(a)
		}
		return Date.formatFunctions[a].call(this)
	},
	getTimezone : function() {
		return this.toString().replace(
				/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,
				"$1$2").replace(/[^A-Z]/g, "")
	},
	getGMTOffset : function(a) {
		return (this.getTimezoneOffset() > 0 ? "-" : "+")
				+ String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())
								/ 60), 2, "0")
				+ (a ? ":" : "")
				+ String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2,
						"0")
	},
	getDayOfYear : function() {
		var b = 0, e = this.clone(), a = this.getMonth(), c;
		for (c = 0, e.setDate(1), e.setMonth(0); c < a; e.setMonth(++c)) {
			b += e.getDaysInMonth()
		}
		return b + this.getDate() - 1
	},
	getWeekOfYear : function() {
		var a = 86400000, b = 7 * a;
		return function() {
			var d = Date.UTC(this.getFullYear(), this.getMonth(), this
							.getDate()
							+ 3)
					/ a, c = Math.floor(d / 7), e = new Date(c * b)
					.getUTCFullYear();
			return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
		}
	}(),
	isLeapYear : function() {
		var a = this.getFullYear();
		return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
	},
	getFirstDayOfMonth : function() {
		var a = (this.getDay() - (this.getDate() - 1)) % 7;
		return (a < 0) ? (a + 7) : a
	},
	getLastDayOfMonth : function() {
		return this.getLastDateOfMonth().getDay()
	},
	getFirstDateOfMonth : function() {
		return new Date(this.getFullYear(), this.getMonth(), 1)
	},
	getLastDateOfMonth : function() {
		return new Date(this.getFullYear(), this.getMonth(), this
						.getDaysInMonth())
	},
	getDaysInMonth : function() {
		var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return function() {
			var b = this.getMonth();
			return b == 1 && this.isLeapYear() ? 29 : a[b]
		}
	}(),
	getSuffix : function() {
		switch (this.getDate()) {
			case 1 :
			case 21 :
			case 31 :
				return "st";
			case 2 :
			case 22 :
				return "nd";
			case 3 :
			case 23 :
				return "rd";
			default :
				return "th"
		}
	},
	clone : function() {
		return new Date(this.getTime())
	},
	isDST : function() {
		return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this
				.getTimezoneOffset()
	},
	clearTime : function(g) {
		if (g) {
			return this.clone().clearTime()
		}
		var b = this.getDate();
		this.setHours(0);
		this.setMinutes(0);
		this.setSeconds(0);
		this.setMilliseconds(0);
		if (this.getDate() != b) {
			for (var a = 1, e = this.add(Date.HOUR, a); e.getDate() != b; a++, e = this
					.add(Date.HOUR, a)) {
			}
			this.setDate(b);
			this.setHours(e.getHours())
		}
		return this
	},
	add : function(b, c) {
		var e = this.clone();
		if (!b || c === 0) {
			return e
		}
		switch (b.toLowerCase()) {
			case Date.MILLI :
				e.setMilliseconds(this.getMilliseconds() + c);
				break;
			case Date.SECOND :
				e.setSeconds(this.getSeconds() + c);
				break;
			case Date.MINUTE :
				e.setMinutes(this.getMinutes() + c);
				break;
			case Date.HOUR :
				e.setHours(this.getHours() + c);
				break;
			case Date.DAY :
				e.setDate(this.getDate() + c);
				break;
			case Date.MONTH :
				var a = this.getDate();
				if (a > 28) {
					a = Math.min(a, this.getFirstDateOfMonth().add("mo", c)
									.getLastDateOfMonth().getDate())
				}
				e.setDate(a);
				e.setMonth(this.getMonth() + c);
				break;
			case Date.YEAR :
				e.setFullYear(this.getFullYear() + c);
				break
		}
		return e
	},
	between : function(c, a) {
		var b = this.getTime();
		return c.getTime() <= b && b <= a.getTime()
	}
});
Date.prototype.format = Date.prototype.dateFormat;
if (Ext.isSafari
		&& (navigator.userAgent.match(/WebKit\/(\d+)/)[1] || NaN) < 420) {
	Ext.apply(Date.prototype, {
				_xMonth : Date.prototype.setMonth,
				_xDate : Date.prototype.setDate,
				setMonth : function(a) {
					if (a <= -1) {
						var d = Math.ceil(-a), c = Math.ceil(d / 12), b = (d % 12)
								? 12 - d % 12
								: 0;
						this.setFullYear(this.getFullYear() - c);
						return this._xMonth(b)
					} else {
						return this._xMonth(a)
					}
				},
				setDate : function(a) {
					return this.setTime(this.getTime() - (this.getDate() - a)
							* 86400000)
				}
			})
}
Ext.util.MixedCollection = function(b, a) {
	this.items = [];
	this.map = {};
	this.keys = [];
	this.length = 0;
	this.addEvents("clear", "add", "replace", "remove", "sort");
	this.allowFunctions = b === true;
	if (a) {
		this.getKey = a
	}
	Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {
	allowFunctions : false,
	add : function(b, c) {
		if (arguments.length == 1) {
			c = arguments[0];
			b = this.getKey(c)
		}
		if (typeof b != "undefined" && b !== null) {
			var a = this.map[b];
			if (typeof a != "undefined") {
				return this.replace(b, c)
			}
			this.map[b] = c
		}
		this.length++;
		this.items.push(c);
		this.keys.push(b);
		this.fireEvent("add", this.length - 1, c, b);
		return c
	},
	getKey : function(a) {
		return a.id
	},
	replace : function(c, d) {
		if (arguments.length == 1) {
			d = arguments[0];
			c = this.getKey(d)
		}
		var a = this.map[c];
		if (typeof c == "undefined" || c === null || typeof a == "undefined") {
			return this.add(c, d)
		}
		var b = this.indexOfKey(c);
		this.items[b] = d;
		this.map[c] = d;
		this.fireEvent("replace", c, a, d);
		return d
	},
	addAll : function(e) {
		if (arguments.length > 1 || Ext.isArray(e)) {
			var b = arguments.length > 1 ? arguments : e;
			for (var d = 0, a = b.length; d < a; d++) {
				this.add(b[d])
			}
		} else {
			for (var c in e) {
				if (this.allowFunctions || typeof e[c] != "function") {
					this.add(c, e[c])
				}
			}
		}
	},
	each : function(e, d) {
		var b = [].concat(this.items);
		for (var c = 0, a = b.length; c < a; c++) {
			if (e.call(d || b[c], b[c], c, a) === false) {
				break
			}
		}
	},
	eachKey : function(d, c) {
		for (var b = 0, a = this.keys.length; b < a; b++) {
			d.call(c || window, this.keys[b], this.items[b], b, a)
		}
	},
	find : function(d, c) {
		for (var b = 0, a = this.items.length; b < a; b++) {
			if (d.call(c || window, this.items[b], this.keys[b])) {
				return this.items[b]
			}
		}
		return null
	},
	insert : function(a, b, c) {
		if (arguments.length == 2) {
			c = arguments[1];
			b = this.getKey(c)
		}
		if (this.containsKey(b)) {
			this.suspendEvents();
			this.removeKey(b);
			this.resumeEvents()
		}
		if (a >= this.length) {
			return this.add(b, c)
		}
		this.length++;
		this.items.splice(a, 0, c);
		if (typeof b != "undefined" && b !== null) {
			this.map[b] = c
		}
		this.keys.splice(a, 0, b);
		this.fireEvent("add", a, c, b);
		return c
	},
	remove : function(a) {
		return this.removeAt(this.indexOf(a))
	},
	removeAt : function(a) {
		if (a < this.length && a >= 0) {
			this.length--;
			var c = this.items[a];
			this.items.splice(a, 1);
			var b = this.keys[a];
			if (typeof b != "undefined") {
				delete this.map[b]
			}
			this.keys.splice(a, 1);
			this.fireEvent("remove", c, b);
			return c
		}
		return false
	},
	removeKey : function(a) {
		return this.removeAt(this.indexOfKey(a))
	},
	getCount : function() {
		return this.length
	},
	indexOf : function(a) {
		return this.items.indexOf(a)
	},
	indexOfKey : function(a) {
		return this.keys.indexOf(a)
	},
	item : function(b) {
		var a = this.map[b], c = a !== undefined ? a : (typeof b == "number")
				? this.items[b]
				: undefined;
		return !Ext.isFunction(c) || this.allowFunctions ? c : null
	},
	itemAt : function(a) {
		return this.items[a]
	},
	key : function(a) {
		return this.map[a]
	},
	contains : function(a) {
		return this.indexOf(a) != -1
	},
	containsKey : function(a) {
		return typeof this.map[a] != "undefined"
	},
	clear : function() {
		this.length = 0;
		this.items = [];
		this.keys = [];
		this.map = {};
		this.fireEvent("clear")
	},
	first : function() {
		return this.items[0]
	},
	last : function() {
		return this.items[this.length - 1]
	},
	_sort : function(m, a, l) {
		var e, g, d = String(a).toUpperCase() == "DESC" ? -1 : 1, j = [], b = this.keys, h = this.items;
		l = l || function(k, c) {
			return k - c
		};
		for (e = 0, g = h.length; e < g; e++) {
			j[j.length] = {
				key : b[e],
				value : h[e],
				index : e
			}
		}
		j.sort(function(k, c) {
					var n = l(k[m], c[m]) * d;
					if (n === 0) {
						n = (k.index < c.index ? -1 : 1)
					}
					return n
				});
		for (e = 0, g = j.length; e < g; e++) {
			h[e] = j[e].value;
			b[e] = j[e].key
		}
		this.fireEvent("sort", this)
	},
	sort : function(a, b) {
		this._sort("value", a, b)
	},
	keySort : function(a, b) {
		this._sort("key", a, b || function(d, c) {
					var g = String(d).toUpperCase(), e = String(c)
							.toUpperCase();
					return g > e ? 1 : (g < e ? -1 : 0)
				})
	},
	getRange : function(e, a) {
		var b = this.items;
		if (b.length < 1) {
			return []
		}
		e = e || 0;
		a = Math.min(typeof a == "undefined" ? this.length - 1 : a, this.length
						- 1);
		var c, d = [];
		if (e <= a) {
			for (c = e; c <= a; c++) {
				d[d.length] = b[c]
			}
		} else {
			for (c = e; c >= a; c--) {
				d[d.length] = b[c]
			}
		}
		return d
	},
	filter : function(c, b, d, a) {
		if (Ext.isEmpty(b, false)) {
			return this.clone()
		}
		b = this.createValueMatcher(b, d, a);
		return this.filterBy(function(e) {
					return e && b.test(e[c])
				})
	},
	filterBy : function(g, e) {
		var h = new Ext.util.MixedCollection();
		h.getKey = this.getKey;
		var b = this.keys, d = this.items;
		for (var c = 0, a = d.length; c < a; c++) {
			if (g.call(e || this, d[c], b[c])) {
				h.add(b[c], d[c])
			}
		}
		return h
	},
	findIndex : function(c, b, e, d, a) {
		if (Ext.isEmpty(b, false)) {
			return -1
		}
		b = this.createValueMatcher(b, d, a);
		return this.findIndexBy(function(g) {
					return g && b.test(g[c])
				}, null, e)
	},
	findIndexBy : function(g, e, h) {
		var b = this.keys, d = this.items;
		for (var c = (h || 0), a = d.length; c < a; c++) {
			if (g.call(e || this, d[c], b[c])) {
				return c
			}
		}
		return -1
	},
	createValueMatcher : function(c, e, a, b) {
		if (!c.exec) {
			var d = Ext.escapeRe;
			c = String(c);
			if (e === true) {
				c = d(c)
			} else {
				c = "^" + d(c);
				if (b === true) {
					c += "$"
				}
			}
			c = new RegExp(c, a ? "" : "i")
		}
		return c
	},
	clone : function() {
		var e = new Ext.util.MixedCollection();
		var b = this.keys, d = this.items;
		for (var c = 0, a = d.length; c < a; c++) {
			e.add(b[c], d[c])
		}
		e.getKey = this.getKey;
		return e
	}
});
Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
Ext.util.JSON = new (function() {
	var useHasOwn = !!{}.hasOwnProperty, isNative = function() {
		var useNative = null;
		return function() {
			if (useNative === null) {
				useNative = Ext.USE_NATIVE_JSON && window.JSON
						&& JSON.toString() == "[object JSON]"
			}
			return useNative
		}
	}(), pad = function(n) {
		return n < 10 ? "0" + n : n
	}, doDecode = function(json) {
		return eval("(" + json + ")")
	}, doEncode = function(o) {
		if (!Ext.isDefined(o) || o === null) {
			return "null"
		} else {
			if (Ext.isArray(o)) {
				return encodeArray(o)
			} else {
				if (Ext.isDate(o)) {
					return Ext.util.JSON.encodeDate(o)
				} else {
					if (Ext.isString(o)) {
						return encodeString(o)
					} else {
						if (typeof o == "number") {
							return isFinite(o) ? String(o) : "null"
						} else {
							if (Ext.isBoolean(o)) {
								return String(o)
							} else {
								var a = ["{"], b, i, v;
								for (i in o) {
									if (!o.getElementsByTagName) {
										if (!useHasOwn || o.hasOwnProperty(i)) {
											v = o[i];
											switch (typeof v) {
												case "undefined" :
												case "function" :
												case "unknown" :
													break;
												default :
													if (b) {
														a.push(",")
													}
													a
															.push(
																	doEncode(i),
																	":",
																	v === null
																			? "null"
																			: doEncode(v));
													b = true
											}
										}
									}
								}
								a.push("}");
								return a.join("")
							}
						}
					}
				}
			}
		}
	}, m = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, encodeString = function(s) {
		if (/["\\\x00-\x1f]/.test(s)) {
			return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
						var c = m[b];
						if (c) {
							return c
						}
						c = b.charCodeAt();
						return "\\u00" + Math.floor(c / 16).toString(16)
								+ (c % 16).toString(16)
					}) + '"'
		}
		return '"' + s + '"'
	}, encodeArray = function(o) {
		var a = ["["], b, i, l = o.length, v;
		for (i = 0; i < l; i += 1) {
			v = o[i];
			switch (typeof v) {
				case "undefined" :
				case "function" :
				case "unknown" :
					break;
				default :
					if (b) {
						a.push(",")
					}
					a.push(v === null ? "null" : Ext.util.JSON.encode(v));
					b = true
			}
		}
		a.push("]");
		return a.join("")
	};
	this.encodeDate = function(o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
				+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
				+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
	};
	this.encode = function() {
		var ec;
		return function(o) {
			if (!ec) {
				ec = isNative() ? JSON.stringify : doEncode
			}
			return ec(o)
		}
	}();
	this.decode = function() {
		var dc;
		return function(json) {
			if (!dc) {
				dc = isNative() ? JSON.parse : doDecode
			}
			return dc(json)
		}
	}()
})();
Ext.encode = Ext.util.JSON.encode;
Ext.decode = Ext.util.JSON.decode;
Ext.util.Format = function() {
	var trimRe = /^\s+|\s+$/g, stripTagsRE = /<\/?[^>]+>/gi, stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, nl2brRe = /\r?\n/g;
	return {
		ellipsis : function(value, len, word) {
			if (value && value.length > len) {
				if (word) {
					var vs = value.substr(0, len - 2), index = Math.max(vs
									.lastIndexOf(" "), vs.lastIndexOf("."), vs
									.lastIndexOf("!"), vs.lastIndexOf("?"));
					if (index == -1 || index < (len - 15)) {
						return value.substr(0, len - 3) + "..."
					} else {
						return vs.substr(0, index) + "..."
					}
				} else {
					return value.substr(0, len - 3) + "..."
				}
			}
			return value
		},
		undef : function(value) {
			return value !== undefined ? value : ""
		},
		defaultValue : function(value, defaultValue) {
			return value !== undefined && value !== "" ? value : defaultValue
		},
		htmlEncode : function(value) {
			return !value ? value : String(value).replace(/&/g, "&amp;")
					.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g,
							"&quot;")
		},
		htmlDecode : function(value) {
			return !value ? value : String(value).replace(/&gt;/g, ">")
					.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(
							/&amp;/g, "&")
		},
		trim : function(value) {
			return String(value).replace(trimRe, "")
		},
		substr : function(value, start, length) {
			return String(value).substr(start, length)
		},
		lowercase : function(value) {
			return String(value).toLowerCase()
		},
		uppercase : function(value) {
			return String(value).toUpperCase()
		},
		capitalize : function(value) {
			return !value ? value : value.charAt(0).toUpperCase()
					+ value.substr(1).toLowerCase()
		},
		call : function(value, fn) {
			if (arguments.length > 2) {
				var args = Array.prototype.slice.call(arguments, 2);
				args.unshift(value);
				return eval(fn).apply(window, args)
			} else {
				return eval(fn).call(window, value)
			}
		},
		usMoney : function(v) {
			v = (Math.round((v - 0) * 100)) / 100;
			v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v
					* 10)) ? v + "0" : v);
			v = String(v);
			var ps = v.split("."), whole = ps[0], sub = ps[1]
					? "." + ps[1]
					: ".00", r = /(\d+)(\d{3})/;
			while (r.test(whole)) {
				whole = whole.replace(r, "$1,$2")
			}
			v = whole + sub;
			if (v.charAt(0) == "-") {
				return "-$" + v.substr(1)
			}
			return "$" + v
		},
		date : function(v, format) {
			if (!v) {
				return ""
			}
			if (!Ext.isDate(v)) {
				v = new Date(Date.parse(v))
			}
			return v.dateFormat(format || "m/d/Y")
		},
		dateRenderer : function(format) {
			return function(v) {
				return Ext.util.Format.date(v, format)
			}
		},
		stripTags : function(v) {
			return !v ? v : String(v).replace(stripTagsRE, "")
		},
		stripScripts : function(v) {
			return !v ? v : String(v).replace(stripScriptsRe, "")
		},
		fileSize : function(size) {
			if (size < 1024) {
				return size + " bytes"
			} else {
				if (size < 1048576) {
					return (Math.round(((size * 10) / 1024)) / 10) + " KB"
				} else {
					return (Math.round(((size * 10) / 1048576)) / 10) + " MB"
				}
			}
		},
		math : function() {
			var fns = {};
			return function(v, a) {
				if (!fns[a]) {
					fns[a] = new Function("v", "return v " + a + ";")
				}
				return fns[a](v)
			}
		}(),
		round : function(value, precision) {
			var result = Number(value);
			if (typeof precision == "number") {
				precision = Math.pow(10, precision);
				result = Math.round(value * precision) / precision
			}
			return result
		},
		number : function(v, format) {
			if (!format) {
				return v
			}
			v = Ext.num(v, NaN);
			if (isNaN(v)) {
				return ""
			}
			var comma = ",", dec = ".", i18n = false, neg = v < 0;
			v = Math.abs(v);
			if (format.substr(format.length - 2) == "/i") {
				format = format.substr(0, format.length - 2);
				i18n = true;
				comma = ".";
				dec = ","
			}
			var hasComma = format.indexOf(comma) != -1, psplit = (i18n ? format
					.replace(/[^\d\,]/g, "") : format.replace(/[^\d\.]/g, ""))
					.split(dec);
			if (1 < psplit.length) {
				v = v.toFixed(psplit[1].length)
			} else {
				if (2 < psplit.length) {
					throw ("NumberFormatException: invalid format, formats should have no more than 1 period: " + format)
				} else {
					v = v.toFixed(0)
				}
			}
			var fnum = v.toString();
			if (hasComma) {
				psplit = fnum.split(".");
				var cnum = psplit[0], parr = [], j = cnum.length, m = Math
						.floor(j / 3), n = cnum.length % 3 || 3;
				for (var i = 0; i < j; i += n) {
					if (i != 0) {
						n = 3
					}
					parr[parr.length] = cnum.substr(i, n);
					m -= 1
				}
				fnum = parr.join(comma);
				if (psplit[1]) {
					fnum += dec + psplit[1]
				}
			}
			return (neg ? "-" : "") + format.replace(/[\d,?\.?]+/, fnum)
		},
		numberRenderer : function(format) {
			return function(v) {
				return Ext.util.Format.number(v, format)
			}
		},
		plural : function(v, s, p) {
			return v + " " + (v == 1 ? s : (p ? p : s + "s"))
		},
		nl2br : function(v) {
			return Ext.isEmpty(v) ? "" : v.replace(nl2brRe, "<br/>")
		}
	}
}();
Ext.XTemplate = function() {
	Ext.XTemplate.superclass.constructor.apply(this, arguments);
	var x = this, j = x.html, q = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/, d = /^<tpl\b[^>]*?for="(.*?)"/, u = /^<tpl\b[^>]*?if="(.*?)"/, w = /^<tpl\b[^>]*?exec="(.*?)"/, r, p = 0, k = [], o = "values", v = "parent", l = "xindex", n = "xcount", e = "return ", c = "with(values){ ";
	j = ["<tpl>", j, "</tpl>"].join("");
	while ((r = j.match(q))) {
		var b = r[0].match(d), a = r[0].match(u), z = r[0].match(w), g = null, h = null, t = null, y = b
				&& b[1] ? b[1] : "";
		if (a) {
			g = a && a[1] ? a[1] : null;
			if (g) {
				h = new Function(o, v, l, n, c + e
								+ (Ext.util.Format.htmlDecode(g)) + "; }")
			}
		}
		if (z) {
			g = z && z[1] ? z[1] : null;
			if (g) {
				t = new Function(o, v, l, n, c
								+ (Ext.util.Format.htmlDecode(g)) + "; }")
			}
		}
		if (y) {
			switch (y) {
				case "." :
					y = new Function(o, v, c + e + o + "; }");
					break;
				case ".." :
					y = new Function(o, v, c + e + v + "; }");
					break;
				default :
					y = new Function(o, v, c + e + y + "; }")
			}
		}
		k.push({
					id : p,
					target : y,
					exec : t,
					test : h,
					body : r[1] || ""
				});
		j = j.replace(r[0], "{xtpl" + p + "}");
		++p
	}
	Ext.each(k, function(m) {
				x.compileTpl(m)
			});
	x.master = k[k.length - 1];
	x.tpls = k
};
Ext.extend(Ext.XTemplate, Ext.Template, {
	re : /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
	codeRe : /\{\[((?:\\\]|.|\n)*?)\]\}/g,
	applySubTemplate : function(a, j, h, d, c) {
		var g = this, e, l = g.tpls[a], k, b = [];
		if ((l.test && !l.test.call(g, j, h, d, c))
				|| (l.exec && l.exec.call(g, j, h, d, c))) {
			return ""
		}
		k = l.target ? l.target.call(g, j, h) : j;
		e = k.length;
		h = l.target ? j : h;
		if (l.target && Ext.isArray(k)) {
			Ext.each(k, function(m, n) {
						b[b.length] = l.compiled.call(g, m, h, n + 1, e)
					});
			return b.join("")
		}
		return l.compiled.call(g, k, h, d, c)
	},
	compileTpl : function(tpl) {
		var fm = Ext.util.Format, useF = this.disableFormats !== true, sep = Ext.isGecko
				? "+"
				: ",", body;
		function fn(m, name, format, args, math) {
			if (name.substr(0, 4) == "xtpl") {
				return "'" + sep + "this.applySubTemplate(" + name.substr(4)
						+ ", values, parent, xindex, xcount)" + sep + "'"
			}
			var v;
			if (name === ".") {
				v = "values"
			} else {
				if (name === "#") {
					v = "xindex"
				} else {
					if (name.indexOf(".") != -1) {
						v = name
					} else {
						v = "values['" + name + "']"
					}
				}
			}
			if (math) {
				v = "(" + v + math + ")"
			}
			if (format && useF) {
				args = args ? "," + args : "";
				if (format.substr(0, 5) != "this.") {
					format = "fm." + format + "("
				} else {
					format = 'this.call("' + format.substr(5) + '", ';
					args = ", values"
				}
			} else {
				args = "";
				format = "(" + v + " === undefined ? '' : "
			}
			return "'" + sep + format + v + args + ")" + sep + "'"
		}
		function codeFn(m, code) {
			return "'" + sep + "(" + code.replace(/\\'/g, "'") + ")" + sep
					+ "'"
		}
		if (Ext.isGecko) {
			body = "tpl.compiled = function(values, parent, xindex, xcount){ return '"
					+ tpl.body.replace(/(\r\n|\n)/g, "\\n")
							.replace(/'/g, "\\'").replace(this.re, fn).replace(
									this.codeRe, codeFn) + "';};"
		} else {
			body = ["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
			body.push(tpl.body.replace(/(\r\n|\n)/g, "\\n")
					.replace(/'/g, "\\'").replace(this.re, fn).replace(
							this.codeRe, codeFn));
			body.push("'].join('');};");
			body = body.join("")
		}
		eval(body);
		return this
	},
	applyTemplate : function(a) {
		return this.master.compiled.call(this, a, {}, 1, 1)
	},
	compile : function() {
		return this
	}
});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function(a) {
	a = Ext.getDom(a);
	return new Ext.XTemplate(a.value || a.innerHTML)
};
Ext.util.CSS = function() {
	var d = null;
	var c = document;
	var b = /(-[a-z])/gi;
	var a = function(e, g) {
		return g.charAt(1).toUpperCase()
	};
	return {
		createStyleSheet : function(j, m) {
			var h;
			var g = c.getElementsByTagName("head")[0];
			var l = c.createElement("style");
			l.setAttribute("type", "text/css");
			if (m) {
				l.setAttribute("id", m)
			}
			if (Ext.isIE) {
				g.appendChild(l);
				h = l.styleSheet;
				h.cssText = j
			} else {
				try {
					l.appendChild(c.createTextNode(j))
				} catch (k) {
					l.cssText = j
				}
				g.appendChild(l);
				h = l.styleSheet
						? l.styleSheet
						: (l.sheet || c.styleSheets[c.styleSheets.length - 1])
			}
			this.cacheStyleSheet(h);
			return h
		},
		removeStyleSheet : function(g) {
			var e = c.getElementById(g);
			if (e) {
				e.parentNode.removeChild(e)
			}
		},
		swapStyleSheet : function(h, e) {
			this.removeStyleSheet(h);
			var g = c.createElement("link");
			g.setAttribute("rel", "stylesheet");
			g.setAttribute("type", "text/css");
			g.setAttribute("id", h);
			g.setAttribute("href", e);
			c.getElementsByTagName("head")[0].appendChild(g)
		},
		refreshCache : function() {
			return this.getRules(true)
		},
		cacheStyleSheet : function(h) {
			if (!d) {
				d = {}
			}
			try {
				var l = h.cssRules || h.rules;
				for (var g = l.length - 1; g >= 0; --g) {
					d[l[g].selectorText.toLowerCase()] = l[g]
				}
			} catch (k) {
			}
		},
		getRules : function(h) {
			if (d === null || h) {
				d = {};
				var k = c.styleSheets;
				for (var j = 0, g = k.length; j < g; j++) {
					try {
						this.cacheStyleSheet(k[j])
					} catch (l) {
					}
				}
			}
			return d
		},
		getRule : function(e, h) {
			var g = this.getRules(h);
			if (!Ext.isArray(e)) {
				return g[e.toLowerCase()]
			}
			for (var j = 0; j < e.length; j++) {
				if (g[e[j]]) {
					return g[e[j].toLowerCase()]
				}
			}
			return null
		},
		updateRule : function(e, j, h) {
			if (!Ext.isArray(e)) {
				var k = this.getRule(e);
				if (k) {
					k.style[j.replace(b, a)] = h;
					return true
				}
			} else {
				for (var g = 0; g < e.length; g++) {
					if (this.updateRule(e[g], j, h)) {
						return true
					}
				}
			}
			return false
		}
	}
}();
Ext.util.ClickRepeater = function(b, a) {
	this.el = Ext.get(b);
	this.el.unselectable();
	Ext.apply(this, a);
	this.addEvents("mousedown", "click", "mouseup");
	if (!this.disabled) {
		this.disabled = true;
		this.enable()
	}
	if (this.handler) {
		this.on("click", this.handler, this.scope || this)
	}
	Ext.util.ClickRepeater.superclass.constructor.call(this)
};
Ext.extend(Ext.util.ClickRepeater, Ext.util.Observable, {
			interval : 20,
			delay : 250,
			preventDefault : true,
			stopDefault : false,
			timer : 0,
			enable : function() {
				if (this.disabled) {
					this.el.on("mousedown", this.handleMouseDown, this);
					if (this.preventDefault || this.stopDefault) {
						this.el.on("click", this.eventOptions, this)
					}
				}
				this.disabled = false
			},
			disable : function(a) {
				if (a || !this.disabled) {
					clearTimeout(this.timer);
					if (this.pressClass) {
						this.el.removeClass(this.pressClass)
					}
					Ext.getDoc().un("mouseup", this.handleMouseUp, this);
					this.el.removeAllListeners()
				}
				this.disabled = true
			},
			setDisabled : function(a) {
				this[a ? "disable" : "enable"]()
			},
			eventOptions : function(a) {
				if (this.preventDefault) {
					a.preventDefault()
				}
				if (this.stopDefault) {
					a.stopEvent()
				}
			},
			destroy : function() {
				this.disable(true);
				Ext.destroy(this.el);
				this.purgeListeners()
			},
			handleMouseDown : function() {
				clearTimeout(this.timer);
				this.el.blur();
				if (this.pressClass) {
					this.el.addClass(this.pressClass)
				}
				this.mousedownTime = new Date();
				Ext.getDoc().on("mouseup", this.handleMouseUp, this);
				this.el.on("mouseout", this.handleMouseOut, this);
				this.fireEvent("mousedown", this);
				this.fireEvent("click", this);
				if (this.accelerate) {
					this.delay = 400
				}
				this.timer = this.click
						.defer(this.delay || this.interval, this)
			},
			click : function() {
				this.fireEvent("click", this);
				this.timer = this.click
						.defer(	this.accelerate ? this.easeOutExpo(
										this.mousedownTime.getElapsed(), 400,
										-390, 12000) : this.interval, this)
			},
			easeOutExpo : function(e, a, h, g) {
				return (e == g) ? a + h : h * (-Math.pow(2, -10 * e / g) + 1)
						+ a
			},
			handleMouseOut : function() {
				clearTimeout(this.timer);
				if (this.pressClass) {
					this.el.removeClass(this.pressClass)
				}
				this.el.on("mouseover", this.handleMouseReturn, this)
			},
			handleMouseReturn : function() {
				this.el.un("mouseover", this.handleMouseReturn, this);
				if (this.pressClass) {
					this.el.addClass(this.pressClass)
				}
				this.click()
			},
			handleMouseUp : function() {
				clearTimeout(this.timer);
				this.el.un("mouseover", this.handleMouseReturn, this);
				this.el.un("mouseout", this.handleMouseOut, this);
				Ext.getDoc().un("mouseup", this.handleMouseUp, this);
				this.el.removeClass(this.pressClass);
				this.fireEvent("mouseup", this)
			}
		});
Ext.KeyNav = function(b, a) {
	this.el = Ext.get(b);
	Ext.apply(this, a);
	if (!this.disabled) {
		this.disabled = true;
		this.enable()
	}
};
Ext.KeyNav.prototype = {
	disabled : false,
	defaultEventAction : "stopEvent",
	forceKeyDown : false,
	relay : function(c) {
		var a = c.getKey();
		var b = this.keyToHandler[a];
		if (b && this[b]) {
			if (this.doRelay(c, this[b], b) !== true) {
				c[this.defaultEventAction]()
			}
		}
	},
	doRelay : function(c, b, a) {
		return b.call(this.scope || this, c)
	},
	enter : false,
	left : false,
	right : false,
	up : false,
	down : false,
	tab : false,
	esc : false,
	pageUp : false,
	pageDown : false,
	del : false,
	home : false,
	end : false,
	keyToHandler : {
		37 : "left",
		39 : "right",
		38 : "up",
		40 : "down",
		33 : "pageUp",
		34 : "pageDown",
		46 : "del",
		36 : "home",
		35 : "end",
		13 : "enter",
		27 : "esc",
		9 : "tab"
	},
	stopKeyUp : function(b) {
		var a = b.getKey();
		if (a >= 37 && a <= 40) {
			b.stopEvent()
		}
	},
	destroy : function() {
		this.disable()
	},
	enable : function() {
		if (this.disabled) {
			if (Ext.isSafari2) {
				this.el.on("keyup", this.stopKeyUp, this)
			}
			this.el.on(this.isKeydown() ? "keydown" : "keypress", this.relay,
					this);
			this.disabled = false
		}
	},
	disable : function() {
		if (!this.disabled) {
			if (Ext.isSafari2) {
				this.el.un("keyup", this.stopKeyUp, this)
			}
			this.el.un(this.isKeydown() ? "keydown" : "keypress", this.relay,
					this);
			this.disabled = true
		}
	},
	setDisabled : function(a) {
		this[a ? "disable" : "enable"]()
	},
	isKeydown : function() {
		return this.forceKeyDown || Ext.EventManager.useKeydown
	}
};
Ext.KeyMap = function(c, b, a) {
	this.el = Ext.get(c);
	this.eventName = a || "keydown";
	this.bindings = [];
	if (b) {
		this.addBinding(b)
	}
	this.enable()
};
Ext.KeyMap.prototype = {
	stopEvent : false,
	addBinding : function(b) {
		if (Ext.isArray(b)) {
			Ext.each(b, function(j) {
						this.addBinding(j)
					}, this);
			return
		}
		var l = b.key, g = b.fn || b.handler, m = b.scope;
		if (b.stopEvent) {
			this.stopEvent = b.stopEvent
		}
		if (typeof l == "string") {
			var h = [];
			var e = l.toUpperCase();
			for (var c = 0, d = e.length; c < d; c++) {
				h.push(e.charCodeAt(c))
			}
			l = h
		}
		var a = Ext.isArray(l);
		var k = function(p) {
			if (this.checkModifiers(b, p)) {
				var n = p.getKey();
				if (a) {
					for (var o = 0, j = l.length; o < j; o++) {
						if (l[o] == n) {
							if (this.stopEvent) {
								p.stopEvent()
							}
							g.call(m || window, n, p);
							return
						}
					}
				} else {
					if (n == l) {
						if (this.stopEvent) {
							p.stopEvent()
						}
						g.call(m || window, n, p)
					}
				}
			}
		};
		this.bindings.push(k)
	},
	checkModifiers : function(b, h) {
		var j, d, g = ["shift", "ctrl", "alt"];
		for (var c = 0, a = g.length; c < a; ++c) {
			d = g[c];
			j = b[d];
			if (!(j === undefined || (j === h[d + "Key"]))) {
				return false
			}
		}
		return true
	},
	on : function(b, d, c) {
		var h, a, e, g;
		if (typeof b == "object" && !Ext.isArray(b)) {
			h = b.key;
			a = b.shift;
			e = b.ctrl;
			g = b.alt
		} else {
			h = b
		}
		this.addBinding({
					key : h,
					shift : a,
					ctrl : e,
					alt : g,
					fn : d,
					scope : c
				})
	},
	handleKeyDown : function(g) {
		if (this.enabled) {
			var c = this.bindings;
			for (var d = 0, a = c.length; d < a; d++) {
				c[d].call(this, g)
			}
		}
	},
	isEnabled : function() {
		return this.enabled
	},
	enable : function() {
		if (!this.enabled) {
			this.el.on(this.eventName, this.handleKeyDown, this);
			this.enabled = true
		}
	},
	disable : function() {
		if (this.enabled) {
			this.el.removeListener(this.eventName, this.handleKeyDown, this);
			this.enabled = false
		}
	},
	setDisabled : function(a) {
		this[a ? "disable" : "enable"]()
	}
};
Ext.util.TextMetrics = function() {
	var a;
	return {
		measure : function(b, c, d) {
			if (!a) {
				a = Ext.util.TextMetrics.Instance(b, d)
			}
			a.bind(b);
			a.setFixedWidth(d || "auto");
			return a.getSize(c)
		},
		createInstance : function(b, c) {
			return Ext.util.TextMetrics.Instance(b, c)
		}
	}
}();
Ext.util.TextMetrics.Instance = function(b, d) {
	var c = new Ext.Element(document.createElement("div"));
	document.body.appendChild(c.dom);
	c.position("absolute");
	c.setLeftTop(-1000, -1000);
	c.hide();
	if (d) {
		c.setWidth(d)
	}
	var a = {
		getSize : function(g) {
			c.update(g);
			var e = c.getSize();
			c.update("");
			return e
		},
		bind : function(e) {
			c.setStyle(Ext.fly(e).getStyles("font-size", "font-style",
					"font-weight", "font-family", "line-height",
					"text-transform", "letter-spacing"))
		},
		setFixedWidth : function(e) {
			c.setWidth(e)
		},
		getWidth : function(e) {
			c.dom.style.width = "auto";
			return this.getSize(e).width
		},
		getHeight : function(e) {
			return this.getSize(e).height
		}
	};
	a.bind(b);
	return a
};
Ext.Element.addMethods({
			getTextWidth : function(c, b, a) {
				return (Ext.util.TextMetrics.measure(this.dom, Ext.value(c,
								this.dom.innerHTML, true)).width).constrain(b
								|| 0, a || 1000000)
			}
		});
Ext.util.Cookies = {
	set : function(c, e) {
		var a = arguments;
		var j = arguments.length;
		var b = (j > 2) ? a[2] : null;
		var h = (j > 3) ? a[3] : "/";
		var d = (j > 4) ? a[4] : null;
		var g = (j > 5) ? a[5] : false;
		document.cookie = c + "=" + escape(e)
				+ ((b === null) ? "" : ("; expires=" + b.toGMTString()))
				+ ((h === null) ? "" : ("; path=" + h))
				+ ((d === null) ? "" : ("; domain=" + d))
				+ ((g === true) ? "; secure" : "")
	},
	get : function(d) {
		var b = d + "=";
		var g = b.length;
		var a = document.cookie.length;
		var e = 0;
		var c = 0;
		while (e < a) {
			c = e + g;
			if (document.cookie.substring(e, c) == b) {
				return Ext.util.Cookies.getCookieVal(c)
			}
			e = document.cookie.indexOf(" ", e) + 1;
			if (e === 0) {
				break
			}
		}
		return null
	},
	clear : function(a) {
		if (Ext.util.Cookies.get(a)) {
			document.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT"
		}
	},
	getCookieVal : function(b) {
		var a = document.cookie.indexOf(";", b);
		if (a == -1) {
			a = document.cookie.length
		}
		return unescape(document.cookie.substring(b, a))
	}
};
Ext.handleError = function(a) {
	throw a
};
Ext.Error = function(a) {
	this.message = (this.lang[a]) ? this.lang[a] : a
};
Ext.Error.prototype = new Error();
Ext.apply(Ext.Error.prototype, {
			lang : {},
			name : "Ext.Error",
			getName : function() {
				return this.name
			},
			getMessage : function() {
				return this.message
			},
			toJson : function() {
				return Ext.encode(this)
			}
		});