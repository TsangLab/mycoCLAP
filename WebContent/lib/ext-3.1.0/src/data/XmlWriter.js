/*
 * ! Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.data.XmlWriter
 * @extends Ext.data.DataWriter DataWriter extension for writing an array or
 *          single {@link Ext.data.Record} object(s) in preparation for
 *          executing a remote CRUD action via XML. XmlWriter uses an instance
 *          of {@link Ext.XTemplate} for maximum flexibility in defining your
 *          own custom XML schema if the default schema is not appropriate for
 *          your needs. See the {@link #tpl} configuration-property.
 */
Ext.data.XmlWriter = function(params) {
	Ext.data.XmlWriter.superclass.constructor.apply(this, arguments);
	// compile the XTemplate for rendering XML documents.
	this.tpl = (typeof(this.tpl) === 'string') ? new Ext.XTemplate(this.tpl)
			.compile() : this.tpl.compile();
};
Ext.extend(Ext.data.XmlWriter, Ext.data.DataWriter, {
	/**
	 * @cfg {String} documentRoot [xrequest] (Optional) The name of the XML
	 *      document root-node. <b>Note:</b> this parameter is required
	 *      </b>only when</b> sending extra
	 *      {@link Ext.data.Store#baseParams baseParams} to the server during a
	 *      write-request -- if no baseParams are set, the
	 *      {@link Ext.data.XmlReader#record} meta-property can suffice as the
	 *      XML document root-node for write-actions involving just a <b>single
	 *      record</b>. For requests involving <b>multiple</b> records and
	 *      <b>NO</b> baseParams, the {@link Ext.data.XmlWriter#root} property
	 *      can act as the XML document root.
	 */
	documentRoot : 'xrequest',
	/**
	 * @cfg {Boolean} forceDocumentRoot [false] Set to <tt>true</tt> to force
	 *      XML documents having a root-node as defined by {@link #documentRoot},
	 *      even with no baseParams defined.
	 */
	forceDocumentRoot : false,
	/**
	 * @cfg {String} root [records] The name of the containing element which
	 *      will contain the nodes of an write-action involving <b>multiple</b>
	 *      records. Each xml-record written to the server will be wrapped in an
	 *      element named after {@link Ext.data.XmlReader#record} property. eg:
	 *      <code><pre>
	 * &lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
	 * 	&lt;user&gt;&lt;first&gt;Barney&lt;/first&gt;&lt;/user&gt;
	 * 	
	 * </code></pre>
	 * 
	 * However, when <b>multiple</b> records are written in a
	 *      batch-operation, these records must be wrapped in a containing
	 *      Element. eg: <code><pre>
	 * &lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
	 * 	&lt;records&gt;
	 * 	    &lt;first&gt;Barney&lt;/first&gt;&lt;/user&gt;
	 * 	    &lt;records&gt;&lt;first&gt;Barney&lt;/first&gt;&lt;/user&gt;
	 * 	&lt;/records&gt;
	 * 	
	 * </code></pre>
	 * 
	 * Defaults to <tt>records</tt>. Do not confuse the nature of this
	 *      property with that of {@link #documentRoot}
	 */
	root : 'records',
	/**
	 * @cfg {String} xmlVersion [1.0] The <tt>version</tt> written to header
	 *      of xml documents.
	 *      <code><pre>
	 * &lt;?xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-15&quot;?&gt;
	 * </pre></code>
	 */
	xmlVersion : '1.0',
	/**
	 * @cfg {String} xmlEncoding [ISO-8859-15] The <tt>encoding</tt> written
	 *      to header of xml documents.
	 *      <code><pre>
	 * &lt;?xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-15&quot;?&gt;
	 * </pre></code>
	 */
	xmlEncoding : 'ISO-8859-15',
	/**
	 * @cfg {String/Ext.XTemplate} tpl The XML template used to render
	 *      {@link Ext.data.Api#actions write-actions} to your server.
	 *      <p>
	 *      One can easily provide his/her own custom
	 *      {@link Ext.XTemplate#constructor template-definition} if the default
	 *      does not suffice.
	 *      </p>
	 *      <p>
	 *      Defaults to:
	 *      </p>
	 *      <code><pre>
	 * 	&lt;?xml version=&quot;{version}&quot; encoding=&quot;{encoding}&quot;?&gt;
	 * 	&lt;tpl if=&quot;documentRoot&quot;&gt;&lt;{documentRoot}&gt;
	 * 	&lt;tpl for=&quot;baseParams&quot;&gt;
	 * 	    &lt;tpl for=&quot;.&quot;&gt;
	 * 	        &lt;{name}&gt;{value}&lt;/{name}&gt;
	 * 	    &lt;/tpl&gt;
	 * 	&lt;/tpl&gt;
	 * 	&lt;tpl if=&quot;records.length &gt; 1&quot;&gt;&lt;{root}&gt;',
	 * 	&lt;tpl for=&quot;records&quot;&gt;
	 * 	    &lt;{parent.record}&gt;
	 * 	    &lt;tpl for=&quot;.&quot;&gt;
	 * 	        &lt;{name}&gt;{value}&lt;/{name}&gt;
	 * 	    &lt;/tpl&gt;
	 * 	    &lt;/{parent.record}&gt;
	 * 	&lt;/tpl&gt;
	 * 	&lt;tpl if=&quot;records.length &gt; 1&quot;&gt;&lt;/{root}&gt;&lt;/tpl&gt;
	 * 	&lt;tpl if=&quot;documentRoot&quot;&gt;&lt;/{documentRoot}&gt;&lt;/tpl&gt;
	 * 	
	 * </pre></code>
	 *      <p>
	 *      Templates will be called with the following API
	 *      </p>
	 *      <ul>
	 *      <li>{String} version [1.0] The xml version.</li>
	 *      <li>{String} encoding [ISO-8859-15] The xml encoding.</li>
	 *      <li>{String/false} documentRoot The XML document root-node name or
	 *      <tt>false</tt> if not required. See {@link #documentRoot} and
	 *      {@link #forceDocumentRoot}.</li>
	 *      <li>{String} record The meta-data parameter defined on your
	 *      {@link Ext.data.XmlReader#record} configuration represents the name
	 *      of the xml-tag containing each record.</li>
	 *      <li>{String} root The meta-data parameter defined by
	 *      {@link Ext.data.XmlWriter#root} configuration-parameter. Represents
	 *      the name of the xml root-tag when sending <b>multiple</b> records
	 *      to the server.</li>
	 *      <li>{Array} records The records being sent to the server, ie: the
	 *      subject of the write-action being performed. The records parameter
	 *      will be always be an array, even when only a single record is being
	 *      acted upon. Each item within the records array will contain an array
	 *      of field objects having the following properties:
	 *      <ul>
	 *      <li>{String} name The field-name of the record as defined by your
	 *      {@link Ext.data.Record#create Ext.data.Record definition}. The
	 *      "mapping" property will be used, otherwise it will match the "name"
	 *      property. Use this parameter to define the XML tag-name of the
	 *      property.</li>
	 *      <li>{Mixed} value The record value of the field enclosed within XML
	 *      tags specified by name property above.</li>
	 *      </ul>
	 *      </li>
	 *      <li>{Array} baseParams. The baseParams as defined upon
	 *      {@link Ext.data.Store#baseParams}. Note that the baseParams have
	 *      been converted into an array of [{name : "foo", value: "bar"}, ...]
	 *      pairs in the same manner as the <b>records</b> parameter above. See
	 *      {@link #documentRoot} and {@link #forceDocumentRoot}.</li>
	 *      </ul>
	 */
	// Break up encoding here in case it's being included by some kind of page
	// that will parse it (eg. PHP)
	tpl : '<tpl for="."><'
			+ '?xml version="{version}" encoding="{encoding}"?'
			+ '><tpl if="documentRoot"><{documentRoot}><tpl for="baseParams"><tpl for="."><{name}>{value}</{name}</tpl></tpl></tpl><tpl if="records.length&gt;1"><{root}></tpl><tpl for="records"><{parent.record}><tpl for="."><{name}>{value}</{name}></tpl></{parent.record}></tpl><tpl if="records.length&gt;1"></{root}></tpl><tpl if="documentRoot"></{documentRoot}></tpl></tpl>',

	/**
	 * XmlWriter implementation of the final stage of a write action.
	 * 
	 * @param {Object}
	 *            params Transport-proxy's (eg: {@link Ext.Ajax#request})
	 *            params-object to write-to.
	 * @param {Object}
	 *            baseParams as defined by {@link Ext.data.Store#baseParams}.
	 *            The baseParms must be encoded by the extending class, eg:
	 *            {@link Ext.data.JsonWriter}, {@link Ext.data.XmlWriter}.
	 * @param {Object/Object[]}
	 *            data Data-object representing the compiled Store-recordset.
	 */
	render : function(params, baseParams, data) {
		baseParams = this.toArray(baseParams);
		params.xmlData = this.tpl.applyTemplate({
			version : this.xmlVersion,
			encoding : this.xmlEncoding,
			documentRoot : (baseParams.length > 0 || this.forceDocumentRoot === true)
					? this.documentRoot
					: false,
			record : this.meta.record,
			root : this.root,
			baseParams : baseParams,
			records : (Ext.isArray(data[0])) ? data : [data]
		});
	},

	/**
	 * createRecord
	 * 
	 * @protected
	 * @param {Ext.data.Record}
	 *            rec
	 * @return {Array} Array of <tt>name:value</tt> pairs for attributes of
	 *         the {@link Ext.data.Record}. See
	 *         {@link Ext.data.DataWriter#toHash}.
	 */
	createRecord : function(rec) {
		return this.toArray(this.toHash(rec));
	},

	/**
	 * updateRecord
	 * 
	 * @protected
	 * @param {Ext.data.Record}
	 *            rec
	 * @return {Array} Array of {name:value} pairs for attributes of the
	 *         {@link Ext.data.Record}. See {@link Ext.data.DataWriter#toHash}.
	 */
	updateRecord : function(rec) {
		return this.toArray(this.toHash(rec));

	},
	/**
	 * destroyRecord
	 * 
	 * @protected
	 * @param {Ext.data.Record}
	 *            rec
	 * @return {Array} Array containing a attribute-object (name/value pair)
	 *         representing the
	 *         {@link Ext.data.DataReader#idProperty idProperty}.
	 */
	destroyRecord : function(rec) {
		var data = {};
		data[this.meta.idProperty] = rec.id;
		return this.toArray(data);
	}
});
