/*
 * Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.grid.GridPanel = Ext.extend(Ext.Panel, {
	autoExpandColumn : false,
	autoExpandMax : 1000,
	autoExpandMin : 50,
	columnLines : false,
	ddText : "{0} selected row{1}",
	deferRowRender : true,
	enableColumnHide : true,
	enableColumnMove : true,
	enableDragDrop : false,
	enableHdMenu : true,
	loadMask : false,
	minColumnWidth : 25,
	stripeRows : false,
	trackMouseOver : true,
	stateEvents : ["columnmove", "columnresize", "sortchange"],
	view : null,
	bubbleEvents : [],
	rendered : false,
	viewReady : false,
	initComponent : function() {
		Ext.grid.GridPanel.superclass.initComponent.call(this);
		if (this.columnLines) {
			this.cls = (this.cls || "") + " x-grid-with-col-lines"
		}
		this.autoScroll = false;
		this.autoWidth = false;
		if (Ext.isArray(this.columns)) {
			this.colModel = new Ext.grid.ColumnModel(this.columns);
			delete this.columns
		}
		if (this.ds) {
			this.store = this.ds;
			delete this.ds
		}
		if (this.cm) {
			this.colModel = this.cm;
			delete this.cm
		}
		if (this.sm) {
			this.selModel = this.sm;
			delete this.sm
		}
		this.store = Ext.StoreMgr.lookup(this.store);
		this.addEvents("click", "dblclick", "contextmenu", "mousedown",
				"mouseup", "mouseover", "mouseout", "keypress", "keydown",
				"cellmousedown", "rowmousedown", "headermousedown",
				"groupmousedown", "rowbodymousedown", "containermousedown",
				"cellclick", "celldblclick", "rowclick", "rowdblclick",
				"headerclick", "headerdblclick", "groupclick", "groupdblclick",
				"containerclick", "containerdblclick", "rowbodyclick",
				"rowbodydblclick", "rowcontextmenu", "cellcontextmenu",
				"headercontextmenu", "groupcontextmenu",
				"containercontextmenu", "rowbodycontextmenu", "bodyscroll",
				"columnresize", "columnmove", "sortchange", "reconfigure",
				"viewready")
	},
	onRender : function(d, a) {
		Ext.grid.GridPanel.superclass.onRender.apply(this, arguments);
		var e = this.getGridEl();
		this.el.addClass("x-grid-panel");
		this.mon(e, {
					scope : this,
					mousedown : this.onMouseDown,
					click : this.onClick,
					dblclick : this.onDblClick,
					contextmenu : this.onContextMenu
				});
		this.relayEvents(e, ["mousedown", "mouseup", "mouseover", "mouseout",
						"keypress", "keydown"]);
		var b = this.getView();
		b.init(this);
		b.render();
		this.getSelectionModel().init(this)
	},
	initEvents : function() {
		Ext.grid.GridPanel.superclass.initEvents.call(this);
		if (this.loadMask) {
			this.loadMask = new Ext.LoadMask(this.bwrap, Ext.apply({
								store : this.store
							}, this.loadMask))
		}
	},
	initStateEvents : function() {
		Ext.grid.GridPanel.superclass.initStateEvents.call(this);
		this.mon(this.colModel, "hiddenchange", this.saveState, this, {
					delay : 100
				})
	},
	applyState : function(a) {
		var j = this.colModel, e = a.columns;
		if (e) {
			for (var d = 0, f = e.length; d < f; d++) {
				var k = e[d], g = j.getColumnById(k.id);
				if (g) {
					g.hidden = k.hidden;
					g.width = k.width;
					var h = j.getIndexById(k.id);
					if (h != d) {
						j.moveColumn(h, d)
					}
				}
			}
		}
		if (a.sort && this.store) {
			this.store[this.store.remoteSort ? "setDefaultSort" : "sort"](
					a.sort.field, a.sort.direction)
		}
		var b = Ext.apply({}, a);
		delete b.columns;
		delete b.sort;
		Ext.grid.GridPanel.superclass.applyState.call(this, b)
	},
	getState : function() {
		var d = {
			columns : []
		};
		for (var b = 0, e; (e = this.colModel.config[b]); b++) {
			d.columns[b] = {
				id : e.id,
				width : e.width
			};
			if (e.hidden) {
				d.columns[b].hidden = true
			}
		}
		if (this.store) {
			var a = this.store.getSortState();
			if (a) {
				d.sort = a
			}
		}
		return d
	},
	afterRender : function() {
		Ext.grid.GridPanel.superclass.afterRender.call(this);
		var a = this.view;
		this.on("bodyresize", a.layout, a);
		a.layout();
		if (this.deferRowRender) {
			a.afterRender.defer(10, this.view)
		} else {
			a.afterRender()
		}
		this.viewReady = true
	},
	reconfigure : function(a, b) {
		var c = this.rendered;
		if (c) {
			if (this.loadMask) {
				this.loadMask.destroy();
				this.loadMask = new Ext.LoadMask(this.bwrap, Ext.apply({}, {
									store : a
								}, this.initialConfig.loadMask))
			}
		}
		if (this.view) {
			this.view.initData(a, b)
		}
		this.store = a;
		this.colModel = b;
		if (c) {
			this.view.refresh(true)
		}
		this.fireEvent("reconfigure", this, a, b)
	},
	onDestroy : function() {
		if (this.rendered) {
			Ext.destroy(this.view, this.loadMask)
		} else {
			if (this.store && this.store.autoDestroy) {
				this.store.destroy()
			}
		}
		Ext.destroy(this.colModel, this.selModel);
		this.store = this.selModel = this.colModel = this.view = this.loadMask = null;
		Ext.grid.GridPanel.superclass.onDestroy.call(this)
	},
	processEvent : function(d, g) {
		this.fireEvent(d, g);
		var f = g.getTarget(), c = this.view, i = c.findHeaderIndex(f);
		if (i !== false) {
			this.fireEvent("header" + d, this, i, g)
		} else {
			var h = c.findRowIndex(f), b, a;
			if (h !== false) {
				this.fireEvent("row" + d, this, h, g);
				b = c.findCellIndex(f);
				a = c.findRowBody(f);
				if (b !== false) {
					this.fireEvent("cell" + d, this, h, b, g)
				}
				if (a) {
					this.fireEvent("rowbody" + d, this, h, g)
				}
			} else {
				this.fireEvent("container" + d, this, g)
			}
		}
		this.view.processEvent(d, g)
	},
	onClick : function(a) {
		this.processEvent("click", a)
	},
	onMouseDown : function(a) {
		this.processEvent("mousedown", a)
	},
	onContextMenu : function(b, a) {
		this.processEvent("contextmenu", b)
	},
	onDblClick : function(a) {
		this.processEvent("dblclick", a)
	},
	walkCells : function(j, c, b, e, i) {
		var h = this.colModel, f = h.getColumnCount(), a = this.store, g = a
				.getCount(), d = true;
		if (b < 0) {
			if (c < 0) {
				j--;
				d = false
			}
			while (j >= 0) {
				if (!d) {
					c = f - 1
				}
				d = false;
				while (c >= 0) {
					if (e.call(i || this, j, c, h) === true) {
						return [j, c]
					}
					c--
				}
				j--
			}
		} else {
			if (c >= f) {
				j++;
				d = false
			}
			while (j < g) {
				if (!d) {
					c = 0
				}
				d = false;
				while (c < f) {
					if (e.call(i || this, j, c, h) === true) {
						return [j, c]
					}
					c++
				}
				j++
			}
		}
		return null
	},
	onResize : function() {
		Ext.grid.GridPanel.superclass.onResize.apply(this, arguments);
		if (this.viewReady) {
			this.view.layout()
		}
	},
	getGridEl : function() {
		return this.body
	},
	stopEditing : Ext.emptyFn,
	getSelectionModel : function() {
		if (!this.selModel) {
			this.selModel = new Ext.grid.RowSelectionModel(this.disableSelection
					? {
						selectRow : Ext.emptyFn
					}
					: null)
		}
		return this.selModel
	},
	getStore : function() {
		return this.store
	},
	getColumnModel : function() {
		return this.colModel
	},
	getView : function() {
		if (!this.view) {
			this.view = new Ext.grid.GridView(this.viewConfig)
		}
		return this.view
	},
	getDragDropText : function() {
		var a = this.selModel.getCount();
		return String.format(this.ddText, a, a == 1 ? "" : "s")
	}
});
Ext.reg("grid", Ext.grid.GridPanel);
Ext.grid.GridView = Ext.extend(Ext.util.Observable, {
	deferEmptyText : true,
	scrollOffset : undefined,
	autoFill : false,
	forceFit : false,
	sortClasses : ["sort-asc", "sort-desc"],
	sortAscText : "Sort Ascending",
	sortDescText : "Sort Descending",
	columnsText : "Columns",
	selectedRowClass : "x-grid3-row-selected",
	borderWidth : 2,
	tdClass : "x-grid3-cell",
	hdCls : "x-grid3-hd",
	markDirty : true,
	cellSelectorDepth : 4,
	rowSelectorDepth : 10,
	rowBodySelectorDepth : 10,
	cellSelector : "td.x-grid3-cell",
	rowSelector : "div.x-grid3-row",
	rowBodySelector : "div.x-grid3-row-body",
	firstRowCls : "x-grid3-row-first",
	lastRowCls : "x-grid3-row-last",
	rowClsRe : /(?:^|\s+)x-grid3-row-(first|last|alt)(?:\s+|$)/g,
	constructor : function(a) {
		Ext.apply(this, a);
		this.addEvents("beforerowremoved", "beforerowsinserted",
				"beforerefresh", "rowremoved", "rowsinserted", "rowupdated",
				"refresh");
		Ext.grid.GridView.superclass.constructor.call(this)
	},
	initTemplates : function() {
		var c = this.templates || {};
		if (!c.master) {
			c.master = new Ext.Template(
					'<div class="x-grid3" hidefocus="true">',
					'<div class="x-grid3-viewport">',
					'<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
					'<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
					"</div>",
					'<div class="x-grid3-resize-marker">&#160;</div>',
					'<div class="x-grid3-resize-proxy">&#160;</div>', "</div>")
		}
		if (!c.header) {
			c.header = new Ext.Template(
					'<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
					'<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
					"</table>")
		}
		if (!c.hcell) {
			c.hcell = new Ext.Template(
					'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
					this.grid.enableHdMenu
							? '<a class="x-grid3-hd-btn" href="#"></a>'
							: "",
					'{value}<img class="x-grid3-sort-icon" src="',
					Ext.BLANK_IMAGE_URL, '" />', "</div></td>")
		}
		if (!c.body) {
			c.body = new Ext.Template("{rows}")
		}
		if (!c.row) {
			c.row = new Ext.Template(
					'<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
					"<tbody><tr>{cells}</tr>",
					(this.enableRowBody
							? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>'
							: ""), "</tbody></table></div>")
		}
		if (!c.cell) {
			c.cell = new Ext.Template(
					'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
					'<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
					"</td>")
		}
		for (var a in c) {
			var b = c[a];
			if (b && Ext.isFunction(b.compile) && !b.compiled) {
				b.disableFormats = true;
				b.compile()
			}
		}
		this.templates = c;
		this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "")
	},
	fly : function(a) {
		if (!this._flyweight) {
			this._flyweight = new Ext.Element.Flyweight(document.body)
		}
		this._flyweight.dom = a;
		return this._flyweight
	},
	getEditorParent : function() {
		return this.scroller.dom
	},
	initElements : function() {
		var c = Ext.Element;
		var b = this.grid.getGridEl().dom.firstChild;
		var a = b.childNodes;
		this.el = new c(b);
		this.mainWrap = new c(a[0]);
		this.mainHd = new c(this.mainWrap.dom.firstChild);
		if (this.grid.hideHeaders) {
			this.mainHd.setDisplayed(false)
		}
		this.innerHd = this.mainHd.dom.firstChild;
		this.scroller = new c(this.mainWrap.dom.childNodes[1]);
		if (this.forceFit) {
			this.scroller.setStyle("overflow-x", "hidden")
		}
		this.mainBody = new c(this.scroller.dom.firstChild);
		this.focusEl = new c(this.scroller.dom.childNodes[1]);
		this.focusEl.swallowEvent("click", true);
		this.resizeMarker = new c(a[1]);
		this.resizeProxy = new c(a[2])
	},
	getRows : function() {
		return this.hasRows() ? this.mainBody.dom.childNodes : []
	},
	findCell : function(a) {
		if (!a) {
			return false
		}
		return this.fly(a)
				.findParent(this.cellSelector, this.cellSelectorDepth)
	},
	findCellIndex : function(c, b) {
		var a = this.findCell(c);
		if (a && (!b || this.fly(a).hasClass(b))) {
			return this.getCellIndex(a)
		}
		return false
	},
	getCellIndex : function(b) {
		if (b) {
			var a = b.className.match(this.colRe);
			if (a && a[1]) {
				return this.cm.getIndexById(a[1])
			}
		}
		return false
	},
	findHeaderCell : function(b) {
		var a = this.findCell(b);
		return a && this.fly(a).hasClass(this.hdCls) ? a : null
	},
	findHeaderIndex : function(a) {
		return this.findCellIndex(a, this.hdCls)
	},
	findRow : function(a) {
		if (!a) {
			return false
		}
		return this.fly(a).findParent(this.rowSelector, this.rowSelectorDepth)
	},
	findRowIndex : function(a) {
		var b = this.findRow(a);
		return b ? b.rowIndex : false
	},
	findRowBody : function(a) {
		if (!a) {
			return false
		}
		return this.fly(a).findParent(this.rowBodySelector,
				this.rowBodySelectorDepth)
	},
	getRow : function(a) {
		return this.getRows()[a]
	},
	getCell : function(b, a) {
		return this.getRow(b).getElementsByTagName("td")[a]
	},
	getHeaderCell : function(a) {
		return this.mainHd.dom.getElementsByTagName("td")[a]
	},
	addRowClass : function(c, a) {
		var b = this.getRow(c);
		if (b) {
			this.fly(b).addClass(a)
		}
	},
	removeRowClass : function(c, a) {
		var b = this.getRow(c);
		if (b) {
			this.fly(b).removeClass(a)
		}
	},
	removeRow : function(a) {
		Ext.removeNode(this.getRow(a));
		this.syncFocusEl(a)
	},
	removeRows : function(c, a) {
		var b = this.mainBody.dom;
		for (var d = c; d <= a; d++) {
			Ext.removeNode(b.childNodes[c])
		}
		this.syncFocusEl(c)
	},
	getScrollState : function() {
		var a = this.scroller.dom;
		return {
			left : a.scrollLeft,
			top : a.scrollTop
		}
	},
	restoreScroll : function(a) {
		var b = this.scroller.dom;
		b.scrollLeft = a.left;
		b.scrollTop = a.top
	},
	scrollToTop : function() {
		this.scroller.dom.scrollTop = 0;
		this.scroller.dom.scrollLeft = 0
	},
	syncScroll : function() {
		this.syncHeaderScroll();
		var a = this.scroller.dom;
		this.grid.fireEvent("bodyscroll", a.scrollLeft, a.scrollTop)
	},
	syncHeaderScroll : function() {
		var a = this.scroller.dom;
		this.innerHd.scrollLeft = a.scrollLeft;
		this.innerHd.scrollLeft = a.scrollLeft
	},
	updateSortIcon : function(b, a) {
		var d = this.sortClasses;
		var c = this.mainHd.select("td").removeClass(d);
		c.item(b).addClass(d[a == "DESC" ? 1 : 0])
	},
	updateAllColumnWidths : function() {
		var d = this.getTotalWidth(), k = this.cm.getColumnCount(), f = [], e, b;
		for (b = 0; b < k; b++) {
			f[b] = this.getColumnWidth(b)
		}
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = d;
		this.mainBody.dom.style.width = d;
		for (b = 0; b < k; b++) {
			var c = this.getHeaderCell(b);
			c.style.width = f[b]
		}
		var h = this.getRows(), l, g;
		for (b = 0, e = h.length; b < e; b++) {
			l = h[b];
			l.style.width = d;
			if (l.firstChild) {
				l.firstChild.style.width = d;
				g = l.firstChild.rows[0];
				for (var a = 0; a < k; a++) {
					g.childNodes[a].style.width = f[a]
				}
			}
		}
		this.onAllColumnWidthsUpdated(f, d)
	},
	updateColumnWidth : function(b, a) {
		var h = this.getColumnWidth(b);
		var e = this.getTotalWidth();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = e;
		this.mainBody.dom.style.width = e;
		var d = this.getHeaderCell(b);
		d.style.width = h;
		var g = this.getRows(), j;
		for (var c = 0, f = g.length; c < f; c++) {
			j = g[c];
			j.style.width = e;
			if (j.firstChild) {
				j.firstChild.style.width = e;
				j.firstChild.rows[0].childNodes[b].style.width = h
			}
		}
		this.onColumnWidthUpdated(b, h, e)
	},
	updateColumnHidden : function(a, e) {
		var d = this.getTotalWidth();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = d;
		this.mainBody.dom.style.width = d;
		var g = e ? "none" : "";
		var c = this.getHeaderCell(a);
		c.style.display = g;
		var h = this.getRows(), j;
		for (var b = 0, f = h.length; b < f; b++) {
			j = h[b];
			j.style.width = d;
			if (j.firstChild) {
				j.firstChild.style.width = d;
				j.firstChild.rows[0].childNodes[a].style.display = g
			}
		}
		this.onColumnHiddenUpdated(a, e, d);
		delete this.lastViewWidth;
		this.layout()
	},
	doRender : function(f, h, q, a, o, v) {
		var b = this.templates, e = b.cell, g = b.row, k = o - 1;
		var d = "width:" + this.getTotalWidth() + ";";
		var y = [], s, z, t = {}, l = {
			tstyle : d
		}, n;
		for (var u = 0, x = h.length; u < x; u++) {
			n = h[u];
			s = [];
			var m = (u + a);
			for (var w = 0; w < o; w++) {
				z = f[w];
				t.id = z.id;
				t.css = w === 0 ? "x-grid3-cell-first " : (w == k
						? "x-grid3-cell-last "
						: "");
				t.attr = t.cellAttr = "";
				t.value = z.renderer.call(z.scope, n.data[z.name], t, n, m, w,
						q);
				t.style = z.style;
				if (Ext.isEmpty(t.value)) {
					t.value = "&#160;"
				}
				if (this.markDirty && n.dirty
						&& Ext.isDefined(n.modified[z.name])) {
					t.css += " x-grid3-dirty-cell"
				}
				s[s.length] = e.apply(t)
			}
			var A = [];
			if (v && ((m + 1) % 2 === 0)) {
				A[0] = "x-grid3-row-alt"
			}
			if (n.dirty) {
				A[1] = " x-grid3-dirty-row"
			}
			l.cols = o;
			if (this.getRowClass) {
				A[2] = this.getRowClass(n, m, l, q)
			}
			l.alt = A.join(" ");
			l.cells = s.join("");
			y[y.length] = g.apply(l)
		}
		return y.join("")
	},
	processRows : function(b, f) {
		if (!this.ds || this.ds.getCount() < 1) {
			return
		}
		var e = this.getRows(), a = e.length, c, d;
		f = f || !this.grid.stripeRows;
		b = b || 0;
		for (c = 0; c < a; c++) {
			d = e[c];
			if (d) {
				d.rowIndex = c;
				if (!f) {
					d.className = d.className.replace(this.rowClsRe, " ");
					if ((c + 1) % 2 === 0) {
						d.className += " x-grid3-row-alt"
					}
				}
			}
		}
		if (b === 0) {
			Ext.fly(e[0]).addClass(this.firstRowCls)
		}
		Ext.fly(e[e.length - 1]).addClass(this.lastRowCls)
	},
	afterRender : function() {
		if (!this.ds || !this.cm) {
			return
		}
		this.mainBody.dom.innerHTML = this.renderRows() || "&#160;";
		this.processRows(0, true);
		if (this.deferEmptyText !== true) {
			this.applyEmptyText()
		}
		this.grid.fireEvent("viewready", this.grid)
	},
	renderUI : function() {
		var d = this.renderHeaders();
		var a = this.templates.body.apply({
					rows : "&#160;"
				});
		var b = this.templates.master.apply({
					body : a,
					header : d,
					ostyle : "width:" + this.getOffsetWidth() + ";",
					bstyle : "width:" + this.getTotalWidth() + ";"
				});
		var c = this.grid;
		c.getGridEl().dom.innerHTML = b;
		this.initElements();
		Ext.fly(this.innerHd).on("click", this.handleHdDown, this);
		this.mainHd.on({
					scope : this,
					mouseover : this.handleHdOver,
					mouseout : this.handleHdOut,
					mousemove : this.handleHdMove
				});
		this.scroller.on("scroll", this.syncScroll, this);
		if (c.enableColumnResize !== false) {
			this.splitZone = new Ext.grid.GridView.SplitDragZone(c,
					this.mainHd.dom)
		}
		if (c.enableColumnMove) {
			this.columnDrag = new Ext.grid.GridView.ColumnDragZone(c,
					this.innerHd);
			this.columnDrop = new Ext.grid.HeaderDropZone(c, this.mainHd.dom)
		}
		if (c.enableHdMenu !== false) {
			this.hmenu = new Ext.menu.Menu({
						id : c.id + "-hctx"
					});
			this.hmenu.add({
						itemId : "asc",
						text : this.sortAscText,
						cls : "xg-hmenu-sort-asc"
					}, {
						itemId : "desc",
						text : this.sortDescText,
						cls : "xg-hmenu-sort-desc"
					});
			if (c.enableColumnHide !== false) {
				this.colMenu = new Ext.menu.Menu({
							id : c.id + "-hcols-menu"
						});
				this.colMenu.on({
							scope : this,
							beforeshow : this.beforeColMenuShow,
							itemclick : this.handleHdMenuClick
						});
				this.hmenu.add("-", {
							itemId : "columns",
							hideOnClick : false,
							text : this.columnsText,
							menu : this.colMenu,
							iconCls : "x-cols-icon"
						})
			}
			this.hmenu.on("itemclick", this.handleHdMenuClick, this)
		}
		if (c.trackMouseOver) {
			this.mainBody.on({
						scope : this,
						mouseover : this.onRowOver,
						mouseout : this.onRowOut
					})
		}
		if (c.enableDragDrop || c.enableDrag) {
			this.dragZone = new Ext.grid.GridDragZone(c, {
						ddGroup : c.ddGroup || "GridDD"
					})
		}
		this.updateHeaderSortState()
	},
	processEvent : Ext.emptyFn,
	layout : function() {
		if (!this.mainBody) {
			return
		}
		var d = this.grid;
		var h = d.getGridEl();
		var a = h.getSize(true);
		var b = a.width;
		if (!d.hideHeaders && (b < 20 || a.height < 20)) {
			return
		}
		if (d.autoHeight) {
			this.scroller.dom.style.overflow = "visible";
			if (Ext.isWebKit) {
				this.scroller.dom.style.position = "static"
			}
		} else {
			this.el.setSize(a.width, a.height);
			var f = this.mainHd.getHeight();
			var e = a.height - (f);
			this.scroller.setSize(b, e);
			if (this.innerHd) {
				this.innerHd.style.width = (b) + "px"
			}
		}
		if (this.forceFit) {
			if (this.lastViewWidth != b) {
				this.fitColumns(false, false);
				this.lastViewWidth = b
			}
		} else {
			this.autoExpand();
			this.syncHeaderScroll()
		}
		this.onLayout(b, e)
	},
	onLayout : function(a, b) {
	},
	onColumnWidthUpdated : function(c, a, b) {
	},
	onAllColumnWidthsUpdated : function(a, b) {
	},
	onColumnHiddenUpdated : function(b, c, a) {
	},
	updateColumnText : function(a, b) {
	},
	afterMove : function(a) {
	},
	init : function(a) {
		this.grid = a;
		this.initTemplates();
		this.initData(a.store, a.colModel);
		this.initUI(a)
	},
	getColumnId : function(a) {
		return this.cm.getColumnId(a)
	},
	getOffsetWidth : function() {
		return (this.cm.getTotalWidth() + this.getScrollOffset()) + "px"
	},
	getScrollOffset : function() {
		return Ext.num(this.scrollOffset, Ext.getScrollBarWidth())
	},
	renderHeaders : function() {
		var c = this.cm, g = this.templates, e = g.hcell, b = [], h = {}, a = c
				.getColumnCount(), f = a - 1;
		for (var d = 0; d < a; d++) {
			h.id = c.getColumnId(d);
			h.value = c.getColumnHeader(d) || "";
			h.style = this.getColumnStyle(d, true);
			h.tooltip = this.getColumnTooltip(d);
			h.css = d === 0 ? "x-grid3-cell-first " : (d == f
					? "x-grid3-cell-last "
					: "");
			if (c.config[d].align == "right") {
				h.istyle = "padding-right:16px"
			} else {
				delete h.istyle
			}
			b[b.length] = e.apply(h)
		}
		return g.header.apply({
					cells : b.join(""),
					tstyle : "width:" + this.getTotalWidth() + ";"
				})
	},
	getColumnTooltip : function(a) {
		var b = this.cm.getColumnTooltip(a);
		if (b) {
			if (Ext.QuickTips.isEnabled()) {
				return 'ext:qtip="' + b + '"'
			} else {
				return 'title="' + b + '"'
			}
		}
		return ""
	},
	beforeUpdate : function() {
		this.grid.stopEditing(true)
	},
	updateHeaders : function() {
		this.innerHd.firstChild.innerHTML = this.renderHeaders();
		this.innerHd.firstChild.style.width = this.getOffsetWidth();
		this.innerHd.firstChild.firstChild.style.width = this.getTotalWidth()
	},
	focusRow : function(a) {
		this.focusCell(a, 0, false)
	},
	focusCell : function(c, a, b) {
		this.syncFocusEl(this.ensureVisible(c, a, b));
		if (Ext.isGecko) {
			this.focusEl.focus()
		} else {
			this.focusEl.focus.defer(1, this.focusEl)
		}
	},
	resolveCell : function(g, d, f) {
		if (!Ext.isNumber(g)) {
			g = g.rowIndex
		}
		if (!this.ds) {
			return null
		}
		if (g < 0 || g >= this.ds.getCount()) {
			return null
		}
		d = (d !== undefined ? d : 0);
		var c = this.getRow(g), a = this.cm, e = a.getColumnCount(), b;
		if (!(f === false && d === 0)) {
			while (d < e && a.isHidden(d)) {
				d++
			}
			b = this.getCell(g, d)
		}
		return {
			row : c,
			cell : b
		}
	},
	getResolvedXY : function(a) {
		if (!a) {
			return null
		}
		var b = this.scroller.dom, e = a.cell, d = a.row;
		return e ? Ext.fly(e).getXY() : [this.el.getX(), Ext.fly(d).getY()]
	},
	syncFocusEl : function(d, a, c) {
		var b = d;
		if (!Ext.isArray(b)) {
			d = Math.min(d, Math.max(0, this.getRows().length - 1));
			b = this.getResolvedXY(this.resolveCell(d, a, c))
		}
		this.focusEl.setXY(b || this.scroller.getXY())
	},
	ensureVisible : function(s, f, e) {
		var q = this.resolveCell(s, f, e);
		if (!q || !q.row) {
			return
		}
		var j = q.row, g = q.cell, m = this.scroller.dom, r = 0, d = j, n = this.el.dom;
		while (d && d != n) {
			r += d.offsetTop;
			d = d.offsetParent
		}
		r -= this.mainHd.dom.offsetHeight;
		n = parseInt(m.scrollTop, 10);
		var o = r + j.offsetHeight, a = m.clientHeight, l = n + a;
		if (r < n) {
			m.scrollTop = r
		} else {
			if (o > l) {
				m.scrollTop = o - a
			}
		}
		if (e !== false) {
			var k = parseInt(g.offsetLeft, 10);
			var i = k + g.offsetWidth;
			var h = parseInt(m.scrollLeft, 10);
			var b = h + m.clientWidth;
			if (k < h) {
				m.scrollLeft = k
			} else {
				if (i > b) {
					m.scrollLeft = i - m.clientWidth
				}
			}
		}
		return this.getResolvedXY(q)
	},
	insertRows : function(a, h, e, g) {
		var d = a.getCount() - 1;
		if (!g && h === 0 && e >= d) {
			this.fireEvent("beforerowsinserted", this, h, e);
			this.refresh();
			this.fireEvent("rowsinserted", this, h, e)
		} else {
			if (!g) {
				this.fireEvent("beforerowsinserted", this, h, e)
			}
			var b = this.renderRows(h, e), f = this.getRow(h);
			if (f) {
				if (h === 0) {
					Ext.fly(this.getRow(0)).removeClass(this.firstRowCls)
				}
				Ext.DomHelper.insertHtml("beforeBegin", f, b)
			} else {
				var c = this.getRow(d - 1);
				if (c) {
					Ext.fly(c).removeClass(this.lastRowCls)
				}
				Ext.DomHelper.insertHtml("beforeEnd", this.mainBody.dom, b)
			}
			if (!g) {
				this.fireEvent("rowsinserted", this, h, e);
				this.processRows(h)
			} else {
				if (h === 0 || h >= d) {
					Ext.fly(this.getRow(h)).addClass(h === 0
							? this.firstRowCls
							: this.lastRowCls)
				}
			}
		}
		this.syncFocusEl(h)
	},
	deleteRows : function(a, c, b) {
		if (a.getRowCount() < 1) {
			this.refresh()
		} else {
			this.fireEvent("beforerowsdeleted", this, c, b);
			this.removeRows(c, b);
			this.processRows(c);
			this.fireEvent("rowsdeleted", this, c, b)
		}
	},
	getColumnStyle : function(a, c) {
		var b = !c ? (this.cm.config[a].css || "") : "";
		b += "width:" + this.getColumnWidth(a) + ";";
		if (this.cm.isHidden(a)) {
			b += "display:none;"
		}
		var d = this.cm.config[a].align;
		if (d) {
			b += "text-align:" + d + ";"
		}
		return b
	},
	getColumnWidth : function(b) {
		var a = this.cm.getColumnWidth(b);
		if (Ext.isNumber(a)) {
			return (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2)
					? a
					: (a - this.borderWidth > 0 ? a - this.borderWidth : 0))
					+ "px"
		}
		return a
	},
	getTotalWidth : function() {
		return this.cm.getTotalWidth() + "px"
	},
	fitColumns : function(d, g, h) {
		var p = this.cm, j;
		var k = p.getTotalWidth(false);
		var a = this.grid.getGridEl().getWidth(true) - this.getScrollOffset();
		if (a < 20) {
			return
		}
		var e = a - k;
		if (e === 0) {
			return false
		}
		var l = p.getColumnCount(true);
		var r = l - (Ext.isNumber(h) ? 1 : 0);
		if (r === 0) {
			r = 1;
			h = undefined
		}
		var q = p.getColumnCount();
		var n = [];
		var m = 0;
		var c = 0;
		var o;
		for (j = 0; j < q; j++) {
			if (!p.isHidden(j) && !p.isFixed(j) && j !== h) {
				o = p.getColumnWidth(j);
				n.push(j);
				m = j;
				n.push(o);
				c += o
			}
		}
		var b = (a - p.getTotalWidth()) / c;
		while (n.length) {
			o = n.pop();
			j = n.pop();
			p.setColumnWidth(j, Math.max(this.grid.minColumnWidth, Math.floor(o
									+ o * b)), true)
		}
		if ((k = p.getTotalWidth(false)) > a) {
			var f = r != l ? h : m;
			p.setColumnWidth(f, Math.max(1, p.getColumnWidth(f) - (k - a)),
					true)
		}
		if (d !== true) {
			this.updateAllColumnWidths()
		}
		return true
	},
	autoExpand : function(b) {
		var h = this.grid, a = this.cm;
		if (!this.userResized && h.autoExpandColumn) {
			var d = a.getTotalWidth(false);
			var i = this.grid.getGridEl().getWidth(true)
					- this.getScrollOffset();
			if (d != i) {
				var f = a.getIndexById(h.autoExpandColumn);
				var e = a.getColumnWidth(f);
				var c = Math.min(Math.max(((i - d) + e), h.autoExpandMin),
						h.autoExpandMax);
				if (c != e) {
					a.setColumnWidth(f, c, true);
					if (b !== true) {
						this.updateColumnWidth(f, c)
					}
				}
			}
		}
	},
	getColumnData : function() {
		var d = [], a = this.cm, e = a.getColumnCount();
		for (var c = 0; c < e; c++) {
			var b = a.getDataIndex(c);
			d[c] = {
				name : (!Ext.isDefined(b) ? this.ds.fields.get(c).name : b),
				renderer : a.getRenderer(c),
				scope : a.getRendererScope(c),
				id : a.getColumnId(c),
				style : this.getColumnStyle(c)
			}
		}
		return d
	},
	renderRows : function(i, c) {
		var d = this.grid, f = d.colModel, a = d.store, j = d.stripeRows;
		var h = f.getColumnCount();
		if (a.getCount() < 1) {
			return ""
		}
		var e = this.getColumnData();
		i = i || 0;
		c = !Ext.isDefined(c) ? a.getCount() - 1 : c;
		var b = a.getRange(i, c);
		return this.doRender(e, b, a, i, h, j)
	},
	renderBody : function() {
		var a = this.renderRows() || "&#160;";
		return this.templates.body.apply({
					rows : a
				})
	},
	refreshRow : function(a) {
		var c = this.ds, b;
		if (Ext.isNumber(a)) {
			b = a;
			a = c.getAt(b);
			if (!a) {
				return
			}
		} else {
			b = c.indexOf(a);
			if (b < 0) {
				return
			}
		}
		this.insertRows(c, b, b, true);
		this.getRow(b).rowIndex = b;
		this.onRemove(c, a, b + 1, true);
		this.fireEvent("rowupdated", this, b, a)
	},
	refresh : function(b) {
		this.fireEvent("beforerefresh", this);
		this.grid.stopEditing(true);
		var a = this.renderBody();
		this.mainBody.update(a).setWidth(this.getTotalWidth());
		if (b === true) {
			this.updateHeaders();
			this.updateHeaderSortState()
		}
		this.processRows(0, true);
		this.layout();
		this.applyEmptyText();
		this.fireEvent("refresh", this)
	},
	applyEmptyText : function() {
		if (this.emptyText && !this.hasRows()) {
			this.mainBody.update('<div class="x-grid-empty">' + this.emptyText
					+ "</div>")
		}
	},
	updateHeaderSortState : function() {
		var b = this.ds.getSortState();
		if (!b) {
			return
		}
		if (!this.sortState
				|| (this.sortState.field != b.field || this.sortState.direction != b.direction)) {
			this.grid.fireEvent("sortchange", this.grid, b)
		}
		this.sortState = b;
		var c = this.cm.findColumnIndex(b.field);
		if (c != -1) {
			var a = b.direction;
			this.updateSortIcon(c, a)
		}
	},
	clearHeaderSortState : function() {
		if (!this.sortState) {
			return
		}
		this.grid.fireEvent("sortchange", this.grid, null);
		this.mainHd.select("td").removeClass(this.sortClasses);
		delete this.sortState
	},
	destroy : function() {
		if (this.colMenu) {
			Ext.menu.MenuMgr.unregister(this.colMenu);
			this.colMenu.destroy();
			delete this.colMenu
		}
		if (this.hmenu) {
			Ext.menu.MenuMgr.unregister(this.hmenu);
			this.hmenu.destroy();
			delete this.hmenu
		}
		this.initData(null, null);
		this.purgeListeners();
		Ext.fly(this.innerHd).un("click", this.handleHdDown, this);
		if (this.grid.enableColumnMove) {
			Ext.destroy(this.columnDrag.el, this.columnDrag.proxy.ghost,
					this.columnDrag.proxy.el, this.columnDrop.el,
					this.columnDrop.proxyTop, this.columnDrop.proxyBottom,
					this.columnDrag.dragData.ddel,
					this.columnDrag.dragData.header);
			if (this.columnDrag.proxy.anim) {
				Ext.destroy(this.columnDrag.proxy.anim)
			}
			delete this.columnDrag.proxy.ghost;
			delete this.columnDrag.dragData.ddel;
			delete this.columnDrag.dragData.header;
			this.columnDrag.destroy();
			delete Ext.dd.DDM.locationCache[this.columnDrag.id];
			delete this.columnDrag._domRef;
			delete this.columnDrop.proxyTop;
			delete this.columnDrop.proxyBottom;
			this.columnDrop.destroy();
			delete Ext.dd.DDM.locationCache["gridHeader"
					+ this.grid.getGridEl().id];
			delete this.columnDrop._domRef;
			delete Ext.dd.DDM.ids[this.columnDrop.ddGroup]
		}
		if (this.splitZone) {
			this.splitZone.destroy();
			delete this.splitZone._domRef;
			delete Ext.dd.DDM.ids["gridSplitters" + this.grid.getGridEl().id]
		}
		Ext.fly(this.innerHd).removeAllListeners();
		Ext.removeNode(this.innerHd);
		delete this.innerHd;
		Ext.destroy(this.el, this.mainWrap, this.mainHd, this.scroller,
				this.mainBody, this.focusEl, this.resizeMarker,
				this.resizeProxy, this.activeHdBtn, this.dragZone,
				this.splitZone, this._flyweight);
		delete this.grid.container;
		if (this.dragZone) {
			this.dragZone.destroy()
		}
		Ext.dd.DDM.currentTarget = null;
		delete Ext.dd.DDM.locationCache[this.grid.getGridEl().id];
		Ext.EventManager.removeResizeListener(this.onWindowResize, this)
	},
	onDenyColumnHide : function() {
	},
	render : function() {
		if (this.autoFill) {
			var a = this.grid.ownerCt;
			if (a && a.getLayout()) {
				a.on("afterlayout", function() {
							this.fitColumns(true, true);
							this.updateHeaders()
						}, this, {
							single : true
						})
			} else {
				this.fitColumns(true, true)
			}
		} else {
			if (this.forceFit) {
				this.fitColumns(true, false)
			} else {
				if (this.grid.autoExpandColumn) {
					this.autoExpand(true)
				}
			}
		}
		this.renderUI()
	},
	initData : function(b, a) {
		if (this.ds) {
			this.ds.un("load", this.onLoad, this);
			this.ds.un("datachanged", this.onDataChange, this);
			this.ds.un("add", this.onAdd, this);
			this.ds.un("remove", this.onRemove, this);
			this.ds.un("update", this.onUpdate, this);
			this.ds.un("clear", this.onClear, this);
			if (this.ds !== b && this.ds.autoDestroy) {
				this.ds.destroy()
			}
		}
		if (b) {
			b.on({
						scope : this,
						load : this.onLoad,
						datachanged : this.onDataChange,
						add : this.onAdd,
						remove : this.onRemove,
						update : this.onUpdate,
						clear : this.onClear
					})
		}
		this.ds = b;
		if (this.cm) {
			this.cm.un("configchange", this.onColConfigChange, this);
			this.cm.un("widthchange", this.onColWidthChange, this);
			this.cm.un("headerchange", this.onHeaderChange, this);
			this.cm.un("hiddenchange", this.onHiddenChange, this);
			this.cm.un("columnmoved", this.onColumnMove, this)
		}
		if (a) {
			delete this.lastViewWidth;
			a.on({
						scope : this,
						configchange : this.onColConfigChange,
						widthchange : this.onColWidthChange,
						headerchange : this.onHeaderChange,
						hiddenchange : this.onHiddenChange,
						columnmoved : this.onColumnMove
					})
		}
		this.cm = a
	},
	onDataChange : function() {
		this.refresh();
		this.updateHeaderSortState();
		this.syncFocusEl(0)
	},
	onClear : function() {
		this.refresh();
		this.syncFocusEl(0)
	},
	onUpdate : function(b, a) {
		this.refreshRow(a)
	},
	onAdd : function(c, a, b) {
		this.insertRows(c, b, b + (a.length - 1))
	},
	onRemove : function(d, a, b, c) {
		if (c !== true) {
			this.fireEvent("beforerowremoved", this, b, a)
		}
		this.removeRow(b);
		if (c !== true) {
			this.processRows(b);
			this.applyEmptyText();
			this.fireEvent("rowremoved", this, b, a)
		}
	},
	onLoad : function() {
		this.scrollToTop.defer(Ext.isGecko ? 1 : 0, this)
	},
	onColWidthChange : function(a, b, c) {
		this.updateColumnWidth(b, c)
	},
	onHeaderChange : function(a, b, c) {
		this.updateHeaders()
	},
	onHiddenChange : function(a, b, c) {
		this.updateColumnHidden(b, c)
	},
	onColumnMove : function(a, d, b) {
		this.indexMap = null;
		var c = this.getScrollState();
		this.refresh(true);
		this.restoreScroll(c);
		this.afterMove(b);
		this.grid.fireEvent("columnmove", d, b)
	},
	onColConfigChange : function() {
		delete this.lastViewWidth;
		this.indexMap = null;
		this.refresh(true)
	},
	initUI : function(a) {
		a.on("headerclick", this.onHeaderClick, this)
	},
	initEvents : function() {
	},
	onHeaderClick : function(b, a) {
		if (this.headersDisabled || !this.cm.isSortable(a)) {
			return
		}
		b.stopEditing(true);
		b.store.sort(this.cm.getDataIndex(a))
	},
	onRowOver : function(b, a) {
		var c;
		if ((c = this.findRowIndex(a)) !== false) {
			this.addRowClass(c, "x-grid3-row-over")
		}
	},
	onRowOut : function(b, a) {
		var c;
		if ((c = this.findRowIndex(a)) !== false
				&& !b.within(this.getRow(c), true)) {
			this.removeRowClass(c, "x-grid3-row-over")
		}
	},
	handleWheel : function(a) {
		a.stopPropagation()
	},
	onRowSelect : function(a) {
		this.addRowClass(a, this.selectedRowClass)
	},
	onRowDeselect : function(a) {
		this.removeRowClass(a, this.selectedRowClass)
	},
	onCellSelect : function(c, b) {
		var a = this.getCell(c, b);
		if (a) {
			this.fly(a).addClass("x-grid3-cell-selected")
		}
	},
	onCellDeselect : function(c, b) {
		var a = this.getCell(c, b);
		if (a) {
			this.fly(a).removeClass("x-grid3-cell-selected")
		}
	},
	onColumnSplitterMoved : function(c, b) {
		this.userResized = true;
		var a = this.grid.colModel;
		a.setColumnWidth(c, b, true);
		if (this.forceFit) {
			this.fitColumns(true, false, c);
			this.updateAllColumnWidths()
		} else {
			this.updateColumnWidth(c, b);
			this.syncHeaderScroll()
		}
		this.grid.fireEvent("columnresize", c, b)
	},
	handleHdMenuClick : function(c) {
		var b = this.hdCtxIndex, a = this.cm, d = this.ds, e = c.getItemId();
		switch (e) {
			case "asc" :
				d.sort(a.getDataIndex(b), "ASC");
				break;
			case "desc" :
				d.sort(a.getDataIndex(b), "DESC");
				break;
			default :
				b = a.getIndexById(e.substr(4));
				if (b != -1) {
					if (c.checked
							&& a.getColumnsBy(this.isHideableColumn, this).length <= 1) {
						this.onDenyColumnHide();
						return false
					}
					a.setHidden(b, c.checked)
				}
		}
		return true
	},
	isHideableColumn : function(a) {
		return !a.hidden && !a.fixed
	},
	beforeColMenuShow : function() {
		var a = this.cm, c = a.getColumnCount();
		this.colMenu.removeAll();
		for (var b = 0; b < c; b++) {
			if (a.config[b].fixed !== true && a.config[b].hideable !== false) {
				this.colMenu.add(new Ext.menu.CheckItem({
							itemId : "col-" + a.getColumnId(b),
							text : a.getColumnHeader(b),
							checked : !a.isHidden(b),
							hideOnClick : false,
							disabled : a.config[b].hideable === false
						}))
			}
		}
	},
	handleHdDown : function(g, d) {
		if (Ext.fly(d).hasClass("x-grid3-hd-btn")) {
			g.stopEvent();
			var f = this.findHeaderCell(d);
			Ext.fly(f).addClass("x-grid3-hd-menu-open");
			var c = this.getCellIndex(f);
			this.hdCtxIndex = c;
			var b = this.hmenu.items, a = this.cm;
			b.get("asc").setDisabled(!a.isSortable(c));
			b.get("desc").setDisabled(!a.isSortable(c));
			this.hmenu.on("hide", function() {
						Ext.fly(f).removeClass("x-grid3-hd-menu-open")
					}, this, {
						single : true
					});
			this.hmenu.show(d, "tl-bl?")
		}
	},
	handleHdOver : function(d, a) {
		var c = this.findHeaderCell(a);
		if (c && !this.headersDisabled) {
			this.activeHdRef = a;
			this.activeHdIndex = this.getCellIndex(c);
			var b = this.fly(c);
			this.activeHdRegion = b.getRegion();
			if (!this.cm.isMenuDisabled(this.activeHdIndex)) {
				b.addClass("x-grid3-hd-over");
				this.activeHdBtn = b.child(".x-grid3-hd-btn");
				if (this.activeHdBtn) {
					this.activeHdBtn.dom.style.height = (c.firstChild.offsetHeight - 1)
							+ "px"
				}
			}
		}
	},
	handleHdMove : function(h, d) {
		var g = this.findHeaderCell(this.activeHdRef);
		if (g && !this.headersDisabled) {
			var b = this.splitHandleWidth || 5, f = this.activeHdRegion, a = h
					.getPageX(), c = g.style, i = "";
			if (this.grid.enableColumnResize !== false) {
				if (a - f.left <= b
						&& this.cm.isResizable(this.activeHdIndex - 1)) {
					i = Ext.isAir ? "move" : Ext.isWebKit
							? "e-resize"
							: "col-resize"
				} else {
					if (f.right - a <= (!this.activeHdBtn ? b : 2)
							&& this.cm.isResizable(this.activeHdIndex)) {
						i = Ext.isAir ? "move" : Ext.isWebKit
								? "w-resize"
								: "col-resize"
					}
				}
			}
			c.cursor = i
		}
	},
	handleHdOut : function(c, a) {
		var b = this.findHeaderCell(a);
		if (b && (!Ext.isIE || !c.within(b, true))) {
			this.activeHdRef = null;
			this.fly(b).removeClass("x-grid3-hd-over");
			b.style.cursor = ""
		}
	},
	hasRows : function() {
		var a = this.mainBody.dom.firstChild;
		return a && a.nodeType == 1 && a.className != "x-grid-empty"
	},
	bind : function(a, b) {
		this.initData(a, b)
	}
});
Ext.grid.GridView.SplitDragZone = function(a, b) {
	this.grid = a;
	this.view = a.getView();
	this.marker = this.view.resizeMarker;
	this.proxy = this.view.resizeProxy;
	Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this, b,
			"gridSplitters" + this.grid.getGridEl().id, {
				dragElId : Ext.id(this.proxy.dom),
				resizeFrame : false
			});
	this.scroll = false;
	this.hw = this.view.splitHandleWidth || 5
};
Ext.extend(Ext.grid.GridView.SplitDragZone, Ext.dd.DDProxy, {
			b4StartDrag : function(a, e) {
				this.view.headersDisabled = true;
				var d = this.view.mainWrap.getHeight();
				this.marker.setHeight(d);
				this.marker.show();
				this.marker.alignTo(this.view.getHeaderCell(this.cellIndex),
						"tl-tl", [-2, 0]);
				this.proxy.setHeight(d);
				var b = this.cm.getColumnWidth(this.cellIndex);
				var c = Math.max(b - this.grid.minColumnWidth, 0);
				this.resetConstraints();
				this.setXConstraint(c, 1000);
				this.setYConstraint(0, 0);
				this.minX = a - c;
				this.maxX = a + 1000;
				this.startPos = a;
				Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, e)
			},
			allowHeaderDrag : function(a) {
				return true
			},
			handleMouseDown : function(a) {
				var h = this.view.findHeaderCell(a.getTarget());
				if (h && this.allowHeaderDrag(a)) {
					var k = this.view.fly(h).getXY(), d = k[0], c = k[1];
					var i = a.getXY(), b = i[0];
					var g = h.offsetWidth, f = false;
					if ((b - d) <= this.hw) {
						f = -1
					} else {
						if ((d + g) - b <= this.hw) {
							f = 0
						}
					}
					if (f !== false) {
						this.cm = this.grid.colModel;
						var j = this.view.getCellIndex(h);
						if (f == -1) {
							if (j + f < 0) {
								return
							}
							while (this.cm.isHidden(j + f)) {
								--f;
								if (j + f < 0) {
									return
								}
							}
						}
						this.cellIndex = j + f;
						this.split = h.dom;
						if (this.cm.isResizable(this.cellIndex)
								&& !this.cm.isFixed(this.cellIndex)) {
							Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown
									.apply(this, arguments)
						}
					} else {
						if (this.view.columnDrag) {
							this.view.columnDrag.callHandleMouseDown(a)
						}
					}
				}
			},
			endDrag : function(d) {
				this.marker.hide();
				var a = this.view;
				var b = Math.max(this.minX, d.getPageX());
				var c = b - this.startPos;
				a.onColumnSplitterMoved(this.cellIndex, this.cm
								.getColumnWidth(this.cellIndex)
								+ c);
				setTimeout(function() {
							a.headersDisabled = false
						}, 50)
			},
			autoOffset : function() {
				this.setDelta(0, 0)
			}
		});
Ext.grid.HeaderDragZone = Ext.extend(Ext.dd.DragZone, {
			maxDragWidth : 120,
			constructor : function(a, c, b) {
				this.grid = a;
				this.view = a.getView();
				this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
				Ext.grid.HeaderDragZone.superclass.constructor.call(this, c);
				if (b) {
					this.setHandleElId(Ext.id(c));
					this.setOuterHandleElId(Ext.id(b))
				}
				this.scroll = false
			},
			getDragData : function(c) {
				var a = Ext.lib.Event.getTarget(c);
				var b = this.view.findHeaderCell(a);
				if (b) {
					return {
						ddel : b.firstChild,
						header : b
					}
				}
				return false
			},
			onInitDrag : function(a) {
				this.view.headersDisabled = true;
				var b = this.dragData.ddel.cloneNode(true);
				b.id = Ext.id();
				b.style.width = Math.min(this.dragData.header.offsetWidth,
						this.maxDragWidth)
						+ "px";
				this.proxy.update(b);
				return true
			},
			afterValidDrop : function() {
				var a = this.view;
				setTimeout(function() {
							a.headersDisabled = false
						}, 50)
			},
			afterInvalidDrop : function() {
				var a = this.view;
				setTimeout(function() {
							a.headersDisabled = false
						}, 50)
			}
		});
Ext.grid.HeaderDropZone = Ext.extend(Ext.dd.DropZone, {
			proxyOffsets : [-4, -9],
			fly : Ext.Element.fly,
			constructor : function(a, c, b) {
				this.grid = a;
				this.view = a.getView();
				this.proxyTop = Ext.DomHelper.append(document.body, {
							cls : "col-move-top",
							html : "&#160;"
						}, true);
				this.proxyBottom = Ext.DomHelper.append(document.body, {
							cls : "col-move-bottom",
							html : "&#160;"
						}, true);
				this.proxyTop.hide = this.proxyBottom.hide = function() {
					this.setLeftTop(-100, -100);
					this.setStyle("visibility", "hidden")
				};
				this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
				Ext.grid.HeaderDropZone.superclass.constructor.call(this, a
								.getGridEl().dom)
			},
			getTargetFromEvent : function(c) {
				var a = Ext.lib.Event.getTarget(c);
				var b = this.view.findCellIndex(a);
				if (b !== false) {
					return this.view.getHeaderCell(b)
				}
			},
			nextVisible : function(c) {
				var b = this.view, a = this.grid.colModel;
				c = c.nextSibling;
				while (c) {
					if (!a.isHidden(b.getCellIndex(c))) {
						return c
					}
					c = c.nextSibling
				}
				return null
			},
			prevVisible : function(c) {
				var b = this.view, a = this.grid.colModel;
				c = c.prevSibling;
				while (c) {
					if (!a.isHidden(b.getCellIndex(c))) {
						return c
					}
					c = c.prevSibling
				}
				return null
			},
			positionIndicator : function(d, j, i) {
				var a = Ext.lib.Event.getPageX(i);
				var f = Ext.lib.Dom.getRegion(j.firstChild);
				var c, g, b = f.top + this.proxyOffsets[1];
				if ((f.right - a) <= (f.right - f.left) / 2) {
					c = f.right + this.view.borderWidth;
					g = "after"
				} else {
					c = f.left;
					g = "before"
				}
				if (this.grid.colModel.isFixed(this.view.getCellIndex(j))) {
					return false
				}
				c += this.proxyOffsets[0];
				this.proxyTop.setLeftTop(c, b);
				this.proxyTop.show();
				if (!this.bottomOffset) {
					this.bottomOffset = this.view.mainHd.getHeight()
				}
				this.proxyBottom.setLeftTop(c, b
								+ this.proxyTop.dom.offsetHeight
								+ this.bottomOffset);
				this.proxyBottom.show();
				return g
			},
			onNodeEnter : function(d, a, c, b) {
				if (b.header != d) {
					this.positionIndicator(b.header, d, c)
				}
			},
			onNodeOver : function(f, b, d, c) {
				var a = false;
				if (c.header != f) {
					a = this.positionIndicator(c.header, f, d)
				}
				if (!a) {
					this.proxyTop.hide();
					this.proxyBottom.hide()
				}
				return a ? this.dropAllowed : this.dropNotAllowed
			},
			onNodeOut : function(d, a, c, b) {
				this.proxyTop.hide();
				this.proxyBottom.hide()
			},
			onNodeDrop : function(b, l, f, c) {
				var d = c.header;
				if (d != b) {
					var j = this.grid.colModel;
					var i = Ext.lib.Event.getPageX(f);
					var a = Ext.lib.Dom.getRegion(b.firstChild);
					var m = (a.right - i) <= ((a.right - a.left) / 2)
							? "after"
							: "before";
					var g = this.view.getCellIndex(d);
					var k = this.view.getCellIndex(b);
					if (m == "after") {
						k++
					}
					if (g < k) {
						k--
					}
					j.moveColumn(g, k);
					return true
				}
				return false
			}
		});
Ext.grid.GridView.ColumnDragZone = Ext.extend(Ext.grid.HeaderDragZone, {
			constructor : function(a, b) {
				Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(
						this, a, b, null);
				this.proxy.el.addClass("x-grid3-col-dd")
			},
			handleMouseDown : function(a) {
			},
			callHandleMouseDown : function(a) {
				Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown
						.call(this, a)
			}
		});
Ext.grid.SplitDragZone = Ext.extend(Ext.dd.DDProxy, {
			fly : Ext.Element.fly,
			constructor : function(a, c, b) {
				this.grid = a;
				this.view = a.getView();
				this.proxy = this.view.resizeProxy;
				Ext.grid.SplitDragZone.superclass.constructor.call(this, c,
						"gridSplitters" + this.grid.getGridEl().id, {
							dragElId : Ext.id(this.proxy.dom),
							resizeFrame : false
						});
				this.setHandleElId(Ext.id(c));
				this.setOuterHandleElId(Ext.id(b));
				this.scroll = false
			},
			b4StartDrag : function(a, d) {
				this.view.headersDisabled = true;
				this.proxy.setHeight(this.view.mainWrap.getHeight());
				var b = this.cm.getColumnWidth(this.cellIndex);
				var c = Math.max(b - this.grid.minColumnWidth, 0);
				this.resetConstraints();
				this.setXConstraint(c, 1000);
				this.setYConstraint(0, 0);
				this.minX = a - c;
				this.maxX = a + 1000;
				this.startPos = a;
				Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, d)
			},
			handleMouseDown : function(c) {
				var b = Ext.EventObject.setEvent(c);
				var a = this.fly(b.getTarget());
				if (a.hasClass("x-grid-split")) {
					this.cellIndex = this.view.getCellIndex(a.dom);
					this.split = a.dom;
					this.cm = this.grid.colModel;
					if (this.cm.isResizable(this.cellIndex)
							&& !this.cm.isFixed(this.cellIndex)) {
						Ext.grid.SplitDragZone.superclass.handleMouseDown
								.apply(this, arguments)
					}
				}
			},
			endDrag : function(c) {
				this.view.headersDisabled = false;
				var a = Math.max(this.minX, Ext.lib.Event.getPageX(c));
				var b = a - this.startPos;
				this.view.onColumnSplitterMoved(this.cellIndex, this.cm
								.getColumnWidth(this.cellIndex)
								+ b)
			},
			autoOffset : function() {
				this.setDelta(0, 0)
			}
		});
Ext.grid.GridDragZone = function(b, a) {
	this.view = b.getView();
	Ext.grid.GridDragZone.superclass.constructor.call(this,
			this.view.mainBody.dom, a);
	this.scroll = false;
	this.grid = b;
	this.ddel = document.createElement("div");
	this.ddel.className = "x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone, Ext.dd.DragZone, {
			ddGroup : "GridDD",
			getDragData : function(b) {
				var a = Ext.lib.Event.getTarget(b);
				var d = this.view.findRowIndex(a);
				if (d !== false) {
					var c = this.grid.selModel;
					if (!c.isSelected(d) || b.hasModifier()) {
						c.handleMouseDown(this.grid, d, b)
					}
					return {
						grid : this.grid,
						ddel : this.ddel,
						rowIndex : d,
						selections : c.getSelections()
					}
				}
				return false
			},
			onInitDrag : function(b) {
				var a = this.dragData;
				this.ddel.innerHTML = this.grid.getDragDropText();
				this.proxy.update(this.ddel)
			},
			afterRepair : function() {
				this.dragging = false
			},
			getRepairXY : function(b, a) {
				return false
			},
			onEndDrag : function(a, b) {
			},
			onValidDrop : function(a, b, c) {
				this.hideProxy()
			},
			beforeInvalidDrop : function(a, b) {
			}
		});
Ext.grid.ColumnModel = Ext.extend(Ext.util.Observable, {
	defaultWidth : 100,
	defaultSortable : false,
	constructor : function(a) {
		if (a.columns) {
			Ext.apply(this, a);
			this.setConfig(a.columns, true)
		} else {
			this.setConfig(a, true)
		}
		this.addEvents("widthchange", "headerchange", "hiddenchange",
				"columnmoved", "configchange");
		Ext.grid.ColumnModel.superclass.constructor.call(this)
	},
	getColumnId : function(a) {
		return this.config[a].id
	},
	getColumnAt : function(a) {
		return this.config[a]
	},
	setConfig : function(d, b) {
		var e, g, a;
		if (!b) {
			delete this.totalWidth;
			for (e = 0, a = this.config.length; e < a; e++) {
				g = this.config[e];
				if (g.editor) {
					g.editor.destroy()
				}
			}
		}
		this.defaults = Ext.apply({
					width : this.defaultWidth,
					sortable : this.defaultSortable
				}, this.defaults);
		this.config = d;
		this.lookup = {};
		for (e = 0, a = d.length; e < a; e++) {
			g = Ext.applyIf(d[e], this.defaults);
			if (typeof g.id == "undefined") {
				g.id = e
			}
			if (!g.isColumn) {
				var f = Ext.grid.Column.types[g.xtype || "gridcolumn"];
				g = new f(g);
				d[e] = g
			}
			this.lookup[g.id] = g
		}
		if (!b) {
			this.fireEvent("configchange", this)
		}
	},
	getColumnById : function(a) {
		return this.lookup[a]
	},
	getIndexById : function(c) {
		for (var b = 0, a = this.config.length; b < a; b++) {
			if (this.config[b].id == c) {
				return b
			}
		}
		return -1
	},
	moveColumn : function(d, a) {
		var b = this.config[d];
		this.config.splice(d, 1);
		this.config.splice(a, 0, b);
		this.dataMap = null;
		this.fireEvent("columnmoved", this, d, a)
	},
	getColumnCount : function(d) {
		if (d === true) {
			var e = 0;
			for (var b = 0, a = this.config.length; b < a; b++) {
				if (!this.isHidden(b)) {
					e++
				}
			}
			return e
		}
		return this.config.length
	},
	getColumnsBy : function(e, d) {
		var f = [];
		for (var b = 0, a = this.config.length; b < a; b++) {
			var g = this.config[b];
			if (e.call(d || this, g, b) === true) {
				f[f.length] = g
			}
		}
		return f
	},
	isSortable : function(a) {
		return !!this.config[a].sortable
	},
	isMenuDisabled : function(a) {
		return !!this.config[a].menuDisabled
	},
	getRenderer : function(a) {
		if (!this.config[a].renderer) {
			return Ext.grid.ColumnModel.defaultRenderer
		}
		return this.config[a].renderer
	},
	getRendererScope : function(a) {
		return this.config[a].scope
	},
	setRenderer : function(a, b) {
		this.config[a].renderer = b
	},
	getColumnWidth : function(a) {
		return this.config[a].width
	},
	setColumnWidth : function(b, c, a) {
		this.config[b].width = c;
		this.totalWidth = null;
		if (!a) {
			this.fireEvent("widthchange", this, b, c)
		}
	},
	getTotalWidth : function(b) {
		if (!this.totalWidth) {
			this.totalWidth = 0;
			for (var c = 0, a = this.config.length; c < a; c++) {
				if (b || !this.isHidden(c)) {
					this.totalWidth += this.getColumnWidth(c)
				}
			}
		}
		return this.totalWidth
	},
	getColumnHeader : function(a) {
		return this.config[a].header
	},
	setColumnHeader : function(a, b) {
		this.config[a].header = b;
		this.fireEvent("headerchange", this, a, b)
	},
	getColumnTooltip : function(a) {
		return this.config[a].tooltip
	},
	setColumnTooltip : function(a, b) {
		this.config[a].tooltip = b
	},
	getDataIndex : function(a) {
		return this.config[a].dataIndex
	},
	setDataIndex : function(a, b) {
		this.config[a].dataIndex = b
	},
	findColumnIndex : function(d) {
		var e = this.config;
		for (var b = 0, a = e.length; b < a; b++) {
			if (e[b].dataIndex == d) {
				return b
			}
		}
		return -1
	},
	isCellEditable : function(a, b) {
		return (this.config[a].editable || (typeof this.config[a].editable == "undefined" && this.config[a].editor))
				? true
				: false
	},
	getCellEditor : function(a, b) {
		return this.config[a].getCellEditor(b)
	},
	setEditable : function(a, b) {
		this.config[a].editable = b
	},
	isHidden : function(a) {
		return !!this.config[a].hidden
	},
	isFixed : function(a) {
		return !!this.config[a].fixed
	},
	isResizable : function(a) {
		return a >= 0 && this.config[a].resizable !== false
				&& this.config[a].fixed !== true
	},
	setHidden : function(a, b) {
		var d = this.config[a];
		if (d.hidden !== b) {
			d.hidden = b;
			this.totalWidth = null;
			this.fireEvent("hiddenchange", this, a, b)
		}
	},
	setEditor : function(a, b) {
		Ext.destroy(this.config[a].editor);
		this.config[a].editor = b
	},
	destroy : function() {
		for (var b = 0, d = this.config, a = d.length; b < a; b++) {
			Ext.destroy(d[b].editor)
		}
		this.purgeListeners()
	}
});
Ext.grid.ColumnModel.defaultRenderer = function(a) {
	if (typeof a == "string" && a.length < 1) {
		return "&#160;"
	}
	return a
};
Ext.grid.AbstractSelectionModel = Ext.extend(Ext.util.Observable, {
			constructor : function() {
				this.locked = false;
				Ext.grid.AbstractSelectionModel.superclass.constructor
						.call(this)
			},
			init : function(a) {
				this.grid = a;
				this.initEvents()
			},
			lock : function() {
				this.locked = true
			},
			unlock : function() {
				this.locked = false
			},
			isLocked : function() {
				return this.locked
			},
			destroy : function() {
				this.purgeListeners()
			}
		});
Ext.grid.RowSelectionModel = Ext.extend(Ext.grid.AbstractSelectionModel, {
	singleSelect : false,
	constructor : function(a) {
		Ext.apply(this, a);
		this.selections = new Ext.util.MixedCollection(false, function(b) {
					return b.id
				});
		this.last = false;
		this.lastActive = false;
		this.addEvents("selectionchange", "beforerowselect", "rowselect",
				"rowdeselect");
		Ext.grid.RowSelectionModel.superclass.constructor.call(this)
	},
	initEvents : function() {
		if (!this.grid.enableDragDrop && !this.grid.enableDrag) {
			this.grid.on("rowmousedown", this.handleMouseDown, this)
		}
		this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
					up : function(b) {
						if (!b.shiftKey || this.singleSelect) {
							this.selectPrevious(false)
						} else {
							if (this.last !== false
									&& this.lastActive !== false) {
								var a = this.last;
								this
										.selectRange(this.last, this.lastActive
														- 1);
								this.grid.getView().focusRow(this.lastActive);
								if (a !== false) {
									this.last = a
								}
							} else {
								this.selectFirstRow()
							}
						}
					},
					down : function(b) {
						if (!b.shiftKey || this.singleSelect) {
							this.selectNext(false)
						} else {
							if (this.last !== false
									&& this.lastActive !== false) {
								var a = this.last;
								this
										.selectRange(this.last, this.lastActive
														+ 1);
								this.grid.getView().focusRow(this.lastActive);
								if (a !== false) {
									this.last = a
								}
							} else {
								this.selectFirstRow()
							}
						}
					},
					scope : this
				});
		this.grid.getView().on({
					scope : this,
					refresh : this.onRefresh,
					rowupdated : this.onRowUpdated,
					rowremoved : this.onRemove
				})
	},
	onRefresh : function() {
		var f = this.grid.store, b;
		var d = this.getSelections();
		this.clearSelections(true);
		for (var c = 0, a = d.length; c < a; c++) {
			var e = d[c];
			if ((b = f.indexOfId(e.id)) != -1) {
				this.selectRow(b, true)
			}
		}
		if (d.length != this.selections.getCount()) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRemove : function(a, b, c) {
		if (this.selections.remove(c) !== false) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRowUpdated : function(a, b, c) {
		if (this.isSelected(c)) {
			a.onRowSelect(b)
		}
	},
	selectRecords : function(b, e) {
		if (!e) {
			this.clearSelections()
		}
		var d = this.grid.store;
		for (var c = 0, a = b.length; c < a; c++) {
			this.selectRow(d.indexOf(b[c]), true)
		}
	},
	getCount : function() {
		return this.selections.length
	},
	selectFirstRow : function() {
		this.selectRow(0)
	},
	selectLastRow : function(a) {
		this.selectRow(this.grid.store.getCount() - 1, a)
	},
	selectNext : function(a) {
		if (this.hasNext()) {
			this.selectRow(this.last + 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	selectPrevious : function(a) {
		if (this.hasPrevious()) {
			this.selectRow(this.last - 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	hasNext : function() {
		return this.last !== false
				&& (this.last + 1) < this.grid.store.getCount()
	},
	hasPrevious : function() {
		return !!this.last
	},
	getSelections : function() {
		return [].concat(this.selections.items)
	},
	getSelected : function() {
		return this.selections.itemAt(0)
	},
	each : function(e, d) {
		var c = this.getSelections();
		for (var b = 0, a = c.length; b < a; b++) {
			if (e.call(d || this, c[b], b) === false) {
				return false
			}
		}
		return true
	},
	clearSelections : function(a) {
		if (this.isLocked()) {
			return
		}
		if (a !== true) {
			var c = this.grid.store;
			var b = this.selections;
			b.each(function(d) {
						this.deselectRow(c.indexOfId(d.id))
					}, this);
			b.clear()
		} else {
			this.selections.clear()
		}
		this.last = false
	},
	selectAll : function() {
		if (this.isLocked()) {
			return
		}
		this.selections.clear();
		for (var b = 0, a = this.grid.store.getCount(); b < a; b++) {
			this.selectRow(b, true)
		}
	},
	hasSelection : function() {
		return this.selections.length > 0
	},
	isSelected : function(a) {
		var b = Ext.isNumber(a) ? this.grid.store.getAt(a) : a;
		return (b && this.selections.key(b.id) ? true : false)
	},
	isIdSelected : function(a) {
		return (this.selections.key(a) ? true : false)
	},
	handleMouseDown : function(d, h, f) {
		if (f.button !== 0 || this.isLocked()) {
			return
		}
		var a = this.grid.getView();
		if (f.shiftKey && !this.singleSelect && this.last !== false) {
			var c = this.last;
			this.selectRange(c, h, f.ctrlKey);
			this.last = c;
			a.focusRow(h)
		} else {
			var b = this.isSelected(h);
			if (f.ctrlKey && b) {
				this.deselectRow(h)
			} else {
				if (!b || this.getCount() > 1) {
					this.selectRow(h, f.ctrlKey || f.shiftKey);
					a.focusRow(h)
				}
			}
		}
	},
	selectRows : function(c, d) {
		if (!d) {
			this.clearSelections()
		}
		for (var b = 0, a = c.length; b < a; b++) {
			this.selectRow(c[b], true)
		}
	},
	selectRange : function(b, a, d) {
		var c;
		if (this.isLocked()) {
			return
		}
		if (!d) {
			this.clearSelections()
		}
		if (b <= a) {
			for (c = b; c <= a; c++) {
				this.selectRow(c, true)
			}
		} else {
			for (c = b; c >= a; c--) {
				this.selectRow(c, true)
			}
		}
	},
	deselectRange : function(c, b, a) {
		if (this.isLocked()) {
			return
		}
		for (var d = c; d <= b; d++) {
			this.deselectRow(d, a)
		}
	},
	selectRow : function(b, d, a) {
		if (this.isLocked() || (b < 0 || b >= this.grid.store.getCount())
				|| (d && this.isSelected(b))) {
			return
		}
		var c = this.grid.store.getAt(b);
		if (c && this.fireEvent("beforerowselect", this, b, d, c) !== false) {
			if (!d || this.singleSelect) {
				this.clearSelections()
			}
			this.selections.add(c);
			this.last = this.lastActive = b;
			if (!a) {
				this.grid.getView().onRowSelect(b)
			}
			this.fireEvent("rowselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	deselectRow : function(b, a) {
		if (this.isLocked()) {
			return
		}
		if (this.last == b) {
			this.last = false
		}
		if (this.lastActive == b) {
			this.lastActive = false
		}
		var c = this.grid.store.getAt(b);
		if (c) {
			this.selections.remove(c);
			if (!a) {
				this.grid.getView().onRowDeselect(b)
			}
			this.fireEvent("rowdeselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	restoreLast : function() {
		if (this._last) {
			this.last = this._last
		}
	},
	acceptsNav : function(c, b, a) {
		return !a.isHidden(b) && a.isCellEditable(b, c)
	},
	onEditorKey : function(m, j) {
		var d = j.getKey(), f, h = this.grid, n = h.lastEdit, i = h.activeEditor, o, n, a, l;
		var b = j.shiftKey;
		if (d == j.TAB) {
			j.stopEvent();
			i.completeEdit();
			if (b) {
				f = h.walkCells(i.row, i.col - 1, -1, this.acceptsNav, this)
			} else {
				f = h.walkCells(i.row, i.col + 1, 1, this.acceptsNav, this)
			}
		} else {
			if (d == j.ENTER) {
				if (this.moveEditorOnEnter !== false) {
					if (b) {
						f = h.walkCells(n.row - 1, n.col, -1, this.acceptsNav,
								this)
					} else {
						f = h.walkCells(n.row + 1, n.col, 1, this.acceptsNav,
								this)
					}
				}
			}
		}
		if (f) {
			a = f[0];
			l = f[1];
			if (n.row != a) {
				this.selectRow(a)
			}
			if (h.isEditor && h.editing) {
				o = h.activeEditor;
				if (o && o.field.triggerBlur) {
					o.field.triggerBlur()
				}
			}
			h.startEditing(a, l)
		}
	},
	destroy : function() {
		if (this.rowNav) {
			this.rowNav.disable();
			this.rowNav = null
		}
		Ext.grid.RowSelectionModel.superclass.destroy.call(this)
	}
});
Ext.grid.Column = Ext.extend(Object, {
			isColumn : true,
			constructor : function(a) {
				Ext.apply(this, a);
				if (Ext.isString(this.renderer)) {
					this.renderer = Ext.util.Format[this.renderer]
				} else {
					if (Ext.isObject(this.renderer)) {
						this.scope = this.renderer.scope;
						this.renderer = this.renderer.fn
					}
				}
				if (!this.scope) {
					this.scope = this
				}
				if (this.editor) {
					this.editor = Ext.create(this.editor, "textfield")
				}
			},
			renderer : function(a) {
				if (Ext.isString(a) && a.length < 1) {
					return "&#160;"
				}
				return a
			},
			getEditor : function(a) {
				return this.editable !== false ? this.editor : null
			},
			getCellEditor : function(b) {
				var a = this.getEditor(b);
				if (a) {
					if (!a.startEdit) {
						if (!a.gridEditor) {
							a.gridEditor = new Ext.grid.GridEditor(a)
						}
						return a.gridEditor
					} else {
						if (a.startEdit) {
							return a
						}
					}
				}
				return null
			}
		});
Ext.grid.BooleanColumn = Ext.extend(Ext.grid.Column, {
			trueText : "true",
			falseText : "false",
			undefinedText : "&#160;",
			constructor : function(a) {
				Ext.grid.BooleanColumn.superclass.constructor.call(this, a);
				var c = this.trueText, d = this.falseText, b = this.undefinedText;
				this.renderer = function(e) {
					if (e === undefined) {
						return b
					}
					if (!e || e === "false") {
						return d
					}
					return c
				}
			}
		});
Ext.grid.NumberColumn = Ext.extend(Ext.grid.Column, {
			format : "0,000.00",
			constructor : function(a) {
				Ext.grid.NumberColumn.superclass.constructor.call(this, a);
				this.renderer = Ext.util.Format.numberRenderer(this.format)
			}
		});
Ext.grid.DateColumn = Ext.extend(Ext.grid.Column, {
			format : "m/d/Y",
			constructor : function(a) {
				Ext.grid.DateColumn.superclass.constructor.call(this, a);
				this.renderer = Ext.util.Format.dateRenderer(this.format)
			}
		});
Ext.grid.TemplateColumn = Ext.extend(Ext.grid.Column, {
			constructor : function(a) {
				Ext.grid.TemplateColumn.superclass.constructor.call(this, a);
				var b = (!Ext.isPrimitive(this.tpl) && this.tpl.compile)
						? this.tpl
						: new Ext.XTemplate(this.tpl);
				this.renderer = function(d, e, c) {
					return b.apply(c.data)
				};
				this.tpl = b
			}
		});
Ext.grid.Column.types = {
	gridcolumn : Ext.grid.Column,
	booleancolumn : Ext.grid.BooleanColumn,
	numbercolumn : Ext.grid.NumberColumn,
	datecolumn : Ext.grid.DateColumn,
	templatecolumn : Ext.grid.TemplateColumn
};
Ext.grid.RowNumberer = Ext.extend(Object, {
			header : "",
			width : 23,
			sortable : false,
			constructor : function(a) {
				Ext.apply(this, a);
				if (this.rowspan) {
					this.renderer = this.renderer.createDelegate(this)
				}
			},
			fixed : true,
			menuDisabled : true,
			dataIndex : "",
			id : "numberer",
			rowspan : undefined,
			renderer : function(b, c, a, d) {
				if (this.rowspan) {
					c.cellAttr = 'rowspan="' + this.rowspan + '"'
				}
				return d + 1
			}
		});
Ext.grid.CheckboxSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {
			header : '<div class="x-grid3-hd-checker">&#160;</div>',
			width : 20,
			sortable : false,
			menuDisabled : true,
			fixed : true,
			dataIndex : "",
			id : "checker",
			constructor : function() {
				Ext.grid.CheckboxSelectionModel.superclass.constructor.apply(
						this, arguments);
				if (this.checkOnly) {
					this.handleMouseDown = Ext.emptyFn
				}
			},
			initEvents : function() {
				Ext.grid.CheckboxSelectionModel.superclass.initEvents
						.call(this);
				this.grid.on("render", function() {
							var a = this.grid.getView();
							a.mainBody.on("mousedown", this.onMouseDown, this);
							Ext.fly(a.innerHd).on("mousedown",
									this.onHdMouseDown, this)
						}, this)
			},
			onMouseDown : function(c, b) {
				if (c.button === 0 && b.className == "x-grid3-row-checker") {
					c.stopEvent();
					var d = c.getTarget(".x-grid3-row");
					if (d) {
						var a = d.rowIndex;
						if (this.isSelected(a)) {
							this.deselectRow(a)
						} else {
							this.selectRow(a, true)
						}
					}
				}
			},
			onHdMouseDown : function(c, a) {
				if (a.className == "x-grid3-hd-checker") {
					c.stopEvent();
					var b = Ext.fly(a.parentNode);
					var d = b.hasClass("x-grid3-hd-checker-on");
					if (d) {
						b.removeClass("x-grid3-hd-checker-on");
						this.clearSelections()
					} else {
						b.addClass("x-grid3-hd-checker-on");
						this.selectAll()
					}
				}
			},
			renderer : function(b, c, a) {
				return '<div class="x-grid3-row-checker">&#160;</div>'
			}
		});