/*
 * Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.form.Field = Ext.extend(Ext.BoxComponent, {
			invalidClass : "x-form-invalid",
			invalidText : "The value in this field is invalid",
			focusClass : "x-form-focus",
			validationEvent : "keyup",
			validateOnBlur : true,
			validationDelay : 250,
			defaultAutoCreate : {
				tag : "input",
				type : "text",
				size : "20",
				autocomplete : "off"
			},
			fieldClass : "x-form-field",
			msgTarget : "qtip",
			msgFx : "normal",
			readOnly : false,
			disabled : false,
			submitValue : true,
			isFormField : true,
			msgDisplay : "",
			hasFocus : false,
			initComponent : function() {
				Ext.form.Field.superclass.initComponent.call(this);
				this.addEvents("focus", "blur", "specialkey", "change",
						"invalid", "valid")
			},
			getName : function() {
				return this.rendered && this.el.dom.name
						? this.el.dom.name
						: this.name || this.id || ""
			},
			onRender : function(c, a) {
				if (!this.el) {
					var b = this.getAutoCreate();
					if (!b.name) {
						b.name = this.name || this.id
					}
					if (this.inputType) {
						b.type = this.inputType
					}
					this.autoEl = b
				}
				Ext.form.Field.superclass.onRender.call(this, c, a);
				if (this.submitValue === false) {
					this.el.dom.removeAttribute("name")
				}
				var d = this.el.dom.type;
				if (d) {
					if (d == "password") {
						d = "text"
					}
					this.el.addClass("x-form-" + d)
				}
				if (this.readOnly) {
					this.setReadOnly(true)
				}
				if (this.tabIndex !== undefined) {
					this.el.dom.setAttribute("tabIndex", this.tabIndex)
				}
				this.el.addClass([this.fieldClass, this.cls])
			},
			getItemCt : function() {
				return this.itemCt
			},
			initValue : function() {
				if (this.value !== undefined) {
					this.setValue(this.value)
				} else {
					if (!Ext.isEmpty(this.el.dom.value)
							&& this.el.dom.value != this.emptyText) {
						this.setValue(this.el.dom.value)
					}
				}
				this.originalValue = this.getValue()
			},
			isDirty : function() {
				if (this.disabled || !this.rendered) {
					return false
				}
				return String(this.getValue()) !== String(this.originalValue)
			},
			setReadOnly : function(a) {
				if (this.rendered) {
					this.el.dom.readOnly = a
				}
				this.readOnly = a
			},
			afterRender : function() {
				Ext.form.Field.superclass.afterRender.call(this);
				this.initEvents();
				this.initValue()
			},
			fireKey : function(a) {
				if (a.isSpecialKey()) {
					this.fireEvent("specialkey", this, a)
				}
			},
			reset : function() {
				this.setValue(this.originalValue);
				this.clearInvalid()
			},
			initEvents : function() {
				this.mon(this.el, Ext.EventManager.useKeydown
								? "keydown"
								: "keypress", this.fireKey, this);
				this.mon(this.el, "focus", this.onFocus, this);
				this.mon(this.el, "blur", this.onBlur, this, this.inEditor ? {
							buffer : 10
						} : null)
			},
			preFocus : Ext.emptyFn,
			onFocus : function() {
				this.preFocus();
				if (this.focusClass) {
					this.el.addClass(this.focusClass)
				}
				if (!this.hasFocus) {
					this.hasFocus = true;
					this.startValue = this.getValue();
					this.fireEvent("focus", this)
				}
			},
			beforeBlur : Ext.emptyFn,
			onBlur : function() {
				this.beforeBlur();
				if (this.focusClass) {
					this.el.removeClass(this.focusClass)
				}
				this.hasFocus = false;
				if (this.validationEvent !== false
						&& (this.validateOnBlur || this.validationEvent == "blur")) {
					this.validate()
				}
				var a = this.getValue();
				if (String(a) !== String(this.startValue)) {
					this.fireEvent("change", this, a, this.startValue)
				}
				this.fireEvent("blur", this);
				this.postBlur()
			},
			postBlur : Ext.emptyFn,
			isValid : function(a) {
				if (this.disabled) {
					return true
				}
				var c = this.preventMark;
				this.preventMark = a === true;
				var b = this.validateValue(this
						.processValue(this.getRawValue()));
				this.preventMark = c;
				return b
			},
			validate : function() {
				if (this.disabled
						|| this.validateValue(this.processValue(this
								.getRawValue()))) {
					this.clearInvalid();
					return true
				}
				return false
			},
			processValue : function(a) {
				return a
			},
			validateValue : function(a) {
				return true
			},
			getActiveError : function() {
				return this.activeError || ""
			},
			markInvalid : function(c) {
				if (!this.rendered || this.preventMark) {
					return
				}
				c = c || this.invalidText;
				var a = this.getMessageHandler();
				if (a) {
					a.mark(this, c)
				} else {
					if (this.msgTarget) {
						this.el.addClass(this.invalidClass);
						var b = Ext.getDom(this.msgTarget);
						if (b) {
							b.innerHTML = c;
							b.style.display = this.msgDisplay
						}
					}
				}
				this.activeError = c;
				this.fireEvent("invalid", this, c)
			},
			clearInvalid : function() {
				if (!this.rendered || this.preventMark) {
					return
				}
				this.el.removeClass(this.invalidClass);
				var a = this.getMessageHandler();
				if (a) {
					a.clear(this)
				} else {
					if (this.msgTarget) {
						this.el.removeClass(this.invalidClass);
						var b = Ext.getDom(this.msgTarget);
						if (b) {
							b.innerHTML = "";
							b.style.display = "none"
						}
					}
				}
				delete this.activeError;
				this.fireEvent("valid", this)
			},
			getMessageHandler : function() {
				return Ext.form.MessageTargets[this.msgTarget]
			},
			getErrorCt : function() {
				return this.el.findParent(".x-form-element", 5, true)
						|| this.el.findParent(".x-form-field-wrap", 5, true)
			},
			alignErrorIcon : function() {
				this.errorIcon.alignTo(this.el, "tl-tr", [2, 0])
			},
			getRawValue : function() {
				var a = this.rendered ? this.el.getValue() : Ext.value(
						this.value, "");
				if (a === this.emptyText) {
					a = ""
				}
				return a
			},
			getValue : function() {
				if (!this.rendered) {
					return this.value
				}
				var a = this.el.getValue();
				if (a === this.emptyText || a === undefined) {
					a = ""
				}
				return a
			},
			setRawValue : function(a) {
				return this.rendered ? (this.el.dom.value = (Ext.isEmpty(a)
						? ""
						: a)) : ""
			},
			setValue : function(a) {
				this.value = a;
				if (this.rendered) {
					this.el.dom.value = (Ext.isEmpty(a) ? "" : a);
					this.validate()
				}
				return this
			},
			append : function(a) {
				this.setValue([this.getValue(), a].join(""))
			}
		});
Ext.form.MessageTargets = {
	qtip : {
		mark : function(a, b) {
			a.el.addClass(a.invalidClass);
			a.el.dom.qtip = b;
			a.el.dom.qclass = "x-form-invalid-tip";
			if (Ext.QuickTips) {
				Ext.QuickTips.enable()
			}
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			a.el.dom.qtip = ""
		}
	},
	title : {
		mark : function(a, b) {
			a.el.addClass(a.invalidClass);
			a.el.dom.title = b
		},
		clear : function(a) {
			a.el.dom.title = ""
		}
	},
	under : {
		mark : function(b, c) {
			b.el.addClass(b.invalidClass);
			if (!b.errorEl) {
				var a = b.getErrorCt();
				if (!a) {
					b.el.dom.title = c;
					return
				}
				b.errorEl = a.createChild({
							cls : "x-form-invalid-msg"
						});
				b.errorEl.setWidth(a.getWidth(true) - 20)
			}
			b.errorEl.update(c);
			Ext.form.Field.msgFx[b.msgFx].show(b.errorEl, b)
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			if (a.errorEl) {
				Ext.form.Field.msgFx[a.msgFx].hide(a.errorEl, a)
			} else {
				a.el.dom.title = ""
			}
		}
	},
	side : {
		mark : function(b, c) {
			b.el.addClass(b.invalidClass);
			if (!b.errorIcon) {
				var a = b.getErrorCt();
				if (!a) {
					b.el.dom.title = c;
					return
				}
				b.errorIcon = a.createChild({
							cls : "x-form-invalid-icon"
						})
			}
			b.alignErrorIcon();
			b.errorIcon.dom.qtip = c;
			b.errorIcon.dom.qclass = "x-form-invalid-tip";
			b.errorIcon.show();
			b.on("resize", b.alignErrorIcon, b)
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			if (a.errorIcon) {
				a.errorIcon.dom.qtip = "";
				a.errorIcon.hide();
				a.un("resize", a.alignErrorIcon, a)
			} else {
				a.el.dom.title = ""
			}
		}
	}
};
Ext.form.Field.msgFx = {
	normal : {
		show : function(a, b) {
			a.setDisplayed("block")
		},
		hide : function(a, b) {
			a.setDisplayed(false).update("")
		}
	},
	slide : {
		show : function(a, b) {
			a.slideIn("t", {
						stopFx : true
					})
		},
		hide : function(a, b) {
			a.slideOut("t", {
						stopFx : true,
						useDisplay : true
					})
		}
	},
	slideRight : {
		show : function(a, b) {
			a.fixDisplay();
			a.alignTo(b.el, "tl-tr");
			a.slideIn("l", {
						stopFx : true
					})
		},
		hide : function(a, b) {
			a.slideOut("l", {
						stopFx : true,
						useDisplay : true
					})
		}
	}
};
Ext.reg("field", Ext.form.Field);
Ext.form.TextField = Ext.extend(Ext.form.Field, {
	grow : false,
	growMin : 30,
	growMax : 800,
	vtype : null,
	maskRe : null,
	disableKeyFilter : false,
	allowBlank : true,
	minLength : 0,
	maxLength : Number.MAX_VALUE,
	minLengthText : "The minimum length for this field is {0}",
	maxLengthText : "The maximum length for this field is {0}",
	selectOnFocus : false,
	blankText : "This field is required",
	validator : null,
	regex : null,
	regexText : "",
	emptyText : null,
	emptyClass : "x-form-empty-field",
	initComponent : function() {
		Ext.form.TextField.superclass.initComponent.call(this);
		this.addEvents("autosize", "keydown", "keyup", "keypress")
	},
	initEvents : function() {
		Ext.form.TextField.superclass.initEvents.call(this);
		if (this.validationEvent == "keyup") {
			this.validationTask = new Ext.util.DelayedTask(this.validate, this);
			this.mon(this.el, "keyup", this.filterValidation, this)
		} else {
			if (this.validationEvent !== false
					&& this.validationEvent != "blur") {
				this.mon(this.el, this.validationEvent, this.validate, this, {
							buffer : this.validationDelay
						})
			}
		}
		if (this.selectOnFocus || this.emptyText) {
			this.mon(this.el, "mousedown", this.onMouseDown, this);
			if (this.emptyText) {
				this.applyEmptyText()
			}
		}
		if (this.maskRe
				|| (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Ext.form.VTypes[this.vtype
						+ "Mask"]))) {
			this.mon(this.el, "keypress", this.filterKeys, this)
		}
		if (this.grow) {
			this.mon(this.el, "keyup", this.onKeyUpBuffered, this, {
						buffer : 50
					});
			this.mon(this.el, "click", this.autoSize, this)
		}
		if (this.enableKeyEvents) {
			this.mon(this.el, {
						scope : this,
						keyup : this.onKeyUp,
						keydown : this.onKeyDown,
						keypress : this.onKeyPress
					})
		}
	},
	onMouseDown : function(a) {
		if (!this.hasFocus) {
			this.mon(this.el, "mouseup", Ext.emptyFn, this, {
						single : true,
						preventDefault : true
					})
		}
	},
	processValue : function(a) {
		if (this.stripCharsRe) {
			var b = a.replace(this.stripCharsRe, "");
			if (b !== a) {
				this.setRawValue(b);
				return b
			}
		}
		return a
	},
	filterValidation : function(a) {
		if (!a.isNavKeyPress()) {
			this.validationTask.delay(this.validationDelay)
		}
	},
	onDisable : function() {
		Ext.form.TextField.superclass.onDisable.call(this);
		if (Ext.isIE) {
			this.el.dom.unselectable = "on"
		}
	},
	onEnable : function() {
		Ext.form.TextField.superclass.onEnable.call(this);
		if (Ext.isIE) {
			this.el.dom.unselectable = ""
		}
	},
	onKeyUpBuffered : function(a) {
		if (this.doAutoSize(a)) {
			this.autoSize()
		}
	},
	doAutoSize : function(a) {
		return !a.isNavKeyPress()
	},
	onKeyUp : function(a) {
		this.fireEvent("keyup", this, a)
	},
	onKeyDown : function(a) {
		this.fireEvent("keydown", this, a)
	},
	onKeyPress : function(a) {
		this.fireEvent("keypress", this, a)
	},
	reset : function() {
		Ext.form.TextField.superclass.reset.call(this);
		this.applyEmptyText()
	},
	applyEmptyText : function() {
		if (this.rendered && this.emptyText && this.getRawValue().length < 1
				&& !this.hasFocus) {
			this.setRawValue(this.emptyText);
			this.el.addClass(this.emptyClass)
		}
	},
	preFocus : function() {
		var a = this.el;
		if (this.emptyText) {
			if (a.dom.value == this.emptyText) {
				this.setRawValue("")
			}
			a.removeClass(this.emptyClass)
		}
		if (this.selectOnFocus) {
			a.dom.select()
		}
	},
	postBlur : function() {
		this.applyEmptyText()
	},
	filterKeys : function(b) {
		if (b.ctrlKey) {
			return
		}
		var a = b.getKey();
		if (Ext.isGecko
				&& (b.isNavKeyPress() || a == b.BACKSPACE || (a == b.DELETE && b.button == -1))) {
			return
		}
		var c = String.fromCharCode(b.getCharCode());
		if (!Ext.isGecko && b.isSpecialKey() && !c) {
			return
		}
		if (!this.maskRe.test(c)) {
			b.stopEvent()
		}
	},
	setValue : function(a) {
		if (this.emptyText && this.el && !Ext.isEmpty(a)) {
			this.el.removeClass(this.emptyClass)
		}
		Ext.form.TextField.superclass.setValue.apply(this, arguments);
		this.applyEmptyText();
		this.autoSize();
		return this
	},
	validateValue : function(a) {
		if (Ext.isFunction(this.validator)) {
			var c = this.validator(a);
			if (c !== true) {
				this.markInvalid(c);
				return false
			}
		}
		if (a.length < 1 || a === this.emptyText) {
			if (this.allowBlank) {
				this.clearInvalid();
				return true
			} else {
				this.markInvalid(this.blankText);
				return false
			}
		}
		if (a.length < this.minLength) {
			this.markInvalid(String.format(this.minLengthText, this.minLength));
			return false
		}
		if (a.length > this.maxLength) {
			this.markInvalid(String.format(this.maxLengthText, this.maxLength));
			return false
		}
		if (this.vtype) {
			var b = Ext.form.VTypes;
			if (!b[this.vtype](a, this)) {
				this.markInvalid(this.vtypeText || b[this.vtype + "Text"]);
				return false
			}
		}
		if (this.regex && !this.regex.test(a)) {
			this.markInvalid(this.regexText);
			return false
		}
		return true
	},
	selectText : function(g, a) {
		var c = this.getRawValue();
		var e = false;
		if (c.length > 0) {
			g = g === undefined ? 0 : g;
			a = a === undefined ? c.length : a;
			var f = this.el.dom;
			if (f.setSelectionRange) {
				f.setSelectionRange(g, a)
			} else {
				if (f.createTextRange) {
					var b = f.createTextRange();
					b.moveStart("character", g);
					b.moveEnd("character", a - c.length);
					b.select()
				}
			}
			e = Ext.isGecko || Ext.isOpera
		} else {
			e = true
		}
		if (e) {
			this.focus()
		}
	},
	autoSize : function() {
		if (!this.grow || !this.rendered) {
			return
		}
		if (!this.metrics) {
			this.metrics = Ext.util.TextMetrics.createInstance(this.el)
		}
		var c = this.el;
		var b = c.dom.value;
		var e = document.createElement("div");
		e.appendChild(document.createTextNode(b));
		b = e.innerHTML;
		Ext.removeNode(e);
		e = null;
		b += "&#160;";
		var a = Math.min(this.growMax, Math.max(this.metrics.getWidth(b) + 10,
						this.growMin));
		this.el.setWidth(a);
		this.fireEvent("autosize", this, a)
	},
	onDestroy : function() {
		if (this.validationTask) {
			this.validationTask.cancel();
			this.validationTask = null
		}
		Ext.form.TextField.superclass.onDestroy.call(this)
	}
});
Ext.reg("textfield", Ext.form.TextField);
Ext.form.TriggerField = Ext.extend(Ext.form.TextField, {
			defaultAutoCreate : {
				tag : "input",
				type : "text",
				size : "16",
				autocomplete : "off"
			},
			hideTrigger : false,
			editable : true,
			readOnly : false,
			wrapFocusClass : "x-trigger-wrap-focus",
			autoSize : Ext.emptyFn,
			monitorTab : true,
			deferHeight : true,
			mimicing : false,
			actionMode : "wrap",
			removeMode : "container",
			defaultTriggerWidth : 17,
			onResize : function(a, c) {
				Ext.form.TriggerField.superclass.onResize.call(this, a, c);
				var b = this.getTriggerWidth();
				if (Ext.isNumber(a)) {
					this.el.setWidth(a - b)
				}
				this.wrap.setWidth(this.el.getWidth() + b)
			},
			getTriggerWidth : function() {
				var a = this.trigger.getWidth();
				if (!this.hideTrigger && a === 0) {
					a = this.defaultTriggerWidth
				}
				return a
			},
			alignErrorIcon : function() {
				if (this.wrap) {
					this.errorIcon.alignTo(this.wrap, "tl-tr", [2, 0])
				}
			},
			onRender : function(b, a) {
				this.doc = Ext.isIE ? Ext.getBody() : Ext.getDoc();
				Ext.form.TriggerField.superclass.onRender.call(this, b, a);
				this.wrap = this.el.wrap({
							cls : "x-form-field-wrap x-form-field-trigger-wrap"
						});
				this.trigger = this.wrap.createChild(this.triggerConfig || {
					tag : "img",
					src : Ext.BLANK_IMAGE_URL,
					cls : "x-form-trigger " + this.triggerClass
				});
				this.initTrigger();
				if (!this.width) {
					this.wrap.setWidth(this.el.getWidth()
							+ this.trigger.getWidth())
				}
				this.resizeEl = this.positionEl = this.wrap;
				this.updateEditState()
			},
			updateEditState : function() {
				if (this.rendered) {
					if (this.readOnly) {
						this.el.dom.readOnly = true;
						this.el.addClass("x-trigger-noedit");
						this.mun(this.el, "click", this.onTriggerClick, this);
						this.trigger.setDisplayed(false)
					} else {
						if (!this.editable) {
							this.el.dom.readOnly = true;
							this.el.addClass("x-trigger-noedit");
							this.mon(this.el, "click", this.onTriggerClick,
									this)
						} else {
							this.el.dom.readOnly = false;
							this.el.removeClass("x-trigger-noedit");
							this.mun(this.el, "click", this.onTriggerClick,
									this)
						}
						this.trigger.setDisplayed(!this.hideTrigger)
					}
					this.onResize(this.width || this.wrap.getWidth())
				}
			},
			setHideTrigger : function(a) {
				if (a != this.hideTrigger) {
					this.hideTrigger = a;
					this.updateEditState()
				}
			},
			setEditable : function(a) {
				if (a != this.editable) {
					this.editable = a;
					this.updateEditState()
				}
			},
			setReadOnly : function(a) {
				if (a != this.readOnly) {
					this.readOnly = a;
					this.updateEditState()
				}
			},
			afterRender : function() {
				Ext.form.TriggerField.superclass.afterRender.call(this)
			},
			initTrigger : function() {
				this.mon(this.trigger, "click", this.onTriggerClick, this, {
							preventDefault : true
						});
				this.trigger.addClassOnOver("x-form-trigger-over");
				this.trigger.addClassOnClick("x-form-trigger-click")
			},
			onDestroy : function() {
				Ext.destroy(this.trigger, this.wrap);
				if (this.mimicing) {
					this.doc.un("mousedown", this.mimicBlur, this)
				}
				delete this.doc;
				Ext.form.TriggerField.superclass.onDestroy.call(this)
			},
			onFocus : function() {
				Ext.form.TriggerField.superclass.onFocus.call(this);
				if (!this.mimicing) {
					this.wrap.addClass(this.wrapFocusClass);
					this.mimicing = true;
					this.doc.on("mousedown", this.mimicBlur, this, {
								delay : 10
							});
					if (this.monitorTab) {
						this.on("specialkey", this.checkTab, this)
					}
				}
			},
			checkTab : function(a, b) {
				if (b.getKey() == b.TAB) {
					this.triggerBlur()
				}
			},
			onBlur : Ext.emptyFn,
			mimicBlur : function(a) {
				if (!this.isDestroyed && !this.wrap.contains(a.target)
						&& this.validateBlur(a)) {
					this.triggerBlur()
				}
			},
			triggerBlur : function() {
				this.mimicing = false;
				this.doc.un("mousedown", this.mimicBlur, this);
				if (this.monitorTab && this.el) {
					this.un("specialkey", this.checkTab, this)
				}
				Ext.form.TriggerField.superclass.onBlur.call(this);
				if (this.wrap) {
					this.wrap.removeClass(this.wrapFocusClass)
				}
			},
			beforeBlur : Ext.emptyFn,
			validateBlur : function(a) {
				return true
			},
			onTriggerClick : Ext.emptyFn
		});
Ext.form.TwinTriggerField = Ext.extend(Ext.form.TriggerField, {
			initComponent : function() {
				Ext.form.TwinTriggerField.superclass.initComponent.call(this);
				this.triggerConfig = {
					tag : "span",
					cls : "x-form-twin-triggers",
					cn : [{
								tag : "img",
								src : Ext.BLANK_IMAGE_URL,
								cls : "x-form-trigger " + this.trigger1Class
							}, {
								tag : "img",
								src : Ext.BLANK_IMAGE_URL,
								cls : "x-form-trigger " + this.trigger2Class
							}]
				}
			},
			getTrigger : function(a) {
				return this.triggers[a]
			},
			initTrigger : function() {
				var a = this.trigger.select(".x-form-trigger", true);
				var b = this;
				a.each(function(d, f, c) {
							var e = "Trigger" + (c + 1);
							d.hide = function() {
								var g = b.wrap.getWidth();
								this.dom.style.display = "none";
								b.el.setWidth(g - b.trigger.getWidth());
								this["hidden" + e] = true
							};
							d.show = function() {
								var g = b.wrap.getWidth();
								this.dom.style.display = "";
								b.el.setWidth(g - b.trigger.getWidth());
								this["hidden" + e] = false
							};
							if (this["hide" + e]) {
								d.dom.style.display = "none";
								this["hidden" + e] = true
							}
							this.mon(d, "click", this["on" + e + "Click"],
									this, {
										preventDefault : true
									});
							d.addClassOnOver("x-form-trigger-over");
							d.addClassOnClick("x-form-trigger-click")
						}, this);
				this.triggers = a.elements
			},
			getTriggerWidth : function() {
				var a = 0;
				Ext.each(this.triggers, function(d, c) {
							var e = "Trigger" + (c + 1), b = d.getWidth();
							if (b === 0 && !this["hidden" + e]) {
								a += this.defaultTriggerWidth
							} else {
								a += b
							}
						}, this);
				return a
			},
			onDestroy : function() {
				Ext.destroy(this.triggers);
				Ext.form.TwinTriggerField.superclass.onDestroy.call(this)
			},
			onTrigger1Click : Ext.emptyFn,
			onTrigger2Click : Ext.emptyFn
		});
Ext.reg("trigger", Ext.form.TriggerField);
Ext.form.TextArea = Ext.extend(Ext.form.TextField, {
	growMin : 60,
	growMax : 1000,
	growAppend : "&#160;\n&#160;",
	enterIsSpecial : false,
	preventScrollbars : false,
	onRender : function(b, a) {
		if (!this.el) {
			this.defaultAutoCreate = {
				tag : "textarea",
				style : "width:100px;height:60px;",
				autocomplete : "off"
			}
		}
		Ext.form.TextArea.superclass.onRender.call(this, b, a);
		if (this.grow) {
			this.textSizeEl = Ext.DomHelper.append(document.body, {
						tag : "pre",
						cls : "x-form-grow-sizer"
					});
			if (this.preventScrollbars) {
				this.el.setStyle("overflow", "hidden")
			}
			this.el.setHeight(this.growMin)
		}
	},
	onDestroy : function() {
		Ext.removeNode(this.textSizeEl);
		Ext.form.TextArea.superclass.onDestroy.call(this)
	},
	fireKey : function(a) {
		if (a.isSpecialKey()
				&& (this.enterIsSpecial || (a.getKey() != a.ENTER || a
						.hasModifier()))) {
			this.fireEvent("specialkey", this, a)
		}
	},
	doAutoSize : function(a) {
		return !a.isNavKeyPress() || a.getKey() == a.ENTER
	},
	autoSize : function() {
		if (!this.grow || !this.textSizeEl) {
			return
		}
		var c = this.el, a = Ext.util.Format.htmlEncode(c.dom.value), d = this.textSizeEl, b;
		Ext.fly(d).setWidth(this.el.getWidth());
		if (a.length < 1) {
			a = "&#160;&#160;"
		} else {
			a += this.growAppend;
			if (Ext.isIE) {
				a = a.replace(/\n/g, "&#160;<br />")
			}
		}
		d.innerHTML = a;
		b = Math.min(this.growMax, Math.max(d.offsetHeight, this.growMin));
		if (b != this.lastHeight) {
			this.lastHeight = b;
			this.el.setHeight(b);
			this.fireEvent("autosize", this, b)
		}
	}
});
Ext.reg("textarea", Ext.form.TextArea);
Ext.form.NumberField = Ext.extend(Ext.form.TextField, {
			fieldClass : "x-form-field x-form-num-field",
			allowDecimals : true,
			decimalSeparator : ".",
			decimalPrecision : 2,
			allowNegative : true,
			minValue : Number.NEGATIVE_INFINITY,
			maxValue : Number.MAX_VALUE,
			minText : "The minimum value for this field is {0}",
			maxText : "The maximum value for this field is {0}",
			nanText : "{0} is not a valid number",
			baseChars : "0123456789",
			initEvents : function() {
				var a = this.baseChars + "";
				if (this.allowDecimals) {
					a += this.decimalSeparator
				}
				if (this.allowNegative) {
					a += "-"
				}
				this.maskRe = new RegExp("[" + Ext.escapeRe(a) + "]");
				Ext.form.NumberField.superclass.initEvents.call(this)
			},
			validateValue : function(b) {
				if (!Ext.form.NumberField.superclass.validateValue
						.call(this, b)) {
					return false
				}
				if (b.length < 1) {
					return true
				}
				b = String(b).replace(this.decimalSeparator, ".");
				if (isNaN(b)) {
					this.markInvalid(String.format(this.nanText, b));
					return false
				}
				var a = this.parseValue(b);
				if (a < this.minValue) {
					this
							.markInvalid(String.format(this.minText,
									this.minValue));
					return false
				}
				if (a > this.maxValue) {
					this
							.markInvalid(String.format(this.maxText,
									this.maxValue));
					return false
				}
				return true
			},
			getValue : function() {
				return this.fixPrecision(this
						.parseValue(Ext.form.NumberField.superclass.getValue
								.call(this)))
			},
			setValue : function(a) {
				a = Ext.isNumber(a) ? a : parseFloat(String(a).replace(
						this.decimalSeparator, "."));
				a = isNaN(a) ? "" : String(a).replace(".",
						this.decimalSeparator);
				return Ext.form.NumberField.superclass.setValue.call(this, a)
			},
			setMinValue : function(a) {
				this.minValue = Ext.num(a, Number.NEGATIVE_INFINITY)
			},
			setMaxValue : function(a) {
				this.maxValue = Ext.num(a, Number.MAX_VALUE)
			},
			parseValue : function(a) {
				a = parseFloat(String(a).replace(this.decimalSeparator, "."));
				return isNaN(a) ? "" : a
			},
			fixPrecision : function(b) {
				var a = isNaN(b);
				if (!this.allowDecimals || this.decimalPrecision == -1 || a
						|| !b) {
					return a ? "" : b
				}
				return parseFloat(parseFloat(b).toFixed(this.decimalPrecision))
			},
			beforeBlur : function() {
				var a = this.parseValue(this.getRawValue());
				if (!Ext.isEmpty(a)) {
					this.setValue(this.fixPrecision(a))
				}
			}
		});
Ext.reg("numberfield", Ext.form.NumberField);
Ext.form.DateField = Ext.extend(Ext.form.TriggerField, {
	format : "m/d/Y",
	altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d",
	disabledDaysText : "Disabled",
	disabledDatesText : "Disabled",
	minText : "The date in this field must be equal to or after {0}",
	maxText : "The date in this field must be equal to or before {0}",
	invalidText : "{0} is not a valid date - it must be in the format {1}",
	triggerClass : "x-form-date-trigger",
	showToday : true,
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "10",
		autocomplete : "off"
	},
	initComponent : function() {
		Ext.form.DateField.superclass.initComponent.call(this);
		this.addEvents("select");
		if (Ext.isString(this.minValue)) {
			this.minValue = this.parseDate(this.minValue)
		}
		if (Ext.isString(this.maxValue)) {
			this.maxValue = this.parseDate(this.maxValue)
		}
		this.disabledDatesRE = null;
		this.initDisabledDays()
	},
	initEvents : function() {
		Ext.form.DateField.superclass.initEvents.call(this);
		this.keyNav = new Ext.KeyNav(this.el, {
					down : function(a) {
						this.onTriggerClick()
					},
					scope : this,
					forceKeyDown : true
				})
	},
	initDisabledDays : function() {
		if (this.disabledDates) {
			var b = this.disabledDates, a = b.length - 1, c = "(?:";
			Ext.each(b, function(f, e) {
						c += Ext.isDate(f)
								? "^" + Ext.escapeRe(f.dateFormat(this.format))
										+ "$"
								: b[e];
						if (e != a) {
							c += "|"
						}
					}, this);
			this.disabledDatesRE = new RegExp(c + ")")
		}
	},
	setDisabledDates : function(a) {
		this.disabledDates = a;
		this.initDisabledDays();
		if (this.menu) {
			this.menu.picker.setDisabledDates(this.disabledDatesRE)
		}
	},
	setDisabledDays : function(a) {
		this.disabledDays = a;
		if (this.menu) {
			this.menu.picker.setDisabledDays(a)
		}
	},
	setMinValue : function(a) {
		this.minValue = (Ext.isString(a) ? this.parseDate(a) : a);
		if (this.menu) {
			this.menu.picker.setMinDate(this.minValue)
		}
	},
	setMaxValue : function(a) {
		this.maxValue = (Ext.isString(a) ? this.parseDate(a) : a);
		if (this.menu) {
			this.menu.picker.setMaxDate(this.maxValue)
		}
	},
	validateValue : function(e) {
		e = this.formatDate(e);
		if (!Ext.form.DateField.superclass.validateValue.call(this, e)) {
			return false
		}
		if (e.length < 1) {
			return true
		}
		var c = e;
		e = this.parseDate(e);
		if (!e) {
			this.markInvalid(String.format(this.invalidText, c, this.format));
			return false
		}
		var f = e.getTime();
		if (this.minValue && f < this.minValue.getTime()) {
			this.markInvalid(String.format(this.minText, this
							.formatDate(this.minValue)));
			return false
		}
		if (this.maxValue && f > this.maxValue.getTime()) {
			this.markInvalid(String.format(this.maxText, this
							.formatDate(this.maxValue)));
			return false
		}
		if (this.disabledDays) {
			var a = e.getDay();
			for (var b = 0; b < this.disabledDays.length; b++) {
				if (a === this.disabledDays[b]) {
					this.markInvalid(this.disabledDaysText);
					return false
				}
			}
		}
		var d = this.formatDate(e);
		if (this.disabledDatesRE && this.disabledDatesRE.test(d)) {
			this.markInvalid(String.format(this.disabledDatesText, d));
			return false
		}
		return true
	},
	validateBlur : function() {
		return !this.menu || !this.menu.isVisible()
	},
	getValue : function() {
		return this
				.parseDate(Ext.form.DateField.superclass.getValue.call(this))
				|| ""
	},
	setValue : function(a) {
		return Ext.form.DateField.superclass.setValue.call(this, this
						.formatDate(this.parseDate(a)))
	},
	parseDate : function(d) {
		if (!d || Ext.isDate(d)) {
			return d
		}
		var b = Date.parseDate(d, this.format);
		if (!b && this.altFormats) {
			if (!this.altFormatsArray) {
				this.altFormatsArray = this.altFormats.split("|")
			}
			for (var c = 0, a = this.altFormatsArray.length; c < a && !b; c++) {
				b = Date.parseDate(d, this.altFormatsArray[c])
			}
		}
		return b
	},
	onDestroy : function() {
		Ext.destroy(this.menu, this.keyNav);
		Ext.form.DateField.superclass.onDestroy.call(this)
	},
	formatDate : function(a) {
		return Ext.isDate(a) ? a.dateFormat(this.format) : a
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return
		}
		if (this.menu == null) {
			this.menu = new Ext.menu.DateMenu({
						hideOnClick : false,
						focusOnSelect : false
					})
		}
		this.onFocus();
		Ext.apply(this.menu.picker, {
					minDate : this.minValue,
					maxDate : this.maxValue,
					disabledDatesRE : this.disabledDatesRE,
					disabledDatesText : this.disabledDatesText,
					disabledDays : this.disabledDays,
					disabledDaysText : this.disabledDaysText,
					format : this.format,
					showToday : this.showToday,
					minText : String.format(this.minText, this
									.formatDate(this.minValue)),
					maxText : String.format(this.maxText, this
									.formatDate(this.maxValue))
				});
		this.menu.picker.setValue(this.getValue() || new Date());
		this.menu.show(this.el, "tl-bl?");
		this.menuEvents("on")
	},
	menuEvents : function(a) {
		this.menu[a]("select", this.onSelect, this);
		this.menu[a]("hide", this.onMenuHide, this);
		this.menu[a]("show", this.onFocus, this)
	},
	onSelect : function(a, b) {
		this.setValue(b);
		this.fireEvent("select", this, b);
		this.menu.hide()
	},
	onMenuHide : function() {
		this.focus(false, 60);
		this.menuEvents("un")
	},
	beforeBlur : function() {
		var a = this.parseDate(this.getRawValue());
		if (a) {
			this.setValue(a)
		}
	}
});
Ext.reg("datefield", Ext.form.DateField);
Ext.form.DisplayField = Ext.extend(Ext.form.Field, {
			validationEvent : false,
			validateOnBlur : false,
			defaultAutoCreate : {
				tag : "div"
			},
			fieldClass : "x-form-display-field",
			htmlEncode : false,
			initEvents : Ext.emptyFn,
			isValid : function() {
				return true
			},
			validate : function() {
				return true
			},
			getRawValue : function() {
				var a = this.rendered ? this.el.dom.innerHTML : Ext.value(
						this.value, "");
				if (a === this.emptyText) {
					a = ""
				}
				if (this.htmlEncode) {
					a = Ext.util.Format.htmlDecode(a)
				}
				return a
			},
			getValue : function() {
				return this.getRawValue()
			},
			getName : function() {
				return this.name
			},
			setRawValue : function(a) {
				if (this.htmlEncode) {
					a = Ext.util.Format.htmlEncode(a)
				}
				return this.rendered ? (this.el.dom.innerHTML = (Ext.isEmpty(a)
						? ""
						: a)) : (this.value = a)
			},
			setValue : function(a) {
				this.setRawValue(a);
				return this
			}
		});
Ext.reg("displayfield", Ext.form.DisplayField);
Ext.form.ComboBox = Ext.extend(Ext.form.TriggerField, {
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "24",
		autocomplete : "off"
	},
	listClass : "",
	selectedClass : "x-combo-selected",
	listEmptyText : "",
	triggerClass : "x-form-arrow-trigger",
	shadow : "sides",
	listAlign : "tl-bl?",
	maxHeight : 300,
	minHeight : 90,
	triggerAction : "query",
	minChars : 4,
	typeAhead : false,
	queryDelay : 500,
	pageSize : 0,
	selectOnFocus : false,
	queryParam : "query",
	loadingText : "Loading...",
	resizable : false,
	handleHeight : 8,
	allQuery : "",
	mode : "remote",
	minListWidth : 70,
	forceSelection : false,
	typeAheadDelay : 250,
	lazyInit : true,
	clearFilterOnReset : true,
	submitValue : undefined,
	initComponent : function() {
		Ext.form.ComboBox.superclass.initComponent.call(this);
		this.addEvents("expand", "collapse", "beforeselect", "select",
				"beforequery");
		if (this.transform) {
			var c = Ext.getDom(this.transform);
			if (!this.hiddenName) {
				this.hiddenName = c.name
			}
			if (!this.store) {
				this.mode = "local";
				var h = [], e = c.options;
				for (var b = 0, a = e.length; b < a; b++) {
					var g = e[b], f = (g.hasAttribute
							? g.hasAttribute("value")
							: g.getAttributeNode("value").specified)
							? g.value
							: g.text;
					if (g.selected && Ext.isEmpty(this.value, true)) {
						this.value = f
					}
					h.push([f, g.text])
				}
				this.store = new Ext.data.ArrayStore({
							id : 0,
							fields : ["value", "text"],
							data : h,
							autoDestroy : true
						});
				this.valueField = "value";
				this.displayField = "text"
			}
			c.name = Ext.id();
			if (!this.lazyRender) {
				this.target = true;
				this.el = Ext.DomHelper.insertBefore(c, this.autoCreate
								|| this.defaultAutoCreate);
				this.render(this.el.parentNode, c)
			}
			Ext.removeNode(c)
		} else {
			if (this.store) {
				this.store = Ext.StoreMgr.lookup(this.store);
				if (this.store.autoCreated) {
					this.displayField = this.valueField = "field1";
					if (!this.store.expandData) {
						this.displayField = "field2"
					}
					this.mode = "local"
				}
			}
		}
		this.selectedIndex = -1;
		if (this.mode == "local") {
			if (!Ext.isDefined(this.initialConfig.queryDelay)) {
				this.queryDelay = 10
			}
			if (!Ext.isDefined(this.initialConfig.minChars)) {
				this.minChars = 0
			}
		}
	},
	onRender : function(b, a) {
		if (this.hiddenName && !Ext.isDefined(this.submitValue)) {
			this.submitValue = false
		}
		Ext.form.ComboBox.superclass.onRender.call(this, b, a);
		if (this.hiddenName) {
			this.hiddenField = this.el.insertSibling({
						tag : "input",
						type : "hidden",
						name : this.hiddenName,
						id : (this.hiddenId || this.hiddenName)
					}, "before", true)
		}
		if (Ext.isGecko) {
			this.el.dom.setAttribute("autocomplete", "off")
		}
		if (!this.lazyInit) {
			this.initList()
		} else {
			this.on("focus", this.initList, this, {
						single : true
					})
		}
	},
	initValue : function() {
		Ext.form.ComboBox.superclass.initValue.call(this);
		if (this.hiddenField) {
			this.hiddenField.value = Ext.isDefined(this.hiddenValue)
					? this.hiddenValue
					: Ext.isDefined(this.value) ? this.value : ""
		}
	},
	initList : function() {
		if (!this.list) {
			var a = "x-combo-list";
			this.list = new Ext.Layer({
						parentEl : this.getListParent(),
						shadow : this.shadow,
						cls : [a, this.listClass].join(" "),
						constrain : false,
						zindex : 12000
					});
			var b = this.listWidth
					|| Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setSize(b, 0);
			this.list.swallowEvent("mousewheel");
			this.assetHeight = 0;
			if (this.syncFont !== false) {
				this.list.setStyle("font-size", this.el.getStyle("font-size"))
			}
			if (this.title) {
				this.header = this.list.createChild({
							cls : a + "-hd",
							html : this.title
						});
				this.assetHeight += this.header.getHeight()
			}
			this.innerList = this.list.createChild({
						cls : a + "-inner"
					});
			this.mon(this.innerList, "mouseover", this.onViewOver, this);
			this.mon(this.innerList, "mousemove", this.onViewMove, this);
			this.innerList.setWidth(b - this.list.getFrameWidth("lr"));
			if (this.pageSize) {
				this.footer = this.list.createChild({
							cls : a + "-ft"
						});
				this.pageTb = new Ext.PagingToolbar({
							store : this.store,
							pageSize : this.pageSize,
							renderTo : this.footer
						});
				this.assetHeight += this.footer.getHeight()
			}
			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + a + '-item">{'
						+ this.displayField + "}</div></tpl>"
			}
			this.view = new Ext.DataView({
						applyTo : this.innerList,
						tpl : this.tpl,
						singleSelect : true,
						selectedClass : this.selectedClass,
						itemSelector : this.itemSelector || "." + a + "-item",
						emptyText : this.listEmptyText
					});
			this.mon(this.view, "click", this.onViewClick, this);
			this.bindStore(this.store, true);
			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
							pinned : true,
							handles : "se"
						});
				this.mon(this.resizer, "resize", function(e, c, d) {
							this.maxHeight = d - this.handleHeight
									- this.list.getFrameWidth("tb")
									- this.assetHeight;
							this.listWidth = c;
							this.innerList.setWidth(c
									- this.list.getFrameWidth("lr"));
							this.restrictHeight()
						}, this);
				this[this.pageSize ? "footer" : "innerList"].setStyle(
						"margin-bottom", this.handleHeight + "px")
			}
		}
	},
	getListParent : function() {
		return document.body
	},
	getStore : function() {
		return this.store
	},
	bindStore : function(a, b) {
		if (this.store && !b) {
			if (this.store !== a && this.store.autoDestroy) {
				this.store.destroy()
			} else {
				this.store.un("beforeload", this.onBeforeLoad, this);
				this.store.un("load", this.onLoad, this);
				this.store.un("exception", this.collapse, this)
			}
			if (!a) {
				this.store = null;
				if (this.view) {
					this.view.bindStore(null)
				}
				if (this.pageTb) {
					this.pageTb.bindStore(null)
				}
			}
		}
		if (a) {
			if (!b) {
				this.lastQuery = null;
				if (this.pageTb) {
					this.pageTb.bindStore(a)
				}
			}
			this.store = Ext.StoreMgr.lookup(a);
			this.store.on({
						scope : this,
						beforeload : this.onBeforeLoad,
						load : this.onLoad,
						exception : this.collapse
					});
			if (this.view) {
				this.view.bindStore(a)
			}
		}
	},
	reset : function() {
		Ext.form.ComboBox.superclass.reset.call(this);
		if (this.clearFilterOnReset && this.mode == "local") {
			this.store.clearFilter()
		}
	},
	initEvents : function() {
		Ext.form.ComboBox.superclass.initEvents.call(this);
		this.keyNav = new Ext.KeyNav(this.el, {
			up : function(a) {
				this.inKeyMode = true;
				this.selectPrev()
			},
			down : function(a) {
				if (!this.isExpanded()) {
					this.onTriggerClick()
				} else {
					this.inKeyMode = true;
					this.selectNext()
				}
			},
			enter : function(a) {
				this.onViewClick()
			},
			esc : function(a) {
				this.collapse()
			},
			tab : function(a) {
				this.onViewClick(false);
				return true
			},
			scope : this,
			doRelay : function(c, b, a) {
				if (a == "down" || this.scope.isExpanded()) {
					var d = Ext.KeyNav.prototype.doRelay.apply(this, arguments);
					if (!Ext.isIE && Ext.EventManager.useKeydown) {
						this.scope.fireKey(c)
					}
					return d
				}
				return true
			},
			forceKeyDown : true,
			defaultEventAction : "stopEvent"
		});
		this.queryDelay = Math.max(this.queryDelay || 10, this.mode == "local"
						? 10
						: 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if (this.typeAhead) {
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this)
		}
		if (!this.enableKeyEvents) {
			this.mon(this.el, "keyup", this.onKeyUp, this)
		}
	},
	onDestroy : function() {
		if (this.dqTask) {
			this.dqTask.cancel();
			this.dqTask = null
		}
		this.bindStore(null);
		Ext.destroy(this.resizer, this.view, this.pageTb, this.list);
		Ext.destroyMembers(this, "hiddenField");
		Ext.form.ComboBox.superclass.onDestroy.call(this)
	},
	fireKey : function(a) {
		if (!this.isExpanded()) {
			Ext.form.ComboBox.superclass.fireKey.call(this, a)
		}
	},
	onResize : function(a, b) {
		Ext.form.ComboBox.superclass.onResize.apply(this, arguments);
		if (this.isVisible() && this.list) {
			this.doResize(a)
		} else {
			this.bufferSize = a
		}
	},
	doResize : function(a) {
		if (!Ext.isDefined(this.listWidth)) {
			var b = Math.max(a, this.minListWidth);
			this.list.setWidth(b);
			this.innerList.setWidth(b - this.list.getFrameWidth("lr"))
		}
	},
	onEnable : function() {
		Ext.form.ComboBox.superclass.onEnable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = false
		}
	},
	onDisable : function() {
		Ext.form.ComboBox.superclass.onDisable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = true
		}
	},
	onBeforeLoad : function() {
		if (!this.hasFocus) {
			return
		}
		this.innerList.update(this.loadingText
				? '<div class="loading-indicator">' + this.loadingText
						+ "</div>"
				: "");
		this.restrictHeight();
		this.selectedIndex = -1
	},
	onLoad : function() {
		if (!this.hasFocus) {
			return
		}
		if (this.store.getCount() > 0 || this.listEmptyText) {
			this.expand();
			this.restrictHeight();
			if (this.lastQuery == this.allQuery) {
				if (this.editable) {
					this.el.dom.select()
				}
				if (!this.selectByValue(this.value, true)) {
					this.select(0, true)
				}
			} else {
				this.selectNext();
				if (this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE
						&& this.lastKey != Ext.EventObject.DELETE) {
					this.taTask.delay(this.typeAheadDelay)
				}
			}
		} else {
			this.onEmptyResults()
		}
	},
	onTypeAhead : function() {
		if (this.store.getCount() > 0) {
			var b = this.store.getAt(0);
			var c = b.data[this.displayField];
			var a = c.length;
			var d = this.getRawValue().length;
			if (d != a) {
				this.setRawValue(c);
				this.selectText(d, c.length)
			}
		}
	},
	onSelect : function(a, b) {
		if (this.fireEvent("beforeselect", this, a, b) !== false) {
			this.setValue(a.data[this.valueField || this.displayField]);
			this.collapse();
			this.fireEvent("select", this, a, b)
		}
	},
	getName : function() {
		var a = this.hiddenField;
		return a && a.name ? a.name : this.hiddenName
				|| Ext.form.ComboBox.superclass.getName.call(this)
	},
	getValue : function() {
		if (this.valueField) {
			return Ext.isDefined(this.value) ? this.value : ""
		} else {
			return Ext.form.ComboBox.superclass.getValue.call(this)
		}
	},
	clearValue : function() {
		if (this.hiddenField) {
			this.hiddenField.value = ""
		}
		this.setRawValue("");
		this.lastSelectionText = "";
		this.applyEmptyText();
		this.value = ""
	},
	setValue : function(a) {
		var c = a;
		if (this.valueField) {
			var b = this.findRecord(this.valueField, a);
			if (b) {
				c = b.data[this.displayField]
			} else {
				if (Ext.isDefined(this.valueNotFoundText)) {
					c = this.valueNotFoundText
				}
			}
		}
		this.lastSelectionText = c;
		if (this.hiddenField) {
			this.hiddenField.value = a
		}
		Ext.form.ComboBox.superclass.setValue.call(this, c);
		this.value = a;
		return this
	},
	findRecord : function(c, b) {
		var a;
		if (this.store.getCount() > 0) {
			this.store.each(function(d) {
						if (d.data[c] == b) {
							a = d;
							return false
						}
					})
		}
		return a
	},
	onViewMove : function(b, a) {
		this.inKeyMode = false
	},
	onViewOver : function(d, b) {
		if (this.inKeyMode) {
			return
		}
		var c = this.view.findItemFromChild(b);
		if (c) {
			var a = this.view.indexOf(c);
			this.select(a, false)
		}
	},
	onViewClick : function(b) {
		var a = this.view.getSelectedIndexes()[0], c = this.store, d = c
				.getAt(a);
		if (d) {
			this.onSelect(d, a)
		} else {
			if (c.getCount() === 0) {
				this.onEmptyResults()
			}
		}
		if (b !== false) {
			this.el.focus()
		}
	},
	restrictHeight : function() {
		this.innerList.dom.style.height = "";
		var b = this.innerList.dom, e = this.list.getFrameWidth("tb")
				+ (this.resizable ? this.handleHeight : 0) + this.assetHeight, c = Math
				.max(b.clientHeight, b.offsetHeight, b.scrollHeight), a = this
				.getPosition()[1]
				- Ext.getBody().getScroll().top, f = Ext.lib.Dom
				.getViewHeight()
				- a - this.getSize().height, d = Math.max(a, f, this.minHeight
						|| 0)
				- this.list.shadowOffset - e - 5;
		c = Math.min(c, d, this.maxHeight);
		this.innerList.setHeight(c);
		this.list.beginUpdate();
		this.list.setHeight(c + e);
		this.list.alignTo(this.wrap, this.listAlign);
		this.list.endUpdate()
	},
	onEmptyResults : function() {
		this.collapse()
	},
	isExpanded : function() {
		return this.list && this.list.isVisible()
	},
	selectByValue : function(a, c) {
		if (!Ext.isEmpty(a, true)) {
			var b = this.findRecord(this.valueField || this.displayField, a);
			if (b) {
				this.select(this.store.indexOf(b), c);
				return true
			}
		}
		return false
	},
	select : function(a, c) {
		this.selectedIndex = a;
		this.view.select(a);
		if (c !== false) {
			var b = this.view.getNode(a);
			if (b) {
				this.innerList.scrollChildIntoView(b, false)
			}
		}
	},
	selectNext : function() {
		var a = this.store.getCount();
		if (a > 0) {
			if (this.selectedIndex == -1) {
				this.select(0)
			} else {
				if (this.selectedIndex < a - 1) {
					this.select(this.selectedIndex + 1)
				}
			}
		}
	},
	selectPrev : function() {
		var a = this.store.getCount();
		if (a > 0) {
			if (this.selectedIndex == -1) {
				this.select(0)
			} else {
				if (this.selectedIndex !== 0) {
					this.select(this.selectedIndex - 1)
				}
			}
		}
	},
	onKeyUp : function(b) {
		var a = b.getKey();
		if (this.editable !== false && this.readOnly !== true
				&& (a == b.BACKSPACE || !b.isSpecialKey())) {
			this.lastKey = a;
			this.dqTask.delay(this.queryDelay)
		}
		Ext.form.ComboBox.superclass.onKeyUp.call(this, b)
	},
	validateBlur : function() {
		return !this.list || !this.list.isVisible()
	},
	initQuery : function() {
		this.doQuery(this.getRawValue())
	},
	beforeBlur : function() {
		var b = this.getRawValue(), a = this.findRecord(this.displayField, b);
		if (!a && this.forceSelection) {
			if (b.length > 0 && b != this.emptyText) {
				this.el.dom.value = Ext.isEmpty(this.lastSelectionText)
						? ""
						: this.lastSelectionText;
				this.applyEmptyText()
			} else {
				this.clearValue()
			}
		} else {
			if (a) {
				b = a.get(this.valueField || this.displayField)
			}
			this.setValue(b)
		}
	},
	doQuery : function(c, b) {
		c = Ext.isEmpty(c) ? "" : c;
		var a = {
			query : c,
			forceAll : b,
			combo : this,
			cancel : false
		};
		if (this.fireEvent("beforequery", a) === false || a.cancel) {
			return false
		}
		c = a.query;
		b = a.forceAll;
		if (b === true || (c.length >= this.minChars)) {
			if (this.lastQuery !== c) {
				this.lastQuery = c;
				if (this.mode == "local") {
					this.selectedIndex = -1;
					if (b) {
						this.store.clearFilter()
					} else {
						this.store.filter(this.displayField, c)
					}
					this.onLoad()
				} else {
					this.store.baseParams[this.queryParam] = c;
					this.store.load({
								params : this.getParams(c)
							});
					this.expand()
				}
			} else {
				this.selectedIndex = -1;
				this.onLoad()
			}
		}
	},
	getParams : function(a) {
		var b = {};
		if (this.pageSize) {
			b.start = 0;
			b.limit = this.pageSize
		}
		return b
	},
	collapse : function() {
		if (!this.isExpanded()) {
			return
		}
		this.list.hide();
		Ext.getDoc().un("mousewheel", this.collapseIf, this);
		Ext.getDoc().un("mousedown", this.collapseIf, this);
		this.fireEvent("collapse", this)
	},
	collapseIf : function(a) {
		if (!a.within(this.wrap) && !a.within(this.list)) {
			this.collapse()
		}
	},
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return
		}
		if (this.bufferSize) {
			this.doResize(this.bufferSize);
			delete this.bufferSize
		}
		this.list.alignTo(this.wrap, this.listAlign);
		this.list.show();
		if (Ext.isGecko2) {
			this.innerList.setOverflow("auto")
		}
		this.mon(Ext.getDoc(), {
					scope : this,
					mousewheel : this.collapseIf,
					mousedown : this.collapseIf
				});
		this.fireEvent("expand", this)
	},
	onTriggerClick : function() {
		if (this.readOnly || this.disabled) {
			return
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus()
		} else {
			this.onFocus({});
			if (this.triggerAction == "all") {
				this.doQuery(this.allQuery, true)
			} else {
				this.doQuery(this.getRawValue())
			}
			this.el.focus()
		}
	}
});
Ext.reg("combo", Ext.form.ComboBox);
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
			focusClass : undefined,
			fieldClass : "x-form-field",
			checked : false,
			defaultAutoCreate : {
				tag : "input",
				type : "checkbox",
				autocomplete : "off"
			},
			actionMode : "wrap",
			initComponent : function() {
				Ext.form.Checkbox.superclass.initComponent.call(this);
				this.addEvents("check")
			},
			onResize : function() {
				Ext.form.Checkbox.superclass.onResize.apply(this, arguments);
				if (!this.boxLabel && !this.fieldLabel) {
					this.el.alignTo(this.wrap, "c-c")
				}
			},
			initEvents : function() {
				Ext.form.Checkbox.superclass.initEvents.call(this);
				this.mon(this.el, {
							scope : this,
							click : this.onClick,
							change : this.onClick
						})
			},
			markInvalid : Ext.emptyFn,
			clearInvalid : Ext.emptyFn,
			onRender : function(b, a) {
				Ext.form.Checkbox.superclass.onRender.call(this, b, a);
				if (this.inputValue !== undefined) {
					this.el.dom.value = this.inputValue
				}
				this.wrap = this.el.wrap({
							cls : "x-form-check-wrap"
						});
				if (this.boxLabel) {
					this.wrap.createChild({
								tag : "label",
								htmlFor : this.el.id,
								cls : "x-form-cb-label",
								html : this.boxLabel
							})
				}
				if (this.checked) {
					this.setValue(true)
				} else {
					this.checked = this.el.dom.checked
				}
				if (Ext.isIE) {
					this.wrap.repaint()
				}
				this.resizeEl = this.positionEl = this.wrap
			},
			onDestroy : function() {
				Ext.destroy(this.wrap);
				Ext.form.Checkbox.superclass.onDestroy.call(this)
			},
			initValue : function() {
				this.originalValue = this.getValue()
			},
			getValue : function() {
				if (this.rendered) {
					return this.el.dom.checked
				}
				return this.checked
			},
			onClick : function() {
				if (this.el.dom.checked != this.checked) {
					this.setValue(this.el.dom.checked)
				}
			},
			setValue : function(a) {
				var b = this.checked;
				this.checked = (a === true || a === "true" || a == "1" || String(a)
						.toLowerCase() == "on");
				if (this.rendered) {
					this.el.dom.checked = this.checked;
					this.el.dom.defaultChecked = this.checked
				}
				if (b != this.checked) {
					this.fireEvent("check", this, this.checked);
					if (this.handler) {
						this.handler.call(this.scope || this, this,
								this.checked)
					}
				}
				return this
			}
		});
Ext.reg("checkbox", Ext.form.Checkbox);
Ext.form.CheckboxGroup = Ext.extend(Ext.form.Field, {
	columns : "auto",
	vertical : false,
	allowBlank : true,
	blankText : "You must select at least one item in this group",
	defaultType : "checkbox",
	groupCls : "x-form-check-group",
	initComponent : function() {
		this.addEvents("change");
		this.on("change", this.validate, this);
		Ext.form.CheckboxGroup.superclass.initComponent.call(this)
	},
	onRender : function(h, f) {
		if (!this.el) {
			var o = {
				autoEl : {
					id : this.id
				},
				cls : this.groupCls,
				layout : "column",
				renderTo : h,
				bufferResize : false
			};
			var a = {
				xtype : "container",
				defaultType : this.defaultType,
				layout : "form",
				defaults : {
					hideLabel : true,
					anchor : "100%"
				}
			};
			if (this.items[0].items) {
				Ext.apply(o, {
							layoutConfig : {
								columns : this.items.length
							},
							defaults : this.defaults,
							items : this.items
						});
				for (var e = 0, k = this.items.length; e < k; e++) {
					Ext.applyIf(this.items[e], a)
				}
			} else {
				var d, m = [];
				if (typeof this.columns == "string") {
					this.columns = this.items.length
				}
				if (!Ext.isArray(this.columns)) {
					var j = [];
					for (var e = 0; e < this.columns; e++) {
						j.push((100 / this.columns) * 0.01)
					}
					this.columns = j
				}
				d = this.columns.length;
				for (var e = 0; e < d; e++) {
					var b = Ext.apply({
								items : []
							}, a);
					b[this.columns[e] <= 1 ? "columnWidth" : "width"] = this.columns[e];
					if (this.defaults) {
						b.defaults = Ext.apply(b.defaults || {}, this.defaults)
					}
					m.push(b)
				}
				if (this.vertical) {
					var q = Math.ceil(this.items.length / d), n = 0;
					for (var e = 0, k = this.items.length; e < k; e++) {
						if (e > 0 && e % q == 0) {
							n++
						}
						if (this.items[e].fieldLabel) {
							this.items[e].hideLabel = false
						}
						m[n].items.push(this.items[e])
					}
				} else {
					for (var e = 0, k = this.items.length; e < k; e++) {
						var p = e % d;
						if (this.items[e].fieldLabel) {
							this.items[e].hideLabel = false
						}
						m[p].items.push(this.items[e])
					}
				}
				Ext.apply(o, {
							layoutConfig : {
								columns : d
							},
							items : m
						})
			}
			this.panel = new Ext.Container(o);
			this.panel.ownerCt = this;
			this.el = this.panel.getEl();
			if (this.forId && this.itemCls) {
				var c = this.el.up(this.itemCls).child("label", true);
				if (c) {
					c.setAttribute("htmlFor", this.forId)
				}
			}
			var g = this.panel.findBy(function(i) {
						return i.isFormField
					}, this);
			this.items = new Ext.util.MixedCollection();
			this.items.addAll(g)
		}
		Ext.form.CheckboxGroup.superclass.onRender.call(this, h, f)
	},
	initValue : function() {
		if (this.value) {
			this.setValue
					.apply(this, this.buffered ? this.value : [this.value]);
			delete this.buffered;
			delete this.value
		}
	},
	afterRender : function() {
		Ext.form.CheckboxGroup.superclass.afterRender.call(this);
		this.eachItem(function(a) {
					a.on("check", this.fireChecked, this);
					a.inGroup = true
				})
	},
	doLayout : function() {
		if (this.rendered) {
			this.panel.forceLayout = this.ownerCt.forceLayout;
			this.panel.doLayout()
		}
	},
	fireChecked : function() {
		var a = [];
		this.eachItem(function(b) {
					if (b.checked) {
						a.push(b)
					}
				});
		this.fireEvent("change", this, a)
	},
	validateValue : function(a) {
		if (!this.allowBlank) {
			var b = true;
			this.eachItem(function(c) {
						if (c.checked) {
							return (b = false)
						}
					});
			if (b) {
				this.markInvalid(this.blankText);
				return false
			}
		}
		return true
	},
	isDirty : function() {
		if (this.disabled || !this.rendered) {
			return false
		}
		var a = false;
		this.eachItem(function(b) {
					if (b.isDirty()) {
						a = true;
						return false
					}
				});
		return a
	},
	onDisable : function() {
		this.eachItem(function(a) {
					a.disable()
				})
	},
	onEnable : function() {
		this.eachItem(function(a) {
					a.enable()
				})
	},
	doLayout : function() {
		if (this.rendered) {
			this.panel.forceLayout = this.ownerCt.forceLayout;
			this.panel.doLayout()
		}
	},
	onResize : function(a, b) {
		this.panel.setSize(a, b);
		this.panel.doLayout()
	},
	reset : function() {
		this.eachItem(function(a) {
					if (a.reset) {
						a.reset()
					}
				});
(function() {
			this.clearInvalid()
		}).defer(50, this)
	},
	setValue : function() {
		if (this.rendered) {
			this.onSetValue.apply(this, arguments)
		} else {
			this.buffered = true;
			this.value = arguments
		}
		return this
	},
	onSetValue : function(d, c) {
		if (arguments.length == 1) {
			if (Ext.isArray(d)) {
				Ext.each(d, function(g, e) {
							var f = this.items.itemAt(e);
							if (f) {
								f.setValue(g)
							}
						}, this)
			} else {
				if (Ext.isObject(d)) {
					for (var a in d) {
						var b = this.getBox(a);
						if (b) {
							b.setValue(d[a])
						}
					}
				} else {
					this.setValueForItem(d)
				}
			}
		} else {
			var b = this.getBox(d);
			if (b) {
				b.setValue(c)
			}
		}
	},
	beforeDestroy : function() {
		Ext.destroy(this.panel);
		Ext.form.CheckboxGroup.superclass.beforeDestroy.call(this)
	},
	setValueForItem : function(a) {
		a = String(a).split(",");
		this.eachItem(function(b) {
					if (a.indexOf(b.inputValue) > -1) {
						b.setValue(true)
					}
				})
	},
	getBox : function(b) {
		var a = null;
		this.eachItem(function(c) {
					if (b == c || c.dataIndex == b || c.id == b
							|| c.getName() == b) {
						a = c;
						return false
					}
				});
		return a
	},
	getValue : function() {
		var a = [];
		this.eachItem(function(b) {
					if (b.checked) {
						a.push(b)
					}
				});
		return a
	},
	eachItem : function(a) {
		if (this.items && this.items.each) {
			this.items.each(a, this)
		}
	},
	getRawValue : Ext.emptyFn,
	setRawValue : Ext.emptyFn
});
Ext.reg("checkboxgroup", Ext.form.CheckboxGroup);
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
			inputType : "radio",
			markInvalid : Ext.emptyFn,
			clearInvalid : Ext.emptyFn,
			getGroupValue : function() {
				var a = this.el.up("form") || Ext.getBody();
				var b = a.child("input[name=" + this.el.dom.name + "]:checked",
						true);
				return b ? b.value : null
			},
			onClick : function() {
				if (this.el.dom.checked != this.checked) {
					var a = this.getCheckEl().select("input[name="
							+ this.el.dom.name + "]");
					a.each(function(b) {
								if (b.dom.id == this.id) {
									this.setValue(true)
								} else {
									Ext.getCmp(b.dom.id).setValue(false)
								}
							}, this)
				}
			},
			setValue : function(a) {
				if (typeof a == "boolean") {
					Ext.form.Radio.superclass.setValue.call(this, a)
				} else {
					var b = this.getCheckEl().child(
							"input[name=" + this.el.dom.name + "][value=" + a
									+ "]", true);
					if (b) {
						Ext.getCmp(b.id).setValue(true)
					}
				}
				return this
			},
			getCheckEl : function() {
				if (this.inGroup) {
					return this.el.up(".x-form-radio-group")
				}
				return this.el.up("form") || Ext.getBody()
			}
		});
Ext.reg("radio", Ext.form.Radio);
Ext.form.RadioGroup = Ext.extend(Ext.form.CheckboxGroup, {
			allowBlank : true,
			blankText : "You must select one item in this group",
			defaultType : "radio",
			groupCls : "x-form-radio-group",
			getValue : function() {
				var a = null;
				this.eachItem(function(b) {
							if (b.checked) {
								a = b;
								return false
							}
						});
				return a
			},
			onSetValue : function(c, b) {
				if (arguments.length > 1) {
					var a = this.getBox(c);
					if (a) {
						a.setValue(b);
						if (a.checked) {
							this.eachItem(function(d) {
										if (d !== a) {
											d.setValue(false)
										}
									})
						}
					}
				} else {
					this.setValueForItem(c)
				}
			},
			setValueForItem : function(a) {
				a = String(a).split(",")[0];
				this.eachItem(function(b) {
							b.setValue(a == b.inputValue)
						})
			},
			fireChecked : function() {
				if (!this.checkTask) {
					this.checkTask = new Ext.util.DelayedTask(
							this.bufferChecked, this)
				}
				this.checkTask.delay(10)
			},
			bufferChecked : function() {
				var a = null;
				this.eachItem(function(b) {
							if (b.checked) {
								a = b;
								return false
							}
						});
				this.fireEvent("change", this, a)
			},
			onDestroy : function() {
				if (this.checkTask) {
					this.checkTask.cancel();
					this.checkTask = null
				}
				Ext.form.RadioGroup.superclass.onDestroy.call(this)
			}
		});
Ext.reg("radiogroup", Ext.form.RadioGroup);
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
			inputType : "hidden",
			onRender : function() {
				Ext.form.Hidden.superclass.onRender.apply(this, arguments)
			},
			initEvents : function() {
				this.originalValue = this.getValue()
			},
			setSize : Ext.emptyFn,
			setWidth : Ext.emptyFn,
			setHeight : Ext.emptyFn,
			setPosition : Ext.emptyFn,
			setPagePosition : Ext.emptyFn,
			markInvalid : Ext.emptyFn,
			clearInvalid : Ext.emptyFn
		});
Ext.reg("hidden", Ext.form.Hidden);
Ext.form.BasicForm = function(b, a) {
	Ext.apply(this, a);
	if (Ext.isString(this.paramOrder)) {
		this.paramOrder = this.paramOrder.split(/[\s,|]/)
	}
	this.items = new Ext.util.MixedCollection(false, function(c) {
				return c.getItemId()
			});
	this.addEvents("beforeaction", "actionfailed", "actioncomplete");
	if (b) {
		this.initEl(b)
	}
	Ext.form.BasicForm.superclass.constructor.call(this)
};
Ext.extend(Ext.form.BasicForm, Ext.util.Observable, {
	timeout : 30,
	paramOrder : undefined,
	paramsAsHash : false,
	waitTitle : "Please Wait...",
	activeAction : null,
	trackResetOnLoad : false,
	initEl : function(a) {
		this.el = Ext.get(a);
		this.id = this.el.id || Ext.id();
		if (!this.standardSubmit) {
			this.el.on("submit", this.onSubmit, this)
		}
		this.el.addClass("x-form")
	},
	getEl : function() {
		return this.el
	},
	onSubmit : function(a) {
		a.stopEvent()
	},
	destroy : function() {
		this.items.each(function(a) {
					Ext.destroy(a)
				});
		if (this.el) {
			this.el.removeAllListeners();
			this.el.remove()
		}
		this.purgeListeners()
	},
	isValid : function() {
		var a = true;
		this.items.each(function(b) {
					if (!b.validate()) {
						a = false
					}
				});
		return a
	},
	isDirty : function() {
		var a = false;
		this.items.each(function(b) {
					if (b.isDirty()) {
						a = true;
						return false
					}
				});
		return a
	},
	doAction : function(b, a) {
		if (Ext.isString(b)) {
			b = new Ext.form.Action.ACTION_TYPES[b](this, a)
		}
		if (this.fireEvent("beforeaction", this, b) !== false) {
			this.beforeAction(b);
			b.run.defer(100, b)
		}
		return this
	},
	submit : function(b) {
		if (this.standardSubmit) {
			var a = this.isValid();
			if (a) {
				var c = this.el.dom;
				if (this.url && Ext.isEmpty(c.action)) {
					c.action = this.url
				}
				c.submit()
			}
			return a
		}
		var d = String.format("{0}submit", this.api ? "direct" : "");
		this.doAction(d, b);
		return this
	},
	load : function(a) {
		var b = String.format("{0}load", this.api ? "direct" : "");
		this.doAction(b, a);
		return this
	},
	updateRecord : function(b) {
		b.beginEdit();
		var a = b.fields;
		a.each(function(c) {
					var d = this.findField(c.name);
					if (d) {
						b.set(c.name, d.getValue())
					}
				}, this);
		b.endEdit();
		return this
	},
	loadRecord : function(a) {
		this.setValues(a.data);
		return this
	},
	beforeAction : function(a) {
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.mask(b.waitMsg, "x-mask-loading")
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget = Ext.get(this.waitMsgTarget);
					this.waitMsgTarget.mask(b.waitMsg, "x-mask-loading")
				} else {
					Ext.MessageBox.wait(b.waitMsg, b.waitTitle
									|| this.waitTitle)
				}
			}
		}
	},
	afterAction : function(a, c) {
		this.activeAction = null;
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.unmask()
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget.unmask()
				} else {
					Ext.MessageBox.updateProgress(1);
					Ext.MessageBox.hide()
				}
			}
		}
		if (c) {
			if (b.reset) {
				this.reset()
			}
			Ext.callback(b.success, b.scope, [this, a]);
			this.fireEvent("actioncomplete", this, a)
		} else {
			Ext.callback(b.failure, b.scope, [this, a]);
			this.fireEvent("actionfailed", this, a)
		}
	},
	findField : function(b) {
		var a = this.items.get(b);
		if (!Ext.isObject(a)) {
			this.items.each(function(c) {
				if (c.isFormField
						&& (c.dataIndex == b || c.id == b || c.getName() == b)) {
					a = c;
					return false
				}
			})
		}
		return a || null
	},
	markInvalid : function(h) {
		if (Ext.isArray(h)) {
			for (var c = 0, a = h.length; c < a; c++) {
				var b = h[c];
				var d = this.findField(b.id);
				if (d) {
					d.markInvalid(b.msg)
				}
			}
		} else {
			var e, g;
			for (g in h) {
				if (!Ext.isFunction(h[g]) && (e = this.findField(g))) {
					e.markInvalid(h[g])
				}
			}
		}
		return this
	},
	setValues : function(c) {
		if (Ext.isArray(c)) {
			for (var d = 0, a = c.length; d < a; d++) {
				var b = c[d];
				var e = this.findField(b.id);
				if (e) {
					e.setValue(b.value);
					if (this.trackResetOnLoad) {
						e.originalValue = e.getValue()
					}
				}
			}
		} else {
			var g, h;
			for (h in c) {
				if (!Ext.isFunction(c[h]) && (g = this.findField(h))) {
					g.setValue(c[h]);
					if (this.trackResetOnLoad) {
						g.originalValue = g.getValue()
					}
				}
			}
		}
		return this
	},
	getValues : function(b) {
		var a = Ext.lib.Ajax.serializeForm(this.el.dom);
		if (b === true) {
			return a
		}
		return Ext.urlDecode(a)
	},
	getFieldValues : function(a) {
		var d = {}, e, b, c;
		this.items.each(function(g) {
					if (a !== true || g.isDirty()) {
						e = g.getName();
						b = d[e];
						c = g.getValue();
						if (Ext.isDefined(b)) {
							if (Ext.isArray(b)) {
								d[e].push(c)
							} else {
								d[e] = [b, c]
							}
						} else {
							d[e] = c
						}
					}
				});
		return d
	},
	clearInvalid : function() {
		this.items.each(function(a) {
					a.clearInvalid()
				});
		return this
	},
	reset : function() {
		this.items.each(function(a) {
					a.reset()
				});
		return this
	},
	add : function() {
		this.items.addAll(Array.prototype.slice.call(arguments, 0));
		return this
	},
	remove : function(a) {
		this.items.remove(a);
		return this
	},
	render : function() {
		this.items.each(function(a) {
					if (a.isFormField && !a.rendered
							&& document.getElementById(a.id)) {
						a.applyToMarkup(a.id)
					}
				});
		return this
	},
	applyToFields : function(a) {
		this.items.each(function(b) {
					Ext.apply(b, a)
				});
		return this
	},
	applyIfToFields : function(a) {
		this.items.each(function(b) {
					Ext.applyIf(b, a)
				});
		return this
	},
	callFieldMethod : function(b, a) {
		a = a || [];
		this.items.each(function(c) {
					if (Ext.isFunction(c[b])) {
						c[b].apply(c, a)
					}
				});
		return this
	}
});
Ext.BasicForm = Ext.form.BasicForm;
Ext.FormPanel = Ext.extend(Ext.Panel, {
			minButtonWidth : 75,
			labelAlign : "left",
			monitorValid : false,
			monitorPoll : 200,
			layout : "form",
			initComponent : function() {
				this.form = this.createForm();
				Ext.FormPanel.superclass.initComponent.call(this);
				this.bodyCfg = {
					tag : "form",
					cls : this.baseCls + "-body",
					method : this.method || "POST",
					id : this.formId || Ext.id()
				};
				if (this.fileUpload) {
					this.bodyCfg.enctype = "multipart/form-data"
				}
				this.initItems();
				this.addEvents("clientvalidation");
				this.relayEvents(this.form, ["beforeaction", "actionfailed",
								"actioncomplete"])
			},
			createForm : function() {
				var a = Ext.applyIf({
							listeners : {}
						}, this.initialConfig);
				return new Ext.form.BasicForm(null, a)
			},
			initFields : function() {
				var c = this.form;
				var a = this;
				var b = function(d) {
					if (a.isField(d)) {
						c.add(d)
					} else {
						if (d.findBy && d != a) {
							a.applySettings(d);
							if (d.items && d.items.each) {
								d.items.each(b, this)
							}
						}
					}
				};
				this.items.each(b, this)
			},
			applySettings : function(b) {
				var a = b.ownerCt;
				Ext.applyIf(b, {
							labelAlign : a.labelAlign,
							labelWidth : a.labelWidth,
							itemCls : a.itemCls
						})
			},
			getLayoutTarget : function() {
				return this.form.el
			},
			getForm : function() {
				return this.form
			},
			onRender : function(b, a) {
				this.initFields();
				Ext.FormPanel.superclass.onRender.call(this, b, a);
				this.form.initEl(this.body)
			},
			beforeDestroy : function() {
				this.stopMonitoring();
				Ext.destroy(this.form);
				this.form.items.clear();
				Ext.FormPanel.superclass.beforeDestroy.call(this)
			},
			isField : function(a) {
				return !!a.setValue && !!a.getValue && !!a.markInvalid
						&& !!a.clearInvalid
			},
			initEvents : function() {
				Ext.FormPanel.superclass.initEvents.call(this);
				this.on({
							scope : this,
							add : this.onAddEvent,
							remove : this.onRemoveEvent
						});
				if (this.monitorValid) {
					this.startMonitoring()
				}
			},
			onAdd : function(a) {
				Ext.FormPanel.superclass.onAdd.call(this, a);
				this.processAdd(a)
			},
			onAddEvent : function(a, b) {
				if (a !== this) {
					this.processAdd(b)
				}
			},
			processAdd : function(a) {
				if (this.isField(a)) {
					this.form.add(a)
				} else {
					if (a.findBy) {
						this.applySettings(a);
						this.form.add.apply(this.form, a.findBy(this.isField))
					}
				}
			},
			onRemove : function(a) {
				Ext.FormPanel.superclass.onRemove.call(this, a);
				this.processRemove(a)
			},
			onRemoveEvent : function(a, b) {
				if (a !== this) {
					this.processRemove(b)
				}
			},
			processRemove : function(b) {
				if (this.isField(b)) {
					this.form.remove(b)
				} else {
					if (b.findBy) {
						var a = function(c) {
							return !!c.isDestroyed
						};
						this.form.items.filterBy(a, this.form).each(
								this.form.remove, this.form)
					}
				}
			},
			startMonitoring : function() {
				if (!this.validTask) {
					this.validTask = new Ext.util.TaskRunner();
					this.validTask.start({
								run : this.bindHandler,
								interval : this.monitorPoll || 200,
								scope : this
							})
				}
			},
			stopMonitoring : function() {
				if (this.validTask) {
					this.validTask.stopAll();
					this.validTask = null
				}
			},
			load : function() {
				this.form.load.apply(this.form, arguments)
			},
			onDisable : function() {
				Ext.FormPanel.superclass.onDisable.call(this);
				if (this.form) {
					this.form.items.each(function() {
								this.disable()
							})
				}
			},
			onEnable : function() {
				Ext.FormPanel.superclass.onEnable.call(this);
				if (this.form) {
					this.form.items.each(function() {
								this.enable()
							})
				}
			},
			bindHandler : function() {
				var e = true;
				this.form.items.each(function(g) {
							if (!g.isValid(true)) {
								e = false;
								return false
							}
						});
				if (this.fbar) {
					var b = this.fbar.items.items;
					for (var d = 0, a = b.length; d < a; d++) {
						var c = b[d];
						if (c.formBind === true && c.disabled === e) {
							c.setDisabled(!e)
						}
					}
				}
				this.fireEvent("clientvalidation", this, e)
			}
		});
Ext.reg("form", Ext.FormPanel);
Ext.form.FormPanel = Ext.FormPanel;
Ext.form.FieldSet = Ext.extend(Ext.Panel, {
	baseCls : "x-fieldset",
	layout : "form",
	animCollapse : false,
	onRender : function(b, a) {
		if (!this.el) {
			this.el = document.createElement("fieldset");
			this.el.id = this.id;
			if (this.title || this.header || this.checkboxToggle) {
				this.el.appendChild(document.createElement("legend")).className = "x-fieldset-header"
			}
		}
		Ext.form.FieldSet.superclass.onRender.call(this, b, a);
		if (this.checkboxToggle) {
			var c = typeof this.checkboxToggle == "object"
					? this.checkboxToggle
					: {
						tag : "input",
						type : "checkbox",
						name : this.checkboxName || this.id + "-checkbox"
					};
			this.checkbox = this.header.insertFirst(c);
			this.checkbox.dom.checked = !this.collapsed;
			this.mon(this.checkbox, "click", this.onCheckClick, this)
		}
	},
	onCollapse : function(a, b) {
		if (this.checkbox) {
			this.checkbox.dom.checked = false
		}
		Ext.form.FieldSet.superclass.onCollapse.call(this, a, b)
	},
	onExpand : function(a, b) {
		if (this.checkbox) {
			this.checkbox.dom.checked = true
		}
		Ext.form.FieldSet.superclass.onExpand.call(this, a, b)
	},
	onCheckClick : function() {
		this[this.checkbox.dom.checked ? "expand" : "collapse"]()
	}
});
Ext.reg("fieldset", Ext.form.FieldSet);
Ext.form.HtmlEditor = Ext.extend(Ext.form.Field, {
	enableFormat : true,
	enableFontSize : true,
	enableColors : true,
	enableAlignments : true,
	enableLists : true,
	enableSourceEdit : true,
	enableLinks : true,
	enableFont : true,
	createLinkText : "Please enter the URL for the link:",
	defaultLinkValue : "http://",
	fontFamilies : ["Arial", "Courier New", "Tahoma", "Times New Roman",
			"Verdana"],
	defaultFont : "tahoma",
	defaultValue : (Ext.isOpera || Ext.isIE6) ? "&#160;" : "&#8203;",
	actionMode : "wrap",
	validationEvent : false,
	deferHeight : true,
	initialized : false,
	activated : false,
	sourceEditMode : false,
	onFocus : Ext.emptyFn,
	iframePad : 3,
	hideMode : "offsets",
	defaultAutoCreate : {
		tag : "textarea",
		style : "width:500px;height:300px;",
		autocomplete : "off"
	},
	initComponent : function() {
		this.addEvents("initialize", "activate", "beforesync", "beforepush",
				"sync", "push", "editmodechange")
	},
	createFontOptions : function() {
		var d = [], b = this.fontFamilies, c, f;
		for (var e = 0, a = b.length; e < a; e++) {
			c = b[e];
			f = c.toLowerCase();
			d.push('<option value="', f, '" style="font-family:', c, ';"',
					(this.defaultFont == f ? ' selected="true">' : ">"), c,
					"</option>")
		}
		return d.join("")
	},
	createToolbar : function(e) {
		var c = [];
		var a = Ext.QuickTips && Ext.QuickTips.isEnabled();
		function d(i, g, h) {
			return {
				itemId : i,
				cls : "x-btn-icon",
				iconCls : "x-edit-" + i,
				enableToggle : g !== false,
				scope : e,
				handler : h || e.relayBtnCmd,
				clickEvent : "mousedown",
				tooltip : a ? e.buttonTips[i] || undefined : undefined,
				overflowText : e.buttonTips[i].title || undefined,
				tabIndex : -1
			}
		}
		if (this.enableFont && !Ext.isSafari2) {
			var f = new Ext.Toolbar.Item({
						autoEl : {
							tag : "select",
							cls : "x-font-select",
							html : this.createFontOptions()
						}
					});
			c.push(f, "-")
		}
		if (this.enableFormat) {
			c.push(d("bold"), d("italic"), d("underline"))
		}
		if (this.enableFontSize) {
			c.push("-", d("increasefontsize", false, this.adjustFont), d(
							"decreasefontsize", false, this.adjustFont))
		}
		if (this.enableColors) {
			c.push("-", {
						itemId : "forecolor",
						cls : "x-btn-icon",
						iconCls : "x-edit-forecolor",
						clickEvent : "mousedown",
						tooltip : a
								? e.buttonTips.forecolor || undefined
								: undefined,
						tabIndex : -1,
						menu : new Ext.menu.ColorMenu({
									allowReselect : true,
									focus : Ext.emptyFn,
									value : "000000",
									plain : true,
									listeners : {
										scope : this,
										select : function(h, g) {
											this.execCmd("forecolor",
													Ext.isWebKit || Ext.isIE
															? "#" + g
															: g);
											this.deferFocus()
										}
									},
									clickEvent : "mousedown"
								})
					}, {
						itemId : "backcolor",
						cls : "x-btn-icon",
						iconCls : "x-edit-backcolor",
						clickEvent : "mousedown",
						tooltip : a
								? e.buttonTips.backcolor || undefined
								: undefined,
						tabIndex : -1,
						menu : new Ext.menu.ColorMenu({
									focus : Ext.emptyFn,
									value : "FFFFFF",
									plain : true,
									allowReselect : true,
									listeners : {
										scope : this,
										select : function(h, g) {
											if (Ext.isGecko) {
												this.execCmd("useCSS", false);
												this.execCmd("hilitecolor", g);
												this.execCmd("useCSS", true);
												this.deferFocus()
											} else {
												this.execCmd(Ext.isOpera
																? "hilitecolor"
																: "backcolor",
														Ext.isWebKit
																|| Ext.isIE
																? "#" + g
																: g);
												this.deferFocus()
											}
										}
									},
									clickEvent : "mousedown"
								})
					})
		}
		if (this.enableAlignments) {
			c
					.push("-", d("justifyleft"), d("justifycenter"),
							d("justifyright"))
		}
		if (!Ext.isSafari2) {
			if (this.enableLinks) {
				c.push("-", d("createlink", false, this.createLink))
			}
			if (this.enableLists) {
				c.push("-", d("insertorderedlist"), d("insertunorderedlist"))
			}
			if (this.enableSourceEdit) {
				c.push("-", d("sourceedit", true, function(g) {
									this.toggleSourceEdit(!this.sourceEditMode)
								}))
			}
		}
		var b = new Ext.Toolbar({
					renderTo : this.wrap.dom.firstChild,
					items : c
				});
		if (f) {
			this.fontSelect = f.el;
			this.mon(this.fontSelect, "change", function() {
						var g = this.fontSelect.dom.value;
						this.relayCmd("fontname", g);
						this.deferFocus()
					}, this)
		}
		this.mon(b.el, "click", function(g) {
					g.preventDefault()
				});
		this.tb = b
	},
	onDisable : function() {
		this.wrap.mask();
		Ext.form.HtmlEditor.superclass.onDisable.call(this)
	},
	onEnable : function() {
		this.wrap.unmask();
		Ext.form.HtmlEditor.superclass.onEnable.call(this)
	},
	setReadOnly : function(c) {
		if (this.initialized) {
			var a = c ? "off" : "on", b = this.getDoc();
			if (String(b.designMode).toLowerCase() != a) {
				b.designMode = a
			}
			this.disableItems(!c)
		}
		Ext.form.HtmlEditor.superclass.setReadOnly.call(this, c)
	},
	getDocMarkup : function() {
		return '<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>'
	},
	getEditorBody : function() {
		var a = this.getDoc();
		return a.body || a.documentElement
	},
	getDoc : function() {
		return Ext.isIE
				? this.getWin().document
				: (this.iframe.contentDocument || this.getWin().document)
	},
	getWin : function() {
		return Ext.isIE
				? this.iframe.contentWindow
				: window.frames[this.iframe.name]
	},
	onRender : function(b, a) {
		Ext.form.HtmlEditor.superclass.onRender.call(this, b, a);
		this.el.dom.style.border = "0 none";
		this.el.dom.setAttribute("tabIndex", -1);
		this.el.addClass("x-hidden");
		if (Ext.isIE) {
			this.el.applyStyles("margin-top:-1px;margin-bottom:-1px;")
		}
		this.wrap = this.el.wrap({
					cls : "x-html-editor-wrap",
					cn : {
						cls : "x-html-editor-tb"
					}
				});
		this.createToolbar(this);
		this.disableItems(true);
		this.createIFrame();
		if (!this.width) {
			var c = this.el.getSize();
			this.setSize(c.width, this.height || c.height)
		}
		this.resizeEl = this.positionEl = this.wrap
	},
	createIFrame : function() {
		var a = document.createElement("iframe");
		a.name = Ext.id();
		a.frameBorder = "0";
		a.src = Ext.SSL_SECURE_URL;
		this.wrap.dom.appendChild(a);
		this.iframe = a;
		this.monitorTask = Ext.TaskMgr.start({
					run : this.checkDesignMode,
					scope : this,
					interval : 100
				})
	},
	initFrame : function() {
		Ext.TaskMgr.stop(this.monitorTask);
		var b = this.getDoc();
		this.win = this.getWin();
		b.open();
		b.write(this.getDocMarkup());
		b.close();
		var a = {
			run : function() {
				var c = this.getDoc();
				if (c.body || c.readyState == "complete") {
					Ext.TaskMgr.stop(a);
					c.designMode = "on";
					this.initEditor.defer(10, this)
				}
			},
			interval : 10,
			duration : 10000,
			scope : this
		};
		Ext.TaskMgr.start(a)
	},
	checkDesignMode : function() {
		if (this.wrap && this.wrap.dom.offsetWidth) {
			var a = this.getDoc();
			if (!a) {
				return
			}
			if (!a.editorInitialized
					|| String(a.designMode).toLowerCase() != "on") {
				this.initFrame()
			}
		}
	},
	disableItems : function(a) {
		if (this.fontSelect) {
			this.fontSelect.dom.disabled = a
		}
		this.tb.items.each(function(b) {
					if (b.getItemId() != "sourceedit") {
						b.setDisabled(a)
					}
				})
	},
	onResize : function(b, c) {
		Ext.form.HtmlEditor.superclass.onResize.apply(this, arguments);
		if (this.el && this.iframe) {
			if (Ext.isNumber(b)) {
				var e = b - this.wrap.getFrameWidth("lr");
				this.el.setWidth(e);
				this.tb.setWidth(e);
				this.iframe.style.width = Math.max(e, 0) + "px"
			}
			if (Ext.isNumber(c)) {
				var a = c - this.wrap.getFrameWidth("tb")
						- this.tb.el.getHeight();
				this.el.setHeight(a);
				this.iframe.style.height = Math.max(a, 0) + "px";
				var d = this.getEditorBody();
				if (d) {
					d.style.height = Math.max((a - (this.iframePad * 2)), 0)
							+ "px"
				}
			}
		}
	},
	toggleSourceEdit : function(a) {
		if (a === undefined) {
			a = !this.sourceEditMode
		}
		this.sourceEditMode = a === true;
		var c = this.tb.getComponent("sourceedit");
		if (c.pressed !== this.sourceEditMode) {
			c.toggle(this.sourceEditMode);
			if (!c.xtbHidden) {
				return
			}
		}
		if (this.sourceEditMode) {
			this.disableItems(true);
			this.syncValue();
			this.iframe.className = "x-hidden";
			this.el.removeClass("x-hidden");
			this.el.dom.removeAttribute("tabIndex");
			this.el.focus()
		} else {
			if (this.initialized && !this.readOnly) {
				this.disableItems(false)
			}
			this.pushValue();
			this.iframe.className = "";
			this.el.addClass("x-hidden");
			this.el.dom.setAttribute("tabIndex", -1);
			this.deferFocus()
		}
		var b = this.lastSize;
		if (b) {
			delete this.lastSize;
			this.setSize(b)
		}
		this.fireEvent("editmodechange", this, this.sourceEditMode)
	},
	createLink : function() {
		var a = prompt(this.createLinkText, this.defaultLinkValue);
		if (a && a != "http://") {
			this.relayCmd("createlink", a)
		}
	},
	initEvents : function() {
		this.originalValue = this.getValue()
	},
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn,
	setValue : function(a) {
		Ext.form.HtmlEditor.superclass.setValue.call(this, a);
		this.pushValue();
		return this
	},
	cleanHtml : function(a) {
		a = String(a);
		if (Ext.isWebKit) {
			a = a.replace(
					/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,
					"")
		}
		if (a.charCodeAt(0) == this.defaultValue.replace(/\D/g, "")) {
			a = a.substring(1)
		}
		return a
	},
	syncValue : function() {
		if (this.initialized) {
			var d = this.getEditorBody();
			var c = d.innerHTML;
			if (Ext.isWebKit) {
				var b = d.getAttribute("style");
				var a = b.match(/text-align:(.*?);/i);
				if (a && a[1]) {
					c = '<div style="' + a[0] + '">' + c + "</div>"
				}
			}
			c = this.cleanHtml(c);
			if (this.fireEvent("beforesync", this, c) !== false) {
				this.el.dom.value = c;
				this.fireEvent("sync", this, c)
			}
		}
	},
	getValue : function() {
		this[this.sourceEditMode ? "pushValue" : "syncValue"]();
		return Ext.form.HtmlEditor.superclass.getValue.call(this)
	},
	pushValue : function() {
		if (this.initialized) {
			var a = this.el.dom.value;
			if (!this.activated && a.length < 1) {
				a = this.defaultValue
			}
			if (this.fireEvent("beforepush", this, a) !== false) {
				this.getEditorBody().innerHTML = a;
				if (Ext.isGecko) {
					var c = this.getDoc(), b = c.designMode.toLowerCase();
					c.designMode = b.toggle("on", "off");
					c.designMode = b
				}
				this.fireEvent("push", this, a)
			}
		}
	},
	deferFocus : function() {
		this.focus.defer(10, this)
	},
	focus : function() {
		if (this.win && !this.sourceEditMode) {
			this.win.focus()
		} else {
			this.el.focus()
		}
	},
	initEditor : function() {
		try {
			var c = this.getEditorBody(), a = this.el.getStyles("font-size",
					"font-family", "background-image", "background-repeat"), f, b;
			a["background-attachment"] = "fixed";
			c.bgProperties = "fixed";
			Ext.DomHelper.applyStyles(c, a);
			f = this.getDoc();
			if (f) {
				try {
					Ext.EventManager.removeAll(f)
				} catch (d) {
				}
			}
			b = this.onEditorEvent.createDelegate(this);
			Ext.EventManager.on(f, {
						mousedown : b,
						dblclick : b,
						click : b,
						keyup : b,
						buffer : 100
					});
			if (Ext.isGecko) {
				Ext.EventManager.on(f, "keypress", this.applyCommand, this)
			}
			if (Ext.isIE || Ext.isWebKit || Ext.isOpera) {
				Ext.EventManager.on(f, "keydown", this.fixKeys, this)
			}
			f.editorInitialized = true;
			this.initialized = true;
			this.pushValue();
			this.setReadOnly(this.readOnly);
			this.fireEvent("initialize", this)
		} catch (d) {
		}
	},
	onDestroy : function() {
		if (this.monitorTask) {
			Ext.TaskMgr.stop(this.monitorTask)
		}
		if (this.rendered) {
			Ext.destroy(this.tb);
			var b = this.getDoc();
			if (b) {
				try {
					Ext.EventManager.removeAll(b);
					for (var c in b) {
						delete b[c]
					}
				} catch (a) {
				}
			}
			if (this.wrap) {
				this.wrap.dom.innerHTML = "";
				this.wrap.remove()
			}
		}
		if (this.el) {
			this.el.removeAllListeners();
			this.el.remove()
		}
		this.purgeListeners()
	},
	onFirstFocus : function() {
		this.activated = true;
		this.disableItems(false);
		if (Ext.isGecko) {
			this.win.focus();
			var a = this.win.getSelection();
			if (!a.focusNode || a.focusNode.nodeType != 3) {
				var b = a.getRangeAt(0);
				b.selectNodeContents(this.getEditorBody());
				b.collapse(true);
				this.deferFocus()
			}
			try {
				this.execCmd("useCSS", true);
				this.execCmd("styleWithCSS", false)
			} catch (c) {
			}
		}
		this.fireEvent("activate", this)
	},
	adjustFont : function(b) {
		var d = b.getItemId() == "increasefontsize" ? 1 : -1, c = this.getDoc(), a = parseInt(
				c.queryCommandValue("FontSize") || 2, 10);
		if ((Ext.isSafari && !Ext.isSafari2) || Ext.isChrome || Ext.isAir) {
			if (a <= 10) {
				a = 1 + d
			} else {
				if (a <= 13) {
					a = 2 + d
				} else {
					if (a <= 16) {
						a = 3 + d
					} else {
						if (a <= 18) {
							a = 4 + d
						} else {
							if (a <= 24) {
								a = 5 + d
							} else {
								a = 6 + d
							}
						}
					}
				}
			}
			a = a.constrain(1, 6)
		} else {
			if (Ext.isSafari) {
				d *= 2
			}
			a = Math.max(1, a + d) + (Ext.isSafari ? "px" : 0)
		}
		this.execCmd("FontSize", a)
	},
	onEditorEvent : function(a) {
		this.updateToolbar()
	},
	updateToolbar : function() {
		if (this.readOnly) {
			return
		}
		if (!this.activated) {
			this.onFirstFocus();
			return
		}
		var b = this.tb.items.map, c = this.getDoc();
		if (this.enableFont && !Ext.isSafari2) {
			var a = (c.queryCommandValue("FontName") || this.defaultFont)
					.toLowerCase();
			if (a != this.fontSelect.dom.value) {
				this.fontSelect.dom.value = a
			}
		}
		if (this.enableFormat) {
			b.bold.toggle(c.queryCommandState("bold"));
			b.italic.toggle(c.queryCommandState("italic"));
			b.underline.toggle(c.queryCommandState("underline"))
		}
		if (this.enableAlignments) {
			b.justifyleft.toggle(c.queryCommandState("justifyleft"));
			b.justifycenter.toggle(c.queryCommandState("justifycenter"));
			b.justifyright.toggle(c.queryCommandState("justifyright"))
		}
		if (!Ext.isSafari2 && this.enableLists) {
			b.insertorderedlist
					.toggle(c.queryCommandState("insertorderedlist"));
			b.insertunorderedlist.toggle(c
					.queryCommandState("insertunorderedlist"))
		}
		Ext.menu.MenuMgr.hideAll();
		this.syncValue()
	},
	relayBtnCmd : function(a) {
		this.relayCmd(a.getItemId())
	},
	relayCmd : function(b, a) {
(function() {
			this.focus();
			this.execCmd(b, a);
			this.updateToolbar()
		}).defer(10, this)
	},
	execCmd : function(b, a) {
		var c = this.getDoc();
		c.execCommand(b, false, a === undefined ? null : a);
		this.syncValue()
	},
	applyCommand : function(b) {
		if (b.ctrlKey) {
			var d = b.getCharCode(), a;
			if (d > 0) {
				d = String.fromCharCode(d);
				switch (d) {
					case "b" :
						a = "bold";
						break;
					case "i" :
						a = "italic";
						break;
					case "u" :
						a = "underline";
						break
				}
				if (a) {
					this.win.focus();
					this.execCmd(a);
					this.deferFocus();
					b.preventDefault()
				}
			}
		}
	},
	insertAtCursor : function(c) {
		if (!this.activated) {
			return
		}
		if (Ext.isIE) {
			this.win.focus();
			var b = this.getDoc(), a = b.selection.createRange();
			if (a) {
				a.pasteHTML(c);
				this.syncValue();
				this.deferFocus()
			}
		} else {
			this.win.focus();
			this.execCmd("InsertHTML", c);
			this.deferFocus()
		}
	},
	fixKeys : function() {
		if (Ext.isIE) {
			return function(f) {
				var a = f.getKey(), d = this.getDoc(), b;
				if (a == f.TAB) {
					f.stopEvent();
					b = d.selection.createRange();
					if (b) {
						b.collapse(true);
						b.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
						this.deferFocus()
					}
				} else {
					if (a == f.ENTER) {
						b = d.selection.createRange();
						if (b) {
							var c = b.parentElement();
							if (!c || c.tagName.toLowerCase() != "li") {
								f.stopEvent();
								b.pasteHTML("<br />");
								b.collapse(false);
								b.select()
							}
						}
					}
				}
			}
		} else {
			if (Ext.isOpera) {
				return function(b) {
					var a = b.getKey();
					if (a == b.TAB) {
						b.stopEvent();
						this.win.focus();
						this.execCmd("InsertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
						this.deferFocus()
					}
				}
			} else {
				if (Ext.isWebKit) {
					return function(b) {
						var a = b.getKey();
						if (a == b.TAB) {
							b.stopEvent();
							this.execCmd("InsertText", "\t");
							this.deferFocus()
						} else {
							if (a == b.ENTER) {
								b.stopEvent();
								this.execCmd("InsertHtml", "<br /><br />");
								this.deferFocus()
							}
						}
					}
				}
			}
		}
	}(),
	getToolbar : function() {
		return this.tb
	},
	buttonTips : {
		bold : {
			title : "Bold (Ctrl+B)",
			text : "Make the selected text bold.",
			cls : "x-html-editor-tip"
		},
		italic : {
			title : "Italic (Ctrl+I)",
			text : "Make the selected text italic.",
			cls : "x-html-editor-tip"
		},
		underline : {
			title : "Underline (Ctrl+U)",
			text : "Underline the selected text.",
			cls : "x-html-editor-tip"
		},
		increasefontsize : {
			title : "Grow Text",
			text : "Increase the font size.",
			cls : "x-html-editor-tip"
		},
		decreasefontsize : {
			title : "Shrink Text",
			text : "Decrease the font size.",
			cls : "x-html-editor-tip"
		},
		backcolor : {
			title : "Text Highlight Color",
			text : "Change the background color of the selected text.",
			cls : "x-html-editor-tip"
		},
		forecolor : {
			title : "Font Color",
			text : "Change the color of the selected text.",
			cls : "x-html-editor-tip"
		},
		justifyleft : {
			title : "Align Text Left",
			text : "Align text to the left.",
			cls : "x-html-editor-tip"
		},
		justifycenter : {
			title : "Center Text",
			text : "Center text in the editor.",
			cls : "x-html-editor-tip"
		},
		justifyright : {
			title : "Align Text Right",
			text : "Align text to the right.",
			cls : "x-html-editor-tip"
		},
		insertunorderedlist : {
			title : "Bullet List",
			text : "Start a bulleted list.",
			cls : "x-html-editor-tip"
		},
		insertorderedlist : {
			title : "Numbered List",
			text : "Start a numbered list.",
			cls : "x-html-editor-tip"
		},
		createlink : {
			title : "Hyperlink",
			text : "Make the selected text a hyperlink.",
			cls : "x-html-editor-tip"
		},
		sourceedit : {
			title : "Source Edit",
			text : "Switch to source editing mode.",
			cls : "x-html-editor-tip"
		}
	}
});
Ext.reg("htmleditor", Ext.form.HtmlEditor);
Ext.form.TimeField = Ext.extend(Ext.form.ComboBox, {
	minValue : undefined,
	maxValue : undefined,
	minText : "The time in this field must be equal to or after {0}",
	maxText : "The time in this field must be equal to or before {0}",
	invalidText : "{0} is not a valid time",
	format : "g:i A",
	altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H",
	increment : 15,
	mode : "local",
	triggerAction : "all",
	typeAhead : false,
	initDate : "1/1/2008",
	initComponent : function() {
		if (Ext.isDefined(this.minValue)) {
			this.setMinValue(this.minValue, true)
		}
		if (Ext.isDefined(this.maxValue)) {
			this.setMaxValue(this.maxValue, true)
		}
		if (!this.store) {
			this.generateStore(true)
		}
		Ext.form.TimeField.superclass.initComponent.call(this)
	},
	setMinValue : function(b, a) {
		this.setLimit(b, true, a);
		return this
	},
	setMaxValue : function(b, a) {
		this.setLimit(b, false, a);
		return this
	},
	generateStore : function(b) {
		var c = this.minValue || new Date(this.initDate).clearTime(), a = this.maxValue
				|| new Date(this.initDate).clearTime().add("mi", (24 * 60) - 1), d = [];
		while (c <= a) {
			d.push(c.dateFormat(this.format));
			c = c.add("mi", this.increment)
		}
		this.bindStore(d, b)
	},
	setLimit : function(b, f, a) {
		var e;
		if (Ext.isString(b)) {
			e = this.parseDate(b)
		} else {
			if (Ext.isDate(b)) {
				e = b
			}
		}
		if (e) {
			var c = new Date(this.initDate).clearTime();
			c.setHours(e.getHours(), e.getMinutes(), f ? 0 : 59, 0);
			this[f ? "minValue" : "maxValue"] = c;
			if (!a) {
				this.generateStore()
			}
		}
	},
	getValue : function() {
		var a = Ext.form.TimeField.superclass.getValue.call(this);
		return this.formatDate(this.parseDate(a)) || ""
	},
	setValue : function(a) {
		return Ext.form.TimeField.superclass.setValue.call(this, this
						.formatDate(this.parseDate(a)))
	},
	validateValue : Ext.form.DateField.prototype.validateValue,
	parseDate : Ext.form.DateField.prototype.parseDate,
	formatDate : Ext.form.DateField.prototype.formatDate,
	beforeBlur : function() {
		var a = this.parseDate(this.getRawValue());
		if (a) {
			this.setValue(a.dateFormat(this.format))
		}
		Ext.form.TimeField.superclass.beforeBlur.call(this)
	}
});
Ext.reg("timefield", Ext.form.TimeField);
Ext.form.Label = Ext.extend(Ext.BoxComponent, {
			onRender : function(b, a) {
				if (!this.el) {
					this.el = document.createElement("label");
					this.el.id = this.getId();
					this.el.innerHTML = this.text ? Ext.util.Format
							.htmlEncode(this.text) : (this.html || "");
					if (this.forId) {
						this.el.setAttribute("for", this.forId)
					}
				}
				Ext.form.Label.superclass.onRender.call(this, b, a)
			},
			setText : function(a, b) {
				var c = b === false;
				this[!c ? "text" : "html"] = a;
				delete this[c ? "text" : "html"];
				if (this.rendered) {
					this.el.dom.innerHTML = b !== false ? Ext.util.Format
							.htmlEncode(a) : a
				}
				return this
			}
		});
Ext.reg("label", Ext.form.Label);
Ext.form.Action = function(b, a) {
	this.form = b;
	this.options = a || {}
};
Ext.form.Action.CLIENT_INVALID = "client";
Ext.form.Action.SERVER_INVALID = "server";
Ext.form.Action.CONNECT_FAILURE = "connect";
Ext.form.Action.LOAD_FAILURE = "load";
Ext.form.Action.prototype = {
	type : "default",
	run : function(a) {
	},
	success : function(a) {
	},
	handleResponse : function(a) {
	},
	failure : function(a) {
		this.response = a;
		this.failureType = Ext.form.Action.CONNECT_FAILURE;
		this.form.afterAction(this, false)
	},
	processResponse : function(a) {
		this.response = a;
		if (!a.responseText && !a.responseXML) {
			return true
		}
		this.result = this.handleResponse(a);
		return this.result
	},
	getUrl : function(c) {
		var a = this.options.url || this.form.url || this.form.el.dom.action;
		if (c) {
			var b = this.getParams();
			if (b) {
				a = Ext.urlAppend(a, b)
			}
		}
		return a
	},
	getMethod : function() {
		return (this.options.method || this.form.method
				|| this.form.el.dom.method || "POST").toUpperCase()
	},
	getParams : function() {
		var a = this.form.baseParams;
		var b = this.options.params;
		if (b) {
			if (typeof b == "object") {
				b = Ext.urlEncode(Ext.applyIf(b, a))
			} else {
				if (typeof b == "string" && a) {
					b += "&" + Ext.urlEncode(a)
				}
			}
		} else {
			if (a) {
				b = Ext.urlEncode(a)
			}
		}
		return b
	},
	createCallback : function(a) {
		var a = a || {};
		return {
			success : this.success,
			failure : this.failure,
			scope : this,
			timeout : (a.timeout * 1000) || (this.form.timeout * 1000),
			upload : this.form.fileUpload ? this.success : undefined
		}
	}
};
Ext.form.Action.Submit = function(b, a) {
	Ext.form.Action.Submit.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.form.Action.Submit, Ext.form.Action, {
			type : "submit",
			run : function() {
				var b = this.options;
				var c = this.getMethod();
				var a = c == "GET";
				if (b.clientValidation === false || this.form.isValid()) {
					Ext.Ajax.request(Ext.apply(this.createCallback(b), {
								form : this.form.el.dom,
								url : this.getUrl(a),
								method : c,
								headers : b.headers,
								params : !a ? this.getParams() : null,
								isUpload : this.form.fileUpload
							}))
				} else {
					if (b.clientValidation !== false) {
						this.failureType = Ext.form.Action.CLIENT_INVALID;
						this.form.afterAction(this, false)
					}
				}
			},
			success : function(b) {
				var a = this.processResponse(b);
				if (a === true || a.success) {
					this.form.afterAction(this, true);
					return
				}
				if (a.errors) {
					this.form.markInvalid(a.errors)
				}
				this.failureType = Ext.form.Action.SERVER_INVALID;
				this.form.afterAction(this, false)
			},
			handleResponse : function(c) {
				if (this.form.errorReader) {
					var b = this.form.errorReader.read(c);
					var f = [];
					if (b.records) {
						for (var d = 0, a = b.records.length; d < a; d++) {
							var e = b.records[d];
							f[d] = e.data
						}
					}
					if (f.length < 1) {
						f = null
					}
					return {
						success : b.success,
						errors : f
					}
				}
				return Ext.decode(c.responseText)
			}
		});
Ext.form.Action.Load = function(b, a) {
	Ext.form.Action.Load.superclass.constructor.call(this, b, a);
	this.reader = this.form.reader
};
Ext.extend(Ext.form.Action.Load, Ext.form.Action, {
			type : "load",
			run : function() {
				Ext.Ajax.request(Ext.apply(this.createCallback(this.options), {
							method : this.getMethod(),
							url : this.getUrl(false),
							headers : this.options.headers,
							params : this.getParams()
						}))
			},
			success : function(b) {
				var a = this.processResponse(b);
				if (a === true || !a.success || !a.data) {
					this.failureType = Ext.form.Action.LOAD_FAILURE;
					this.form.afterAction(this, false);
					return
				}
				this.form.clearInvalid();
				this.form.setValues(a.data);
				this.form.afterAction(this, true)
			},
			handleResponse : function(b) {
				if (this.form.reader) {
					var a = this.form.reader.read(b);
					var c = a.records && a.records[0]
							? a.records[0].data
							: null;
					return {
						success : a.success,
						data : c
					}
				}
				return Ext.decode(b.responseText)
			}
		});
Ext.form.Action.DirectLoad = Ext.extend(Ext.form.Action.Load, {
			constructor : function(b, a) {
				Ext.form.Action.DirectLoad.superclass.constructor.call(this, b,
						a)
			},
			type : "directload",
			run : function() {
				var a = this.getParams();
				a.push(this.success, this);
				this.form.api.load.apply(window, a)
			},
			getParams : function() {
				var c = [], g = {};
				var e = this.form.baseParams;
				var f = this.options.params;
				Ext.apply(g, f, e);
				var b = this.form.paramOrder;
				if (b) {
					for (var d = 0, a = b.length; d < a; d++) {
						c.push(g[b[d]])
					}
				} else {
					if (this.form.paramsAsHash) {
						c.push(g)
					}
				}
				return c
			},
			processResponse : function(a) {
				this.result = a;
				return a
			},
			success : function(a, b) {
				if (b.type == Ext.Direct.exceptions.SERVER) {
					a = {}
				}
				Ext.form.Action.DirectLoad.superclass.success.call(this, a)
			}
		});
Ext.form.Action.DirectSubmit = Ext.extend(Ext.form.Action.Submit, {
			constructor : function(b, a) {
				Ext.form.Action.DirectSubmit.superclass.constructor.call(this,
						b, a)
			},
			type : "directsubmit",
			run : function() {
				var a = this.options;
				if (a.clientValidation === false || this.form.isValid()) {
					this.success.params = this.getParams();
					this.form.api.submit(this.form.el.dom, this.success, this)
				} else {
					if (a.clientValidation !== false) {
						this.failureType = Ext.form.Action.CLIENT_INVALID;
						this.form.afterAction(this, false)
					}
				}
			},
			getParams : function() {
				var c = {};
				var a = this.form.baseParams;
				var b = this.options.params;
				Ext.apply(c, b, a);
				return c
			},
			processResponse : function(a) {
				this.result = a;
				return a
			},
			success : function(a, b) {
				if (b.type == Ext.Direct.exceptions.SERVER) {
					a = {}
				}
				Ext.form.Action.DirectSubmit.superclass.success.call(this, a)
			}
		});
Ext.form.Action.ACTION_TYPES = {
	load : Ext.form.Action.Load,
	submit : Ext.form.Action.Submit,
	directload : Ext.form.Action.DirectLoad,
	directsubmit : Ext.form.Action.DirectSubmit
};
Ext.form.VTypes = function() {
	var c = /^[a-zA-Z_]+$/, d = /^[a-zA-Z0-9_]+$/, b = /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/, a = /(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
	return {
		email : function(e) {
			return b.test(e)
		},
		emailText : 'This field should be an e-mail address in the format "user@example.com"',
		emailMask : /[a-z0-9_\.\-@]/i,
		url : function(e) {
			return a.test(e)
		},
		urlText : 'This field should be a URL in the format "http://www.example.com"',
		alpha : function(e) {
			return c.test(e)
		},
		alphaText : "This field should only contain letters and _",
		alphaMask : /[a-z_]/i,
		alphanum : function(e) {
			return d.test(e)
		},
		alphanumText : "This field should only contain letters, numbers and _",
		alphanumMask : /[a-z0-9_]/i
	}
}();