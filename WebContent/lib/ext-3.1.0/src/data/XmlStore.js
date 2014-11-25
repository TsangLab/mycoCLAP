/*
 * ! Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.data.XmlStore
 * @extends Ext.data.Store
 *          <p>
 *          Small helper class to make creating {@link Ext.data.Store}s from
 *          XML data easier. A XmlStore will be automatically configured with a
 *          {@link Ext.data.XmlReader}.
 *          </p>
 *          <p>
 *          A store configuration would be something like:
 * 
 * <pre><code>
 *  var store = new Ext.data.XmlStore({
 *  // store configs
 *  autoDestroy: true,
 *  storeId: 'myStore',
 *  url: 'sheldon.xml', // automatically configures a HttpProxy
 *  // reader configs
 *  record: 'Item', // records will have an &quot;Item&quot; tag
 *  idPath: 'ASIN',
 *  totalRecords: '@TotalResults'
 *  fields: [
 *  // set up the fields mapping into the xml doc
 *  // The first needs mapping, the others are very basic
 *  {name: 'Author', mapping: 'ItemAttributes &gt; Author'},
 *  'Title', 'Manufacturer', 'ProductGroup'
 *  ]
 *  });
 * </code></pre>
 * 
 * </p>
 *          <p>
 *          This store is configured to consume a returned object of the form:
 * 
 * <pre><code>
 *  &amp;#60?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
 *  &amp;#60ItemSearchResponse xmlns=&quot;http://webservices.amazon.com/AWSECommerceService/2009-05-15&quot;&gt;
 *  &amp;#60Items&gt;
 *  &amp;#60Request&gt;
 *  &amp;#60IsValid&gt;True&amp;#60/IsValid&gt;
 *  &amp;#60ItemSearchRequest&gt;
 *  &amp;#60Author&gt;Sidney Sheldon&amp;#60/Author&gt;
 *  &amp;#60SearchIndex&gt;Books&amp;#60/SearchIndex&gt;
 *  &amp;#60/ItemSearchRequest&gt;
 *  &amp;#60/Request&gt;
 *  &amp;#60TotalResults&gt;203&amp;#60/TotalResults&gt;
 *  &amp;#60TotalPages&gt;21&amp;#60/TotalPages&gt;
 *  &amp;#60Item&gt;
 *  &amp;#60ASIN&gt;0446355453&amp;#60/ASIN&gt;
 *  &amp;#60DetailPageURL&gt;
 *  http://www.amazon.com/
 *  &amp;#60/DetailPageURL&gt;
 *  &amp;#60ItemAttributes&gt;
 *  &amp;#60Author&gt;Sidney Sheldon&amp;#60/Author&gt;
 *  &amp;#60Manufacturer&gt;Warner Books&amp;#60/Manufacturer&gt;
 *  &amp;#60ProductGroup&gt;Book&amp;#60/ProductGroup&gt;
 *  &amp;#60Title&gt;Master of the Game&amp;#60/Title&gt;
 *  &amp;#60/ItemAttributes&gt;
 *  &amp;#60/Item&gt;
 *  &amp;#60/Items&gt;
 *  &amp;#60/ItemSearchResponse&gt;
 * </code></pre>
 * 
 * An object literal of this form could also be used as the
 *          {@link #data} config option.
 *          </p>
 *          <p>
 *          <b>Note:</b> Although not listed here, this class accepts all of
 *          the configuration options of <b>{@link Ext.data.XmlReader XmlReader}</b>.
 *          </p>
 * @constructor
 * @param {Object}
 *            config
 * @xtype xmlstore
 */
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
			/**
			 * @cfg {Ext.data.DataReader} reader
			 * @hide
			 */
			constructor : function(config) {
				Ext.data.XmlStore.superclass.constructor.call(this, Ext.apply(
								config, {
									reader : new Ext.data.XmlReader(config)
								}));
			}
		});
Ext.reg('xmlstore', Ext.data.XmlStore);