/*
 * ! Ext JS Library 3.1.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */

/**
 * @class Ext.data.Api
 * @extends Object Ext.data.Api is a singleton designed to manage the data API
 *          including methods for validating a developer's DataProxy API.
 *          Defines variables for CRUD actions create, read, update and destroy
 *          in addition to a mapping of RESTful HTTP methods GET, POST, PUT and
 *          DELETE to CRUD actions.
 * @singleton
 */
Ext.data.Api = (function() {

	// private validActions. validActions is essentially an inverted hash of
	// Ext.data.Api.actions, where value becomes the key.
	// Some methods in this singleton (e.g.: getActions, getVerb) will loop
	// through actions with the code <code>for (var verb in this.actions)</code>
	// For efficiency, some methods will first check this hash for a match.
	// Those methods which do acces validActions will cache their result here.
	// We cannot pre-define this hash since the developer may over-ride the
	// actions at runtime.
	var validActions = {};

	return {
		/**
		 * Defined actions corresponding to remote actions:
		 * 
		 * <pre><code>
		 * 		actions: {
		 * 		create  : 'create',  // Text representing the remote-action to create records on server.
		 * 		read    : 'read',    // Text representing the remote-action to read/load data from server.
		 * 		update  : 'update',  // Text representing the remote-action to update records on server.
		 * 		destroy : 'destroy'  // Text representing the remote-action to destroy records on server.
		 * 		}
		 * </code></pre>
		 * 
		 * @property actions
		 * @type Object
		 */
		actions : {
			create : 'create',
			read : 'read',
			update : 'update',
			destroy : 'destroy'
		},

		/**
		 * Defined {CRUD action}:{HTTP method} pairs to associate HTTP methods
		 * with the corresponding actions for
		 * {@link Ext.data.DataProxy#restful RESTful proxies}. Defaults to:
		 * 
		 * <pre><code>
		 * 		restActions : {
		 * 		create  : 'POST',
		 * 		read    : 'GET',
		 * 		update  : 'PUT',
		 * 		destroy : 'DELETE'
		 * 		},
		 * </code></pre>
		 */
		restActions : {
			create : 'POST',
			read : 'GET',
			update : 'PUT',
			destroy : 'DELETE'
		},

		/**
		 * Returns true if supplied action-name is a valid API action defined in
		 * <code>{@link #actions}</code> constants
		 * 
		 * @param {String}
		 *            action
		 * @param {String[]}(Optional)
		 *            List of available CRUD actions. Pass in list when
		 *            executing multiple times for efficiency.
		 * @return {Boolean}
		 */
		isAction : function(action) {
			return (Ext.data.Api.actions[action]) ? true : false;
		},

		/**
		 * Returns the actual CRUD action KEY "create", "read", "update" or
		 * "destroy" from the supplied action-name. This method is used
		 * internally and shouldn't generally need to be used directly. The
		 * key/value pair of Ext.data.Api.actions will often be identical but
		 * this is not necessarily true. A developer can override this naming
		 * convention if desired. However, the framework internally calls
		 * methods based upon the KEY so a way of retreiving the the words
		 * "create", "read", "update" and "destroy" is required. This method
		 * will cache discovered KEYS into the private validActions hash.
		 * 
		 * @param {String}
		 *            name The runtime name of the action.
		 * @return {String||null} returns the action-key, or verb of the
		 *         user-action or null if invalid.
		 * @nodoc
		 */
		getVerb : function(name) {
			if (validActions[name]) {
				return validActions[name]; // <-- found in cache. return
											// immediately.
			}
			for (var verb in this.actions) {
				if (this.actions[verb] === name) {
					validActions[name] = verb;
					break;
				}
			}
			return (validActions[name] !== undefined)
					? validActions[name]
					: null;
		},

		/**
		 * Returns true if the supplied API is valid; that is, check that all
		 * keys match defined actions otherwise returns an array of mistakes.
		 * 
		 * @return {String[]||true}
		 */
		isValid : function(api) {
			var invalid = [];
			var crud = this.actions; // <-- cache a copy of the actions.
			for (var action in api) {
				if (!(action in crud)) {
					invalid.push(action);
				}
			}
			return (!invalid.length) ? true : invalid;
		},

		/**
		 * Returns true if the supplied verb upon the supplied proxy points to a
		 * unique url in that none of the other api-actions point to the same
		 * url. The question is important for deciding whether to insert the
		 * "xaction" HTTP parameter within an Ajax request. This method is used
		 * internally and shouldn't generally need to be called directly.
		 * 
		 * @param {Ext.data.DataProxy}
		 *            proxy
		 * @param {String}
		 *            verb
		 * @return {Boolean}
		 */
		hasUniqueUrl : function(proxy, verb) {
			var url = (proxy.api[verb]) ? proxy.api[verb].url : null;
			var unique = true;
			for (var action in proxy.api) {
				if ((unique = (action === verb)
						? true
						: (proxy.api[action].url != url) ? true : false) === false) {
					break;
				}
			}
			return unique;
		},

		/**
		 * This method is used internally by
		 * <tt>{@link Ext.data.DataProxy DataProxy}</tt> and should not
		 * generally need to be used directly. Each action of a DataProxy api
		 * can be initially defined as either a String or an Object. When
		 * specified as an object, one can explicitly define the HTTP method
		 * (GET|POST) to use for each CRUD action. This method will prepare the
		 * supplied API, setting each action to the Object form. If your
		 * API-actions do not explicitly define the HTTP method, the "method"
		 * configuration-parameter will be used. If the method configuration
		 * parameter is not specified, POST will be used.
		 * 
		 * <pre><code>
		 * new Ext.data.HttpProxy({
		 * 			method : &quot;POST&quot;, // &lt;-- default HTTP method when not specified.
		 * 			api : {
		 * 				create : 'create.php',
		 * 				load : 'read.php',
		 * 				save : 'save.php',
		 * 				destroy : 'destroy.php'
		 * 			}
		 * 		});
		 * 
		 * // Alternatively, one can use the object-form to specify the API
		 * new Ext.data.HttpProxy({
		 * 			api : {
		 * 				load : {
		 * 					url : 'read.php',
		 * 					method : 'GET'
		 * 				},
		 * 				create : 'create.php',
		 * 				destroy : 'destroy.php',
		 * 				save : 'update.php'
		 * 			}
		 * 		});
		 * </code></pre>
		 * 
		 * @param {Ext.data.DataProxy}
		 *            proxy
		 */
		prepare : function(proxy) {
			if (!proxy.api) {
				proxy.api = {}; // <-- No api? create a blank one.
			}
			for (var verb in this.actions) {
				var action = this.actions[verb];
				proxy.api[action] = proxy.api[action] || proxy.url
						|| proxy.directFn;
				if (typeof(proxy.api[action]) == 'string') {
					proxy.api[action] = {
						url : proxy.api[action],
						method : (proxy.restful === true)
								? Ext.data.Api.restActions[action]
								: undefined
					};
				}
			}
		},

		/**
		 * Prepares a supplied Proxy to be RESTful. Sets the HTTP method for
		 * each api-action to be one of GET, POST, PUT, DELETE according to the
		 * defined {@link #restActions}.
		 * 
		 * @param {Ext.data.DataProxy}
		 *            proxy
		 */
		restify : function(proxy) {
			proxy.restful = true;
			for (var verb in this.restActions) {
				proxy.api[this.actions[verb]].method = this.restActions[verb];
			}
			// TODO: perhaps move this interceptor elsewhere? like into
			// DataProxy, perhaps? Placed here
			// to satisfy initial 3.0 final release of REST features.
			proxy.onWrite = proxy.onWrite.createInterceptor(function(action, o,
							response, rs) {
						var reader = o.reader;
						var res = new Ext.data.Response({
									action : action,
									raw : response
								});

						switch (response.status) {
							case 200 : // standard 200 response, send control
										// back to HttpProxy#onWrite by
										// returning true from this intercepted
										// #onWrite
								return true;
								break;
							case 201 : // entity created but no response
										// returned
								res.success = true;
								break;
							case 204 : // no-content. Create a fake response.
								res.success = true;
								res.data = null;
								break;
							default :
								return true;
								break;
						}
						if (res.success === true) {
							this.fireEvent("write", this, action, res.data,
									res, rs, o.request.arg);
						} else {
							this.fireEvent('exception', this, 'remote', action,
									o, res, rs);
						}
						o.request.callback.call(o.request.scope, res.data, res,
								res.success);

						return false; // <-- false to prevent intercepted
										// function from running.
					}, proxy);
		}
	};
})();

/**
 * Ext.data.Response Experimental. Do not use directly.
 */
Ext.data.Response = function(params, response) {
	Ext.apply(this, params, {
				raw : response
			});
};
Ext.data.Response.prototype = {
	message : null,
	success : false,
	status : null,
	root : null,
	raw : null,

	getMessage : function() {
		return this.message;
	},
	getSuccess : function() {
		return this.success;
	},
	getStatus : function() {
		return this.status
	},
	getRoot : function() {
		return this.root;
	},
	getRawResponse : function() {
		return this.raw;
	}
};

/**
 * @class Ext.data.Api.Error
 * @extends Ext.Error Error class for Ext.data.Api errors
 */
Ext.data.Api.Error = Ext.extend(Ext.Error, {
			constructor : function(message, arg) {
				this.arg = arg;
				Ext.Error.call(this, message);
			},
			name : 'Ext.data.Api'
		});
Ext.apply(Ext.data.Api.Error.prototype, {
	lang : {
		'action-url-undefined' : 'No fallback url defined for this action.  When defining a DataProxy api, please be sure to define an url for each CRUD action in Ext.data.Api.actions or define a default url in addition to your api-configuration.',
		'invalid' : 'received an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions defined in Ext.data.Api.actions',
		'invalid-url' : 'Invalid url.  Please review your proxy configuration.',
		'execute' : 'Attempted to execute an unknown action.  Valid API actions are defined in Ext.data.Api.actions"'
	}
});
