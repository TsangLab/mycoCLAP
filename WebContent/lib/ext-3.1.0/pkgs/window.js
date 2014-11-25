/*
 * Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.Window = Ext.extend(Ext.Panel, {
			baseCls : "x-window",
			resizable : true,
			draggable : true,
			closable : true,
			closeAction : "close",
			constrain : false,
			constrainHeader : false,
			plain : false,
			minimizable : false,
			maximizable : false,
			minHeight : 100,
			minWidth : 200,
			expandOnShow : true,
			collapsible : false,
			initHidden : undefined,
			hidden : true,
			monitorResize : true,
			elements : "header,body",
			frame : true,
			floating : true,
			initComponent : function() {
				this.initTools();
				Ext.Window.superclass.initComponent.call(this);
				this.addEvents("resize", "maximize", "minimize", "restore");
				if (Ext.isDefined(this.initHidden)) {
					this.hidden = this.initHidden
				}
				if (this.hidden === false) {
					this.hidden = true;
					this.show()
				}
			},
			getState : function() {
				return Ext.apply(Ext.Window.superclass.getState.call(this)
								|| {}, this.getBox(true))
			},
			onRender : function(b, a) {
				Ext.Window.superclass.onRender.call(this, b, a);
				if (this.plain) {
					this.el.addClass("x-window-plain")
				}
				this.focusEl = this.el.createChild({
							tag : "a",
							href : "#",
							cls : "x-dlg-focus",
							tabIndex : "-1",
							html : "&#160;"
						});
				this.focusEl.swallowEvent("click", true);
				this.proxy = this.el.createProxy("x-window-proxy");
				this.proxy.enableDisplayMode("block");
				if (this.modal) {
					this.mask = this.container.createChild({
								cls : "ext-el-mask"
							}, this.el.dom);
					this.mask.enableDisplayMode("block");
					this.mask.hide();
					this.mon(this.mask, "click", this.focus, this)
				}
				if (this.maximizable) {
					this
							.mon(this.header, "dblclick", this.toggleMaximize,
									this)
				}
			},
			initEvents : function() {
				Ext.Window.superclass.initEvents.call(this);
				if (this.animateTarget) {
					this.setAnimateTarget(this.animateTarget)
				}
				if (this.resizable) {
					this.resizer = new Ext.Resizable(this.el, {
								minWidth : this.minWidth,
								minHeight : this.minHeight,
								handles : this.resizeHandles || "all",
								pinned : true,
								resizeElement : this.resizerAction
							});
					this.resizer.window = this;
					this.mon(this.resizer, "beforeresize", this.beforeResize,
							this)
				}
				if (this.draggable) {
					this.header.addClass("x-window-draggable")
				}
				this.mon(this.el, "mousedown", this.toFront, this);
				this.manager = this.manager || Ext.WindowMgr;
				this.manager.register(this);
				if (this.maximized) {
					this.maximized = false;
					this.maximize()
				}
				if (this.closable) {
					var a = this.getKeyMap();
					a.on(27, this.onEsc, this);
					a.disable()
				}
			},
			initDraggable : function() {
				this.dd = new Ext.Window.DD(this)
			},
			onEsc : function() {
				this[this.closeAction]()
			},
			beforeDestroy : function() {
				if (this.rendered) {
					this.hide();
					if (this.doAnchor) {
						Ext.EventManager.removeResizeListener(this.doAnchor,
								this);
						Ext.EventManager.un(window, "scroll", this.doAnchor,
								this)
					}
					Ext.destroy(this.focusEl, this.resizer, this.dd,
							this.proxy, this.mask)
				}
				Ext.Window.superclass.beforeDestroy.call(this)
			},
			onDestroy : function() {
				if (this.manager) {
					this.manager.unregister(this)
				}
				Ext.Window.superclass.onDestroy.call(this)
			},
			initTools : function() {
				if (this.minimizable) {
					this.addTool({
								id : "minimize",
								handler : this.minimize
										.createDelegate(this, [])
							})
				}
				if (this.maximizable) {
					this.addTool({
								id : "maximize",
								handler : this.maximize
										.createDelegate(this, [])
							});
					this.addTool({
								id : "restore",
								handler : this.restore.createDelegate(this, []),
								hidden : true
							})
				}
				if (this.closable) {
					this.addTool({
								id : "close",
								handler : this[this.closeAction]
										.createDelegate(this, [])
							})
				}
			},
			resizerAction : function() {
				var a = this.proxy.getBox();
				this.proxy.hide();
				this.window.handleResize(a);
				return a
			},
			beforeResize : function() {
				this.resizer.minHeight = Math.max(this.minHeight, this
								.getFrameHeight()
								+ 40);
				this.resizer.minWidth = Math.max(this.minWidth, this
								.getFrameWidth()
								+ 40);
				this.resizeBox = this.el.getBox()
			},
			updateHandles : function() {
				if (Ext.isIE && this.resizer) {
					this.resizer.syncHandleHeight();
					this.el.repaint()
				}
			},
			handleResize : function(b) {
				var a = this.resizeBox;
				if (a.x != b.x || a.y != b.y) {
					this.updateBox(b)
				} else {
					this.setSize(b)
				}
				this.focus();
				this.updateHandles();
				this.saveState()
			},
			focus : function() {
				var c = this.focusEl, a = this.defaultButton, b = typeof a;
				if (Ext.isDefined(a)) {
					if (Ext.isNumber(a) && this.fbar) {
						c = this.fbar.items.get(a)
					} else {
						if (Ext.isString(a)) {
							c = Ext.getCmp(a)
						} else {
							c = a
						}
					}
				}
				c = c || this.focusEl;
				c.focus.defer(10, c)
			},
			setAnimateTarget : function(a) {
				a = Ext.get(a);
				this.animateTarget = a
			},
			beforeShow : function() {
				delete this.el.lastXY;
				delete this.el.lastLT;
				if (this.x === undefined || this.y === undefined) {
					var a = this.el.getAlignToXY(this.container, "c-c");
					var b = this.el.translatePoints(a[0], a[1]);
					this.x = this.x === undefined ? b.left : this.x;
					this.y = this.y === undefined ? b.top : this.y
				}
				this.el.setLeftTop(this.x, this.y);
				if (this.expandOnShow) {
					this.expand(false)
				}
				if (this.modal) {
					Ext.getBody().addClass("x-body-masked");
					this.mask.setSize(Ext.lib.Dom.getViewWidth(true),
							Ext.lib.Dom.getViewHeight(true));
					this.mask.show()
				}
			},
			show : function(c, a, b) {
				if (!this.rendered) {
					this.render(Ext.getBody())
				}
				if (this.hidden === false) {
					this.toFront();
					return this
				}
				if (this.fireEvent("beforeshow", this) === false) {
					return this
				}
				if (a) {
					this.on("show", a, b, {
								single : true
							})
				}
				this.hidden = false;
				if (Ext.isDefined(c)) {
					this.setAnimateTarget(c)
				}
				this.beforeShow();
				if (this.animateTarget) {
					this.animShow()
				} else {
					this.afterShow()
				}
				return this
			},
			afterShow : function(b) {
				this.proxy.hide();
				this.el.setStyle("display", "block");
				this.el.show();
				if (this.maximized) {
					this.fitContainer()
				}
				if (Ext.isMac && Ext.isGecko2) {
					this.cascade(this.setAutoScroll)
				}
				if (this.monitorResize || this.modal || this.constrain
						|| this.constrainHeader) {
					Ext.EventManager.onWindowResize(this.onWindowResize, this)
				}
				this.doConstrain();
				this.doLayout();
				if (this.keyMap) {
					this.keyMap.enable()
				}
				this.toFront();
				this.updateHandles();
				if (b && (Ext.isIE || Ext.isWebKit)) {
					var a = this.getSize();
					this.onResize(a.width, a.height)
				}
				this.onShow();
				this.fireEvent("show", this)
			},
			animShow : function() {
				this.proxy.show();
				this.proxy.setBox(this.animateTarget.getBox());
				this.proxy.setOpacity(0);
				var a = this.getBox();
				this.el.setStyle("display", "none");
				this.proxy.shift(Ext.apply(a, {
							callback : this.afterShow.createDelegate(this,
									[true], false),
							scope : this,
							easing : "easeNone",
							duration : 0.25,
							opacity : 0.5
						}))
			},
			hide : function(c, a, b) {
				if (this.hidden || this.fireEvent("beforehide", this) === false) {
					return this
				}
				if (a) {
					this.on("hide", a, b, {
								single : true
							})
				}
				this.hidden = true;
				if (c !== undefined) {
					this.setAnimateTarget(c)
				}
				if (this.modal) {
					this.mask.hide();
					Ext.getBody().removeClass("x-body-masked")
				}
				if (this.animateTarget) {
					this.animHide()
				} else {
					this.el.hide();
					this.afterHide()
				}
				return this
			},
			afterHide : function() {
				this.proxy.hide();
				if (this.monitorResize || this.modal || this.constrain
						|| this.constrainHeader) {
					Ext.EventManager.removeResizeListener(this.onWindowResize,
							this)
				}
				if (this.keyMap) {
					this.keyMap.disable()
				}
				this.onHide();
				this.fireEvent("hide", this)
			},
			animHide : function() {
				this.proxy.setOpacity(0.5);
				this.proxy.show();
				var a = this.getBox(false);
				this.proxy.setBox(a);
				this.el.hide();
				this.proxy.shift(Ext.apply(this.animateTarget.getBox(), {
							callback : this.afterHide,
							scope : this,
							duration : 0.25,
							easing : "easeNone",
							opacity : 0
						}))
			},
			onShow : Ext.emptyFn,
			onHide : Ext.emptyFn,
			onWindowResize : function() {
				if (this.maximized) {
					this.fitContainer()
				}
				if (this.modal) {
					this.mask.setSize("100%", "100%");
					var a = this.mask.dom.offsetHeight;
					this.mask.setSize(Ext.lib.Dom.getViewWidth(true),
							Ext.lib.Dom.getViewHeight(true))
				}
				this.doConstrain()
			},
			doConstrain : function() {
				if (this.constrain || this.constrainHeader) {
					var b;
					if (this.constrain) {
						b = {
							right : this.el.shadowOffset,
							left : this.el.shadowOffset,
							bottom : this.el.shadowOffset
						}
					} else {
						var a = this.getSize();
						b = {
							right : -(a.width - 100),
							bottom : -(a.height - 25)
						}
					}
					var c = this.el.getConstrainToXY(this.container, true, b);
					if (c) {
						this.setPosition(c[0], c[1])
					}
				}
			},
			ghost : function(a) {
				var c = this.createGhost(a);
				var b = this.getBox(true);
				c.setLeftTop(b.x, b.y);
				c.setWidth(b.width);
				this.el.hide();
				this.activeGhost = c;
				return c
			},
			unghost : function(b, a) {
				if (!this.activeGhost) {
					return
				}
				if (b !== false) {
					this.el.show();
					this.focus();
					if (Ext.isMac && Ext.isGecko2) {
						this.cascade(this.setAutoScroll)
					}
				}
				if (a !== false) {
					this.setPosition(this.activeGhost.getLeft(true),
							this.activeGhost.getTop(true))
				}
				this.activeGhost.hide();
				this.activeGhost.remove();
				delete this.activeGhost
			},
			minimize : function() {
				this.fireEvent("minimize", this);
				return this
			},
			close : function() {
				if (this.fireEvent("beforeclose", this) !== false) {
					if (this.hidden) {
						this.doClose()
					} else {
						this.hide(null, this.doClose, this)
					}
				}
			},
			doClose : function() {
				this.fireEvent("close", this);
				this.destroy()
			},
			maximize : function() {
				if (!this.maximized) {
					this.expand(false);
					this.restoreSize = this.getSize();
					this.restorePos = this.getPosition(true);
					if (this.maximizable) {
						this.tools.maximize.hide();
						this.tools.restore.show()
					}
					this.maximized = true;
					this.el.disableShadow();
					if (this.dd) {
						this.dd.lock()
					}
					if (this.collapsible) {
						this.tools.toggle.hide()
					}
					this.el.addClass("x-window-maximized");
					this.container.addClass("x-window-maximized-ct");
					this.setPosition(0, 0);
					this.fitContainer();
					this.fireEvent("maximize", this)
				}
				return this
			},
			restore : function() {
				if (this.maximized) {
					var a = this.tools;
					this.el.removeClass("x-window-maximized");
					if (a.restore) {
						a.restore.hide()
					}
					if (a.maximize) {
						a.maximize.show()
					}
					this.setPosition(this.restorePos[0], this.restorePos[1]);
					this.setSize(this.restoreSize.width,
							this.restoreSize.height);
					delete this.restorePos;
					delete this.restoreSize;
					this.maximized = false;
					this.el.enableShadow(true);
					if (this.dd) {
						this.dd.unlock()
					}
					if (this.collapsible && a.toggle) {
						a.toggle.show()
					}
					this.container.removeClass("x-window-maximized-ct");
					this.doConstrain();
					this.fireEvent("restore", this)
				}
				return this
			},
			toggleMaximize : function() {
				return this[this.maximized ? "restore" : "maximize"]()
			},
			fitContainer : function() {
				var a = this.container.getViewSize(false);
				this.setSize(a.width, a.height)
			},
			setZIndex : function(a) {
				if (this.modal) {
					this.mask.setStyle("z-index", a)
				}
				this.el.setZIndex(++a);
				a += 5;
				if (this.resizer) {
					this.resizer.proxy.setStyle("z-index", ++a)
				}
				this.lastZIndex = a
			},
			alignTo : function(b, a, c) {
				var d = this.el.getAlignToXY(b, a, c);
				this.setPagePosition(d[0], d[1]);
				return this
			},
			anchorTo : function(c, e, d, b) {
				if (this.doAnchor) {
					Ext.EventManager.removeResizeListener(this.doAnchor, this);
					Ext.EventManager.un(window, "scroll", this.doAnchor, this)
				}
				this.doAnchor = function() {
					this.alignTo(c, e, d)
				};
				Ext.EventManager.onWindowResize(this.doAnchor, this);
				var a = typeof b;
				if (a != "undefined") {
					Ext.EventManager.on(window, "scroll", this.doAnchor, this,
							{
								buffer : a == "number" ? b : 50
							})
				}
				this.doAnchor();
				return this
			},
			toFront : function(a) {
				if (this.manager.bringToFront(this)) {
					if (!a || !a.getTarget().focus) {
						this.focus()
					}
				}
				return this
			},
			setActive : function(a) {
				if (a) {
					if (!this.maximized) {
						this.el.enableShadow(true)
					}
					this.fireEvent("activate", this)
				} else {
					this.el.disableShadow();
					this.fireEvent("deactivate", this)
				}
			},
			toBack : function() {
				this.manager.sendToBack(this);
				return this
			},
			center : function() {
				var a = this.el.getAlignToXY(this.container, "c-c");
				this.setPagePosition(a[0], a[1]);
				return this
			}
		});
Ext.reg("window", Ext.Window);
Ext.Window.DD = function(a) {
	this.win = a;
	Ext.Window.DD.superclass.constructor
			.call(this, a.el.id, "WindowDD-" + a.id);
	this.setHandleElId(a.header.id);
	this.scroll = false
};
Ext.extend(Ext.Window.DD, Ext.dd.DD, {
			moveOnly : true,
			headerOffsets : [100, 25],
			startDrag : function() {
				var a = this.win;
				this.proxy = a.ghost();
				if (a.constrain !== false) {
					var c = a.el.shadowOffset;
					this.constrainTo(a.container, {
								right : c,
								left : c,
								bottom : c
							})
				} else {
					if (a.constrainHeader !== false) {
						var b = this.proxy.getSize();
						this.constrainTo(a.container, {
									right : -(b.width - this.headerOffsets[0]),
									bottom : -(b.height - this.headerOffsets[1])
								})
					}
				}
			},
			b4Drag : Ext.emptyFn,
			onDrag : function(a) {
				this.alignElWithMouse(this.proxy, a.getPageX(), a.getPageY())
			},
			endDrag : function(a) {
				this.win.unghost();
				this.win.saveState()
			}
		});
Ext.WindowGroup = function() {
	var f = {};
	var d = [];
	var e = null;
	var c = function(i, h) {
		return (!i._lastAccess || i._lastAccess < h._lastAccess) ? -1 : 1
	};
	var g = function() {
		var k = d, h = k.length;
		if (h > 0) {
			k.sort(c);
			var j = k[0].manager.zseed;
			for (var l = 0; l < h; l++) {
				var m = k[l];
				if (m && !m.hidden) {
					m.setZIndex(j + (l * 10))
				}
			}
		}
		a()
	};
	var b = function(h) {
		if (h != e) {
			if (e) {
				e.setActive(false)
			}
			e = h;
			if (h) {
				h.setActive(true)
			}
		}
	};
	var a = function() {
		for (var h = d.length - 1; h >= 0; --h) {
			if (!d[h].hidden) {
				b(d[h]);
				return
			}
		}
		b(null)
	};
	return {
		zseed : 9000,
		register : function(h) {
			if (h.manager) {
				h.manager.unregister(h)
			}
			h.manager = this;
			f[h.id] = h;
			d.push(h);
			h.on("hide", a)
		},
		unregister : function(h) {
			delete h.manager;
			delete f[h.id];
			h.un("hide", a);
			d.remove(h)
		},
		get : function(h) {
			return typeof h == "object" ? h : f[h]
		},
		bringToFront : function(h) {
			h = this.get(h);
			if (h != e) {
				h._lastAccess = new Date().getTime();
				g();
				return true
			}
			return false
		},
		sendToBack : function(h) {
			h = this.get(h);
			h._lastAccess = -(new Date().getTime());
			g();
			return h
		},
		hideAll : function() {
			for (var h in f) {
				if (f[h] && typeof f[h] != "function" && f[h].isVisible()) {
					f[h].hide()
				}
			}
		},
		getActive : function() {
			return e
		},
		getBy : function(k, j) {
			var l = [];
			for (var h = d.length - 1; h >= 0; --h) {
				var m = d[h];
				if (k.call(j || m, m) !== false) {
					l.push(m)
				}
			}
			return l
		},
		each : function(i, h) {
			for (var j in f) {
				if (f[j] && typeof f[j] != "function") {
					if (i.call(h || f[j], f[j]) === false) {
						return
					}
				}
			}
		}
	}
};
Ext.WindowMgr = new Ext.WindowGroup();
Ext.MessageBox = function() {
	var t, b, p, s, g, k, r, a, m, o, i, f, q, u, n, h = "", d = "", l = ["ok",
			"yes", "no", "cancel"];
	var c = function(w) {
		q[w].blur();
		if (t.isVisible()) {
			t.hide();
			v();
			Ext.callback(b.fn, b.scope || window, [w, u.dom.value, b], 1)
		}
	};
	var v = function() {
		if (b && b.cls) {
			t.el.removeClass(b.cls)
		}
		m.reset()
	};
	var e = function(y, w, x) {
		if (b && b.closable !== false) {
			t.hide();
			v()
		}
		if (x) {
			x.stopEvent()
		}
	};
	var j = function(w) {
		var y = 0, x;
		if (!w) {
			Ext.each(l, function(z) {
						q[z].hide()
					});
			return y
		}
		t.footer.dom.style.display = "";
		Ext.iterate(q, function(z, A) {
					x = w[z];
					if (x) {
						A.show();
						A.setText(Ext.isString(x)
								? x
								: Ext.MessageBox.buttonText[z]);
						y += A.getEl().getWidth() + 15
					} else {
						A.hide()
					}
				});
		return y
	};
	return {
		getDialog : function(w) {
			if (!t) {
				var y = [];
				q = {};
				Ext.each(l, function(z) {
							y.push(q[z] = new Ext.Button({
										text : this.buttonText[z],
										handler : c.createCallback(z),
										hideMode : "offsets"
									}))
						}, this);
				t = new Ext.Window({
					autoCreate : true,
					title : w,
					resizable : false,
					constrain : true,
					constrainHeader : true,
					minimizable : false,
					maximizable : false,
					stateful : false,
					modal : true,
					shim : true,
					buttonAlign : "center",
					width : 400,
					height : 100,
					minHeight : 80,
					plain : true,
					footer : true,
					closable : true,
					close : function() {
						if (b && b.buttons && b.buttons.no && !b.buttons.cancel) {
							c("no")
						} else {
							c("cancel")
						}
					},
					fbar : new Ext.Toolbar({
								items : y,
								enableOverflow : false
							})
				});
				t.render(document.body);
				t.getEl().addClass("x-window-dlg");
				p = t.mask;
				g = t.body.createChild({
					html : '<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'
				});
				i = Ext.get(g.dom.firstChild);
				var x = g.dom.childNodes[1];
				k = Ext.get(x.firstChild);
				r = Ext.get(x.childNodes[2].firstChild);
				r.enableDisplayMode();
				r.addKeyListener([10, 13], function() {
							if (t.isVisible() && b && b.buttons) {
								if (b.buttons.ok) {
									c("ok")
								} else {
									if (b.buttons.yes) {
										c("yes")
									}
								}
							}
						});
				a = Ext.get(x.childNodes[2].childNodes[1]);
				a.enableDisplayMode();
				m = new Ext.ProgressBar({
							renderTo : g
						});
				g.createChild({
							cls : "x-clear"
						})
			}
			return t
		},
		updateText : function(A) {
			if (!t.isVisible() && !b.width) {
				t.setSize(this.maxWidth, 100)
			}
			k.update(A || "&#160;");
			var y = d != "" ? (i.getWidth() + i.getMargins("lr")) : 0;
			var C = k.getWidth() + k.getMargins("lr");
			var z = t.getFrameWidth("lr");
			var B = t.body.getFrameWidth("lr");
			if (Ext.isIE && y > 0) {
				y += 3
			}
			var x = Math.max(Math.min(b.width || y + C + z + B, this.maxWidth),
					Math.max(b.minWidth || this.minWidth, n || 0));
			if (b.prompt === true) {
				u.setWidth(x - y - z - B)
			}
			if (b.progress === true || b.wait === true) {
				m.setSize(x - y - z - B)
			}
			if (Ext.isIE && x == n) {
				x += 4
			}
			t.setSize(x, "auto").center();
			return this
		},
		updateProgress : function(x, w, y) {
			m.updateProgress(x, w);
			if (y) {
				this.updateText(y)
			}
			return this
		},
		isVisible : function() {
			return t && t.isVisible()
		},
		hide : function() {
			var w = t ? t.activeGhost : null;
			if (this.isVisible() || w) {
				t.hide();
				v();
				if (w) {
					t.unghost(false, false)
				}
			}
			return this
		},
		show : function(z) {
			if (this.isVisible()) {
				this.hide()
			}
			b = z;
			var A = this.getDialog(b.title || "&#160;");
			A.setTitle(b.title || "&#160;");
			var w = (b.closable !== false && b.progress !== true && b.wait !== true);
			A.tools.close.setDisplayed(w);
			u = r;
			b.prompt = b.prompt || (b.multiline ? true : false);
			if (b.prompt) {
				if (b.multiline) {
					r.hide();
					a.show();
					a.setHeight(Ext.isNumber(b.multiline)
							? b.multiline
							: this.defaultTextHeight);
					u = a
				} else {
					r.show();
					a.hide()
				}
			} else {
				r.hide();
				a.hide()
			}
			u.dom.value = b.value || "";
			if (b.prompt) {
				A.focusEl = u
			} else {
				var y = b.buttons;
				var x = null;
				if (y && y.ok) {
					x = q.ok
				} else {
					if (y && y.yes) {
						x = q.yes
					}
				}
				if (x) {
					A.focusEl = x
				}
			}
			if (b.iconCls) {
				A.setIconClass(b.iconCls)
			}
			this.setIcon(Ext.isDefined(b.icon) ? b.icon : h);
			n = j(b.buttons);
			m.setVisible(b.progress === true || b.wait === true);
			this.updateProgress(0, b.progressText);
			this.updateText(b.msg);
			if (b.cls) {
				A.el.addClass(b.cls)
			}
			A.proxyDrag = b.proxyDrag === true;
			A.modal = b.modal !== false;
			A.mask = b.modal !== false ? p : false;
			if (!A.isVisible()) {
				document.body.appendChild(t.el.dom);
				A.setAnimateTarget(b.animEl);
				A.on("show", function() {
							if (w === true) {
								A.keyMap.enable()
							} else {
								A.keyMap.disable()
							}
						}, this, {
							single : true
						});
				A.show(b.animEl)
			}
			if (b.wait === true) {
				m.wait(b.waitConfig)
			}
			return this
		},
		setIcon : function(w) {
			if (!t) {
				h = w;
				return
			}
			h = undefined;
			if (w && w != "") {
				i.removeClass("x-hidden");
				i.replaceClass(d, w);
				g.addClass("x-dlg-icon");
				d = w
			} else {
				i.replaceClass(d, "x-hidden");
				g.removeClass("x-dlg-icon");
				d = ""
			}
			return this
		},
		progress : function(y, x, w) {
			this.show({
						title : y,
						msg : x,
						buttons : false,
						progress : true,
						closable : false,
						minWidth : this.minProgressWidth,
						progressText : w
					});
			return this
		},
		wait : function(y, x, w) {
			this.show({
						title : x,
						msg : y,
						buttons : false,
						closable : false,
						wait : true,
						modal : true,
						minWidth : this.minProgressWidth,
						waitConfig : w
					});
			return this
		},
		alert : function(z, y, x, w) {
			this.show({
						title : z,
						msg : y,
						buttons : this.OK,
						fn : x,
						scope : w
					});
			return this
		},
		confirm : function(z, y, x, w) {
			this.show({
						title : z,
						msg : y,
						buttons : this.YESNO,
						fn : x,
						scope : w,
						icon : this.QUESTION
					});
			return this
		},
		prompt : function(B, A, y, x, w, z) {
			this.show({
						title : B,
						msg : A,
						buttons : this.OKCANCEL,
						fn : y,
						minWidth : 250,
						scope : x,
						prompt : true,
						multiline : w,
						value : z
					});
			return this
		},
		OK : {
			ok : true
		},
		CANCEL : {
			cancel : true
		},
		OKCANCEL : {
			ok : true,
			cancel : true
		},
		YESNO : {
			yes : true,
			no : true
		},
		YESNOCANCEL : {
			yes : true,
			no : true,
			cancel : true
		},
		INFO : "ext-mb-info",
		WARNING : "ext-mb-warning",
		QUESTION : "ext-mb-question",
		ERROR : "ext-mb-error",
		defaultTextHeight : 75,
		maxWidth : 600,
		minWidth : 100,
		minProgressWidth : 250,
		buttonText : {
			ok : "OK",
			cancel : "Cancel",
			yes : "Yes",
			no : "No"
		}
	}
}();
Ext.Msg = Ext.MessageBox;
Ext.dd.PanelProxy = function(a, b) {
	this.panel = a;
	this.id = this.panel.id + "-ddproxy";
	Ext.apply(this, b)
};
Ext.dd.PanelProxy.prototype = {
	insertProxy : true,
	setStatus : Ext.emptyFn,
	reset : Ext.emptyFn,
	update : Ext.emptyFn,
	stop : Ext.emptyFn,
	sync : Ext.emptyFn,
	getEl : function() {
		return this.ghost
	},
	getGhost : function() {
		return this.ghost
	},
	getProxy : function() {
		return this.proxy
	},
	hide : function() {
		if (this.ghost) {
			if (this.proxy) {
				this.proxy.remove();
				delete this.proxy
			}
			this.panel.el.dom.style.display = "";
			this.ghost.remove();
			delete this.ghost
		}
	},
	show : function() {
		if (!this.ghost) {
			this.ghost = this.panel.createGhost(undefined, undefined, Ext
							.getBody());
			this.ghost.setXY(this.panel.el.getXY());
			if (this.insertProxy) {
				this.proxy = this.panel.el.insertSibling({
							cls : "x-panel-dd-spacer"
						});
				this.proxy.setSize(this.panel.getSize())
			}
			this.panel.el.dom.style.display = "none"
		}
	},
	repair : function(b, c, a) {
		this.hide();
		if (typeof c == "function") {
			c.call(a || this)
		}
	},
	moveProxy : function(a, b) {
		if (this.proxy) {
			a.insertBefore(this.proxy.dom, b)
		}
	}
};
Ext.Panel.DD = function(b, a) {
	this.panel = b;
	this.dragData = {
		panel : b
	};
	this.proxy = new Ext.dd.PanelProxy(b, a);
	Ext.Panel.DD.superclass.constructor.call(this, b.el, a);
	var c = b.header;
	if (c) {
		this.setHandleElId(c.id)
	}
	(c ? c : this.panel.body).setStyle("cursor", "move");
	this.scroll = false
};
Ext.extend(Ext.Panel.DD, Ext.dd.DragSource, {
			showFrame : Ext.emptyFn,
			startDrag : Ext.emptyFn,
			b4StartDrag : function(a, b) {
				this.proxy.show()
			},
			b4MouseDown : function(b) {
				var a = b.getPageX();
				var c = b.getPageY();
				this.autoOffset(a, c)
			},
			onInitDrag : function(a, b) {
				this.onStartDrag(a, b);
				return true
			},
			createFrame : Ext.emptyFn,
			getDragEl : function(a) {
				return this.proxy.ghost.dom
			},
			endDrag : function(a) {
				this.proxy.hide();
				this.panel.saveState()
			},
			autoOffset : function(a, b) {
				a -= this.startPageX;
				b -= this.startPageY;
				this.setDelta(a, b)
			}
		});