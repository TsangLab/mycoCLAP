/*
 * Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.tree.TreePanel = Ext.extend(Ext.Panel, {
			rootVisible : true,
			animate : Ext.enableFx,
			lines : true,
			enableDD : false,
			hlDrop : Ext.enableFx,
			pathSeparator : "/",
			bubbleEvents : [],
			initComponent : function() {
				Ext.tree.TreePanel.superclass.initComponent.call(this);
				if (!this.eventModel) {
					this.eventModel = new Ext.tree.TreeEventModel(this)
				}
				var a = this.loader;
				if (!a) {
					a = new Ext.tree.TreeLoader({
								dataUrl : this.dataUrl,
								requestMethod : this.requestMethod
							})
				} else {
					if (Ext.isObject(a) && !a.load) {
						a = new Ext.tree.TreeLoader(a)
					}
				}
				this.loader = a;
				this.nodeHash = {};
				if (this.root) {
					var b = this.root;
					delete this.root;
					this.setRootNode(b)
				}
				this.addEvents("append", "remove", "movenode", "insert",
						"beforeappend", "beforeremove", "beforemovenode",
						"beforeinsert", "beforeload", "load", "textchange",
						"beforeexpandnode", "beforecollapsenode", "expandnode",
						"disabledchange", "collapsenode", "beforeclick",
						"click", "containerclick", "checkchange",
						"beforedblclick", "dblclick", "containerdblclick",
						"contextmenu", "containercontextmenu",
						"beforechildrenrendered", "startdrag", "enddrag",
						"dragdrop", "beforenodedrop", "nodedrop",
						"nodedragover");
				if (this.singleExpand) {
					this.on("beforeexpandnode", this.restrictExpand, this)
				}
			},
			proxyNodeEvent : function(c, b, a, g, f, e, d) {
				if (c == "collapse" || c == "expand" || c == "beforecollapse"
						|| c == "beforeexpand" || c == "move"
						|| c == "beforemove") {
					c = c + "node"
				}
				return this.fireEvent(c, b, a, g, f, e, d)
			},
			getRootNode : function() {
				return this.root
			},
			setRootNode : function(b) {
				Ext.destroy(this.root);
				if (!b.render) {
					b = this.loader.createNode(b)
				}
				this.root = b;
				b.ownerTree = this;
				b.isRoot = true;
				this.registerNode(b);
				if (!this.rootVisible) {
					var a = b.attributes.uiProvider;
					b.ui = a ? new a(b) : new Ext.tree.RootTreeNodeUI(b)
				}
				if (this.innerCt) {
					this.innerCt.update("");
					this.afterRender()
				}
				return b
			},
			getNodeById : function(a) {
				return this.nodeHash[a]
			},
			registerNode : function(a) {
				this.nodeHash[a.id] = a
			},
			unregisterNode : function(a) {
				delete this.nodeHash[a.id]
			},
			toString : function() {
				return "[Tree" + (this.id ? " " + this.id : "") + "]"
			},
			restrictExpand : function(a) {
				var b = a.parentNode;
				if (b) {
					if (b.expandedChild && b.expandedChild.parentNode == b) {
						b.expandedChild.collapse()
					}
					b.expandedChild = a
				}
			},
			getChecked : function(b, c) {
				c = c || this.root;
				var d = [];
				var e = function() {
					if (this.attributes.checked) {
						d.push(!b ? this : (b == "id"
								? this.id
								: this.attributes[b]))
					}
				};
				c.cascade(e);
				return d
			},
			getLoader : function() {
				return this.loader
			},
			expandAll : function() {
				this.root.expand(true)
			},
			collapseAll : function() {
				this.root.collapse(true)
			},
			getSelectionModel : function() {
				if (!this.selModel) {
					this.selModel = new Ext.tree.DefaultSelectionModel()
				}
				return this.selModel
			},
			expandPath : function(g, a, h) {
				a = a || "id";
				var d = g.split(this.pathSeparator);
				var c = this.root;
				if (c.attributes[a] != d[1]) {
					if (h) {
						h(false, null)
					}
					return
				}
				var b = 1;
				var e = function() {
					if (++b == d.length) {
						if (h) {
							h(true, c)
						}
						return
					}
					var f = c.findChild(a, d[b]);
					if (!f) {
						if (h) {
							h(false, c)
						}
						return
					}
					c = f;
					f.expand(false, false, e)
				};
				c.expand(false, false, e)
			},
			selectPath : function(e, a, g) {
				a = a || "id";
				var c = e.split(this.pathSeparator), b = c.pop();
				if (c.length > 1) {
					var d = function(h, f) {
						if (h && f) {
							var i = f.findChild(a, b);
							if (i) {
								i.select();
								if (g) {
									g(true, i)
								}
							} else {
								if (g) {
									g(false, i)
								}
							}
						} else {
							if (g) {
								g(false, i)
							}
						}
					};
					this.expandPath(c.join(this.pathSeparator), a, d)
				} else {
					this.root.select();
					if (g) {
						g(true, this.root)
					}
				}
			},
			getTreeEl : function() {
				return this.body
			},
			onRender : function(b, a) {
				Ext.tree.TreePanel.superclass.onRender.call(this, b, a);
				this.el.addClass("x-tree");
				this.innerCt = this.body.createChild({
							tag : "ul",
							cls : "x-tree-root-ct "
									+ (this.useArrows
											? "x-tree-arrows"
											: this.lines
													? "x-tree-lines"
													: "x-tree-no-lines")
						})
			},
			initEvents : function() {
				Ext.tree.TreePanel.superclass.initEvents.call(this);
				if (this.containerScroll) {
					Ext.dd.ScrollManager.register(this.body)
				}
				if ((this.enableDD || this.enableDrop) && !this.dropZone) {
					this.dropZone = new Ext.tree.TreeDropZone(this,
							this.dropConfig || {
								ddGroup : this.ddGroup || "TreeDD",
								appendOnly : this.ddAppendOnly === true
							})
				}
				if ((this.enableDD || this.enableDrag) && !this.dragZone) {
					this.dragZone = new Ext.tree.TreeDragZone(this,
							this.dragConfig || {
								ddGroup : this.ddGroup || "TreeDD",
								scroll : this.ddScroll
							})
				}
				this.getSelectionModel().init(this)
			},
			afterRender : function() {
				Ext.tree.TreePanel.superclass.afterRender.call(this);
				this.root.render();
				if (!this.rootVisible) {
					this.root.renderChildren()
				}
			},
			beforeDestroy : function() {
				if (this.rendered) {
					Ext.dd.ScrollManager.unregister(this.body);
					Ext.destroy(this.dropZone, this.dragZone)
				}
				Ext.destroy(this.root, this.loader);
				this.nodeHash = this.root = this.loader = null;
				Ext.tree.TreePanel.superclass.beforeDestroy.call(this)
			}
		});
Ext.tree.TreePanel.nodeTypes = {};
Ext.reg("treepanel", Ext.tree.TreePanel);
Ext.tree.TreeEventModel = function(a) {
	this.tree = a;
	this.tree.on("render", this.initEvents, this)
};
Ext.tree.TreeEventModel.prototype = {
	initEvents : function() {
		var a = this.tree;
		if (a.trackMouseOver !== false) {
			a.mon(a.innerCt, {
						scope : this,
						mouseover : this.delegateOver,
						mouseout : this.delegateOut
					})
		}
		a.mon(a.getTreeEl(), {
					scope : this,
					click : this.delegateClick,
					dblclick : this.delegateDblClick,
					contextmenu : this.delegateContextMenu
				})
	},
	getNode : function(b) {
		var a;
		if (a = b.getTarget(".x-tree-node-el", 10)) {
			var c = Ext.fly(a, "_treeEvents").getAttribute("tree-node-id",
					"ext");
			if (c) {
				return this.tree.getNodeById(c)
			}
		}
		return null
	},
	getNodeTarget : function(b) {
		var a = b.getTarget(".x-tree-node-icon", 1);
		if (!a) {
			a = b.getTarget(".x-tree-node-el", 6)
		}
		return a
	},
	delegateOut : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			var c = this.getNode(b);
			this.onIconOut(b, c);
			if (c == this.lastEcOver) {
				delete this.lastEcOver
			}
		}
		if ((a = this.getNodeTarget(b)) && !b.within(a, true)) {
			this.onNodeOut(b, this.getNode(b))
		}
	},
	delegateOver : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (Ext.isGecko && !this.trackingDoc) {
			Ext.getBody().on("mouseover", this.trackExit, this);
			this.trackingDoc = true
		}
		if (this.lastEcOver) {
			this.onIconOut(b, this.lastEcOver);
			delete this.lastEcOver
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			this.lastEcOver = this.getNode(b);
			this.onIconOver(b, this.lastEcOver)
		}
		if (a = this.getNodeTarget(b)) {
			this.onNodeOver(b, this.getNode(b))
		}
	},
	trackExit : function(a) {
		if (this.lastOverNode && !a.within(this.lastOverNode.ui.getEl())) {
			this.onNodeOut(a, this.lastOverNode);
			delete this.lastOverNode;
			Ext.getBody().un("mouseover", this.trackExit, this);
			this.trackingDoc = false
		}
	},
	delegateClick : function(b, a) {
		if (this.beforeEvent(b)) {
			if (b.getTarget("input[type=checkbox]", 1)) {
				this.onCheckboxClick(b, this.getNode(b))
			} else {
				if (b.getTarget(".x-tree-ec-icon", 1)) {
					this.onIconClick(b, this.getNode(b))
				} else {
					if (this.getNodeTarget(b)) {
						this.onNodeClick(b, this.getNode(b))
					} else {
						this.onContainerEvent(b, "click")
					}
				}
			}
		}
	},
	delegateDblClick : function(b, a) {
		if (this.beforeEvent(b)) {
			if (this.getNodeTarget(b)) {
				this.onNodeDblClick(b, this.getNode(b))
			} else {
				this.onContainerEvent(b, "dblclick")
			}
		}
	},
	delegateContextMenu : function(b, a) {
		if (this.beforeEvent(b)) {
			if (this.getNodeTarget(b)) {
				this.onNodeContextMenu(b, this.getNode(b))
			} else {
				this.onContainerEvent(b, "contextmenu")
			}
		}
	},
	onContainerEvent : function(b, a) {
		this.tree.fireEvent("container" + a, this.tree, b)
	},
	onNodeClick : function(b, a) {
		a.ui.onClick(b)
	},
	onNodeOver : function(b, a) {
		this.lastOverNode = a;
		a.ui.onOver(b)
	},
	onNodeOut : function(b, a) {
		a.ui.onOut(b)
	},
	onIconOver : function(b, a) {
		a.ui.addClass("x-tree-ec-over")
	},
	onIconOut : function(b, a) {
		a.ui.removeClass("x-tree-ec-over")
	},
	onIconClick : function(b, a) {
		a.ui.ecClick(b)
	},
	onCheckboxClick : function(b, a) {
		a.ui.onCheckChange(b)
	},
	onNodeDblClick : function(b, a) {
		a.ui.onDblClick(b)
	},
	onNodeContextMenu : function(b, a) {
		a.ui.onContextMenu(b)
	},
	beforeEvent : function(a) {
		if (this.disabled) {
			a.stopEvent();
			return false
		}
		return true
	},
	disable : function() {
		this.disabled = true
	},
	enable : function() {
		this.disabled = false
	}
};
Ext.tree.DefaultSelectionModel = function(a) {
	this.selNode = null;
	this.addEvents("selectionchange", "beforeselect");
	Ext.apply(this, a);
	Ext.tree.DefaultSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.DefaultSelectionModel, Ext.util.Observable, {
	init : function(a) {
		this.tree = a;
		a.mon(a.getTreeEl(), "keydown", this.onKeyDown, this);
		a.on("click", this.onNodeClick, this)
	},
	onNodeClick : function(a, b) {
		this.select(a)
	},
	select : function(c, a) {
		if (!Ext.fly(c.ui.wrap).isVisible() && a) {
			return a.call(this, c)
		}
		var b = this.selNode;
		if (c == b) {
			c.ui.onSelectedChange(true)
		} else {
			if (this.fireEvent("beforeselect", this, c, b) !== false) {
				if (b && b.ui) {
					b.ui.onSelectedChange(false)
				}
				this.selNode = c;
				c.ui.onSelectedChange(true);
				this.fireEvent("selectionchange", this, c, b)
			}
		}
		return c
	},
	unselect : function(b, a) {
		if (this.selNode == b) {
			this.clearSelections(a)
		}
	},
	clearSelections : function(a) {
		var b = this.selNode;
		if (b) {
			b.ui.onSelectedChange(false);
			this.selNode = null;
			if (a !== true) {
				this.fireEvent("selectionchange", this, null)
			}
		}
		return b
	},
	getSelectedNode : function() {
		return this.selNode
	},
	isSelected : function(a) {
		return this.selNode == a
	},
	selectPrevious : function(a) {
		if (!(a = a || this.selNode || this.lastSelNode)) {
			return null
		}
		var c = a.previousSibling;
		if (c) {
			if (!c.isExpanded() || c.childNodes.length < 1) {
				return this.select(c, this.selectPrevious)
			} else {
				var b = c.lastChild;
				while (b && b.isExpanded() && Ext.fly(b.ui.wrap).isVisible()
						&& b.childNodes.length > 0) {
					b = b.lastChild
				}
				return this.select(b, this.selectPrevious)
			}
		} else {
			if (a.parentNode && (this.tree.rootVisible || !a.parentNode.isRoot)) {
				return this.select(a.parentNode, this.selectPrevious)
			}
		}
		return null
	},
	selectNext : function(b) {
		if (!(b = b || this.selNode || this.lastSelNode)) {
			return null
		}
		if (b.firstChild && b.isExpanded() && Ext.fly(b.ui.wrap).isVisible()) {
			return this.select(b.firstChild, this.selectNext)
		} else {
			if (b.nextSibling) {
				return this.select(b.nextSibling, this.selectNext)
			} else {
				if (b.parentNode) {
					var a = null;
					b.parentNode.bubble(function() {
								if (this.nextSibling) {
									a = this.getOwnerTree().selModel.select(
											this.nextSibling, this.selectNext);
									return false
								}
							});
					return a
				}
			}
		}
		return null
	},
	onKeyDown : function(c) {
		var b = this.selNode || this.lastSelNode;
		var d = this;
		if (!b) {
			return
		}
		var a = c.getKey();
		switch (a) {
			case c.DOWN :
				c.stopEvent();
				this.selectNext();
				break;
			case c.UP :
				c.stopEvent();
				this.selectPrevious();
				break;
			case c.RIGHT :
				c.preventDefault();
				if (b.hasChildNodes()) {
					if (!b.isExpanded()) {
						b.expand()
					} else {
						if (b.firstChild) {
							this.select(b.firstChild, c)
						}
					}
				}
				break;
			case c.LEFT :
				c.preventDefault();
				if (b.hasChildNodes() && b.isExpanded()) {
					b.collapse()
				} else {
					if (b.parentNode
							&& (this.tree.rootVisible || b.parentNode != this.tree
									.getRootNode())) {
						this.select(b.parentNode, c)
					}
				}
				break
		}
	}
});
Ext.tree.MultiSelectionModel = function(a) {
	this.selNodes = [];
	this.selMap = {};
	this.addEvents("selectionchange");
	Ext.apply(this, a);
	Ext.tree.MultiSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.MultiSelectionModel, Ext.util.Observable, {
			init : function(a) {
				this.tree = a;
				a.mon(a.getTreeEl(), "keydown", this.onKeyDown, this);
				a.on("click", this.onNodeClick, this)
			},
			onNodeClick : function(a, b) {
				if (b.ctrlKey && this.isSelected(a)) {
					this.unselect(a)
				} else {
					this.select(a, b, b.ctrlKey)
				}
			},
			select : function(a, c, b) {
				if (b !== true) {
					this.clearSelections(true)
				}
				if (this.isSelected(a)) {
					this.lastSelNode = a;
					return a
				}
				this.selNodes.push(a);
				this.selMap[a.id] = a;
				this.lastSelNode = a;
				a.ui.onSelectedChange(true);
				this.fireEvent("selectionchange", this, this.selNodes);
				return a
			},
			unselect : function(b) {
				if (this.selMap[b.id]) {
					b.ui.onSelectedChange(false);
					var c = this.selNodes;
					var a = c.indexOf(b);
					if (a != -1) {
						this.selNodes.splice(a, 1)
					}
					delete this.selMap[b.id];
					this.fireEvent("selectionchange", this, this.selNodes)
				}
			},
			clearSelections : function(b) {
				var d = this.selNodes;
				if (d.length > 0) {
					for (var c = 0, a = d.length; c < a; c++) {
						d[c].ui.onSelectedChange(false)
					}
					this.selNodes = [];
					this.selMap = {};
					if (b !== true) {
						this.fireEvent("selectionchange", this, this.selNodes)
					}
				}
			},
			isSelected : function(a) {
				return this.selMap[a.id] ? true : false
			},
			getSelectedNodes : function() {
				return this.selNodes
			},
			onKeyDown : Ext.tree.DefaultSelectionModel.prototype.onKeyDown,
			selectNext : Ext.tree.DefaultSelectionModel.prototype.selectNext,
			selectPrevious : Ext.tree.DefaultSelectionModel.prototype.selectPrevious
		});
Ext.data.Tree = function(a) {
	this.nodeHash = {};
	this.root = null;
	if (a) {
		this.setRootNode(a)
	}
	this.addEvents("append", "remove", "move", "insert", "beforeappend",
			"beforeremove", "beforemove", "beforeinsert");
	Ext.data.Tree.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Tree, Ext.util.Observable, {
			pathSeparator : "/",
			proxyNodeEvent : function() {
				return this.fireEvent.apply(this, arguments)
			},
			getRootNode : function() {
				return this.root
			},
			setRootNode : function(a) {
				this.root = a;
				a.ownerTree = this;
				a.isRoot = true;
				this.registerNode(a);
				return a
			},
			getNodeById : function(a) {
				return this.nodeHash[a]
			},
			registerNode : function(a) {
				this.nodeHash[a.id] = a
			},
			unregisterNode : function(a) {
				delete this.nodeHash[a.id]
			},
			toString : function() {
				return "[Tree" + (this.id ? " " + this.id : "") + "]"
			}
		});
Ext.data.Node = function(a) {
	this.attributes = a || {};
	this.leaf = this.attributes.leaf;
	this.id = this.attributes.id;
	if (!this.id) {
		this.id = Ext.id(null, "xnode-");
		this.attributes.id = this.id
	}
	this.childNodes = [];
	if (!this.childNodes.indexOf) {
		this.childNodes.indexOf = function(d) {
			for (var c = 0, b = this.length; c < b; c++) {
				if (this[c] == d) {
					return c
				}
			}
			return -1
		}
	}
	this.parentNode = null;
	this.firstChild = null;
	this.lastChild = null;
	this.previousSibling = null;
	this.nextSibling = null;
	this.addEvents({
				append : true,
				remove : true,
				move : true,
				insert : true,
				beforeappend : true,
				beforeremove : true,
				beforemove : true,
				beforeinsert : true
			});
	this.listeners = this.attributes.listeners;
	Ext.data.Node.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Node, Ext.util.Observable, {
	fireEvent : function(b) {
		if (Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false) {
			return false
		}
		var a = this.getOwnerTree();
		if (a) {
			if (a.proxyNodeEvent.apply(a, arguments) === false) {
				return false
			}
		}
		return true
	},
	isLeaf : function() {
		return this.leaf === true
	},
	setFirstChild : function(a) {
		this.firstChild = a
	},
	setLastChild : function(a) {
		this.lastChild = a
	},
	isLast : function() {
		return (!this.parentNode ? true : this.parentNode.lastChild == this)
	},
	isFirst : function() {
		return (!this.parentNode ? true : this.parentNode.firstChild == this)
	},
	hasChildNodes : function() {
		return !this.isLeaf() && this.childNodes.length > 0
	},
	isExpandable : function() {
		return this.attributes.expandable || this.hasChildNodes()
	},
	appendChild : function(e) {
		var f = false;
		if (Ext.isArray(e)) {
			f = e
		} else {
			if (arguments.length > 1) {
				f = arguments
			}
		}
		if (f) {
			for (var d = 0, a = f.length; d < a; d++) {
				this.appendChild(f[d])
			}
		} else {
			if (this.fireEvent("beforeappend", this.ownerTree, this, e) === false) {
				return false
			}
			var b = this.childNodes.length;
			var c = e.parentNode;
			if (c) {
				if (e.fireEvent("beforemove", e.getOwnerTree(), e, c, this, b) === false) {
					return false
				}
				c.removeChild(e)
			}
			b = this.childNodes.length;
			if (b === 0) {
				this.setFirstChild(e)
			}
			this.childNodes.push(e);
			e.parentNode = this;
			var g = this.childNodes[b - 1];
			if (g) {
				e.previousSibling = g;
				g.nextSibling = e
			} else {
				e.previousSibling = null
			}
			e.nextSibling = null;
			this.setLastChild(e);
			e.setOwnerTree(this.getOwnerTree());
			this.fireEvent("append", this.ownerTree, this, e, b);
			if (c) {
				e.fireEvent("move", this.ownerTree, e, c, this, b)
			}
			return e
		}
	},
	removeChild : function(c, b) {
		var a = this.childNodes.indexOf(c);
		if (a == -1) {
			return false
		}
		if (this.fireEvent("beforeremove", this.ownerTree, this, c) === false) {
			return false
		}
		this.childNodes.splice(a, 1);
		if (c.previousSibling) {
			c.previousSibling.nextSibling = c.nextSibling
		}
		if (c.nextSibling) {
			c.nextSibling.previousSibling = c.previousSibling
		}
		if (this.firstChild == c) {
			this.setFirstChild(c.nextSibling)
		}
		if (this.lastChild == c) {
			this.setLastChild(c.previousSibling)
		}
		c.clear();
		this.fireEvent("remove", this.ownerTree, this, c);
		if (b) {
			c.destroy()
		}
		return c
	},
	clear : function(a) {
		this.setOwnerTree(null, a);
		this.parentNode = this.previousSibling = this.nextSibling = null;
		if (a) {
			this.firstChild = this.lastChild = null
		}
	},
	destroy : function() {
		this.purgeListeners();
		this.clear(true);
		Ext.each(this.childNodes, function(a) {
					a.destroy()
				});
		this.childNodes = null
	},
	insertBefore : function(d, a) {
		if (!a) {
			return this.appendChild(d)
		}
		if (d == a) {
			return false
		}
		if (this.fireEvent("beforeinsert", this.ownerTree, this, d, a) === false) {
			return false
		}
		var b = this.childNodes.indexOf(a);
		var c = d.parentNode;
		var e = b;
		if (c == this && this.childNodes.indexOf(d) < b) {
			e--
		}
		if (c) {
			if (d.fireEvent("beforemove", d.getOwnerTree(), d, c, this, b, a) === false) {
				return false
			}
			c.removeChild(d)
		}
		if (e === 0) {
			this.setFirstChild(d)
		}
		this.childNodes.splice(e, 0, d);
		d.parentNode = this;
		var f = this.childNodes[e - 1];
		if (f) {
			d.previousSibling = f;
			f.nextSibling = d
		} else {
			d.previousSibling = null
		}
		d.nextSibling = a;
		a.previousSibling = d;
		d.setOwnerTree(this.getOwnerTree());
		this.fireEvent("insert", this.ownerTree, this, d, a);
		if (c) {
			d.fireEvent("move", this.ownerTree, d, c, this, e, a)
		}
		return d
	},
	remove : function(a) {
		this.parentNode.removeChild(this, a);
		return this
	},
	item : function(a) {
		return this.childNodes[a]
	},
	replaceChild : function(a, c) {
		var b = c ? c.nextSibling : null;
		this.removeChild(c);
		this.insertBefore(a, b);
		return c
	},
	indexOf : function(a) {
		return this.childNodes.indexOf(a)
	},
	getOwnerTree : function() {
		if (!this.ownerTree) {
			var a = this;
			while (a) {
				if (a.ownerTree) {
					this.ownerTree = a.ownerTree;
					break
				}
				a = a.parentNode
			}
		}
		return this.ownerTree
	},
	getDepth : function() {
		var b = 0;
		var a = this;
		while (a.parentNode) {
			++b;
			a = a.parentNode
		}
		return b
	},
	setOwnerTree : function(a, b) {
		if (a != this.ownerTree) {
			if (this.ownerTree) {
				this.ownerTree.unregisterNode(this)
			}
			this.ownerTree = a;
			if (b !== true) {
				Ext.each(this.childNodes, function(c) {
							c.setOwnerTree(a)
						})
			}
			if (a) {
				a.registerNode(this)
			}
		}
	},
	setId : function(b) {
		if (b !== this.id) {
			var a = this.ownerTree;
			if (a) {
				a.unregisterNode(this)
			}
			this.id = this.attributes.id = b;
			if (a) {
				a.registerNode(this)
			}
			this.onIdChange(b)
		}
	},
	onIdChange : Ext.emptyFn,
	getPath : function(c) {
		c = c || "id";
		var e = this.parentNode;
		var a = [this.attributes[c]];
		while (e) {
			a.unshift(e.attributes[c]);
			e = e.parentNode
		}
		var d = this.getOwnerTree().pathSeparator;
		return d + a.join(d)
	},
	bubble : function(c, b, a) {
		var d = this;
		while (d) {
			if (c.apply(b || d, a || [d]) === false) {
				break
			}
			d = d.parentNode
		}
	},
	cascade : function(f, e, b) {
		if (f.apply(e || this, b || [this]) !== false) {
			var d = this.childNodes;
			for (var c = 0, a = d.length; c < a; c++) {
				d[c].cascade(f, e, b)
			}
		}
	},
	eachChild : function(f, e, b) {
		var d = this.childNodes;
		for (var c = 0, a = d.length; c < a; c++) {
			if (f.apply(e || this, b || [d[c]]) === false) {
				break
			}
		}
	},
	findChild : function(d, e) {
		var c = this.childNodes;
		for (var b = 0, a = c.length; b < a; b++) {
			if (c[b].attributes[d] == e) {
				return c[b]
			}
		}
		return null
	},
	findChildBy : function(e, d) {
		var c = this.childNodes;
		for (var b = 0, a = c.length; b < a; b++) {
			if (e.call(d || c[b], c[b]) === true) {
				return c[b]
			}
		}
		return null
	},
	sort : function(e, d) {
		var c = this.childNodes;
		var a = c.length;
		if (a > 0) {
			var f = d ? function() {
				e.apply(d, arguments)
			} : e;
			c.sort(f);
			for (var b = 0; b < a; b++) {
				var g = c[b];
				g.previousSibling = c[b - 1];
				g.nextSibling = c[b + 1];
				if (b === 0) {
					this.setFirstChild(g)
				}
				if (b == a - 1) {
					this.setLastChild(g)
				}
			}
		}
	},
	contains : function(a) {
		return a.isAncestor(this)
	},
	isAncestor : function(a) {
		var b = this.parentNode;
		while (b) {
			if (b == a) {
				return true
			}
			b = b.parentNode
		}
		return false
	},
	toString : function() {
		return "[Node" + (this.id ? " " + this.id : "") + "]"
	}
});
Ext.tree.TreeNode = function(a) {
	a = a || {};
	if (Ext.isString(a)) {
		a = {
			text : a
		}
	}
	this.childrenRendered = false;
	this.rendered = false;
	Ext.tree.TreeNode.superclass.constructor.call(this, a);
	this.expanded = a.expanded === true;
	this.isTarget = a.isTarget !== false;
	this.draggable = a.draggable !== false && a.allowDrag !== false;
	this.allowChildren = a.allowChildren !== false && a.allowDrop !== false;
	this.text = a.text;
	this.disabled = a.disabled === true;
	this.hidden = a.hidden === true;
	this.addEvents("textchange", "beforeexpand", "beforecollapse", "expand",
			"disabledchange", "collapse", "beforeclick", "click",
			"checkchange", "beforedblclick", "dblclick", "contextmenu",
			"beforechildrenrendered");
	var b = this.attributes.uiProvider || this.defaultUI || Ext.tree.TreeNodeUI;
	this.ui = new b(this)
};
Ext.extend(Ext.tree.TreeNode, Ext.data.Node, {
			preventHScroll : true,
			isExpanded : function() {
				return this.expanded
			},
			getUI : function() {
				return this.ui
			},
			getLoader : function() {
				var a;
				return this.loader
						|| ((a = this.getOwnerTree()) && a.loader
								? a.loader
								: (this.loader = new Ext.tree.TreeLoader()))
			},
			setFirstChild : function(a) {
				var b = this.firstChild;
				Ext.tree.TreeNode.superclass.setFirstChild.call(this, a);
				if (this.childrenRendered && b && a != b) {
					b.renderIndent(true, true)
				}
				if (this.rendered) {
					this.renderIndent(true, true)
				}
			},
			setLastChild : function(b) {
				var a = this.lastChild;
				Ext.tree.TreeNode.superclass.setLastChild.call(this, b);
				if (this.childrenRendered && a && b != a) {
					a.renderIndent(true, true)
				}
				if (this.rendered) {
					this.renderIndent(true, true)
				}
			},
			appendChild : function(b) {
				if (!b.render && !Ext.isArray(b)) {
					b = this.getLoader().createNode(b)
				}
				var a = Ext.tree.TreeNode.superclass.appendChild.call(this, b);
				if (a && this.childrenRendered) {
					a.render()
				}
				this.ui.updateExpandIcon();
				return a
			},
			removeChild : function(b, a) {
				this.ownerTree.getSelectionModel().unselect(b);
				Ext.tree.TreeNode.superclass.removeChild.apply(this, arguments);
				if (b.ui.rendered) {
					b.ui.remove()
				}
				if (this.childNodes.length < 1) {
					this.collapse(false, false)
				} else {
					this.ui.updateExpandIcon()
				}
				if (!this.firstChild && !this.isHiddenRoot()) {
					this.childrenRendered = false
				}
				return b
			},
			insertBefore : function(c, a) {
				if (!c.render) {
					c = this.getLoader().createNode(c)
				}
				var b = Ext.tree.TreeNode.superclass.insertBefore.call(this, c,
						a);
				if (b && a && this.childrenRendered) {
					c.render()
				}
				this.ui.updateExpandIcon();
				return b
			},
			setText : function(b) {
				var a = this.text;
				this.text = this.attributes.text = b;
				if (this.rendered) {
					this.ui.onTextChange(this, b, a)
				}
				this.fireEvent("textchange", this, b, a)
			},
			select : function() {
				var a = this.getOwnerTree();
				if (a) {
					a.getSelectionModel().select(this)
				}
			},
			unselect : function(a) {
				var b = this.getOwnerTree();
				if (b) {
					b.getSelectionModel().unselect(this, a)
				}
			},
			isSelected : function() {
				var a = this.getOwnerTree();
				return a ? a.getSelectionModel().isSelected(this) : false
			},
			expand : function(a, c, d, b) {
				if (!this.expanded) {
					if (this.fireEvent("beforeexpand", this, a, c) === false) {
						return
					}
					if (!this.childrenRendered) {
						this.renderChildren()
					}
					this.expanded = true;
					if (!this.isHiddenRoot()
							&& (this.getOwnerTree().animate && c !== false)
							|| c) {
						this.ui.animExpand(function() {
									this.fireEvent("expand", this);
									this.runCallback(d, b || this, [this]);
									if (a === true) {
										this.expandChildNodes(true)
									}
								}.createDelegate(this));
						return
					} else {
						this.ui.expand();
						this.fireEvent("expand", this);
						this.runCallback(d, b || this, [this])
					}
				} else {
					this.runCallback(d, b || this, [this])
				}
				if (a === true) {
					this.expandChildNodes(true)
				}
			},
			runCallback : function(a, c, b) {
				if (Ext.isFunction(a)) {
					a.apply(c, b)
				}
			},
			isHiddenRoot : function() {
				return this.isRoot && !this.getOwnerTree().rootVisible
			},
			collapse : function(b, f, g, e) {
				if (this.expanded && !this.isHiddenRoot()) {
					if (this.fireEvent("beforecollapse", this, b, f) === false) {
						return
					}
					this.expanded = false;
					if ((this.getOwnerTree().animate && f !== false) || f) {
						this.ui.animCollapse(function() {
									this.fireEvent("collapse", this);
									this.runCallback(g, e || this, [this]);
									if (b === true) {
										this.collapseChildNodes(true)
									}
								}.createDelegate(this));
						return
					} else {
						this.ui.collapse();
						this.fireEvent("collapse", this);
						this.runCallback(g, e || this, [this])
					}
				} else {
					if (!this.expanded) {
						this.runCallback(g, e || this, [this])
					}
				}
				if (b === true) {
					var d = this.childNodes;
					for (var c = 0, a = d.length; c < a; c++) {
						d[c].collapse(true, false)
					}
				}
			},
			delayedExpand : function(a) {
				if (!this.expandProcId) {
					this.expandProcId = this.expand.defer(a, this)
				}
			},
			cancelExpand : function() {
				if (this.expandProcId) {
					clearTimeout(this.expandProcId)
				}
				this.expandProcId = false
			},
			toggle : function() {
				if (this.expanded) {
					this.collapse()
				} else {
					this.expand()
				}
			},
			ensureVisible : function(c, b) {
				var a = this.getOwnerTree();
				a.expandPath(this.parentNode ? this.parentNode.getPath() : this
								.getPath(), false, function() {
							var d = a.getNodeById(this.id);
							a.getTreeEl().scrollChildIntoView(d.ui.anchor);
							this.runCallback(c, b || this, [this])
						}.createDelegate(this))
			},
			expandChildNodes : function(b) {
				var d = this.childNodes;
				for (var c = 0, a = d.length; c < a; c++) {
					d[c].expand(b)
				}
			},
			collapseChildNodes : function(b) {
				var d = this.childNodes;
				for (var c = 0, a = d.length; c < a; c++) {
					d[c].collapse(b)
				}
			},
			disable : function() {
				this.disabled = true;
				this.unselect();
				if (this.rendered && this.ui.onDisableChange) {
					this.ui.onDisableChange(this, true)
				}
				this.fireEvent("disabledchange", this, true)
			},
			enable : function() {
				this.disabled = false;
				if (this.rendered && this.ui.onDisableChange) {
					this.ui.onDisableChange(this, false)
				}
				this.fireEvent("disabledchange", this, false)
			},
			renderChildren : function(b) {
				if (b !== false) {
					this.fireEvent("beforechildrenrendered", this)
				}
				var d = this.childNodes;
				for (var c = 0, a = d.length; c < a; c++) {
					d[c].render(true)
				}
				this.childrenRendered = true
			},
			sort : function(e, d) {
				Ext.tree.TreeNode.superclass.sort.apply(this, arguments);
				if (this.childrenRendered) {
					var c = this.childNodes;
					for (var b = 0, a = c.length; b < a; b++) {
						c[b].render(true)
					}
				}
			},
			render : function(a) {
				this.ui.render(a);
				if (!this.rendered) {
					this.getOwnerTree().registerNode(this);
					this.rendered = true;
					if (this.expanded) {
						this.expanded = false;
						this.expand(false, false)
					}
				}
			},
			renderIndent : function(b, e) {
				if (e) {
					this.ui.childIndent = null
				}
				this.ui.renderIndent();
				if (b === true && this.childrenRendered) {
					var d = this.childNodes;
					for (var c = 0, a = d.length; c < a; c++) {
						d[c].renderIndent(true, e)
					}
				}
			},
			beginUpdate : function() {
				this.childrenRendered = false
			},
			endUpdate : function() {
				if (this.expanded && this.rendered) {
					this.renderChildren()
				}
			},
			destroy : function() {
				this.unselect(true);
				Ext.tree.TreeNode.superclass.destroy.call(this);
				Ext.destroy(this.ui, this.loader);
				this.ui = this.loader = null
			},
			onIdChange : function(a) {
				this.ui.onIdChange(a)
			}
		});
Ext.tree.TreePanel.nodeTypes.node = Ext.tree.TreeNode;
Ext.tree.AsyncTreeNode = function(a) {
	this.loaded = a && a.loaded === true;
	this.loading = false;
	Ext.tree.AsyncTreeNode.superclass.constructor.apply(this, arguments);
	this.addEvents("beforeload", "load")
};
Ext.extend(Ext.tree.AsyncTreeNode, Ext.tree.TreeNode, {
			expand : function(b, e, h, c) {
				if (this.loading) {
					var g;
					var d = function() {
						if (!this.loading) {
							clearInterval(g);
							this.expand(b, e, h, c)
						}
					}.createDelegate(this);
					g = setInterval(d, 200);
					return
				}
				if (!this.loaded) {
					if (this.fireEvent("beforeload", this) === false) {
						return
					}
					this.loading = true;
					this.ui.beforeLoad(this);
					var a = this.loader || this.attributes.loader
							|| this.getOwnerTree().getLoader();
					if (a) {
						a.load(this, this.loadComplete.createDelegate(this, [b,
												e, h, c]), this);
						return
					}
				}
				Ext.tree.AsyncTreeNode.superclass.expand.call(this, b, e, h, c)
			},
			isLoading : function() {
				return this.loading
			},
			loadComplete : function(a, c, d, b) {
				this.loading = false;
				this.loaded = true;
				this.ui.afterLoad(this);
				this.fireEvent("load", this);
				this.expand(a, c, d, b)
			},
			isLoaded : function() {
				return this.loaded
			},
			hasChildNodes : function() {
				if (!this.isLeaf() && !this.loaded) {
					return true
				} else {
					return Ext.tree.AsyncTreeNode.superclass.hasChildNodes
							.call(this)
				}
			},
			reload : function(b, a) {
				this.collapse(false, false);
				while (this.firstChild) {
					this.removeChild(this.firstChild).destroy()
				}
				this.childrenRendered = false;
				this.loaded = false;
				if (this.isHiddenRoot()) {
					this.expanded = false
				}
				this.expand(false, false, b, a)
			}
		});
Ext.tree.TreePanel.nodeTypes.async = Ext.tree.AsyncTreeNode;
Ext.tree.TreeNodeUI = function(a) {
	this.node = a;
	this.rendered = false;
	this.animating = false;
	this.wasLeaf = true;
	this.ecc = "x-tree-ec-icon x-tree-elbow";
	this.emptyIcon = Ext.BLANK_IMAGE_URL
};
Ext.tree.TreeNodeUI.prototype = {
	removeChild : function(a) {
		if (this.rendered) {
			this.ctNode.removeChild(a.ui.getEl())
		}
	},
	beforeLoad : function() {
		this.addClass("x-tree-node-loading")
	},
	afterLoad : function() {
		this.removeClass("x-tree-node-loading")
	},
	onTextChange : function(b, c, a) {
		if (this.rendered) {
			this.textNode.innerHTML = c
		}
	},
	onDisableChange : function(a, b) {
		this.disabled = b;
		if (this.checkbox) {
			this.checkbox.disabled = b
		}
		if (b) {
			this.addClass("x-tree-node-disabled")
		} else {
			this.removeClass("x-tree-node-disabled")
		}
	},
	onSelectedChange : function(a) {
		if (a) {
			this.focus();
			this.addClass("x-tree-selected")
		} else {
			this.removeClass("x-tree-selected")
		}
	},
	onMove : function(a, g, e, f, d, b) {
		this.childIndent = null;
		if (this.rendered) {
			var h = f.ui.getContainer();
			if (!h) {
				this.holder = document.createElement("div");
				this.holder.appendChild(this.wrap);
				return
			}
			var c = b ? b.ui.getEl() : null;
			if (c) {
				h.insertBefore(this.wrap, c)
			} else {
				h.appendChild(this.wrap)
			}
			this.node.renderIndent(true, e != f)
		}
	},
	addClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).addClass(a)
		}
	},
	removeClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).removeClass(a)
		}
	},
	remove : function() {
		if (this.rendered) {
			this.holder = document.createElement("div");
			this.holder.appendChild(this.wrap)
		}
	},
	fireEvent : function() {
		return this.node.fireEvent.apply(this.node, arguments)
	},
	initEvents : function() {
		this.node.on("move", this.onMove, this);
		if (this.node.disabled) {
			this.onDisableChange(this.node, true)
		}
		if (this.node.hidden) {
			this.hide()
		}
		var b = this.node.getOwnerTree();
		var a = b.enableDD || b.enableDrag || b.enableDrop;
		if (a && (!this.node.isRoot || b.rootVisible)) {
			Ext.dd.Registry.register(this.elNode, {
						node : this.node,
						handles : this.getDDHandles(),
						isHandle : false
					})
		}
	},
	getDDHandles : function() {
		return [this.iconNode, this.textNode, this.elNode]
	},
	hide : function() {
		this.node.hidden = true;
		if (this.wrap) {
			this.wrap.style.display = "none"
		}
	},
	show : function() {
		this.node.hidden = false;
		if (this.wrap) {
			this.wrap.style.display = ""
		}
	},
	onContextMenu : function(a) {
		if (this.node.hasListener("contextmenu")
				|| this.node.getOwnerTree().hasListener("contextmenu")) {
			a.preventDefault();
			this.focus();
			this.fireEvent("contextmenu", this.node, a)
		}
	},
	onClick : function(c) {
		if (this.dropping) {
			c.stopEvent();
			return
		}
		if (this.fireEvent("beforeclick", this.node, c) !== false) {
			var b = c.getTarget("a");
			if (!this.disabled && this.node.attributes.href && b) {
				this.fireEvent("click", this.node, c);
				return
			} else {
				if (b && c.ctrlKey) {
					c.stopEvent()
				}
			}
			c.preventDefault();
			if (this.disabled) {
				return
			}
			if (this.node.attributes.singleClickExpand && !this.animating
					&& this.node.isExpandable()) {
				this.node.toggle()
			}
			this.fireEvent("click", this.node, c)
		} else {
			c.stopEvent()
		}
	},
	onDblClick : function(a) {
		a.preventDefault();
		if (this.disabled) {
			return
		}
		if (this.fireEvent("beforedblclick", this.node, a) !== false) {
			if (this.checkbox) {
				this.toggleCheck()
			}
			if (!this.animating && this.node.isExpandable()) {
				this.node.toggle()
			}
			this.fireEvent("dblclick", this.node, a)
		}
	},
	onOver : function(a) {
		this.addClass("x-tree-node-over")
	},
	onOut : function(a) {
		this.removeClass("x-tree-node-over")
	},
	onCheckChange : function() {
		var a = this.checkbox.checked;
		this.checkbox.defaultChecked = a;
		this.node.attributes.checked = a;
		this.fireEvent("checkchange", this.node, a)
	},
	ecClick : function(a) {
		if (!this.animating && this.node.isExpandable()) {
			this.node.toggle()
		}
	},
	startDrop : function() {
		this.dropping = true
	},
	endDrop : function() {
		setTimeout(function() {
					this.dropping = false
				}.createDelegate(this), 50)
	},
	expand : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = ""
	},
	focus : function() {
		if (!this.node.preventHScroll) {
			try {
				this.anchor.focus()
			} catch (c) {
			}
		} else {
			try {
				var b = this.node.getOwnerTree().getTreeEl().dom;
				var a = b.scrollLeft;
				this.anchor.focus();
				b.scrollLeft = a
			} catch (c) {
			}
		}
	},
	toggleCheck : function(b) {
		var a = this.checkbox;
		if (a) {
			a.checked = (b === undefined ? !a.checked : b);
			this.onCheckChange()
		}
	},
	blur : function() {
		try {
			this.anchor.blur()
		} catch (a) {
		}
	},
	animExpand : function(b) {
		var a = Ext.get(this.ctNode);
		a.stopFx();
		if (!this.node.isExpandable()) {
			this.updateExpandIcon();
			this.ctNode.style.display = "";
			Ext.callback(b);
			return
		}
		this.animating = true;
		this.updateExpandIcon();
		a.slideIn("t", {
					callback : function() {
						this.animating = false;
						Ext.callback(b)
					},
					scope : this,
					duration : this.node.ownerTree.duration || 0.25
				})
	},
	highlight : function() {
		var a = this.node.getOwnerTree();
		Ext.fly(this.wrap).highlight(a.hlColor || "C3DAF9", {
					endColor : a.hlBaseColor
				})
	},
	collapse : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = "none"
	},
	animCollapse : function(b) {
		var a = Ext.get(this.ctNode);
		a.enableDisplayMode("block");
		a.stopFx();
		this.animating = true;
		this.updateExpandIcon();
		a.slideOut("t", {
					callback : function() {
						this.animating = false;
						Ext.callback(b)
					},
					scope : this,
					duration : this.node.ownerTree.duration || 0.25
				})
	},
	getContainer : function() {
		return this.ctNode
	},
	getEl : function() {
		return this.wrap
	},
	appendDDGhost : function(a) {
		a.appendChild(this.elNode.cloneNode(true))
	},
	getDDRepairXY : function() {
		return Ext.lib.Dom.getXY(this.iconNode)
	},
	onRender : function() {
		this.render()
	},
	render : function(c) {
		var e = this.node, b = e.attributes;
		var d = e.parentNode
				? e.parentNode.ui.getContainer()
				: e.ownerTree.innerCt.dom;
		if (!this.rendered) {
			this.rendered = true;
			this.renderElements(e, b, d, c);
			if (b.qtip) {
				if (this.textNode.setAttributeNS) {
					this.textNode.setAttributeNS("ext", "qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttributeNS("ext", "qtitle",
								b.qtipTitle)
					}
				} else {
					this.textNode.setAttribute("ext:qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttribute("ext:qtitle", b.qtipTitle)
					}
				}
			} else {
				if (b.qtipCfg) {
					b.qtipCfg.target = Ext.id(this.textNode);
					Ext.QuickTips.register(b.qtipCfg)
				}
			}
			this.initEvents();
			if (!this.node.expanded) {
				this.updateExpandIcon(true)
			}
		} else {
			if (c === true) {
				d.appendChild(this.wrap)
			}
		}
	},
	renderElements : function(e, j, i, k) {
		this.indentMarkup = e.parentNode
				? e.parentNode.ui.getChildIndent()
				: "";
		var f = Ext.isBoolean(j.checked), b, c = j.href ? j.href : Ext.isGecko
				? ""
				: "#", d = [
				'<li class="x-tree-node"><div ext:tree-node-id="',
				e.id,
				'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',
				j.cls,
				'" unselectable="on">',
				'<span class="x-tree-node-indent">',
				this.indentMarkup,
				"</span>",
				'<img src="',
				this.emptyIcon,
				'" class="x-tree-ec-icon x-tree-elbow" />',
				'<img src="',
				j.icon || this.emptyIcon,
				'" class="x-tree-node-icon',
				(j.icon ? " x-tree-node-inline-icon" : ""),
				(j.iconCls ? " " + j.iconCls : ""),
				'" unselectable="on" />',
				f
						? ('<input class="x-tree-node-cb" type="checkbox" ' + (j.checked
								? 'checked="checked" />'
								: "/>"))
						: "",
				'<a hidefocus="on" class="x-tree-node-anchor" href="', c,
				'" tabIndex="1" ',
				j.hrefTarget ? ' target="' + j.hrefTarget + '"' : "",
				'><span unselectable="on">', e.text, "</span></a></div>",
				'<ul class="x-tree-node-ct" style="display:none;"></ul>',
				"</li>"].join("");
		if (k !== true && e.nextSibling && (b = e.nextSibling.ui.getEl())) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin", b, d)
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", i, d)
		}
		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var h = this.elNode.childNodes;
		this.indentNode = h[0];
		this.ecNode = h[1];
		this.iconNode = h[2];
		var g = 3;
		if (f) {
			this.checkbox = h[3];
			this.checkbox.defaultChecked = this.checkbox.checked;
			g++
		}
		this.anchor = h[g];
		this.textNode = h[g].firstChild
	},
	getAnchor : function() {
		return this.anchor
	},
	getTextEl : function() {
		return this.textNode
	},
	getIconEl : function() {
		return this.iconNode
	},
	isChecked : function() {
		return this.checkbox ? this.checkbox.checked : false
	},
	updateExpandIcon : function() {
		if (this.rendered) {
			var f = this.node, d, c, a = f.isLast()
					? "x-tree-elbow-end"
					: "x-tree-elbow", e = f.hasChildNodes();
			if (e || f.attributes.expandable) {
				if (f.expanded) {
					a += "-minus";
					d = "x-tree-node-collapsed";
					c = "x-tree-node-expanded"
				} else {
					a += "-plus";
					d = "x-tree-node-expanded";
					c = "x-tree-node-collapsed"
				}
				if (this.wasLeaf) {
					this.removeClass("x-tree-node-leaf");
					this.wasLeaf = false
				}
				if (this.c1 != d || this.c2 != c) {
					Ext.fly(this.elNode).replaceClass(d, c);
					this.c1 = d;
					this.c2 = c
				}
			} else {
				if (!this.wasLeaf) {
					Ext.fly(this.elNode).replaceClass("x-tree-node-expanded",
							"x-tree-node-leaf");
					delete this.c1;
					delete this.c2;
					this.wasLeaf = true
				}
			}
			var b = "x-tree-ec-icon " + a;
			if (this.ecc != b) {
				this.ecNode.className = b;
				this.ecc = b
			}
		}
	},
	onIdChange : function(a) {
		if (this.rendered) {
			this.elNode.setAttribute("ext:tree-node-id", a)
		}
	},
	getChildIndent : function() {
		if (!this.childIndent) {
			var a = [], b = this.node;
			while (b) {
				if (!b.isRoot || (b.isRoot && b.ownerTree.rootVisible)) {
					if (!b.isLast()) {
						a.unshift('<img src="' + this.emptyIcon
								+ '" class="x-tree-elbow-line" />')
					} else {
						a.unshift('<img src="' + this.emptyIcon
								+ '" class="x-tree-icon" />')
					}
				}
				b = b.parentNode
			}
			this.childIndent = a.join("")
		}
		return this.childIndent
	},
	renderIndent : function() {
		if (this.rendered) {
			var a = "", b = this.node.parentNode;
			if (b) {
				a = b.ui.getChildIndent()
			}
			if (this.indentMarkup != a) {
				this.indentNode.innerHTML = a;
				this.indentMarkup = a
			}
			this.updateExpandIcon()
		}
	},
	destroy : function() {
		if (this.elNode) {
			Ext.dd.Registry.unregister(this.elNode.id)
		}
		Ext.each(["textnode", "anchor", "checkbox", "indentNode", "ecNode",
						"iconNode", "elNode", "ctNode", "wrap", "holder"],
				function(a) {
					if (this[a]) {
						Ext.fly(this[a]).remove();
						delete this[a]
					}
				}, this);
		delete this.node
	}
};
Ext.tree.RootTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
			render : function() {
				if (!this.rendered) {
					var a = this.node.ownerTree.innerCt.dom;
					this.node.expanded = true;
					a.innerHTML = '<div class="x-tree-root-node"></div>';
					this.wrap = this.ctNode = a.firstChild
				}
			},
			collapse : Ext.emptyFn,
			expand : Ext.emptyFn
		});
Ext.tree.TreeLoader = function(a) {
	this.baseParams = {};
	Ext.apply(this, a);
	this.addEvents("beforeload", "load", "loadexception");
	Ext.tree.TreeLoader.superclass.constructor.call(this);
	if (Ext.isString(this.paramOrder)) {
		this.paramOrder = this.paramOrder.split(/[\s,|]/)
	}
};
Ext.extend(Ext.tree.TreeLoader, Ext.util.Observable, {
			uiProviders : {},
			clearOnLoad : true,
			paramOrder : undefined,
			paramsAsHash : false,
			nodeParameter : "node",
			directFn : undefined,
			load : function(b, c, a) {
				if (this.clearOnLoad) {
					while (b.firstChild) {
						b.removeChild(b.firstChild)
					}
				}
				if (this.doPreload(b)) {
					this.runCallback(c, a || b, [b])
				} else {
					if (this.directFn || this.dataUrl || this.url) {
						this.requestData(b, c, a || b)
					}
				}
			},
			doPreload : function(d) {
				if (d.attributes.children) {
					if (d.childNodes.length < 1) {
						var c = d.attributes.children;
						d.beginUpdate();
						for (var b = 0, a = c.length; b < a; b++) {
							var e = d.appendChild(this.createNode(c[b]));
							if (this.preloadChildren) {
								this.doPreload(e)
							}
						}
						d.endUpdate()
					}
					return true
				}
				return false
			},
			getParams : function(e) {
				var b = [], d = this.baseParams;
				if (this.directFn) {
					b.push(e.id);
					if (d) {
						if (this.paramOrder) {
							for (var c = 0, a = this.paramOrder.length; c < a; c++) {
								b.push(d[this.paramOrder[c]])
							}
						} else {
							if (this.paramsAsHash) {
								b.push(d)
							}
						}
					}
					return b
				} else {
					var f = Ext.apply({}, d);
					f[this.nodeParameter] = e.id;
					return f
				}
			},
			requestData : function(c, d, b) {
				if (this.fireEvent("beforeload", this, c, d) !== false) {
					if (this.directFn) {
						var a = this.getParams(c);
						a.push(this.processDirectResponse.createDelegate(this,
								[{
											callback : d,
											node : c,
											scope : b
										}], true));
						this.directFn.apply(window, a)
					} else {
						this.transId = Ext.Ajax.request({
									method : this.requestMethod,
									url : this.dataUrl || this.url,
									success : this.handleResponse,
									failure : this.handleFailure,
									scope : this,
									argument : {
										callback : d,
										node : c,
										scope : b
									},
									params : this.getParams(c)
								})
					}
				} else {
					this.runCallback(d, b || c, [])
				}
			},
			processDirectResponse : function(a, b, c) {
				if (b.status) {
					this.handleResponse({
								responseData : Ext.isArray(a) ? a : null,
								responseText : a,
								argument : c
							})
				} else {
					this.handleFailure({
								argument : c
							})
				}
			},
			runCallback : function(a, c, b) {
				if (Ext.isFunction(a)) {
					a.apply(c, b)
				}
			},
			isLoading : function() {
				return !!this.transId
			},
			abort : function() {
				if (this.isLoading()) {
					Ext.Ajax.abort(this.transId)
				}
			},
			createNode : function(attr) {
				if (this.baseAttrs) {
					Ext.applyIf(attr, this.baseAttrs)
				}
				if (this.applyLoader !== false && !attr.loader) {
					attr.loader = this
				}
				if (Ext.isString(attr.uiProvider)) {
					attr.uiProvider = this.uiProviders[attr.uiProvider]
							|| eval(attr.uiProvider)
				}
				if (attr.nodeType) {
					return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr)
				} else {
					return attr.leaf
							? new Ext.tree.TreeNode(attr)
							: new Ext.tree.AsyncTreeNode(attr)
				}
			},
			processResponse : function(d, c, j, k) {
				var l = d.responseText;
				try {
					var a = d.responseData || Ext.decode(l);
					c.beginUpdate();
					for (var f = 0, g = a.length; f < g; f++) {
						var b = this.createNode(a[f]);
						if (b) {
							c.appendChild(b)
						}
					}
					c.endUpdate();
					this.runCallback(j, k || c, [c])
				} catch (h) {
					this.handleFailure(d)
				}
			},
			handleResponse : function(c) {
				this.transId = false;
				var b = c.argument;
				this.processResponse(c, b.node, b.callback, b.scope);
				this.fireEvent("load", this, b.node, c)
			},
			handleFailure : function(c) {
				this.transId = false;
				var b = c.argument;
				this.fireEvent("loadexception", this, b.node, c);
				this.runCallback(b.callback, b.scope || b.node, [b.node])
			},
			destroy : function() {
				this.purgeListeners()
			}
		});
Ext.tree.TreeFilter = function(a, b) {
	this.tree = a;
	this.filtered = {};
	Ext.apply(this, b)
};
Ext.tree.TreeFilter.prototype = {
	clearBlank : false,
	reverse : false,
	autoClear : false,
	remove : false,
	filter : function(d, a, b) {
		a = a || "text";
		var c;
		if (typeof d == "string") {
			var e = d.length;
			if (e == 0 && this.clearBlank) {
				this.clear();
				return
			}
			d = d.toLowerCase();
			c = function(f) {
				return f.attributes[a].substr(0, e).toLowerCase() == d
			}
		} else {
			if (d.exec) {
				c = function(f) {
					return d.test(f.attributes[a])
				}
			} else {
				throw "Illegal filter type, must be string or regex"
			}
		}
		this.filterBy(c, null, b)
	},
	filterBy : function(d, c, b) {
		b = b || this.tree.root;
		if (this.autoClear) {
			this.clear()
		}
		var a = this.filtered, i = this.reverse;
		var e = function(j) {
			if (j == b) {
				return true
			}
			if (a[j.id]) {
				return false
			}
			var f = d.call(c || j, j);
			if (!f || i) {
				a[j.id] = j;
				j.ui.hide();
				return false
			}
			return true
		};
		b.cascade(e);
		if (this.remove) {
			for (var h in a) {
				if (typeof h != "function") {
					var g = a[h];
					if (g && g.parentNode) {
						g.parentNode.removeChild(g)
					}
				}
			}
		}
	},
	clear : function() {
		var b = this.tree;
		var a = this.filtered;
		for (var d in a) {
			if (typeof d != "function") {
				var c = a[d];
				if (c) {
					c.ui.show()
				}
			}
		}
		this.filtered = {}
	}
};
Ext.tree.TreeSorter = function(b, c) {
	Ext.apply(this, c);
	b.on("beforechildrenrendered", this.doSort, this);
	b.on("append", this.updateSort, this);
	b.on("insert", this.updateSort, this);
	b.on("textchange", this.updateSortParent, this);
	var e = this.dir && this.dir.toLowerCase() == "desc";
	var f = this.property || "text";
	var g = this.sortType;
	var a = this.folderSort;
	var d = this.caseSensitive === true;
	var h = this.leafAttr || "leaf";
	this.sortFn = function(j, i) {
		if (a) {
			if (j.attributes[h] && !i.attributes[h]) {
				return 1
			}
			if (!j.attributes[h] && i.attributes[h]) {
				return -1
			}
		}
		var l = g ? g(j.attributes[f]) : (d ? j.attributes[f] : j.attributes[f]
				.toUpperCase());
		var k = g ? g(i.attributes[f]) : (d ? i.attributes[f] : i.attributes[f]
				.toUpperCase());
		if (l < k) {
			return e ? +1 : -1
		} else {
			if (l > k) {
				return e ? -1 : +1
			} else {
				return 0
			}
		}
	}
};
Ext.tree.TreeSorter.prototype = {
	doSort : function(a) {
		a.sort(this.sortFn)
	},
	compareNodes : function(b, a) {
		return (b.text.toUpperCase() > a.text.toUpperCase() ? 1 : -1)
	},
	updateSort : function(a, b) {
		if (b.childrenRendered) {
			this.doSort.defer(1, this, [b])
		}
	},
	updateSortParent : function(a) {
		var b = a.parentNode;
		if (b && b.childrenRendered) {
			this.doSort.defer(1, this, [b])
		}
	}
};
if (Ext.dd.DropZone) {
	Ext.tree.TreeDropZone = function(a, b) {
		this.allowParentInsert = b.allowParentInsert || false;
		this.allowContainerDrop = b.allowContainerDrop || false;
		this.appendOnly = b.appendOnly || false;
		Ext.tree.TreeDropZone.superclass.constructor.call(this, a.getTreeEl(),
				b);
		this.tree = a;
		this.dragOverData = {};
		this.lastInsertClass = "x-tree-no-status"
	};
	Ext.extend(Ext.tree.TreeDropZone, Ext.dd.DropZone, {
				ddGroup : "TreeDD",
				expandDelay : 1000,
				expandNode : function(a) {
					if (a.hasChildNodes() && !a.isExpanded()) {
						a.expand(false, null, this.triggerCacheRefresh
										.createDelegate(this))
					}
				},
				queueExpand : function(a) {
					this.expandProcId = this.expandNode.defer(this.expandDelay,
							this, [a])
				},
				cancelExpand : function() {
					if (this.expandProcId) {
						clearTimeout(this.expandProcId);
						this.expandProcId = false
					}
				},
				isValidDropPoint : function(a, j, h, d, c) {
					if (!a || !c) {
						return false
					}
					var f = a.node;
					var g = c.node;
					if (!(f && f.isTarget && j)) {
						return false
					}
					if (j == "append" && f.allowChildren === false) {
						return false
					}
					if ((j == "above" || j == "below")
							&& (f.parentNode && f.parentNode.allowChildren === false)) {
						return false
					}
					if (g && (f == g || g.contains(f))) {
						return false
					}
					var b = this.dragOverData;
					b.tree = this.tree;
					b.target = f;
					b.data = c;
					b.point = j;
					b.source = h;
					b.rawEvent = d;
					b.dropNode = g;
					b.cancel = false;
					var i = this.tree.fireEvent("nodedragover", b);
					return b.cancel === false && i !== false
				},
				getDropPoint : function(g, f, k) {
					var l = f.node;
					if (l.isRoot) {
						return l.allowChildren !== false ? "append" : false
					}
					var c = f.ddel;
					var m = Ext.lib.Dom.getY(c), i = m + c.offsetHeight;
					var h = Ext.lib.Event.getPageY(g);
					var j = l.allowChildren === false || l.isLeaf();
					if (this.appendOnly || l.parentNode.allowChildren === false) {
						return j ? false : "append"
					}
					var d = false;
					if (!this.allowParentInsert) {
						d = l.hasChildNodes() && l.isExpanded()
					}
					var a = (i - m) / (j ? 2 : 3);
					if (h >= m && h < (m + a)) {
						return "above"
					} else {
						if (!d && (j || h >= i - a && h <= i)) {
							return "below"
						} else {
							return "append"
						}
					}
				},
				onNodeEnter : function(d, a, c, b) {
					this.cancelExpand()
				},
				onContainerOver : function(a, c, b) {
					if (this.allowContainerDrop && this.isValidDropPoint({
								ddel : this.tree.getRootNode().ui.elNode,
								node : this.tree.getRootNode()
							}, "append", a, c, b)) {
						return this.dropAllowed
					}
					return this.dropNotAllowed
				},
				onNodeOver : function(b, h, g, f) {
					var j = this.getDropPoint(g, b, h);
					var c = b.node;
					if (!this.expandProcId && j == "append"
							&& c.hasChildNodes() && !b.node.isExpanded()) {
						this.queueExpand(c)
					} else {
						if (j != "append") {
							this.cancelExpand()
						}
					}
					var d = this.dropNotAllowed;
					if (this.isValidDropPoint(b, j, h, g, f)) {
						if (j) {
							var a = b.ddel;
							var i;
							if (j == "above") {
								d = b.node.isFirst()
										? "x-tree-drop-ok-above"
										: "x-tree-drop-ok-between";
								i = "x-tree-drag-insert-above"
							} else {
								if (j == "below") {
									d = b.node.isLast()
											? "x-tree-drop-ok-below"
											: "x-tree-drop-ok-between";
									i = "x-tree-drag-insert-below"
								} else {
									d = "x-tree-drop-ok-append";
									i = "x-tree-drag-append"
								}
							}
							if (this.lastInsertClass != i) {
								Ext.fly(a)
										.replaceClass(this.lastInsertClass, i);
								this.lastInsertClass = i
							}
						}
					}
					return d
				},
				onNodeOut : function(d, a, c, b) {
					this.cancelExpand();
					this.removeDropIndicators(d)
				},
				onNodeDrop : function(h, b, g, d) {
					var a = this.getDropPoint(g, h, b);
					var f = h.node;
					f.ui.startDrop();
					if (!this.isValidDropPoint(h, a, b, g, d)) {
						f.ui.endDrop();
						return false
					}
					var c = d.node
							|| (b.getTreeNode
									? b.getTreeNode(d, f, a, g)
									: null);
					return this.processDrop(f, d, a, b, g, c)
				},
				onContainerDrop : function(a, f, c) {
					if (this.allowContainerDrop && this.isValidDropPoint({
								ddel : this.tree.getRootNode().ui.elNode,
								node : this.tree.getRootNode()
							}, "append", a, f, c)) {
						var d = this.tree.getRootNode();
						d.ui.startDrop();
						var b = c.node
								|| (a.getTreeNode ? a.getTreeNode(c, d,
										"append", f) : null);
						return this.processDrop(d, c, "append", a, f, b)
					}
					return false
				},
				processDrop : function(i, g, b, a, h, d) {
					var f = {
						tree : this.tree,
						target : i,
						data : g,
						point : b,
						source : a,
						rawEvent : h,
						dropNode : d,
						cancel : !d,
						dropStatus : false
					};
					var c = this.tree.fireEvent("beforenodedrop", f);
					if (c === false || f.cancel === true || !f.dropNode) {
						i.ui.endDrop();
						return f.dropStatus
					}
					i = f.target;
					if (b == "append" && !i.isExpanded()) {
						i.expand(false, null, function() {
									this.completeDrop(f)
								}.createDelegate(this))
					} else {
						this.completeDrop(f)
					}
					return true
				},
				completeDrop : function(g) {
					var d = g.dropNode, e = g.point, c = g.target;
					if (!Ext.isArray(d)) {
						d = [d]
					}
					var f;
					for (var b = 0, a = d.length; b < a; b++) {
						f = d[b];
						if (e == "above") {
							c.parentNode.insertBefore(f, c)
						} else {
							if (e == "below") {
								c.parentNode.insertBefore(f, c.nextSibling)
							} else {
								c.appendChild(f)
							}
						}
					}
					f.ui.focus();
					if (Ext.enableFx && this.tree.hlDrop) {
						f.ui.highlight()
					}
					c.ui.endDrop();
					this.tree.fireEvent("nodedrop", g)
				},
				afterNodeMoved : function(a, c, f, d, b) {
					if (Ext.enableFx && this.tree.hlDrop) {
						b.ui.focus();
						b.ui.highlight()
					}
					this.tree.fireEvent("nodedrop", this.tree, d, c, a, f)
				},
				getTree : function() {
					return this.tree
				},
				removeDropIndicators : function(b) {
					if (b && b.ddel) {
						var a = b.ddel;
						Ext.fly(a).removeClass(["x-tree-drag-insert-above",
								"x-tree-drag-insert-below",
								"x-tree-drag-append"]);
						this.lastInsertClass = "_noclass"
					}
				},
				beforeDragDrop : function(b, a, c) {
					this.cancelExpand();
					return true
				},
				afterRepair : function(a) {
					if (a && Ext.enableFx) {
						a.node.ui.highlight()
					}
					this.hideProxy()
				}
			})
}
if (Ext.dd.DragZone) {
	Ext.tree.TreeDragZone = function(a, b) {
		Ext.tree.TreeDragZone.superclass.constructor.call(this, a.innerCt, b);
		this.tree = a
	};
	Ext.extend(Ext.tree.TreeDragZone, Ext.dd.DragZone, {
		ddGroup : "TreeDD",
		onBeforeDrag : function(a, b) {
			var c = a.node;
			return c && c.draggable && !c.disabled
		},
		onInitDrag : function(b) {
			var a = this.dragData;
			this.tree.getSelectionModel().select(a.node);
			this.tree.eventModel.disable();
			this.proxy.update("");
			a.node.ui.appendDDGhost(this.proxy.ghost.dom);
			this.tree.fireEvent("startdrag", this.tree, a.node, b)
		},
		getRepairXY : function(b, a) {
			return a.node.ui.getDDRepairXY()
		},
		onEndDrag : function(a, b) {
			this.tree.eventModel.enable.defer(100, this.tree.eventModel);
			this.tree.fireEvent("enddrag", this.tree, a.node, b)
		},
		onValidDrop : function(a, b, c) {
			this.tree
					.fireEvent("dragdrop", this.tree, this.dragData.node, a, b);
			this.hideProxy()
		},
		beforeInvalidDrop : function(a, c) {
			var b = this.tree.getSelectionModel();
			b.clearSelections();
			b.select(this.dragData.node)
		},
		afterRepair : function() {
			if (Ext.enableFx && this.tree.hlDrop) {
				Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor
						|| "c3daf9")
			}
			this.dragging = false
		}
	})
}
Ext.tree.TreeEditor = function(a, c, b) {
	c = c || {};
	var d = c.events ? c : new Ext.form.TextField(c);
	Ext.tree.TreeEditor.superclass.constructor.call(this, d, b);
	this.tree = a;
	if (!a.rendered) {
		a.on("render", this.initEditor, this)
	} else {
		this.initEditor(a)
	}
};
Ext.extend(Ext.tree.TreeEditor, Ext.Editor, {
			alignment : "l-l",
			autoSize : false,
			hideEl : false,
			cls : "x-small-editor x-tree-editor",
			shim : false,
			shadow : "frame",
			maxWidth : 250,
			editDelay : 350,
			initEditor : function(a) {
				a.on({
							scope : this,
							beforeclick : this.beforeNodeClick,
							dblclick : this.onNodeDblClick
						});
				this.on({
							scope : this,
							complete : this.updateNode,
							beforestartedit : this.fitToTree,
							specialkey : this.onSpecialKey
						});
				this.on("startedit", this.bindScroll, this, {
							delay : 10
						})
			},
			fitToTree : function(b, c) {
				var e = this.tree.getTreeEl().dom, d = c.dom;
				if (e.scrollLeft > d.offsetLeft) {
					e.scrollLeft = d.offsetLeft
				}
				var a = Math.min(this.maxWidth, (e.clientWidth > 20
								? e.clientWidth
								: e.offsetWidth)
								- Math.max(0, d.offsetLeft - e.scrollLeft) - 5);
				this.setSize(a, "")
			},
			triggerEdit : function(a, c) {
				this.completeEdit();
				if (a.attributes.editable !== false) {
					this.editNode = a;
					if (this.tree.autoScroll) {
						Ext.fly(a.ui.getEl()).scrollIntoView(this.tree.body)
					}
					var b = a.text || "";
					if (!Ext.isGecko && Ext.isEmpty(a.text)) {
						a.setText("&#160;")
					}
					this.autoEditTimer = this.startEdit.defer(this.editDelay,
							this, [a.ui.textNode, b]);
					return false
				}
			},
			bindScroll : function() {
				this.tree.getTreeEl().on("scroll", this.cancelEdit, this)
			},
			beforeNodeClick : function(a, b) {
				clearTimeout(this.autoEditTimer);
				if (this.tree.getSelectionModel().isSelected(a)) {
					b.stopEvent();
					return this.triggerEdit(a)
				}
			},
			onNodeDblClick : function(a, b) {
				clearTimeout(this.autoEditTimer)
			},
			updateNode : function(a, b) {
				this.tree.getTreeEl().un("scroll", this.cancelEdit, this);
				this.editNode.setText(b)
			},
			onHide : function() {
				Ext.tree.TreeEditor.superclass.onHide.call(this);
				if (this.editNode) {
					this.editNode.ui.focus.defer(50, this.editNode.ui)
				}
			},
			onSpecialKey : function(c, b) {
				var a = b.getKey();
				if (a == b.ESC) {
					b.stopEvent();
					this.cancelEdit()
				} else {
					if (a == b.ENTER && !b.hasModifier()) {
						b.stopEvent();
						this.completeEdit()
					}
				}
			},
			onDestroy : function() {
				clearTimeout(this.autoEditTimer);
				Ext.tree.TreeEditor.superclass.onDestroy.call(this);
				var a = this.tree;
				a.un("beforeclick", this.beforeNodeClick, this);
				a.un("dblclick", this.onNodeDblClick, this)
			}
		});