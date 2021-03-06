(function ($$1) {
  'use strict';

  $$1 = $$1 && Object.prototype.hasOwnProperty.call($$1, 'default') ? $$1['default'] : $$1;

  /*
    All RULES must have a test and message property
    All test must return true if passed or false if failed.
    If test returns false the message will be available to log
    All test function can not be anonymous
    Rule = {
      message: string
      test: (value)=>{ return false || true }
    }
  */
  const Rules = {};
  const RULES = {};


  RULES.is = {};
  RULES.has = {};
  RULES.validate = {};

  // RULES FOR IS TYPE

  RULES.is.object = {
    message: 'The parameter is not an object type',
    test: function(value){
      if( Array.isArray(value) || typeof value !== 'object' ){ return false; }    return true;
    }
  };

  RULES.is.notDuplicateProperty = {
    message: 'The property already exist inside the object ',
    test: function(property,object){
      let test = this.rules.is.string(property);
      if(!test.passed){this.message = test.error; return false; }

      test = this.rules.is.object(object);
      if(!test.passed){ this.message = test.error; return false; }


      if(object[property] !== undefined ){
        return false
      }
      return true
    }
  };

  RULES.is.string = {
    message: 'The parameter is not a string type',
    test: function(value){
      if(typeof value !== 'string'){ return false; }
      return true;
    }
  };

  RULES.is.notEmpty = {
    message: 'The parameter is empty',
    test: function(value){
      if(value == '' || value == undefined){ return false; }
      return true;
    }
  };

  RULES.is.number = {
    message: 'The parameter is not a number type',
    test: function(value){
      if(typeof value !== 'number'){ return false; }
      return true;
    }
  };

  RULES.is.array = {
    message: 'The paramter is not an Array type',
    test: function(value){ return Array.isArray(value); }
  };

  RULES.is.instanceOf = {
    message: 'The object given is not an instance of',
    test: function(compare,against){
      let test = this.rules.is.object(compare);
      if(!test.passed){ this.message = test.error; return false; }

      test = this.rules.is.function(against);{
      if(!test.passed){ this.message = test.error; return false; }}

      if(!(compare instanceof against)){
        this.message = `${this.message} ${against.name}`;
        return false
      }

      return true
    }
  };

  RULES.is.instanceOfAny = {
    message: 'The object is not an instance of any of the following : ',
    test: function(compare,against){
      let test = undefined;
      let names = '';
      test = this.rules.is.array(against);{
      if(!test.passed){ this.message = test.error; return false; }}

      test = against.every(function(obj){
        names += obj.constructor.name+' ';
        return !this.rules.is.instanceOf(compare,obj).passed;
      }.bind(this));

      if(test){ this.message = `${this.message} ${names}`; }

      return !test;

    }
  };

  RULES.is.function = {
    message: 'The property is not a function',
    test: function(value){
      if(typeof value !== 'function'){ return false; }
      return true;
    }
  };

  RULES.is.greaterThan = {
    message: 'The value',
    test: function(check,against){
      this.message = 'The value';

      let test = this.rules.is.number(check);
      if(!test.passed){ this.message = test.error; return false; }

      test = this.rules.is.number(against);
      if(!test.passed){ this.message = test.error; return false; }

      if(check < against || check == against){
        this.message = `${this.message} ${check} is not greater than ${against}`;
        return false;
      }
      return true;
    }
  };

  RULES.is.lessThan = {
    message: 'The value',
    test: function(check,against){
      this.message = 'The value';
      
      let test = this.rules.is.number(check);
      if(!test.passed){ this.message = test.error; return false; }

      test = this.rules.is.number(against);
      if(!test.passed){ this.message = test.error; return false; }

      if(check > against || check == against){
        this.message = `${this.message} ${check} is not less than ${against}`;
        return false;
      }
      return true;
    }
  };

  RULES.is.htmlChildren = {
    message: 'The followin object does not posses an array property with HTMLElement instances ',
    test: function(children){
      if(!Array.isArray(children)){ return false }    if(children.some((child)=>{ return !(child instanceof HTMLElement) })){ return false }
      return true;
    }
  };

  RULES.is.defined = {
    message: 'The following property is not defined ',
    test: function(property,object){
      let test = this.rules.is.string(property);
      if(!test.passed){ this.message = test.error; return false; }

      test = this.rules.is.object(object);
      if(!test.passed){ this.message = test.error; return false; }

      if(object[property] === undefined ){ this.message += 'property'; return false; }
      return true;
    }
  };

  RULES.is.notEmptyArray = {
    message: 'The given array is empty',
    test: function(array){
      let test = this.rules.is.array(array);
      if(!test.passed){ this.message = test.error; return false; }

      return array.length != 0
    }
  };

  // RULES FOR HAS TYPE

  RULES.has.arrayLength = {
    message:'The array must have a length of ',
    test: function(array,length){
      let test = this.rules.is.array(array);
      if(!test.passed){ this.message = test.error; return false}

      test = this.rules.is.number(length);
      if(!test.passed){ this.message = test.error; return false}

      if(array.length !== length){ return false }
      return true
    }
  };

  RULES.has.properties = {
    message: 'The object does not have all of the following properties ',
    test: function(properties,object){
      let test = this.rules.is.object(object);
      if(!test.passed){ this.message = test.error; return false }

      test = this.rules.is.array(properties);
      if(!test.passed){ this.message = test.error; return false }

      (function(properties){

        properties.every(function(prop){
          test = this.rules.is.string(prop);
          return test.passed
        }.bind(this));

        return test;

      }.bind(this))(properties);

      if(!test.passed){ this.message = test.error; return false }


      if(properties.some((property)=>{ return object[property] === undefined })){
        properties.forEach(function(property){ this.message = this.message+property+' '; }.bind(this));
        return false;
      }
      return true;
    }
  };

  RULES.has.index = {
    message: 'The index is undefined for the given array.',
    test: function(array,index){
      let test = this.rules.is.array(array);
      if(!test.passed){ this.message = test.error; return false; }

      test = this.rules.is.number(index);
      if(!test.passed){ this.message = test.error; return false; }

      if(array[index] === undefined){ return false; }
      return true;
    }
  };

  for (let type in RULES) {
    for(let name in RULES[type]){
      let rule = RULES[type][name];
      if(Rules[type] == undefined){ Rules[type] = {}; }
      let context = { message: rule.message, rules: Rules };
      Rules[type][name] = function(){ return new Rule(context,rule,arguments) };
    }
  }

  function Rule(context,rule,args){
    this.passed = rule.test.apply(context,args);
    this.error = this.passed ? undefined : new Error(context.message);
  }

  function Test(tests){
    let test = undefined, rule = undefined, args = undefined;
    test = Rules.is.array(tests);
    if(!test.passed){ return test }  tests.every((check,i)=>{

      test = Rules.is.array(check);
      if(!test.passed){ return false; }

      test = Rules.has.arrayLength(check,2);
      if(!test.passed){ return false; }

      rule = check[0]; args = check[1];

      test = Rules.is.array(args);
      if(!test.passed){ return false; }

      test = Rules.is.function(rule);
      if(!test.passed){ return false; }

      rule = rule.apply(null,args);

      test = Rules.is.instanceOf(rule,Rule);
      if(!test.passed){ return false; }

      test = rule;

      return test.passed


    });

    return test
  }

  function Observer(events){
    const Events = {};
    let ID = 0;

    this.event = {
      create: (event)=>{
        let test = undefined;
    	  [
      		Rules.is.string(event),
      		Rules.is.notDuplicateProperty(event,Events)
    	  ].some((check)=>{ test = check ; return !test.passed; });

        if(!test.passed){ throw test.error; }
        Events[event] = [];
      },
      delete: (event)=>{
        let test = undefined ;
    	  [
      		Rules.is.string(event),
      		Rules.is.defined(event,Events)
    	  ].some((check)=>{ test = check; return !test.passed });

      	if(!test.passed){ throw test.error; }

        delete Events[event];
      },
      keys: ()=>{ return Object.keys(Events); },
      get: (event)=>{ return Events[event].map((e)=>{ return e.id }); },
      exist: (event)=>{ return this.event.keys().indexOf(event) != -1 }
    };

    this.notify = (event,update)=>{
      let test = Rules.is.defined(event,Events);
      if(!test.passed){ throw test.error; }
      Events[event].forEach((sub)=>{ sub.notify.apply(null,(update == undefined ? [] : update)); });
    };

    this.register = (event,subscriber)=>{
    	let test = Test([
        [Rules.is.defined,[event,Events]],
        [Rules.is.function,[subscriber]]
      ]);

      if(!test.passed){ throw test.error; }
      ID++;
      Events[event].push({id: ID, notify: subscriber});
      return ID;
    };

    this.unregister = (event,id)=>{
    	let test = undefined ;
  	  [
        Rules.is.defined(event,Events),
      ].some((check)=>{ test = check ; return !test.passed; });

  	  if(!test.passed){ throw test.error; }

      Events[event]  = Events[event].reduce((a,c)=>{
        if(c.id !== id){ a.push(c); }
        return a;

      },[]);
    };

    if(Rules.is.array(events).passed){
  	  events.forEach(this.event.create);
    }

  }

  function State(){
    const registered = {};
    const current = {
      state: undefined,
      value: undefined
    };

    const methods = {
      'register': {
        writable: false,
        value: ({state,on,off})=>{
          if(!registered[state]){ registered[state] = {on,off}; }
        },
      },
      'value': {
        set: (state)=>{
          if(registered[state]){
            if(current.state){ current.value.off(); }
            current.state = state;
            current.value = registered[state];
            current.value.on();
          }
        },
        get: ()=>{ return current.state }
      },
    };

    Object.defineProperties(this,methods);

  }

  function View({name,element}){
    const self = this;
    const state = new State();
    const display = (state)=>{ element[ state ? 'removeClass' : 'addClass' ]('hidden'); };
    const on = ()=>{ display(true); };
    const off = ()=>{ display(false); };
    const redefine = (prop,action)=>{
      return (fn)=>{
        Object.defineProperty(self,prop,{
          configurable: false,
          value: function(){ action(); fn.apply(null,arguments); }
        });
      }

    };

    const methods = {
      'state': {
        writable: false,
        value: state
      },
      'element': { get: ()=>{ return element } },
      'name':{ get: ()=>{ return name; } },
      'on':{
        configurable: true,
        get: ()=>{ return on },
        set: redefine('on',on)
      },
      'off':{
        configurable: true,
        get: ()=>{ return off },
        set: redefine('off',off)
      }
    };

    Object.defineProperties(this,methods);

  }

  var isarray = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };

  /**
   * Expose `pathToRegexp`.
   */
  var pathToRegexp_1 = pathToRegexp;
  var parse_1 = parse;
  var compile_1 = compile;
  var tokensToFunction_1 = tokensToFunction;
  var tokensToRegExp_1 = tokensToRegExp;

  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g');

  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = '';
    var res;

    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index, offset);
      index = offset + m.length;

      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1];
        continue
      }

      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path);
        path = '';
      }

      var prefix = res[2];
      var name = res[3];
      var capture = res[4];
      var group = res[5];
      var suffix = res[6];
      var asterisk = res[7];

      var repeat = suffix === '+' || suffix === '*';
      var optional = suffix === '?' || suffix === '*';
      var delimiter = prefix || '/';
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      });
    }

    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index);
    }

    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path);
    }

    return tokens
  }

  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }

  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length);

    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$');
      }
    }

    return function (obj) {
      var path = '';
      var data = obj || {};

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          path += token;

          continue
        }

        var value = data[token.name];
        var segment;

        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }

        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }

          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }

          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j]);

            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }

            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }

          continue
        }

        segment = encodeURIComponent(value);

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }

        path += token.prefix + segment;
      }

      return path
    }
  }

  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }

  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }

  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys;
    return re
  }

  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }

  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);

    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        });
      }
    }

    return attachKeys(path, keys)
  }

  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = [];

    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source);
    }

    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

    return attachKeys(regexp, keys)
  }

  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path);
    var re = tokensToRegExp(tokens, options);

    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i]);
      }
    }

    return attachKeys(re, keys)
  }

  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {};

    var strict = options.strict;
    var end = options.end !== false;
    var route = '';
    var lastToken = tokens[tokens.length - 1];
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        route += escapeString(token);
      } else {
        var prefix = escapeString(token.prefix);
        var capture = token.pattern;

        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*';
        }

        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?';
          } else {
            capture = '(' + capture + ')?';
          }
        } else {
          capture = prefix + '(' + capture + ')';
        }

        route += capture;
      }
    }

    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
    }

    if (end) {
      route += '$';
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)';
    }

    return new RegExp('^' + route, flags(options))
  }

  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || [];

    if (!isarray(keys)) {
      options = keys;
      keys = [];
    } else if (!options) {
      options = {};
    }

    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys)
    }

    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }

    return stringToRegexp(path, keys, options)
  }

  pathToRegexp_1.parse = parse_1;
  pathToRegexp_1.compile = compile_1;
  pathToRegexp_1.tokensToFunction = tokensToFunction_1;
  pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

  /**
     * Module dependencies.
     */

    

    /**
     * Short-cuts for global-object checks
     */

    var hasDocument = ('undefined' !== typeof document);
    var hasWindow = ('undefined' !== typeof window);
    var hasHistory = ('undefined' !== typeof history);
    var hasProcess = typeof process !== 'undefined';

    /**
     * Detect click event
     */
    var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

    /**
     * To work properly with the URL
     * history.location generated polyfill in https://github.com/devote/HTML5-History-API
     */

    var isLocation = hasWindow && !!(window.history.location || window.location);

    /**
     * The page instance
     * @api private
     */
    function Page() {
      // public things
      this.callbacks = [];
      this.exits = [];
      this.current = '';
      this.len = 0;

      // private things
      this._decodeURLComponents = true;
      this._base = '';
      this._strict = false;
      this._running = false;
      this._hashbang = false;

      // bound functions
      this.clickHandler = this.clickHandler.bind(this);
      this._onpopstate = this._onpopstate.bind(this);
    }

    /**
     * Configure the instance of page. This can be called multiple times.
     *
     * @param {Object} options
     * @api public
     */

    Page.prototype.configure = function(options) {
      var opts = options || {};

      this._window = opts.window || (hasWindow && window);
      this._decodeURLComponents = opts.decodeURLComponents !== false;
      this._popstate = opts.popstate !== false && hasWindow;
      this._click = opts.click !== false && hasDocument;
      this._hashbang = !!opts.hashbang;

      var _window = this._window;
      if(this._popstate) {
        _window.addEventListener('popstate', this._onpopstate, false);
      } else if(hasWindow) {
        _window.removeEventListener('popstate', this._onpopstate, false);
      }

      if (this._click) {
        _window.document.addEventListener(clickEvent, this.clickHandler, false);
      } else if(hasDocument) {
        _window.document.removeEventListener(clickEvent, this.clickHandler, false);
      }

      if(this._hashbang && hasWindow && !hasHistory) {
        _window.addEventListener('hashchange', this._onpopstate, false);
      } else if(hasWindow) {
        _window.removeEventListener('hashchange', this._onpopstate, false);
      }
    };

    /**
     * Get or set basepath to `path`.
     *
     * @param {string} path
     * @api public
     */

    Page.prototype.base = function(path) {
      if (0 === arguments.length) return this._base;
      this._base = path;
    };

    /**
     * Gets the `base`, which depends on whether we are using History or
     * hashbang routing.

     * @api private
     */
    Page.prototype._getBase = function() {
      var base = this._base;
      if(!!base) return base;
      var loc = hasWindow && this._window && this._window.location;

      if(hasWindow && this._hashbang && loc && loc.protocol === 'file:') {
        base = loc.pathname;
      }

      return base;
    };

    /**
     * Get or set strict path matching to `enable`
     *
     * @param {boolean} enable
     * @api public
     */

    Page.prototype.strict = function(enable) {
      if (0 === arguments.length) return this._strict;
      this._strict = enable;
    };


    /**
     * Bind with the given `options`.
     *
     * Options:
     *
     *    - `click` bind to click events [true]
     *    - `popstate` bind to popstate [true]
     *    - `dispatch` perform initial dispatch [true]
     *
     * @param {Object} options
     * @api public
     */

    Page.prototype.start = function(options) {
      var opts = options || {};
      this.configure(opts);

      if (false === opts.dispatch) return;
      this._running = true;

      var url;
      if(isLocation) {
        var window = this._window;
        var loc = window.location;

        if(this._hashbang && ~loc.hash.indexOf('#!')) {
          url = loc.hash.substr(2) + loc.search;
        } else if (this._hashbang) {
          url = loc.search + loc.hash;
        } else {
          url = loc.pathname + loc.search + loc.hash;
        }
      }

      this.replace(url, null, true, opts.dispatch);
    };

    /**
     * Unbind click and popstate event handlers.
     *
     * @api public
     */

    Page.prototype.stop = function() {
      if (!this._running) return;
      this.current = '';
      this.len = 0;
      this._running = false;

      var window = this._window;
      this._click && window.document.removeEventListener(clickEvent, this.clickHandler, false);
      hasWindow && window.removeEventListener('popstate', this._onpopstate, false);
      hasWindow && window.removeEventListener('hashchange', this._onpopstate, false);
    };

    /**
     * Show `path` with optional `state` object.
     *
     * @param {string} path
     * @param {Object=} state
     * @param {boolean=} dispatch
     * @param {boolean=} push
     * @return {!Context}
     * @api public
     */

    Page.prototype.show = function(path, state, dispatch, push) {
      var ctx = new Context(path, state, this),
        prev = this.prevContext;
      this.prevContext = ctx;
      this.current = ctx.path;
      if (false !== dispatch) this.dispatch(ctx, prev);
      if (false !== ctx.handled && false !== push) ctx.pushState();
      return ctx;
    };

    /**
     * Goes back in the history
     * Back should always let the current route push state and then go back.
     *
     * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
     * @param {Object=} state
     * @api public
     */

    Page.prototype.back = function(path, state) {
      var page = this;
      if (this.len > 0) {
        var window = this._window;
        // this may need more testing to see if all browsers
        // wait for the next tick to go back in history
        hasHistory && window.history.back();
        this.len--;
      } else if (path) {
        setTimeout(function() {
          page.show(path, state);
        });
      } else {
        setTimeout(function() {
          page.show(page._getBase(), state);
        });
      }
    };

    /**
     * Register route to redirect from one path to other
     * or just redirect to another route
     *
     * @param {string} from - if param 'to' is undefined redirects to 'from'
     * @param {string=} to
     * @api public
     */
    Page.prototype.redirect = function(from, to) {
      var inst = this;

      // Define route from a path to another
      if ('string' === typeof from && 'string' === typeof to) {
        page.call(this, from, function(e) {
          setTimeout(function() {
            inst.replace(/** @type {!string} */ (to));
          }, 0);
        });
      }

      // Wait for the push state and replace it with another
      if ('string' === typeof from && 'undefined' === typeof to) {
        setTimeout(function() {
          inst.replace(from);
        }, 0);
      }
    };

    /**
     * Replace `path` with optional `state` object.
     *
     * @param {string} path
     * @param {Object=} state
     * @param {boolean=} init
     * @param {boolean=} dispatch
     * @return {!Context}
     * @api public
     */


    Page.prototype.replace = function(path, state, init, dispatch) {
      var ctx = new Context(path, state, this),
        prev = this.prevContext;
      this.prevContext = ctx;
      this.current = ctx.path;
      ctx.init = init;
      ctx.save(); // save before dispatching, which may redirect
      if (false !== dispatch) this.dispatch(ctx, prev);
      return ctx;
    };

    /**
     * Dispatch the given `ctx`.
     *
     * @param {Context} ctx
     * @api private
     */

    Page.prototype.dispatch = function(ctx, prev) {
      var i = 0, j = 0, page = this;

      function nextExit() {
        var fn = page.exits[j++];
        if (!fn) return nextEnter();
        fn(prev, nextExit);
      }

      function nextEnter() {
        var fn = page.callbacks[i++];

        if (ctx.path !== page.current) {
          ctx.handled = false;
          return;
        }
        if (!fn) return unhandled.call(page, ctx);
        fn(ctx, nextEnter);
      }

      if (prev) {
        nextExit();
      } else {
        nextEnter();
      }
    };

    /**
     * Register an exit route on `path` with
     * callback `fn()`, which will be called
     * on the previous context when a new
     * page is visited.
     */
    Page.prototype.exit = function(path, fn) {
      if (typeof path === 'function') {
        return this.exit('*', path);
      }

      var route = new Route(path, null, this);
      for (var i = 1; i < arguments.length; ++i) {
        this.exits.push(route.middleware(arguments[i]));
      }
    };

    /**
     * Handle "click" events.
     */

    /* jshint +W054 */
    Page.prototype.clickHandler = function(e) {
      if (1 !== this._which(e)) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (e.defaultPrevented) return;

      // ensure link
      // use shadow dom when available if not, fall back to composedPath()
      // for browsers that only have shady
      var el = e.target;
      var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

      if(eventPath) {
        for (var i = 0; i < eventPath.length; i++) {
          if (!eventPath[i].nodeName) continue;
          if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
          if (!eventPath[i].href) continue;

          el = eventPath[i];
          break;
        }
      }

      // continue ensure link
      // el.nodeName for svg links are 'a' instead of 'A'
      while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
      if (!el || 'A' !== el.nodeName.toUpperCase()) return;

      // check if link is inside an svg
      // in this case, both href and target are always inside an object
      var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

      // Ignore if tag has
      // 1. "download" attribute
      // 2. rel="external" attribute
      if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

      // ensure non-hash for the same path
      var link = el.getAttribute('href');
      if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

      // Check for mailto: in the href
      if (link && link.indexOf('mailto:') > -1) return;

      // check target
      // svg target is an object and its desired value is in .baseVal property
      if (svg ? el.target.baseVal : el.target) return;

      // x-origin
      // note: svg links that are not relative don't call click events (and skip page.js)
      // consequently, all svg links tested inside page.js are relative and in the same origin
      if (!svg && !this.sameOrigin(el.href)) return;

      // rebuild path
      // There aren't .pathname and .search properties in svg links, so we use href
      // Also, svg href is an object and its desired value is in .baseVal property
      var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

      path = path[0] !== '/' ? '/' + path : path;

      // strip leading "/[drive letter]:" on NW.js on Windows
      if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
        path = path.replace(/^\/[a-zA-Z]:\//, '/');
      }

      // same page
      var orig = path;
      var pageBase = this._getBase();

      if (path.indexOf(pageBase) === 0) {
        path = path.substr(pageBase.length);
      }

      if (this._hashbang) path = path.replace('#!', '');

      if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
        return;
      }

      e.preventDefault();
      this.show(orig);
    };

    /**
     * Handle "populate" events.
     * @api private
     */

    Page.prototype._onpopstate = (function () {
      var loaded = false;
      if ( ! hasWindow ) {
        return function () {};
      }
      if (hasDocument && document.readyState === 'complete') {
        loaded = true;
      } else {
        window.addEventListener('load', function() {
          setTimeout(function() {
            loaded = true;
          }, 0);
        });
      }
      return function onpopstate(e) {
        if (!loaded) return;
        var page = this;
        if (e.state) {
          var path = e.state.path;
          page.replace(path, e.state);
        } else if (isLocation) {
          var loc = page._window.location;
          page.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
        }
      };
    })();

    /**
     * Event button.
     */
    Page.prototype._which = function(e) {
      e = e || (hasWindow && this._window.event);
      return null == e.which ? e.button : e.which;
    };

    /**
     * Convert to a URL object
     * @api private
     */
    Page.prototype._toURL = function(href) {
      var window = this._window;
      if(typeof URL === 'function' && isLocation) {
        return new URL(href, window.location.toString());
      } else if (hasDocument) {
        var anc = window.document.createElement('a');
        anc.href = href;
        return anc;
      }
    };

    /**
     * Check if `href` is the same origin.
     * @param {string} href
     * @api public
     */
    Page.prototype.sameOrigin = function(href) {
      if(!href || !isLocation) return false;

      var url = this._toURL(href);
      var window = this._window;

      var loc = window.location;

      /*
         When the port is the default http port 80 for http, or 443 for
         https, internet explorer 11 returns an empty string for loc.port,
         so we need to compare loc.port with an empty string if url.port
         is the default port 80 or 443.
         Also the comparition with `port` is changed from `===` to `==` because
         `port` can be a string sometimes. This only applies to ie11.
      */
      return loc.protocol === url.protocol &&
        loc.hostname === url.hostname &&
        (loc.port === url.port || loc.port === '' && (url.port == 80 || url.port == 443)); // jshint ignore:line
    };

    /**
     * @api private
     */
    Page.prototype._samePath = function(url) {
      if(!isLocation) return false;
      var window = this._window;
      var loc = window.location;
      return url.pathname === loc.pathname &&
        url.search === loc.search;
    };

    /**
     * Remove URL encoding from the given `str`.
     * Accommodates whitespace in both x-www-form-urlencoded
     * and regular percent-encoded form.
     *
     * @param {string} val - URL component to decode
     * @api private
     */
    Page.prototype._decodeURLEncodedURIComponent = function(val) {
      if (typeof val !== 'string') { return val; }
      return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
    };

    /**
     * Create a new `page` instance and function
     */
    function createPage() {
      var pageInstance = new Page();

      function pageFn(/* args */) {
        return page.apply(pageInstance, arguments);
      }

      // Copy all of the things over. In 2.0 maybe we use setPrototypeOf
      pageFn.callbacks = pageInstance.callbacks;
      pageFn.exits = pageInstance.exits;
      pageFn.base = pageInstance.base.bind(pageInstance);
      pageFn.strict = pageInstance.strict.bind(pageInstance);
      pageFn.start = pageInstance.start.bind(pageInstance);
      pageFn.stop = pageInstance.stop.bind(pageInstance);
      pageFn.show = pageInstance.show.bind(pageInstance);
      pageFn.back = pageInstance.back.bind(pageInstance);
      pageFn.redirect = pageInstance.redirect.bind(pageInstance);
      pageFn.replace = pageInstance.replace.bind(pageInstance);
      pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
      pageFn.exit = pageInstance.exit.bind(pageInstance);
      pageFn.configure = pageInstance.configure.bind(pageInstance);
      pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
      pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);

      pageFn.create = createPage;

      Object.defineProperty(pageFn, 'len', {
        get: function(){
          return pageInstance.len;
        },
        set: function(val) {
          pageInstance.len = val;
        }
      });

      Object.defineProperty(pageFn, 'current', {
        get: function(){
          return pageInstance.current;
        },
        set: function(val) {
          pageInstance.current = val;
        }
      });

      // In 2.0 these can be named exports
      pageFn.Context = Context;
      pageFn.Route = Route;

      return pageFn;
    }

    /**
     * Register `path` with callback `fn()`,
     * or route `path`, or redirection,
     * or `page.start()`.
     *
     *   page(fn);
     *   page('*', fn);
     *   page('/user/:id', load, user);
     *   page('/user/' + user.id, { some: 'thing' });
     *   page('/user/' + user.id);
     *   page('/from', '/to')
     *   page();
     *
     * @param {string|!Function|!Object} path
     * @param {Function=} fn
     * @api public
     */

    function page(path, fn) {
      // <callback>
      if ('function' === typeof path) {
        return page.call(this, '*', path);
      }

      // route <path> to <callback ...>
      if ('function' === typeof fn) {
        var route = new Route(/** @type {string} */ (path), null, this);
        for (var i = 1; i < arguments.length; ++i) {
          this.callbacks.push(route.middleware(arguments[i]));
        }
        // show <path> with [state]
      } else if ('string' === typeof path) {
        this['string' === typeof fn ? 'redirect' : 'show'](path, fn);
        // start [options]
      } else {
        this.start(path);
      }
    }

    /**
     * Unhandled `ctx`. When it's not the initial
     * popstate then redirect. If you wish to handle
     * 404s on your own use `page('*', callback)`.
     *
     * @param {Context} ctx
     * @api private
     */
    function unhandled(ctx) {
      if (ctx.handled) return;
      var current;
      var page = this;
      var window = page._window;

      if (page._hashbang) {
        current = isLocation && this._getBase() + window.location.hash.replace('#!', '');
      } else {
        current = isLocation && window.location.pathname + window.location.search;
      }

      if (current === ctx.canonicalPath) return;
      page.stop();
      ctx.handled = false;
      isLocation && (window.location.href = ctx.canonicalPath);
    }

    /**
     * Escapes RegExp characters in the given string.
     *
     * @param {string} s
     * @api private
     */
    function escapeRegExp(s) {
      return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
    }

    /**
     * Initialize a new "request" `Context`
     * with the given `path` and optional initial `state`.
     *
     * @constructor
     * @param {string} path
     * @param {Object=} state
     * @api public
     */

    function Context(path, state, pageInstance) {
      var _page = this.page = pageInstance || page;
      var window = _page._window;
      var hashbang = _page._hashbang;

      var pageBase = _page._getBase();
      if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
      var i = path.indexOf('?');

      this.canonicalPath = path;
      var re = new RegExp('^' + escapeRegExp(pageBase));
      this.path = path.replace(re, '') || '/';
      if (hashbang) this.path = this.path.replace('#!', '') || '/';

      this.title = (hasDocument && window.document.title);
      this.state = state || {};
      this.state.path = path;
      this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
      this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
      this.params = {};

      // fragment
      this.hash = '';
      if (!hashbang) {
        if (!~this.path.indexOf('#')) return;
        var parts = this.path.split('#');
        this.path = this.pathname = parts[0];
        this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || '';
        this.querystring = this.querystring.split('#')[0];
      }
    }

    /**
     * Push state.
     *
     * @api private
     */

    Context.prototype.pushState = function() {
      var page = this.page;
      var window = page._window;
      var hashbang = page._hashbang;

      page.len++;
      if (hasHistory) {
          window.history.pushState(this.state, this.title,
            hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
      }
    };

    /**
     * Save the context state.
     *
     * @api public
     */

    Context.prototype.save = function() {
      var page = this.page;
      if (hasHistory) {
          page._window.history.replaceState(this.state, this.title,
            page._hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
      }
    };

    /**
     * Initialize `Route` with the given HTTP `path`,
     * and an array of `callbacks` and `options`.
     *
     * Options:
     *
     *   - `sensitive`    enable case-sensitive routes
     *   - `strict`       enable strict matching for trailing slashes
     *
     * @constructor
     * @param {string} path
     * @param {Object=} options
     * @api private
     */

    function Route(path, options, page) {
      var _page = this.page = page || globalPage;
      var opts = options || {};
      opts.strict = opts.strict || _page._strict;
      this.path = (path === '*') ? '(.*)' : path;
      this.method = 'GET';
      this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
    }

    /**
     * Return route middleware with
     * the given callback `fn()`.
     *
     * @param {Function} fn
     * @return {Function}
     * @api public
     */

    Route.prototype.middleware = function(fn) {
      var self = this;
      return function(ctx, next) {
        if (self.match(ctx.path, ctx.params)) {
          ctx.routePath = self.path;
          return fn(ctx, next);
        }
        next();
      };
    };

    /**
     * Check if this route matches `path`, if so
     * populate `params`.
     *
     * @param {string} path
     * @param {Object} params
     * @return {boolean}
     * @api private
     */

    Route.prototype.match = function(path, params) {
      var keys = this.keys,
        qsIndex = path.indexOf('?'),
        pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
        m = this.regexp.exec(decodeURIComponent(pathname));

      if (!m) return false;

      delete params[0];

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];
        var val = this.page._decodeURLEncodedURIComponent(m[i]);
        if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
          params[key.name] = val;
        }
      }

      return true;
    };


    /**
     * Module exports.
     */

    var globalPage = createPage();
    var page_js = globalPage;
    var default_1 = globalPage;

  page_js.default = default_1;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var flatpickr = createCommonjsModule(function (module, exports) {
  /* flatpickr v4.6.3, @license MIT */
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, function () {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0

      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.

      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

      var __assign = function() {
          __assign = Object.assign || function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
          };
          return __assign.apply(this, arguments);
      };

      var HOOKS = [
          "onChange",
          "onClose",
          "onDayCreate",
          "onDestroy",
          "onKeyDown",
          "onMonthChange",
          "onOpen",
          "onParseConfig",
          "onReady",
          "onValueUpdate",
          "onYearChange",
          "onPreCalendarPosition",
      ];
      var defaults = {
          _disable: [],
          _enable: [],
          allowInput: false,
          altFormat: "F j, Y",
          altInput: false,
          altInputClass: "form-control input",
          animate: typeof window === "object" &&
              window.navigator.userAgent.indexOf("MSIE") === -1,
          ariaDateFormat: "F j, Y",
          clickOpens: true,
          closeOnSelect: true,
          conjunction: ", ",
          dateFormat: "Y-m-d",
          defaultHour: 12,
          defaultMinute: 0,
          defaultSeconds: 0,
          disable: [],
          disableMobile: false,
          enable: [],
          enableSeconds: false,
          enableTime: false,
          errorHandler: function (err) {
              return typeof console !== "undefined" && console.warn(err);
          },
          getWeek: function (givenDate) {
              var date = new Date(givenDate.getTime());
              date.setHours(0, 0, 0, 0);
              // Thursday in current week decides the year.
              date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
              // January 4 is always in week 1.
              var week1 = new Date(date.getFullYear(), 0, 4);
              // Adjust to Thursday in week 1 and count number of weeks from date to week1.
              return (1 +
                  Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                      3 +
                      ((week1.getDay() + 6) % 7)) /
                      7));
          },
          hourIncrement: 1,
          ignoredFocusElements: [],
          inline: false,
          locale: "default",
          minuteIncrement: 5,
          mode: "single",
          monthSelectorType: "dropdown",
          nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
          noCalendar: false,
          now: new Date(),
          onChange: [],
          onClose: [],
          onDayCreate: [],
          onDestroy: [],
          onKeyDown: [],
          onMonthChange: [],
          onOpen: [],
          onParseConfig: [],
          onReady: [],
          onValueUpdate: [],
          onYearChange: [],
          onPreCalendarPosition: [],
          plugins: [],
          position: "auto",
          positionElement: undefined,
          prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
          shorthandCurrentMonth: false,
          showMonths: 1,
          static: false,
          time_24hr: false,
          weekNumbers: false,
          wrap: false
      };

      var english = {
          weekdays: {
              shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              longhand: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
              ]
          },
          months: {
              shorthand: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ],
              longhand: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
              ]
          },
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          firstDayOfWeek: 0,
          ordinal: function (nth) {
              var s = nth % 100;
              if (s > 3 && s < 21)
                  return "th";
              switch (s % 10) {
                  case 1:
                      return "st";
                  case 2:
                      return "nd";
                  case 3:
                      return "rd";
                  default:
                      return "th";
              }
          },
          rangeSeparator: " to ",
          weekAbbreviation: "Wk",
          scrollTitle: "Scroll to increment",
          toggleTitle: "Click to toggle",
          amPM: ["AM", "PM"],
          yearAriaLabel: "Year",
          hourAriaLabel: "Hour",
          minuteAriaLabel: "Minute",
          time_24hr: false
      };

      var pad = function (number) { return ("0" + number).slice(-2); };
      var int = function (bool) { return (bool === true ? 1 : 0); };
      /* istanbul ignore next */
      function debounce(func, wait, immediate) {
          if (immediate === void 0) { immediate = false; }
          var timeout;
          return function () {
              var context = this, args = arguments;
              timeout !== null && clearTimeout(timeout);
              timeout = window.setTimeout(function () {
                  timeout = null;
                  if (!immediate)
                      func.apply(context, args);
              }, wait);
              if (immediate && !timeout)
                  func.apply(context, args);
          };
      }
      var arrayify = function (obj) {
          return obj instanceof Array ? obj : [obj];
      };

      function toggleClass(elem, className, bool) {
          if (bool === true)
              return elem.classList.add(className);
          elem.classList.remove(className);
      }
      function createElement(tag, className, content) {
          var e = window.document.createElement(tag);
          className = className || "";
          content = content || "";
          e.className = className;
          if (content !== undefined)
              e.textContent = content;
          return e;
      }
      function clearNode(node) {
          while (node.firstChild)
              node.removeChild(node.firstChild);
      }
      function findParent(node, condition) {
          if (condition(node))
              return node;
          else if (node.parentNode)
              return findParent(node.parentNode, condition);
          return undefined; // nothing found
      }
      function createNumberInput(inputClassName, opts) {
          var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
          if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
              numInput.type = "number";
          }
          else {
              numInput.type = "text";
              numInput.pattern = "\\d*";
          }
          if (opts !== undefined)
              for (var key in opts)
                  numInput.setAttribute(key, opts[key]);
          wrapper.appendChild(numInput);
          wrapper.appendChild(arrowUp);
          wrapper.appendChild(arrowDown);
          return wrapper;
      }
      function getEventTarget(event) {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }

      var doNothing = function () { return undefined; };
      var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
      var revFormat = {
          D: doNothing,
          F: function (dateObj, monthName, locale) {
              dateObj.setMonth(locale.months.longhand.indexOf(monthName));
          },
          G: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          H: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          J: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          K: function (dateObj, amPM, locale) {
              dateObj.setHours((dateObj.getHours() % 12) +
                  12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
          },
          M: function (dateObj, shortMonth, locale) {
              dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
          },
          S: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
          W: function (dateObj, weekNum, locale) {
              var weekNumber = parseInt(weekNum);
              var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
              date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
              return date;
          },
          Y: function (dateObj, year) {
              dateObj.setFullYear(parseFloat(year));
          },
          Z: function (_, ISODate) { return new Date(ISODate); },
          d: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          h: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          i: function (dateObj, minutes) {
              dateObj.setMinutes(parseFloat(minutes));
          },
          j: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          l: doNothing,
          m: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          n: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          s: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          u: function (_, unixMillSeconds) {
              return new Date(parseFloat(unixMillSeconds));
          },
          w: doNothing,
          y: function (dateObj, year) {
              dateObj.setFullYear(2000 + parseFloat(year));
          }
      };
      var tokenRegex = {
          D: "(\\w+)",
          F: "(\\w+)",
          G: "(\\d\\d|\\d)",
          H: "(\\d\\d|\\d)",
          J: "(\\d\\d|\\d)\\w+",
          K: "",
          M: "(\\w+)",
          S: "(\\d\\d|\\d)",
          U: "(.+)",
          W: "(\\d\\d|\\d)",
          Y: "(\\d{4})",
          Z: "(.+)",
          d: "(\\d\\d|\\d)",
          h: "(\\d\\d|\\d)",
          i: "(\\d\\d|\\d)",
          j: "(\\d\\d|\\d)",
          l: "(\\w+)",
          m: "(\\d\\d|\\d)",
          n: "(\\d\\d|\\d)",
          s: "(\\d\\d|\\d)",
          u: "(.+)",
          w: "(\\d\\d|\\d)",
          y: "(\\d{2})"
      };
      var formats = {
          // get the date in UTC
          Z: function (date) { return date.toISOString(); },
          // weekday name, short, e.g. Thu
          D: function (date, locale, options) {
              return locale.weekdays.shorthand[formats.w(date, locale, options)];
          },
          // full month name e.g. January
          F: function (date, locale, options) {
              return monthToStr(formats.n(date, locale, options) - 1, false, locale);
          },
          // padded hour 1-12
          G: function (date, locale, options) {
              return pad(formats.h(date, locale, options));
          },
          // hours with leading zero e.g. 03
          H: function (date) { return pad(date.getHours()); },
          // day (1-30) with ordinal suffix e.g. 1st, 2nd
          J: function (date, locale) {
              return locale.ordinal !== undefined
                  ? date.getDate() + locale.ordinal(date.getDate())
                  : date.getDate();
          },
          // AM/PM
          K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
          // shorthand month e.g. Jan, Sep, Oct, etc
          M: function (date, locale) {
              return monthToStr(date.getMonth(), true, locale);
          },
          // seconds 00-59
          S: function (date) { return pad(date.getSeconds()); },
          // unix timestamp
          U: function (date) { return date.getTime() / 1000; },
          W: function (date, _, options) {
              return options.getWeek(date);
          },
          // full year e.g. 2016
          Y: function (date) { return date.getFullYear(); },
          // day in month, padded (01-30)
          d: function (date) { return pad(date.getDate()); },
          // hour from 1-12 (am/pm)
          h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
          // minutes, padded with leading zero e.g. 09
          i: function (date) { return pad(date.getMinutes()); },
          // day in month (1-30)
          j: function (date) { return date.getDate(); },
          // weekday name, full, e.g. Thursday
          l: function (date, locale) {
              return locale.weekdays.longhand[date.getDay()];
          },
          // padded month number (01-12)
          m: function (date) { return pad(date.getMonth() + 1); },
          // the month number (1-12)
          n: function (date) { return date.getMonth() + 1; },
          // seconds 0-59
          s: function (date) { return date.getSeconds(); },
          // Unix Milliseconds
          u: function (date) { return date.getTime(); },
          // number of the day of the week
          w: function (date) { return date.getDay(); },
          // last two digits of year e.g. 16 for 2016
          y: function (date) { return String(date.getFullYear()).substring(2); }
      };

      var createDateFormatter = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (dateObj, frmt, overrideLocale) {
              var locale = overrideLocale || l10n;
              if (config.formatDate !== undefined) {
                  return config.formatDate(dateObj, frmt, locale);
              }
              return frmt
                  .split("")
                  .map(function (c, i, arr) {
                  return formats[c] && arr[i - 1] !== "\\"
                      ? formats[c](dateObj, locale, config)
                      : c !== "\\"
                          ? c
                          : "";
              })
                  .join("");
          };
      };
      var createDateParser = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (date, givenFormat, timeless, customLocale) {
              if (date !== 0 && !date)
                  return undefined;
              var locale = customLocale || l10n;
              var parsedDate;
              var dateOrig = date;
              if (date instanceof Date)
                  parsedDate = new Date(date.getTime());
              else if (typeof date !== "string" &&
                  date.toFixed !== undefined // timestamp
              )
                  // create a copy
                  parsedDate = new Date(date);
              else if (typeof date === "string") {
                  // date string
                  var format = givenFormat || (config || defaults).dateFormat;
                  var datestr = String(date).trim();
                  if (datestr === "today") {
                      parsedDate = new Date();
                      timeless = true;
                  }
                  else if (/Z$/.test(datestr) ||
                      /GMT$/.test(datestr) // datestrings w/ timezone
                  )
                      parsedDate = new Date(date);
                  else if (config && config.parseDate)
                      parsedDate = config.parseDate(date, format);
                  else {
                      parsedDate =
                          !config || !config.noCalendar
                              ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                              : new Date(new Date().setHours(0, 0, 0, 0));
                      var matched = void 0, ops = [];
                      for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                          var token_1 = format[i];
                          var isBackSlash = token_1 === "\\";
                          var escaped = format[i - 1] === "\\" || isBackSlash;
                          if (tokenRegex[token_1] && !escaped) {
                              regexStr += tokenRegex[token_1];
                              var match = new RegExp(regexStr).exec(date);
                              if (match && (matched = true)) {
                                  ops[token_1 !== "Y" ? "push" : "unshift"]({
                                      fn: revFormat[token_1],
                                      val: match[++matchIndex]
                                  });
                              }
                          }
                          else if (!isBackSlash)
                              regexStr += "."; // don't really care
                          ops.forEach(function (_a) {
                              var fn = _a.fn, val = _a.val;
                              return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                          });
                      }
                      parsedDate = matched ? parsedDate : undefined;
                  }
              }
              /* istanbul ignore next */
              if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                  config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                  return undefined;
              }
              if (timeless === true)
                  parsedDate.setHours(0, 0, 0, 0);
              return parsedDate;
          };
      };
      /**
       * Compute the difference in dates, measured in ms
       */
      function compareDates(date1, date2, timeless) {
          if (timeless === void 0) { timeless = true; }
          if (timeless !== false) {
              return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                  new Date(date2.getTime()).setHours(0, 0, 0, 0));
          }
          return date1.getTime() - date2.getTime();
      }
      var isBetween = function (ts, ts1, ts2) {
          return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
      };
      var duration = {
          DAY: 86400000
      };

      if (typeof Object.assign !== "function") {
          Object.assign = function (target) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              if (!target) {
                  throw TypeError("Cannot convert undefined or null to object");
              }
              var _loop_1 = function (source) {
                  if (source) {
                      Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                  }
              };
              for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                  var source = args_1[_a];
                  _loop_1(source);
              }
              return target;
          };
      }

      var DEBOUNCED_CHANGE_MS = 300;
      function FlatpickrInstance(element, instanceConfig) {
          var self = {
              config: __assign({}, defaults, flatpickr.defaultConfig),
              l10n: english
          };
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          self._handlers = [];
          self.pluginElements = [];
          self.loadedPlugins = [];
          self._bind = bind;
          self._setHoursFromDate = setHoursFromDate;
          self._positionCalendar = positionCalendar;
          self.changeMonth = changeMonth;
          self.changeYear = changeYear;
          self.clear = clear;
          self.close = close;
          self._createElement = createElement;
          self.destroy = destroy;
          self.isEnabled = isEnabled;
          self.jumpToDate = jumpToDate;
          self.open = open;
          self.redraw = redraw;
          self.set = set;
          self.setDate = setDate;
          self.toggle = toggle;
          function setupHelperFunctions() {
              self.utils = {
                  getDaysInMonth: function (month, yr) {
                      if (month === void 0) { month = self.currentMonth; }
                      if (yr === void 0) { yr = self.currentYear; }
                      if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                          return 29;
                      return self.l10n.daysInMonth[month];
                  }
              };
          }
          function init() {
              self.element = self.input = element;
              self.isOpen = false;
              parseConfig();
              setupLocale();
              setupInputs();
              setupDates();
              setupHelperFunctions();
              if (!self.isMobile)
                  build();
              bindEvents();
              if (self.selectedDates.length || self.config.noCalendar) {
                  if (self.config.enableTime) {
                      setHoursFromDate(self.config.noCalendar
                          ? self.latestSelectedDateObj || self.config.minDate
                          : undefined);
                  }
                  updateValue(false);
              }
              setCalendarWidth();
              self.showTimeInput =
                  self.selectedDates.length > 0 || self.config.noCalendar;
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              /* TODO: investigate this further
          
                Currently, there is weird positioning behavior in safari causing pages
                to scroll up. https://github.com/chmln/flatpickr/issues/563
          
                However, most browsers are not Safari and positioning is expensive when used
                in scale. https://github.com/chmln/flatpickr/issues/1096
              */
              if (!self.isMobile && isSafari) {
                  positionCalendar();
              }
              triggerEvent("onReady");
          }
          function bindToInstance(fn) {
              return fn.bind(self);
          }
          function setCalendarWidth() {
              var config = self.config;
              if (config.weekNumbers === false && config.showMonths === 1)
                  return;
              else if (config.noCalendar !== true) {
                  window.requestAnimationFrame(function () {
                      if (self.calendarContainer !== undefined) {
                          self.calendarContainer.style.visibility = "hidden";
                          self.calendarContainer.style.display = "block";
                      }
                      if (self.daysContainer !== undefined) {
                          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                          self.daysContainer.style.width = daysWidth + "px";
                          self.calendarContainer.style.width =
                              daysWidth +
                                  (self.weekWrapper !== undefined
                                      ? self.weekWrapper.offsetWidth
                                      : 0) +
                                  "px";
                          self.calendarContainer.style.removeProperty("visibility");
                          self.calendarContainer.style.removeProperty("display");
                      }
                  });
              }
          }
          /**
           * The handler for all events targeting the time inputs
           */
          function updateTime(e) {
              if (self.selectedDates.length === 0) {
                  setDefaultTime();
              }
              if (e !== undefined && e.type !== "blur") {
                  timeWrapper(e);
              }
              var prevValue = self._input.value;
              setHoursFromInputs();
              updateValue();
              if (self._input.value !== prevValue) {
                  self._debouncedChange();
              }
          }
          function ampm2military(hour, amPM) {
              return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
          }
          function military2ampm(hour) {
              switch (hour % 24) {
                  case 0:
                  case 12:
                      return 12;
                  default:
                      return hour % 12;
              }
          }
          /**
           * Syncs the selected date object time with user's time input
           */
          function setHoursFromInputs() {
              if (self.hourElement === undefined || self.minuteElement === undefined)
                  return;
              var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                  ? (parseInt(self.secondElement.value, 10) || 0) % 60
                  : 0;
              if (self.amPM !== undefined) {
                  hours = ampm2military(hours, self.amPM.textContent);
              }
              var limitMinHours = self.config.minTime !== undefined ||
                  (self.config.minDate &&
                      self.minDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                          0);
              var limitMaxHours = self.config.maxTime !== undefined ||
                  (self.config.maxDate &&
                      self.maxDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                          0);
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours())
                      minutes = Math.max(minutes, minTime.getMinutes());
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Syncs time input values with a date
           */
          function setHoursFromDate(dateObj) {
              var date = dateObj || self.latestSelectedDateObj;
              if (date)
                  setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
          function setDefaultHours() {
              var hours = self.config.defaultHour;
              var minutes = self.config.defaultMinute;
              var seconds = self.config.defaultSeconds;
              if (self.config.minDate !== undefined) {
                  var minHr = self.config.minDate.getHours();
                  var minMinutes = self.config.minDate.getMinutes();
                  hours = Math.max(hours, minHr);
                  if (hours === minHr)
                      minutes = Math.max(minMinutes, minutes);
                  if (hours === minHr && minutes === minMinutes)
                      seconds = self.config.minDate.getSeconds();
              }
              if (self.config.maxDate !== undefined) {
                  var maxHr = self.config.maxDate.getHours();
                  var maxMinutes = self.config.maxDate.getMinutes();
                  hours = Math.min(hours, maxHr);
                  if (hours === maxHr)
                      minutes = Math.min(maxMinutes, minutes);
                  if (hours === maxHr && minutes === maxMinutes)
                      seconds = self.config.maxDate.getSeconds();
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Sets the hours, minutes, and optionally seconds
           * of the latest selected date object and the
           * corresponding time inputs
           * @param {Number} hours the hour. whether its military
           *                 or am-pm gets inferred from config
           * @param {Number} minutes the minutes
           * @param {Number} seconds the seconds (optional)
           */
          function setHours(hours, minutes, seconds) {
              if (self.latestSelectedDateObj !== undefined) {
                  self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
              }
              if (!self.hourElement || !self.minuteElement || self.isMobile)
                  return;
              self.hourElement.value = pad(!self.config.time_24hr
                  ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                  : hours);
              self.minuteElement.value = pad(minutes);
              if (self.amPM !== undefined)
                  self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
              if (self.secondElement !== undefined)
                  self.secondElement.value = pad(seconds);
          }
          /**
           * Handles the year input and incrementing events
           * @param {Event} event the keyup or increment event
           */
          function onYearInput(event) {
              var year = parseInt(event.target.value) + (event.delta || 0);
              if (year / 1000 > 1 ||
                  (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                  changeYear(year);
              }
          }
          /**
           * Essentially addEventListener + tracking
           * @param {Element} element the element to addEventListener to
           * @param {String} event the event name
           * @param {Function} handler the event handler
           */
          function bind(element, event, handler, options) {
              if (event instanceof Array)
                  return event.forEach(function (ev) { return bind(element, ev, handler, options); });
              if (element instanceof Array)
                  return element.forEach(function (el) { return bind(el, event, handler, options); });
              element.addEventListener(event, handler, options);
              self._handlers.push({
                  element: element,
                  event: event,
                  handler: handler,
                  options: options
              });
          }
          /**
           * A mousedown handler which mimics click.
           * Minimizes latency, since we don't need to wait for mouseup in most cases.
           * Also, avoids handling right clicks.
           *
           * @param {Function} handler the event handler
           */
          function onClick(handler) {
              return function (evt) {
                  evt.which === 1 && handler(evt);
              };
          }
          function triggerChange() {
              triggerEvent("onChange");
          }
          /**
           * Adds all the necessary event listeners
           */
          function bindEvents() {
              if (self.config.wrap) {
                  ["open", "close", "toggle", "clear"].forEach(function (evt) {
                      Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                          return bind(el, "click", self[evt]);
                      });
                  });
              }
              if (self.isMobile) {
                  setupMobile();
                  return;
              }
              var debouncedResize = debounce(onResize, 50);
              self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
              if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                  bind(self.daysContainer, "mouseover", function (e) {
                      if (self.config.mode === "range")
                          onMouseOver(e.target);
                  });
              bind(window.document.body, "keydown", onKeyDown);
              if (!self.config.inline && !self.config.static)
                  bind(window, "resize", debouncedResize);
              if (window.ontouchstart !== undefined)
                  bind(window.document, "touchstart", documentClick);
              else
                  bind(window.document, "mousedown", onClick(documentClick));
              bind(window.document, "focus", documentClick, { capture: true });
              if (self.config.clickOpens === true) {
                  bind(self._input, "focus", self.open);
                  bind(self._input, "mousedown", onClick(self.open));
              }
              if (self.daysContainer !== undefined) {
                  bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
                  bind(self.monthNav, ["keyup", "increment"], onYearInput);
                  bind(self.daysContainer, "mousedown", onClick(selectDate));
              }
              if (self.timeContainer !== undefined &&
                  self.minuteElement !== undefined &&
                  self.hourElement !== undefined) {
                  var selText = function (e) {
                      return e.target.select();
                  };
                  bind(self.timeContainer, ["increment"], updateTime);
                  bind(self.timeContainer, "blur", updateTime, { capture: true });
                  bind(self.timeContainer, "mousedown", onClick(timeIncrement));
                  bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                  if (self.secondElement !== undefined)
                      bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                  if (self.amPM !== undefined) {
                      bind(self.amPM, "mousedown", onClick(function (e) {
                          updateTime(e);
                          triggerChange();
                      }));
                  }
              }
          }
          /**
           * Set the calendar view to a particular date.
           * @param {Date} jumpDate the date to set the view to
           * @param {boolean} triggerChange if change events should be triggered
           */
          function jumpToDate(jumpDate, triggerChange) {
              var jumpTo = jumpDate !== undefined
                  ? self.parseDate(jumpDate)
                  : self.latestSelectedDateObj ||
                      (self.config.minDate && self.config.minDate > self.now
                          ? self.config.minDate
                          : self.config.maxDate && self.config.maxDate < self.now
                              ? self.config.maxDate
                              : self.now);
              var oldYear = self.currentYear;
              var oldMonth = self.currentMonth;
              try {
                  if (jumpTo !== undefined) {
                      self.currentYear = jumpTo.getFullYear();
                      self.currentMonth = jumpTo.getMonth();
                  }
              }
              catch (e) {
                  /* istanbul ignore next */
                  e.message = "Invalid date supplied: " + jumpTo;
                  self.config.errorHandler(e);
              }
              if (triggerChange && self.currentYear !== oldYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              if (triggerChange &&
                  (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                  triggerEvent("onMonthChange");
              }
              self.redraw();
          }
          /**
           * The up/down arrow handler for time inputs
           * @param {Event} e the click event
           */
          function timeIncrement(e) {
              if (~e.target.className.indexOf("arrow"))
                  incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
          }
          /**
           * Increments/decrements the value of input associ-
           * ated with the up/down arrow by dispatching an
           * "increment" event on the input.
           *
           * @param {Event} e the click event
           * @param {Number} delta the diff (usually 1 or -1)
           * @param {Element} inputElem the input element
           */
          function incrementNumInput(e, delta, inputElem) {
              var target = e && e.target;
              var input = inputElem ||
                  (target && target.parentNode && target.parentNode.firstChild);
              var event = createEvent("increment");
              event.delta = delta;
              input && input.dispatchEvent(event);
          }
          function build() {
              var fragment = window.document.createDocumentFragment();
              self.calendarContainer = createElement("div", "flatpickr-calendar");
              self.calendarContainer.tabIndex = -1;
              if (!self.config.noCalendar) {
                  fragment.appendChild(buildMonthNav());
                  self.innerContainer = createElement("div", "flatpickr-innerContainer");
                  if (self.config.weekNumbers) {
                      var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                      self.innerContainer.appendChild(weekWrapper);
                      self.weekNumbers = weekNumbers;
                      self.weekWrapper = weekWrapper;
                  }
                  self.rContainer = createElement("div", "flatpickr-rContainer");
                  self.rContainer.appendChild(buildWeekdays());
                  if (!self.daysContainer) {
                      self.daysContainer = createElement("div", "flatpickr-days");
                      self.daysContainer.tabIndex = -1;
                  }
                  buildDays();
                  self.rContainer.appendChild(self.daysContainer);
                  self.innerContainer.appendChild(self.rContainer);
                  fragment.appendChild(self.innerContainer);
              }
              if (self.config.enableTime) {
                  fragment.appendChild(buildTime());
              }
              toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
              toggleClass(self.calendarContainer, "animate", self.config.animate === true);
              toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
              self.calendarContainer.appendChild(fragment);
              var customAppend = self.config.appendTo !== undefined &&
                  self.config.appendTo.nodeType !== undefined;
              if (self.config.inline || self.config.static) {
                  self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                  if (self.config.inline) {
                      if (!customAppend && self.element.parentNode)
                          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                      else if (self.config.appendTo !== undefined)
                          self.config.appendTo.appendChild(self.calendarContainer);
                  }
                  if (self.config.static) {
                      var wrapper = createElement("div", "flatpickr-wrapper");
                      if (self.element.parentNode)
                          self.element.parentNode.insertBefore(wrapper, self.element);
                      wrapper.appendChild(self.element);
                      if (self.altInput)
                          wrapper.appendChild(self.altInput);
                      wrapper.appendChild(self.calendarContainer);
                  }
              }
              if (!self.config.static && !self.config.inline)
                  (self.config.appendTo !== undefined
                      ? self.config.appendTo
                      : window.document.body).appendChild(self.calendarContainer);
          }
          function createDay(className, date, dayNumber, i) {
              var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
              dayElement.dateObj = date;
              dayElement.$i = i;
              dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
              if (className.indexOf("hidden") === -1 &&
                  compareDates(date, self.now) === 0) {
                  self.todayDateElem = dayElement;
                  dayElement.classList.add("today");
                  dayElement.setAttribute("aria-current", "date");
              }
              if (dateIsEnabled) {
                  dayElement.tabIndex = -1;
                  if (isDateSelected(date)) {
                      dayElement.classList.add("selected");
                      self.selectedDateElem = dayElement;
                      if (self.config.mode === "range") {
                          toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                              compareDates(date, self.selectedDates[0], true) === 0);
                          toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                              compareDates(date, self.selectedDates[1], true) === 0);
                          if (className === "nextMonthDay")
                              dayElement.classList.add("inRange");
                      }
                  }
              }
              else {
                  dayElement.classList.add("flatpickr-disabled");
              }
              if (self.config.mode === "range") {
                  if (isDateInRange(date) && !isDateSelected(date))
                      dayElement.classList.add("inRange");
              }
              if (self.weekNumbers &&
                  self.config.showMonths === 1 &&
                  className !== "prevMonthDay" &&
                  dayNumber % 7 === 1) {
                  self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
              }
              triggerEvent("onDayCreate", dayElement);
              return dayElement;
          }
          function focusOnDayElem(targetNode) {
              targetNode.focus();
              if (self.config.mode === "range")
                  onMouseOver(targetNode);
          }
          function getFirstAvailableDay(delta) {
              var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              for (var m = startMonth; m != endMonth; m += delta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = delta > 0 ? 0 : month.children.length - 1;
                  var endIndex = delta > 0 ? month.children.length : -1;
                  for (var i = startIndex; i != endIndex; i += delta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                          return c;
                  }
              }
              return undefined;
          }
          function getNextAvailableDay(current, delta) {
              var givenMonth = current.className.indexOf("Month") === -1
                  ? current.dateObj.getMonth()
                  : self.currentMonth;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              var loopDelta = delta > 0 ? 1 : -1;
              for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = givenMonth - self.currentMonth === m
                      ? current.$i + delta
                      : delta < 0
                          ? month.children.length - 1
                          : 0;
                  var numMonthDays = month.children.length;
                  for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 &&
                          isEnabled(c.dateObj) &&
                          Math.abs(current.$i - i) >= Math.abs(delta))
                          return focusOnDayElem(c);
                  }
              }
              self.changeMonth(loopDelta);
              focusOnDay(getFirstAvailableDay(loopDelta), 0);
              return undefined;
          }
          function focusOnDay(current, offset) {
              var dayFocused = isInView(document.activeElement || document.body);
              var startElem = current !== undefined
                  ? current
                  : dayFocused
                      ? document.activeElement
                      : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                          ? self.selectedDateElem
                          : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                              ? self.todayDateElem
                              : getFirstAvailableDay(offset > 0 ? 1 : -1);
              if (startElem === undefined)
                  return self._input.focus();
              if (!dayFocused)
                  return focusOnDayElem(startElem);
              getNextAvailableDay(startElem, offset);
          }
          function buildMonthDays(year, month) {
              var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
              var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
              var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
              var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
              // prepend days from the ending of previous month
              for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                  days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
              }
              // Start at 1 since there is no 0th day
              for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                  days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
              }
              // append days from the next month
              for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                  (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                  days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
              }
              //updateNavigationCurrentMonth();
              var dayContainer = createElement("div", "dayContainer");
              dayContainer.appendChild(days);
              return dayContainer;
          }
          function buildDays() {
              if (self.daysContainer === undefined) {
                  return;
              }
              clearNode(self.daysContainer);
              // TODO: week numbers for each month
              if (self.weekNumbers)
                  clearNode(self.weekNumbers);
              var frag = document.createDocumentFragment();
              for (var i = 0; i < self.config.showMonths; i++) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
              }
              self.daysContainer.appendChild(frag);
              self.days = self.daysContainer.firstChild;
              if (self.config.mode === "range" && self.selectedDates.length === 1) {
                  onMouseOver();
              }
          }
          function buildMonthSwitch() {
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType !== "dropdown")
                  return;
              var shouldBuildMonth = function (month) {
                  if (self.config.minDate !== undefined &&
                      self.currentYear === self.config.minDate.getFullYear() &&
                      month < self.config.minDate.getMonth()) {
                      return false;
                  }
                  return !(self.config.maxDate !== undefined &&
                      self.currentYear === self.config.maxDate.getFullYear() &&
                      month > self.config.maxDate.getMonth());
              };
              self.monthsDropdownContainer.tabIndex = -1;
              self.monthsDropdownContainer.innerHTML = "";
              for (var i = 0; i < 12; i++) {
                  if (!shouldBuildMonth(i))
                      continue;
                  var month = createElement("option", "flatpickr-monthDropdown-month");
                  month.value = new Date(self.currentYear, i).getMonth().toString();
                  month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                  month.tabIndex = -1;
                  if (self.currentMonth === i) {
                      month.selected = true;
                  }
                  self.monthsDropdownContainer.appendChild(month);
              }
          }
          function buildMonth() {
              var container = createElement("div", "flatpickr-month");
              var monthNavFragment = window.document.createDocumentFragment();
              var monthElement;
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  monthElement = createElement("span", "cur-month");
              }
              else {
                  self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                  bind(self.monthsDropdownContainer, "change", function (e) {
                      var target = e.target;
                      var selectedMonth = parseInt(target.value, 10);
                      self.changeMonth(selectedMonth - self.currentMonth);
                      triggerEvent("onMonthChange");
                  });
                  buildMonthSwitch();
                  monthElement = self.monthsDropdownContainer;
              }
              var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
              var yearElement = yearInput.getElementsByTagName("input")[0];
              yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
              if (self.config.minDate) {
                  yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
              }
              if (self.config.maxDate) {
                  yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                  yearElement.disabled =
                      !!self.config.minDate &&
                          self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
              }
              var currentMonth = createElement("div", "flatpickr-current-month");
              currentMonth.appendChild(monthElement);
              currentMonth.appendChild(yearInput);
              monthNavFragment.appendChild(currentMonth);
              container.appendChild(monthNavFragment);
              return {
                  container: container,
                  yearElement: yearElement,
                  monthElement: monthElement
              };
          }
          function buildMonths() {
              clearNode(self.monthNav);
              self.monthNav.appendChild(self.prevMonthNav);
              if (self.config.showMonths) {
                  self.yearElements = [];
                  self.monthElements = [];
              }
              for (var m = self.config.showMonths; m--;) {
                  var month = buildMonth();
                  self.yearElements.push(month.yearElement);
                  self.monthElements.push(month.monthElement);
                  self.monthNav.appendChild(month.container);
              }
              self.monthNav.appendChild(self.nextMonthNav);
          }
          function buildMonthNav() {
              self.monthNav = createElement("div", "flatpickr-months");
              self.yearElements = [];
              self.monthElements = [];
              self.prevMonthNav = createElement("span", "flatpickr-prev-month");
              self.prevMonthNav.innerHTML = self.config.prevArrow;
              self.nextMonthNav = createElement("span", "flatpickr-next-month");
              self.nextMonthNav.innerHTML = self.config.nextArrow;
              buildMonths();
              Object.defineProperty(self, "_hidePrevMonthArrow", {
                  get: function () { return self.__hidePrevMonthArrow; },
                  set: function (bool) {
                      if (self.__hidePrevMonthArrow !== bool) {
                          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                          self.__hidePrevMonthArrow = bool;
                      }
                  }
              });
              Object.defineProperty(self, "_hideNextMonthArrow", {
                  get: function () { return self.__hideNextMonthArrow; },
                  set: function (bool) {
                      if (self.__hideNextMonthArrow !== bool) {
                          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                          self.__hideNextMonthArrow = bool;
                      }
                  }
              });
              self.currentYearElement = self.yearElements[0];
              updateNavigationCurrentMonth();
              return self.monthNav;
          }
          function buildTime() {
              self.calendarContainer.classList.add("hasTime");
              if (self.config.noCalendar)
                  self.calendarContainer.classList.add("noCalendar");
              self.timeContainer = createElement("div", "flatpickr-time");
              self.timeContainer.tabIndex = -1;
              var separator = createElement("span", "flatpickr-time-separator", ":");
              var hourInput = createNumberInput("flatpickr-hour", {
                  "aria-label": self.l10n.hourAriaLabel
              });
              self.hourElement = hourInput.getElementsByTagName("input")[0];
              var minuteInput = createNumberInput("flatpickr-minute", {
                  "aria-label": self.l10n.minuteAriaLabel
              });
              self.minuteElement = minuteInput.getElementsByTagName("input")[0];
              self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
              self.hourElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getHours()
                  : self.config.time_24hr
                      ? self.config.defaultHour
                      : military2ampm(self.config.defaultHour));
              self.minuteElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getMinutes()
                  : self.config.defaultMinute);
              self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
              self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
              self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
              self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
              self.minuteElement.setAttribute("min", "0");
              self.minuteElement.setAttribute("max", "59");
              self.timeContainer.appendChild(hourInput);
              self.timeContainer.appendChild(separator);
              self.timeContainer.appendChild(minuteInput);
              if (self.config.time_24hr)
                  self.timeContainer.classList.add("time24hr");
              if (self.config.enableSeconds) {
                  self.timeContainer.classList.add("hasSeconds");
                  var secondInput = createNumberInput("flatpickr-second");
                  self.secondElement = secondInput.getElementsByTagName("input")[0];
                  self.secondElement.value = pad(self.latestSelectedDateObj
                      ? self.latestSelectedDateObj.getSeconds()
                      : self.config.defaultSeconds);
                  self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                  self.secondElement.setAttribute("min", "0");
                  self.secondElement.setAttribute("max", "59");
                  self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                  self.timeContainer.appendChild(secondInput);
              }
              if (!self.config.time_24hr) {
                  // add self.amPM if appropriate
                  self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                      ? self.hourElement.value
                      : self.config.defaultHour) > 11)]);
                  self.amPM.title = self.l10n.toggleTitle;
                  self.amPM.tabIndex = -1;
                  self.timeContainer.appendChild(self.amPM);
              }
              return self.timeContainer;
          }
          function buildWeekdays() {
              if (!self.weekdayContainer)
                  self.weekdayContainer = createElement("div", "flatpickr-weekdays");
              else
                  clearNode(self.weekdayContainer);
              for (var i = self.config.showMonths; i--;) {
                  var container = createElement("div", "flatpickr-weekdaycontainer");
                  self.weekdayContainer.appendChild(container);
              }
              updateWeekdays();
              return self.weekdayContainer;
          }
          function updateWeekdays() {
              if (!self.weekdayContainer) {
                  return;
              }
              var firstDayOfWeek = self.l10n.firstDayOfWeek;
              var weekdays = self.l10n.weekdays.shorthand.slice();
              if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                  weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
              }
              for (var i = self.config.showMonths; i--;) {
                  self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
              }
          }
          /* istanbul ignore next */
          function buildWeeks() {
              self.calendarContainer.classList.add("hasWeeks");
              var weekWrapper = createElement("div", "flatpickr-weekwrapper");
              weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
              var weekNumbers = createElement("div", "flatpickr-weeks");
              weekWrapper.appendChild(weekNumbers);
              return {
                  weekWrapper: weekWrapper,
                  weekNumbers: weekNumbers
              };
          }
          function changeMonth(value, isOffset) {
              if (isOffset === void 0) { isOffset = true; }
              var delta = isOffset ? value : value - self.currentMonth;
              if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                  (delta > 0 && self._hideNextMonthArrow === true))
                  return;
              self.currentMonth += delta;
              if (self.currentMonth < 0 || self.currentMonth > 11) {
                  self.currentYear += self.currentMonth > 11 ? 1 : -1;
                  self.currentMonth = (self.currentMonth + 12) % 12;
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              buildDays();
              triggerEvent("onMonthChange");
              updateNavigationCurrentMonth();
          }
          function clear(triggerChangeEvent, toInitial) {
              if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
              if (toInitial === void 0) { toInitial = true; }
              self.input.value = "";
              if (self.altInput !== undefined)
                  self.altInput.value = "";
              if (self.mobileInput !== undefined)
                  self.mobileInput.value = "";
              self.selectedDates = [];
              self.latestSelectedDateObj = undefined;
              if (toInitial === true) {
                  self.currentYear = self._initialDate.getFullYear();
                  self.currentMonth = self._initialDate.getMonth();
              }
              self.showTimeInput = false;
              if (self.config.enableTime === true) {
                  setDefaultHours();
              }
              self.redraw();
              if (triggerChangeEvent)
                  // triggerChangeEvent is true (default) or an Event
                  triggerEvent("onChange");
          }
          function close() {
              self.isOpen = false;
              if (!self.isMobile) {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.classList.remove("open");
                  }
                  if (self._input !== undefined) {
                      self._input.classList.remove("active");
                  }
              }
              triggerEvent("onClose");
          }
          function destroy() {
              if (self.config !== undefined)
                  triggerEvent("onDestroy");
              for (var i = self._handlers.length; i--;) {
                  var h = self._handlers[i];
                  h.element.removeEventListener(h.event, h.handler, h.options);
              }
              self._handlers = [];
              if (self.mobileInput) {
                  if (self.mobileInput.parentNode)
                      self.mobileInput.parentNode.removeChild(self.mobileInput);
                  self.mobileInput = undefined;
              }
              else if (self.calendarContainer && self.calendarContainer.parentNode) {
                  if (self.config.static && self.calendarContainer.parentNode) {
                      var wrapper = self.calendarContainer.parentNode;
                      wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                      if (wrapper.parentNode) {
                          while (wrapper.firstChild)
                              wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                          wrapper.parentNode.removeChild(wrapper);
                      }
                  }
                  else
                      self.calendarContainer.parentNode.removeChild(self.calendarContainer);
              }
              if (self.altInput) {
                  self.input.type = "text";
                  if (self.altInput.parentNode)
                      self.altInput.parentNode.removeChild(self.altInput);
                  delete self.altInput;
              }
              if (self.input) {
                  self.input.type = self.input._type;
                  self.input.classList.remove("flatpickr-input");
                  self.input.removeAttribute("readonly");
                  self.input.value = "";
              }
              [
                  "_showTimeInput",
                  "latestSelectedDateObj",
                  "_hideNextMonthArrow",
                  "_hidePrevMonthArrow",
                  "__hideNextMonthArrow",
                  "__hidePrevMonthArrow",
                  "isMobile",
                  "isOpen",
                  "selectedDateElem",
                  "minDateHasTime",
                  "maxDateHasTime",
                  "days",
                  "daysContainer",
                  "_input",
                  "_positionElement",
                  "innerContainer",
                  "rContainer",
                  "monthNav",
                  "todayDateElem",
                  "calendarContainer",
                  "weekdayContainer",
                  "prevMonthNav",
                  "nextMonthNav",
                  "monthsDropdownContainer",
                  "currentMonthElement",
                  "currentYearElement",
                  "navigationCurrentMonth",
                  "selectedDateElem",
                  "config",
              ].forEach(function (k) {
                  try {
                      delete self[k];
                  }
                  catch (_) { }
              });
          }
          function isCalendarElem(elem) {
              if (self.config.appendTo && self.config.appendTo.contains(elem))
                  return true;
              return self.calendarContainer.contains(elem);
          }
          function documentClick(e) {
              if (self.isOpen && !self.config.inline) {
                  var eventTarget_1 = getEventTarget(e);
                  var isCalendarElement = isCalendarElem(eventTarget_1);
                  var isInput = eventTarget_1 === self.input ||
                      eventTarget_1 === self.altInput ||
                      self.element.contains(eventTarget_1) ||
                      // web components
                      // e.path is not present in all browsers. circumventing typechecks
                      (e.path &&
                          e.path.indexOf &&
                          (~e.path.indexOf(self.input) ||
                              ~e.path.indexOf(self.altInput)));
                  var lostFocus = e.type === "blur"
                      ? isInput &&
                          e.relatedTarget &&
                          !isCalendarElem(e.relatedTarget)
                      : !isInput &&
                          !isCalendarElement &&
                          !isCalendarElem(e.relatedTarget);
                  var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                      return elem.contains(eventTarget_1);
                  });
                  if (lostFocus && isIgnored) {
                      if (self.timeContainer !== undefined &&
                          self.minuteElement !== undefined &&
                          self.hourElement !== undefined) {
                          updateTime();
                      }
                      self.close();
                      if (self.config.mode === "range" && self.selectedDates.length === 1) {
                          self.clear(false);
                          self.redraw();
                      }
                  }
              }
          }
          function changeYear(newYear) {
              if (!newYear ||
                  (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                  (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                  return;
              var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
              self.currentYear = newYearNum || self.currentYear;
              if (self.config.maxDate &&
                  self.currentYear === self.config.maxDate.getFullYear()) {
                  self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
              }
              else if (self.config.minDate &&
                  self.currentYear === self.config.minDate.getFullYear()) {
                  self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
              }
              if (isNewYear) {
                  self.redraw();
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
          }
          function isEnabled(date, timeless) {
              if (timeless === void 0) { timeless = true; }
              var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
              if ((self.config.minDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                  (self.config.maxDate &&
                      dateToCheck &&
                      compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                  return false;
              if (self.config.enable.length === 0 && self.config.disable.length === 0)
                  return true;
              if (dateToCheck === undefined)
                  return false;
              var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
              for (var i = 0, d = void 0; i < array.length; i++) {
                  d = array[i];
                  if (typeof d === "function" &&
                      d(dateToCheck) // disabled by function
                  )
                      return bool;
                  else if (d instanceof Date &&
                      dateToCheck !== undefined &&
                      d.getTime() === dateToCheck.getTime())
                      // disabled by date
                      return bool;
                  else if (typeof d === "string" && dateToCheck !== undefined) {
                      // disabled by date string
                      var parsed = self.parseDate(d, undefined, true);
                      return parsed && parsed.getTime() === dateToCheck.getTime()
                          ? bool
                          : !bool;
                  }
                  else if (
                  // disabled by range
                  typeof d === "object" &&
                      dateToCheck !== undefined &&
                      d.from &&
                      d.to &&
                      dateToCheck.getTime() >= d.from.getTime() &&
                      dateToCheck.getTime() <= d.to.getTime())
                      return bool;
              }
              return !bool;
          }
          function isInView(elem) {
              if (self.daysContainer !== undefined)
                  return (elem.className.indexOf("hidden") === -1 &&
                      self.daysContainer.contains(elem));
              return false;
          }
          function onKeyDown(e) {
              // e.key                      e.keyCode
              // "Backspace"                        8
              // "Tab"                              9
              // "Enter"                           13
              // "Escape"     (IE "Esc")           27
              // "ArrowLeft"  (IE "Left")          37
              // "ArrowUp"    (IE "Up")            38
              // "ArrowRight" (IE "Right")         39
              // "ArrowDown"  (IE "Down")          40
              // "Delete"     (IE "Del")           46
              var isInput = e.target === self._input;
              var allowInput = self.config.allowInput;
              var allowKeydown = self.isOpen && (!allowInput || !isInput);
              var allowInlineKeydown = self.config.inline && isInput && !allowInput;
              if (e.keyCode === 13 && isInput) {
                  if (allowInput) {
                      self.setDate(self._input.value, true, e.target === self.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                      return e.target.blur();
                  }
                  else {
                      self.open();
                  }
              }
              else if (isCalendarElem(e.target) ||
                  allowKeydown ||
                  allowInlineKeydown) {
                  var isTimeObj = !!self.timeContainer &&
                      self.timeContainer.contains(e.target);
                  switch (e.keyCode) {
                      case 13:
                          if (isTimeObj) {
                              e.preventDefault();
                              updateTime();
                              focusAndClose();
                          }
                          else
                              selectDate(e);
                          break;
                      case 27: // escape
                          e.preventDefault();
                          focusAndClose();
                          break;
                      case 8:
                      case 46:
                          if (isInput && !self.config.allowInput) {
                              e.preventDefault();
                              self.clear();
                          }
                          break;
                      case 37:
                      case 39:
                          if (!isTimeObj && !isInput) {
                              e.preventDefault();
                              if (self.daysContainer !== undefined &&
                                  (allowInput === false ||
                                      (document.activeElement && isInView(document.activeElement)))) {
                                  var delta_1 = e.keyCode === 39 ? 1 : -1;
                                  if (!e.ctrlKey)
                                      focusOnDay(undefined, delta_1);
                                  else {
                                      e.stopPropagation();
                                      changeMonth(delta_1);
                                      focusOnDay(getFirstAvailableDay(1), 0);
                                  }
                              }
                          }
                          else if (self.hourElement)
                              self.hourElement.focus();
                          break;
                      case 38:
                      case 40:
                          e.preventDefault();
                          var delta = e.keyCode === 40 ? 1 : -1;
                          if ((self.daysContainer && e.target.$i !== undefined) ||
                              e.target === self.input ||
                              e.target === self.altInput) {
                              if (e.ctrlKey) {
                                  e.stopPropagation();
                                  changeYear(self.currentYear - delta);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                              else if (!isTimeObj)
                                  focusOnDay(undefined, delta * 7);
                          }
                          else if (e.target === self.currentYearElement) {
                              changeYear(self.currentYear - delta);
                          }
                          else if (self.config.enableTime) {
                              if (!isTimeObj && self.hourElement)
                                  self.hourElement.focus();
                              updateTime(e);
                              self._debouncedChange();
                          }
                          break;
                      case 9:
                          if (isTimeObj) {
                              var elems = [
                                  self.hourElement,
                                  self.minuteElement,
                                  self.secondElement,
                                  self.amPM,
                              ]
                                  .concat(self.pluginElements)
                                  .filter(function (x) { return x; });
                              var i = elems.indexOf(e.target);
                              if (i !== -1) {
                                  var target = elems[i + (e.shiftKey ? -1 : 1)];
                                  e.preventDefault();
                                  (target || self._input).focus();
                              }
                          }
                          else if (!self.config.noCalendar &&
                              self.daysContainer &&
                              self.daysContainer.contains(e.target) &&
                              e.shiftKey) {
                              e.preventDefault();
                              self._input.focus();
                          }
                          break;
                  }
              }
              if (self.amPM !== undefined && e.target === self.amPM) {
                  switch (e.key) {
                      case self.l10n.amPM[0].charAt(0):
                      case self.l10n.amPM[0].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[0];
                          setHoursFromInputs();
                          updateValue();
                          break;
                      case self.l10n.amPM[1].charAt(0):
                      case self.l10n.amPM[1].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[1];
                          setHoursFromInputs();
                          updateValue();
                          break;
                  }
              }
              if (isInput || isCalendarElem(e.target)) {
                  triggerEvent("onKeyDown", e);
              }
          }
          function onMouseOver(elem) {
              if (self.selectedDates.length !== 1 ||
                  (elem &&
                      (!elem.classList.contains("flatpickr-day") ||
                          elem.classList.contains("flatpickr-disabled"))))
                  return;
              var hoverDate = elem
                  ? elem.dateObj.getTime()
                  : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
              var containsDisabled = false;
              var minRange = 0, maxRange = 0;
              for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                  if (!isEnabled(new Date(t), true)) {
                      containsDisabled =
                          containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                      if (t < initialDate && (!minRange || t > minRange))
                          minRange = t;
                      else if (t > initialDate && (!maxRange || t < maxRange))
                          maxRange = t;
                  }
              }
              for (var m = 0; m < self.config.showMonths; m++) {
                  var month = self.daysContainer.children[m];
                  var _loop_1 = function (i, l) {
                      var dayElem = month.children[i], date = dayElem.dateObj;
                      var timestamp = date.getTime();
                      var outOfRange = (minRange > 0 && timestamp < minRange) ||
                          (maxRange > 0 && timestamp > maxRange);
                      if (outOfRange) {
                          dayElem.classList.add("notAllowed");
                          ["inRange", "startRange", "endRange"].forEach(function (c) {
                              dayElem.classList.remove(c);
                          });
                          return "continue";
                      }
                      else if (containsDisabled && !outOfRange)
                          return "continue";
                      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                          dayElem.classList.remove(c);
                      });
                      if (elem !== undefined) {
                          elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                              ? "startRange"
                              : "endRange");
                          if (initialDate < hoverDate && timestamp === initialDate)
                              dayElem.classList.add("startRange");
                          else if (initialDate > hoverDate && timestamp === initialDate)
                              dayElem.classList.add("endRange");
                          if (timestamp >= minRange &&
                              (maxRange === 0 || timestamp <= maxRange) &&
                              isBetween(timestamp, initialDate, hoverDate))
                              dayElem.classList.add("inRange");
                      }
                  };
                  for (var i = 0, l = month.children.length; i < l; i++) {
                      _loop_1(i, l);
                  }
              }
          }
          function onResize() {
              if (self.isOpen && !self.config.static && !self.config.inline)
                  positionCalendar();
          }
          function setDefaultTime() {
              self.setDate(self.config.minDate !== undefined
                  ? new Date(self.config.minDate.getTime())
                  : new Date(), true);
              setDefaultHours();
              updateValue();
          }
          function open(e, positionElement) {
              if (positionElement === void 0) { positionElement = self._positionElement; }
              if (self.isMobile === true) {
                  if (e) {
                      e.preventDefault();
                      e.target && e.target.blur();
                  }
                  if (self.mobileInput !== undefined) {
                      self.mobileInput.focus();
                      self.mobileInput.click();
                  }
                  triggerEvent("onOpen");
                  return;
              }
              if (self._input.disabled || self.config.inline)
                  return;
              var wasOpen = self.isOpen;
              self.isOpen = true;
              if (!wasOpen) {
                  self.calendarContainer.classList.add("open");
                  self._input.classList.add("active");
                  triggerEvent("onOpen");
                  positionCalendar(positionElement);
              }
              if (self.config.enableTime === true && self.config.noCalendar === true) {
                  if (self.selectedDates.length === 0) {
                      setDefaultTime();
                  }
                  if (self.config.allowInput === false &&
                      (e === undefined ||
                          !self.timeContainer.contains(e.relatedTarget))) {
                      setTimeout(function () { return self.hourElement.select(); }, 50);
                  }
              }
          }
          function minMaxDateSetter(type) {
              return function (date) {
                  var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                  var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                  if (dateObj !== undefined) {
                      self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                          dateObj.getHours() > 0 ||
                              dateObj.getMinutes() > 0 ||
                              dateObj.getSeconds() > 0;
                  }
                  if (self.selectedDates) {
                      self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                      if (!self.selectedDates.length && type === "min")
                          setHoursFromDate(dateObj);
                      updateValue();
                  }
                  if (self.daysContainer) {
                      redraw();
                      if (dateObj !== undefined)
                          self.currentYearElement[type] = dateObj.getFullYear().toString();
                      else
                          self.currentYearElement.removeAttribute(type);
                      self.currentYearElement.disabled =
                          !!inverseDateObj &&
                              dateObj !== undefined &&
                              inverseDateObj.getFullYear() === dateObj.getFullYear();
                  }
              };
          }
          function parseConfig() {
              var boolOpts = [
                  "wrap",
                  "weekNumbers",
                  "allowInput",
                  "clickOpens",
                  "time_24hr",
                  "enableTime",
                  "noCalendar",
                  "altInput",
                  "shorthandCurrentMonth",
                  "inline",
                  "static",
                  "enableSeconds",
                  "disableMobile",
              ];
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              var formats = {};
              self.config.parseDate = userConfig.parseDate;
              self.config.formatDate = userConfig.formatDate;
              Object.defineProperty(self.config, "enable", {
                  get: function () { return self.config._enable; },
                  set: function (dates) {
                      self.config._enable = parseDateRules(dates);
                  }
              });
              Object.defineProperty(self.config, "disable", {
                  get: function () { return self.config._disable; },
                  set: function (dates) {
                      self.config._disable = parseDateRules(dates);
                  }
              });
              var timeMode = userConfig.mode === "time";
              if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                  var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                  formats.dateFormat =
                      userConfig.noCalendar || timeMode
                          ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                          : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
              }
              if (userConfig.altInput &&
                  (userConfig.enableTime || timeMode) &&
                  !userConfig.altFormat) {
                  var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                  formats.altFormat =
                      userConfig.noCalendar || timeMode
                          ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                          : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
              }
              if (!userConfig.altInputClass) {
                  self.config.altInputClass =
                      self.input.className + " " + self.config.altInputClass;
              }
              Object.defineProperty(self.config, "minDate", {
                  get: function () { return self.config._minDate; },
                  set: minMaxDateSetter("min")
              });
              Object.defineProperty(self.config, "maxDate", {
                  get: function () { return self.config._maxDate; },
                  set: minMaxDateSetter("max")
              });
              var minMaxTimeSetter = function (type) { return function (val) {
                  self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
              }; };
              Object.defineProperty(self.config, "minTime", {
                  get: function () { return self.config._minTime; },
                  set: minMaxTimeSetter("min")
              });
              Object.defineProperty(self.config, "maxTime", {
                  get: function () { return self.config._maxTime; },
                  set: minMaxTimeSetter("max")
              });
              if (userConfig.mode === "time") {
                  self.config.noCalendar = true;
                  self.config.enableTime = true;
              }
              Object.assign(self.config, formats, userConfig);
              for (var i = 0; i < boolOpts.length; i++)
                  self.config[boolOpts[i]] =
                      self.config[boolOpts[i]] === true ||
                          self.config[boolOpts[i]] === "true";
              HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                  self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
              });
              self.isMobile =
                  !self.config.disableMobile &&
                      !self.config.inline &&
                      self.config.mode === "single" &&
                      !self.config.disable.length &&
                      !self.config.enable.length &&
                      !self.config.weekNumbers &&
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              for (var i = 0; i < self.config.plugins.length; i++) {
                  var pluginConf = self.config.plugins[i](self) || {};
                  for (var key in pluginConf) {
                      if (HOOKS.indexOf(key) > -1) {
                          self.config[key] = arrayify(pluginConf[key])
                              .map(bindToInstance)
                              .concat(self.config[key]);
                      }
                      else if (typeof userConfig[key] === "undefined")
                          self.config[key] = pluginConf[key];
                  }
              }
              triggerEvent("onParseConfig");
          }
          function setupLocale() {
              if (typeof self.config.locale !== "object" &&
                  typeof flatpickr.l10ns[self.config.locale] === "undefined")
                  self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
              self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
                  ? self.config.locale
                  : self.config.locale !== "default"
                      ? flatpickr.l10ns[self.config.locale]
                      : undefined));
              tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              if (userConfig.time_24hr === undefined &&
                  flatpickr.defaultConfig.time_24hr === undefined) {
                  self.config.time_24hr = self.l10n.time_24hr;
              }
              self.formatDate = createDateFormatter(self);
              self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          }
          function positionCalendar(customPositionElement) {
              if (self.calendarContainer === undefined)
                  return;
              triggerEvent("onPreCalendarPosition");
              var positionElement = customPositionElement || self._positionElement;
              var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                  (configPosVertical !== "below" &&
                      distanceFromBottom < calendarHeight &&
                      inputBounds.top > calendarHeight);
              var top = window.pageYOffset +
                  inputBounds.top +
                  (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
              toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
              toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
              if (self.config.inline)
                  return;
              var left = window.pageXOffset +
                  inputBounds.left -
                  (configPosHorizontal != null && configPosHorizontal === "center"
                      ? (calendarWidth - inputBounds.width) / 2
                      : 0);
              var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
              var rightMost = left + calendarWidth > window.document.body.offsetWidth;
              var centerMost = right + calendarWidth > window.document.body.offsetWidth;
              toggleClass(self.calendarContainer, "rightMost", rightMost);
              if (self.config.static)
                  return;
              self.calendarContainer.style.top = top + "px";
              if (!rightMost) {
                  self.calendarContainer.style.left = left + "px";
                  self.calendarContainer.style.right = "auto";
              }
              else if (!centerMost) {
                  self.calendarContainer.style.left = "auto";
                  self.calendarContainer.style.right = right + "px";
              }
              else {
                  var doc = document.styleSheets[0];
                  // some testing environments don't have css support
                  if (doc === undefined)
                      return;
                  var bodyWidth = window.document.body.offsetWidth;
                  var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                  var centerBefore = ".flatpickr-calendar.centerMost:before";
                  var centerAfter = ".flatpickr-calendar.centerMost:after";
                  var centerIndex = doc.cssRules.length;
                  var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                  toggleClass(self.calendarContainer, "rightMost", false);
                  toggleClass(self.calendarContainer, "centerMost", true);
                  doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                  self.calendarContainer.style.left = centerLeft + "px";
                  self.calendarContainer.style.right = "auto";
              }
          }
          function redraw() {
              if (self.config.noCalendar || self.isMobile)
                  return;
              updateNavigationCurrentMonth();
              buildDays();
          }
          function focusAndClose() {
              self._input.focus();
              if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                  navigator.msMaxTouchPoints !== undefined) {
                  // hack - bugs in the way IE handles focus keeps the calendar open
                  setTimeout(self.close, 0);
              }
              else {
                  self.close();
              }
          }
          function selectDate(e) {
              e.preventDefault();
              e.stopPropagation();
              var isSelectable = function (day) {
                  return day.classList &&
                      day.classList.contains("flatpickr-day") &&
                      !day.classList.contains("flatpickr-disabled") &&
                      !day.classList.contains("notAllowed");
              };
              var t = findParent(e.target, isSelectable);
              if (t === undefined)
                  return;
              var target = t;
              var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
              var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                  selectedDate.getMonth() >
                      self.currentMonth + self.config.showMonths - 1) &&
                  self.config.mode !== "range";
              self.selectedDateElem = target;
              if (self.config.mode === "single")
                  self.selectedDates = [selectedDate];
              else if (self.config.mode === "multiple") {
                  var selectedIndex = isDateSelected(selectedDate);
                  if (selectedIndex)
                      self.selectedDates.splice(parseInt(selectedIndex), 1);
                  else
                      self.selectedDates.push(selectedDate);
              }
              else if (self.config.mode === "range") {
                  if (self.selectedDates.length === 2) {
                      self.clear(false, false);
                  }
                  self.latestSelectedDateObj = selectedDate;
                  self.selectedDates.push(selectedDate);
                  // unless selecting same date twice, sort ascendingly
                  if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                      self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
              }
              setHoursFromInputs();
              if (shouldChangeMonth) {
                  var isNewYear = self.currentYear !== selectedDate.getFullYear();
                  self.currentYear = selectedDate.getFullYear();
                  self.currentMonth = selectedDate.getMonth();
                  if (isNewYear) {
                      triggerEvent("onYearChange");
                      buildMonthSwitch();
                  }
                  triggerEvent("onMonthChange");
              }
              updateNavigationCurrentMonth();
              buildDays();
              updateValue();
              if (self.config.enableTime)
                  setTimeout(function () { return (self.showTimeInput = true); }, 50);
              // maintain focus
              if (!shouldChangeMonth &&
                  self.config.mode !== "range" &&
                  self.config.showMonths === 1)
                  focusOnDayElem(target);
              else if (self.selectedDateElem !== undefined &&
                  self.hourElement === undefined) {
                  self.selectedDateElem && self.selectedDateElem.focus();
              }
              if (self.hourElement !== undefined)
                  self.hourElement !== undefined && self.hourElement.focus();
              if (self.config.closeOnSelect) {
                  var single = self.config.mode === "single" && !self.config.enableTime;
                  var range = self.config.mode === "range" &&
                      self.selectedDates.length === 2 &&
                      !self.config.enableTime;
                  if (single || range) {
                      focusAndClose();
                  }
              }
              triggerChange();
          }
          var CALLBACKS = {
              locale: [setupLocale, updateWeekdays],
              showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
              minDate: [jumpToDate],
              maxDate: [jumpToDate]
          };
          function set(option, value) {
              if (option !== null && typeof option === "object") {
                  Object.assign(self.config, option);
                  for (var key in option) {
                      if (CALLBACKS[key] !== undefined)
                          CALLBACKS[key].forEach(function (x) { return x(); });
                  }
              }
              else {
                  self.config[option] = value;
                  if (CALLBACKS[option] !== undefined)
                      CALLBACKS[option].forEach(function (x) { return x(); });
                  else if (HOOKS.indexOf(option) > -1)
                      self.config[option] = arrayify(value);
              }
              self.redraw();
              updateValue(false);
          }
          function setSelectedDate(inputDate, format) {
              var dates = [];
              if (inputDate instanceof Array)
                  dates = inputDate.map(function (d) { return self.parseDate(d, format); });
              else if (inputDate instanceof Date || typeof inputDate === "number")
                  dates = [self.parseDate(inputDate, format)];
              else if (typeof inputDate === "string") {
                  switch (self.config.mode) {
                      case "single":
                      case "time":
                          dates = [self.parseDate(inputDate, format)];
                          break;
                      case "multiple":
                          dates = inputDate
                              .split(self.config.conjunction)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                      case "range":
                          dates = inputDate
                              .split(self.l10n.rangeSeparator)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                  }
              }
              else
                  self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
              self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
              if (self.config.mode === "range")
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          function setDate(date, triggerChange, format) {
              if (triggerChange === void 0) { triggerChange = false; }
              if (format === void 0) { format = self.config.dateFormat; }
              if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                  return self.clear(triggerChange);
              setSelectedDate(date, format);
              self.showTimeInput = self.selectedDates.length > 0;
              self.latestSelectedDateObj =
                  self.selectedDates[self.selectedDates.length - 1];
              self.redraw();
              jumpToDate();
              setHoursFromDate();
              if (self.selectedDates.length === 0) {
                  self.clear(false);
              }
              updateValue(triggerChange);
              if (triggerChange)
                  triggerEvent("onChange");
          }
          function parseDateRules(arr) {
              return arr
                  .slice()
                  .map(function (rule) {
                  if (typeof rule === "string" ||
                      typeof rule === "number" ||
                      rule instanceof Date) {
                      return self.parseDate(rule, undefined, true);
                  }
                  else if (rule &&
                      typeof rule === "object" &&
                      rule.from &&
                      rule.to)
                      return {
                          from: self.parseDate(rule.from, undefined),
                          to: self.parseDate(rule.to, undefined)
                      };
                  return rule;
              })
                  .filter(function (x) { return x; }); // remove falsy values
          }
          function setupDates() {
              self.selectedDates = [];
              self.now = self.parseDate(self.config.now) || new Date();
              // Workaround IE11 setting placeholder as the input's value
              var preloadedDate = self.config.defaultDate ||
                  ((self.input.nodeName === "INPUT" ||
                      self.input.nodeName === "TEXTAREA") &&
                      self.input.placeholder &&
                      self.input.value === self.input.placeholder
                      ? null
                      : self.input.value);
              if (preloadedDate)
                  setSelectedDate(preloadedDate, self.config.dateFormat);
              self._initialDate =
                  self.selectedDates.length > 0
                      ? self.selectedDates[0]
                      : self.config.minDate &&
                          self.config.minDate.getTime() > self.now.getTime()
                          ? self.config.minDate
                          : self.config.maxDate &&
                              self.config.maxDate.getTime() < self.now.getTime()
                              ? self.config.maxDate
                              : self.now;
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
              if (self.selectedDates.length > 0)
                  self.latestSelectedDateObj = self.selectedDates[0];
              if (self.config.minTime !== undefined)
                  self.config.minTime = self.parseDate(self.config.minTime, "H:i");
              if (self.config.maxTime !== undefined)
                  self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
              self.minDateHasTime =
                  !!self.config.minDate &&
                      (self.config.minDate.getHours() > 0 ||
                          self.config.minDate.getMinutes() > 0 ||
                          self.config.minDate.getSeconds() > 0);
              self.maxDateHasTime =
                  !!self.config.maxDate &&
                      (self.config.maxDate.getHours() > 0 ||
                          self.config.maxDate.getMinutes() > 0 ||
                          self.config.maxDate.getSeconds() > 0);
              Object.defineProperty(self, "showTimeInput", {
                  get: function () { return self._showTimeInput; },
                  set: function (bool) {
                      self._showTimeInput = bool;
                      if (self.calendarContainer)
                          toggleClass(self.calendarContainer, "showTimeInput", bool);
                      self.isOpen && positionCalendar();
                  }
              });
          }
          function setupInputs() {
              self.input = self.config.wrap
                  ? element.querySelector("[data-input]")
                  : element;
              /* istanbul ignore next */
              if (!self.input) {
                  self.config.errorHandler(new Error("Invalid input element specified"));
                  return;
              }
              // hack: store previous type to restore it after destroy()
              self.input._type = self.input.type;
              self.input.type = "text";
              self.input.classList.add("flatpickr-input");
              self._input = self.input;
              if (self.config.altInput) {
                  // replicate self.element
                  self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                  self._input = self.altInput;
                  self.altInput.placeholder = self.input.placeholder;
                  self.altInput.disabled = self.input.disabled;
                  self.altInput.required = self.input.required;
                  self.altInput.tabIndex = self.input.tabIndex;
                  self.altInput.type = "text";
                  self.input.setAttribute("type", "hidden");
                  if (!self.config.static && self.input.parentNode)
                      self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
              }
              if (!self.config.allowInput)
                  self._input.setAttribute("readonly", "readonly");
              self._positionElement = self.config.positionElement || self._input;
          }
          function setupMobile() {
              var inputType = self.config.enableTime
                  ? self.config.noCalendar
                      ? "time"
                      : "datetime-local"
                  : "date";
              self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
              self.mobileInput.step = self.input.getAttribute("step") || "any";
              self.mobileInput.tabIndex = 1;
              self.mobileInput.type = inputType;
              self.mobileInput.disabled = self.input.disabled;
              self.mobileInput.required = self.input.required;
              self.mobileInput.placeholder = self.input.placeholder;
              self.mobileFormatStr =
                  inputType === "datetime-local"
                      ? "Y-m-d\\TH:i:S"
                      : inputType === "date"
                          ? "Y-m-d"
                          : "H:i:S";
              if (self.selectedDates.length > 0) {
                  self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
              }
              if (self.config.minDate)
                  self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
              if (self.config.maxDate)
                  self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
              self.input.type = "hidden";
              if (self.altInput !== undefined)
                  self.altInput.type = "hidden";
              try {
                  if (self.input.parentNode)
                      self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
              }
              catch (_a) { }
              bind(self.mobileInput, "change", function (e) {
                  self.setDate(e.target.value, false, self.mobileFormatStr);
                  triggerEvent("onChange");
                  triggerEvent("onClose");
              });
          }
          function toggle(e) {
              if (self.isOpen === true)
                  return self.close();
              self.open(e);
          }
          function triggerEvent(event, data) {
              // If the instance has been destroyed already, all hooks have been removed
              if (self.config === undefined)
                  return;
              var hooks = self.config[event];
              if (hooks !== undefined && hooks.length > 0) {
                  for (var i = 0; hooks[i] && i < hooks.length; i++)
                      hooks[i](self.selectedDates, self.input.value, self, data);
              }
              if (event === "onChange") {
                  self.input.dispatchEvent(createEvent("change"));
                  // many front-end frameworks bind to the input event
                  self.input.dispatchEvent(createEvent("input"));
              }
          }
          function createEvent(name) {
              var e = document.createEvent("Event");
              e.initEvent(name, true, true);
              return e;
          }
          function isDateSelected(date) {
              for (var i = 0; i < self.selectedDates.length; i++) {
                  if (compareDates(self.selectedDates[i], date) === 0)
                      return "" + i;
              }
              return false;
          }
          function isDateInRange(date) {
              if (self.config.mode !== "range" || self.selectedDates.length < 2)
                  return false;
              return (compareDates(date, self.selectedDates[0]) >= 0 &&
                  compareDates(date, self.selectedDates[1]) <= 0);
          }
          function updateNavigationCurrentMonth() {
              if (self.config.noCalendar || self.isMobile || !self.monthNav)
                  return;
              self.yearElements.forEach(function (yearElement, i) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  if (self.config.showMonths > 1 ||
                      self.config.monthSelectorType === "static") {
                      self.monthElements[i].textContent =
                          monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                  }
                  else {
                      self.monthsDropdownContainer.value = d.getMonth().toString();
                  }
                  yearElement.value = d.getFullYear().toString();
              });
              self._hidePrevMonthArrow =
                  self.config.minDate !== undefined &&
                      (self.currentYear === self.config.minDate.getFullYear()
                          ? self.currentMonth <= self.config.minDate.getMonth()
                          : self.currentYear < self.config.minDate.getFullYear());
              self._hideNextMonthArrow =
                  self.config.maxDate !== undefined &&
                      (self.currentYear === self.config.maxDate.getFullYear()
                          ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                          : self.currentYear > self.config.maxDate.getFullYear());
          }
          function getDateStr(format) {
              return self.selectedDates
                  .map(function (dObj) { return self.formatDate(dObj, format); })
                  .filter(function (d, i, arr) {
                  return self.config.mode !== "range" ||
                      self.config.enableTime ||
                      arr.indexOf(d) === i;
              })
                  .join(self.config.mode !== "range"
                  ? self.config.conjunction
                  : self.l10n.rangeSeparator);
          }
          /**
           * Updates the values of inputs associated with the calendar
           */
          function updateValue(triggerChange) {
              if (triggerChange === void 0) { triggerChange = true; }
              if (self.mobileInput !== undefined && self.mobileFormatStr) {
                  self.mobileInput.value =
                      self.latestSelectedDateObj !== undefined
                          ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                          : "";
              }
              self.input.value = getDateStr(self.config.dateFormat);
              if (self.altInput !== undefined) {
                  self.altInput.value = getDateStr(self.config.altFormat);
              }
              if (triggerChange !== false)
                  triggerEvent("onValueUpdate");
          }
          function onMonthNavClick(e) {
              var isPrevMonth = self.prevMonthNav.contains(e.target);
              var isNextMonth = self.nextMonthNav.contains(e.target);
              if (isPrevMonth || isNextMonth) {
                  changeMonth(isPrevMonth ? -1 : 1);
              }
              else if (self.yearElements.indexOf(e.target) >= 0) {
                  e.target.select();
              }
              else if (e.target.classList.contains("arrowUp")) {
                  self.changeYear(self.currentYear + 1);
              }
              else if (e.target.classList.contains("arrowDown")) {
                  self.changeYear(self.currentYear - 1);
              }
          }
          function timeWrapper(e) {
              e.preventDefault();
              var isKeyDown = e.type === "keydown", input = e.target;
              if (self.amPM !== undefined && e.target === self.amPM) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                  (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
              var newValue = curValue + step * delta;
              if (typeof input.value !== "undefined" && input.value.length === 2) {
                  var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                  if (newValue < min) {
                      newValue =
                          max +
                              newValue +
                              int(!isHourElem) +
                              (int(isHourElem) && int(!self.amPM));
                      if (isMinuteElem)
                          incrementNumInput(undefined, -1, self.hourElement);
                  }
                  else if (newValue > max) {
                      newValue =
                          input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                      if (isMinuteElem)
                          incrementNumInput(undefined, 1, self.hourElement);
                  }
                  if (self.amPM &&
                      isHourElem &&
                      (step === 1
                          ? newValue + curValue === 23
                          : Math.abs(newValue - curValue) > step)) {
                      self.amPM.textContent =
                          self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                  }
                  input.value = pad(newValue);
              }
          }
          init();
          return self;
      }
      /* istanbul ignore next */
      function _flatpickr(nodeList, config) {
          // static list
          var nodes = Array.prototype.slice
              .call(nodeList)
              .filter(function (x) { return x instanceof HTMLElement; });
          var instances = [];
          for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              try {
                  if (node.getAttribute("data-fp-omit") !== null)
                      continue;
                  if (node._flatpickr !== undefined) {
                      node._flatpickr.destroy();
                      node._flatpickr = undefined;
                  }
                  node._flatpickr = FlatpickrInstance(node, config || {});
                  instances.push(node._flatpickr);
              }
              catch (e) {
                  console.error(e);
              }
          }
          return instances.length === 1 ? instances[0] : instances;
      }
      /* istanbul ignore next */
      if (typeof HTMLElement !== "undefined" &&
          typeof HTMLCollection !== "undefined" &&
          typeof NodeList !== "undefined") {
          // browser env
          HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
          HTMLElement.prototype.flatpickr = function (config) {
              return _flatpickr([this], config);
          };
      }
      /* istanbul ignore next */
      var flatpickr = function (selector, config) {
          if (typeof selector === "string") {
              return _flatpickr(window.document.querySelectorAll(selector), config);
          }
          else if (selector instanceof Node) {
              return _flatpickr([selector], config);
          }
          else {
              return _flatpickr(selector, config);
          }
      };
      /* istanbul ignore next */
      flatpickr.defaultConfig = {};
      flatpickr.l10ns = {
          en: __assign({}, english),
          "default": __assign({}, english)
      };
      flatpickr.localize = function (l10n) {
          flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
      };
      flatpickr.setDefaults = function (config) {
          flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
      };
      flatpickr.parseDate = createDateParser({});
      flatpickr.formatDate = createDateFormatter({});
      flatpickr.compareDates = compareDates;
      /* istanbul ignore next */
      if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
          jQuery.fn.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      Date.prototype.fp_incr = function (days) {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
      };
      if (typeof window !== "undefined") {
          window.flatpickr = flatpickr;
      }

      return flatpickr;

  }));
  });

  var es = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
     factory(exports) ;
  }(commonjsGlobal, function (exports) {
    var fp = typeof window !== "undefined" && window.flatpickr !== undefined
        ? window.flatpickr
        : {
            l10ns: {}
        };
    var Spanish = {
        weekdays: {
            shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
            longhand: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ]
        },
        months: {
            shorthand: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
            ],
            longhand: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ]
        },
        ordinal: function () {
            return "º";
        },
        firstDayOfWeek: 1,
        rangeSeparator: " a ",
        time_24hr: true
    };
    fp.l10ns.es = Spanish;
    var es = fp.l10ns;

    exports.Spanish = Spanish;
    exports.default = es;

    Object.defineProperty(exports, '__esModule', { value: true });

  }));
  });

  var Spanish = unwrapExports(es);

  const Types = {
    'time':TimeInput,
    'date':DateInput,
    'select':SelectInput,
    'image':ImageInput,
    'button':Button,
    'input':Input,
    'number':Input,
    'text':Input,
    'textarea':Input,
  };

  function Finder(container){
    const found = {
      buttons: { name: {}, group: {}, all: [] },
      inputs: { type: {}, all: [] }
    };

    container.find('[data-type]').each(function(){
      let el = $(this),
      type = el.attr('data-type'),
      name = el.attr('name'),
      group = el.attr('data-group');

      if(type !== 'button'){
        if(!found.inputs.type[type]){ found.inputs.type[type] = {}; }
        if(group){
          if(!found.inputs.type[type][group]){ found.inputs.type[type][group] = {}; }
          found.inputs.type[type][group][name] = el;
        }
        else {
          found.inputs.type[type][name] = el;
        }
      }
      else {
        el = new Button(el);
        if(group){
          if(!found.buttons.group[group]){ found.buttons.group[group] = {}; }
          found.buttons.group[group][name] = el;
        }
        else {
          found.buttons.name[name] = el;
        }

        found.buttons.all.push(el);
      }




    });

    for(let type in found.inputs.type){
      for (let input in found.inputs.type[type]) {
        let name = input;
        input = found.inputs.type[type][input];
        found.inputs.type[type][name] = new Types[type](input);
        found.inputs.all.push(found.inputs.type[type][name]);
      }
    }

    return found;
  }

  function EventHandler(element){
    const instance = this;
    const observer = new Observer();
    const events = {
      on: (type)=>{
        if(props.alive && !props.events[type]){
          props.events[type] = true;
          let register = (type)=>{
            return function(){
              instance.element.off(type);
              observer.notify(type,[arguments]);
              instance.element.on(type,register(type));
            }
          };
          instance.element.on(type,register(type));
        }
      },
      off: (type)=>{
        props.events[type] = false;
        instance.element.off(type);
      }
    };

    const props = {
      events: {},
      alive: false,
      element: element
    };
    const methods = {
      'element': {
        get: ()=>{ return props.element; }
      },
      'on':{
        configurable: true,
        writable: false,
        value: ()=>{
          props.alive = true;
          observer.event.keys().forEach(events.on);
        }
      },
      'off':{
        configurable: true,
        writable: false,
        value: ()=>{
          props.alive = false;
          observer.event.keys().forEach(events.off);
        }
      },
      'events':{
        writable: false,
        value: {
          on: (type,fn)=>{
            if(!observer.event.exist(type)){ observer.event.create(type); }
            let index = observer.register(type,fn.bind(instance));
            events.on(type);
            return index;
          },
          off: (type,id)=>{
            let registered = observer.event.get(type);
            if(id == undefined){
              registered.forEach((id)=>{ observer.unregister(type,id); });
            }
            else {
              observer.unregister(type,id);
            }
          }
        }
      }
    };

    Object.defineProperties(this,methods);
  }

  function Button(button){
    EventHandler.call(this,button);
  }

  function Input(input){

    let jquery = input instanceof window.$;
    let test = Rules.is.instanceOfAny(
      (jquery ? input[0] : input),
      [HTMLInputElement,HTMLSelectElement,HTMLTextAreaElement]
    );

    if(!test.passed){ throw test.error; }
    EventHandler.call(this,input);

    const tests = {
      rules: [],
      map: {},
      addRule: (rule)=>{
        tests.map[rule.name] = tests.rules.push([rule.tests,rule.args]) - 1;
      },
      removeRule: (name)=>{
        let index = tests.map[name];
        if(index !== undefined){
          tests.rules  = tests.rules.reduce((a,c,i)=>{
            if(i !== index){ a.push(c); }
            return a;
          },[]);
        }
      },
      run: ()=>{
        let rules = tests.rules.map((check)=>{
          let copy = [check[0],[]];
          if(Array.isArray(check[1])){ copy[1] = copy[1].concat(check[1]); }
          copy[1].unshift(instance.value);
          return copy;
        });

        return Test(rules);
      }
    };

    const instance = this;

    const props = {};

    const methods = {
      'name':{
        configurable: true,
        writable: false,
        value: input.attr('name')
      },
      'parent':{
        get: ()=>{
          if(!props.parent){ props.parent = input.parent(); }
          return props.parent;
        }
      },
      'disable':{
        configurable: true,
        writable: true,
        value: function(on){
          this.element[on ? 'attr' : 'removeAttr' ]('disabled','disabled');
        }
      },
      'rules': {
        writable: false,
        value: {
          add: tests.addRule,
          remove: tests.removeRule,
          tests: tests.run
        }
      },
      'value': {
        configurable: true,
        get: ()=>{ return this.element.val().trim(); },
        set: (value)=>{
          this.element.val(value);
          this.element.trigger('input');
        }
      }
    };

    Object.defineProperties(this,methods);
  }

  function SelectInput(input){
    Input.call(this,input);

    const options = {
      add: (option)=>{
        let el = $(document.createElement('option'));
        el.text(option.text).val(option.value);
        this.element.append(el);
      },
      select:(value)=>{
        this.options.get().removeAttr('selected');
        this.element.find(`[value="${value}"]`).attr('selected','selected');
      },
      remove: (value)=>{
        this.element.find(`[value="${value}"]`).remove();
      },
      get: ()=>{ return this.element.children(); },
      find: (value)=>{ return this.element.find(`[value="${value}"]`); }
    };

    const methods = {
      'value':{
        set: (value)=>{
          this.element.val(value);
          this.options.select(value);
        },
        get: ()=>{
          return this.element.val().trim();
        }
      },
      'options':{
        writable: false,
        value: options
      }
    };

    Object.defineProperties(this,methods);
  }

  function ImageInput({file,upload,preview}){
    Input.call(this,file);
    upload = new Button(upload);
    const instance = this;
    const on = instance.on;
    const off = instance.off;
    const props = {
      img: preview,
      reader: new FileReader(),
      file: undefined,
      data: undefined,
      changed: false,
    };
    const methods = {
      'name':{
        writable: false,
        value: instance.element.attr('data-group')
      },
      'changed': {
        get: ()=>{ return props.changed; }
      },
      'value': {
        set: (value)=>{
          if(value != ''){ instance.src = value; }
        },
        get:()=>{ return props.file }
      },
      'src':{
        get: ()=>{ return props.data; },
        set: (value)=>{ props.img.attr('src',value); }
      },
      'on': {
        configurable: true,
        writable: false,
        value: function(){
          on.call(this);
          upload.on();
        }
      },
      'off': {
        configurable: true,
        writable: false,
        value: function(){
          off.call(this);
          upload.off();
          preview.attr('src','https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png');
        }
      }
    };

    Object.defineProperties(this,methods);

    props.reader.onload = (e)=>{
      props.img.attr('src',e.target.result);
      props.data = e.target.result;
      instance.element.trigger('imgReady');
    };

    upload.events.on('click',function(){
      instance.element.val('');
      instance.element.trigger('click');
    });

    this.events.on('change',function(){
      props.changed = true;
      props.file = this.element[0].files[0];
      props.reader.readAsDataURL(props.file);
    });

  }

  function DateInput(input){
    const picker = flatpickr(input,{
      locale: Spanish,
      dateFormat: 'j M Y',
      defaultDate: new Date(Date.now()),
      disableMobile: true
    });

    picker.config.onClose.push(function(){
      $(document).off('click.exitPicker');
    });

    Input.call(this,input);

    const methods = {
      'picker':{
        get:()=>{ return picker; }
      },
      'close': {
        writable: false,
        value: ()=>{
          $(document).on('click.exitPicker',function(e){
            e = e.target;
            let search = true, found = false;
            while(search){
              if(e.tagName !== 'BODY'){
                found = e.classList.toString().indexOf('flatpickr') != -1;
                if(found){ search = false;}            }
              else {
                search = false;
              }
              e = e.parentElement;
            }
            if(!found){ picker.close(); $(document).off('click.exitPicker'); }
          });
        }
      },
      'value':{
        set: (date)=>{ picker.setDate(date); },
        get:()=>{ return picker.formatDate(picker.selectedDates[0],'Y-m-d'); }
      }
    };

    Object.defineProperties(this,methods);

    this.events.on('click',this.close);

  }

  function TimeInput(input){
    const picker = flatpickr(input,{
      enableTime: true,
      noCalendar: true,
      locale: Spanish,
      dateFormat: 'h:i K',
      defaultDate: '10:00',
      disableMobile: true
    });

    picker.config.onClose.push(function(){
      $(document).off('click.exitPicker');
    });

    Input.call(this,input);

    const methods = {
      'picker':{
        get:()=>{ return picker; }
      },
      'close': {
        writable: false,
        value: ()=>{
          $(document).on('click.exitPicker',function(e){
            let close = e.target.classList.toString().indexOf('flatpickr') == -1;
            if(close){ picker.close(); $(document).off('click.exitPicker'); }
          });
        }
      },
      'value':{
        set:(value)=>{ picker.setDate(date); },
        get:()=>{ return picker.formatDate(picker.selectedDates[0],'H:i:s'); }
      }
    };

    Object.defineProperties(this,methods);

    this.events.on('click',this.close);
  }

  function Modal(){
    const elements = {};
    elements.container = $('[data-modal="permissions"]');
    elements.modal = elements.container.find('.modal');
    elements.header = elements.modal.find('.header');
    elements.title = elements.header.find('.title');
    elements.type = elements.header.find('.type');

    const { buttons } = Finder(elements.header);

    const state = { type: undefined };

    const methods = {
      'on': {
        writable: false,
        value: ()=>{
          buttons.name.close.on();
          elements.container.on('click',(e)=>{
            if($(e.target).hasClass('modal-cont')){
              buttons.name.close.element.trigger('click');
            }
          });
        }
      },
      'off': {
        writbale: false,
        value: ()=>{
          buttons.name.close.off();
          elements.container.off('click');
        }
      },
      'open': {
        writable: false,
        value: (title,type)=>{
          state.type = type;
          elements.title.html(title);
          elements.type.addClass(type);
          elements.container.addClass('active');
        }
      },
      'alive': {
        get: ()=>{ return ALIVE }
      },
      'buttons':{
        get: ()=>{ return buttons }
      },
      'close': {
        writable: false,
        value: ()=>{
          elements.type.removeClass(state.type);
          elements.container.removeClass('active');
        }
      }
    };

    Object.defineProperties(this,methods);


  }

  function Form(data){
    const instance = this;
    const events = new Observer(['on','off','send','response','error']);
    const props = {
      element:$(`form[name="${data.name}"]`),
      alive:false,
      name:data.name,
      url: data.url,
      async: data.async ? data.async : true,
      method: data.method ? data.method : 'POST',
      json: data.json ? data.json : false
    };
    const on = ()=>{
      inputs.all.forEach((input)=>{ input.on(); });
      buttons.all.forEach((btn)=>{ btn.on(); });
      if(typeof props.init == 'function' ){ props.init.call(instance); props.init = true; }
      props.alive = true;
      events.notify('on',[true]);
      return props.element
    };
    const off = ()=>{
      props.element[0].reset();
      inputs.all.forEach((input)=>{ input.off(); });
      buttons.all.forEach((btn)=>{ btn.off(); });
      props.alive = false;
      events.notify('off',[true]);
    };
    const send = (message)=>{
      events.notify('send',[message]);
      if(!message.error){
        $.ajax({
          url: `${window.location.origin}/${props.url}`,
          method: props.method,
          data: props.json ? JSON.stringify(message.data) : message.data,
          async: props.async,
          success: (response)=>{ events.notify('response',[response]); },
          error: (response)=>{ events.notify('error',[response]); }
        });
      }
    };
    const { inputs, buttons } = Finder(props.element);

    const methods = {
      'element': {
        get:()=>{ return props.element }
      },
      'name':{
        get:()=>{ return props.name; }
      },
      'alive':{
        get:()=>{ return props.alive; }
      },
      'on': {
        configurable: true,
        get:()=>{ return on; },
        set:(fn)=>{
          Object.defineProperty(instance,'on',{
            configurable: false,
            writable: false,
            value:function(){
              on();
              fn.apply(instance,arguments);
            }
          });
        }
      },
      'off': {
        configurable: true,
        get:()=>{ return off; },
        set:(fn)=>{
          Object.defineProperty(instance,'off',{
            configurable: false,
            writable: false,
            value:()=>{
              off();
              fn.call(instance);
            }
          });
        }
      },
      'send': {
        configurable: true,
        set:(fn)=>{
          Object.defineProperty(instance,'send',{
            configurable: false,
            writable: false,
            value:function(){
              send(fn.apply(instance,arguments));
            }
          });
        }
      },
      'init': {
        configurable: true,
        set:(init)=>{
          props.init = init;
          Object.defineProperty(instance,'init',{
            writable: false,
            value:true,
          });
        }
      },
      'buttons':{
        get: ()=>{ return buttons }
      },
      'inputs':{
        get: ()=>{ return inputs }
      },
      'events':{
        writable: false,
        value: {
          on: events.register,
          off: events.unregister
        }
      },
      'disable': {
        writable: false,
        value: (toggle)=>{
          inputs.all.forEach((input)=>{ input.disable(toggle); });
        }
      }
    };

    Object.defineProperties(this,methods);
  }

  function Vacation(){

    const form = new Form({
      title: 'Vacación',
      name: 'vacation',
      url: 'permisions/create',
    });

    form.color = 'bg-teal-600';

    form.init = function(){
      this.buttons.name.send.events.on('click',this.send);
    };

    form.on = function(date){
      let inputs = this.inputs.type;
      date = (date  == undefined ? new Date(Date.now()) : date );
      for(let i in inputs.date){ inputs.date[i].picker.setDate(date); }
    };

    form.send = function(){
      let data = {};
      data.date_start = this.inputs.type.date.start.value+' 10:00:00';
      data.date_finish = this.inputs.type.date.finish.value+' 10:00:00';
      data.notice = 2;

      return { error: false, data }
    };

    return form

  }

  function HomeOffice(){

    const form = new Form({
      title: 'Home Office',
      name: 'homeOffice',
      url: 'permisions/create',
    });

    form.color = 'bg-indigo-600';

    form.init = function(){
      this.buttons.name.send.events.on('click',this.send);
    };

    form.on = function(date) {
      let inputs = this.inputs.type;
      date = (date  == undefined ? new Date(Date.now()) : date );
      for(let i in inputs.date){ inputs.date[i].picker.setDate(date); }
    };

    form.send = function(){
      let inputs = this.inputs.type;
      let data = {};
      data.date_start = inputs.date.start.value + ' 10:00:00';
      data.date_finish = inputs.date.finish.value + ' 10:00:00';
      data.comments = inputs.textarea.description.value;
      data.notice = 4;

      return { error: false, data }
    };

    return form

  }

  function Sick(){

    const form = new Form({
      name: 'sick',
      url: 'permisions/create',
    });


    form.init = function(){
      this.title = 'Enfermedad',
      this.color = 'bg-blue-600';
      this.buttons.name.send.events.on('click',this.send);
    };

    form.on = function(date) {
      let inputs = this.inputs.type;
      date = (date  == undefined ? new Date(Date.now()) : date );
      for(let i in inputs.date){ inputs.date[i].picker.setDate(date); }

    };

    form.send = function(){
      let inputs = this.inputs.type;
      let data = {};
      data.date_start = inputs.date.start.value+' 10:00:00';
      data.date_finish = inputs.date.finish.value+' 10:00:00';
      data.comments = inputs.textarea.description.value;
      data.notice = 3;

      return { error: false, data }
    };

    return form
  }

  function Permission(){

    const form = new Form({
      title: 'Permiso',
      name: 'permission',
      url: 'permisions/create',
    });

    form.color = 'bg-green-600';

    form.init = function(){
      this.buttons.name.send.events.on('click',this.send);
    };

    form.on = function(date){
      let inputs = this.inputs.type;
      date = (date  == undefined ? new Date(Date.now()) : date );
      for(let i in inputs.date){ inputs.date[i].picker.setDate(date); }
      for(let i in inputs.time){ inputs.time[i].picker.setDate(date); }
    };

    form.send = function(){
      let inputs = this.inputs.type;
      let data = {};
      data.date_start = inputs.date.start.value+' '+inputs.time.start.value;
      data.date_finish = inputs.date.finish.value+' '+inputs.time.finish.value;
      data.comments = inputs.textarea.description.value;
      data.notice = 1;

      return { error: false, data }
    };

    return form

  }

  function Permissions(){
    const elements = {
      container: $('#permissions'),
      permissions: $('.permission')
    };

    const { buttons } = Finder(elements.container);

    const modal = new Modal();
    const options = {};
    const forms = {};

    forms.current = false;
    forms.all = [ Vacation(), HomeOffice(), Sick(), Permission() ];
    forms.open = (name)=>{
      let form = forms.all.find(form => name == form.name );
        forms.current = form;
        modal.open(form.title,form.color);
        options.close();
        form.on();
        form.element.removeClass('hidden');
    };
    forms.close = function(){
      if(forms.current){
        let form = forms.current;
        modal.close();
        form.off();
        form.element.addClass('hidden');
        forms.current = false;
      }
    };
    forms.init = (form)=>{
      const { name } = form;
      form.events.on('send',function(message){
        if(!message.error){ modal.buttons.name.close.element.trigger('click'); }
      });
      buttons.name[name].events.on('click',function(){ page_js(`/calendar/solicit/${name}`); });
    };

    options.state = false;
    options.toggle  = function(){
      elements.container[ options.state  ? 'removeClass' : 'addClass' ]('active');
      elements.permissions[ options.state  ? 'addClass' : 'removeClass' ]('hide');
      buttons.name.toggle.element.children('i')
      .removeClass( options.state  ? 'fa-times' : 'fa-bullhorn')
      .addClass( options.state  ? 'fa-bullhorn': 'fa-times');
      options.state  = !options.state ;
    };
    options.open = ()=>{ if(!options.state){ options.toggle(); } };
    options.close = ()=>{ if(options.state){ options.toggle(); } };

    const methods = {
      'on':{
        writable: false,
        value: ()=>{
          modal.on();
          buttons.all.forEach((btn)=>{ btn.on(); });
        }
      },
      'off':{
        writable: false,
        value: ()=>{
          modal.off();
          forms.close();
          options.close();
          buttons.all.forEach((btn)=>{ btn.off(); });
        }
      },
      'index': {
        writable: false,
        value: function(ctx){
          options.close();
          forms.close();
        }
      },
      'routes': {
        writable: false,
        value: {
          '/calendar/solicit/:permission': function(ctx){
            const { permission } = ctx.params;
            options.close();
            forms.open(permission);
          }
        }
      }
    };

    Object.defineProperties(this,methods);

    forms.all.forEach(forms.init);

    buttons.name.toggle.events.on('click',options.toggle);


    modal.buttons.name.close.events.on('click',function(){ page_js('/calendar'); });
  }

  /*!
  FullCalendar Core Package v4.4.0
  Docs & License: https://fullcalendar.io/
  (c) 2019 Adam Shaw
  */

  // Creating
  // ----------------------------------------------------------------------------------------------------------------
  var elementPropHash = {
      className: true,
      colSpan: true,
      rowSpan: true
  };
  var containerTagHash = {
      '<tr': 'tbody',
      '<td': 'tr'
  };
  function createElement(tagName, attrs, content) {
      var el = document.createElement(tagName);
      if (attrs) {
          for (var attrName in attrs) {
              if (attrName === 'style') {
                  applyStyle(el, attrs[attrName]);
              }
              else if (elementPropHash[attrName]) {
                  el[attrName] = attrs[attrName];
              }
              else {
                  el.setAttribute(attrName, attrs[attrName]);
              }
          }
      }
      if (typeof content === 'string') {
          el.innerHTML = content; // shortcut. no need to process HTML in any way
      }
      else if (content != null) {
          appendToElement(el, content);
      }
      return el;
  }
  function htmlToElement(html) {
      html = html.trim();
      var container = document.createElement(computeContainerTag(html));
      container.innerHTML = html;
      return container.firstChild;
  }
  function htmlToElements(html) {
      return Array.prototype.slice.call(htmlToNodeList(html));
  }
  function htmlToNodeList(html) {
      html = html.trim();
      var container = document.createElement(computeContainerTag(html));
      container.innerHTML = html;
      return container.childNodes;
  }
  // assumes html already trimmed and tag names are lowercase
  function computeContainerTag(html) {
      return containerTagHash[html.substr(0, 3) // faster than using regex
      ] || 'div';
  }
  function appendToElement(el, content) {
      var childNodes = normalizeContent(content);
      for (var i = 0; i < childNodes.length; i++) {
          el.appendChild(childNodes[i]);
      }
  }
  function prependToElement(parent, content) {
      var newEls = normalizeContent(content);
      var afterEl = parent.firstChild || null; // if no firstChild, will append to end, but that's okay, b/c there were no children
      for (var i = 0; i < newEls.length; i++) {
          parent.insertBefore(newEls[i], afterEl);
      }
  }
  function insertAfterElement(refEl, content) {
      var newEls = normalizeContent(content);
      var afterEl = refEl.nextSibling || null;
      for (var i = 0; i < newEls.length; i++) {
          refEl.parentNode.insertBefore(newEls[i], afterEl);
      }
  }
  function normalizeContent(content) {
      var els;
      if (typeof content === 'string') {
          els = htmlToElements(content);
      }
      else if (content instanceof Node) {
          els = [content];
      }
      else { // Node[] or NodeList
          els = Array.prototype.slice.call(content);
      }
      return els;
  }
  function removeElement(el) {
      if (el.parentNode) {
          el.parentNode.removeChild(el);
      }
  }
  // Querying
  // ----------------------------------------------------------------------------------------------------------------
  // from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  var matchesMethod = Element.prototype.matches ||
      Element.prototype.matchesSelector ||
      Element.prototype.msMatchesSelector;
  var closestMethod = Element.prototype.closest || function (selector) {
      // polyfill
      var el = this;
      if (!document.documentElement.contains(el)) {
          return null;
      }
      do {
          if (elementMatches(el, selector)) {
              return el;
          }
          el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
  };
  function elementClosest(el, selector) {
      return closestMethod.call(el, selector);
  }
  function elementMatches(el, selector) {
      return matchesMethod.call(el, selector);
  }
  // accepts multiple subject els
  // returns a real array. good for methods like forEach
  function findElements(container, selector) {
      var containers = container instanceof HTMLElement ? [container] : container;
      var allMatches = [];
      for (var i = 0; i < containers.length; i++) {
          var matches = containers[i].querySelectorAll(selector);
          for (var j = 0; j < matches.length; j++) {
              allMatches.push(matches[j]);
          }
      }
      return allMatches;
  }
  // accepts multiple subject els
  // only queries direct child elements
  function findChildren(parent, selector) {
      var parents = parent instanceof HTMLElement ? [parent] : parent;
      var allMatches = [];
      for (var i = 0; i < parents.length; i++) {
          var childNodes = parents[i].children; // only ever elements
          for (var j = 0; j < childNodes.length; j++) {
              var childNode = childNodes[j];
              if (!selector || elementMatches(childNode, selector)) {
                  allMatches.push(childNode);
              }
          }
      }
      return allMatches;
  }
  // Style
  // ----------------------------------------------------------------------------------------------------------------
  var PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i;
  function applyStyle(el, props) {
      for (var propName in props) {
          applyStyleProp(el, propName, props[propName]);
      }
  }
  function applyStyleProp(el, name, val) {
      if (val == null) {
          el.style[name] = '';
      }
      else if (typeof val === 'number' && PIXEL_PROP_RE.test(name)) {
          el.style[name] = val + 'px';
      }
      else {
          el.style[name] = val;
      }
  }
  // Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
  function intersectRects(rect1, rect2) {
      var res = {
          left: Math.max(rect1.left, rect2.left),
          right: Math.min(rect1.right, rect2.right),
          top: Math.max(rect1.top, rect2.top),
          bottom: Math.min(rect1.bottom, rect2.bottom)
      };
      if (res.left < res.right && res.top < res.bottom) {
          return res;
      }
      return false;
  }

  // Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side
  var isRtlScrollbarOnLeft = null;
  function getIsRtlScrollbarOnLeft() {
      if (isRtlScrollbarOnLeft === null) {
          isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft();
      }
      return isRtlScrollbarOnLeft;
  }
  function computeIsRtlScrollbarOnLeft() {
      var outerEl = createElement('div', {
          style: {
              position: 'absolute',
              top: -1000,
              left: 0,
              border: 0,
              padding: 0,
              overflow: 'scroll',
              direction: 'rtl'
          }
      }, '<div></div>');
      document.body.appendChild(outerEl);
      var innerEl = outerEl.firstChild;
      var res = innerEl.getBoundingClientRect().left > outerEl.getBoundingClientRect().left;
      removeElement(outerEl);
      return res;
  }
  // The scrollbar width computations in computeEdges are sometimes flawed when it comes to
  // retina displays, rounding, and IE11. Massage them into a usable value.
  function sanitizeScrollbarWidth(width) {
      width = Math.max(0, width); // no negatives
      width = Math.round(width);
      return width;
  }

  function computeEdges(el, getPadding) {
      if (getPadding === void 0) { getPadding = false; }
      var computedStyle = window.getComputedStyle(el);
      var borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      var borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0;
      var borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
      var borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      // must use offset(Width|Height) because compatible with client(Width|Height)
      var scrollbarLeftRight = sanitizeScrollbarWidth(el.offsetWidth - el.clientWidth - borderLeft - borderRight);
      var scrollbarBottom = sanitizeScrollbarWidth(el.offsetHeight - el.clientHeight - borderTop - borderBottom);
      var res = {
          borderLeft: borderLeft,
          borderRight: borderRight,
          borderTop: borderTop,
          borderBottom: borderBottom,
          scrollbarBottom: scrollbarBottom,
          scrollbarLeft: 0,
          scrollbarRight: 0
      };
      if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') { // is the scrollbar on the left side?
          res.scrollbarLeft = scrollbarLeftRight;
      }
      else {
          res.scrollbarRight = scrollbarLeftRight;
      }
      if (getPadding) {
          res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
          res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
          res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
          res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
      }
      return res;
  }
  function computeInnerRect(el, goWithinPadding) {
      if (goWithinPadding === void 0) { goWithinPadding = false; }
      var outerRect = computeRect(el);
      var edges = computeEdges(el, goWithinPadding);
      var res = {
          left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
          right: outerRect.right - edges.borderRight - edges.scrollbarRight,
          top: outerRect.top + edges.borderTop,
          bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom
      };
      if (goWithinPadding) {
          res.left += edges.paddingLeft;
          res.right -= edges.paddingRight;
          res.top += edges.paddingTop;
          res.bottom -= edges.paddingBottom;
      }
      return res;
  }
  function computeRect(el) {
      var rect = el.getBoundingClientRect();
      return {
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          right: rect.right + window.pageXOffset,
          bottom: rect.bottom + window.pageYOffset
      };
  }
  function computeViewportRect() {
      return {
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          top: window.pageYOffset,
          bottom: window.pageYOffset + document.documentElement.clientHeight
      };
  }
  function computeHeightAndMargins(el) {
      return el.getBoundingClientRect().height + computeVMargins(el);
  }
  function computeVMargins(el) {
      var computed = window.getComputedStyle(el);
      return parseInt(computed.marginTop, 10) +
          parseInt(computed.marginBottom, 10);
  }
  // does not return window
  function getClippingParents(el) {
      var parents = [];
      while (el instanceof HTMLElement) { // will stop when gets to document or null
          var computedStyle = window.getComputedStyle(el);
          if (computedStyle.position === 'fixed') {
              break;
          }
          if ((/(auto|scroll)/).test(computedStyle.overflow + computedStyle.overflowY + computedStyle.overflowX)) {
              parents.push(el);
          }
          el = el.parentNode;
      }
      return parents;
  }
  function computeClippingRect(el) {
      return getClippingParents(el)
          .map(function (el) {
          return computeInnerRect(el);
      })
          .concat(computeViewportRect())
          .reduce(function (rect0, rect1) {
          return intersectRects(rect0, rect1) || rect1; // should always intersect
      });
  }
  // Event Delegation
  // ----------------------------------------------------------------------------------------------------------------
  function listenBySelector(container, eventType, selector, handler) {
      function realHandler(ev) {
          var matchedChild = elementClosest(ev.target, selector);
          if (matchedChild) {
              handler.call(matchedChild, ev, matchedChild);
          }
      }
      container.addEventListener(eventType, realHandler);
      return function () {
          container.removeEventListener(eventType, realHandler);
      };
  }
  function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
      var currentMatchedChild;
      return listenBySelector(container, 'mouseover', selector, function (ev, matchedChild) {
          if (matchedChild !== currentMatchedChild) {
              currentMatchedChild = matchedChild;
              onMouseEnter(ev, matchedChild);
              var realOnMouseLeave_1 = function (ev) {
                  currentMatchedChild = null;
                  onMouseLeave(ev, matchedChild);
                  matchedChild.removeEventListener('mouseleave', realOnMouseLeave_1);
              };
              // listen to the next mouseleave, and then unattach
              matchedChild.addEventListener('mouseleave', realOnMouseLeave_1);
          }
      });
  }

  var DAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  // Adding
  function addWeeks(m, n) {
      var a = dateToUtcArray(m);
      a[2] += n * 7;
      return arrayToUtcDate(a);
  }
  function addDays(m, n) {
      var a = dateToUtcArray(m);
      a[2] += n;
      return arrayToUtcDate(a);
  }
  function addMs(m, n) {
      var a = dateToUtcArray(m);
      a[6] += n;
      return arrayToUtcDate(a);
  }
  // Diffing (all return floats)
  function diffWeeks(m0, m1) {
      return diffDays(m0, m1) / 7;
  }
  function diffDays(m0, m1) {
      return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60 * 24);
  }
  function diffHours(m0, m1) {
      return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60);
  }
  function diffMinutes(m0, m1) {
      return (m1.valueOf() - m0.valueOf()) / (1000 * 60);
  }
  function diffSeconds(m0, m1) {
      return (m1.valueOf() - m0.valueOf()) / 1000;
  }
  function diffDayAndTime(m0, m1) {
      var m0day = startOfDay(m0);
      var m1day = startOfDay(m1);
      return {
          years: 0,
          months: 0,
          days: Math.round(diffDays(m0day, m1day)),
          milliseconds: (m1.valueOf() - m1day.valueOf()) - (m0.valueOf() - m0day.valueOf())
      };
  }
  // Diffing Whole Units
  function diffWholeWeeks(m0, m1) {
      var d = diffWholeDays(m0, m1);
      if (d !== null && d % 7 === 0) {
          return d / 7;
      }
      return null;
  }
  function diffWholeDays(m0, m1) {
      if (timeAsMs(m0) === timeAsMs(m1)) {
          return Math.round(diffDays(m0, m1));
      }
      return null;
  }
  // Start-Of
  function startOfDay(m) {
      return arrayToUtcDate([
          m.getUTCFullYear(),
          m.getUTCMonth(),
          m.getUTCDate()
      ]);
  }
  function startOfHour(m) {
      return arrayToUtcDate([
          m.getUTCFullYear(),
          m.getUTCMonth(),
          m.getUTCDate(),
          m.getUTCHours()
      ]);
  }
  function startOfMinute(m) {
      return arrayToUtcDate([
          m.getUTCFullYear(),
          m.getUTCMonth(),
          m.getUTCDate(),
          m.getUTCHours(),
          m.getUTCMinutes()
      ]);
  }
  function startOfSecond(m) {
      return arrayToUtcDate([
          m.getUTCFullYear(),
          m.getUTCMonth(),
          m.getUTCDate(),
          m.getUTCHours(),
          m.getUTCMinutes(),
          m.getUTCSeconds()
      ]);
  }
  // Week Computation
  function weekOfYear(marker, dow, doy) {
      var y = marker.getUTCFullYear();
      var w = weekOfGivenYear(marker, y, dow, doy);
      if (w < 1) {
          return weekOfGivenYear(marker, y - 1, dow, doy);
      }
      var nextW = weekOfGivenYear(marker, y + 1, dow, doy);
      if (nextW >= 1) {
          return Math.min(w, nextW);
      }
      return w;
  }
  function weekOfGivenYear(marker, year, dow, doy) {
      var firstWeekStart = arrayToUtcDate([year, 0, 1 + firstWeekOffset(year, dow, doy)]);
      var dayStart = startOfDay(marker);
      var days = Math.round(diffDays(firstWeekStart, dayStart));
      return Math.floor(days / 7) + 1; // zero-indexed
  }
  // start-of-first-week - start-of-year
  function firstWeekOffset(year, dow, doy) {
      // first-week day -- which january is always in the first week (4 for iso, 1 for other)
      var fwd = 7 + dow - doy;
      // first-week day local weekday -- which local weekday is fwd
      var fwdlw = (7 + arrayToUtcDate([year, 0, fwd]).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
  }
  // Array Conversion
  function dateToLocalArray(date) {
      return [
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
      ];
  }
  function arrayToLocalDate(a) {
      return new Date(a[0], a[1] || 0, a[2] == null ? 1 : a[2], // day of month
      a[3] || 0, a[4] || 0, a[5] || 0);
  }
  function dateToUtcArray(date) {
      return [
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds(),
          date.getUTCMilliseconds()
      ];
  }
  function arrayToUtcDate(a) {
      // according to web standards (and Safari), a month index is required.
      // massage if only given a year.
      if (a.length === 1) {
          a = a.concat([0]);
      }
      return new Date(Date.UTC.apply(Date, a));
  }
  // Other Utils
  function isValidDate(m) {
      return !isNaN(m.valueOf());
  }
  function timeAsMs(m) {
      return m.getUTCHours() * 1000 * 60 * 60 +
          m.getUTCMinutes() * 1000 * 60 +
          m.getUTCSeconds() * 1000 +
          m.getUTCMilliseconds();
  }
  var PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
  // Parsing and Creation
  function createDuration(input, unit) {
      var _a;
      if (typeof input === 'string') {
          return parseString(input);
      }
      else if (typeof input === 'object' && input) { // non-null object
          return normalizeObject(input);
      }
      else if (typeof input === 'number') {
          return normalizeObject((_a = {}, _a[unit || 'milliseconds'] = input, _a));
      }
      else {
          return null;
      }
  }
  function parseString(s) {
      var m = PARSE_RE.exec(s);
      if (m) {
          var sign = m[1] ? -1 : 1;
          return {
              years: 0,
              months: 0,
              days: sign * (m[2] ? parseInt(m[2], 10) : 0),
              milliseconds: sign * ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1000 + // hours
                  (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1000 + // minutes
                  (m[5] ? parseInt(m[5], 10) : 0) * 1000 + // seconds
                  (m[6] ? parseInt(m[6], 10) : 0) // ms
              )
          };
      }
      return null;
  }
  function normalizeObject(obj) {
      return {
          years: obj.years || obj.year || 0,
          months: obj.months || obj.month || 0,
          days: (obj.days || obj.day || 0) +
              getWeeksFromInput(obj) * 7,
          milliseconds: (obj.hours || obj.hour || 0) * 60 * 60 * 1000 + // hours
              (obj.minutes || obj.minute || 0) * 60 * 1000 + // minutes
              (obj.seconds || obj.second || 0) * 1000 + // seconds
              (obj.milliseconds || obj.millisecond || obj.ms || 0) // ms
      };
  }
  function getWeeksFromInput(obj) {
      return obj.weeks || obj.week || 0;
  }
  // Equality
  function durationsEqual(d0, d1) {
      return d0.years === d1.years &&
          d0.months === d1.months &&
          d0.days === d1.days &&
          d0.milliseconds === d1.milliseconds;
  }
  function subtractDurations(d1, d0) {
      return {
          years: d1.years - d0.years,
          months: d1.months - d0.months,
          days: d1.days - d0.days,
          milliseconds: d1.milliseconds - d0.milliseconds
      };
  }
  // Conversions
  // "Rough" because they are based on average-case Gregorian months/years
  function asRoughYears(dur) {
      return asRoughDays(dur) / 365;
  }
  function asRoughMonths(dur) {
      return asRoughDays(dur) / 30;
  }
  function asRoughDays(dur) {
      return asRoughMs(dur) / 864e5;
  }
  function asRoughMs(dur) {
      return dur.years * (365 * 864e5) +
          dur.months * (30 * 864e5) +
          dur.days * 864e5 +
          dur.milliseconds;
  }
  function greatestDurationDenominator(dur, dontReturnWeeks) {
      var ms = dur.milliseconds;
      if (ms) {
          if (ms % 1000 !== 0) {
              return { unit: 'millisecond', value: ms };
          }
          if (ms % (1000 * 60) !== 0) {
              return { unit: 'second', value: ms / 1000 };
          }
          if (ms % (1000 * 60 * 60) !== 0) {
              return { unit: 'minute', value: ms / (1000 * 60) };
          }
          if (ms) {
              return { unit: 'hour', value: ms / (1000 * 60 * 60) };
          }
      }
      if (dur.days) {
          if (!dontReturnWeeks && dur.days % 7 === 0) {
              return { unit: 'week', value: dur.days / 7 };
          }
          return { unit: 'day', value: dur.days };
      }
      if (dur.months) {
          return { unit: 'month', value: dur.months };
      }
      if (dur.years) {
          return { unit: 'year', value: dur.years };
      }
      return { unit: 'millisecond', value: 0 };
  }

  /* FullCalendar-specific DOM Utilities
  ----------------------------------------------------------------------------------------------------------------------*/
  // Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
  // and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
  function compensateScroll(rowEl, scrollbarWidths) {
      if (scrollbarWidths.left) {
          applyStyle(rowEl, {
              borderLeftWidth: 1,
              marginLeft: scrollbarWidths.left - 1
          });
      }
      if (scrollbarWidths.right) {
          applyStyle(rowEl, {
              borderRightWidth: 1,
              marginRight: scrollbarWidths.right - 1
          });
      }
  }
  // Undoes compensateScroll and restores all borders/margins
  function uncompensateScroll(rowEl) {
      applyStyle(rowEl, {
          marginLeft: '',
          marginRight: '',
          borderLeftWidth: '',
          borderRightWidth: ''
      });
  }
  // Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
  // By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
  // any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and
  // reduces the available height.
  function distributeHeight(els, availableHeight, shouldRedistribute) {
      // *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
      // and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.
      var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
      var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
      var flexEls = []; // elements that are allowed to expand. array of DOM nodes
      var flexOffsets = []; // amount of vertical space it takes up
      var flexHeights = []; // actual css height
      var usedHeight = 0;
      undistributeHeight(els); // give all elements their natural height
      // find elements that are below the recommended height (expandable).
      // important to query for heights in a single first pass (to avoid reflow oscillation).
      els.forEach(function (el, i) {
          var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
          var naturalHeight = el.getBoundingClientRect().height;
          var naturalOffset = naturalHeight + computeVMargins(el);
          if (naturalOffset < minOffset) {
              flexEls.push(el);
              flexOffsets.push(naturalOffset);
              flexHeights.push(naturalHeight);
          }
          else {
              // this element stretches past recommended height (non-expandable). mark the space as occupied.
              usedHeight += naturalOffset;
          }
      });
      // readjust the recommended height to only consider the height available to non-maxed-out rows.
      if (shouldRedistribute) {
          availableHeight -= usedHeight;
          minOffset1 = Math.floor(availableHeight / flexEls.length);
          minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
      }
      // assign heights to all expandable elements
      flexEls.forEach(function (el, i) {
          var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
          var naturalOffset = flexOffsets[i];
          var naturalHeight = flexHeights[i];
          var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding
          if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
              el.style.height = newHeight + 'px';
          }
      });
  }
  // Undoes distrubuteHeight, restoring all els to their natural height
  function undistributeHeight(els) {
      els.forEach(function (el) {
          el.style.height = '';
      });
  }
  // Given `els`, a set of <td> cells, find the cell with the largest natural width and set the widths of all the
  // cells to be that width.
  // PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
  function matchCellWidths(els) {
      var maxInnerWidth = 0;
      els.forEach(function (el) {
          var innerEl = el.firstChild; // hopefully an element
          if (innerEl instanceof HTMLElement) {
              var innerWidth_1 = innerEl.getBoundingClientRect().width;
              if (innerWidth_1 > maxInnerWidth) {
                  maxInnerWidth = innerWidth_1;
              }
          }
      });
      maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance
      els.forEach(function (el) {
          el.style.width = maxInnerWidth + 'px';
      });
      return maxInnerWidth;
  }
  // Given one element that resides inside another,
  // Subtracts the height of the inner element from the outer element.
  function subtractInnerElHeight(outerEl, innerEl) {
      // effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
      var reflowStyleProps = {
          position: 'relative',
          left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
      };
      applyStyle(outerEl, reflowStyleProps);
      applyStyle(innerEl, reflowStyleProps);
      var diff = // grab the dimensions
       outerEl.getBoundingClientRect().height -
          innerEl.getBoundingClientRect().height;
      // undo hack
      var resetStyleProps = { position: '', left: '' };
      applyStyle(outerEl, resetStyleProps);
      applyStyle(innerEl, resetStyleProps);
      return diff;
  }
  /* Object Ordering by Field
  ----------------------------------------------------------------------------------------------------------------------*/
  function parseFieldSpecs(input) {
      var specs = [];
      var tokens = [];
      var i;
      var token;
      if (typeof input === 'string') {
          tokens = input.split(/\s*,\s*/);
      }
      else if (typeof input === 'function') {
          tokens = [input];
      }
      else if (Array.isArray(input)) {
          tokens = input;
      }
      for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          if (typeof token === 'string') {
              specs.push(token.charAt(0) === '-' ?
                  { field: token.substring(1), order: -1 } :
                  { field: token, order: 1 });
          }
          else if (typeof token === 'function') {
              specs.push({ func: token });
          }
      }
      return specs;
  }
  function compareByFieldSpecs(obj0, obj1, fieldSpecs) {
      var i;
      var cmp;
      for (i = 0; i < fieldSpecs.length; i++) {
          cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i]);
          if (cmp) {
              return cmp;
          }
      }
      return 0;
  }
  function compareByFieldSpec(obj0, obj1, fieldSpec) {
      if (fieldSpec.func) {
          return fieldSpec.func(obj0, obj1);
      }
      return flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field])
          * (fieldSpec.order || 1);
  }
  function flexibleCompare(a, b) {
      if (!a && !b) {
          return 0;
      }
      if (b == null) {
          return -1;
      }
      if (a == null) {
          return 1;
      }
      if (typeof a === 'string' || typeof b === 'string') {
          return String(a).localeCompare(String(b));
      }
      return a - b;
  }
  /* String Utilities
  ----------------------------------------------------------------------------------------------------------------------*/
  function capitaliseFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function padStart(val, len) {
      var s = String(val);
      return '000'.substr(0, len - s.length) + s;
  }
  function isInt(n) {
      return n % 1 === 0;
  }
  /* Weird Utilities
  ----------------------------------------------------------------------------------------------------------------------*/
  function applyAll(functions, thisObj, args) {
      if (typeof functions === 'function') { // supplied a single function
          functions = [functions];
      }
      if (functions) {
          var i = void 0;
          var ret = void 0;
          for (i = 0; i < functions.length; i++) {
              ret = functions[i].apply(thisObj, args) || ret;
          }
          return ret;
      }
  }
  function firstDefined() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      for (var i = 0; i < args.length; i++) {
          if (args[i] !== undefined) {
              return args[i];
          }
      }
  }
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
  function debounce(func, wait) {
      var timeout;
      var args;
      var context;
      var timestamp;
      var result;
      var later = function () {
          var last = new Date().valueOf() - timestamp;
          if (last < wait) {
              timeout = setTimeout(later, wait - last);
          }
          else {
              timeout = null;
              result = func.apply(context, args);
              context = args = null;
          }
      };
      return function () {
          context = this;
          args = arguments;
          timestamp = new Date().valueOf();
          if (!timeout) {
              timeout = setTimeout(later, wait);
          }
          return result;
      };
  }
  // Number and Boolean are only types that defaults or not computed for
  // TODO: write more comments
  function refineProps(rawProps, processors, defaults, leftoverProps) {
      if (defaults === void 0) { defaults = {}; }
      var refined = {};
      for (var key in processors) {
          var processor = processors[key];
          if (rawProps[key] !== undefined) {
              // found
              if (processor === Function) {
                  refined[key] = typeof rawProps[key] === 'function' ? rawProps[key] : null;
              }
              else if (processor) { // a refining function?
                  refined[key] = processor(rawProps[key]);
              }
              else {
                  refined[key] = rawProps[key];
              }
          }
          else if (defaults[key] !== undefined) {
              // there's an explicit default
              refined[key] = defaults[key];
          }
          else {
              // must compute a default
              if (processor === String) {
                  refined[key] = ''; // empty string is default for String
              }
              else if (!processor || processor === Number || processor === Boolean || processor === Function) {
                  refined[key] = null; // assign null for other non-custom processor funcs
              }
              else {
                  refined[key] = processor(null); // run the custom processor func
              }
          }
      }
      if (leftoverProps) {
          for (var key in rawProps) {
              if (processors[key] === undefined) {
                  leftoverProps[key] = rawProps[key];
              }
          }
      }
      return refined;
  }
  /* Date stuff that doesn't belong in datelib core
  ----------------------------------------------------------------------------------------------------------------------*/
  // given a timed range, computes an all-day range that has the same exact duration,
  // but whose start time is aligned with the start of the day.
  function computeAlignedDayRange(timedRange) {
      var dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1;
      var start = startOfDay(timedRange.start);
      var end = addDays(start, dayCnt);
      return { start: start, end: end };
  }
  // given a timed range, computes an all-day range based on how for the end date bleeds into the next day
  // TODO: give nextDayThreshold a default arg
  function computeVisibleDayRange(timedRange, nextDayThreshold) {
      if (nextDayThreshold === void 0) { nextDayThreshold = createDuration(0); }
      var startDay = null;
      var endDay = null;
      if (timedRange.end) {
          endDay = startOfDay(timedRange.end);
          var endTimeMS = timedRange.end.valueOf() - endDay.valueOf(); // # of milliseconds into `endDay`
          // If the end time is actually inclusively part of the next day and is equal to or
          // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
          // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
          if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) {
              endDay = addDays(endDay, 1);
          }
      }
      if (timedRange.start) {
          startDay = startOfDay(timedRange.start); // the beginning of the day the range starts
          // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
          if (endDay && endDay <= startDay) {
              endDay = addDays(startDay, 1);
          }
      }
      return { start: startDay, end: endDay };
  }
  function diffDates(date0, date1, dateEnv, largeUnit) {
      if (largeUnit === 'year') {
          return createDuration(dateEnv.diffWholeYears(date0, date1), 'year');
      }
      else if (largeUnit === 'month') {
          return createDuration(dateEnv.diffWholeMonths(date0, date1), 'month');
      }
      else {
          return diffDayAndTime(date0, date1); // returns a duration
      }
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function parseRecurring(eventInput, allDayDefault, dateEnv, recurringTypes, leftovers) {
      for (var i = 0; i < recurringTypes.length; i++) {
          var localLeftovers = {};
          var parsed = recurringTypes[i].parse(eventInput, localLeftovers, dateEnv);
          if (parsed) {
              var allDay = localLeftovers.allDay;
              delete localLeftovers.allDay; // remove from leftovers
              if (allDay == null) {
                  allDay = allDayDefault;
                  if (allDay == null) {
                      allDay = parsed.allDayGuess;
                      if (allDay == null) {
                          allDay = false;
                      }
                  }
              }
              __assign(leftovers, localLeftovers);
              return {
                  allDay: allDay,
                  duration: parsed.duration,
                  typeData: parsed.typeData,
                  typeId: i
              };
          }
      }
      return null;
  }
  /*
  Event MUST have a recurringDef
  */
  function expandRecurringRanges(eventDef, duration, framingRange, dateEnv, recurringTypes) {
      var typeDef = recurringTypes[eventDef.recurringDef.typeId];
      var markers = typeDef.expand(eventDef.recurringDef.typeData, {
          start: dateEnv.subtract(framingRange.start, duration),
          end: framingRange.end
      }, dateEnv);
      // the recurrence plugins don't guarantee that all-day events are start-of-day, so we have to
      if (eventDef.allDay) {
          markers = markers.map(startOfDay);
      }
      return markers;
  }

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  // Merges an array of objects into a single object.
  // The second argument allows for an array of property names who's object values will be merged together.
  function mergeProps(propObjs, complexProps) {
      var dest = {};
      var i;
      var name;
      var complexObjs;
      var j;
      var val;
      var props;
      if (complexProps) {
          for (i = 0; i < complexProps.length; i++) {
              name = complexProps[i];
              complexObjs = [];
              // collect the trailing object values, stopping when a non-object is discovered
              for (j = propObjs.length - 1; j >= 0; j--) {
                  val = propObjs[j][name];
                  if (typeof val === 'object' && val) { // non-null object
                      complexObjs.unshift(val);
                  }
                  else if (val !== undefined) {
                      dest[name] = val; // if there were no objects, this value will be used
                      break;
                  }
              }
              // if the trailing values were objects, use the merged value
              if (complexObjs.length) {
                  dest[name] = mergeProps(complexObjs);
              }
          }
      }
      // copy values into the destination, going from last to first
      for (i = propObjs.length - 1; i >= 0; i--) {
          props = propObjs[i];
          for (name in props) {
              if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
                  dest[name] = props[name];
              }
          }
      }
      return dest;
  }
  function filterHash(hash, func) {
      var filtered = {};
      for (var key in hash) {
          if (func(hash[key], key)) {
              filtered[key] = hash[key];
          }
      }
      return filtered;
  }
  function mapHash(hash, func) {
      var newHash = {};
      for (var key in hash) {
          newHash[key] = func(hash[key], key);
      }
      return newHash;
  }
  function arrayToHash(a) {
      var hash = {};
      for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
          var item = a_1[_i];
          hash[item] = true;
      }
      return hash;
  }
  function hashValuesToArray(obj) {
      var a = [];
      for (var key in obj) {
          a.push(obj[key]);
      }
      return a;
  }
  function isPropsEqual(obj0, obj1) {
      for (var key in obj0) {
          if (hasOwnProperty$1.call(obj0, key)) {
              if (!(key in obj1)) {
                  return false;
              }
          }
      }
      for (var key in obj1) {
          if (hasOwnProperty$1.call(obj1, key)) {
              if (obj0[key] !== obj1[key]) {
                  return false;
              }
          }
      }
      return true;
  }

  function parseEvents(rawEvents, sourceId, calendar, allowOpenRange) {
      var eventStore = createEmptyEventStore();
      for (var _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
          var rawEvent = rawEvents_1[_i];
          var tuple = parseEvent(rawEvent, sourceId, calendar, allowOpenRange);
          if (tuple) {
              eventTupleToStore(tuple, eventStore);
          }
      }
      return eventStore;
  }
  function eventTupleToStore(tuple, eventStore) {
      if (eventStore === void 0) { eventStore = createEmptyEventStore(); }
      eventStore.defs[tuple.def.defId] = tuple.def;
      if (tuple.instance) {
          eventStore.instances[tuple.instance.instanceId] = tuple.instance;
      }
      return eventStore;
  }
  function expandRecurring(eventStore, framingRange, calendar) {
      var dateEnv = calendar.dateEnv;
      var defs = eventStore.defs, instances = eventStore.instances;
      // remove existing recurring instances
      instances = filterHash(instances, function (instance) {
          return !defs[instance.defId].recurringDef;
      });
      for (var defId in defs) {
          var def = defs[defId];
          if (def.recurringDef) {
              var duration = def.recurringDef.duration;
              if (!duration) {
                  duration = def.allDay ?
                      calendar.defaultAllDayEventDuration :
                      calendar.defaultTimedEventDuration;
              }
              var starts = expandRecurringRanges(def, duration, framingRange, calendar.dateEnv, calendar.pluginSystem.hooks.recurringTypes);
              for (var _i = 0, starts_1 = starts; _i < starts_1.length; _i++) {
                  var start = starts_1[_i];
                  var instance = createEventInstance(defId, {
                      start: start,
                      end: dateEnv.add(start, duration)
                  });
                  instances[instance.instanceId] = instance;
              }
          }
      }
      return { defs: defs, instances: instances };
  }
  // retrieves events that have the same groupId as the instance specified by `instanceId`
  // or they are the same as the instance.
  // why might instanceId not be in the store? an event from another calendar?
  function getRelevantEvents(eventStore, instanceId) {
      var instance = eventStore.instances[instanceId];
      if (instance) {
          var def_1 = eventStore.defs[instance.defId];
          // get events/instances with same group
          var newStore = filterEventStoreDefs(eventStore, function (lookDef) {
              return isEventDefsGrouped(def_1, lookDef);
          });
          // add the original
          // TODO: wish we could use eventTupleToStore or something like it
          newStore.defs[def_1.defId] = def_1;
          newStore.instances[instance.instanceId] = instance;
          return newStore;
      }
      return createEmptyEventStore();
  }
  function isEventDefsGrouped(def0, def1) {
      return Boolean(def0.groupId && def0.groupId === def1.groupId);
  }
  function transformRawEvents(rawEvents, eventSource, calendar) {
      var calEachTransform = calendar.opt('eventDataTransform');
      var sourceEachTransform = eventSource ? eventSource.eventDataTransform : null;
      if (sourceEachTransform) {
          rawEvents = transformEachRawEvent(rawEvents, sourceEachTransform);
      }
      if (calEachTransform) {
          rawEvents = transformEachRawEvent(rawEvents, calEachTransform);
      }
      return rawEvents;
  }
  function transformEachRawEvent(rawEvents, func) {
      var refinedEvents;
      if (!func) {
          refinedEvents = rawEvents;
      }
      else {
          refinedEvents = [];
          for (var _i = 0, rawEvents_2 = rawEvents; _i < rawEvents_2.length; _i++) {
              var rawEvent = rawEvents_2[_i];
              var refinedEvent = func(rawEvent);
              if (refinedEvent) {
                  refinedEvents.push(refinedEvent);
              }
              else if (refinedEvent == null) {
                  refinedEvents.push(rawEvent);
              } // if a different falsy value, do nothing
          }
      }
      return refinedEvents;
  }
  function createEmptyEventStore() {
      return { defs: {}, instances: {} };
  }
  function mergeEventStores(store0, store1) {
      return {
          defs: __assign({}, store0.defs, store1.defs),
          instances: __assign({}, store0.instances, store1.instances)
      };
  }
  function filterEventStoreDefs(eventStore, filterFunc) {
      var defs = filterHash(eventStore.defs, filterFunc);
      var instances = filterHash(eventStore.instances, function (instance) {
          return defs[instance.defId]; // still exists?
      });
      return { defs: defs, instances: instances };
  }

  function parseRange(input, dateEnv) {
      var start = null;
      var end = null;
      if (input.start) {
          start = dateEnv.createMarker(input.start);
      }
      if (input.end) {
          end = dateEnv.createMarker(input.end);
      }
      if (!start && !end) {
          return null;
      }
      if (start && end && end < start) {
          return null;
      }
      return { start: start, end: end };
  }
  // SIDE-EFFECT: will mutate ranges.
  // Will return a new array result.
  function invertRanges(ranges, constraintRange) {
      var invertedRanges = [];
      var start = constraintRange.start; // the end of the previous range. the start of the new range
      var i;
      var dateRange;
      // ranges need to be in order. required for our date-walking algorithm
      ranges.sort(compareRanges);
      for (i = 0; i < ranges.length; i++) {
          dateRange = ranges[i];
          // add the span of time before the event (if there is any)
          if (dateRange.start > start) { // compare millisecond time (skip any ambig logic)
              invertedRanges.push({ start: start, end: dateRange.start });
          }
          if (dateRange.end > start) {
              start = dateRange.end;
          }
      }
      // add the span of time after the last event (if there is any)
      if (start < constraintRange.end) { // compare millisecond time (skip any ambig logic)
          invertedRanges.push({ start: start, end: constraintRange.end });
      }
      return invertedRanges;
  }
  function compareRanges(range0, range1) {
      return range0.start.valueOf() - range1.start.valueOf(); // earlier ranges go first
  }
  function intersectRanges(range0, range1) {
      var start = range0.start;
      var end = range0.end;
      var newRange = null;
      if (range1.start !== null) {
          if (start === null) {
              start = range1.start;
          }
          else {
              start = new Date(Math.max(start.valueOf(), range1.start.valueOf()));
          }
      }
      if (range1.end != null) {
          if (end === null) {
              end = range1.end;
          }
          else {
              end = new Date(Math.min(end.valueOf(), range1.end.valueOf()));
          }
      }
      if (start === null || end === null || start < end) {
          newRange = { start: start, end: end };
      }
      return newRange;
  }
  function rangesEqual(range0, range1) {
      return (range0.start === null ? null : range0.start.valueOf()) === (range1.start === null ? null : range1.start.valueOf()) &&
          (range0.end === null ? null : range0.end.valueOf()) === (range1.end === null ? null : range1.end.valueOf());
  }
  function rangesIntersect(range0, range1) {
      return (range0.end === null || range1.start === null || range0.end > range1.start) &&
          (range0.start === null || range1.end === null || range0.start < range1.end);
  }
  function rangeContainsRange(outerRange, innerRange) {
      return (outerRange.start === null || (innerRange.start !== null && innerRange.start >= outerRange.start)) &&
          (outerRange.end === null || (innerRange.end !== null && innerRange.end <= outerRange.end));
  }
  function rangeContainsMarker(range, date) {
      return (range.start === null || date >= range.start) &&
          (range.end === null || date < range.end);
  }
  // If the given date is not within the given range, move it inside.
  // (If it's past the end, make it one millisecond before the end).
  function constrainMarkerToRange(date, range) {
      if (range.start != null && date < range.start) {
          return range.start;
      }
      if (range.end != null && date >= range.end) {
          return new Date(range.end.valueOf() - 1);
      }
      return date;
  }
  function isArraysEqual(a0, a1) {
      var len = a0.length;
      var i;
      if (len !== a1.length) { // not array? or not same length?
          return false;
      }
      for (i = 0; i < len; i++) {
          if (a0[i] !== a1[i]) {
              return false;
          }
      }
      return true;
  }

  function memoize(workerFunc) {
      var args;
      var res;
      return function () {
          if (!args || !isArraysEqual(args, arguments)) {
              args = arguments;
              res = workerFunc.apply(this, arguments);
          }
          return res;
      };
  }
  /*
  always executes the workerFunc, but if the result is equal to the previous result,
  return the previous result instead.
  */
  function memoizeOutput(workerFunc, equalityFunc) {
      var cachedRes = null;
      return function () {
          var newRes = workerFunc.apply(this, arguments);
          if (cachedRes === null || !(cachedRes === newRes || equalityFunc(cachedRes, newRes))) {
              cachedRes = newRes;
          }
          return cachedRes;
      };
  }

  var EXTENDED_SETTINGS_AND_SEVERITIES = {
      week: 3,
      separator: 0,
      omitZeroMinute: 0,
      meridiem: 0,
      omitCommas: 0
  };
  var STANDARD_DATE_PROP_SEVERITIES = {
      timeZoneName: 7,
      era: 6,
      year: 5,
      month: 4,
      day: 2,
      weekday: 2,
      hour: 1,
      minute: 1,
      second: 1
  };
  var MERIDIEM_RE = /\s*([ap])\.?m\.?/i; // eats up leading spaces too
  var COMMA_RE = /,/g; // we need re for globalness
  var MULTI_SPACE_RE = /\s+/g;
  var LTR_RE = /\u200e/g; // control character
  var UTC_RE = /UTC|GMT/;
  var NativeFormatter = /** @class */ (function () {
      function NativeFormatter(formatSettings) {
          var standardDateProps = {};
          var extendedSettings = {};
          var severity = 0;
          for (var name_1 in formatSettings) {
              if (name_1 in EXTENDED_SETTINGS_AND_SEVERITIES) {
                  extendedSettings[name_1] = formatSettings[name_1];
                  severity = Math.max(EXTENDED_SETTINGS_AND_SEVERITIES[name_1], severity);
              }
              else {
                  standardDateProps[name_1] = formatSettings[name_1];
                  if (name_1 in STANDARD_DATE_PROP_SEVERITIES) {
                      severity = Math.max(STANDARD_DATE_PROP_SEVERITIES[name_1], severity);
                  }
              }
          }
          this.standardDateProps = standardDateProps;
          this.extendedSettings = extendedSettings;
          this.severity = severity;
          this.buildFormattingFunc = memoize(buildFormattingFunc);
      }
      NativeFormatter.prototype.format = function (date, context) {
          return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, context)(date);
      };
      NativeFormatter.prototype.formatRange = function (start, end, context) {
          var _a = this, standardDateProps = _a.standardDateProps, extendedSettings = _a.extendedSettings;
          var diffSeverity = computeMarkerDiffSeverity(start.marker, end.marker, context.calendarSystem);
          if (!diffSeverity) {
              return this.format(start, context);
          }
          var biggestUnitForPartial = diffSeverity;
          if (biggestUnitForPartial > 1 && // the two dates are different in a way that's larger scale than time
              (standardDateProps.year === 'numeric' || standardDateProps.year === '2-digit') &&
              (standardDateProps.month === 'numeric' || standardDateProps.month === '2-digit') &&
              (standardDateProps.day === 'numeric' || standardDateProps.day === '2-digit')) {
              biggestUnitForPartial = 1; // make it look like the dates are only different in terms of time
          }
          var full0 = this.format(start, context);
          var full1 = this.format(end, context);
          if (full0 === full1) {
              return full0;
          }
          var partialDateProps = computePartialFormattingOptions(standardDateProps, biggestUnitForPartial);
          var partialFormattingFunc = buildFormattingFunc(partialDateProps, extendedSettings, context);
          var partial0 = partialFormattingFunc(start);
          var partial1 = partialFormattingFunc(end);
          var insertion = findCommonInsertion(full0, partial0, full1, partial1);
          var separator = extendedSettings.separator || '';
          if (insertion) {
              return insertion.before + partial0 + separator + partial1 + insertion.after;
          }
          return full0 + separator + full1;
      };
      NativeFormatter.prototype.getLargestUnit = function () {
          switch (this.severity) {
              case 7:
              case 6:
              case 5:
                  return 'year';
              case 4:
                  return 'month';
              case 3:
                  return 'week';
              default:
                  return 'day';
          }
      };
      return NativeFormatter;
  }());
  function buildFormattingFunc(standardDateProps, extendedSettings, context) {
      var standardDatePropCnt = Object.keys(standardDateProps).length;
      if (standardDatePropCnt === 1 && standardDateProps.timeZoneName === 'short') {
          return function (date) {
              return formatTimeZoneOffset(date.timeZoneOffset);
          };
      }
      if (standardDatePropCnt === 0 && extendedSettings.week) {
          return function (date) {
              return formatWeekNumber(context.computeWeekNumber(date.marker), context.weekLabel, context.locale, extendedSettings.week);
          };
      }
      return buildNativeFormattingFunc(standardDateProps, extendedSettings, context);
  }
  function buildNativeFormattingFunc(standardDateProps, extendedSettings, context) {
      standardDateProps = __assign({}, standardDateProps); // copy
      extendedSettings = __assign({}, extendedSettings); // copy
      sanitizeSettings(standardDateProps, extendedSettings);
      standardDateProps.timeZone = 'UTC'; // we leverage the only guaranteed timeZone for our UTC markers
      var normalFormat = new Intl.DateTimeFormat(context.locale.codes, standardDateProps);
      var zeroFormat; // needed?
      if (extendedSettings.omitZeroMinute) {
          var zeroProps = __assign({}, standardDateProps);
          delete zeroProps.minute; // seconds and ms were already considered in sanitizeSettings
          zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps);
      }
      return function (date) {
          var marker = date.marker;
          var format;
          if (zeroFormat && !marker.getUTCMinutes()) {
              format = zeroFormat;
          }
          else {
              format = normalFormat;
          }
          var s = format.format(marker);
          return postProcess(s, date, standardDateProps, extendedSettings, context);
      };
  }
  function sanitizeSettings(standardDateProps, extendedSettings) {
      // deal with a browser inconsistency where formatting the timezone
      // requires that the hour/minute be present.
      if (standardDateProps.timeZoneName) {
          if (!standardDateProps.hour) {
              standardDateProps.hour = '2-digit';
          }
          if (!standardDateProps.minute) {
              standardDateProps.minute = '2-digit';
          }
      }
      // only support short timezone names
      if (standardDateProps.timeZoneName === 'long') {
          standardDateProps.timeZoneName = 'short';
      }
      // if requesting to display seconds, MUST display minutes
      if (extendedSettings.omitZeroMinute && (standardDateProps.second || standardDateProps.millisecond)) {
          delete extendedSettings.omitZeroMinute;
      }
  }
  function postProcess(s, date, standardDateProps, extendedSettings, context) {
      s = s.replace(LTR_RE, ''); // remove left-to-right control chars. do first. good for other regexes
      if (standardDateProps.timeZoneName === 'short') {
          s = injectTzoStr(s, (context.timeZone === 'UTC' || date.timeZoneOffset == null) ?
              'UTC' : // important to normalize for IE, which does "GMT"
              formatTimeZoneOffset(date.timeZoneOffset));
      }
      if (extendedSettings.omitCommas) {
          s = s.replace(COMMA_RE, '').trim();
      }
      if (extendedSettings.omitZeroMinute) {
          s = s.replace(':00', ''); // zeroFormat doesn't always achieve this
      }
      // ^ do anything that might create adjacent spaces before this point,
      // because MERIDIEM_RE likes to eat up loading spaces
      if (extendedSettings.meridiem === false) {
          s = s.replace(MERIDIEM_RE, '').trim();
      }
      else if (extendedSettings.meridiem === 'narrow') { // a/p
          s = s.replace(MERIDIEM_RE, function (m0, m1) {
              return m1.toLocaleLowerCase();
          });
      }
      else if (extendedSettings.meridiem === 'short') { // am/pm
          s = s.replace(MERIDIEM_RE, function (m0, m1) {
              return m1.toLocaleLowerCase() + 'm';
          });
      }
      else if (extendedSettings.meridiem === 'lowercase') { // other meridiem transformers already converted to lowercase
          s = s.replace(MERIDIEM_RE, function (m0) {
              return m0.toLocaleLowerCase();
          });
      }
      s = s.replace(MULTI_SPACE_RE, ' ');
      s = s.trim();
      return s;
  }
  function injectTzoStr(s, tzoStr) {
      var replaced = false;
      s = s.replace(UTC_RE, function () {
          replaced = true;
          return tzoStr;
      });
      // IE11 doesn't include UTC/GMT in the original string, so append to end
      if (!replaced) {
          s += ' ' + tzoStr;
      }
      return s;
  }
  function formatWeekNumber(num, weekLabel, locale, display) {
      var parts = [];
      if (display === 'narrow') {
          parts.push(weekLabel);
      }
      else if (display === 'short') {
          parts.push(weekLabel, ' ');
      }
      // otherwise, considered 'numeric'
      parts.push(locale.simpleNumberFormat.format(num));
      if (locale.options.isRtl) { // TODO: use control characters instead?
          parts.reverse();
      }
      return parts.join('');
  }
  // Range Formatting Utils
  // 0 = exactly the same
  // 1 = different by time
  // and bigger
  function computeMarkerDiffSeverity(d0, d1, ca) {
      if (ca.getMarkerYear(d0) !== ca.getMarkerYear(d1)) {
          return 5;
      }
      if (ca.getMarkerMonth(d0) !== ca.getMarkerMonth(d1)) {
          return 4;
      }
      if (ca.getMarkerDay(d0) !== ca.getMarkerDay(d1)) {
          return 2;
      }
      if (timeAsMs(d0) !== timeAsMs(d1)) {
          return 1;
      }
      return 0;
  }
  function computePartialFormattingOptions(options, biggestUnit) {
      var partialOptions = {};
      for (var name_2 in options) {
          if (!(name_2 in STANDARD_DATE_PROP_SEVERITIES) || // not a date part prop (like timeZone)
              STANDARD_DATE_PROP_SEVERITIES[name_2] <= biggestUnit) {
              partialOptions[name_2] = options[name_2];
          }
      }
      return partialOptions;
  }
  function findCommonInsertion(full0, partial0, full1, partial1) {
      var i0 = 0;
      while (i0 < full0.length) {
          var found0 = full0.indexOf(partial0, i0);
          if (found0 === -1) {
              break;
          }
          var before0 = full0.substr(0, found0);
          i0 = found0 + partial0.length;
          var after0 = full0.substr(i0);
          var i1 = 0;
          while (i1 < full1.length) {
              var found1 = full1.indexOf(partial1, i1);
              if (found1 === -1) {
                  break;
              }
              var before1 = full1.substr(0, found1);
              i1 = found1 + partial1.length;
              var after1 = full1.substr(i1);
              if (before0 === before1 && after0 === after1) {
                  return {
                      before: before0,
                      after: after0
                  };
              }
          }
      }
      return null;
  }

  /*
  TODO: fix the terminology of "formatter" vs "formatting func"
  */
  /*
  At the time of instantiation, this object does not know which cmd-formatting system it will use.
  It receives this at the time of formatting, as a setting.
  */
  var CmdFormatter = /** @class */ (function () {
      function CmdFormatter(cmdStr, separator) {
          this.cmdStr = cmdStr;
          this.separator = separator;
      }
      CmdFormatter.prototype.format = function (date, context) {
          return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context, this.separator));
      };
      CmdFormatter.prototype.formatRange = function (start, end, context) {
          return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context, this.separator));
      };
      return CmdFormatter;
  }());

  var FuncFormatter = /** @class */ (function () {
      function FuncFormatter(func) {
          this.func = func;
      }
      FuncFormatter.prototype.format = function (date, context) {
          return this.func(createVerboseFormattingArg(date, null, context));
      };
      FuncFormatter.prototype.formatRange = function (start, end, context) {
          return this.func(createVerboseFormattingArg(start, end, context));
      };
      return FuncFormatter;
  }());

  // Formatter Object Creation
  function createFormatter(input, defaultSeparator) {
      if (typeof input === 'object' && input) { // non-null object
          if (typeof defaultSeparator === 'string') {
              input = __assign({ separator: defaultSeparator }, input);
          }
          return new NativeFormatter(input);
      }
      else if (typeof input === 'string') {
          return new CmdFormatter(input, defaultSeparator);
      }
      else if (typeof input === 'function') {
          return new FuncFormatter(input);
      }
  }
  // String Utils
  // timeZoneOffset is in minutes
  function buildIsoString(marker, timeZoneOffset, stripZeroTime) {
      if (stripZeroTime === void 0) { stripZeroTime = false; }
      var s = marker.toISOString();
      s = s.replace('.000', '');
      if (stripZeroTime) {
          s = s.replace('T00:00:00Z', '');
      }
      if (s.length > 10) { // time part wasn't stripped, can add timezone info
          if (timeZoneOffset == null) {
              s = s.replace('Z', '');
          }
          else if (timeZoneOffset !== 0) {
              s = s.replace('Z', formatTimeZoneOffset(timeZoneOffset, true));
          }
          // otherwise, its UTC-0 and we want to keep the Z
      }
      return s;
  }
  function formatTimeZoneOffset(minutes, doIso) {
      if (doIso === void 0) { doIso = false; }
      var sign = minutes < 0 ? '-' : '+';
      var abs = Math.abs(minutes);
      var hours = Math.floor(abs / 60);
      var mins = Math.round(abs % 60);
      if (doIso) {
          return sign + padStart(hours, 2) + ':' + padStart(mins, 2);
      }
      else {
          return 'GMT' + sign + hours + (mins ? ':' + padStart(mins, 2) : '');
      }
  }
  // Arg Utils
  function createVerboseFormattingArg(start, end, context, separator) {
      var startInfo = expandZonedMarker(start, context.calendarSystem);
      var endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null;
      return {
          date: startInfo,
          start: startInfo,
          end: endInfo,
          timeZone: context.timeZone,
          localeCodes: context.locale.codes,
          separator: separator
      };
  }
  function expandZonedMarker(dateInfo, calendarSystem) {
      var a = calendarSystem.markerToArray(dateInfo.marker);
      return {
          marker: dateInfo.marker,
          timeZoneOffset: dateInfo.timeZoneOffset,
          array: a,
          year: a[0],
          month: a[1],
          day: a[2],
          hour: a[3],
          minute: a[4],
          second: a[5],
          millisecond: a[6]
      };
  }

  var EventSourceApi = /** @class */ (function () {
      function EventSourceApi(calendar, internalEventSource) {
          this.calendar = calendar;
          this.internalEventSource = internalEventSource;
      }
      EventSourceApi.prototype.remove = function () {
          this.calendar.dispatch({
              type: 'REMOVE_EVENT_SOURCE',
              sourceId: this.internalEventSource.sourceId
          });
      };
      EventSourceApi.prototype.refetch = function () {
          this.calendar.dispatch({
              type: 'FETCH_EVENT_SOURCES',
              sourceIds: [this.internalEventSource.sourceId]
          });
      };
      Object.defineProperty(EventSourceApi.prototype, "id", {
          get: function () {
              return this.internalEventSource.publicId;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventSourceApi.prototype, "url", {
          // only relevant to json-feed event sources
          get: function () {
              return this.internalEventSource.meta.url;
          },
          enumerable: true,
          configurable: true
      });
      return EventSourceApi;
  }());

  var EventApi = /** @class */ (function () {
      function EventApi(calendar, def, instance) {
          this._calendar = calendar;
          this._def = def;
          this._instance = instance || null;
      }
      /*
      TODO: make event struct more responsible for this
      */
      EventApi.prototype.setProp = function (name, val) {
          var _a, _b;
          if (name in DATE_PROPS) ;
          else if (name in NON_DATE_PROPS) {
              if (typeof NON_DATE_PROPS[name] === 'function') {
                  val = NON_DATE_PROPS[name](val);
              }
              this.mutate({
                  standardProps: (_a = {}, _a[name] = val, _a)
              });
          }
          else if (name in UNSCOPED_EVENT_UI_PROPS) {
              var ui = void 0;
              if (typeof UNSCOPED_EVENT_UI_PROPS[name] === 'function') {
                  val = UNSCOPED_EVENT_UI_PROPS[name](val);
              }
              if (name === 'color') {
                  ui = { backgroundColor: val, borderColor: val };
              }
              else if (name === 'editable') {
                  ui = { startEditable: val, durationEditable: val };
              }
              else {
                  ui = (_b = {}, _b[name] = val, _b);
              }
              this.mutate({
                  standardProps: { ui: ui }
              });
          }
      };
      EventApi.prototype.setExtendedProp = function (name, val) {
          var _a;
          this.mutate({
              extendedProps: (_a = {}, _a[name] = val, _a)
          });
      };
      EventApi.prototype.setStart = function (startInput, options) {
          if (options === void 0) { options = {}; }
          var dateEnv = this._calendar.dateEnv;
          var start = dateEnv.createMarker(startInput);
          if (start && this._instance) { // TODO: warning if parsed bad
              var instanceRange = this._instance.range;
              var startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity); // what if parsed bad!?
              if (options.maintainDuration) {
                  this.mutate({ datesDelta: startDelta });
              }
              else {
                  this.mutate({ startDelta: startDelta });
              }
          }
      };
      EventApi.prototype.setEnd = function (endInput, options) {
          if (options === void 0) { options = {}; }
          var dateEnv = this._calendar.dateEnv;
          var end;
          if (endInput != null) {
              end = dateEnv.createMarker(endInput);
              if (!end) {
                  return; // TODO: warning if parsed bad
              }
          }
          if (this._instance) {
              if (end) {
                  var endDelta = diffDates(this._instance.range.end, end, dateEnv, options.granularity);
                  this.mutate({ endDelta: endDelta });
              }
              else {
                  this.mutate({ standardProps: { hasEnd: false } });
              }
          }
      };
      EventApi.prototype.setDates = function (startInput, endInput, options) {
          if (options === void 0) { options = {}; }
          var dateEnv = this._calendar.dateEnv;
          var standardProps = { allDay: options.allDay };
          var start = dateEnv.createMarker(startInput);
          var end;
          if (!start) {
              return; // TODO: warning if parsed bad
          }
          if (endInput != null) {
              end = dateEnv.createMarker(endInput);
              if (!end) { // TODO: warning if parsed bad
                  return;
              }
          }
          if (this._instance) {
              var instanceRange = this._instance.range;
              // when computing the diff for an event being converted to all-day,
              // compute diff off of the all-day values the way event-mutation does.
              if (options.allDay === true) {
                  instanceRange = computeAlignedDayRange(instanceRange);
              }
              var startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity);
              if (end) {
                  var endDelta = diffDates(instanceRange.end, end, dateEnv, options.granularity);
                  if (durationsEqual(startDelta, endDelta)) {
                      this.mutate({ datesDelta: startDelta, standardProps: standardProps });
                  }
                  else {
                      this.mutate({ startDelta: startDelta, endDelta: endDelta, standardProps: standardProps });
                  }
              }
              else { // means "clear the end"
                  standardProps.hasEnd = false;
                  this.mutate({ datesDelta: startDelta, standardProps: standardProps });
              }
          }
      };
      EventApi.prototype.moveStart = function (deltaInput) {
          var delta = createDuration(deltaInput);
          if (delta) { // TODO: warning if parsed bad
              this.mutate({ startDelta: delta });
          }
      };
      EventApi.prototype.moveEnd = function (deltaInput) {
          var delta = createDuration(deltaInput);
          if (delta) { // TODO: warning if parsed bad
              this.mutate({ endDelta: delta });
          }
      };
      EventApi.prototype.moveDates = function (deltaInput) {
          var delta = createDuration(deltaInput);
          if (delta) { // TODO: warning if parsed bad
              this.mutate({ datesDelta: delta });
          }
      };
      EventApi.prototype.setAllDay = function (allDay, options) {
          if (options === void 0) { options = {}; }
          var standardProps = { allDay: allDay };
          var maintainDuration = options.maintainDuration;
          if (maintainDuration == null) {
              maintainDuration = this._calendar.opt('allDayMaintainDuration');
          }
          if (this._def.allDay !== allDay) {
              standardProps.hasEnd = maintainDuration;
          }
          this.mutate({ standardProps: standardProps });
      };
      EventApi.prototype.formatRange = function (formatInput) {
          var dateEnv = this._calendar.dateEnv;
          var instance = this._instance;
          var formatter = createFormatter(formatInput, this._calendar.opt('defaultRangeSeparator'));
          if (this._def.hasEnd) {
              return dateEnv.formatRange(instance.range.start, instance.range.end, formatter, {
                  forcedStartTzo: instance.forcedStartTzo,
                  forcedEndTzo: instance.forcedEndTzo
              });
          }
          else {
              return dateEnv.format(instance.range.start, formatter, {
                  forcedTzo: instance.forcedStartTzo
              });
          }
      };
      EventApi.prototype.mutate = function (mutation) {
          var def = this._def;
          var instance = this._instance;
          if (instance) {
              this._calendar.dispatch({
                  type: 'MUTATE_EVENTS',
                  instanceId: instance.instanceId,
                  mutation: mutation,
                  fromApi: true
              });
              var eventStore = this._calendar.state.eventStore;
              this._def = eventStore.defs[def.defId];
              this._instance = eventStore.instances[instance.instanceId];
          }
      };
      EventApi.prototype.remove = function () {
          this._calendar.dispatch({
              type: 'REMOVE_EVENT_DEF',
              defId: this._def.defId
          });
      };
      Object.defineProperty(EventApi.prototype, "source", {
          get: function () {
              var sourceId = this._def.sourceId;
              if (sourceId) {
                  return new EventSourceApi(this._calendar, this._calendar.state.eventSources[sourceId]);
              }
              return null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "start", {
          get: function () {
              return this._instance ?
                  this._calendar.dateEnv.toDate(this._instance.range.start) :
                  null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "end", {
          get: function () {
              return (this._instance && this._def.hasEnd) ?
                  this._calendar.dateEnv.toDate(this._instance.range.end) :
                  null;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "id", {
          // computable props that all access the def
          // TODO: find a TypeScript-compatible way to do this at scale
          get: function () { return this._def.publicId; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "groupId", {
          get: function () { return this._def.groupId; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "allDay", {
          get: function () { return this._def.allDay; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "title", {
          get: function () { return this._def.title; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "url", {
          get: function () { return this._def.url; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "rendering", {
          get: function () { return this._def.rendering; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "startEditable", {
          get: function () { return this._def.ui.startEditable; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "durationEditable", {
          get: function () { return this._def.ui.durationEditable; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "constraint", {
          get: function () { return this._def.ui.constraints[0] || null; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "overlap", {
          get: function () { return this._def.ui.overlap; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "allow", {
          get: function () { return this._def.ui.allows[0] || null; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "backgroundColor", {
          get: function () { return this._def.ui.backgroundColor; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "borderColor", {
          get: function () { return this._def.ui.borderColor; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "textColor", {
          get: function () { return this._def.ui.textColor; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "classNames", {
          // NOTE: user can't modify these because Object.freeze was called in event-def parsing
          get: function () { return this._def.ui.classNames; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventApi.prototype, "extendedProps", {
          get: function () { return this._def.extendedProps; },
          enumerable: true,
          configurable: true
      });
      return EventApi;
  }());

  /*
  Specifying nextDayThreshold signals that all-day ranges should be sliced.
  */
  function sliceEventStore(eventStore, eventUiBases, framingRange, nextDayThreshold) {
      var inverseBgByGroupId = {};
      var inverseBgByDefId = {};
      var defByGroupId = {};
      var bgRanges = [];
      var fgRanges = [];
      var eventUis = compileEventUis(eventStore.defs, eventUiBases);
      for (var defId in eventStore.defs) {
          var def = eventStore.defs[defId];
          if (def.rendering === 'inverse-background') {
              if (def.groupId) {
                  inverseBgByGroupId[def.groupId] = [];
                  if (!defByGroupId[def.groupId]) {
                      defByGroupId[def.groupId] = def;
                  }
              }
              else {
                  inverseBgByDefId[defId] = [];
              }
          }
      }
      for (var instanceId in eventStore.instances) {
          var instance = eventStore.instances[instanceId];
          var def = eventStore.defs[instance.defId];
          var ui = eventUis[def.defId];
          var origRange = instance.range;
          var normalRange = (!def.allDay && nextDayThreshold) ?
              computeVisibleDayRange(origRange, nextDayThreshold) :
              origRange;
          var slicedRange = intersectRanges(normalRange, framingRange);
          if (slicedRange) {
              if (def.rendering === 'inverse-background') {
                  if (def.groupId) {
                      inverseBgByGroupId[def.groupId].push(slicedRange);
                  }
                  else {
                      inverseBgByDefId[instance.defId].push(slicedRange);
                  }
              }
              else {
                  (def.rendering === 'background' ? bgRanges : fgRanges).push({
                      def: def,
                      ui: ui,
                      instance: instance,
                      range: slicedRange,
                      isStart: normalRange.start && normalRange.start.valueOf() === slicedRange.start.valueOf(),
                      isEnd: normalRange.end && normalRange.end.valueOf() === slicedRange.end.valueOf()
                  });
              }
          }
      }
      for (var groupId in inverseBgByGroupId) { // BY GROUP
          var ranges = inverseBgByGroupId[groupId];
          var invertedRanges = invertRanges(ranges, framingRange);
          for (var _i = 0, invertedRanges_1 = invertedRanges; _i < invertedRanges_1.length; _i++) {
              var invertedRange = invertedRanges_1[_i];
              var def = defByGroupId[groupId];
              var ui = eventUis[def.defId];
              bgRanges.push({
                  def: def,
                  ui: ui,
                  instance: null,
                  range: invertedRange,
                  isStart: false,
                  isEnd: false
              });
          }
      }
      for (var defId in inverseBgByDefId) {
          var ranges = inverseBgByDefId[defId];
          var invertedRanges = invertRanges(ranges, framingRange);
          for (var _a = 0, invertedRanges_2 = invertedRanges; _a < invertedRanges_2.length; _a++) {
              var invertedRange = invertedRanges_2[_a];
              bgRanges.push({
                  def: eventStore.defs[defId],
                  ui: eventUis[defId],
                  instance: null,
                  range: invertedRange,
                  isStart: false,
                  isEnd: false
              });
          }
      }
      return { bg: bgRanges, fg: fgRanges };
  }
  function filterSegsViaEls(context, segs, isMirror) {
      var calendar = context.calendar, view = context.view;
      if (calendar.hasPublicHandlers('eventRender')) {
          segs = segs.filter(function (seg) {
              var custom = calendar.publiclyTrigger('eventRender', [
                  {
                      event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                      isMirror: isMirror,
                      isStart: seg.isStart,
                      isEnd: seg.isEnd,
                      // TODO: include seg.range once all components consistently generate it
                      el: seg.el,
                      view: view
                  }
              ]);
              if (custom === false) { // means don't render at all
                  return false;
              }
              else if (custom && custom !== true) {
                  seg.el = custom;
              }
              return true;
          });
      }
      for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
          var seg = segs_1[_i];
          setElSeg(seg.el, seg);
      }
      return segs;
  }
  function setElSeg(el, seg) {
      el.fcSeg = seg;
  }
  function getElSeg(el) {
      return el.fcSeg || null;
  }
  // event ui computation
  function compileEventUis(eventDefs, eventUiBases) {
      return mapHash(eventDefs, function (eventDef) {
          return compileEventUi(eventDef, eventUiBases);
      });
  }
  function compileEventUi(eventDef, eventUiBases) {
      var uis = [];
      if (eventUiBases['']) {
          uis.push(eventUiBases['']);
      }
      if (eventUiBases[eventDef.defId]) {
          uis.push(eventUiBases[eventDef.defId]);
      }
      uis.push(eventDef.ui);
      return combineEventUis(uis);
  }
  // triggers
  function triggerRenderedSegs(context, segs, isMirrors) {
      var calendar = context.calendar, view = context.view;
      if (calendar.hasPublicHandlers('eventPositioned')) {
          for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
              var seg = segs_2[_i];
              calendar.publiclyTriggerAfterSizing('eventPositioned', [
                  {
                      event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                      isMirror: isMirrors,
                      isStart: seg.isStart,
                      isEnd: seg.isEnd,
                      el: seg.el,
                      view: view
                  }
              ]);
          }
      }
      if (!calendar.state.loadingLevel) { // avoid initial empty state while pending
          calendar.afterSizingTriggers._eventsPositioned = [null]; // fire once
      }
  }
  function triggerWillRemoveSegs(context, segs, isMirrors) {
      var calendar = context.calendar, view = context.view;
      for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
          var seg = segs_3[_i];
          calendar.trigger('eventElRemove', seg.el);
      }
      if (calendar.hasPublicHandlers('eventDestroy')) {
          for (var _a = 0, segs_4 = segs; _a < segs_4.length; _a++) {
              var seg = segs_4[_a];
              calendar.publiclyTrigger('eventDestroy', [
                  {
                      event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                      isMirror: isMirrors,
                      el: seg.el,
                      view: view
                  }
              ]);
          }
      }
  }
  // is-interactable
  function computeEventDraggable(context, eventDef, eventUi) {
      var calendar = context.calendar, view = context.view;
      var transformers = calendar.pluginSystem.hooks.isDraggableTransformers;
      var val = eventUi.startEditable;
      for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
          var transformer = transformers_1[_i];
          val = transformer(val, eventDef, eventUi, view);
      }
      return val;
  }
  function computeEventStartResizable(context, eventDef, eventUi) {
      return eventUi.durationEditable && context.options.eventResizableFromStart;
  }
  function computeEventEndResizable(context, eventDef, eventUi) {
      return eventUi.durationEditable;
  }

  // applies the mutation to ALL defs/instances within the event store
  function applyMutationToEventStore(eventStore, eventConfigBase, mutation, calendar) {
      var eventConfigs = compileEventUis(eventStore.defs, eventConfigBase);
      var dest = createEmptyEventStore();
      for (var defId in eventStore.defs) {
          var def = eventStore.defs[defId];
          dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, calendar.pluginSystem.hooks.eventDefMutationAppliers, calendar);
      }
      for (var instanceId in eventStore.instances) {
          var instance = eventStore.instances[instanceId];
          var def = dest.defs[instance.defId]; // important to grab the newly modified def
          dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, calendar);
      }
      return dest;
  }
  function applyMutationToEventDef(eventDef, eventConfig, mutation, appliers, calendar) {
      var standardProps = mutation.standardProps || {};
      // if hasEnd has not been specified, guess a good value based on deltas.
      // if duration will change, there's no way the default duration will persist,
      // and thus, we need to mark the event as having a real end
      if (standardProps.hasEnd == null &&
          eventConfig.durationEditable &&
          (mutation.startDelta || mutation.endDelta)) {
          standardProps.hasEnd = true; // TODO: is this mutation okay?
      }
      var copy = __assign({}, eventDef, standardProps, { ui: __assign({}, eventDef.ui, standardProps.ui) });
      if (mutation.extendedProps) {
          copy.extendedProps = __assign({}, copy.extendedProps, mutation.extendedProps);
      }
      for (var _i = 0, appliers_1 = appliers; _i < appliers_1.length; _i++) {
          var applier = appliers_1[_i];
          applier(copy, mutation, calendar);
      }
      if (!copy.hasEnd && calendar.opt('forceEventDuration')) {
          copy.hasEnd = true;
      }
      return copy;
  }
  function applyMutationToEventInstance(eventInstance, eventDef, // must first be modified by applyMutationToEventDef
  eventConfig, mutation, calendar) {
      var dateEnv = calendar.dateEnv;
      var forceAllDay = mutation.standardProps && mutation.standardProps.allDay === true;
      var clearEnd = mutation.standardProps && mutation.standardProps.hasEnd === false;
      var copy = __assign({}, eventInstance);
      if (forceAllDay) {
          copy.range = computeAlignedDayRange(copy.range);
      }
      if (mutation.datesDelta && eventConfig.startEditable) {
          copy.range = {
              start: dateEnv.add(copy.range.start, mutation.datesDelta),
              end: dateEnv.add(copy.range.end, mutation.datesDelta)
          };
      }
      if (mutation.startDelta && eventConfig.durationEditable) {
          copy.range = {
              start: dateEnv.add(copy.range.start, mutation.startDelta),
              end: copy.range.end
          };
      }
      if (mutation.endDelta && eventConfig.durationEditable) {
          copy.range = {
              start: copy.range.start,
              end: dateEnv.add(copy.range.end, mutation.endDelta)
          };
      }
      if (clearEnd) {
          copy.range = {
              start: copy.range.start,
              end: calendar.getDefaultEventEnd(eventDef.allDay, copy.range.start)
          };
      }
      // in case event was all-day but the supplied deltas were not
      // better util for this?
      if (eventDef.allDay) {
          copy.range = {
              start: startOfDay(copy.range.start),
              end: startOfDay(copy.range.end)
          };
      }
      // handle invalid durations
      if (copy.range.end < copy.range.start) {
          copy.range.end = calendar.getDefaultEventEnd(eventDef.allDay, copy.range.start);
      }
      return copy;
  }

  function reduceEventStore (eventStore, action, eventSources, dateProfile, calendar) {
      switch (action.type) {
          case 'RECEIVE_EVENTS': // raw
              return receiveRawEvents(eventStore, eventSources[action.sourceId], action.fetchId, action.fetchRange, action.rawEvents, calendar);
          case 'ADD_EVENTS': // already parsed, but not expanded
              return addEvent(eventStore, action.eventStore, // new ones
              dateProfile ? dateProfile.activeRange : null, calendar);
          case 'MERGE_EVENTS': // already parsed and expanded
              return mergeEventStores(eventStore, action.eventStore);
          case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
          case 'NEXT':
          case 'SET_DATE':
          case 'SET_VIEW_TYPE':
              if (dateProfile) {
                  return expandRecurring(eventStore, dateProfile.activeRange, calendar);
              }
              else {
                  return eventStore;
              }
          case 'CHANGE_TIMEZONE':
              return rezoneDates(eventStore, action.oldDateEnv, calendar.dateEnv);
          case 'MUTATE_EVENTS':
              return applyMutationToRelated(eventStore, action.instanceId, action.mutation, action.fromApi, calendar);
          case 'REMOVE_EVENT_INSTANCES':
              return excludeInstances(eventStore, action.instances);
          case 'REMOVE_EVENT_DEF':
              return filterEventStoreDefs(eventStore, function (eventDef) {
                  return eventDef.defId !== action.defId;
              });
          case 'REMOVE_EVENT_SOURCE':
              return excludeEventsBySourceId(eventStore, action.sourceId);
          case 'REMOVE_ALL_EVENT_SOURCES':
              return filterEventStoreDefs(eventStore, function (eventDef) {
                  return !eventDef.sourceId; // only keep events with no source id
              });
          case 'REMOVE_ALL_EVENTS':
              return createEmptyEventStore();
          case 'RESET_EVENTS':
              return {
                  defs: eventStore.defs,
                  instances: eventStore.instances
              };
          default:
              return eventStore;
      }
  }
  function receiveRawEvents(eventStore, eventSource, fetchId, fetchRange, rawEvents, calendar) {
      if (eventSource && // not already removed
          fetchId === eventSource.latestFetchId // TODO: wish this logic was always in event-sources
      ) {
          var subset = parseEvents(transformRawEvents(rawEvents, eventSource, calendar), eventSource.sourceId, calendar);
          if (fetchRange) {
              subset = expandRecurring(subset, fetchRange, calendar);
          }
          return mergeEventStores(excludeEventsBySourceId(eventStore, eventSource.sourceId), subset);
      }
      return eventStore;
  }
  function addEvent(eventStore, subset, expandRange, calendar) {
      if (expandRange) {
          subset = expandRecurring(subset, expandRange, calendar);
      }
      return mergeEventStores(eventStore, subset);
  }
  function rezoneDates(eventStore, oldDateEnv, newDateEnv) {
      var defs = eventStore.defs;
      var instances = mapHash(eventStore.instances, function (instance) {
          var def = defs[instance.defId];
          if (def.allDay || def.recurringDef) {
              return instance; // isn't dependent on timezone
          }
          else {
              return __assign({}, instance, { range: {
                      start: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.start, instance.forcedStartTzo)),
                      end: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.end, instance.forcedEndTzo))
                  }, forcedStartTzo: newDateEnv.canComputeOffset ? null : instance.forcedStartTzo, forcedEndTzo: newDateEnv.canComputeOffset ? null : instance.forcedEndTzo });
          }
      });
      return { defs: defs, instances: instances };
  }
  function applyMutationToRelated(eventStore, instanceId, mutation, fromApi, calendar) {
      var relevant = getRelevantEvents(eventStore, instanceId);
      var eventConfigBase = fromApi ?
          { '': {
                  startEditable: true,
                  durationEditable: true,
                  constraints: [],
                  overlap: null,
                  allows: [],
                  backgroundColor: '',
                  borderColor: '',
                  textColor: '',
                  classNames: []
              } } :
          calendar.eventUiBases;
      relevant = applyMutationToEventStore(relevant, eventConfigBase, mutation, calendar);
      return mergeEventStores(eventStore, relevant);
  }
  function excludeEventsBySourceId(eventStore, sourceId) {
      return filterEventStoreDefs(eventStore, function (eventDef) {
          return eventDef.sourceId !== sourceId;
      });
  }
  // QUESTION: why not just return instances? do a general object-property-exclusion util
  function excludeInstances(eventStore, removals) {
      return {
          defs: eventStore.defs,
          instances: filterHash(eventStore.instances, function (instance) {
              return !removals[instance.instanceId];
          })
      };
  }

  // high-level segmenting-aware tester functions
  // ------------------------------------------------------------------------------------------------------------------------
  function isInteractionValid(interaction, calendar) {
      return isNewPropsValid({ eventDrag: interaction }, calendar); // HACK: the eventDrag props is used for ALL interactions
  }
  function isDateSelectionValid(dateSelection, calendar) {
      return isNewPropsValid({ dateSelection: dateSelection }, calendar);
  }
  function isNewPropsValid(newProps, calendar) {
      var view = calendar.view;
      var props = __assign({ businessHours: view ? view.props.businessHours : createEmptyEventStore(), dateSelection: '', eventStore: calendar.state.eventStore, eventUiBases: calendar.eventUiBases, eventSelection: '', eventDrag: null, eventResize: null }, newProps);
      return (calendar.pluginSystem.hooks.isPropsValid || isPropsValid)(props, calendar);
  }
  function isPropsValid(state, calendar, dateSpanMeta, filterConfig) {
      if (dateSpanMeta === void 0) { dateSpanMeta = {}; }
      if (state.eventDrag && !isInteractionPropsValid(state, calendar, dateSpanMeta, filterConfig)) {
          return false;
      }
      if (state.dateSelection && !isDateSelectionPropsValid(state, calendar, dateSpanMeta, filterConfig)) {
          return false;
      }
      return true;
  }
  // Moving Event Validation
  // ------------------------------------------------------------------------------------------------------------------------
  function isInteractionPropsValid(state, calendar, dateSpanMeta, filterConfig) {
      var interaction = state.eventDrag; // HACK: the eventDrag props is used for ALL interactions
      var subjectEventStore = interaction.mutatedEvents;
      var subjectDefs = subjectEventStore.defs;
      var subjectInstances = subjectEventStore.instances;
      var subjectConfigs = compileEventUis(subjectDefs, interaction.isEvent ?
          state.eventUiBases :
          { '': calendar.selectionConfig } // if not a real event, validate as a selection
      );
      if (filterConfig) {
          subjectConfigs = mapHash(subjectConfigs, filterConfig);
      }
      var otherEventStore = excludeInstances(state.eventStore, interaction.affectedEvents.instances); // exclude the subject events. TODO: exclude defs too?
      var otherDefs = otherEventStore.defs;
      var otherInstances = otherEventStore.instances;
      var otherConfigs = compileEventUis(otherDefs, state.eventUiBases);
      for (var subjectInstanceId in subjectInstances) {
          var subjectInstance = subjectInstances[subjectInstanceId];
          var subjectRange = subjectInstance.range;
          var subjectConfig = subjectConfigs[subjectInstance.defId];
          var subjectDef = subjectDefs[subjectInstance.defId];
          // constraint
          if (!allConstraintsPass(subjectConfig.constraints, subjectRange, otherEventStore, state.businessHours, calendar)) {
              return false;
          }
          // overlap
          var overlapFunc = calendar.opt('eventOverlap');
          if (typeof overlapFunc !== 'function') {
              overlapFunc = null;
          }
          for (var otherInstanceId in otherInstances) {
              var otherInstance = otherInstances[otherInstanceId];
              // intersect! evaluate
              if (rangesIntersect(subjectRange, otherInstance.range)) {
                  var otherOverlap = otherConfigs[otherInstance.defId].overlap;
                  // consider the other event's overlap. only do this if the subject event is a "real" event
                  if (otherOverlap === false && interaction.isEvent) {
                      return false;
                  }
                  if (subjectConfig.overlap === false) {
                      return false;
                  }
                  if (overlapFunc && !overlapFunc(new EventApi(calendar, otherDefs[otherInstance.defId], otherInstance), // still event
                  new EventApi(calendar, subjectDef, subjectInstance) // moving event
                  )) {
                      return false;
                  }
              }
          }
          // allow (a function)
          var calendarEventStore = calendar.state.eventStore; // need global-to-calendar, not local to component (splittable)state
          for (var _i = 0, _a = subjectConfig.allows; _i < _a.length; _i++) {
              var subjectAllow = _a[_i];
              var subjectDateSpan = __assign({}, dateSpanMeta, { range: subjectInstance.range, allDay: subjectDef.allDay });
              var origDef = calendarEventStore.defs[subjectDef.defId];
              var origInstance = calendarEventStore.instances[subjectInstanceId];
              var eventApi = void 0;
              if (origDef) { // was previously in the calendar
                  eventApi = new EventApi(calendar, origDef, origInstance);
              }
              else { // was an external event
                  eventApi = new EventApi(calendar, subjectDef); // no instance, because had no dates
              }
              if (!subjectAllow(calendar.buildDateSpanApi(subjectDateSpan), eventApi)) {
                  return false;
              }
          }
      }
      return true;
  }
  // Date Selection Validation
  // ------------------------------------------------------------------------------------------------------------------------
  function isDateSelectionPropsValid(state, calendar, dateSpanMeta, filterConfig) {
      var relevantEventStore = state.eventStore;
      var relevantDefs = relevantEventStore.defs;
      var relevantInstances = relevantEventStore.instances;
      var selection = state.dateSelection;
      var selectionRange = selection.range;
      var selectionConfig = calendar.selectionConfig;
      if (filterConfig) {
          selectionConfig = filterConfig(selectionConfig);
      }
      // constraint
      if (!allConstraintsPass(selectionConfig.constraints, selectionRange, relevantEventStore, state.businessHours, calendar)) {
          return false;
      }
      // overlap
      var overlapFunc = calendar.opt('selectOverlap');
      if (typeof overlapFunc !== 'function') {
          overlapFunc = null;
      }
      for (var relevantInstanceId in relevantInstances) {
          var relevantInstance = relevantInstances[relevantInstanceId];
          // intersect! evaluate
          if (rangesIntersect(selectionRange, relevantInstance.range)) {
              if (selectionConfig.overlap === false) {
                  return false;
              }
              if (overlapFunc && !overlapFunc(new EventApi(calendar, relevantDefs[relevantInstance.defId], relevantInstance))) {
                  return false;
              }
          }
      }
      // allow (a function)
      for (var _i = 0, _a = selectionConfig.allows; _i < _a.length; _i++) {
          var selectionAllow = _a[_i];
          var fullDateSpan = __assign({}, dateSpanMeta, selection);
          if (!selectionAllow(calendar.buildDateSpanApi(fullDateSpan), null)) {
              return false;
          }
      }
      return true;
  }
  // Constraint Utils
  // ------------------------------------------------------------------------------------------------------------------------
  function allConstraintsPass(constraints, subjectRange, otherEventStore, businessHoursUnexpanded, calendar) {
      for (var _i = 0, constraints_1 = constraints; _i < constraints_1.length; _i++) {
          var constraint = constraints_1[_i];
          if (!anyRangesContainRange(constraintToRanges(constraint, subjectRange, otherEventStore, businessHoursUnexpanded, calendar), subjectRange)) {
              return false;
          }
      }
      return true;
  }
  function constraintToRanges(constraint, subjectRange, // for expanding a recurring constraint, or expanding business hours
  otherEventStore, // for if constraint is an even group ID
  businessHoursUnexpanded, // for if constraint is 'businessHours'
  calendar // for expanding businesshours
  ) {
      if (constraint === 'businessHours') {
          return eventStoreToRanges(expandRecurring(businessHoursUnexpanded, subjectRange, calendar));
      }
      else if (typeof constraint === 'string') { // an group ID
          return eventStoreToRanges(filterEventStoreDefs(otherEventStore, function (eventDef) {
              return eventDef.groupId === constraint;
          }));
      }
      else if (typeof constraint === 'object' && constraint) { // non-null object
          return eventStoreToRanges(expandRecurring(constraint, subjectRange, calendar));
      }
      return []; // if it's false
  }
  // TODO: move to event-store file?
  function eventStoreToRanges(eventStore) {
      var instances = eventStore.instances;
      var ranges = [];
      for (var instanceId in instances) {
          ranges.push(instances[instanceId].range);
      }
      return ranges;
  }
  // TODO: move to geom file?
  function anyRangesContainRange(outerRanges, innerRange) {
      for (var _i = 0, outerRanges_1 = outerRanges; _i < outerRanges_1.length; _i++) {
          var outerRange = outerRanges_1[_i];
          if (rangeContainsRange(outerRange, innerRange)) {
              return true;
          }
      }
      return false;
  }
  // Parsing
  // ------------------------------------------------------------------------------------------------------------------------
  function normalizeConstraint(input, calendar) {
      if (Array.isArray(input)) {
          return parseEvents(input, '', calendar, true); // allowOpenRange=true
      }
      else if (typeof input === 'object' && input) { // non-null object
          return parseEvents([input], '', calendar, true); // allowOpenRange=true
      }
      else if (input != null) {
          return String(input);
      }
      else {
          return null;
      }
  }

  function htmlEscape(s) {
      return (s + '').replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/'/g, '&#039;')
          .replace(/"/g, '&quot;')
          .replace(/\n/g, '<br />');
  }
  // Given a hash of CSS properties, returns a string of CSS.
  // Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
  function cssToStr(cssProps) {
      var statements = [];
      for (var name_1 in cssProps) {
          var val = cssProps[name_1];
          if (val != null && val !== '') {
              statements.push(name_1 + ':' + val);
          }
      }
      return statements.join(';');
  }
  // Given an object hash of HTML attribute names to values,
  // generates a string that can be injected between < > in HTML
  function attrsToStr(attrs) {
      var parts = [];
      for (var name_2 in attrs) {
          var val = attrs[name_2];
          if (val != null) {
              parts.push(name_2 + '="' + htmlEscape(val) + '"');
          }
      }
      return parts.join(' ');
  }
  function parseClassName(raw) {
      if (Array.isArray(raw)) {
          return raw;
      }
      else if (typeof raw === 'string') {
          return raw.split(/\s+/);
      }
      else {
          return [];
      }
  }

  var UNSCOPED_EVENT_UI_PROPS = {
      editable: Boolean,
      startEditable: Boolean,
      durationEditable: Boolean,
      constraint: null,
      overlap: null,
      allow: null,
      className: parseClassName,
      classNames: parseClassName,
      color: String,
      backgroundColor: String,
      borderColor: String,
      textColor: String
  };
  function processUnscopedUiProps(rawProps, calendar, leftovers) {
      var props = refineProps(rawProps, UNSCOPED_EVENT_UI_PROPS, {}, leftovers);
      var constraint = normalizeConstraint(props.constraint, calendar);
      return {
          startEditable: props.startEditable != null ? props.startEditable : props.editable,
          durationEditable: props.durationEditable != null ? props.durationEditable : props.editable,
          constraints: constraint != null ? [constraint] : [],
          overlap: props.overlap,
          allows: props.allow != null ? [props.allow] : [],
          backgroundColor: props.backgroundColor || props.color,
          borderColor: props.borderColor || props.color,
          textColor: props.textColor,
          classNames: props.classNames.concat(props.className)
      };
  }
  function processScopedUiProps(prefix, rawScoped, calendar, leftovers) {
      var rawUnscoped = {};
      var wasFound = {};
      for (var key in UNSCOPED_EVENT_UI_PROPS) {
          var scopedKey = prefix + capitaliseFirstLetter(key);
          rawUnscoped[key] = rawScoped[scopedKey];
          wasFound[scopedKey] = true;
      }
      if (prefix === 'event') {
          rawUnscoped.editable = rawScoped.editable; // special case. there is no 'eventEditable', just 'editable'
      }
      if (leftovers) {
          for (var key in rawScoped) {
              if (!wasFound[key]) {
                  leftovers[key] = rawScoped[key];
              }
          }
      }
      return processUnscopedUiProps(rawUnscoped, calendar);
  }
  var EMPTY_EVENT_UI = {
      startEditable: null,
      durationEditable: null,
      constraints: [],
      overlap: null,
      allows: [],
      backgroundColor: '',
      borderColor: '',
      textColor: '',
      classNames: []
  };
  // prevent against problems with <2 args!
  function combineEventUis(uis) {
      return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI);
  }
  function combineTwoEventUis(item0, item1) {
      return {
          startEditable: item1.startEditable != null ? item1.startEditable : item0.startEditable,
          durationEditable: item1.durationEditable != null ? item1.durationEditable : item0.durationEditable,
          constraints: item0.constraints.concat(item1.constraints),
          overlap: typeof item1.overlap === 'boolean' ? item1.overlap : item0.overlap,
          allows: item0.allows.concat(item1.allows),
          backgroundColor: item1.backgroundColor || item0.backgroundColor,
          borderColor: item1.borderColor || item0.borderColor,
          textColor: item1.textColor || item0.textColor,
          classNames: item0.classNames.concat(item1.classNames)
      };
  }

  var NON_DATE_PROPS = {
      id: String,
      groupId: String,
      title: String,
      url: String,
      rendering: String,
      extendedProps: null
  };
  var DATE_PROPS = {
      start: null,
      date: null,
      end: null,
      allDay: null
  };
  var uid = 0;
  function parseEvent(raw, sourceId, calendar, allowOpenRange) {
      var allDayDefault = computeIsAllDayDefault(sourceId, calendar);
      var leftovers0 = {};
      var recurringRes = parseRecurring(raw, // raw, but with single-event stuff stripped out
      allDayDefault, calendar.dateEnv, calendar.pluginSystem.hooks.recurringTypes, leftovers0 // will populate with non-recurring props
      );
      if (recurringRes) {
          var def = parseEventDef(leftovers0, sourceId, recurringRes.allDay, Boolean(recurringRes.duration), calendar);
          def.recurringDef = {
              typeId: recurringRes.typeId,
              typeData: recurringRes.typeData,
              duration: recurringRes.duration
          };
          return { def: def, instance: null };
      }
      else {
          var leftovers1 = {};
          var singleRes = parseSingle(raw, allDayDefault, calendar, leftovers1, allowOpenRange);
          if (singleRes) {
              var def = parseEventDef(leftovers1, sourceId, singleRes.allDay, singleRes.hasEnd, calendar);
              var instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo);
              return { def: def, instance: instance };
          }
      }
      return null;
  }
  /*
  Will NOT populate extendedProps with the leftover properties.
  Will NOT populate date-related props.
  The EventNonDateInput has been normalized (id => publicId, etc).
  */
  function parseEventDef(raw, sourceId, allDay, hasEnd, calendar) {
      var leftovers = {};
      var def = pluckNonDateProps(raw, calendar, leftovers);
      def.defId = String(uid++);
      def.sourceId = sourceId;
      def.allDay = allDay;
      def.hasEnd = hasEnd;
      for (var _i = 0, _a = calendar.pluginSystem.hooks.eventDefParsers; _i < _a.length; _i++) {
          var eventDefParser = _a[_i];
          var newLeftovers = {};
          eventDefParser(def, leftovers, newLeftovers);
          leftovers = newLeftovers;
      }
      def.extendedProps = __assign(leftovers, def.extendedProps || {});
      // help out EventApi from having user modify props
      Object.freeze(def.ui.classNames);
      Object.freeze(def.extendedProps);
      return def;
  }
  function createEventInstance(defId, range, forcedStartTzo, forcedEndTzo) {
      return {
          instanceId: String(uid++),
          defId: defId,
          range: range,
          forcedStartTzo: forcedStartTzo == null ? null : forcedStartTzo,
          forcedEndTzo: forcedEndTzo == null ? null : forcedEndTzo
      };
  }
  function parseSingle(raw, allDayDefault, calendar, leftovers, allowOpenRange) {
      var props = pluckDateProps(raw, leftovers);
      var allDay = props.allDay;
      var startMeta;
      var startMarker = null;
      var hasEnd = false;
      var endMeta;
      var endMarker = null;
      startMeta = calendar.dateEnv.createMarkerMeta(props.start);
      if (startMeta) {
          startMarker = startMeta.marker;
      }
      else if (!allowOpenRange) {
          return null;
      }
      if (props.end != null) {
          endMeta = calendar.dateEnv.createMarkerMeta(props.end);
      }
      if (allDay == null) {
          if (allDayDefault != null) {
              allDay = allDayDefault;
          }
          else {
              // fall back to the date props LAST
              allDay = (!startMeta || startMeta.isTimeUnspecified) &&
                  (!endMeta || endMeta.isTimeUnspecified);
          }
      }
      if (allDay && startMarker) {
          startMarker = startOfDay(startMarker);
      }
      if (endMeta) {
          endMarker = endMeta.marker;
          if (allDay) {
              endMarker = startOfDay(endMarker);
          }
          if (startMarker && endMarker <= startMarker) {
              endMarker = null;
          }
      }
      if (endMarker) {
          hasEnd = true;
      }
      else if (!allowOpenRange) {
          hasEnd = calendar.opt('forceEventDuration') || false;
          endMarker = calendar.dateEnv.add(startMarker, allDay ?
              calendar.defaultAllDayEventDuration :
              calendar.defaultTimedEventDuration);
      }
      return {
          allDay: allDay,
          hasEnd: hasEnd,
          range: { start: startMarker, end: endMarker },
          forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
          forcedEndTzo: endMeta ? endMeta.forcedTzo : null
      };
  }
  function pluckDateProps(raw, leftovers) {
      var props = refineProps(raw, DATE_PROPS, {}, leftovers);
      props.start = (props.start !== null) ? props.start : props.date;
      delete props.date;
      return props;
  }
  function pluckNonDateProps(raw, calendar, leftovers) {
      var preLeftovers = {};
      var props = refineProps(raw, NON_DATE_PROPS, {}, preLeftovers);
      var ui = processUnscopedUiProps(preLeftovers, calendar, leftovers);
      props.publicId = props.id;
      delete props.id;
      props.ui = ui;
      return props;
  }
  function computeIsAllDayDefault(sourceId, calendar) {
      var res = null;
      if (sourceId) {
          var source = calendar.state.eventSources[sourceId];
          res = source.allDayDefault;
      }
      if (res == null) {
          res = calendar.opt('allDayDefault');
      }
      return res;
  }

  var DEF_DEFAULTS = {
      startTime: '09:00',
      endTime: '17:00',
      daysOfWeek: [1, 2, 3, 4, 5],
      rendering: 'inverse-background',
      classNames: 'fc-nonbusiness',
      groupId: '_businessHours' // so multiple defs get grouped
  };
  /*
  TODO: pass around as EventDefHash!!!
  */
  function parseBusinessHours(input, calendar) {
      return parseEvents(refineInputs(input), '', calendar);
  }
  function refineInputs(input) {
      var rawDefs;
      if (input === true) {
          rawDefs = [{}]; // will get DEF_DEFAULTS verbatim
      }
      else if (Array.isArray(input)) {
          // if specifying an array, every sub-definition NEEDS a day-of-week
          rawDefs = input.filter(function (rawDef) {
              return rawDef.daysOfWeek;
          });
      }
      else if (typeof input === 'object' && input) { // non-null object
          rawDefs = [input];
      }
      else { // is probably false
          rawDefs = [];
      }
      rawDefs = rawDefs.map(function (rawDef) {
          return __assign({}, DEF_DEFAULTS, rawDef);
      });
      return rawDefs;
  }

  function memoizeRendering(renderFunc, unrenderFunc, dependencies) {
      if (dependencies === void 0) { dependencies = []; }
      var dependents = [];
      var thisContext;
      var prevArgs;
      function unrender() {
          if (prevArgs) {
              for (var _i = 0, dependents_1 = dependents; _i < dependents_1.length; _i++) {
                  var dependent = dependents_1[_i];
                  dependent.unrender();
              }
              if (unrenderFunc) {
                  unrenderFunc.apply(thisContext, prevArgs);
              }
              prevArgs = null;
          }
      }
      function res() {
          if (!prevArgs || !isArraysEqual(prevArgs, arguments)) {
              unrender();
              thisContext = this;
              prevArgs = arguments;
              renderFunc.apply(this, arguments);
          }
      }
      res.dependents = dependents;
      res.unrender = unrender;
      for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
          var dependency = dependencies_1[_i];
          dependency.dependents.push(res);
      }
      return res;
  }

  // Generates HTML for an anchor to another view into the calendar.
  // Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
  // `gotoOptions` can either be a DateMarker, or an object with the form:
  // { date, type, forceOff }
  // `type` is a view-type like "day" or "week". default value is "day".
  // `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
  function buildGotoAnchorHtml(allOptions, dateEnv, gotoOptions, attrs, innerHtml) {
      var date;
      var type;
      var forceOff;
      var finalOptions;
      if (gotoOptions instanceof Date) {
          date = gotoOptions; // a single date-like input
      }
      else {
          date = gotoOptions.date;
          type = gotoOptions.type;
          forceOff = gotoOptions.forceOff;
      }
      finalOptions = {
          date: dateEnv.formatIso(date, { omitTime: true }),
          type: type || 'day'
      };
      if (typeof attrs === 'string') {
          innerHtml = attrs;
          attrs = null;
      }
      attrs = attrs ? ' ' + attrsToStr(attrs) : ''; // will have a leading space
      innerHtml = innerHtml || '';
      if (!forceOff && allOptions.navLinks) {
          return '<a' + attrs +
              ' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
              innerHtml +
              '</a>';
      }
      else {
          return '<span' + attrs + '>' +
              innerHtml +
              '</span>';
      }
  }
  // Computes HTML classNames for a single-day element
  function getDayClasses(date, dateProfile, context, noThemeHighlight) {
      var calendar = context.calendar, options = context.options, theme = context.theme, dateEnv = context.dateEnv;
      var classes = [];
      var todayStart;
      var todayEnd;
      if (!rangeContainsMarker(dateProfile.activeRange, date)) {
          classes.push('fc-disabled-day');
      }
      else {
          classes.push('fc-' + DAY_IDS[date.getUTCDay()]);
          if (options.monthMode &&
              dateEnv.getMonth(date) !== dateEnv.getMonth(dateProfile.currentRange.start)) {
              classes.push('fc-other-month');
          }
          todayStart = startOfDay(calendar.getNow());
          todayEnd = addDays(todayStart, 1);
          if (date < todayStart) {
              classes.push('fc-past');
          }
          else if (date >= todayEnd) {
              classes.push('fc-future');
          }
          else {
              classes.push('fc-today');
              if (noThemeHighlight !== true) {
                  classes.push(theme.getClass('today'));
              }
          }
      }
      return classes;
  }

  // given a function that resolves a result asynchronously.
  // the function can either call passed-in success and failure callbacks,
  // or it can return a promise.
  // if you need to pass additional params to func, bind them first.
  function unpromisify(func, success, failure) {
      // guard against success/failure callbacks being called more than once
      // and guard against a promise AND callback being used together.
      var isResolved = false;
      var wrappedSuccess = function () {
          if (!isResolved) {
              isResolved = true;
              success.apply(this, arguments);
          }
      };
      var wrappedFailure = function () {
          if (!isResolved) {
              isResolved = true;
              if (failure) {
                  failure.apply(this, arguments);
              }
          }
      };
      var res = func(wrappedSuccess, wrappedFailure);
      if (res && typeof res.then === 'function') {
          res.then(wrappedSuccess, wrappedFailure);
      }
  }

  var Mixin = /** @class */ (function () {
      function Mixin() {
      }
      // mix into a CLASS
      Mixin.mixInto = function (destClass) {
          this.mixIntoObj(destClass.prototype);
      };
      // mix into ANY object
      Mixin.mixIntoObj = function (destObj) {
          var _this = this;
          Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
              if (!destObj[name]) { // if destination doesn't already define it
                  destObj[name] = _this.prototype[name];
              }
          });
      };
      /*
      will override existing methods
      TODO: remove! not used anymore
      */
      Mixin.mixOver = function (destClass) {
          var _this = this;
          Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
              destClass.prototype[name] = _this.prototype[name];
          });
      };
      return Mixin;
  }());

  /*
  USAGE:
    import { default as EmitterMixin, EmitterInterface } from './EmitterMixin'
  in class:
    on: EmitterInterface['on']
    one: EmitterInterface['one']
    off: EmitterInterface['off']
    trigger: EmitterInterface['trigger']
    triggerWith: EmitterInterface['triggerWith']
    hasHandlers: EmitterInterface['hasHandlers']
  after class:
    EmitterMixin.mixInto(TheClass)
  */
  var EmitterMixin = /** @class */ (function (_super) {
      __extends(EmitterMixin, _super);
      function EmitterMixin() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      EmitterMixin.prototype.on = function (type, handler) {
          addToHash(this._handlers || (this._handlers = {}), type, handler);
          return this; // for chaining
      };
      // todo: add comments
      EmitterMixin.prototype.one = function (type, handler) {
          addToHash(this._oneHandlers || (this._oneHandlers = {}), type, handler);
          return this; // for chaining
      };
      EmitterMixin.prototype.off = function (type, handler) {
          if (this._handlers) {
              removeFromHash(this._handlers, type, handler);
          }
          if (this._oneHandlers) {
              removeFromHash(this._oneHandlers, type, handler);
          }
          return this; // for chaining
      };
      EmitterMixin.prototype.trigger = function (type) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          this.triggerWith(type, this, args);
          return this; // for chaining
      };
      EmitterMixin.prototype.triggerWith = function (type, context, args) {
          if (this._handlers) {
              applyAll(this._handlers[type], context, args);
          }
          if (this._oneHandlers) {
              applyAll(this._oneHandlers[type], context, args);
              delete this._oneHandlers[type]; // will never fire again
          }
          return this; // for chaining
      };
      EmitterMixin.prototype.hasHandlers = function (type) {
          return (this._handlers && this._handlers[type] && this._handlers[type].length) ||
              (this._oneHandlers && this._oneHandlers[type] && this._oneHandlers[type].length);
      };
      return EmitterMixin;
  }(Mixin));
  function addToHash(hash, type, handler) {
      (hash[type] || (hash[type] = []))
          .push(handler);
  }
  function removeFromHash(hash, type, handler) {
      if (handler) {
          if (hash[type]) {
              hash[type] = hash[type].filter(function (func) {
                  return func !== handler;
              });
          }
      }
      else {
          delete hash[type]; // remove all handler funcs for this type
      }
  }

  /*
  Records offset information for a set of elements, relative to an origin element.
  Can record the left/right OR the top/bottom OR both.
  Provides methods for querying the cache by position.
  */
  var PositionCache = /** @class */ (function () {
      function PositionCache(originEl, els, isHorizontal, isVertical) {
          this.originEl = originEl;
          this.els = els;
          this.isHorizontal = isHorizontal;
          this.isVertical = isVertical;
      }
      // Queries the els for coordinates and stores them.
      // Call this method before using and of the get* methods below.
      PositionCache.prototype.build = function () {
          var originEl = this.originEl;
          var originClientRect = this.originClientRect =
              originEl.getBoundingClientRect(); // relative to viewport top-left
          if (this.isHorizontal) {
              this.buildElHorizontals(originClientRect.left);
          }
          if (this.isVertical) {
              this.buildElVerticals(originClientRect.top);
          }
      };
      // Populates the left/right internal coordinate arrays
      PositionCache.prototype.buildElHorizontals = function (originClientLeft) {
          var lefts = [];
          var rights = [];
          for (var _i = 0, _a = this.els; _i < _a.length; _i++) {
              var el = _a[_i];
              var rect = el.getBoundingClientRect();
              lefts.push(rect.left - originClientLeft);
              rights.push(rect.right - originClientLeft);
          }
          this.lefts = lefts;
          this.rights = rights;
      };
      // Populates the top/bottom internal coordinate arrays
      PositionCache.prototype.buildElVerticals = function (originClientTop) {
          var tops = [];
          var bottoms = [];
          for (var _i = 0, _a = this.els; _i < _a.length; _i++) {
              var el = _a[_i];
              var rect = el.getBoundingClientRect();
              tops.push(rect.top - originClientTop);
              bottoms.push(rect.bottom - originClientTop);
          }
          this.tops = tops;
          this.bottoms = bottoms;
      };
      // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
      // If no intersection is made, returns undefined.
      PositionCache.prototype.leftToIndex = function (leftPosition) {
          var lefts = this.lefts;
          var rights = this.rights;
          var len = lefts.length;
          var i;
          for (i = 0; i < len; i++) {
              if (leftPosition >= lefts[i] && leftPosition < rights[i]) {
                  return i;
              }
          }
      };
      // Given a top offset (from document top), returns the index of the el that it vertically intersects.
      // If no intersection is made, returns undefined.
      PositionCache.prototype.topToIndex = function (topPosition) {
          var tops = this.tops;
          var bottoms = this.bottoms;
          var len = tops.length;
          var i;
          for (i = 0; i < len; i++) {
              if (topPosition >= tops[i] && topPosition < bottoms[i]) {
                  return i;
              }
          }
      };
      // Gets the width of the element at the given index
      PositionCache.prototype.getWidth = function (leftIndex) {
          return this.rights[leftIndex] - this.lefts[leftIndex];
      };
      // Gets the height of the element at the given index
      PositionCache.prototype.getHeight = function (topIndex) {
          return this.bottoms[topIndex] - this.tops[topIndex];
      };
      return PositionCache;
  }());

  /*
  An object for getting/setting scroll-related information for an element.
  Internally, this is done very differently for window versus DOM element,
  so this object serves as a common interface.
  */
  var ScrollController = /** @class */ (function () {
      function ScrollController() {
      }
      ScrollController.prototype.getMaxScrollTop = function () {
          return this.getScrollHeight() - this.getClientHeight();
      };
      ScrollController.prototype.getMaxScrollLeft = function () {
          return this.getScrollWidth() - this.getClientWidth();
      };
      ScrollController.prototype.canScrollVertically = function () {
          return this.getMaxScrollTop() > 0;
      };
      ScrollController.prototype.canScrollHorizontally = function () {
          return this.getMaxScrollLeft() > 0;
      };
      ScrollController.prototype.canScrollUp = function () {
          return this.getScrollTop() > 0;
      };
      ScrollController.prototype.canScrollDown = function () {
          return this.getScrollTop() < this.getMaxScrollTop();
      };
      ScrollController.prototype.canScrollLeft = function () {
          return this.getScrollLeft() > 0;
      };
      ScrollController.prototype.canScrollRight = function () {
          return this.getScrollLeft() < this.getMaxScrollLeft();
      };
      return ScrollController;
  }());
  var ElementScrollController = /** @class */ (function (_super) {
      __extends(ElementScrollController, _super);
      function ElementScrollController(el) {
          var _this = _super.call(this) || this;
          _this.el = el;
          return _this;
      }
      ElementScrollController.prototype.getScrollTop = function () {
          return this.el.scrollTop;
      };
      ElementScrollController.prototype.getScrollLeft = function () {
          return this.el.scrollLeft;
      };
      ElementScrollController.prototype.setScrollTop = function (top) {
          this.el.scrollTop = top;
      };
      ElementScrollController.prototype.setScrollLeft = function (left) {
          this.el.scrollLeft = left;
      };
      ElementScrollController.prototype.getScrollWidth = function () {
          return this.el.scrollWidth;
      };
      ElementScrollController.prototype.getScrollHeight = function () {
          return this.el.scrollHeight;
      };
      ElementScrollController.prototype.getClientHeight = function () {
          return this.el.clientHeight;
      };
      ElementScrollController.prototype.getClientWidth = function () {
          return this.el.clientWidth;
      };
      return ElementScrollController;
  }(ScrollController));
  var WindowScrollController = /** @class */ (function (_super) {
      __extends(WindowScrollController, _super);
      function WindowScrollController() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      WindowScrollController.prototype.getScrollTop = function () {
          return window.pageYOffset;
      };
      WindowScrollController.prototype.getScrollLeft = function () {
          return window.pageXOffset;
      };
      WindowScrollController.prototype.setScrollTop = function (n) {
          window.scroll(window.pageXOffset, n);
      };
      WindowScrollController.prototype.setScrollLeft = function (n) {
          window.scroll(n, window.pageYOffset);
      };
      WindowScrollController.prototype.getScrollWidth = function () {
          return document.documentElement.scrollWidth;
      };
      WindowScrollController.prototype.getScrollHeight = function () {
          return document.documentElement.scrollHeight;
      };
      WindowScrollController.prototype.getClientHeight = function () {
          return document.documentElement.clientHeight;
      };
      WindowScrollController.prototype.getClientWidth = function () {
          return document.documentElement.clientWidth;
      };
      return WindowScrollController;
  }(ScrollController));

  /*
  Embodies a div that has potential scrollbars
  */
  var ScrollComponent = /** @class */ (function (_super) {
      __extends(ScrollComponent, _super);
      function ScrollComponent(overflowX, overflowY) {
          var _this = _super.call(this, createElement('div', {
              className: 'fc-scroller'
          })) || this;
          _this.overflowX = overflowX;
          _this.overflowY = overflowY;
          _this.applyOverflow();
          return _this;
      }
      // sets to natural height, unlocks overflow
      ScrollComponent.prototype.clear = function () {
          this.setHeight('auto');
          this.applyOverflow();
      };
      ScrollComponent.prototype.destroy = function () {
          removeElement(this.el);
      };
      // Overflow
      // -----------------------------------------------------------------------------------------------------------------
      ScrollComponent.prototype.applyOverflow = function () {
          applyStyle(this.el, {
              overflowX: this.overflowX,
              overflowY: this.overflowY
          });
      };
      // Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
      // Useful for preserving scrollbar widths regardless of future resizes.
      // Can pass in scrollbarWidths for optimization.
      ScrollComponent.prototype.lockOverflow = function (scrollbarWidths) {
          var overflowX = this.overflowX;
          var overflowY = this.overflowY;
          scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();
          if (overflowX === 'auto') {
              overflowX = (scrollbarWidths.bottom || // horizontal scrollbars?
                  this.canScrollHorizontally() // OR scrolling pane with massless scrollbars?
              ) ? 'scroll' : 'hidden';
          }
          if (overflowY === 'auto') {
              overflowY = (scrollbarWidths.left || scrollbarWidths.right || // horizontal scrollbars?
                  this.canScrollVertically() // OR scrolling pane with massless scrollbars?
              ) ? 'scroll' : 'hidden';
          }
          applyStyle(this.el, { overflowX: overflowX, overflowY: overflowY });
      };
      ScrollComponent.prototype.setHeight = function (height) {
          applyStyleProp(this.el, 'height', height);
      };
      ScrollComponent.prototype.getScrollbarWidths = function () {
          var edges = computeEdges(this.el);
          return {
              left: edges.scrollbarLeft,
              right: edges.scrollbarRight,
              bottom: edges.scrollbarBottom
          };
      };
      return ScrollComponent;
  }(ElementScrollController));

  var Theme = /** @class */ (function () {
      function Theme(calendarOptions) {
          this.calendarOptions = calendarOptions;
          this.processIconOverride();
      }
      Theme.prototype.processIconOverride = function () {
          if (this.iconOverrideOption) {
              this.setIconOverride(this.calendarOptions[this.iconOverrideOption]);
          }
      };
      Theme.prototype.setIconOverride = function (iconOverrideHash) {
          var iconClassesCopy;
          var buttonName;
          if (typeof iconOverrideHash === 'object' && iconOverrideHash) { // non-null object
              iconClassesCopy = __assign({}, this.iconClasses);
              for (buttonName in iconOverrideHash) {
                  iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName]);
              }
              this.iconClasses = iconClassesCopy;
          }
          else if (iconOverrideHash === false) {
              this.iconClasses = {};
          }
      };
      Theme.prototype.applyIconOverridePrefix = function (className) {
          var prefix = this.iconOverridePrefix;
          if (prefix && className.indexOf(prefix) !== 0) { // if not already present
              className = prefix + className;
          }
          return className;
      };
      Theme.prototype.getClass = function (key) {
          return this.classes[key] || '';
      };
      Theme.prototype.getIconClass = function (buttonName) {
          var className = this.iconClasses[buttonName];
          if (className) {
              return this.baseIconClass + ' ' + className;
          }
          return '';
      };
      Theme.prototype.getCustomButtonIconClass = function (customButtonProps) {
          var className;
          if (this.iconOverrideCustomButtonOption) {
              className = customButtonProps[this.iconOverrideCustomButtonOption];
              if (className) {
                  return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
              }
          }
          return '';
      };
      return Theme;
  }());
  Theme.prototype.classes = {};
  Theme.prototype.iconClasses = {};
  Theme.prototype.baseIconClass = '';
  Theme.prototype.iconOverridePrefix = '';

  var guid = 0;
  var ComponentContext = /** @class */ (function () {
      function ComponentContext(calendar, theme, dateEnv, options, view) {
          this.calendar = calendar;
          this.theme = theme;
          this.dateEnv = dateEnv;
          this.options = options;
          this.view = view;
          this.isRtl = options.dir === 'rtl';
          this.eventOrderSpecs = parseFieldSpecs(options.eventOrder);
          this.nextDayThreshold = createDuration(options.nextDayThreshold);
      }
      ComponentContext.prototype.extend = function (options, view) {
          return new ComponentContext(this.calendar, this.theme, this.dateEnv, options || this.options, view || this.view);
      };
      return ComponentContext;
  }());
  var Component = /** @class */ (function () {
      function Component() {
          this.uid = String(guid++);
      }
      Component.addEqualityFuncs = function (newFuncs) {
          this.prototype.equalityFuncs = __assign({}, this.prototype.equalityFuncs, newFuncs);
      };
      Component.prototype.receiveProps = function (props, context) {
          var oldContext = this.context;
          this.context = context;
          if (!oldContext) {
              this.firstContext(context);
          }
          var _a = recycleProps(this.props || {}, props, this.equalityFuncs), anyChanges = _a.anyChanges, comboProps = _a.comboProps;
          this.props = comboProps;
          if (anyChanges) {
              if (oldContext) {
                  this.beforeUpdate();
              }
              this.render(comboProps, context);
              if (oldContext) {
                  this.afterUpdate();
              }
          }
      };
      Component.prototype.render = function (props, context) {
      };
      Component.prototype.firstContext = function (context) {
      };
      Component.prototype.beforeUpdate = function () {
      };
      Component.prototype.afterUpdate = function () {
      };
      // after destroy is called, this component won't ever be used again
      Component.prototype.destroy = function () {
      };
      return Component;
  }());
  Component.prototype.equalityFuncs = {};
  /*
  Reuses old values when equal. If anything is unequal, returns newProps as-is.
  Great for PureComponent, but won't be feasible with React, so just eliminate and use React's DOM diffing.
  */
  function recycleProps(oldProps, newProps, equalityFuncs) {
      var comboProps = {}; // some old, some new
      var anyChanges = false;
      for (var key in newProps) {
          if (key in oldProps && (oldProps[key] === newProps[key] ||
              (equalityFuncs[key] && equalityFuncs[key](oldProps[key], newProps[key])))) {
              // equal to old? use old prop
              comboProps[key] = oldProps[key];
          }
          else {
              comboProps[key] = newProps[key];
              anyChanges = true;
          }
      }
      for (var key in oldProps) {
          if (!(key in newProps)) {
              anyChanges = true;
              break;
          }
      }
      return { anyChanges: anyChanges, comboProps: comboProps };
  }

  /*
  PURPOSES:
  - hook up to fg, fill, and mirror renderers
  - interface for dragging and hits
  */
  var DateComponent = /** @class */ (function (_super) {
      __extends(DateComponent, _super);
      function DateComponent(el) {
          var _this = _super.call(this) || this;
          _this.el = el;
          return _this;
      }
      DateComponent.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          removeElement(this.el);
      };
      // Hit System
      // -----------------------------------------------------------------------------------------------------------------
      DateComponent.prototype.buildPositionCaches = function () {
      };
      DateComponent.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
          return null; // this should be abstract
      };
      // Validation
      // -----------------------------------------------------------------------------------------------------------------
      DateComponent.prototype.isInteractionValid = function (interaction) {
          var calendar = this.context.calendar;
          var dateProfile = this.props.dateProfile; // HACK
          var instances = interaction.mutatedEvents.instances;
          if (dateProfile) { // HACK for DayTile
              for (var instanceId in instances) {
                  if (!rangeContainsRange(dateProfile.validRange, instances[instanceId].range)) {
                      return false;
                  }
              }
          }
          return isInteractionValid(interaction, calendar);
      };
      DateComponent.prototype.isDateSelectionValid = function (selection) {
          var calendar = this.context.calendar;
          var dateProfile = this.props.dateProfile; // HACK
          if (dateProfile && // HACK for DayTile
              !rangeContainsRange(dateProfile.validRange, selection.range)) {
              return false;
          }
          return isDateSelectionValid(selection, calendar);
      };
      // Pointer Interaction Utils
      // -----------------------------------------------------------------------------------------------------------------
      DateComponent.prototype.isValidSegDownEl = function (el) {
          return !this.props.eventDrag && // HACK
              !this.props.eventResize && // HACK
              !elementClosest(el, '.fc-mirror') &&
              (this.isPopover() || !this.isInPopover(el));
          // ^above line ensures we don't detect a seg interaction within a nested component.
          // it's a HACK because it only supports a popover as the nested component.
      };
      DateComponent.prototype.isValidDateDownEl = function (el) {
          var segEl = elementClosest(el, this.fgSegSelector);
          return (!segEl || segEl.classList.contains('fc-mirror')) &&
              !elementClosest(el, '.fc-more') && // a "more.." link
              !elementClosest(el, 'a[data-goto]') && // a clickable nav link
              !this.isInPopover(el);
      };
      DateComponent.prototype.isPopover = function () {
          return this.el.classList.contains('fc-popover');
      };
      DateComponent.prototype.isInPopover = function (el) {
          return Boolean(elementClosest(el, '.fc-popover'));
      };
      return DateComponent;
  }(Component));
  DateComponent.prototype.fgSegSelector = '.fc-event-container > *';
  DateComponent.prototype.bgSegSelector = '.fc-bgevent:not(.fc-nonbusiness)';

  var uid$1 = 0;
  function createPlugin(input) {
      return {
          id: String(uid$1++),
          deps: input.deps || [],
          reducers: input.reducers || [],
          eventDefParsers: input.eventDefParsers || [],
          isDraggableTransformers: input.isDraggableTransformers || [],
          eventDragMutationMassagers: input.eventDragMutationMassagers || [],
          eventDefMutationAppliers: input.eventDefMutationAppliers || [],
          dateSelectionTransformers: input.dateSelectionTransformers || [],
          datePointTransforms: input.datePointTransforms || [],
          dateSpanTransforms: input.dateSpanTransforms || [],
          views: input.views || {},
          viewPropsTransformers: input.viewPropsTransformers || [],
          isPropsValid: input.isPropsValid || null,
          externalDefTransforms: input.externalDefTransforms || [],
          eventResizeJoinTransforms: input.eventResizeJoinTransforms || [],
          viewContainerModifiers: input.viewContainerModifiers || [],
          eventDropTransformers: input.eventDropTransformers || [],
          componentInteractions: input.componentInteractions || [],
          calendarInteractions: input.calendarInteractions || [],
          themeClasses: input.themeClasses || {},
          eventSourceDefs: input.eventSourceDefs || [],
          cmdFormatter: input.cmdFormatter,
          recurringTypes: input.recurringTypes || [],
          namedTimeZonedImpl: input.namedTimeZonedImpl,
          defaultView: input.defaultView || '',
          elementDraggingImpl: input.elementDraggingImpl,
          optionChangeHandlers: input.optionChangeHandlers || {}
      };
  }
  var PluginSystem = /** @class */ (function () {
      function PluginSystem() {
          this.hooks = {
              reducers: [],
              eventDefParsers: [],
              isDraggableTransformers: [],
              eventDragMutationMassagers: [],
              eventDefMutationAppliers: [],
              dateSelectionTransformers: [],
              datePointTransforms: [],
              dateSpanTransforms: [],
              views: {},
              viewPropsTransformers: [],
              isPropsValid: null,
              externalDefTransforms: [],
              eventResizeJoinTransforms: [],
              viewContainerModifiers: [],
              eventDropTransformers: [],
              componentInteractions: [],
              calendarInteractions: [],
              themeClasses: {},
              eventSourceDefs: [],
              cmdFormatter: null,
              recurringTypes: [],
              namedTimeZonedImpl: null,
              defaultView: '',
              elementDraggingImpl: null,
              optionChangeHandlers: {}
          };
          this.addedHash = {};
      }
      PluginSystem.prototype.add = function (plugin) {
          if (!this.addedHash[plugin.id]) {
              this.addedHash[plugin.id] = true;
              for (var _i = 0, _a = plugin.deps; _i < _a.length; _i++) {
                  var dep = _a[_i];
                  this.add(dep);
              }
              this.hooks = combineHooks(this.hooks, plugin);
          }
      };
      return PluginSystem;
  }());
  function combineHooks(hooks0, hooks1) {
      return {
          reducers: hooks0.reducers.concat(hooks1.reducers),
          eventDefParsers: hooks0.eventDefParsers.concat(hooks1.eventDefParsers),
          isDraggableTransformers: hooks0.isDraggableTransformers.concat(hooks1.isDraggableTransformers),
          eventDragMutationMassagers: hooks0.eventDragMutationMassagers.concat(hooks1.eventDragMutationMassagers),
          eventDefMutationAppliers: hooks0.eventDefMutationAppliers.concat(hooks1.eventDefMutationAppliers),
          dateSelectionTransformers: hooks0.dateSelectionTransformers.concat(hooks1.dateSelectionTransformers),
          datePointTransforms: hooks0.datePointTransforms.concat(hooks1.datePointTransforms),
          dateSpanTransforms: hooks0.dateSpanTransforms.concat(hooks1.dateSpanTransforms),
          views: __assign({}, hooks0.views, hooks1.views),
          viewPropsTransformers: hooks0.viewPropsTransformers.concat(hooks1.viewPropsTransformers),
          isPropsValid: hooks1.isPropsValid || hooks0.isPropsValid,
          externalDefTransforms: hooks0.externalDefTransforms.concat(hooks1.externalDefTransforms),
          eventResizeJoinTransforms: hooks0.eventResizeJoinTransforms.concat(hooks1.eventResizeJoinTransforms),
          viewContainerModifiers: hooks0.viewContainerModifiers.concat(hooks1.viewContainerModifiers),
          eventDropTransformers: hooks0.eventDropTransformers.concat(hooks1.eventDropTransformers),
          calendarInteractions: hooks0.calendarInteractions.concat(hooks1.calendarInteractions),
          componentInteractions: hooks0.componentInteractions.concat(hooks1.componentInteractions),
          themeClasses: __assign({}, hooks0.themeClasses, hooks1.themeClasses),
          eventSourceDefs: hooks0.eventSourceDefs.concat(hooks1.eventSourceDefs),
          cmdFormatter: hooks1.cmdFormatter || hooks0.cmdFormatter,
          recurringTypes: hooks0.recurringTypes.concat(hooks1.recurringTypes),
          namedTimeZonedImpl: hooks1.namedTimeZonedImpl || hooks0.namedTimeZonedImpl,
          defaultView: hooks0.defaultView || hooks1.defaultView,
          elementDraggingImpl: hooks0.elementDraggingImpl || hooks1.elementDraggingImpl,
          optionChangeHandlers: __assign({}, hooks0.optionChangeHandlers, hooks1.optionChangeHandlers)
      };
  }

  var eventSourceDef = {
      ignoreRange: true,
      parseMeta: function (raw) {
          if (Array.isArray(raw)) { // short form
              return raw;
          }
          else if (Array.isArray(raw.events)) {
              return raw.events;
          }
          return null;
      },
      fetch: function (arg, success) {
          success({
              rawEvents: arg.eventSource.meta
          });
      }
  };
  var ArrayEventSourcePlugin = createPlugin({
      eventSourceDefs: [eventSourceDef]
  });

  var eventSourceDef$1 = {
      parseMeta: function (raw) {
          if (typeof raw === 'function') { // short form
              return raw;
          }
          else if (typeof raw.events === 'function') {
              return raw.events;
          }
          return null;
      },
      fetch: function (arg, success, failure) {
          var dateEnv = arg.calendar.dateEnv;
          var func = arg.eventSource.meta;
          unpromisify(func.bind(null, {
              start: dateEnv.toDate(arg.range.start),
              end: dateEnv.toDate(arg.range.end),
              startStr: dateEnv.formatIso(arg.range.start),
              endStr: dateEnv.formatIso(arg.range.end),
              timeZone: dateEnv.timeZone
          }), function (rawEvents) {
              success({ rawEvents: rawEvents }); // needs an object response
          }, failure // send errorObj directly to failure callback
          );
      }
  };
  var FuncEventSourcePlugin = createPlugin({
      eventSourceDefs: [eventSourceDef$1]
  });

  function requestJson(method, url, params, successCallback, failureCallback) {
      method = method.toUpperCase();
      var body = null;
      if (method === 'GET') {
          url = injectQueryStringParams(url, params);
      }
      else {
          body = encodeParams(params);
      }
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      if (method !== 'GET') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 400) {
              try {
                  var res = JSON.parse(xhr.responseText);
                  successCallback(res, xhr);
              }
              catch (err) {
                  failureCallback('Failure parsing JSON', xhr);
              }
          }
          else {
              failureCallback('Request failed', xhr);
          }
      };
      xhr.onerror = function () {
          failureCallback('Request failed', xhr);
      };
      xhr.send(body);
  }
  function injectQueryStringParams(url, params) {
      return url +
          (url.indexOf('?') === -1 ? '?' : '&') +
          encodeParams(params);
  }
  function encodeParams(params) {
      var parts = [];
      for (var key in params) {
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
      return parts.join('&');
  }

  var eventSourceDef$2 = {
      parseMeta: function (raw) {
          if (typeof raw === 'string') { // short form
              raw = { url: raw };
          }
          else if (!raw || typeof raw !== 'object' || !raw.url) {
              return null;
          }
          return {
              url: raw.url,
              method: (raw.method || 'GET').toUpperCase(),
              extraParams: raw.extraParams,
              startParam: raw.startParam,
              endParam: raw.endParam,
              timeZoneParam: raw.timeZoneParam
          };
      },
      fetch: function (arg, success, failure) {
          var meta = arg.eventSource.meta;
          var requestParams = buildRequestParams(meta, arg.range, arg.calendar);
          requestJson(meta.method, meta.url, requestParams, function (rawEvents, xhr) {
              success({ rawEvents: rawEvents, xhr: xhr });
          }, function (errorMessage, xhr) {
              failure({ message: errorMessage, xhr: xhr });
          });
      }
  };
  var JsonFeedEventSourcePlugin = createPlugin({
      eventSourceDefs: [eventSourceDef$2]
  });
  function buildRequestParams(meta, range, calendar) {
      var dateEnv = calendar.dateEnv;
      var startParam;
      var endParam;
      var timeZoneParam;
      var customRequestParams;
      var params = {};
      startParam = meta.startParam;
      if (startParam == null) {
          startParam = calendar.opt('startParam');
      }
      endParam = meta.endParam;
      if (endParam == null) {
          endParam = calendar.opt('endParam');
      }
      timeZoneParam = meta.timeZoneParam;
      if (timeZoneParam == null) {
          timeZoneParam = calendar.opt('timeZoneParam');
      }
      // retrieve any outbound GET/POST data from the options
      if (typeof meta.extraParams === 'function') {
          // supplied as a function that returns a key/value object
          customRequestParams = meta.extraParams();
      }
      else {
          // probably supplied as a straight key/value object
          customRequestParams = meta.extraParams || {};
      }
      __assign(params, customRequestParams);
      params[startParam] = dateEnv.formatIso(range.start);
      params[endParam] = dateEnv.formatIso(range.end);
      if (dateEnv.timeZone !== 'local') {
          params[timeZoneParam] = dateEnv.timeZone;
      }
      return params;
  }

  var recurring = {
      parse: function (rawEvent, leftoverProps, dateEnv) {
          var createMarker = dateEnv.createMarker.bind(dateEnv);
          var processors = {
              daysOfWeek: null,
              startTime: createDuration,
              endTime: createDuration,
              startRecur: createMarker,
              endRecur: createMarker
          };
          var props = refineProps(rawEvent, processors, {}, leftoverProps);
          var anyValid = false;
          for (var propName in props) {
              if (props[propName] != null) {
                  anyValid = true;
                  break;
              }
          }
          if (anyValid) {
              var duration = null;
              if ('duration' in leftoverProps) {
                  duration = createDuration(leftoverProps.duration);
                  delete leftoverProps.duration;
              }
              if (!duration && props.startTime && props.endTime) {
                  duration = subtractDurations(props.endTime, props.startTime);
              }
              return {
                  allDayGuess: Boolean(!props.startTime && !props.endTime),
                  duration: duration,
                  typeData: props // doesn't need endTime anymore but oh well
              };
          }
          return null;
      },
      expand: function (typeData, framingRange, dateEnv) {
          var clippedFramingRange = intersectRanges(framingRange, { start: typeData.startRecur, end: typeData.endRecur });
          if (clippedFramingRange) {
              return expandRanges(typeData.daysOfWeek, typeData.startTime, clippedFramingRange, dateEnv);
          }
          else {
              return [];
          }
      }
  };
  var SimpleRecurrencePlugin = createPlugin({
      recurringTypes: [recurring]
  });
  function expandRanges(daysOfWeek, startTime, framingRange, dateEnv) {
      var dowHash = daysOfWeek ? arrayToHash(daysOfWeek) : null;
      var dayMarker = startOfDay(framingRange.start);
      var endMarker = framingRange.end;
      var instanceStarts = [];
      while (dayMarker < endMarker) {
          var instanceStart 
          // if everyday, or this particular day-of-week
          = void 0;
          // if everyday, or this particular day-of-week
          if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
              if (startTime) {
                  instanceStart = dateEnv.add(dayMarker, startTime);
              }
              else {
                  instanceStart = dayMarker;
              }
              instanceStarts.push(instanceStart);
          }
          dayMarker = addDays(dayMarker, 1);
      }
      return instanceStarts;
  }

  var DefaultOptionChangeHandlers = createPlugin({
      optionChangeHandlers: {
          events: function (events, calendar, deepEqual) {
              handleEventSources([events], calendar, deepEqual);
          },
          eventSources: handleEventSources,
          plugins: handlePlugins
      }
  });
  function handleEventSources(inputs, calendar, deepEqual) {
      var unfoundSources = hashValuesToArray(calendar.state.eventSources);
      var newInputs = [];
      for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
          var input = inputs_1[_i];
          var inputFound = false;
          for (var i = 0; i < unfoundSources.length; i++) {
              if (deepEqual(unfoundSources[i]._raw, input)) {
                  unfoundSources.splice(i, 1); // delete
                  inputFound = true;
                  break;
              }
          }
          if (!inputFound) {
              newInputs.push(input);
          }
      }
      for (var _a = 0, unfoundSources_1 = unfoundSources; _a < unfoundSources_1.length; _a++) {
          var unfoundSource = unfoundSources_1[_a];
          calendar.dispatch({
              type: 'REMOVE_EVENT_SOURCE',
              sourceId: unfoundSource.sourceId
          });
      }
      for (var _b = 0, newInputs_1 = newInputs; _b < newInputs_1.length; _b++) {
          var newInput = newInputs_1[_b];
          calendar.addEventSource(newInput);
      }
  }
  // shortcoming: won't remove plugins
  function handlePlugins(inputs, calendar) {
      calendar.addPluginInputs(inputs); // will gracefully handle duplicates
  }
  var globalDefaults = {
      defaultRangeSeparator: ' - ',
      titleRangeSeparator: ' \u2013 ',
      defaultTimedEventDuration: '01:00:00',
      defaultAllDayEventDuration: { day: 1 },
      forceEventDuration: false,
      nextDayThreshold: '00:00:00',
      // display
      columnHeader: true,
      defaultView: '',
      aspectRatio: 1.35,
      header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
      },
      weekends: true,
      weekNumbers: false,
      weekNumberCalculation: 'local',
      editable: false,
      // nowIndicator: false,
      scrollTime: '06:00:00',
      minTime: '00:00:00',
      maxTime: '24:00:00',
      showNonCurrentDates: true,
      // event ajax
      lazyFetching: true,
      startParam: 'start',
      endParam: 'end',
      timeZoneParam: 'timeZone',
      timeZone: 'local',
      // allDayDefault: undefined,
      // locale
      locales: [],
      locale: '',
      // dir: will get this from the default locale
      // buttonIcons: null,
      // allows setting a min-height to the event segment to prevent short events overlapping each other
      timeGridEventMinHeight: 0,
      themeSystem: 'standard',
      // eventResizableFromStart: false,
      dragRevertDuration: 500,
      dragScroll: true,
      allDayMaintainDuration: false,
      // selectable: false,
      unselectAuto: true,
      // selectMinDistance: 0,
      dropAccept: '*',
      eventOrder: 'start,-duration,allDay,title',
      // ^ if start tie, longer events go before shorter. final tie-breaker is title text
      // rerenderDelay: null,
      eventLimit: false,
      eventLimitClick: 'popover',
      dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
      handleWindowResize: true,
      windowResizeDelay: 100,
      longPressDelay: 1000,
      eventDragMinDistance: 5 // only applies to mouse
  };
  var rtlDefaults = {
      header: {
          left: 'next,prev today',
          center: '',
          right: 'title'
      },
      buttonIcons: {
          // TODO: make RTL support the responibility of the theme
          prev: 'fc-icon-chevron-right',
          next: 'fc-icon-chevron-left',
          prevYear: 'fc-icon-chevrons-right',
          nextYear: 'fc-icon-chevrons-left'
      }
  };
  var complexOptions = [
      'header',
      'footer',
      'buttonText',
      'buttonIcons'
  ];
  // Merges an array of option objects into a single object
  function mergeOptions(optionObjs) {
      return mergeProps(optionObjs, complexOptions);
  }
  // TODO: move this stuff to a "plugin"-related file...
  var INTERNAL_PLUGINS = [
      ArrayEventSourcePlugin,
      FuncEventSourcePlugin,
      JsonFeedEventSourcePlugin,
      SimpleRecurrencePlugin,
      DefaultOptionChangeHandlers
  ];
  function refinePluginDefs(pluginInputs) {
      var plugins = [];
      for (var _i = 0, pluginInputs_1 = pluginInputs; _i < pluginInputs_1.length; _i++) {
          var pluginInput = pluginInputs_1[_i];
          if (typeof pluginInput === 'string') {
              var globalName = 'FullCalendar' + capitaliseFirstLetter(pluginInput);
              if (!window[globalName]) {
                  console.warn('Plugin file not loaded for ' + pluginInput);
              }
              else {
                  plugins.push(window[globalName].default); // is an ES6 module
              }
          }
          else {
              plugins.push(pluginInput);
          }
      }
      return INTERNAL_PLUGINS.concat(plugins);
  }

  var RAW_EN_LOCALE = {
      code: 'en',
      week: {
          dow: 0,
          doy: 4 // 4 days need to be within the year to be considered the first week
      },
      dir: 'ltr',
      buttonText: {
          prev: 'prev',
          next: 'next',
          prevYear: 'prev year',
          nextYear: 'next year',
          year: 'year',
          today: 'today',
          month: 'month',
          week: 'week',
          day: 'day',
          list: 'list'
      },
      weekLabel: 'W',
      allDayText: 'all-day',
      eventLimitText: 'more',
      noEventsMessage: 'No events to display'
  };
  function parseRawLocales(explicitRawLocales) {
      var defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en';
      var globalArray = window['FullCalendarLocalesAll'] || []; // from locales-all.js
      var globalObject = window['FullCalendarLocales'] || {}; // from locales/*.js. keys are meaningless
      var allRawLocales = globalArray.concat(// globalArray is low prio
      hashValuesToArray(globalObject), // medium prio
      explicitRawLocales // highest prio
      );
      var rawLocaleMap = {
          en: RAW_EN_LOCALE // necessary?
      };
      for (var _i = 0, allRawLocales_1 = allRawLocales; _i < allRawLocales_1.length; _i++) {
          var rawLocale = allRawLocales_1[_i];
          rawLocaleMap[rawLocale.code] = rawLocale;
      }
      return {
          map: rawLocaleMap,
          defaultCode: defaultCode
      };
  }
  function buildLocale(inputSingular, available) {
      if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
          return parseLocale(inputSingular.code, [inputSingular.code], inputSingular);
      }
      else {
          return queryLocale(inputSingular, available);
      }
  }
  function queryLocale(codeArg, available) {
      var codes = [].concat(codeArg || []); // will convert to array
      var raw = queryRawLocale(codes, available) || RAW_EN_LOCALE;
      return parseLocale(codeArg, codes, raw);
  }
  function queryRawLocale(codes, available) {
      for (var i = 0; i < codes.length; i++) {
          var parts = codes[i].toLocaleLowerCase().split('-');
          for (var j = parts.length; j > 0; j--) {
              var simpleId = parts.slice(0, j).join('-');
              if (available[simpleId]) {
                  return available[simpleId];
              }
          }
      }
      return null;
  }
  function parseLocale(codeArg, codes, raw) {
      var merged = mergeProps([RAW_EN_LOCALE, raw], ['buttonText']);
      delete merged.code; // don't want this part of the options
      var week = merged.week;
      delete merged.week;
      return {
          codeArg: codeArg,
          codes: codes,
          week: week,
          simpleNumberFormat: new Intl.NumberFormat(codeArg),
          options: merged
      };
  }

  var OptionsManager = /** @class */ (function () {
      function OptionsManager(overrides) {
          this.overrides = __assign({}, overrides); // make a copy
          this.dynamicOverrides = {};
          this.compute();
      }
      OptionsManager.prototype.mutate = function (updates, removals, isDynamic) {
          if (!Object.keys(updates).length && !removals.length) {
              return;
          }
          var overrideHash = isDynamic ? this.dynamicOverrides : this.overrides;
          __assign(overrideHash, updates);
          for (var _i = 0, removals_1 = removals; _i < removals_1.length; _i++) {
              var propName = removals_1[_i];
              delete overrideHash[propName];
          }
          this.compute();
      };
      // Computes the flattened options hash for the calendar and assigns to `this.options`.
      // Assumes this.overrides and this.dynamicOverrides have already been initialized.
      OptionsManager.prototype.compute = function () {
          // TODO: not a very efficient system
          var locales = firstDefined(// explicit locale option given?
          this.dynamicOverrides.locales, this.overrides.locales, globalDefaults.locales);
          var locale = firstDefined(// explicit locales option given?
          this.dynamicOverrides.locale, this.overrides.locale, globalDefaults.locale);
          var available = parseRawLocales(locales);
          var localeDefaults = buildLocale(locale || available.defaultCode, available.map).options;
          var dir = firstDefined(// based on options computed so far, is direction RTL?
          this.dynamicOverrides.dir, this.overrides.dir, localeDefaults.dir);
          var dirDefaults = dir === 'rtl' ? rtlDefaults : {};
          this.dirDefaults = dirDefaults;
          this.localeDefaults = localeDefaults;
          this.computed = mergeOptions([
              globalDefaults,
              dirDefaults,
              localeDefaults,
              this.overrides,
              this.dynamicOverrides
          ]);
      };
      return OptionsManager;
  }());

  var calendarSystemClassMap = {};
  function registerCalendarSystem(name, theClass) {
      calendarSystemClassMap[name] = theClass;
  }
  function createCalendarSystem(name) {
      return new calendarSystemClassMap[name]();
  }
  var GregorianCalendarSystem = /** @class */ (function () {
      function GregorianCalendarSystem() {
      }
      GregorianCalendarSystem.prototype.getMarkerYear = function (d) {
          return d.getUTCFullYear();
      };
      GregorianCalendarSystem.prototype.getMarkerMonth = function (d) {
          return d.getUTCMonth();
      };
      GregorianCalendarSystem.prototype.getMarkerDay = function (d) {
          return d.getUTCDate();
      };
      GregorianCalendarSystem.prototype.arrayToMarker = function (arr) {
          return arrayToUtcDate(arr);
      };
      GregorianCalendarSystem.prototype.markerToArray = function (marker) {
          return dateToUtcArray(marker);
      };
      return GregorianCalendarSystem;
  }());
  registerCalendarSystem('gregory', GregorianCalendarSystem);

  var ISO_RE = /^\s*(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
  function parse$1(str) {
      var m = ISO_RE.exec(str);
      if (m) {
          var marker = new Date(Date.UTC(Number(m[1]), m[3] ? Number(m[3]) - 1 : 0, Number(m[5] || 1), Number(m[7] || 0), Number(m[8] || 0), Number(m[10] || 0), m[12] ? Number('0.' + m[12]) * 1000 : 0));
          if (isValidDate(marker)) {
              var timeZoneOffset = null;
              if (m[13]) {
                  timeZoneOffset = (m[15] === '-' ? -1 : 1) * (Number(m[16] || 0) * 60 +
                      Number(m[18] || 0));
              }
              return {
                  marker: marker,
                  isTimeUnspecified: !m[6],
                  timeZoneOffset: timeZoneOffset
              };
          }
      }
      return null;
  }

  var DateEnv = /** @class */ (function () {
      function DateEnv(settings) {
          var timeZone = this.timeZone = settings.timeZone;
          var isNamedTimeZone = timeZone !== 'local' && timeZone !== 'UTC';
          if (settings.namedTimeZoneImpl && isNamedTimeZone) {
              this.namedTimeZoneImpl = new settings.namedTimeZoneImpl(timeZone);
          }
          this.canComputeOffset = Boolean(!isNamedTimeZone || this.namedTimeZoneImpl);
          this.calendarSystem = createCalendarSystem(settings.calendarSystem);
          this.locale = settings.locale;
          this.weekDow = settings.locale.week.dow;
          this.weekDoy = settings.locale.week.doy;
          if (settings.weekNumberCalculation === 'ISO') {
              this.weekDow = 1;
              this.weekDoy = 4;
          }
          if (typeof settings.firstDay === 'number') {
              this.weekDow = settings.firstDay;
          }
          if (typeof settings.weekNumberCalculation === 'function') {
              this.weekNumberFunc = settings.weekNumberCalculation;
          }
          this.weekLabel = settings.weekLabel != null ? settings.weekLabel : settings.locale.options.weekLabel;
          this.cmdFormatter = settings.cmdFormatter;
      }
      // Creating / Parsing
      DateEnv.prototype.createMarker = function (input) {
          var meta = this.createMarkerMeta(input);
          if (meta === null) {
              return null;
          }
          return meta.marker;
      };
      DateEnv.prototype.createNowMarker = function () {
          if (this.canComputeOffset) {
              return this.timestampToMarker(new Date().valueOf());
          }
          else {
              // if we can't compute the current date val for a timezone,
              // better to give the current local date vals than UTC
              return arrayToUtcDate(dateToLocalArray(new Date()));
          }
      };
      DateEnv.prototype.createMarkerMeta = function (input) {
          if (typeof input === 'string') {
              return this.parse(input);
          }
          var marker = null;
          if (typeof input === 'number') {
              marker = this.timestampToMarker(input);
          }
          else if (input instanceof Date) {
              input = input.valueOf();
              if (!isNaN(input)) {
                  marker = this.timestampToMarker(input);
              }
          }
          else if (Array.isArray(input)) {
              marker = arrayToUtcDate(input);
          }
          if (marker === null || !isValidDate(marker)) {
              return null;
          }
          return { marker: marker, isTimeUnspecified: false, forcedTzo: null };
      };
      DateEnv.prototype.parse = function (s) {
          var parts = parse$1(s);
          if (parts === null) {
              return null;
          }
          var marker = parts.marker;
          var forcedTzo = null;
          if (parts.timeZoneOffset !== null) {
              if (this.canComputeOffset) {
                  marker = this.timestampToMarker(marker.valueOf() - parts.timeZoneOffset * 60 * 1000);
              }
              else {
                  forcedTzo = parts.timeZoneOffset;
              }
          }
          return { marker: marker, isTimeUnspecified: parts.isTimeUnspecified, forcedTzo: forcedTzo };
      };
      // Accessors
      DateEnv.prototype.getYear = function (marker) {
          return this.calendarSystem.getMarkerYear(marker);
      };
      DateEnv.prototype.getMonth = function (marker) {
          return this.calendarSystem.getMarkerMonth(marker);
      };
      // Adding / Subtracting
      DateEnv.prototype.add = function (marker, dur) {
          var a = this.calendarSystem.markerToArray(marker);
          a[0] += dur.years;
          a[1] += dur.months;
          a[2] += dur.days;
          a[6] += dur.milliseconds;
          return this.calendarSystem.arrayToMarker(a);
      };
      DateEnv.prototype.subtract = function (marker, dur) {
          var a = this.calendarSystem.markerToArray(marker);
          a[0] -= dur.years;
          a[1] -= dur.months;
          a[2] -= dur.days;
          a[6] -= dur.milliseconds;
          return this.calendarSystem.arrayToMarker(a);
      };
      DateEnv.prototype.addYears = function (marker, n) {
          var a = this.calendarSystem.markerToArray(marker);
          a[0] += n;
          return this.calendarSystem.arrayToMarker(a);
      };
      DateEnv.prototype.addMonths = function (marker, n) {
          var a = this.calendarSystem.markerToArray(marker);
          a[1] += n;
          return this.calendarSystem.arrayToMarker(a);
      };
      // Diffing Whole Units
      DateEnv.prototype.diffWholeYears = function (m0, m1) {
          var calendarSystem = this.calendarSystem;
          if (timeAsMs(m0) === timeAsMs(m1) &&
              calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) &&
              calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)) {
              return calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0);
          }
          return null;
      };
      DateEnv.prototype.diffWholeMonths = function (m0, m1) {
          var calendarSystem = this.calendarSystem;
          if (timeAsMs(m0) === timeAsMs(m1) &&
              calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)) {
              return (calendarSystem.getMarkerMonth(m1) - calendarSystem.getMarkerMonth(m0)) +
                  (calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)) * 12;
          }
          return null;
      };
      // Range / Duration
      DateEnv.prototype.greatestWholeUnit = function (m0, m1) {
          var n = this.diffWholeYears(m0, m1);
          if (n !== null) {
              return { unit: 'year', value: n };
          }
          n = this.diffWholeMonths(m0, m1);
          if (n !== null) {
              return { unit: 'month', value: n };
          }
          n = diffWholeWeeks(m0, m1);
          if (n !== null) {
              return { unit: 'week', value: n };
          }
          n = diffWholeDays(m0, m1);
          if (n !== null) {
              return { unit: 'day', value: n };
          }
          n = diffHours(m0, m1);
          if (isInt(n)) {
              return { unit: 'hour', value: n };
          }
          n = diffMinutes(m0, m1);
          if (isInt(n)) {
              return { unit: 'minute', value: n };
          }
          n = diffSeconds(m0, m1);
          if (isInt(n)) {
              return { unit: 'second', value: n };
          }
          return { unit: 'millisecond', value: m1.valueOf() - m0.valueOf() };
      };
      DateEnv.prototype.countDurationsBetween = function (m0, m1, d) {
          // TODO: can use greatestWholeUnit
          var diff;
          if (d.years) {
              diff = this.diffWholeYears(m0, m1);
              if (diff !== null) {
                  return diff / asRoughYears(d);
              }
          }
          if (d.months) {
              diff = this.diffWholeMonths(m0, m1);
              if (diff !== null) {
                  return diff / asRoughMonths(d);
              }
          }
          if (d.days) {
              diff = diffWholeDays(m0, m1);
              if (diff !== null) {
                  return diff / asRoughDays(d);
              }
          }
          return (m1.valueOf() - m0.valueOf()) / asRoughMs(d);
      };
      // Start-Of
      DateEnv.prototype.startOf = function (m, unit) {
          if (unit === 'year') {
              return this.startOfYear(m);
          }
          else if (unit === 'month') {
              return this.startOfMonth(m);
          }
          else if (unit === 'week') {
              return this.startOfWeek(m);
          }
          else if (unit === 'day') {
              return startOfDay(m);
          }
          else if (unit === 'hour') {
              return startOfHour(m);
          }
          else if (unit === 'minute') {
              return startOfMinute(m);
          }
          else if (unit === 'second') {
              return startOfSecond(m);
          }
      };
      DateEnv.prototype.startOfYear = function (m) {
          return this.calendarSystem.arrayToMarker([
              this.calendarSystem.getMarkerYear(m)
          ]);
      };
      DateEnv.prototype.startOfMonth = function (m) {
          return this.calendarSystem.arrayToMarker([
              this.calendarSystem.getMarkerYear(m),
              this.calendarSystem.getMarkerMonth(m)
          ]);
      };
      DateEnv.prototype.startOfWeek = function (m) {
          return this.calendarSystem.arrayToMarker([
              this.calendarSystem.getMarkerYear(m),
              this.calendarSystem.getMarkerMonth(m),
              m.getUTCDate() - ((m.getUTCDay() - this.weekDow + 7) % 7)
          ]);
      };
      // Week Number
      DateEnv.prototype.computeWeekNumber = function (marker) {
          if (this.weekNumberFunc) {
              return this.weekNumberFunc(this.toDate(marker));
          }
          else {
              return weekOfYear(marker, this.weekDow, this.weekDoy);
          }
      };
      // TODO: choke on timeZoneName: long
      DateEnv.prototype.format = function (marker, formatter, dateOptions) {
          if (dateOptions === void 0) { dateOptions = {}; }
          return formatter.format({
              marker: marker,
              timeZoneOffset: dateOptions.forcedTzo != null ?
                  dateOptions.forcedTzo :
                  this.offsetForMarker(marker)
          }, this);
      };
      DateEnv.prototype.formatRange = function (start, end, formatter, dateOptions) {
          if (dateOptions === void 0) { dateOptions = {}; }
          if (dateOptions.isEndExclusive) {
              end = addMs(end, -1);
          }
          return formatter.formatRange({
              marker: start,
              timeZoneOffset: dateOptions.forcedStartTzo != null ?
                  dateOptions.forcedStartTzo :
                  this.offsetForMarker(start)
          }, {
              marker: end,
              timeZoneOffset: dateOptions.forcedEndTzo != null ?
                  dateOptions.forcedEndTzo :
                  this.offsetForMarker(end)
          }, this);
      };
      DateEnv.prototype.formatIso = function (marker, extraOptions) {
          if (extraOptions === void 0) { extraOptions = {}; }
          var timeZoneOffset = null;
          if (!extraOptions.omitTimeZoneOffset) {
              if (extraOptions.forcedTzo != null) {
                  timeZoneOffset = extraOptions.forcedTzo;
              }
              else {
                  timeZoneOffset = this.offsetForMarker(marker);
              }
          }
          return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime);
      };
      // TimeZone
      DateEnv.prototype.timestampToMarker = function (ms) {
          if (this.timeZone === 'local') {
              return arrayToUtcDate(dateToLocalArray(new Date(ms)));
          }
          else if (this.timeZone === 'UTC' || !this.namedTimeZoneImpl) {
              return new Date(ms);
          }
          else {
              return arrayToUtcDate(this.namedTimeZoneImpl.timestampToArray(ms));
          }
      };
      DateEnv.prototype.offsetForMarker = function (m) {
          if (this.timeZone === 'local') {
              return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset(); // convert "inverse" offset to "normal" offset
          }
          else if (this.timeZone === 'UTC') {
              return 0;
          }
          else if (this.namedTimeZoneImpl) {
              return this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m));
          }
          return null;
      };
      // Conversion
      DateEnv.prototype.toDate = function (m, forcedTzo) {
          if (this.timeZone === 'local') {
              return arrayToLocalDate(dateToUtcArray(m));
          }
          else if (this.timeZone === 'UTC') {
              return new Date(m.valueOf()); // make sure it's a copy
          }
          else if (!this.namedTimeZoneImpl) {
              return new Date(m.valueOf() - (forcedTzo || 0));
          }
          else {
              return new Date(m.valueOf() -
                  this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m)) * 1000 * 60 // convert minutes -> ms
              );
          }
      };
      return DateEnv;
  }());

  var SIMPLE_SOURCE_PROPS = {
      id: String,
      allDayDefault: Boolean,
      eventDataTransform: Function,
      success: Function,
      failure: Function
  };
  var uid$2 = 0;
  function doesSourceNeedRange(eventSource, calendar) {
      var defs = calendar.pluginSystem.hooks.eventSourceDefs;
      return !defs[eventSource.sourceDefId].ignoreRange;
  }
  function parseEventSource(raw, calendar) {
      var defs = calendar.pluginSystem.hooks.eventSourceDefs;
      for (var i = defs.length - 1; i >= 0; i--) { // later-added plugins take precedence
          var def = defs[i];
          var meta = def.parseMeta(raw);
          if (meta) {
              var res = parseEventSourceProps(typeof raw === 'object' ? raw : {}, meta, i, calendar);
              res._raw = raw;
              return res;
          }
      }
      return null;
  }
  function parseEventSourceProps(raw, meta, sourceDefId, calendar) {
      var leftovers0 = {};
      var props = refineProps(raw, SIMPLE_SOURCE_PROPS, {}, leftovers0);
      var leftovers1 = {};
      var ui = processUnscopedUiProps(leftovers0, calendar, leftovers1);
      props.isFetching = false;
      props.latestFetchId = '';
      props.fetchRange = null;
      props.publicId = String(raw.id || '');
      props.sourceId = String(uid$2++);
      props.sourceDefId = sourceDefId;
      props.meta = meta;
      props.ui = ui;
      props.extendedProps = leftovers1;
      return props;
  }

  function reduceEventSources (eventSources, action, dateProfile, calendar) {
      switch (action.type) {
          case 'ADD_EVENT_SOURCES': // already parsed
              return addSources(eventSources, action.sources, dateProfile ? dateProfile.activeRange : null, calendar);
          case 'REMOVE_EVENT_SOURCE':
              return removeSource(eventSources, action.sourceId);
          case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
          case 'NEXT':
          case 'SET_DATE':
          case 'SET_VIEW_TYPE':
              if (dateProfile) {
                  return fetchDirtySources(eventSources, dateProfile.activeRange, calendar);
              }
              else {
                  return eventSources;
              }
          case 'FETCH_EVENT_SOURCES':
          case 'CHANGE_TIMEZONE':
              return fetchSourcesByIds(eventSources, action.sourceIds ?
                  arrayToHash(action.sourceIds) :
                  excludeStaticSources(eventSources, calendar), dateProfile ? dateProfile.activeRange : null, calendar);
          case 'RECEIVE_EVENTS':
          case 'RECEIVE_EVENT_ERROR':
              return receiveResponse(eventSources, action.sourceId, action.fetchId, action.fetchRange);
          case 'REMOVE_ALL_EVENT_SOURCES':
              return {};
          default:
              return eventSources;
      }
  }
  var uid$3 = 0;
  function addSources(eventSourceHash, sources, fetchRange, calendar) {
      var hash = {};
      for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
          var source = sources_1[_i];
          hash[source.sourceId] = source;
      }
      if (fetchRange) {
          hash = fetchDirtySources(hash, fetchRange, calendar);
      }
      return __assign({}, eventSourceHash, hash);
  }
  function removeSource(eventSourceHash, sourceId) {
      return filterHash(eventSourceHash, function (eventSource) {
          return eventSource.sourceId !== sourceId;
      });
  }
  function fetchDirtySources(sourceHash, fetchRange, calendar) {
      return fetchSourcesByIds(sourceHash, filterHash(sourceHash, function (eventSource) {
          return isSourceDirty(eventSource, fetchRange, calendar);
      }), fetchRange, calendar);
  }
  function isSourceDirty(eventSource, fetchRange, calendar) {
      if (!doesSourceNeedRange(eventSource, calendar)) {
          return !eventSource.latestFetchId;
      }
      else {
          return !calendar.opt('lazyFetching') ||
              !eventSource.fetchRange ||
              eventSource.isFetching || // always cancel outdated in-progress fetches
              fetchRange.start < eventSource.fetchRange.start ||
              fetchRange.end > eventSource.fetchRange.end;
      }
  }
  function fetchSourcesByIds(prevSources, sourceIdHash, fetchRange, calendar) {
      var nextSources = {};
      for (var sourceId in prevSources) {
          var source = prevSources[sourceId];
          if (sourceIdHash[sourceId]) {
              nextSources[sourceId] = fetchSource(source, fetchRange, calendar);
          }
          else {
              nextSources[sourceId] = source;
          }
      }
      return nextSources;
  }
  function fetchSource(eventSource, fetchRange, calendar) {
      var sourceDef = calendar.pluginSystem.hooks.eventSourceDefs[eventSource.sourceDefId];
      var fetchId = String(uid$3++);
      sourceDef.fetch({
          eventSource: eventSource,
          calendar: calendar,
          range: fetchRange
      }, function (res) {
          var rawEvents = res.rawEvents;
          var calSuccess = calendar.opt('eventSourceSuccess');
          var calSuccessRes;
          var sourceSuccessRes;
          if (eventSource.success) {
              sourceSuccessRes = eventSource.success(rawEvents, res.xhr);
          }
          if (calSuccess) {
              calSuccessRes = calSuccess(rawEvents, res.xhr);
          }
          rawEvents = sourceSuccessRes || calSuccessRes || rawEvents;
          calendar.dispatch({
              type: 'RECEIVE_EVENTS',
              sourceId: eventSource.sourceId,
              fetchId: fetchId,
              fetchRange: fetchRange,
              rawEvents: rawEvents
          });
      }, function (error) {
          var callFailure = calendar.opt('eventSourceFailure');
          console.warn(error.message, error);
          if (eventSource.failure) {
              eventSource.failure(error);
          }
          if (callFailure) {
              callFailure(error);
          }
          calendar.dispatch({
              type: 'RECEIVE_EVENT_ERROR',
              sourceId: eventSource.sourceId,
              fetchId: fetchId,
              fetchRange: fetchRange,
              error: error
          });
      });
      return __assign({}, eventSource, { isFetching: true, latestFetchId: fetchId });
  }
  function receiveResponse(sourceHash, sourceId, fetchId, fetchRange) {
      var _a;
      var eventSource = sourceHash[sourceId];
      if (eventSource && // not already removed
          fetchId === eventSource.latestFetchId) {
          return __assign({}, sourceHash, (_a = {}, _a[sourceId] = __assign({}, eventSource, { isFetching: false, fetchRange: fetchRange // also serves as a marker that at least one fetch has completed
           }), _a));
      }
      return sourceHash;
  }
  function excludeStaticSources(eventSources, calendar) {
      return filterHash(eventSources, function (eventSource) {
          return doesSourceNeedRange(eventSource, calendar);
      });
  }

  var DateProfileGenerator = /** @class */ (function () {
      function DateProfileGenerator(viewSpec, calendar) {
          this.viewSpec = viewSpec;
          this.options = viewSpec.options;
          this.dateEnv = calendar.dateEnv;
          this.calendar = calendar;
          this.initHiddenDays();
      }
      /* Date Range Computation
      ------------------------------------------------------------------------------------------------------------------*/
      // Builds a structure with info about what the dates/ranges will be for the "prev" view.
      DateProfileGenerator.prototype.buildPrev = function (currentDateProfile, currentDate) {
          var dateEnv = this.dateEnv;
          var prevDate = dateEnv.subtract(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
          currentDateProfile.dateIncrement);
          return this.build(prevDate, -1);
      };
      // Builds a structure with info about what the dates/ranges will be for the "next" view.
      DateProfileGenerator.prototype.buildNext = function (currentDateProfile, currentDate) {
          var dateEnv = this.dateEnv;
          var nextDate = dateEnv.add(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
          currentDateProfile.dateIncrement);
          return this.build(nextDate, 1);
      };
      // Builds a structure holding dates/ranges for rendering around the given date.
      // Optional direction param indicates whether the date is being incremented/decremented
      // from its previous value. decremented = -1, incremented = 1 (default).
      DateProfileGenerator.prototype.build = function (currentDate, direction, forceToValid) {
          if (forceToValid === void 0) { forceToValid = false; }
          var validRange;
          var minTime = null;
          var maxTime = null;
          var currentInfo;
          var isRangeAllDay;
          var renderRange;
          var activeRange;
          var isValid;
          validRange = this.buildValidRange();
          validRange = this.trimHiddenDays(validRange);
          if (forceToValid) {
              currentDate = constrainMarkerToRange(currentDate, validRange);
          }
          currentInfo = this.buildCurrentRangeInfo(currentDate, direction);
          isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
          renderRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.range), currentInfo.unit, isRangeAllDay);
          renderRange = this.trimHiddenDays(renderRange);
          activeRange = renderRange;
          if (!this.options.showNonCurrentDates) {
              activeRange = intersectRanges(activeRange, currentInfo.range);
          }
          minTime = createDuration(this.options.minTime);
          maxTime = createDuration(this.options.maxTime);
          activeRange = this.adjustActiveRange(activeRange, minTime, maxTime);
          activeRange = intersectRanges(activeRange, validRange); // might return null
          // it's invalid if the originally requested date is not contained,
          // or if the range is completely outside of the valid range.
          isValid = rangesIntersect(currentInfo.range, validRange);
          return {
              // constraint for where prev/next operations can go and where events can be dragged/resized to.
              // an object with optional start and end properties.
              validRange: validRange,
              // range the view is formally responsible for.
              // for example, a month view might have 1st-31st, excluding padded dates
              currentRange: currentInfo.range,
              // name of largest unit being displayed, like "month" or "week"
              currentRangeUnit: currentInfo.unit,
              isRangeAllDay: isRangeAllDay,
              // dates that display events and accept drag-n-drop
              // will be `null` if no dates accept events
              activeRange: activeRange,
              // date range with a rendered skeleton
              // includes not-active days that need some sort of DOM
              renderRange: renderRange,
              // Duration object that denotes the first visible time of any given day
              minTime: minTime,
              // Duration object that denotes the exclusive visible end time of any given day
              maxTime: maxTime,
              isValid: isValid,
              // how far the current date will move for a prev/next operation
              dateIncrement: this.buildDateIncrement(currentInfo.duration)
              // pass a fallback (might be null) ^
          };
      };
      // Builds an object with optional start/end properties.
      // Indicates the minimum/maximum dates to display.
      // not responsible for trimming hidden days.
      DateProfileGenerator.prototype.buildValidRange = function () {
          return this.getRangeOption('validRange', this.calendar.getNow()) ||
              { start: null, end: null }; // completely open-ended
      };
      // Builds a structure with info about the "current" range, the range that is
      // highlighted as being the current month for example.
      // See build() for a description of `direction`.
      // Guaranteed to have `range` and `unit` properties. `duration` is optional.
      DateProfileGenerator.prototype.buildCurrentRangeInfo = function (date, direction) {
          var _a = this, viewSpec = _a.viewSpec, dateEnv = _a.dateEnv;
          var duration = null;
          var unit = null;
          var range = null;
          var dayCount;
          if (viewSpec.duration) {
              duration = viewSpec.duration;
              unit = viewSpec.durationUnit;
              range = this.buildRangeFromDuration(date, direction, duration, unit);
          }
          else if ((dayCount = this.options.dayCount)) {
              unit = 'day';
              range = this.buildRangeFromDayCount(date, direction, dayCount);
          }
          else if ((range = this.buildCustomVisibleRange(date))) {
              unit = dateEnv.greatestWholeUnit(range.start, range.end).unit;
          }
          else {
              duration = this.getFallbackDuration();
              unit = greatestDurationDenominator(duration).unit;
              range = this.buildRangeFromDuration(date, direction, duration, unit);
          }
          return { duration: duration, unit: unit, range: range };
      };
      DateProfileGenerator.prototype.getFallbackDuration = function () {
          return createDuration({ day: 1 });
      };
      // Returns a new activeRange to have time values (un-ambiguate)
      // minTime or maxTime causes the range to expand.
      DateProfileGenerator.prototype.adjustActiveRange = function (range, minTime, maxTime) {
          var dateEnv = this.dateEnv;
          var start = range.start;
          var end = range.end;
          if (this.viewSpec.class.prototype.usesMinMaxTime) {
              // expand active range if minTime is negative (why not when positive?)
              if (asRoughDays(minTime) < 0) {
                  start = startOfDay(start); // necessary?
                  start = dateEnv.add(start, minTime);
              }
              // expand active range if maxTime is beyond one day (why not when positive?)
              if (asRoughDays(maxTime) > 1) {
                  end = startOfDay(end); // necessary?
                  end = addDays(end, -1);
                  end = dateEnv.add(end, maxTime);
              }
          }
          return { start: start, end: end };
      };
      // Builds the "current" range when it is specified as an explicit duration.
      // `unit` is the already-computed greatestDurationDenominator unit of duration.
      DateProfileGenerator.prototype.buildRangeFromDuration = function (date, direction, duration, unit) {
          var dateEnv = this.dateEnv;
          var alignment = this.options.dateAlignment;
          var dateIncrementInput;
          var dateIncrementDuration;
          var start;
          var end;
          var res;
          // compute what the alignment should be
          if (!alignment) {
              dateIncrementInput = this.options.dateIncrement;
              if (dateIncrementInput) {
                  dateIncrementDuration = createDuration(dateIncrementInput);
                  // use the smaller of the two units
                  if (asRoughMs(dateIncrementDuration) < asRoughMs(duration)) {
                      alignment = greatestDurationDenominator(dateIncrementDuration, !getWeeksFromInput(dateIncrementInput)).unit;
                  }
                  else {
                      alignment = unit;
                  }
              }
              else {
                  alignment = unit;
              }
          }
          // if the view displays a single day or smaller
          if (asRoughDays(duration) <= 1) {
              if (this.isHiddenDay(start)) {
                  start = this.skipHiddenDays(start, direction);
                  start = startOfDay(start);
              }
          }
          function computeRes() {
              start = dateEnv.startOf(date, alignment);
              end = dateEnv.add(start, duration);
              res = { start: start, end: end };
          }
          computeRes();
          // if range is completely enveloped by hidden days, go past the hidden days
          if (!this.trimHiddenDays(res)) {
              date = this.skipHiddenDays(date, direction);
              computeRes();
          }
          return res;
      };
      // Builds the "current" range when a dayCount is specified.
      DateProfileGenerator.prototype.buildRangeFromDayCount = function (date, direction, dayCount) {
          var dateEnv = this.dateEnv;
          var customAlignment = this.options.dateAlignment;
          var runningCount = 0;
          var start = date;
          var end;
          if (customAlignment) {
              start = dateEnv.startOf(start, customAlignment);
          }
          start = startOfDay(start);
          start = this.skipHiddenDays(start, direction);
          end = start;
          do {
              end = addDays(end, 1);
              if (!this.isHiddenDay(end)) {
                  runningCount++;
              }
          } while (runningCount < dayCount);
          return { start: start, end: end };
      };
      // Builds a normalized range object for the "visible" range,
      // which is a way to define the currentRange and activeRange at the same time.
      DateProfileGenerator.prototype.buildCustomVisibleRange = function (date) {
          var dateEnv = this.dateEnv;
          var visibleRange = this.getRangeOption('visibleRange', dateEnv.toDate(date));
          if (visibleRange && (visibleRange.start == null || visibleRange.end == null)) {
              return null;
          }
          return visibleRange;
      };
      // Computes the range that will represent the element/cells for *rendering*,
      // but which may have voided days/times.
      // not responsible for trimming hidden days.
      DateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
          return currentRange;
      };
      // Compute the duration value that should be added/substracted to the current date
      // when a prev/next operation happens.
      DateProfileGenerator.prototype.buildDateIncrement = function (fallback) {
          var dateIncrementInput = this.options.dateIncrement;
          var customAlignment;
          if (dateIncrementInput) {
              return createDuration(dateIncrementInput);
          }
          else if ((customAlignment = this.options.dateAlignment)) {
              return createDuration(1, customAlignment);
          }
          else if (fallback) {
              return fallback;
          }
          else {
              return createDuration({ days: 1 });
          }
      };
      // Arguments after name will be forwarded to a hypothetical function value
      // WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
      // Always clone your objects if you fear mutation.
      DateProfileGenerator.prototype.getRangeOption = function (name) {
          var otherArgs = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              otherArgs[_i - 1] = arguments[_i];
          }
          var val = this.options[name];
          if (typeof val === 'function') {
              val = val.apply(null, otherArgs);
          }
          if (val) {
              val = parseRange(val, this.dateEnv);
          }
          if (val) {
              val = computeVisibleDayRange(val);
          }
          return val;
      };
      /* Hidden Days
      ------------------------------------------------------------------------------------------------------------------*/
      // Initializes internal variables related to calculating hidden days-of-week
      DateProfileGenerator.prototype.initHiddenDays = function () {
          var hiddenDays = this.options.hiddenDays || []; // array of day-of-week indices that are hidden
          var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
          var dayCnt = 0;
          var i;
          if (this.options.weekends === false) {
              hiddenDays.push(0, 6); // 0=sunday, 6=saturday
          }
          for (i = 0; i < 7; i++) {
              if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) {
                  dayCnt++;
              }
          }
          if (!dayCnt) {
              throw new Error('invalid hiddenDays'); // all days were hidden? bad.
          }
          this.isHiddenDayHash = isHiddenDayHash;
      };
      // Remove days from the beginning and end of the range that are computed as hidden.
      // If the whole range is trimmed off, returns null
      DateProfileGenerator.prototype.trimHiddenDays = function (range) {
          var start = range.start;
          var end = range.end;
          if (start) {
              start = this.skipHiddenDays(start);
          }
          if (end) {
              end = this.skipHiddenDays(end, -1, true);
          }
          if (start == null || end == null || start < end) {
              return { start: start, end: end };
          }
          return null;
      };
      // Is the current day hidden?
      // `day` is a day-of-week index (0-6), or a Date (used for UTC)
      DateProfileGenerator.prototype.isHiddenDay = function (day) {
          if (day instanceof Date) {
              day = day.getUTCDay();
          }
          return this.isHiddenDayHash[day];
      };
      // Incrementing the current day until it is no longer a hidden day, returning a copy.
      // DOES NOT CONSIDER validRange!
      // If the initial value of `date` is not a hidden day, don't do anything.
      // Pass `isExclusive` as `true` if you are dealing with an end date.
      // `inc` defaults to `1` (increment one day forward each time)
      DateProfileGenerator.prototype.skipHiddenDays = function (date, inc, isExclusive) {
          if (inc === void 0) { inc = 1; }
          if (isExclusive === void 0) { isExclusive = false; }
          while (this.isHiddenDayHash[(date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7]) {
              date = addDays(date, inc);
          }
          return date;
      };
      return DateProfileGenerator;
  }());
  // TODO: find a way to avoid comparing DateProfiles. it's tedious
  function isDateProfilesEqual(p0, p1) {
      return rangesEqual(p0.validRange, p1.validRange) &&
          rangesEqual(p0.activeRange, p1.activeRange) &&
          rangesEqual(p0.renderRange, p1.renderRange) &&
          durationsEqual(p0.minTime, p1.minTime) &&
          durationsEqual(p0.maxTime, p1.maxTime);
      /*
      TODO: compare more?
        currentRange: DateRange
        currentRangeUnit: string
        isRangeAllDay: boolean
        isValid: boolean
        dateIncrement: Duration
      */
  }

  function reduce (state, action, calendar) {
      var viewType = reduceViewType(state.viewType, action);
      var dateProfile = reduceDateProfile(state.dateProfile, action, state.currentDate, viewType, calendar);
      var eventSources = reduceEventSources(state.eventSources, action, dateProfile, calendar);
      var nextState = __assign({}, state, { viewType: viewType,
          dateProfile: dateProfile, currentDate: reduceCurrentDate(state.currentDate, action, dateProfile), eventSources: eventSources, eventStore: reduceEventStore(state.eventStore, action, eventSources, dateProfile, calendar), dateSelection: reduceDateSelection(state.dateSelection, action), eventSelection: reduceSelectedEvent(state.eventSelection, action), eventDrag: reduceEventDrag(state.eventDrag, action), eventResize: reduceEventResize(state.eventResize, action), eventSourceLoadingLevel: computeLoadingLevel(eventSources), loadingLevel: computeLoadingLevel(eventSources) });
      for (var _i = 0, _a = calendar.pluginSystem.hooks.reducers; _i < _a.length; _i++) {
          var reducerFunc = _a[_i];
          nextState = reducerFunc(nextState, action, calendar);
      }
      // console.log(action.type, nextState)
      return nextState;
  }
  function reduceViewType(currentViewType, action) {
      switch (action.type) {
          case 'SET_VIEW_TYPE':
              return action.viewType;
          default:
              return currentViewType;
      }
  }
  function reduceDateProfile(currentDateProfile, action, currentDate, viewType, calendar) {
      var newDateProfile;
      switch (action.type) {
          case 'PREV':
              newDateProfile = calendar.dateProfileGenerators[viewType].buildPrev(currentDateProfile, currentDate);
              break;
          case 'NEXT':
              newDateProfile = calendar.dateProfileGenerators[viewType].buildNext(currentDateProfile, currentDate);
              break;
          case 'SET_DATE':
              if (!currentDateProfile.activeRange ||
                  !rangeContainsMarker(currentDateProfile.currentRange, action.dateMarker)) {
                  newDateProfile = calendar.dateProfileGenerators[viewType].build(action.dateMarker, undefined, true // forceToValid
                  );
              }
              break;
          case 'SET_VIEW_TYPE':
              var generator = calendar.dateProfileGenerators[viewType];
              if (!generator) {
                  throw new Error(viewType ?
                      'The FullCalendar view "' + viewType + '" does not exist. Make sure your plugins are loaded correctly.' :
                      'No available FullCalendar view plugins.');
              }
              newDateProfile = generator.build(action.dateMarker || currentDate, undefined, true // forceToValid
              );
              break;
      }
      if (newDateProfile &&
          newDateProfile.isValid &&
          !(currentDateProfile && isDateProfilesEqual(currentDateProfile, newDateProfile))) {
          return newDateProfile;
      }
      else {
          return currentDateProfile;
      }
  }
  function reduceCurrentDate(currentDate, action, dateProfile) {
      switch (action.type) {
          case 'PREV':
          case 'NEXT':
              if (!rangeContainsMarker(dateProfile.currentRange, currentDate)) {
                  return dateProfile.currentRange.start;
              }
              else {
                  return currentDate;
              }
          case 'SET_DATE':
          case 'SET_VIEW_TYPE':
              var newDate = action.dateMarker || currentDate;
              if (dateProfile.activeRange && !rangeContainsMarker(dateProfile.activeRange, newDate)) {
                  return dateProfile.currentRange.start;
              }
              else {
                  return newDate;
              }
          default:
              return currentDate;
      }
  }
  function reduceDateSelection(currentSelection, action, calendar) {
      switch (action.type) {
          case 'SELECT_DATES':
              return action.selection;
          case 'UNSELECT_DATES':
              return null;
          default:
              return currentSelection;
      }
  }
  function reduceSelectedEvent(currentInstanceId, action) {
      switch (action.type) {
          case 'SELECT_EVENT':
              return action.eventInstanceId;
          case 'UNSELECT_EVENT':
              return '';
          default:
              return currentInstanceId;
      }
  }
  function reduceEventDrag(currentDrag, action, sources, calendar) {
      switch (action.type) {
          case 'SET_EVENT_DRAG':
              var newDrag = action.state;
              return {
                  affectedEvents: newDrag.affectedEvents,
                  mutatedEvents: newDrag.mutatedEvents,
                  isEvent: newDrag.isEvent,
                  origSeg: newDrag.origSeg
              };
          case 'UNSET_EVENT_DRAG':
              return null;
          default:
              return currentDrag;
      }
  }
  function reduceEventResize(currentResize, action, sources, calendar) {
      switch (action.type) {
          case 'SET_EVENT_RESIZE':
              var newResize = action.state;
              return {
                  affectedEvents: newResize.affectedEvents,
                  mutatedEvents: newResize.mutatedEvents,
                  isEvent: newResize.isEvent,
                  origSeg: newResize.origSeg
              };
          case 'UNSET_EVENT_RESIZE':
              return null;
          default:
              return currentResize;
      }
  }
  function computeLoadingLevel(eventSources) {
      var cnt = 0;
      for (var sourceId in eventSources) {
          if (eventSources[sourceId].isFetching) {
              cnt++;
          }
      }
      return cnt;
  }

  var STANDARD_PROPS = {
      start: null,
      end: null,
      allDay: Boolean
  };
  function parseDateSpan(raw, dateEnv, defaultDuration) {
      var span = parseOpenDateSpan(raw, dateEnv);
      var range = span.range;
      if (!range.start) {
          return null;
      }
      if (!range.end) {
          if (defaultDuration == null) {
              return null;
          }
          else {
              range.end = dateEnv.add(range.start, defaultDuration);
          }
      }
      return span;
  }
  /*
  TODO: somehow combine with parseRange?
  Will return null if the start/end props were present but parsed invalidly.
  */
  function parseOpenDateSpan(raw, dateEnv) {
      var leftovers = {};
      var standardProps = refineProps(raw, STANDARD_PROPS, {}, leftovers);
      var startMeta = standardProps.start ? dateEnv.createMarkerMeta(standardProps.start) : null;
      var endMeta = standardProps.end ? dateEnv.createMarkerMeta(standardProps.end) : null;
      var allDay = standardProps.allDay;
      if (allDay == null) {
          allDay = (startMeta && startMeta.isTimeUnspecified) &&
              (!endMeta || endMeta.isTimeUnspecified);
      }
      // use this leftover object as the selection object
      leftovers.range = {
          start: startMeta ? startMeta.marker : null,
          end: endMeta ? endMeta.marker : null
      };
      leftovers.allDay = allDay;
      return leftovers;
  }
  function buildDateSpanApi(span, dateEnv) {
      return {
          start: dateEnv.toDate(span.range.start),
          end: dateEnv.toDate(span.range.end),
          startStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
          endStr: dateEnv.formatIso(span.range.end, { omitTime: span.allDay }),
          allDay: span.allDay
      };
  }
  function buildDatePointApi(span, dateEnv) {
      return {
          date: dateEnv.toDate(span.range.start),
          dateStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
          allDay: span.allDay
      };
  }
  function fabricateEventRange(dateSpan, eventUiBases, calendar) {
      var def = parseEventDef({ editable: false }, '', // sourceId
      dateSpan.allDay, true, // hasEnd
      calendar);
      return {
          def: def,
          ui: compileEventUi(def, eventUiBases),
          instance: createEventInstance(def.defId, dateSpan.range),
          range: dateSpan.range,
          isStart: true,
          isEnd: true
      };
  }

  function compileViewDefs(defaultConfigs, overrideConfigs) {
      var hash = {};
      var viewType;
      for (viewType in defaultConfigs) {
          ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
      }
      for (viewType in overrideConfigs) {
          ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
      }
      return hash;
  }
  function ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
      if (hash[viewType]) {
          return hash[viewType];
      }
      var viewDef = buildViewDef(viewType, hash, defaultConfigs, overrideConfigs);
      if (viewDef) {
          hash[viewType] = viewDef;
      }
      return viewDef;
  }
  function buildViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
      var defaultConfig = defaultConfigs[viewType];
      var overrideConfig = overrideConfigs[viewType];
      var queryProp = function (name) {
          return (defaultConfig && defaultConfig[name] !== null) ? defaultConfig[name] :
              ((overrideConfig && overrideConfig[name] !== null) ? overrideConfig[name] : null);
      };
      var theClass = queryProp('class');
      var superType = queryProp('superType');
      if (!superType && theClass) {
          superType =
              findViewNameBySubclass(theClass, overrideConfigs) ||
                  findViewNameBySubclass(theClass, defaultConfigs);
      }
      var superDef = null;
      if (superType) {
          if (superType === viewType) {
              throw new Error('Can\'t have a custom view type that references itself');
          }
          superDef = ensureViewDef(superType, hash, defaultConfigs, overrideConfigs);
      }
      if (!theClass && superDef) {
          theClass = superDef.class;
      }
      if (!theClass) {
          return null; // don't throw a warning, might be settings for a single-unit view
      }
      return {
          type: viewType,
          class: theClass,
          defaults: __assign({}, (superDef ? superDef.defaults : {}), (defaultConfig ? defaultConfig.options : {})),
          overrides: __assign({}, (superDef ? superDef.overrides : {}), (overrideConfig ? overrideConfig.options : {}))
      };
  }
  function findViewNameBySubclass(viewSubclass, configs) {
      var superProto = Object.getPrototypeOf(viewSubclass.prototype);
      for (var viewType in configs) {
          var parsed = configs[viewType];
          // need DIRECT subclass, so instanceof won't do it
          if (parsed.class && parsed.class.prototype === superProto) {
              return viewType;
          }
      }
      return '';
  }

  function parseViewConfigs(inputs) {
      return mapHash(inputs, parseViewConfig);
  }
  var VIEW_DEF_PROPS = {
      type: String,
      class: null
  };
  function parseViewConfig(input) {
      if (typeof input === 'function') {
          input = { class: input };
      }
      var options = {};
      var props = refineProps(input, VIEW_DEF_PROPS, {}, options);
      return {
          superType: props.type,
          class: props.class,
          options: options
      };
  }

  function buildViewSpecs(defaultInputs, optionsManager) {
      var defaultConfigs = parseViewConfigs(defaultInputs);
      var overrideConfigs = parseViewConfigs(optionsManager.overrides.views);
      var viewDefs = compileViewDefs(defaultConfigs, overrideConfigs);
      return mapHash(viewDefs, function (viewDef) {
          return buildViewSpec(viewDef, overrideConfigs, optionsManager);
      });
  }
  function buildViewSpec(viewDef, overrideConfigs, optionsManager) {
      var durationInput = viewDef.overrides.duration ||
          viewDef.defaults.duration ||
          optionsManager.dynamicOverrides.duration ||
          optionsManager.overrides.duration;
      var duration = null;
      var durationUnit = '';
      var singleUnit = '';
      var singleUnitOverrides = {};
      if (durationInput) {
          duration = createDuration(durationInput);
          if (duration) { // valid?
              var denom = greatestDurationDenominator(duration, !getWeeksFromInput(durationInput));
              durationUnit = denom.unit;
              if (denom.value === 1) {
                  singleUnit = durationUnit;
                  singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].options : {};
              }
          }
      }
      var queryButtonText = function (options) {
          var buttonTextMap = options.buttonText || {};
          var buttonTextKey = viewDef.defaults.buttonTextKey;
          if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
              return buttonTextMap[buttonTextKey];
          }
          if (buttonTextMap[viewDef.type] != null) {
              return buttonTextMap[viewDef.type];
          }
          if (buttonTextMap[singleUnit] != null) {
              return buttonTextMap[singleUnit];
          }
      };
      return {
          type: viewDef.type,
          class: viewDef.class,
          duration: duration,
          durationUnit: durationUnit,
          singleUnit: singleUnit,
          options: __assign({}, globalDefaults, viewDef.defaults, optionsManager.dirDefaults, optionsManager.localeDefaults, optionsManager.overrides, singleUnitOverrides, viewDef.overrides, optionsManager.dynamicOverrides),
          buttonTextOverride: queryButtonText(optionsManager.dynamicOverrides) ||
              queryButtonText(optionsManager.overrides) || // constructor-specified buttonText lookup hash takes precedence
              viewDef.overrides.buttonText,
          buttonTextDefault: queryButtonText(optionsManager.localeDefaults) ||
              queryButtonText(optionsManager.dirDefaults) ||
              viewDef.defaults.buttonText ||
              queryButtonText(globalDefaults) ||
              viewDef.type // fall back to given view name
      };
  }

  var Toolbar = /** @class */ (function (_super) {
      __extends(Toolbar, _super);
      function Toolbar(extraClassName) {
          var _this = _super.call(this) || this;
          _this._renderLayout = memoizeRendering(_this.renderLayout, _this.unrenderLayout);
          _this._updateTitle = memoizeRendering(_this.updateTitle, null, [_this._renderLayout]);
          _this._updateActiveButton = memoizeRendering(_this.updateActiveButton, null, [_this._renderLayout]);
          _this._updateToday = memoizeRendering(_this.updateToday, null, [_this._renderLayout]);
          _this._updatePrev = memoizeRendering(_this.updatePrev, null, [_this._renderLayout]);
          _this._updateNext = memoizeRendering(_this.updateNext, null, [_this._renderLayout]);
          _this.el = createElement('div', { className: 'fc-toolbar ' + extraClassName });
          return _this;
      }
      Toolbar.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this._renderLayout.unrender(); // should unrender everything else
          removeElement(this.el);
      };
      Toolbar.prototype.render = function (props) {
          this._renderLayout(props.layout);
          this._updateTitle(props.title);
          this._updateActiveButton(props.activeButton);
          this._updateToday(props.isTodayEnabled);
          this._updatePrev(props.isPrevEnabled);
          this._updateNext(props.isNextEnabled);
      };
      Toolbar.prototype.renderLayout = function (layout) {
          var el = this.el;
          this.viewsWithButtons = [];
          appendToElement(el, this.renderSection('left', layout.left));
          appendToElement(el, this.renderSection('center', layout.center));
          appendToElement(el, this.renderSection('right', layout.right));
      };
      Toolbar.prototype.unrenderLayout = function () {
          this.el.innerHTML = '';
      };
      Toolbar.prototype.renderSection = function (position, buttonStr) {
          var _this = this;
          var _a = this.context, theme = _a.theme, calendar = _a.calendar;
          var optionsManager = calendar.optionsManager;
          var viewSpecs = calendar.viewSpecs;
          var sectionEl = createElement('div', { className: 'fc-' + position });
          var calendarCustomButtons = optionsManager.computed.customButtons || {};
          var calendarButtonTextOverrides = optionsManager.overrides.buttonText || {};
          var calendarButtonText = optionsManager.computed.buttonText || {};
          if (buttonStr) {
              buttonStr.split(' ').forEach(function (buttonGroupStr, i) {
                  var groupChildren = [];
                  var isOnlyButtons = true;
                  var groupEl;
                  buttonGroupStr.split(',').forEach(function (buttonName, j) {
                      var customButtonProps;
                      var viewSpec;
                      var buttonClick;
                      var buttonIcon; // only one of these will be set
                      var buttonText; // "
                      var buttonInnerHtml;
                      var buttonClasses;
                      var buttonEl;
                      var buttonAriaAttr;
                      if (buttonName === 'title') {
                          groupChildren.push(htmlToElement('<h2>&nbsp;</h2>')); // we always want it to take up height
                          isOnlyButtons = false;
                      }
                      else {
                          if ((customButtonProps = calendarCustomButtons[buttonName])) {
                              buttonClick = function (ev) {
                                  if (customButtonProps.click) {
                                      customButtonProps.click.call(buttonEl, ev);
                                  }
                              };
                              (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
                                  (buttonIcon = theme.getIconClass(buttonName)) ||
                                  (buttonText = customButtonProps.text);
                          }
                          else if ((viewSpec = viewSpecs[buttonName])) {
                              _this.viewsWithButtons.push(buttonName);
                              buttonClick = function () {
                                  calendar.changeView(buttonName);
                              };
                              (buttonText = viewSpec.buttonTextOverride) ||
                                  (buttonIcon = theme.getIconClass(buttonName)) ||
                                  (buttonText = viewSpec.buttonTextDefault);
                          }
                          else if (calendar[buttonName]) { // a calendar method
                              buttonClick = function () {
                                  calendar[buttonName]();
                              };
                              (buttonText = calendarButtonTextOverrides[buttonName]) ||
                                  (buttonIcon = theme.getIconClass(buttonName)) ||
                                  (buttonText = calendarButtonText[buttonName]);
                              //            ^ everything else is considered default
                          }
                          if (buttonClick) {
                              buttonClasses = [
                                  'fc-' + buttonName + '-button',
                                  theme.getClass('button')
                              ];
                              if (buttonText) {
                                  buttonInnerHtml = htmlEscape(buttonText);
                                  buttonAriaAttr = '';
                              }
                              else if (buttonIcon) {
                                  buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
                                  buttonAriaAttr = ' aria-label="' + buttonName + '"';
                              }
                              buttonEl = htmlToElement(// type="button" so that it doesn't submit a form
                              '<button type="button" class="' + buttonClasses.join(' ') + '"' +
                                  buttonAriaAttr +
                                  '>' + buttonInnerHtml + '</button>');
                              buttonEl.addEventListener('click', buttonClick);
                              groupChildren.push(buttonEl);
                          }
                      }
                  });
                  if (groupChildren.length > 1) {
                      groupEl = document.createElement('div');
                      var buttonGroupClassName = theme.getClass('buttonGroup');
                      if (isOnlyButtons && buttonGroupClassName) {
                          groupEl.classList.add(buttonGroupClassName);
                      }
                      appendToElement(groupEl, groupChildren);
                      sectionEl.appendChild(groupEl);
                  }
                  else {
                      appendToElement(sectionEl, groupChildren); // 1 or 0 children
                  }
              });
          }
          return sectionEl;
      };
      Toolbar.prototype.updateToday = function (isTodayEnabled) {
          this.toggleButtonEnabled('today', isTodayEnabled);
      };
      Toolbar.prototype.updatePrev = function (isPrevEnabled) {
          this.toggleButtonEnabled('prev', isPrevEnabled);
      };
      Toolbar.prototype.updateNext = function (isNextEnabled) {
          this.toggleButtonEnabled('next', isNextEnabled);
      };
      Toolbar.prototype.updateTitle = function (text) {
          findElements(this.el, 'h2').forEach(function (titleEl) {
              titleEl.innerText = text;
          });
      };
      Toolbar.prototype.updateActiveButton = function (buttonName) {
          var theme = this.context.theme;
          var className = theme.getClass('buttonActive');
          findElements(this.el, 'button').forEach(function (buttonEl) {
              if (buttonName && buttonEl.classList.contains('fc-' + buttonName + '-button')) {
                  buttonEl.classList.add(className);
              }
              else {
                  buttonEl.classList.remove(className);
              }
          });
      };
      Toolbar.prototype.toggleButtonEnabled = function (buttonName, bool) {
          findElements(this.el, '.fc-' + buttonName + '-button').forEach(function (buttonEl) {
              buttonEl.disabled = !bool;
          });
      };
      return Toolbar;
  }(Component));

  var CalendarComponent = /** @class */ (function (_super) {
      __extends(CalendarComponent, _super);
      function CalendarComponent(el) {
          var _this = _super.call(this) || this;
          _this.elClassNames = [];
          _this.renderSkeleton = memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
          _this.renderToolbars = memoizeRendering(_this._renderToolbars, _this._unrenderToolbars, [_this.renderSkeleton]);
          _this.buildComponentContext = memoize(buildComponentContext);
          _this.buildViewPropTransformers = memoize(buildViewPropTransformers);
          _this.el = el;
          _this.computeTitle = memoize(computeTitle);
          _this.parseBusinessHours = memoize(function (input) {
              return parseBusinessHours(input, _this.context.calendar);
          });
          return _this;
      }
      CalendarComponent.prototype.render = function (props, context) {
          this.freezeHeight();
          var title = this.computeTitle(props.dateProfile, props.viewSpec.options);
          this.renderSkeleton(context);
          this.renderToolbars(props.viewSpec, props.dateProfile, props.currentDate, title);
          this.renderView(props, title);
          this.updateSize();
          this.thawHeight();
      };
      CalendarComponent.prototype.destroy = function () {
          if (this.header) {
              this.header.destroy();
          }
          if (this.footer) {
              this.footer.destroy();
          }
          this.renderSkeleton.unrender(); // will call destroyView
          _super.prototype.destroy.call(this);
      };
      CalendarComponent.prototype._renderSkeleton = function (context) {
          this.updateElClassNames(context);
          prependToElement(this.el, this.contentEl = createElement('div', { className: 'fc-view-container' }));
          var calendar = context.calendar;
          for (var _i = 0, _a = calendar.pluginSystem.hooks.viewContainerModifiers; _i < _a.length; _i++) {
              var modifyViewContainer = _a[_i];
              modifyViewContainer(this.contentEl, calendar);
          }
      };
      CalendarComponent.prototype._unrenderSkeleton = function () {
          // weird to have this here
          if (this.view) {
              this.savedScroll = this.view.queryScroll();
              this.view.destroy();
              this.view = null;
          }
          removeElement(this.contentEl);
          this.removeElClassNames();
      };
      CalendarComponent.prototype.removeElClassNames = function () {
          var classList = this.el.classList;
          for (var _i = 0, _a = this.elClassNames; _i < _a.length; _i++) {
              var className = _a[_i];
              classList.remove(className);
          }
          this.elClassNames = [];
      };
      CalendarComponent.prototype.updateElClassNames = function (context) {
          this.removeElClassNames();
          var theme = context.theme, options = context.options;
          this.elClassNames = [
              'fc',
              'fc-' + options.dir,
              theme.getClass('widget')
          ];
          var classList = this.el.classList;
          for (var _i = 0, _a = this.elClassNames; _i < _a.length; _i++) {
              var className = _a[_i];
              classList.add(className);
          }
      };
      CalendarComponent.prototype._renderToolbars = function (viewSpec, dateProfile, currentDate, title) {
          var _a = this, context = _a.context, header = _a.header, footer = _a.footer;
          var options = context.options, calendar = context.calendar;
          var headerLayout = options.header;
          var footerLayout = options.footer;
          var dateProfileGenerator = this.props.dateProfileGenerator;
          var now = calendar.getNow();
          var todayInfo = dateProfileGenerator.build(now);
          var prevInfo = dateProfileGenerator.buildPrev(dateProfile, currentDate);
          var nextInfo = dateProfileGenerator.buildNext(dateProfile, currentDate);
          var toolbarProps = {
              title: title,
              activeButton: viewSpec.type,
              isTodayEnabled: todayInfo.isValid && !rangeContainsMarker(dateProfile.currentRange, now),
              isPrevEnabled: prevInfo.isValid,
              isNextEnabled: nextInfo.isValid
          };
          if (headerLayout) {
              if (!header) {
                  header = this.header = new Toolbar('fc-header-toolbar');
                  prependToElement(this.el, header.el);
              }
              header.receiveProps(__assign({ layout: headerLayout }, toolbarProps), context);
          }
          else if (header) {
              header.destroy();
              header = this.header = null;
          }
          if (footerLayout) {
              if (!footer) {
                  footer = this.footer = new Toolbar('fc-footer-toolbar');
                  appendToElement(this.el, footer.el);
              }
              footer.receiveProps(__assign({ layout: footerLayout }, toolbarProps), context);
          }
          else if (footer) {
              footer.destroy();
              footer = this.footer = null;
          }
      };
      CalendarComponent.prototype._unrenderToolbars = function () {
          if (this.header) {
              this.header.destroy();
              this.header = null;
          }
          if (this.footer) {
              this.footer.destroy();
              this.footer = null;
          }
      };
      CalendarComponent.prototype.renderView = function (props, title) {
          var view = this.view;
          var _a = this.context, calendar = _a.calendar, options = _a.options;
          var viewSpec = props.viewSpec, dateProfileGenerator = props.dateProfileGenerator;
          if (!view || view.viewSpec !== viewSpec) {
              if (view) {
                  view.destroy();
              }
              view = this.view = new viewSpec['class'](viewSpec, this.contentEl);
              if (this.savedScroll) {
                  view.addScroll(this.savedScroll, true);
                  this.savedScroll = null;
              }
          }
          view.title = title; // for the API
          var viewProps = {
              dateProfileGenerator: dateProfileGenerator,
              dateProfile: props.dateProfile,
              businessHours: this.parseBusinessHours(viewSpec.options.businessHours),
              eventStore: props.eventStore,
              eventUiBases: props.eventUiBases,
              dateSelection: props.dateSelection,
              eventSelection: props.eventSelection,
              eventDrag: props.eventDrag,
              eventResize: props.eventResize
          };
          var transformers = this.buildViewPropTransformers(calendar.pluginSystem.hooks.viewPropsTransformers);
          for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
              var transformer = transformers_1[_i];
              __assign(viewProps, transformer.transform(viewProps, viewSpec, props, options));
          }
          view.receiveProps(viewProps, this.buildComponentContext(this.context, viewSpec, view));
      };
      // Sizing
      // -----------------------------------------------------------------------------------------------------------------
      CalendarComponent.prototype.updateSize = function (isResize) {
          if (isResize === void 0) { isResize = false; }
          var view = this.view;
          if (!view) {
              return; // why?
          }
          if (isResize || this.isHeightAuto == null) {
              this.computeHeightVars();
          }
          view.updateSize(isResize, this.viewHeight, this.isHeightAuto);
          view.updateNowIndicator(); // we need to guarantee this will run after updateSize
          view.popScroll(isResize);
      };
      CalendarComponent.prototype.computeHeightVars = function () {
          var calendar = this.context.calendar; // yuck. need to handle dynamic options
          var heightInput = calendar.opt('height');
          var contentHeightInput = calendar.opt('contentHeight');
          this.isHeightAuto = heightInput === 'auto' || contentHeightInput === 'auto';
          if (typeof contentHeightInput === 'number') { // exists and not 'auto'
              this.viewHeight = contentHeightInput;
          }
          else if (typeof contentHeightInput === 'function') { // exists and is a function
              this.viewHeight = contentHeightInput();
          }
          else if (typeof heightInput === 'number') { // exists and not 'auto'
              this.viewHeight = heightInput - this.queryToolbarsHeight();
          }
          else if (typeof heightInput === 'function') { // exists and is a function
              this.viewHeight = heightInput() - this.queryToolbarsHeight();
          }
          else if (heightInput === 'parent') { // set to height of parent element
              var parentEl = this.el.parentNode;
              this.viewHeight = parentEl.getBoundingClientRect().height - this.queryToolbarsHeight();
          }
          else {
              this.viewHeight = Math.round(this.contentEl.getBoundingClientRect().width /
                  Math.max(calendar.opt('aspectRatio'), .5));
          }
      };
      CalendarComponent.prototype.queryToolbarsHeight = function () {
          var height = 0;
          if (this.header) {
              height += computeHeightAndMargins(this.header.el);
          }
          if (this.footer) {
              height += computeHeightAndMargins(this.footer.el);
          }
          return height;
      };
      // Height "Freezing"
      // -----------------------------------------------------------------------------------------------------------------
      CalendarComponent.prototype.freezeHeight = function () {
          applyStyle(this.el, {
              height: this.el.getBoundingClientRect().height,
              overflow: 'hidden'
          });
      };
      CalendarComponent.prototype.thawHeight = function () {
          applyStyle(this.el, {
              height: '',
              overflow: ''
          });
      };
      return CalendarComponent;
  }(Component));
  // Title and Date Formatting
  // -----------------------------------------------------------------------------------------------------------------
  // Computes what the title at the top of the calendar should be for this view
  function computeTitle(dateProfile, viewOptions) {
      var range;
      // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
      if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
          range = dateProfile.currentRange;
      }
      else { // for day units or smaller, use the actual day range
          range = dateProfile.activeRange;
      }
      return this.context.dateEnv.formatRange(range.start, range.end, createFormatter(viewOptions.titleFormat || computeTitleFormat(dateProfile), viewOptions.titleRangeSeparator), { isEndExclusive: dateProfile.isRangeAllDay });
  }
  // Generates the format string that should be used to generate the title for the current date range.
  // Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
  function computeTitleFormat(dateProfile) {
      var currentRangeUnit = dateProfile.currentRangeUnit;
      if (currentRangeUnit === 'year') {
          return { year: 'numeric' };
      }
      else if (currentRangeUnit === 'month') {
          return { year: 'numeric', month: 'long' }; // like "September 2014"
      }
      else {
          var days = diffWholeDays(dateProfile.currentRange.start, dateProfile.currentRange.end);
          if (days !== null && days > 1) {
              // multi-day range. shorter, like "Sep 9 - 10 2014"
              return { year: 'numeric', month: 'short', day: 'numeric' };
          }
          else {
              // one day. longer, like "September 9 2014"
              return { year: 'numeric', month: 'long', day: 'numeric' };
          }
      }
  }
  // build a context scoped to the view
  function buildComponentContext(context, viewSpec, view) {
      return context.extend(viewSpec.options, view);
  }
  // Plugin
  // -----------------------------------------------------------------------------------------------------------------
  function buildViewPropTransformers(theClasses) {
      return theClasses.map(function (theClass) {
          return new theClass();
      });
  }

  var Interaction = /** @class */ (function () {
      function Interaction(settings) {
          this.component = settings.component;
      }
      Interaction.prototype.destroy = function () {
      };
      return Interaction;
  }());
  function parseInteractionSettings(component, input) {
      return {
          component: component,
          el: input.el,
          useEventCenter: input.useEventCenter != null ? input.useEventCenter : true
      };
  }
  // global state
  var interactionSettingsStore = {};

  /*
  Detects when the user clicks on an event within a DateComponent
  */
  var EventClicking = /** @class */ (function (_super) {
      __extends(EventClicking, _super);
      function EventClicking(settings) {
          var _this = _super.call(this, settings) || this;
          _this.handleSegClick = function (ev, segEl) {
              var component = _this.component;
              var _a = component.context, calendar = _a.calendar, view = _a.view;
              var seg = getElSeg(segEl);
              if (seg && // might be the <div> surrounding the more link
                  component.isValidSegDownEl(ev.target)) {
                  // our way to simulate a link click for elements that can't be <a> tags
                  // grab before trigger fired in case trigger trashes DOM thru rerendering
                  var hasUrlContainer = elementClosest(ev.target, '.fc-has-url');
                  var url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : '';
                  calendar.publiclyTrigger('eventClick', [
                      {
                          el: segEl,
                          event: new EventApi(component.context.calendar, seg.eventRange.def, seg.eventRange.instance),
                          jsEvent: ev,
                          view: view
                      }
                  ]);
                  if (url && !ev.defaultPrevented) {
                      window.location.href = url;
                  }
              }
          };
          var component = settings.component;
          _this.destroy = listenBySelector(component.el, 'click', component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegClick);
          return _this;
      }
      return EventClicking;
  }(Interaction));

  /*
  Triggers events and adds/removes core classNames when the user's pointer
  enters/leaves event-elements of a component.
  */
  var EventHovering = /** @class */ (function (_super) {
      __extends(EventHovering, _super);
      function EventHovering(settings) {
          var _this = _super.call(this, settings) || this;
          // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
          _this.handleEventElRemove = function (el) {
              if (el === _this.currentSegEl) {
                  _this.handleSegLeave(null, _this.currentSegEl);
              }
          };
          _this.handleSegEnter = function (ev, segEl) {
              if (getElSeg(segEl)) { // TODO: better way to make sure not hovering over more+ link or its wrapper
                  segEl.classList.add('fc-allow-mouse-resize');
                  _this.currentSegEl = segEl;
                  _this.triggerEvent('eventMouseEnter', ev, segEl);
              }
          };
          _this.handleSegLeave = function (ev, segEl) {
              if (_this.currentSegEl) {
                  segEl.classList.remove('fc-allow-mouse-resize');
                  _this.currentSegEl = null;
                  _this.triggerEvent('eventMouseLeave', ev, segEl);
              }
          };
          var component = settings.component;
          _this.removeHoverListeners = listenToHoverBySelector(component.el, component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegEnter, _this.handleSegLeave);
          // how to make sure component already has context?
          component.context.calendar.on('eventElRemove', _this.handleEventElRemove);
          return _this;
      }
      EventHovering.prototype.destroy = function () {
          this.removeHoverListeners();
          this.component.context.calendar.off('eventElRemove', this.handleEventElRemove);
      };
      EventHovering.prototype.triggerEvent = function (publicEvName, ev, segEl) {
          var component = this.component;
          var _a = component.context, calendar = _a.calendar, view = _a.view;
          var seg = getElSeg(segEl);
          if (!ev || component.isValidSegDownEl(ev.target)) {
              calendar.publiclyTrigger(publicEvName, [
                  {
                      el: segEl,
                      event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                      jsEvent: ev,
                      view: view
                  }
              ]);
          }
      };
      return EventHovering;
  }(Interaction));

  var StandardTheme = /** @class */ (function (_super) {
      __extends(StandardTheme, _super);
      function StandardTheme() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      return StandardTheme;
  }(Theme));
  StandardTheme.prototype.classes = {
      widget: 'fc-unthemed',
      widgetHeader: 'fc-widget-header',
      widgetContent: 'fc-widget-content',
      buttonGroup: 'fc-button-group',
      button: 'fc-button fc-button-primary',
      buttonActive: 'fc-button-active',
      popoverHeader: 'fc-widget-header',
      popoverContent: 'fc-widget-content',
      // day grid
      headerRow: 'fc-widget-header',
      dayRow: 'fc-widget-content',
      // list view
      listView: 'fc-widget-content'
  };
  StandardTheme.prototype.baseIconClass = 'fc-icon';
  StandardTheme.prototype.iconClasses = {
      close: 'fc-icon-x',
      prev: 'fc-icon-chevron-left',
      next: 'fc-icon-chevron-right',
      prevYear: 'fc-icon-chevrons-left',
      nextYear: 'fc-icon-chevrons-right'
  };
  StandardTheme.prototype.iconOverrideOption = 'buttonIcons';
  StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon';
  StandardTheme.prototype.iconOverridePrefix = 'fc-icon-';

  var Calendar = /** @class */ (function () {
      function Calendar(el, overrides) {
          var _this = this;
          this.buildComponentContext = memoize(buildComponentContext$1);
          this.parseRawLocales = memoize(parseRawLocales);
          this.buildLocale = memoize(buildLocale);
          this.buildDateEnv = memoize(buildDateEnv);
          this.buildTheme = memoize(buildTheme);
          this.buildEventUiSingleBase = memoize(this._buildEventUiSingleBase);
          this.buildSelectionConfig = memoize(this._buildSelectionConfig);
          this.buildEventUiBySource = memoizeOutput(buildEventUiBySource, isPropsEqual);
          this.buildEventUiBases = memoize(buildEventUiBases);
          this.interactionsStore = {};
          this.actionQueue = [];
          this.isReducing = false;
          // isDisplaying: boolean = false // installed in DOM? accepting renders?
          this.needsRerender = false; // needs a render?
          this.isRendering = false; // currently in the executeRender function?
          this.renderingPauseDepth = 0;
          this.buildDelayedRerender = memoize(buildDelayedRerender);
          this.afterSizingTriggers = {};
          this.isViewUpdated = false;
          this.isDatesUpdated = false;
          this.isEventsUpdated = false;
          this.el = el;
          this.optionsManager = new OptionsManager(overrides || {});
          this.pluginSystem = new PluginSystem();
          // only do once. don't do in handleOptions. because can't remove plugins
          this.addPluginInputs(this.optionsManager.computed.plugins || []);
          this.handleOptions(this.optionsManager.computed);
          this.publiclyTrigger('_init'); // for tests
          this.hydrate();
          this.calendarInteractions = this.pluginSystem.hooks.calendarInteractions
              .map(function (calendarInteractionClass) {
              return new calendarInteractionClass(_this);
          });
      }
      Calendar.prototype.addPluginInputs = function (pluginInputs) {
          var pluginDefs = refinePluginDefs(pluginInputs);
          for (var _i = 0, pluginDefs_1 = pluginDefs; _i < pluginDefs_1.length; _i++) {
              var pluginDef = pluginDefs_1[_i];
              this.pluginSystem.add(pluginDef);
          }
      };
      Object.defineProperty(Calendar.prototype, "view", {
          // public API
          get: function () {
              return this.component ? this.component.view : null;
          },
          enumerable: true,
          configurable: true
      });
      // Public API for rendering
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.render = function () {
          if (!this.component) {
              this.component = new CalendarComponent(this.el);
              this.renderableEventStore = createEmptyEventStore();
              this.bindHandlers();
              this.executeRender();
          }
          else {
              this.requestRerender();
          }
      };
      Calendar.prototype.destroy = function () {
          if (this.component) {
              this.unbindHandlers();
              this.component.destroy(); // don't null-out. in case API needs access
              this.component = null; // umm ???
              for (var _i = 0, _a = this.calendarInteractions; _i < _a.length; _i++) {
                  var interaction = _a[_i];
                  interaction.destroy();
              }
              this.publiclyTrigger('_destroyed');
          }
      };
      // Handlers
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.bindHandlers = function () {
          var _this = this;
          // event delegation for nav links
          this.removeNavLinkListener = listenBySelector(this.el, 'click', 'a[data-goto]', function (ev, anchorEl) {
              var gotoOptions = anchorEl.getAttribute('data-goto');
              gotoOptions = gotoOptions ? JSON.parse(gotoOptions) : {};
              var dateEnv = _this.dateEnv;
              var dateMarker = dateEnv.createMarker(gotoOptions.date);
              var viewType = gotoOptions.type;
              // property like "navLinkDayClick". might be a string or a function
              var customAction = _this.viewOpt('navLink' + capitaliseFirstLetter(viewType) + 'Click');
              if (typeof customAction === 'function') {
                  customAction(dateEnv.toDate(dateMarker), ev);
              }
              else {
                  if (typeof customAction === 'string') {
                      viewType = customAction;
                  }
                  _this.zoomTo(dateMarker, viewType);
              }
          });
          if (this.opt('handleWindowResize')) {
              window.addEventListener('resize', this.windowResizeProxy = debounce(// prevents rapid calls
              this.windowResize.bind(this), this.opt('windowResizeDelay')));
          }
      };
      Calendar.prototype.unbindHandlers = function () {
          this.removeNavLinkListener();
          if (this.windowResizeProxy) {
              window.removeEventListener('resize', this.windowResizeProxy);
              this.windowResizeProxy = null;
          }
      };
      // Dispatcher
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.hydrate = function () {
          var _this = this;
          this.state = this.buildInitialState();
          var rawSources = this.opt('eventSources') || [];
          var singleRawSource = this.opt('events');
          var sources = []; // parsed
          if (singleRawSource) {
              rawSources.unshift(singleRawSource);
          }
          for (var _i = 0, rawSources_1 = rawSources; _i < rawSources_1.length; _i++) {
              var rawSource = rawSources_1[_i];
              var source = parseEventSource(rawSource, this);
              if (source) {
                  sources.push(source);
              }
          }
          this.batchRendering(function () {
              _this.dispatch({ type: 'INIT' }); // pass in sources here?
              _this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: sources });
              _this.dispatch({
                  type: 'SET_VIEW_TYPE',
                  viewType: _this.opt('defaultView') || _this.pluginSystem.hooks.defaultView
              });
          });
      };
      Calendar.prototype.buildInitialState = function () {
          return {
              viewType: null,
              loadingLevel: 0,
              eventSourceLoadingLevel: 0,
              currentDate: this.getInitialDate(),
              dateProfile: null,
              eventSources: {},
              eventStore: createEmptyEventStore(),
              dateSelection: null,
              eventSelection: '',
              eventDrag: null,
              eventResize: null
          };
      };
      Calendar.prototype.dispatch = function (action) {
          this.actionQueue.push(action);
          if (!this.isReducing) {
              this.isReducing = true;
              var oldState = this.state;
              while (this.actionQueue.length) {
                  this.state = this.reduce(this.state, this.actionQueue.shift(), this);
              }
              var newState = this.state;
              this.isReducing = false;
              if (!oldState.loadingLevel && newState.loadingLevel) {
                  this.publiclyTrigger('loading', [true]);
              }
              else if (oldState.loadingLevel && !newState.loadingLevel) {
                  this.publiclyTrigger('loading', [false]);
              }
              var view = this.component && this.component.view;
              if (oldState.eventStore !== newState.eventStore) {
                  if (oldState.eventStore) {
                      this.isEventsUpdated = true;
                  }
              }
              if (oldState.dateProfile !== newState.dateProfile) {
                  if (oldState.dateProfile && view) { // why would view be null!?
                      this.publiclyTrigger('datesDestroy', [
                          {
                              view: view,
                              el: view.el
                          }
                      ]);
                  }
                  this.isDatesUpdated = true;
              }
              if (oldState.viewType !== newState.viewType) {
                  if (oldState.viewType && view) { // why would view be null!?
                      this.publiclyTrigger('viewSkeletonDestroy', [
                          {
                              view: view,
                              el: view.el
                          }
                      ]);
                  }
                  this.isViewUpdated = true;
              }
              this.requestRerender();
          }
      };
      Calendar.prototype.reduce = function (state, action, calendar) {
          return reduce(state, action, calendar);
      };
      // Render Queue
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.requestRerender = function () {
          this.needsRerender = true;
          this.delayedRerender(); // will call a debounced-version of tryRerender
      };
      Calendar.prototype.tryRerender = function () {
          if (this.component && // must be accepting renders
              this.needsRerender && // indicates that a rerender was requested
              !this.renderingPauseDepth && // not paused
              !this.isRendering // not currently in the render loop
          ) {
              this.executeRender();
          }
      };
      Calendar.prototype.batchRendering = function (func) {
          this.renderingPauseDepth++;
          func();
          this.renderingPauseDepth--;
          if (this.needsRerender) {
              this.requestRerender();
          }
      };
      // Rendering
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.executeRender = function () {
          // clear these BEFORE the render so that new values will accumulate during render
          this.needsRerender = false;
          this.isRendering = true;
          this.renderComponent();
          this.isRendering = false;
          // received a rerender request while rendering
          if (this.needsRerender) {
              this.delayedRerender();
          }
      };
      /*
      don't call this directly. use executeRender instead
      */
      Calendar.prototype.renderComponent = function () {
          var _a = this, state = _a.state, component = _a.component;
          var viewType = state.viewType;
          var viewSpec = this.viewSpecs[viewType];
          if (!viewSpec) {
              throw new Error("View type \"" + viewType + "\" is not valid");
          }
          // if event sources are still loading and progressive rendering hasn't been enabled,
          // keep rendering the last fully loaded set of events
          var renderableEventStore = this.renderableEventStore =
              (state.eventSourceLoadingLevel && !this.opt('progressiveEventRendering')) ?
                  this.renderableEventStore :
                  state.eventStore;
          var eventUiSingleBase = this.buildEventUiSingleBase(viewSpec.options);
          var eventUiBySource = this.buildEventUiBySource(state.eventSources);
          var eventUiBases = this.eventUiBases = this.buildEventUiBases(renderableEventStore.defs, eventUiSingleBase, eventUiBySource);
          component.receiveProps(__assign({}, state, { viewSpec: viewSpec, dateProfileGenerator: this.dateProfileGenerators[viewType], dateProfile: state.dateProfile, eventStore: renderableEventStore, eventUiBases: eventUiBases, dateSelection: state.dateSelection, eventSelection: state.eventSelection, eventDrag: state.eventDrag, eventResize: state.eventResize }), this.buildComponentContext(this.theme, this.dateEnv, this.optionsManager.computed));
          if (this.isViewUpdated) {
              this.isViewUpdated = false;
              this.publiclyTrigger('viewSkeletonRender', [
                  {
                      view: component.view,
                      el: component.view.el
                  }
              ]);
          }
          if (this.isDatesUpdated) {
              this.isDatesUpdated = false;
              this.publiclyTrigger('datesRender', [
                  {
                      view: component.view,
                      el: component.view.el
                  }
              ]);
          }
          if (this.isEventsUpdated) {
              this.isEventsUpdated = false;
          }
          this.releaseAfterSizingTriggers();
      };
      // Options
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.setOption = function (name, val) {
          var _a;
          this.mutateOptions((_a = {}, _a[name] = val, _a), [], true);
      };
      Calendar.prototype.getOption = function (name) {
          return this.optionsManager.computed[name];
      };
      Calendar.prototype.opt = function (name) {
          return this.optionsManager.computed[name];
      };
      Calendar.prototype.viewOpt = function (name) {
          return this.viewOpts()[name];
      };
      Calendar.prototype.viewOpts = function () {
          return this.viewSpecs[this.state.viewType].options;
      };
      /*
      handles option changes (like a diff)
      */
      Calendar.prototype.mutateOptions = function (updates, removals, isDynamic, deepEqual) {
          var _this = this;
          var changeHandlers = this.pluginSystem.hooks.optionChangeHandlers;
          var normalUpdates = {};
          var specialUpdates = {};
          var oldDateEnv = this.dateEnv; // do this before handleOptions
          var isTimeZoneDirty = false;
          var isSizeDirty = false;
          var anyDifficultOptions = Boolean(removals.length);
          for (var name_1 in updates) {
              if (changeHandlers[name_1]) {
                  specialUpdates[name_1] = updates[name_1];
              }
              else {
                  normalUpdates[name_1] = updates[name_1];
              }
          }
          for (var name_2 in normalUpdates) {
              if (/^(height|contentHeight|aspectRatio)$/.test(name_2)) {
                  isSizeDirty = true;
              }
              else if (/^(defaultDate|defaultView)$/.test(name_2)) ;
              else {
                  anyDifficultOptions = true;
                  if (name_2 === 'timeZone') {
                      isTimeZoneDirty = true;
                  }
              }
          }
          this.optionsManager.mutate(normalUpdates, removals, isDynamic);
          if (anyDifficultOptions) {
              this.handleOptions(this.optionsManager.computed);
          }
          this.batchRendering(function () {
              if (anyDifficultOptions) {
                  if (isTimeZoneDirty) {
                      _this.dispatch({
                          type: 'CHANGE_TIMEZONE',
                          oldDateEnv: oldDateEnv
                      });
                  }
                  /* HACK
                  has the same effect as calling this.requestRerender()
                  but recomputes the state's dateProfile
                  */
                  _this.dispatch({
                      type: 'SET_VIEW_TYPE',
                      viewType: _this.state.viewType
                  });
              }
              else if (isSizeDirty) {
                  _this.updateSize();
              }
              // special updates
              if (deepEqual) {
                  for (var name_3 in specialUpdates) {
                      changeHandlers[name_3](specialUpdates[name_3], _this, deepEqual);
                  }
              }
          });
      };
      /*
      rebuilds things based off of a complete set of refined options
      */
      Calendar.prototype.handleOptions = function (options) {
          var _this = this;
          var pluginHooks = this.pluginSystem.hooks;
          this.defaultAllDayEventDuration = createDuration(options.defaultAllDayEventDuration);
          this.defaultTimedEventDuration = createDuration(options.defaultTimedEventDuration);
          this.delayedRerender = this.buildDelayedRerender(options.rerenderDelay);
          this.theme = this.buildTheme(options);
          var available = this.parseRawLocales(options.locales);
          this.availableRawLocales = available.map;
          var locale = this.buildLocale(options.locale || available.defaultCode, available.map);
          this.dateEnv = this.buildDateEnv(locale, options.timeZone, pluginHooks.namedTimeZonedImpl, options.firstDay, options.weekNumberCalculation, options.weekLabel, pluginHooks.cmdFormatter);
          this.selectionConfig = this.buildSelectionConfig(options); // needs dateEnv. do after :(
          // ineffecient to do every time?
          this.viewSpecs = buildViewSpecs(pluginHooks.views, this.optionsManager);
          // ineffecient to do every time?
          this.dateProfileGenerators = mapHash(this.viewSpecs, function (viewSpec) {
              return new viewSpec.class.prototype.dateProfileGeneratorClass(viewSpec, _this);
          });
      };
      Calendar.prototype.getAvailableLocaleCodes = function () {
          return Object.keys(this.availableRawLocales);
      };
      Calendar.prototype._buildSelectionConfig = function (rawOpts) {
          return processScopedUiProps('select', rawOpts, this);
      };
      Calendar.prototype._buildEventUiSingleBase = function (rawOpts) {
          if (rawOpts.editable) { // so 'editable' affected events
              rawOpts = __assign({}, rawOpts, { eventEditable: true });
          }
          return processScopedUiProps('event', rawOpts, this);
      };
      // Trigger
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.hasPublicHandlers = function (name) {
          return this.hasHandlers(name) ||
              this.opt(name); // handler specified in options
      };
      Calendar.prototype.publiclyTrigger = function (name, args) {
          var optHandler = this.opt(name);
          this.triggerWith(name, this, args);
          if (optHandler) {
              return optHandler.apply(this, args);
          }
      };
      Calendar.prototype.publiclyTriggerAfterSizing = function (name, args) {
          var afterSizingTriggers = this.afterSizingTriggers;
          (afterSizingTriggers[name] || (afterSizingTriggers[name] = [])).push(args);
      };
      Calendar.prototype.releaseAfterSizingTriggers = function () {
          var afterSizingTriggers = this.afterSizingTriggers;
          for (var name_4 in afterSizingTriggers) {
              for (var _i = 0, _a = afterSizingTriggers[name_4]; _i < _a.length; _i++) {
                  var args = _a[_i];
                  this.publiclyTrigger(name_4, args);
              }
          }
          this.afterSizingTriggers = {};
      };
      // View
      // -----------------------------------------------------------------------------------------------------------------
      // Returns a boolean about whether the view is okay to instantiate at some point
      Calendar.prototype.isValidViewType = function (viewType) {
          return Boolean(this.viewSpecs[viewType]);
      };
      Calendar.prototype.changeView = function (viewType, dateOrRange) {
          var dateMarker = null;
          if (dateOrRange) {
              if (dateOrRange.start && dateOrRange.end) { // a range
                  this.optionsManager.mutate({ visibleRange: dateOrRange }, []); // will not rerender
                  this.handleOptions(this.optionsManager.computed); // ...but yuck
              }
              else { // a date
                  dateMarker = this.dateEnv.createMarker(dateOrRange); // just like gotoDate
              }
          }
          this.unselect();
          this.dispatch({
              type: 'SET_VIEW_TYPE',
              viewType: viewType,
              dateMarker: dateMarker
          });
      };
      // Forces navigation to a view for the given date.
      // `viewType` can be a specific view name or a generic one like "week" or "day".
      // needs to change
      Calendar.prototype.zoomTo = function (dateMarker, viewType) {
          var spec;
          viewType = viewType || 'day'; // day is default zoom
          spec = this.viewSpecs[viewType] ||
              this.getUnitViewSpec(viewType);
          this.unselect();
          if (spec) {
              this.dispatch({
                  type: 'SET_VIEW_TYPE',
                  viewType: spec.type,
                  dateMarker: dateMarker
              });
          }
          else {
              this.dispatch({
                  type: 'SET_DATE',
                  dateMarker: dateMarker
              });
          }
      };
      // Given a duration singular unit, like "week" or "day", finds a matching view spec.
      // Preference is given to views that have corresponding buttons.
      Calendar.prototype.getUnitViewSpec = function (unit) {
          var component = this.component;
          var viewTypes = [];
          var i;
          var spec;
          // put views that have buttons first. there will be duplicates, but oh
          if (component.header) {
              viewTypes.push.apply(viewTypes, component.header.viewsWithButtons);
          }
          if (component.footer) {
              viewTypes.push.apply(viewTypes, component.footer.viewsWithButtons);
          }
          for (var viewType in this.viewSpecs) {
              viewTypes.push(viewType);
          }
          for (i = 0; i < viewTypes.length; i++) {
              spec = this.viewSpecs[viewTypes[i]];
              if (spec) {
                  if (spec.singleUnit === unit) {
                      return spec;
                  }
              }
          }
      };
      // Current Date
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.getInitialDate = function () {
          var defaultDateInput = this.opt('defaultDate');
          // compute the initial ambig-timezone date
          if (defaultDateInput != null) {
              return this.dateEnv.createMarker(defaultDateInput);
          }
          else {
              return this.getNow(); // getNow already returns unzoned
          }
      };
      Calendar.prototype.prev = function () {
          this.unselect();
          this.dispatch({ type: 'PREV' });
      };
      Calendar.prototype.next = function () {
          this.unselect();
          this.dispatch({ type: 'NEXT' });
      };
      Calendar.prototype.prevYear = function () {
          this.unselect();
          this.dispatch({
              type: 'SET_DATE',
              dateMarker: this.dateEnv.addYears(this.state.currentDate, -1)
          });
      };
      Calendar.prototype.nextYear = function () {
          this.unselect();
          this.dispatch({
              type: 'SET_DATE',
              dateMarker: this.dateEnv.addYears(this.state.currentDate, 1)
          });
      };
      Calendar.prototype.today = function () {
          this.unselect();
          this.dispatch({
              type: 'SET_DATE',
              dateMarker: this.getNow()
          });
      };
      Calendar.prototype.gotoDate = function (zonedDateInput) {
          this.unselect();
          this.dispatch({
              type: 'SET_DATE',
              dateMarker: this.dateEnv.createMarker(zonedDateInput)
          });
      };
      Calendar.prototype.incrementDate = function (deltaInput) {
          var delta = createDuration(deltaInput);
          if (delta) { // else, warn about invalid input?
              this.unselect();
              this.dispatch({
                  type: 'SET_DATE',
                  dateMarker: this.dateEnv.add(this.state.currentDate, delta)
              });
          }
      };
      // for external API
      Calendar.prototype.getDate = function () {
          return this.dateEnv.toDate(this.state.currentDate);
      };
      // Date Formatting Utils
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.formatDate = function (d, formatter) {
          var dateEnv = this.dateEnv;
          return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter));
      };
      // `settings` is for formatter AND isEndExclusive
      Calendar.prototype.formatRange = function (d0, d1, settings) {
          var dateEnv = this.dateEnv;
          return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings, this.opt('defaultRangeSeparator')), settings);
      };
      Calendar.prototype.formatIso = function (d, omitTime) {
          var dateEnv = this.dateEnv;
          return dateEnv.formatIso(dateEnv.createMarker(d), { omitTime: omitTime });
      };
      // Sizing
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.windowResize = function (ev) {
          if (!this.isHandlingWindowResize &&
              this.component && // why?
              ev.target === window // not a jqui resize event
          ) {
              this.isHandlingWindowResize = true;
              this.updateSize();
              this.publiclyTrigger('windowResize', [this.view]);
              this.isHandlingWindowResize = false;
          }
      };
      Calendar.prototype.updateSize = function () {
          if (this.component) { // when?
              this.component.updateSize(true);
          }
      };
      // Component Registration
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.registerInteractiveComponent = function (component, settingsInput) {
          var settings = parseInteractionSettings(component, settingsInput);
          var DEFAULT_INTERACTIONS = [
              EventClicking,
              EventHovering
          ];
          var interactionClasses = DEFAULT_INTERACTIONS.concat(this.pluginSystem.hooks.componentInteractions);
          var interactions = interactionClasses.map(function (interactionClass) {
              return new interactionClass(settings);
          });
          this.interactionsStore[component.uid] = interactions;
          interactionSettingsStore[component.uid] = settings;
      };
      Calendar.prototype.unregisterInteractiveComponent = function (component) {
          for (var _i = 0, _a = this.interactionsStore[component.uid]; _i < _a.length; _i++) {
              var listener = _a[_i];
              listener.destroy();
          }
          delete this.interactionsStore[component.uid];
          delete interactionSettingsStore[component.uid];
      };
      // Date Selection / Event Selection / DayClick
      // -----------------------------------------------------------------------------------------------------------------
      // this public method receives start/end dates in any format, with any timezone
      // NOTE: args were changed from v3
      Calendar.prototype.select = function (dateOrObj, endDate) {
          var selectionInput;
          if (endDate == null) {
              if (dateOrObj.start != null) {
                  selectionInput = dateOrObj;
              }
              else {
                  selectionInput = {
                      start: dateOrObj,
                      end: null
                  };
              }
          }
          else {
              selectionInput = {
                  start: dateOrObj,
                  end: endDate
              };
          }
          var selection = parseDateSpan(selectionInput, this.dateEnv, createDuration({ days: 1 }) // TODO: cache this?
          );
          if (selection) { // throw parse error otherwise?
              this.dispatch({ type: 'SELECT_DATES', selection: selection });
              this.triggerDateSelect(selection);
          }
      };
      // public method
      Calendar.prototype.unselect = function (pev) {
          if (this.state.dateSelection) {
              this.dispatch({ type: 'UNSELECT_DATES' });
              this.triggerDateUnselect(pev);
          }
      };
      Calendar.prototype.triggerDateSelect = function (selection, pev) {
          var arg = __assign({}, this.buildDateSpanApi(selection), { jsEvent: pev ? pev.origEvent : null, view: this.view });
          this.publiclyTrigger('select', [arg]);
      };
      Calendar.prototype.triggerDateUnselect = function (pev) {
          this.publiclyTrigger('unselect', [
              {
                  jsEvent: pev ? pev.origEvent : null,
                  view: this.view
              }
          ]);
      };
      // TODO: receive pev?
      Calendar.prototype.triggerDateClick = function (dateSpan, dayEl, view, ev) {
          var arg = __assign({}, this.buildDatePointApi(dateSpan), { dayEl: dayEl, jsEvent: ev, // Is this always a mouse event? See #4655
              view: view });
          this.publiclyTrigger('dateClick', [arg]);
      };
      Calendar.prototype.buildDatePointApi = function (dateSpan) {
          var props = {};
          for (var _i = 0, _a = this.pluginSystem.hooks.datePointTransforms; _i < _a.length; _i++) {
              var transform = _a[_i];
              __assign(props, transform(dateSpan, this));
          }
          __assign(props, buildDatePointApi(dateSpan, this.dateEnv));
          return props;
      };
      Calendar.prototype.buildDateSpanApi = function (dateSpan) {
          var props = {};
          for (var _i = 0, _a = this.pluginSystem.hooks.dateSpanTransforms; _i < _a.length; _i++) {
              var transform = _a[_i];
              __assign(props, transform(dateSpan, this));
          }
          __assign(props, buildDateSpanApi(dateSpan, this.dateEnv));
          return props;
      };
      // Date Utils
      // -----------------------------------------------------------------------------------------------------------------
      // Returns a DateMarker for the current date, as defined by the client's computer or from the `now` option
      Calendar.prototype.getNow = function () {
          var now = this.opt('now');
          if (typeof now === 'function') {
              now = now();
          }
          if (now == null) {
              return this.dateEnv.createNowMarker();
          }
          return this.dateEnv.createMarker(now);
      };
      // Event-Date Utilities
      // -----------------------------------------------------------------------------------------------------------------
      // Given an event's allDay status and start date, return what its fallback end date should be.
      // TODO: rename to computeDefaultEventEnd
      Calendar.prototype.getDefaultEventEnd = function (allDay, marker) {
          var end = marker;
          if (allDay) {
              end = startOfDay(end);
              end = this.dateEnv.add(end, this.defaultAllDayEventDuration);
          }
          else {
              end = this.dateEnv.add(end, this.defaultTimedEventDuration);
          }
          return end;
      };
      // Public Events API
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.addEvent = function (eventInput, sourceInput) {
          if (eventInput instanceof EventApi) {
              var def = eventInput._def;
              var instance = eventInput._instance;
              // not already present? don't want to add an old snapshot
              if (!this.state.eventStore.defs[def.defId]) {
                  this.dispatch({
                      type: 'ADD_EVENTS',
                      eventStore: eventTupleToStore({ def: def, instance: instance }) // TODO: better util for two args?
                  });
              }
              return eventInput;
          }
          var sourceId;
          if (sourceInput instanceof EventSourceApi) {
              sourceId = sourceInput.internalEventSource.sourceId;
          }
          else if (sourceInput != null) {
              var sourceApi = this.getEventSourceById(sourceInput); // TODO: use an internal function
              if (!sourceApi) {
                  console.warn('Could not find an event source with ID "' + sourceInput + '"'); // TODO: test
                  return null;
              }
              else {
                  sourceId = sourceApi.internalEventSource.sourceId;
              }
          }
          var tuple = parseEvent(eventInput, sourceId, this);
          if (tuple) {
              this.dispatch({
                  type: 'ADD_EVENTS',
                  eventStore: eventTupleToStore(tuple)
              });
              return new EventApi(this, tuple.def, tuple.def.recurringDef ? null : tuple.instance);
          }
          return null;
      };
      // TODO: optimize
      Calendar.prototype.getEventById = function (id) {
          var _a = this.state.eventStore, defs = _a.defs, instances = _a.instances;
          id = String(id);
          for (var defId in defs) {
              var def = defs[defId];
              if (def.publicId === id) {
                  if (def.recurringDef) {
                      return new EventApi(this, def, null);
                  }
                  else {
                      for (var instanceId in instances) {
                          var instance = instances[instanceId];
                          if (instance.defId === def.defId) {
                              return new EventApi(this, def, instance);
                          }
                      }
                  }
              }
          }
          return null;
      };
      Calendar.prototype.getEvents = function () {
          var _a = this.state.eventStore, defs = _a.defs, instances = _a.instances;
          var eventApis = [];
          for (var id in instances) {
              var instance = instances[id];
              var def = defs[instance.defId];
              eventApis.push(new EventApi(this, def, instance));
          }
          return eventApis;
      };
      Calendar.prototype.removeAllEvents = function () {
          this.dispatch({ type: 'REMOVE_ALL_EVENTS' });
      };
      Calendar.prototype.rerenderEvents = function () {
          this.dispatch({ type: 'RESET_EVENTS' });
      };
      // Public Event Sources API
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.getEventSources = function () {
          var sourceHash = this.state.eventSources;
          var sourceApis = [];
          for (var internalId in sourceHash) {
              sourceApis.push(new EventSourceApi(this, sourceHash[internalId]));
          }
          return sourceApis;
      };
      Calendar.prototype.getEventSourceById = function (id) {
          var sourceHash = this.state.eventSources;
          id = String(id);
          for (var sourceId in sourceHash) {
              if (sourceHash[sourceId].publicId === id) {
                  return new EventSourceApi(this, sourceHash[sourceId]);
              }
          }
          return null;
      };
      Calendar.prototype.addEventSource = function (sourceInput) {
          if (sourceInput instanceof EventSourceApi) {
              // not already present? don't want to add an old snapshot
              if (!this.state.eventSources[sourceInput.internalEventSource.sourceId]) {
                  this.dispatch({
                      type: 'ADD_EVENT_SOURCES',
                      sources: [sourceInput.internalEventSource]
                  });
              }
              return sourceInput;
          }
          var eventSource = parseEventSource(sourceInput, this);
          if (eventSource) { // TODO: error otherwise?
              this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [eventSource] });
              return new EventSourceApi(this, eventSource);
          }
          return null;
      };
      Calendar.prototype.removeAllEventSources = function () {
          this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' });
      };
      Calendar.prototype.refetchEvents = function () {
          this.dispatch({ type: 'FETCH_EVENT_SOURCES' });
      };
      // Scroll
      // -----------------------------------------------------------------------------------------------------------------
      Calendar.prototype.scrollToTime = function (timeInput) {
          var duration = createDuration(timeInput);
          if (duration) {
              this.component.view.scrollToDuration(duration);
          }
      };
      return Calendar;
  }());
  EmitterMixin.mixInto(Calendar);
  // for memoizers
  // -----------------------------------------------------------------------------------------------------------------
  function buildComponentContext$1(theme, dateEnv, options) {
      return new ComponentContext(this, theme, dateEnv, options, null);
  }
  function buildDateEnv(locale, timeZone, namedTimeZoneImpl, firstDay, weekNumberCalculation, weekLabel, cmdFormatter) {
      return new DateEnv({
          calendarSystem: 'gregory',
          timeZone: timeZone,
          namedTimeZoneImpl: namedTimeZoneImpl,
          locale: locale,
          weekNumberCalculation: weekNumberCalculation,
          firstDay: firstDay,
          weekLabel: weekLabel,
          cmdFormatter: cmdFormatter
      });
  }
  function buildTheme(calendarOptions) {
      var themeClass = this.pluginSystem.hooks.themeClasses[calendarOptions.themeSystem] || StandardTheme;
      return new themeClass(calendarOptions);
  }
  function buildDelayedRerender(wait) {
      var func = this.tryRerender.bind(this);
      if (wait != null) {
          func = debounce(func, wait);
      }
      return func;
  }
  function buildEventUiBySource(eventSources) {
      return mapHash(eventSources, function (eventSource) {
          return eventSource.ui;
      });
  }
  function buildEventUiBases(eventDefs, eventUiSingleBase, eventUiBySource) {
      var eventUiBases = { '': eventUiSingleBase };
      for (var defId in eventDefs) {
          var def = eventDefs[defId];
          if (def.sourceId && eventUiBySource[def.sourceId]) {
              eventUiBases[defId] = eventUiBySource[def.sourceId];
          }
      }
      return eventUiBases;
  }

  var View$1 = /** @class */ (function (_super) {
      __extends(View, _super);
      function View(viewSpec, parentEl) {
          var _this = _super.call(this, createElement('div', { className: 'fc-view fc-' + viewSpec.type + '-view' })) || this;
          _this.renderDatesMem = memoizeRendering(_this.renderDatesWrap, _this.unrenderDatesWrap);
          _this.renderBusinessHoursMem = memoizeRendering(_this.renderBusinessHours, _this.unrenderBusinessHours, [_this.renderDatesMem]);
          _this.renderDateSelectionMem = memoizeRendering(_this.renderDateSelectionWrap, _this.unrenderDateSelectionWrap, [_this.renderDatesMem]);
          _this.renderEventsMem = memoizeRendering(_this.renderEvents, _this.unrenderEvents, [_this.renderDatesMem]);
          _this.renderEventSelectionMem = memoizeRendering(_this.renderEventSelectionWrap, _this.unrenderEventSelectionWrap, [_this.renderEventsMem]);
          _this.renderEventDragMem = memoizeRendering(_this.renderEventDragWrap, _this.unrenderEventDragWrap, [_this.renderDatesMem]);
          _this.renderEventResizeMem = memoizeRendering(_this.renderEventResizeWrap, _this.unrenderEventResizeWrap, [_this.renderDatesMem]);
          _this.viewSpec = viewSpec;
          _this.type = viewSpec.type;
          parentEl.appendChild(_this.el);
          _this.initialize();
          return _this;
      }
      View.prototype.initialize = function () {
      };
      Object.defineProperty(View.prototype, "activeStart", {
          // Date Setting/Unsetting
          // -----------------------------------------------------------------------------------------------------------------
          get: function () {
              return this.context.dateEnv.toDate(this.props.dateProfile.activeRange.start);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(View.prototype, "activeEnd", {
          get: function () {
              return this.context.dateEnv.toDate(this.props.dateProfile.activeRange.end);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(View.prototype, "currentStart", {
          get: function () {
              return this.context.dateEnv.toDate(this.props.dateProfile.currentRange.start);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(View.prototype, "currentEnd", {
          get: function () {
              return this.context.dateEnv.toDate(this.props.dateProfile.currentRange.end);
          },
          enumerable: true,
          configurable: true
      });
      // General Rendering
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.render = function (props, context) {
          this.renderDatesMem(props.dateProfile);
          this.renderBusinessHoursMem(props.businessHours);
          this.renderDateSelectionMem(props.dateSelection);
          this.renderEventsMem(props.eventStore);
          this.renderEventSelectionMem(props.eventSelection);
          this.renderEventDragMem(props.eventDrag);
          this.renderEventResizeMem(props.eventResize);
      };
      View.prototype.beforeUpdate = function () {
          this.addScroll(this.queryScroll());
      };
      View.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.renderDatesMem.unrender(); // should unrender everything else
      };
      // Sizing
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.updateSize = function (isResize, viewHeight, isAuto) {
          var calendar = this.context.calendar;
          if (isResize) {
              this.addScroll(this.queryScroll()); // NOTE: same code as in beforeUpdate
          }
          if (isResize || // HACKS...
              calendar.isViewUpdated ||
              calendar.isDatesUpdated ||
              calendar.isEventsUpdated) {
              // sort of the catch-all sizing
              // anything that might cause dimension changes
              this.updateBaseSize(isResize, viewHeight, isAuto);
          }
          // NOTE: popScroll is called by CalendarComponent
      };
      View.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
      };
      // Date Rendering
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderDatesWrap = function (dateProfile) {
          this.renderDates(dateProfile);
          this.addScroll({
              duration: createDuration(this.context.options.scrollTime)
          });
      };
      View.prototype.unrenderDatesWrap = function () {
          this.stopNowIndicator();
          this.unrenderDates();
      };
      View.prototype.renderDates = function (dateProfile) { };
      View.prototype.unrenderDates = function () { };
      // Business Hours
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderBusinessHours = function (businessHours) { };
      View.prototype.unrenderBusinessHours = function () { };
      // Date Selection
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderDateSelectionWrap = function (selection) {
          if (selection) {
              this.renderDateSelection(selection);
          }
      };
      View.prototype.unrenderDateSelectionWrap = function (selection) {
          if (selection) {
              this.unrenderDateSelection(selection);
          }
      };
      View.prototype.renderDateSelection = function (selection) { };
      View.prototype.unrenderDateSelection = function (selection) { };
      // Event Rendering
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderEvents = function (eventStore) { };
      View.prototype.unrenderEvents = function () { };
      // util for subclasses
      View.prototype.sliceEvents = function (eventStore, allDay) {
          var props = this.props;
          return sliceEventStore(eventStore, props.eventUiBases, props.dateProfile.activeRange, allDay ? this.context.nextDayThreshold : null).fg;
      };
      // Event Selection
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderEventSelectionWrap = function (instanceId) {
          if (instanceId) {
              this.renderEventSelection(instanceId);
          }
      };
      View.prototype.unrenderEventSelectionWrap = function (instanceId) {
          if (instanceId) {
              this.unrenderEventSelection(instanceId);
          }
      };
      View.prototype.renderEventSelection = function (instanceId) { };
      View.prototype.unrenderEventSelection = function (instanceId) { };
      // Event Drag
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderEventDragWrap = function (state) {
          if (state) {
              this.renderEventDrag(state);
          }
      };
      View.prototype.unrenderEventDragWrap = function (state) {
          if (state) {
              this.unrenderEventDrag(state);
          }
      };
      View.prototype.renderEventDrag = function (state) { };
      View.prototype.unrenderEventDrag = function (state) { };
      // Event Resize
      // -----------------------------------------------------------------------------------------------------------------
      View.prototype.renderEventResizeWrap = function (state) {
          if (state) {
              this.renderEventResize(state);
          }
      };
      View.prototype.unrenderEventResizeWrap = function (state) {
          if (state) {
              this.unrenderEventResize(state);
          }
      };
      View.prototype.renderEventResize = function (state) { };
      View.prototype.unrenderEventResize = function (state) { };
      /* Now Indicator
      ------------------------------------------------------------------------------------------------------------------*/
      // Immediately render the current time indicator and begins re-rendering it at an interval,
      // which is defined by this.getNowIndicatorUnit().
      // TODO: somehow do this for the current whole day's background too
      // USAGE: must be called manually from subclasses' render methods! don't need to call stopNowIndicator tho
      View.prototype.startNowIndicator = function (dateProfile, dateProfileGenerator) {
          var _this = this;
          var _a = this.context, calendar = _a.calendar, dateEnv = _a.dateEnv, options = _a.options;
          var unit;
          var update;
          var delay; // ms wait value
          if (options.nowIndicator && !this.initialNowDate) {
              unit = this.getNowIndicatorUnit(dateProfile, dateProfileGenerator);
              if (unit) {
                  update = this.updateNowIndicator.bind(this);
                  this.initialNowDate = calendar.getNow();
                  this.initialNowQueriedMs = new Date().valueOf();
                  // wait until the beginning of the next interval
                  delay = dateEnv.add(dateEnv.startOf(this.initialNowDate, unit), createDuration(1, unit)).valueOf() - this.initialNowDate.valueOf();
                  // TODO: maybe always use setTimeout, waiting until start of next unit
                  this.nowIndicatorTimeoutID = setTimeout(function () {
                      _this.nowIndicatorTimeoutID = null;
                      update();
                      if (unit === 'second') {
                          delay = 1000; // every second
                      }
                      else {
                          delay = 1000 * 60; // otherwise, every minute
                      }
                      _this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
                  }, delay);
              }
              // rendering will be initiated in updateSize
          }
      };
      // rerenders the now indicator, computing the new current time from the amount of time that has passed
      // since the initial getNow call.
      View.prototype.updateNowIndicator = function () {
          if (this.props.dateProfile && // a way to determine if dates were rendered yet
              this.initialNowDate // activated before?
          ) {
              this.unrenderNowIndicator(); // won't unrender if unnecessary
              this.renderNowIndicator(addMs(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs));
              this.isNowIndicatorRendered = true;
          }
      };
      // Immediately unrenders the view's current time indicator and stops any re-rendering timers.
      // Won't cause side effects if indicator isn't rendered.
      View.prototype.stopNowIndicator = function () {
          if (this.nowIndicatorTimeoutID) {
              clearTimeout(this.nowIndicatorTimeoutID);
              this.nowIndicatorTimeoutID = null;
          }
          if (this.nowIndicatorIntervalID) {
              clearInterval(this.nowIndicatorIntervalID);
              this.nowIndicatorIntervalID = null;
          }
          if (this.isNowIndicatorRendered) {
              this.unrenderNowIndicator();
              this.isNowIndicatorRendered = false;
          }
      };
      View.prototype.getNowIndicatorUnit = function (dateProfile, dateProfileGenerator) {
          // subclasses should implement
      };
      // Renders a current time indicator at the given datetime
      View.prototype.renderNowIndicator = function (date) {
          // SUBCLASSES MUST PASS TO CHILDREN!
      };
      // Undoes the rendering actions from renderNowIndicator
      View.prototype.unrenderNowIndicator = function () {
          // SUBCLASSES MUST PASS TO CHILDREN!
      };
      /* Scroller
      ------------------------------------------------------------------------------------------------------------------*/
      View.prototype.addScroll = function (scroll, isForced) {
          if (isForced) {
              scroll.isForced = isForced;
          }
          __assign(this.queuedScroll || (this.queuedScroll = {}), scroll);
      };
      View.prototype.popScroll = function (isResize) {
          this.applyQueuedScroll(isResize);
          this.queuedScroll = null;
      };
      View.prototype.applyQueuedScroll = function (isResize) {
          if (this.queuedScroll) {
              this.applyScroll(this.queuedScroll, isResize);
          }
      };
      View.prototype.queryScroll = function () {
          var scroll = {};
          if (this.props.dateProfile) { // dates rendered yet?
              __assign(scroll, this.queryDateScroll());
          }
          return scroll;
      };
      View.prototype.applyScroll = function (scroll, isResize) {
          var duration = scroll.duration, isForced = scroll.isForced;
          if (duration != null && !isForced) {
              delete scroll.duration;
              if (this.props.dateProfile) { // dates rendered yet?
                  __assign(scroll, this.computeDateScroll(duration));
              }
          }
          if (this.props.dateProfile) { // dates rendered yet?
              this.applyDateScroll(scroll);
          }
      };
      View.prototype.computeDateScroll = function (duration) {
          return {}; // subclasses must implement
      };
      View.prototype.queryDateScroll = function () {
          return {}; // subclasses must implement
      };
      View.prototype.applyDateScroll = function (scroll) {
          // subclasses must implement
      };
      // for API
      View.prototype.scrollToDuration = function (duration) {
          this.applyScroll({ duration: duration }, false);
      };
      return View;
  }(DateComponent));
  EmitterMixin.mixInto(View$1);
  View$1.prototype.usesMinMaxTime = false;
  View$1.prototype.dateProfileGeneratorClass = DateProfileGenerator;

  var FgEventRenderer = /** @class */ (function () {
      function FgEventRenderer() {
          this.segs = [];
          this.isSizeDirty = false;
      }
      FgEventRenderer.prototype.renderSegs = function (context, segs, mirrorInfo) {
          this.context = context;
          this.rangeUpdated(); // called too frequently :(
          // render an `.el` on each seg
          // returns a subset of the segs. segs that were actually rendered
          segs = this.renderSegEls(segs, mirrorInfo);
          this.segs = segs;
          this.attachSegs(segs, mirrorInfo);
          this.isSizeDirty = true;
          triggerRenderedSegs(this.context, this.segs, Boolean(mirrorInfo));
      };
      FgEventRenderer.prototype.unrender = function (context, _segs, mirrorInfo) {
          triggerWillRemoveSegs(this.context, this.segs, Boolean(mirrorInfo));
          this.detachSegs(this.segs);
          this.segs = [];
      };
      // Updates values that rely on options and also relate to range
      FgEventRenderer.prototype.rangeUpdated = function () {
          var options = this.context.options;
          var displayEventTime;
          var displayEventEnd;
          this.eventTimeFormat = createFormatter(options.eventTimeFormat || this.computeEventTimeFormat(), options.defaultRangeSeparator);
          displayEventTime = options.displayEventTime;
          if (displayEventTime == null) {
              displayEventTime = this.computeDisplayEventTime(); // might be based off of range
          }
          displayEventEnd = options.displayEventEnd;
          if (displayEventEnd == null) {
              displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
          }
          this.displayEventTime = displayEventTime;
          this.displayEventEnd = displayEventEnd;
      };
      // Renders and assigns an `el` property for each foreground event segment.
      // Only returns segments that successfully rendered.
      FgEventRenderer.prototype.renderSegEls = function (segs, mirrorInfo) {
          var html = '';
          var i;
          if (segs.length) { // don't build an empty html string
              // build a large concatenation of event segment HTML
              for (i = 0; i < segs.length; i++) {
                  html += this.renderSegHtml(segs[i], mirrorInfo);
              }
              // Grab individual elements from the combined HTML string. Use each as the default rendering.
              // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
              htmlToElements(html).forEach(function (el, i) {
                  var seg = segs[i];
                  if (el) {
                      seg.el = el;
                  }
              });
              segs = filterSegsViaEls(this.context, segs, Boolean(mirrorInfo));
          }
          return segs;
      };
      // Generic utility for generating the HTML classNames for an event segment's element
      FgEventRenderer.prototype.getSegClasses = function (seg, isDraggable, isResizable, mirrorInfo) {
          var classes = [
              'fc-event',
              seg.isStart ? 'fc-start' : 'fc-not-start',
              seg.isEnd ? 'fc-end' : 'fc-not-end'
          ].concat(seg.eventRange.ui.classNames);
          if (isDraggable) {
              classes.push('fc-draggable');
          }
          if (isResizable) {
              classes.push('fc-resizable');
          }
          if (mirrorInfo) {
              classes.push('fc-mirror');
              if (mirrorInfo.isDragging) {
                  classes.push('fc-dragging');
              }
              if (mirrorInfo.isResizing) {
                  classes.push('fc-resizing');
              }
          }
          return classes;
      };
      // Compute the text that should be displayed on an event's element.
      // `range` can be the Event object itself, or something range-like, with at least a `start`.
      // If event times are disabled, or the event has no time, will return a blank string.
      // If not specified, formatter will default to the eventTimeFormat setting,
      // and displayEnd will default to the displayEventEnd setting.
      FgEventRenderer.prototype.getTimeText = function (eventRange, formatter, displayEnd) {
          var def = eventRange.def, instance = eventRange.instance;
          return this._getTimeText(instance.range.start, def.hasEnd ? instance.range.end : null, def.allDay, formatter, displayEnd, instance.forcedStartTzo, instance.forcedEndTzo);
      };
      FgEventRenderer.prototype._getTimeText = function (start, end, allDay, formatter, displayEnd, forcedStartTzo, forcedEndTzo) {
          var dateEnv = this.context.dateEnv;
          if (formatter == null) {
              formatter = this.eventTimeFormat;
          }
          if (displayEnd == null) {
              displayEnd = this.displayEventEnd;
          }
          if (this.displayEventTime && !allDay) {
              if (displayEnd && end) {
                  return dateEnv.formatRange(start, end, formatter, {
                      forcedStartTzo: forcedStartTzo,
                      forcedEndTzo: forcedEndTzo
                  });
              }
              else {
                  return dateEnv.format(start, formatter, {
                      forcedTzo: forcedStartTzo
                  });
              }
          }
          return '';
      };
      FgEventRenderer.prototype.computeEventTimeFormat = function () {
          return {
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: true
          };
      };
      FgEventRenderer.prototype.computeDisplayEventTime = function () {
          return true;
      };
      FgEventRenderer.prototype.computeDisplayEventEnd = function () {
          return true;
      };
      // Utility for generating event skin-related CSS properties
      FgEventRenderer.prototype.getSkinCss = function (ui) {
          return {
              'background-color': ui.backgroundColor,
              'border-color': ui.borderColor,
              color: ui.textColor
          };
      };
      FgEventRenderer.prototype.sortEventSegs = function (segs) {
          var specs = this.context.eventOrderSpecs;
          var objs = segs.map(buildSegCompareObj);
          objs.sort(function (obj0, obj1) {
              return compareByFieldSpecs(obj0, obj1, specs);
          });
          return objs.map(function (c) {
              return c._seg;
          });
      };
      FgEventRenderer.prototype.computeSizes = function (force) {
          if (force || this.isSizeDirty) {
              this.computeSegSizes(this.segs);
          }
      };
      FgEventRenderer.prototype.assignSizes = function (force) {
          if (force || this.isSizeDirty) {
              this.assignSegSizes(this.segs);
              this.isSizeDirty = false;
          }
      };
      FgEventRenderer.prototype.computeSegSizes = function (segs) {
      };
      FgEventRenderer.prototype.assignSegSizes = function (segs) {
      };
      // Manipulation on rendered segs
      FgEventRenderer.prototype.hideByHash = function (hash) {
          if (hash) {
              for (var _i = 0, _a = this.segs; _i < _a.length; _i++) {
                  var seg = _a[_i];
                  if (hash[seg.eventRange.instance.instanceId]) {
                      seg.el.style.visibility = 'hidden';
                  }
              }
          }
      };
      FgEventRenderer.prototype.showByHash = function (hash) {
          if (hash) {
              for (var _i = 0, _a = this.segs; _i < _a.length; _i++) {
                  var seg = _a[_i];
                  if (hash[seg.eventRange.instance.instanceId]) {
                      seg.el.style.visibility = '';
                  }
              }
          }
      };
      FgEventRenderer.prototype.selectByInstanceId = function (instanceId) {
          if (instanceId) {
              for (var _i = 0, _a = this.segs; _i < _a.length; _i++) {
                  var seg = _a[_i];
                  var eventInstance = seg.eventRange.instance;
                  if (eventInstance && eventInstance.instanceId === instanceId &&
                      seg.el // necessary?
                  ) {
                      seg.el.classList.add('fc-selected');
                  }
              }
          }
      };
      FgEventRenderer.prototype.unselectByInstanceId = function (instanceId) {
          if (instanceId) {
              for (var _i = 0, _a = this.segs; _i < _a.length; _i++) {
                  var seg = _a[_i];
                  if (seg.el) { // necessary?
                      seg.el.classList.remove('fc-selected');
                  }
              }
          }
      };
      return FgEventRenderer;
  }());
  // returns a object with all primitive props that can be compared
  function buildSegCompareObj(seg) {
      var eventDef = seg.eventRange.def;
      var range = seg.eventRange.instance.range;
      var start = range.start ? range.start.valueOf() : 0; // TODO: better support for open-range events
      var end = range.end ? range.end.valueOf() : 0; // "
      return __assign({}, eventDef.extendedProps, eventDef, { id: eventDef.publicId, start: start,
          end: end, duration: end - start, allDay: Number(eventDef.allDay), _seg: seg // for later retrieval
       });
  }

  /*
  TODO: when refactoring this class, make a new FillRenderer instance for each `type`
  */
  var FillRenderer = /** @class */ (function () {
      function FillRenderer() {
          this.fillSegTag = 'div';
          this.dirtySizeFlags = {};
          this.containerElsByType = {};
          this.segsByType = {};
      }
      FillRenderer.prototype.getSegsByType = function (type) {
          return this.segsByType[type] || [];
      };
      FillRenderer.prototype.renderSegs = function (type, context, segs) {
          var _a;
          this.context = context;
          var renderedSegs = this.renderSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs
          var containerEls = this.attachSegs(type, renderedSegs);
          if (containerEls) {
              (_a = (this.containerElsByType[type] || (this.containerElsByType[type] = []))).push.apply(_a, containerEls);
          }
          this.segsByType[type] = renderedSegs;
          if (type === 'bgEvent') {
              triggerRenderedSegs(context, renderedSegs, false); // isMirror=false
          }
          this.dirtySizeFlags[type] = true;
      };
      // Unrenders a specific type of fill that is currently rendered on the grid
      FillRenderer.prototype.unrender = function (type, context) {
          var segs = this.segsByType[type];
          if (segs) {
              if (type === 'bgEvent') {
                  triggerWillRemoveSegs(context, segs, false); // isMirror=false
              }
              this.detachSegs(type, segs);
          }
      };
      // Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
      // Only returns segments that successfully rendered.
      FillRenderer.prototype.renderSegEls = function (type, segs) {
          var _this = this;
          var html = '';
          var i;
          if (segs.length) {
              // build a large concatenation of segment HTML
              for (i = 0; i < segs.length; i++) {
                  html += this.renderSegHtml(type, segs[i]);
              }
              // Grab individual elements from the combined HTML string. Use each as the default rendering.
              // Then, compute the 'el' for each segment.
              htmlToElements(html).forEach(function (el, i) {
                  var seg = segs[i];
                  if (el) {
                      seg.el = el;
                  }
              });
              if (type === 'bgEvent') {
                  segs = filterSegsViaEls(this.context, segs, false // isMirror. background events can never be mirror elements
                  );
              }
              // correct element type? (would be bad if a non-TD were inserted into a table for example)
              segs = segs.filter(function (seg) {
                  return elementMatches(seg.el, _this.fillSegTag);
              });
          }
          return segs;
      };
      // Builds the HTML needed for one fill segment. Generic enough to work with different types.
      FillRenderer.prototype.renderSegHtml = function (type, seg) {
          var css = null;
          var classNames = [];
          if (type !== 'highlight' && type !== 'businessHours') {
              css = {
                  'background-color': seg.eventRange.ui.backgroundColor
              };
          }
          if (type !== 'highlight') {
              classNames = classNames.concat(seg.eventRange.ui.classNames);
          }
          if (type === 'businessHours') {
              classNames.push('fc-bgevent');
          }
          else {
              classNames.push('fc-' + type.toLowerCase());
          }
          return '<' + this.fillSegTag +
              (classNames.length ? ' class="' + classNames.join(' ') + '"' : '') +
              (css ? ' style="' + cssToStr(css) + '"' : '') +
              '></' + this.fillSegTag + '>';
      };
      FillRenderer.prototype.detachSegs = function (type, segs) {
          var containerEls = this.containerElsByType[type];
          if (containerEls) {
              containerEls.forEach(removeElement);
              delete this.containerElsByType[type];
          }
      };
      FillRenderer.prototype.computeSizes = function (force) {
          for (var type in this.segsByType) {
              if (force || this.dirtySizeFlags[type]) {
                  this.computeSegSizes(this.segsByType[type]);
              }
          }
      };
      FillRenderer.prototype.assignSizes = function (force) {
          for (var type in this.segsByType) {
              if (force || this.dirtySizeFlags[type]) {
                  this.assignSegSizes(this.segsByType[type]);
              }
          }
          this.dirtySizeFlags = {};
      };
      FillRenderer.prototype.computeSegSizes = function (segs) {
      };
      FillRenderer.prototype.assignSegSizes = function (segs) {
      };
      return FillRenderer;
  }());

  // Computes a default column header formatting string if `colFormat` is not explicitly defined
  function computeFallbackHeaderFormat(datesRepDistinctDays, dayCnt) {
      // if more than one week row, or if there are a lot of columns with not much space,
      // put just the day numbers will be in each cell
      if (!datesRepDistinctDays || dayCnt > 10) {
          return { weekday: 'short' }; // "Sat"
      }
      else if (dayCnt > 1) {
          return { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }; // "Sat 11/12"
      }
      else {
          return { weekday: 'long' }; // "Saturday"
      }
  }
  function renderDateCell(dateMarker, dateProfile, datesRepDistinctDays, colCnt, colHeadFormat, context, colspan, otherAttrs) {
      var dateEnv = context.dateEnv, theme = context.theme, options = context.options;
      var isDateValid = rangeContainsMarker(dateProfile.activeRange, dateMarker); // TODO: called too frequently. cache somehow.
      var classNames = [
          'fc-day-header',
          theme.getClass('widgetHeader')
      ];
      var innerHtml;
      if (typeof options.columnHeaderHtml === 'function') {
          innerHtml = options.columnHeaderHtml(dateEnv.toDate(dateMarker));
      }
      else if (typeof options.columnHeaderText === 'function') {
          innerHtml = htmlEscape(options.columnHeaderText(dateEnv.toDate(dateMarker)));
      }
      else {
          innerHtml = htmlEscape(dateEnv.format(dateMarker, colHeadFormat));
      }
      // if only one row of days, the classNames on the header can represent the specific days beneath
      if (datesRepDistinctDays) {
          classNames = classNames.concat(
          // includes the day-of-week class
          // noThemeHighlight=true (don't highlight the header)
          getDayClasses(dateMarker, dateProfile, context, true));
      }
      else {
          classNames.push('fc-' + DAY_IDS[dateMarker.getUTCDay()]); // only add the day-of-week class
      }
      return '' +
          '<th class="' + classNames.join(' ') + '"' +
          ((isDateValid && datesRepDistinctDays) ?
              ' data-date="' + dateEnv.formatIso(dateMarker, { omitTime: true }) + '"' :
              '') +
          (colspan > 1 ?
              ' colspan="' + colspan + '"' :
              '') +
          (otherAttrs ?
              ' ' + otherAttrs :
              '') +
          '>' +
          (isDateValid ?
              // don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
              buildGotoAnchorHtml(options, dateEnv, { date: dateMarker, forceOff: !datesRepDistinctDays || colCnt === 1 }, innerHtml) :
              // if not valid, display text, but no link
              innerHtml) +
          '</th>';
  }

  var DayHeader = /** @class */ (function (_super) {
      __extends(DayHeader, _super);
      function DayHeader(parentEl) {
          var _this = _super.call(this) || this;
          _this.renderSkeleton = memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
          _this.parentEl = parentEl;
          return _this;
      }
      DayHeader.prototype.render = function (props, context) {
          var dates = props.dates, datesRepDistinctDays = props.datesRepDistinctDays;
          var parts = [];
          this.renderSkeleton(context);
          if (props.renderIntroHtml) {
              parts.push(props.renderIntroHtml());
          }
          var colHeadFormat = createFormatter(context.options.columnHeaderFormat ||
              computeFallbackHeaderFormat(datesRepDistinctDays, dates.length));
          for (var _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
              var date = dates_1[_i];
              parts.push(renderDateCell(date, props.dateProfile, datesRepDistinctDays, dates.length, colHeadFormat, context));
          }
          if (context.isRtl) {
              parts.reverse();
          }
          this.thead.innerHTML = '<tr>' + parts.join('') + '</tr>';
      };
      DayHeader.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.renderSkeleton.unrender();
      };
      DayHeader.prototype._renderSkeleton = function (context) {
          var theme = context.theme;
          var parentEl = this.parentEl;
          parentEl.innerHTML = ''; // because might be nbsp
          parentEl.appendChild(this.el = htmlToElement('<div class="fc-row ' + theme.getClass('headerRow') + '">' +
              '<table class="' + theme.getClass('tableGrid') + '">' +
              '<thead></thead>' +
              '</table>' +
              '</div>'));
          this.thead = this.el.querySelector('thead');
      };
      DayHeader.prototype._unrenderSkeleton = function () {
          removeElement(this.el);
      };
      return DayHeader;
  }(Component));

  var DaySeries = /** @class */ (function () {
      function DaySeries(range, dateProfileGenerator) {
          var date = range.start;
          var end = range.end;
          var indices = [];
          var dates = [];
          var dayIndex = -1;
          while (date < end) { // loop each day from start to end
              if (dateProfileGenerator.isHiddenDay(date)) {
                  indices.push(dayIndex + 0.5); // mark that it's between indices
              }
              else {
                  dayIndex++;
                  indices.push(dayIndex);
                  dates.push(date);
              }
              date = addDays(date, 1);
          }
          this.dates = dates;
          this.indices = indices;
          this.cnt = dates.length;
      }
      DaySeries.prototype.sliceRange = function (range) {
          var firstIndex = this.getDateDayIndex(range.start); // inclusive first index
          var lastIndex = this.getDateDayIndex(addDays(range.end, -1)); // inclusive last index
          var clippedFirstIndex = Math.max(0, firstIndex);
          var clippedLastIndex = Math.min(this.cnt - 1, lastIndex);
          // deal with in-between indices
          clippedFirstIndex = Math.ceil(clippedFirstIndex); // in-between starts round to next cell
          clippedLastIndex = Math.floor(clippedLastIndex); // in-between ends round to prev cell
          if (clippedFirstIndex <= clippedLastIndex) {
              return {
                  firstIndex: clippedFirstIndex,
                  lastIndex: clippedLastIndex,
                  isStart: firstIndex === clippedFirstIndex,
                  isEnd: lastIndex === clippedLastIndex
              };
          }
          else {
              return null;
          }
      };
      // Given a date, returns its chronolocial cell-index from the first cell of the grid.
      // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
      // If before the first offset, returns a negative number.
      // If after the last offset, returns an offset past the last cell offset.
      // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
      DaySeries.prototype.getDateDayIndex = function (date) {
          var indices = this.indices;
          var dayOffset = Math.floor(diffDays(this.dates[0], date));
          if (dayOffset < 0) {
              return indices[0] - 1;
          }
          else if (dayOffset >= indices.length) {
              return indices[indices.length - 1] + 1;
          }
          else {
              return indices[dayOffset];
          }
      };
      return DaySeries;
  }());

  var DayTable = /** @class */ (function () {
      function DayTable(daySeries, breakOnWeeks) {
          var dates = daySeries.dates;
          var daysPerRow;
          var firstDay;
          var rowCnt;
          if (breakOnWeeks) {
              // count columns until the day-of-week repeats
              firstDay = dates[0].getUTCDay();
              for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow++) {
                  if (dates[daysPerRow].getUTCDay() === firstDay) {
                      break;
                  }
              }
              rowCnt = Math.ceil(dates.length / daysPerRow);
          }
          else {
              rowCnt = 1;
              daysPerRow = dates.length;
          }
          this.rowCnt = rowCnt;
          this.colCnt = daysPerRow;
          this.daySeries = daySeries;
          this.cells = this.buildCells();
          this.headerDates = this.buildHeaderDates();
      }
      DayTable.prototype.buildCells = function () {
          var rows = [];
          for (var row = 0; row < this.rowCnt; row++) {
              var cells = [];
              for (var col = 0; col < this.colCnt; col++) {
                  cells.push(this.buildCell(row, col));
              }
              rows.push(cells);
          }
          return rows;
      };
      DayTable.prototype.buildCell = function (row, col) {
          return {
              date: this.daySeries.dates[row * this.colCnt + col]
          };
      };
      DayTable.prototype.buildHeaderDates = function () {
          var dates = [];
          for (var col = 0; col < this.colCnt; col++) {
              dates.push(this.cells[0][col].date);
          }
          return dates;
      };
      DayTable.prototype.sliceRange = function (range) {
          var colCnt = this.colCnt;
          var seriesSeg = this.daySeries.sliceRange(range);
          var segs = [];
          if (seriesSeg) {
              var firstIndex = seriesSeg.firstIndex, lastIndex = seriesSeg.lastIndex;
              var index = firstIndex;
              while (index <= lastIndex) {
                  var row = Math.floor(index / colCnt);
                  var nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1);
                  segs.push({
                      row: row,
                      firstCol: index % colCnt,
                      lastCol: (nextIndex - 1) % colCnt,
                      isStart: seriesSeg.isStart && index === firstIndex,
                      isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex
                  });
                  index = nextIndex;
              }
          }
          return segs;
      };
      return DayTable;
  }());

  var Slicer = /** @class */ (function () {
      function Slicer() {
          this.sliceBusinessHours = memoize(this._sliceBusinessHours);
          this.sliceDateSelection = memoize(this._sliceDateSpan);
          this.sliceEventStore = memoize(this._sliceEventStore);
          this.sliceEventDrag = memoize(this._sliceInteraction);
          this.sliceEventResize = memoize(this._sliceInteraction);
      }
      Slicer.prototype.sliceProps = function (props, dateProfile, nextDayThreshold, calendar, component) {
          var extraArgs = [];
          for (var _i = 5; _i < arguments.length; _i++) {
              extraArgs[_i - 5] = arguments[_i];
          }
          var eventUiBases = props.eventUiBases;
          var eventSegs = this.sliceEventStore.apply(this, [props.eventStore, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs));
          return {
              dateSelectionSegs: this.sliceDateSelection.apply(this, [props.dateSelection, eventUiBases, component].concat(extraArgs)),
              businessHourSegs: this.sliceBusinessHours.apply(this, [props.businessHours, dateProfile, nextDayThreshold, calendar, component].concat(extraArgs)),
              fgEventSegs: eventSegs.fg,
              bgEventSegs: eventSegs.bg,
              eventDrag: this.sliceEventDrag.apply(this, [props.eventDrag, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs)),
              eventResize: this.sliceEventResize.apply(this, [props.eventResize, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs)),
              eventSelection: props.eventSelection
          }; // TODO: give interactionSegs?
      };
      Slicer.prototype.sliceNowDate = function (// does not memoize
      date, component) {
          var extraArgs = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              extraArgs[_i - 2] = arguments[_i];
          }
          return this._sliceDateSpan.apply(this, [{ range: { start: date, end: addMs(date, 1) }, allDay: false },
              {},
              component].concat(extraArgs));
      };
      Slicer.prototype._sliceBusinessHours = function (businessHours, dateProfile, nextDayThreshold, calendar, component) {
          var extraArgs = [];
          for (var _i = 5; _i < arguments.length; _i++) {
              extraArgs[_i - 5] = arguments[_i];
          }
          if (!businessHours) {
              return [];
          }
          return this._sliceEventStore.apply(this, [expandRecurring(businessHours, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), calendar),
              {},
              dateProfile,
              nextDayThreshold,
              component].concat(extraArgs)).bg;
      };
      Slicer.prototype._sliceEventStore = function (eventStore, eventUiBases, dateProfile, nextDayThreshold, component) {
          var extraArgs = [];
          for (var _i = 5; _i < arguments.length; _i++) {
              extraArgs[_i - 5] = arguments[_i];
          }
          if (eventStore) {
              var rangeRes = sliceEventStore(eventStore, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
              return {
                  bg: this.sliceEventRanges(rangeRes.bg, component, extraArgs),
                  fg: this.sliceEventRanges(rangeRes.fg, component, extraArgs)
              };
          }
          else {
              return { bg: [], fg: [] };
          }
      };
      Slicer.prototype._sliceInteraction = function (interaction, eventUiBases, dateProfile, nextDayThreshold, component) {
          var extraArgs = [];
          for (var _i = 5; _i < arguments.length; _i++) {
              extraArgs[_i - 5] = arguments[_i];
          }
          if (!interaction) {
              return null;
          }
          var rangeRes = sliceEventStore(interaction.mutatedEvents, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
          return {
              segs: this.sliceEventRanges(rangeRes.fg, component, extraArgs),
              affectedInstances: interaction.affectedEvents.instances,
              isEvent: interaction.isEvent,
              sourceSeg: interaction.origSeg
          };
      };
      Slicer.prototype._sliceDateSpan = function (dateSpan, eventUiBases, component) {
          var extraArgs = [];
          for (var _i = 3; _i < arguments.length; _i++) {
              extraArgs[_i - 3] = arguments[_i];
          }
          if (!dateSpan) {
              return [];
          }
          var eventRange = fabricateEventRange(dateSpan, eventUiBases, component.context.calendar);
          var segs = this.sliceRange.apply(this, [dateSpan.range].concat(extraArgs));
          for (var _a = 0, segs_1 = segs; _a < segs_1.length; _a++) {
              var seg = segs_1[_a];
              seg.component = component;
              seg.eventRange = eventRange;
          }
          return segs;
      };
      /*
      "complete" seg means it has component and eventRange
      */
      Slicer.prototype.sliceEventRanges = function (eventRanges, component, // TODO: kill
      extraArgs) {
          var segs = [];
          for (var _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
              var eventRange = eventRanges_1[_i];
              segs.push.apply(segs, this.sliceEventRange(eventRange, component, extraArgs));
          }
          return segs;
      };
      /*
      "complete" seg means it has component and eventRange
      */
      Slicer.prototype.sliceEventRange = function (eventRange, component, // TODO: kill
      extraArgs) {
          var segs = this.sliceRange.apply(this, [eventRange.range].concat(extraArgs));
          for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
              var seg = segs_2[_i];
              seg.component = component;
              seg.eventRange = eventRange;
              seg.isStart = eventRange.isStart && seg.isStart;
              seg.isEnd = eventRange.isEnd && seg.isEnd;
          }
          return segs;
      };
      return Slicer;
  }());
  /*
  for incorporating minTime/maxTime if appropriate
  TODO: should be part of DateProfile!
  TimelineDateProfile already does this btw
  */
  function computeActiveRange(dateProfile, isComponentAllDay) {
      var range = dateProfile.activeRange;
      if (isComponentAllDay) {
          return range;
      }
      return {
          start: addMs(range.start, dateProfile.minTime.milliseconds),
          end: addMs(range.end, dateProfile.maxTime.milliseconds - 864e5) // 864e5 = ms in a day
      };
  }

  var es$1 = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, function () {
      var es = {
          code: "es",
          week: {
              dow: 1,
              doy: 4 // The week that contains Jan 4th is the first week of the year.
          },
          buttonText: {
              prev: "Ant",
              next: "Sig",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Agenda"
          },
          weekLabel: "Sm",
          allDayHtml: "Todo<br/>el día",
          eventLimitText: "más",
          noEventsMessage: "No hay eventos para mostrar"
      };

      return es;

  }));
  });

  /*!
  FullCalendar Day Grid Plugin v4.4.0
  Docs & License: https://fullcalendar.io/
  (c) 2019 Adam Shaw
  */

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics$1 = function(d, b) {
      extendStatics$1 = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics$1(d, b);
  };

  function __extends$1(d, b) {
      extendStatics$1(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign$1 = function() {
      __assign$1 = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign$1.apply(this, arguments);
  };

  var DayGridDateProfileGenerator = /** @class */ (function (_super) {
      __extends$1(DayGridDateProfileGenerator, _super);
      function DayGridDateProfileGenerator() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      // Computes the date range that will be rendered.
      DayGridDateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
          var dateEnv = this.dateEnv;
          var renderRange = _super.prototype.buildRenderRange.call(this, currentRange, currentRangeUnit, isRangeAllDay);
          var start = renderRange.start;
          var end = renderRange.end;
          var endOfWeek;
          // year and month views should be aligned with weeks. this is already done for week
          if (/^(year|month)$/.test(currentRangeUnit)) {
              start = dateEnv.startOfWeek(start);
              // make end-of-week if not already
              endOfWeek = dateEnv.startOfWeek(end);
              if (endOfWeek.valueOf() !== end.valueOf()) {
                  end = addWeeks(endOfWeek, 1);
              }
          }
          // ensure 6 weeks
          if (this.options.monthMode &&
              this.options.fixedWeekCount) {
              var rowCnt = Math.ceil(// could be partial weeks due to hiddenDays
              diffWeeks(start, end));
              end = addWeeks(end, 6 - rowCnt);
          }
          return { start: start, end: end };
      };
      return DayGridDateProfileGenerator;
  }(DateProfileGenerator));

  /* A rectangular panel that is absolutely positioned over other content
  ------------------------------------------------------------------------------------------------------------------------
  Options:
    - className (string)
    - content (HTML string, element, or element array)
    - parentEl
    - top
    - left
    - right (the x coord of where the right edge should be. not a "CSS" right)
    - autoHide (boolean)
    - show (callback)
    - hide (callback)
  */
  var Popover = /** @class */ (function () {
      function Popover(options) {
          var _this = this;
          this.isHidden = true;
          this.margin = 10; // the space required between the popover and the edges of the scroll container
          // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
          this.documentMousedown = function (ev) {
              // only hide the popover if the click happened outside the popover
              if (_this.el && !_this.el.contains(ev.target)) {
                  _this.hide();
              }
          };
          this.options = options;
      }
      // Shows the popover on the specified position. Renders it if not already
      Popover.prototype.show = function () {
          if (this.isHidden) {
              if (!this.el) {
                  this.render();
              }
              this.el.style.display = '';
              this.position();
              this.isHidden = false;
              this.trigger('show');
          }
      };
      // Hides the popover, through CSS, but does not remove it from the DOM
      Popover.prototype.hide = function () {
          if (!this.isHidden) {
              this.el.style.display = 'none';
              this.isHidden = true;
              this.trigger('hide');
          }
      };
      // Creates `this.el` and renders content inside of it
      Popover.prototype.render = function () {
          var _this = this;
          var options = this.options;
          var el = this.el = createElement('div', {
              className: 'fc-popover ' + (options.className || ''),
              style: {
                  top: '0',
                  left: '0'
              }
          });
          if (typeof options.content === 'function') {
              options.content(el);
          }
          options.parentEl.appendChild(el);
          // when a click happens on anything inside with a 'fc-close' className, hide the popover
          listenBySelector(el, 'click', '.fc-close', function (ev) {
              _this.hide();
          });
          if (options.autoHide) {
              document.addEventListener('mousedown', this.documentMousedown);
          }
      };
      // Hides and unregisters any handlers
      Popover.prototype.destroy = function () {
          this.hide();
          if (this.el) {
              removeElement(this.el);
              this.el = null;
          }
          document.removeEventListener('mousedown', this.documentMousedown);
      };
      // Positions the popover optimally, using the top/left/right options
      Popover.prototype.position = function () {
          var options = this.options;
          var el = this.el;
          var elDims = el.getBoundingClientRect(); // only used for width,height
          var origin = computeRect(el.offsetParent);
          var clippingRect = computeClippingRect(options.parentEl);
          var top; // the "position" (not "offset") values for the popover
          var left; //
          // compute top and left
          top = options.top || 0;
          if (options.left !== undefined) {
              left = options.left;
          }
          else if (options.right !== undefined) {
              left = options.right - elDims.width; // derive the left value from the right value
          }
          else {
              left = 0;
          }
          // constrain to the view port. if constrained by two edges, give precedence to top/left
          top = Math.min(top, clippingRect.bottom - elDims.height - this.margin);
          top = Math.max(top, clippingRect.top + this.margin);
          left = Math.min(left, clippingRect.right - elDims.width - this.margin);
          left = Math.max(left, clippingRect.left + this.margin);
          applyStyle(el, {
              top: top - origin.top,
              left: left - origin.left
          });
      };
      // Triggers a callback. Calls a function in the option hash of the same name.
      // Arguments beyond the first `name` are forwarded on.
      // TODO: better code reuse for this. Repeat code
      // can kill this???
      Popover.prototype.trigger = function (name) {
          if (this.options[name]) {
              this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
          }
      };
      return Popover;
  }());

  /* Event-rendering methods for the DayGrid class
  ----------------------------------------------------------------------------------------------------------------------*/
  // "Simple" is bad a name. has nothing to do with SimpleDayGrid
  var SimpleDayGridEventRenderer = /** @class */ (function (_super) {
      __extends$1(SimpleDayGridEventRenderer, _super);
      function SimpleDayGridEventRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      // Builds the HTML to be used for the default element for an individual segment
      SimpleDayGridEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
          var context = this.context;
          var eventRange = seg.eventRange;
          var eventDef = eventRange.def;
          var eventUi = eventRange.ui;
          var allDay = eventDef.allDay;
          var isDraggable = computeEventDraggable(context, eventDef, eventUi);
          var isResizableFromStart = allDay && seg.isStart && computeEventStartResizable(context, eventDef, eventUi);
          var isResizableFromEnd = allDay && seg.isEnd && computeEventEndResizable(context, eventDef, eventUi);
          var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
          var skinCss = cssToStr(this.getSkinCss(eventUi));
          var timeHtml = '';
          var timeText;
          var titleHtml;
          classes.unshift('fc-day-grid-event', 'fc-h-event');
          // Only display a timed events time if it is the starting segment
          if (seg.isStart) {
              timeText = this.getTimeText(eventRange);
              if (timeText) {
                  timeHtml = '<span class="fc-time">' + htmlEscape(timeText) + '</span>';
              }
          }
          titleHtml =
              '<span class="fc-title">' +
                  (htmlEscape(eventDef.title || '') || '&nbsp;') + // we always want one line of height
                  '</span>';
          return '<a class="' + classes.join(' ') + '"' +
              (eventDef.url ?
                  ' href="' + htmlEscape(eventDef.url) + '"' :
                  '') +
              (skinCss ?
                  ' style="' + skinCss + '"' :
                  '') +
              '>' +
              '<div class="fc-content">' +
              (context.options.dir === 'rtl' ?
                  titleHtml + ' ' + timeHtml : // put a natural space in between
                  timeHtml + ' ' + titleHtml //
              ) +
              '</div>' +
              (isResizableFromStart ?
                  '<div class="fc-resizer fc-start-resizer"></div>' :
                  '') +
              (isResizableFromEnd ?
                  '<div class="fc-resizer fc-end-resizer"></div>' :
                  '') +
              '</a>';
      };
      // Computes a default event time formatting string if `eventTimeFormat` is not explicitly defined
      SimpleDayGridEventRenderer.prototype.computeEventTimeFormat = function () {
          return {
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: true,
              meridiem: 'narrow'
          };
      };
      SimpleDayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
          return false; // TODO: somehow consider the originating DayGrid's column count
      };
      return SimpleDayGridEventRenderer;
  }(FgEventRenderer));

  /* Event-rendering methods for the DayGrid class
  ----------------------------------------------------------------------------------------------------------------------*/
  var DayGridEventRenderer = /** @class */ (function (_super) {
      __extends$1(DayGridEventRenderer, _super);
      function DayGridEventRenderer(dayGrid) {
          var _this = _super.call(this) || this;
          _this.dayGrid = dayGrid;
          return _this;
      }
      // Renders the given foreground event segments onto the grid
      DayGridEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
          var rowStructs = this.rowStructs = this.renderSegRows(segs);
          // append to each row's content skeleton
          this.dayGrid.rowEls.forEach(function (rowNode, i) {
              rowNode.querySelector('.fc-content-skeleton > table').appendChild(rowStructs[i].tbodyEl);
          });
          // removes the "more.." events popover
          if (!mirrorInfo) {
              this.dayGrid.removeSegPopover();
          }
      };
      // Unrenders all currently rendered foreground event segments
      DayGridEventRenderer.prototype.detachSegs = function () {
          var rowStructs = this.rowStructs || [];
          var rowStruct;
          while ((rowStruct = rowStructs.pop())) {
              removeElement(rowStruct.tbodyEl);
          }
          this.rowStructs = null;
      };
      // Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
      // Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
      // PRECONDITION: each segment shoud already have a rendered and assigned `.el`
      DayGridEventRenderer.prototype.renderSegRows = function (segs) {
          var rowStructs = [];
          var segRows;
          var row;
          segRows = this.groupSegRows(segs); // group into nested arrays
          // iterate each row of segment groupings
          for (row = 0; row < segRows.length; row++) {
              rowStructs.push(this.renderSegRow(row, segRows[row]));
          }
          return rowStructs;
      };
      // Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
      // the segments. Returns object with a bunch of internal data about how the render was calculated.
      // NOTE: modifies rowSegs
      DayGridEventRenderer.prototype.renderSegRow = function (row, rowSegs) {
          var isRtl = this.context.isRtl;
          var dayGrid = this.dayGrid;
          var colCnt = dayGrid.colCnt;
          var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
          var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
          var tbody = document.createElement('tbody');
          var segMatrix = []; // lookup for which segments are rendered into which level+col cells
          var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
          var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
          var i;
          var levelSegs;
          var col;
          var tr;
          var j;
          var seg;
          var td;
          // populates empty cells from the current column (`col`) to `endCol`
          function emptyCellsUntil(endCol) {
              while (col < endCol) {
                  // try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
                  td = (loneCellMatrix[i - 1] || [])[col];
                  if (td) {
                      td.rowSpan = (td.rowSpan || 1) + 1;
                  }
                  else {
                      td = document.createElement('td');
                      tr.appendChild(td);
                  }
                  cellMatrix[i][col] = td;
                  loneCellMatrix[i][col] = td;
                  col++;
              }
          }
          for (i = 0; i < levelCnt; i++) { // iterate through all levels
              levelSegs = segLevels[i];
              col = 0;
              tr = document.createElement('tr');
              segMatrix.push([]);
              cellMatrix.push([]);
              loneCellMatrix.push([]);
              // levelCnt might be 1 even though there are no actual levels. protect against this.
              // this single empty row is useful for styling.
              if (levelSegs) {
                  for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
                      seg = levelSegs[j];
                      var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                      var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                      emptyCellsUntil(leftCol);
                      // create a container that occupies or more columns. append the event element.
                      td = createElement('td', { className: 'fc-event-container' }, seg.el);
                      if (leftCol !== rightCol) {
                          td.colSpan = rightCol - leftCol + 1;
                      }
                      else { // a single-column segment
                          loneCellMatrix[i][col] = td;
                      }
                      while (col <= rightCol) {
                          cellMatrix[i][col] = td;
                          segMatrix[i][col] = seg;
                          col++;
                      }
                      tr.appendChild(td);
                  }
              }
              emptyCellsUntil(colCnt); // finish off the row
              var introHtml = dayGrid.renderProps.renderIntroHtml();
              if (introHtml) {
                  if (isRtl) {
                      appendToElement(tr, introHtml);
                  }
                  else {
                      prependToElement(tr, introHtml);
                  }
              }
              tbody.appendChild(tr);
          }
          return {
              row: row,
              tbodyEl: tbody,
              cellMatrix: cellMatrix,
              segMatrix: segMatrix,
              segLevels: segLevels,
              segs: rowSegs
          };
      };
      // Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
      // NOTE: modifies segs
      DayGridEventRenderer.prototype.buildSegLevels = function (segs) {
          var isRtl = this.context.isRtl;
          var colCnt = this.dayGrid.colCnt;
          var levels = [];
          var i;
          var seg;
          var j;
          // Give preference to elements with certain criteria, so they have
          // a chance to be closer to the top.
          segs = this.sortEventSegs(segs);
          for (i = 0; i < segs.length; i++) {
              seg = segs[i];
              // loop through levels, starting with the topmost, until the segment doesn't collide with other segments
              for (j = 0; j < levels.length; j++) {
                  if (!isDaySegCollision(seg, levels[j])) {
                      break;
                  }
              }
              // `j` now holds the desired subrow index
              seg.level = j;
              seg.leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol; // for sorting only
              seg.rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol // for sorting only
              ;
              (levels[j] || (levels[j] = [])).push(seg);
          }
          // order segments left-to-right. very important if calendar is RTL
          for (j = 0; j < levels.length; j++) {
              levels[j].sort(compareDaySegCols);
          }
          return levels;
      };
      // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
      DayGridEventRenderer.prototype.groupSegRows = function (segs) {
          var segRows = [];
          var i;
          for (i = 0; i < this.dayGrid.rowCnt; i++) {
              segRows.push([]);
          }
          for (i = 0; i < segs.length; i++) {
              segRows[segs[i].row].push(segs[i]);
          }
          return segRows;
      };
      // Computes a default `displayEventEnd` value if one is not expliclty defined
      DayGridEventRenderer.prototype.computeDisplayEventEnd = function () {
          return this.dayGrid.colCnt === 1; // we'll likely have space if there's only one day
      };
      return DayGridEventRenderer;
  }(SimpleDayGridEventRenderer));
  // Computes whether two segments' columns collide. They are assumed to be in the same row.
  function isDaySegCollision(seg, otherSegs) {
      var i;
      var otherSeg;
      for (i = 0; i < otherSegs.length; i++) {
          otherSeg = otherSegs[i];
          if (otherSeg.firstCol <= seg.lastCol &&
              otherSeg.lastCol >= seg.firstCol) {
              return true;
          }
      }
      return false;
  }
  // A cmp function for determining the leftmost event
  function compareDaySegCols(a, b) {
      return a.leftCol - b.leftCol;
  }

  var DayGridMirrorRenderer = /** @class */ (function (_super) {
      __extends$1(DayGridMirrorRenderer, _super);
      function DayGridMirrorRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      DayGridMirrorRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
          var sourceSeg = mirrorInfo.sourceSeg;
          var rowStructs = this.rowStructs = this.renderSegRows(segs);
          // inject each new event skeleton into each associated row
          this.dayGrid.rowEls.forEach(function (rowNode, row) {
              var skeletonEl = htmlToElement('<div class="fc-mirror-skeleton"><table></table></div>'); // will be absolutely positioned
              var skeletonTopEl;
              var skeletonTop;
              // If there is an original segment, match the top position. Otherwise, put it at the row's top level
              if (sourceSeg && sourceSeg.row === row) {
                  skeletonTopEl = sourceSeg.el;
              }
              else {
                  skeletonTopEl = rowNode.querySelector('.fc-content-skeleton tbody');
                  if (!skeletonTopEl) { // when no events
                      skeletonTopEl = rowNode.querySelector('.fc-content-skeleton table');
                  }
              }
              skeletonTop = skeletonTopEl.getBoundingClientRect().top -
                  rowNode.getBoundingClientRect().top; // the offsetParent origin
              skeletonEl.style.top = skeletonTop + 'px';
              skeletonEl.querySelector('table').appendChild(rowStructs[row].tbodyEl);
              rowNode.appendChild(skeletonEl);
          });
      };
      return DayGridMirrorRenderer;
  }(DayGridEventRenderer));

  var EMPTY_CELL_HTML = '<td style="pointer-events:none"></td>';
  var DayGridFillRenderer = /** @class */ (function (_super) {
      __extends$1(DayGridFillRenderer, _super);
      function DayGridFillRenderer(dayGrid) {
          var _this = _super.call(this) || this;
          _this.fillSegTag = 'td'; // override the default tag name
          _this.dayGrid = dayGrid;
          return _this;
      }
      DayGridFillRenderer.prototype.renderSegs = function (type, context, segs) {
          // don't render timed background events
          if (type === 'bgEvent') {
              segs = segs.filter(function (seg) {
                  return seg.eventRange.def.allDay;
              });
          }
          _super.prototype.renderSegs.call(this, type, context, segs);
      };
      DayGridFillRenderer.prototype.attachSegs = function (type, segs) {
          var els = [];
          var i;
          var seg;
          var skeletonEl;
          for (i = 0; i < segs.length; i++) {
              seg = segs[i];
              skeletonEl = this.renderFillRow(type, seg);
              this.dayGrid.rowEls[seg.row].appendChild(skeletonEl);
              els.push(skeletonEl);
          }
          return els;
      };
      // Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
      DayGridFillRenderer.prototype.renderFillRow = function (type, seg) {
          var dayGrid = this.dayGrid;
          var isRtl = this.context.isRtl;
          var colCnt = dayGrid.colCnt;
          var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
          var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
          var startCol = leftCol;
          var endCol = rightCol + 1;
          var className;
          var skeletonEl;
          var trEl;
          if (type === 'businessHours') {
              className = 'bgevent';
          }
          else {
              className = type.toLowerCase();
          }
          skeletonEl = htmlToElement('<div class="fc-' + className + '-skeleton">' +
              '<table><tr></tr></table>' +
              '</div>');
          trEl = skeletonEl.getElementsByTagName('tr')[0];
          if (startCol > 0) {
              appendToElement(trEl, 
              // will create (startCol + 1) td's
              new Array(startCol + 1).join(EMPTY_CELL_HTML));
          }
          seg.el.colSpan = endCol - startCol;
          trEl.appendChild(seg.el);
          if (endCol < colCnt) {
              appendToElement(trEl, 
              // will create (colCnt - endCol) td's
              new Array(colCnt - endCol + 1).join(EMPTY_CELL_HTML));
          }
          var introHtml = dayGrid.renderProps.renderIntroHtml();
          if (introHtml) {
              if (isRtl) {
                  appendToElement(trEl, introHtml);
              }
              else {
                  prependToElement(trEl, introHtml);
              }
          }
          return skeletonEl;
      };
      return DayGridFillRenderer;
  }(FillRenderer));

  var DayTile = /** @class */ (function (_super) {
      __extends$1(DayTile, _super);
      function DayTile(el) {
          var _this = _super.call(this, el) || this;
          var eventRenderer = _this.eventRenderer = new DayTileEventRenderer(_this);
          var renderFrame = _this.renderFrame = memoizeRendering(_this._renderFrame);
          _this.renderFgEvents = memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderFrame]);
          _this.renderEventSelection = memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
          _this.renderEventDrag = memoizeRendering(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
          _this.renderEventResize = memoizeRendering(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
          return _this;
      }
      DayTile.prototype.firstContext = function (context) {
          context.calendar.registerInteractiveComponent(this, {
              el: this.el,
              useEventCenter: false
          });
      };
      DayTile.prototype.render = function (props, context) {
          this.renderFrame(props.date);
          this.renderFgEvents(context, props.fgSegs);
          this.renderEventSelection(props.eventSelection);
          this.renderEventDrag(props.eventDragInstances);
          this.renderEventResize(props.eventResizeInstances);
      };
      DayTile.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.renderFrame.unrender(); // should unrender everything else
          this.context.calendar.unregisterInteractiveComponent(this);
      };
      DayTile.prototype._renderFrame = function (date) {
          var _a = this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
          var title = dateEnv.format(date, createFormatter(options.dayPopoverFormat) // TODO: cache
          );
          this.el.innerHTML =
              '<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
                  '<span class="fc-title">' +
                  htmlEscape(title) +
                  '</span>' +
                  '<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
                  '</div>' +
                  '<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
                  '<div class="fc-event-container"></div>' +
                  '</div>';
          this.segContainerEl = this.el.querySelector('.fc-event-container');
      };
      DayTile.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
          var date = this.props.date; // HACK
          if (positionLeft < elWidth && positionTop < elHeight) {
              return {
                  component: this,
                  dateSpan: {
                      allDay: true,
                      range: { start: date, end: addDays(date, 1) }
                  },
                  dayEl: this.el,
                  rect: {
                      left: 0,
                      top: 0,
                      right: elWidth,
                      bottom: elHeight
                  },
                  layer: 1
              };
          }
      };
      return DayTile;
  }(DateComponent));
  var DayTileEventRenderer = /** @class */ (function (_super) {
      __extends$1(DayTileEventRenderer, _super);
      function DayTileEventRenderer(dayTile) {
          var _this = _super.call(this) || this;
          _this.dayTile = dayTile;
          return _this;
      }
      DayTileEventRenderer.prototype.attachSegs = function (segs) {
          for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
              var seg = segs_1[_i];
              this.dayTile.segContainerEl.appendChild(seg.el);
          }
      };
      DayTileEventRenderer.prototype.detachSegs = function (segs) {
          for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
              var seg = segs_2[_i];
              removeElement(seg.el);
          }
      };
      return DayTileEventRenderer;
  }(SimpleDayGridEventRenderer));

  var DayBgRow = /** @class */ (function () {
      function DayBgRow(context) {
          this.context = context;
      }
      DayBgRow.prototype.renderHtml = function (props) {
          var parts = [];
          if (props.renderIntroHtml) {
              parts.push(props.renderIntroHtml());
          }
          for (var _i = 0, _a = props.cells; _i < _a.length; _i++) {
              var cell = _a[_i];
              parts.push(renderCellHtml(cell.date, props.dateProfile, this.context, cell.htmlAttrs));
          }
          if (!props.cells.length) {
              parts.push('<td class="fc-day ' + this.context.theme.getClass('widgetContent') + '"></td>');
          }
          if (this.context.options.dir === 'rtl') {
              parts.reverse();
          }
          return '<tr>' + parts.join('') + '</tr>';
      };
      return DayBgRow;
  }());
  function renderCellHtml(date, dateProfile, context, otherAttrs) {
      var dateEnv = context.dateEnv, theme = context.theme;
      var isDateValid = rangeContainsMarker(dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
      var classes = getDayClasses(date, dateProfile, context);
      classes.unshift('fc-day', theme.getClass('widgetContent'));
      return '<td class="' + classes.join(' ') + '"' +
          (isDateValid ?
              ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
              '') +
          (otherAttrs ?
              ' ' + otherAttrs :
              '') +
          '></td>';
  }

  var DAY_NUM_FORMAT = createFormatter({ day: 'numeric' });
  var WEEK_NUM_FORMAT = createFormatter({ week: 'numeric' });
  var DayGrid = /** @class */ (function (_super) {
      __extends$1(DayGrid, _super);
      function DayGrid(el, renderProps) {
          var _this = _super.call(this, el) || this;
          _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
          _this.isCellSizesDirty = false;
          _this.renderProps = renderProps;
          var eventRenderer = _this.eventRenderer = new DayGridEventRenderer(_this);
          var fillRenderer = _this.fillRenderer = new DayGridFillRenderer(_this);
          _this.mirrorRenderer = new DayGridMirrorRenderer(_this);
          var renderCells = _this.renderCells = memoizeRendering(_this._renderCells, _this._unrenderCells);
          _this.renderBusinessHours = memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'), [renderCells]);
          _this.renderDateSelection = memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'highlight'), fillRenderer.unrender.bind(fillRenderer, 'highlight'), [renderCells]);
          _this.renderBgEvents = memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'), [renderCells]);
          _this.renderFgEvents = memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderCells]);
          _this.renderEventSelection = memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
          _this.renderEventDrag = memoizeRendering(_this._renderEventDrag, _this._unrenderEventDrag, [renderCells]);
          _this.renderEventResize = memoizeRendering(_this._renderEventResize, _this._unrenderEventResize, [renderCells]);
          return _this;
      }
      DayGrid.prototype.render = function (props, context) {
          var cells = props.cells;
          this.rowCnt = cells.length;
          this.colCnt = cells[0].length;
          this.renderCells(cells, props.isRigid);
          this.renderBusinessHours(context, props.businessHourSegs);
          this.renderDateSelection(context, props.dateSelectionSegs);
          this.renderBgEvents(context, props.bgEventSegs);
          this.renderFgEvents(context, props.fgEventSegs);
          this.renderEventSelection(props.eventSelection);
          this.renderEventDrag(props.eventDrag);
          this.renderEventResize(props.eventResize);
          if (this.segPopoverTile) {
              this.updateSegPopoverTile();
          }
      };
      DayGrid.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.renderCells.unrender(); // will unrender everything else
      };
      DayGrid.prototype.getCellRange = function (row, col) {
          var start = this.props.cells[row][col].date;
          var end = addDays(start, 1);
          return { start: start, end: end };
      };
      DayGrid.prototype.updateSegPopoverTile = function (date, segs) {
          var ownProps = this.props;
          this.segPopoverTile.receiveProps({
              date: date || this.segPopoverTile.props.date,
              fgSegs: segs || this.segPopoverTile.props.fgSegs,
              eventSelection: ownProps.eventSelection,
              eventDragInstances: ownProps.eventDrag ? ownProps.eventDrag.affectedInstances : null,
              eventResizeInstances: ownProps.eventResize ? ownProps.eventResize.affectedInstances : null
          }, this.context);
      };
      /* Date Rendering
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype._renderCells = function (cells, isRigid) {
          var _a = this.context, calendar = _a.calendar, view = _a.view, isRtl = _a.isRtl, dateEnv = _a.dateEnv;
          var _b = this, rowCnt = _b.rowCnt, colCnt = _b.colCnt;
          var html = '';
          var row;
          var col;
          for (row = 0; row < rowCnt; row++) {
              html += this.renderDayRowHtml(row, isRigid);
          }
          this.el.innerHTML = html;
          this.rowEls = findElements(this.el, '.fc-row');
          this.cellEls = findElements(this.el, '.fc-day, .fc-disabled-day');
          if (isRtl) {
              this.cellEls.reverse();
          }
          this.rowPositions = new PositionCache(this.el, this.rowEls, false, true // vertical
          );
          this.colPositions = new PositionCache(this.el, this.cellEls.slice(0, colCnt), // only the first row
          true, false // horizontal
          );
          // trigger dayRender with each cell's element
          for (row = 0; row < rowCnt; row++) {
              for (col = 0; col < colCnt; col++) {
                  calendar.publiclyTrigger('dayRender', [
                      {
                          date: dateEnv.toDate(cells[row][col].date),
                          el: this.getCellEl(row, col),
                          view: view
                      }
                  ]);
              }
          }
          this.isCellSizesDirty = true;
      };
      DayGrid.prototype._unrenderCells = function () {
          this.removeSegPopover();
      };
      // Generates the HTML for a single row, which is a div that wraps a table.
      // `row` is the row number.
      DayGrid.prototype.renderDayRowHtml = function (row, isRigid) {
          var theme = this.context.theme;
          var classes = ['fc-row', 'fc-week', theme.getClass('dayRow')];
          if (isRigid) {
              classes.push('fc-rigid');
          }
          var bgRow = new DayBgRow(this.context);
          return '' +
              '<div class="' + classes.join(' ') + '">' +
              '<div class="fc-bg">' +
              '<table class="' + theme.getClass('tableGrid') + '">' +
              bgRow.renderHtml({
                  cells: this.props.cells[row],
                  dateProfile: this.props.dateProfile,
                  renderIntroHtml: this.renderProps.renderBgIntroHtml
              }) +
              '</table>' +
              '</div>' +
              '<div class="fc-content-skeleton">' +
              '<table>' +
              (this.getIsNumbersVisible() ?
                  '<thead>' +
                      this.renderNumberTrHtml(row) +
                      '</thead>' :
                  '') +
              '</table>' +
              '</div>' +
              '</div>';
      };
      DayGrid.prototype.getIsNumbersVisible = function () {
          return this.getIsDayNumbersVisible() ||
              this.renderProps.cellWeekNumbersVisible ||
              this.renderProps.colWeekNumbersVisible;
      };
      DayGrid.prototype.getIsDayNumbersVisible = function () {
          return this.rowCnt > 1;
      };
      /* Grid Number Rendering
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype.renderNumberTrHtml = function (row) {
          var isRtl = this.context.isRtl;
          var intro = this.renderProps.renderNumberIntroHtml(row, this);
          return '' +
              '<tr>' +
              (isRtl ? '' : intro) +
              this.renderNumberCellsHtml(row) +
              (isRtl ? intro : '') +
              '</tr>';
      };
      DayGrid.prototype.renderNumberCellsHtml = function (row) {
          var htmls = [];
          var col;
          var date;
          for (col = 0; col < this.colCnt; col++) {
              date = this.props.cells[row][col].date;
              htmls.push(this.renderNumberCellHtml(date));
          }
          if (this.context.isRtl) {
              htmls.reverse();
          }
          return htmls.join('');
      };
      // Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
      // The number row will only exist if either day numbers or week numbers are turned on.
      DayGrid.prototype.renderNumberCellHtml = function (date) {
          var _a = this.context, dateEnv = _a.dateEnv, options = _a.options;
          var html = '';
          var isDateValid = rangeContainsMarker(this.props.dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
          var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
          var classes;
          var weekCalcFirstDow;
          if (!isDayNumberVisible && !this.renderProps.cellWeekNumbersVisible) {
              // no numbers in day cell (week number must be along the side)
              return '<td></td>'; //  will create an empty space above events :(
          }
          classes = getDayClasses(date, this.props.dateProfile, this.context);
          classes.unshift('fc-day-top');
          if (this.renderProps.cellWeekNumbersVisible) {
              weekCalcFirstDow = dateEnv.weekDow;
          }
          html += '<td class="' + classes.join(' ') + '"' +
              (isDateValid ?
                  ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
                  '') +
              '>';
          if (this.renderProps.cellWeekNumbersVisible && (date.getUTCDay() === weekCalcFirstDow)) {
              html += buildGotoAnchorHtml(options, dateEnv, { date: date, type: 'week' }, { 'class': 'fc-week-number' }, dateEnv.format(date, WEEK_NUM_FORMAT) // inner HTML
              );
          }
          if (isDayNumberVisible) {
              html += buildGotoAnchorHtml(options, dateEnv, date, { 'class': 'fc-day-number' }, dateEnv.format(date, DAY_NUM_FORMAT) // inner HTML
              );
          }
          html += '</td>';
          return html;
      };
      /* Sizing
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype.updateSize = function (isResize) {
          var calendar = this.context.calendar;
          var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
          if (isResize ||
              this.isCellSizesDirty ||
              calendar.isEventsUpdated // hack
          ) {
              this.buildPositionCaches();
              this.isCellSizesDirty = false;
          }
          fillRenderer.computeSizes(isResize);
          eventRenderer.computeSizes(isResize);
          mirrorRenderer.computeSizes(isResize);
          fillRenderer.assignSizes(isResize);
          eventRenderer.assignSizes(isResize);
          mirrorRenderer.assignSizes(isResize);
      };
      DayGrid.prototype.buildPositionCaches = function () {
          this.buildColPositions();
          this.buildRowPositions();
      };
      DayGrid.prototype.buildColPositions = function () {
          this.colPositions.build();
      };
      DayGrid.prototype.buildRowPositions = function () {
          this.rowPositions.build();
          this.rowPositions.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
      };
      /* Hit System
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype.positionToHit = function (leftPosition, topPosition) {
          var _a = this, colPositions = _a.colPositions, rowPositions = _a.rowPositions;
          var col = colPositions.leftToIndex(leftPosition);
          var row = rowPositions.topToIndex(topPosition);
          if (row != null && col != null) {
              return {
                  row: row,
                  col: col,
                  dateSpan: {
                      range: this.getCellRange(row, col),
                      allDay: true
                  },
                  dayEl: this.getCellEl(row, col),
                  relativeRect: {
                      left: colPositions.lefts[col],
                      right: colPositions.rights[col],
                      top: rowPositions.tops[row],
                      bottom: rowPositions.bottoms[row]
                  }
              };
          }
      };
      /* Cell System
      ------------------------------------------------------------------------------------------------------------------*/
      // FYI: the first column is the leftmost column, regardless of date
      DayGrid.prototype.getCellEl = function (row, col) {
          return this.cellEls[row * this.colCnt + col];
      };
      /* Event Drag Visualization
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype._renderEventDrag = function (state) {
          if (state) {
              this.eventRenderer.hideByHash(state.affectedInstances);
              this.fillRenderer.renderSegs('highlight', this.context, state.segs);
          }
      };
      DayGrid.prototype._unrenderEventDrag = function (state) {
          if (state) {
              this.eventRenderer.showByHash(state.affectedInstances);
              this.fillRenderer.unrender('highlight', this.context);
          }
      };
      /* Event Resize Visualization
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype._renderEventResize = function (state) {
          if (state) {
              this.eventRenderer.hideByHash(state.affectedInstances);
              this.fillRenderer.renderSegs('highlight', this.context, state.segs);
              this.mirrorRenderer.renderSegs(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
          }
      };
      DayGrid.prototype._unrenderEventResize = function (state) {
          if (state) {
              this.eventRenderer.showByHash(state.affectedInstances);
              this.fillRenderer.unrender('highlight', this.context);
              this.mirrorRenderer.unrender(this.context, state.segs, { isResizing: true, sourceSeg: state.sourceSeg });
          }
      };
      /* More+ Link Popover
      ------------------------------------------------------------------------------------------------------------------*/
      DayGrid.prototype.removeSegPopover = function () {
          if (this.segPopover) {
              this.segPopover.hide(); // in handler, will call segPopover's removeElement
          }
      };
      // Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
      // `levelLimit` can be false (don't limit), a number, or true (should be computed).
      DayGrid.prototype.limitRows = function (levelLimit) {
          var rowStructs = this.eventRenderer.rowStructs || [];
          var row; // row #
          var rowLevelLimit;
          for (row = 0; row < rowStructs.length; row++) {
              this.unlimitRow(row);
              if (!levelLimit) {
                  rowLevelLimit = false;
              }
              else if (typeof levelLimit === 'number') {
                  rowLevelLimit = levelLimit;
              }
              else {
                  rowLevelLimit = this.computeRowLevelLimit(row);
              }
              if (rowLevelLimit !== false) {
                  this.limitRow(row, rowLevelLimit);
              }
          }
      };
      // Computes the number of levels a row will accomodate without going outside its bounds.
      // Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
      // `row` is the row number.
      DayGrid.prototype.computeRowLevelLimit = function (row) {
          var rowEl = this.rowEls[row]; // the containing "fake" row div
          var rowBottom = rowEl.getBoundingClientRect().bottom; // relative to viewport!
          var trEls = findChildren(this.eventRenderer.rowStructs[row].tbodyEl);
          var i;
          var trEl;
          // Reveal one level <tr> at a time and stop when we find one out of bounds
          for (i = 0; i < trEls.length; i++) {
              trEl = trEls[i];
              trEl.classList.remove('fc-limited'); // reset to original state (reveal)
              if (trEl.getBoundingClientRect().bottom > rowBottom) {
                  return i;
              }
          }
          return false; // should not limit at all
      };
      // Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
      // `row` is the row number.
      // `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
      DayGrid.prototype.limitRow = function (row, levelLimit) {
          var _this = this;
          var colCnt = this.colCnt;
          var isRtl = this.context.isRtl;
          var rowStruct = this.eventRenderer.rowStructs[row];
          var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
          var col = 0; // col #, left-to-right (not chronologically)
          var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
          var cellMatrix; // a matrix (by level, then column) of all <td> elements in the row
          var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
          var i;
          var seg;
          var segsBelow; // array of segment objects below `seg` in the current `col`
          var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
          var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
          var td;
          var rowSpan;
          var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
          var j;
          var moreTd;
          var moreWrap;
          var moreLink;
          // Iterates through empty level cells and places "more" links inside if need be
          var emptyCellsUntil = function (endCol) {
              while (col < endCol) {
                  segsBelow = _this.getCellSegs(row, col, levelLimit);
                  if (segsBelow.length) {
                      td = cellMatrix[levelLimit - 1][col];
                      moreLink = _this.renderMoreLink(row, col, segsBelow);
                      moreWrap = createElement('div', null, moreLink);
                      td.appendChild(moreWrap);
                      moreNodes.push(moreWrap);
                  }
                  col++;
              }
          };
          if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
              levelSegs = rowStruct.segLevels[levelLimit - 1];
              cellMatrix = rowStruct.cellMatrix;
              limitedNodes = findChildren(rowStruct.tbodyEl).slice(levelLimit); // get level <tr> elements past the limit
              limitedNodes.forEach(function (node) {
                  node.classList.add('fc-limited'); // hide elements and get a simple DOM-nodes array
              });
              // iterate though segments in the last allowable level
              for (i = 0; i < levelSegs.length; i++) {
                  seg = levelSegs[i];
                  var leftCol = isRtl ? (colCnt - 1 - seg.lastCol) : seg.firstCol;
                  var rightCol = isRtl ? (colCnt - 1 - seg.firstCol) : seg.lastCol;
                  emptyCellsUntil(leftCol); // process empty cells before the segment
                  // determine *all* segments below `seg` that occupy the same columns
                  colSegsBelow = [];
                  totalSegsBelow = 0;
                  while (col <= rightCol) {
                      segsBelow = this.getCellSegs(row, col, levelLimit);
                      colSegsBelow.push(segsBelow);
                      totalSegsBelow += segsBelow.length;
                      col++;
                  }
                  if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
                      td = cellMatrix[levelLimit - 1][leftCol]; // the segment's parent cell
                      rowSpan = td.rowSpan || 1;
                      segMoreNodes = [];
                      // make a replacement <td> for each column the segment occupies. will be one for each colspan
                      for (j = 0; j < colSegsBelow.length; j++) {
                          moreTd = createElement('td', { className: 'fc-more-cell', rowSpan: rowSpan });
                          segsBelow = colSegsBelow[j];
                          moreLink = this.renderMoreLink(row, leftCol + j, [seg].concat(segsBelow) // count seg as hidden too
                          );
                          moreWrap = createElement('div', null, moreLink);
                          moreTd.appendChild(moreWrap);
                          segMoreNodes.push(moreTd);
                          moreNodes.push(moreTd);
                      }
                      td.classList.add('fc-limited');
                      insertAfterElement(td, segMoreNodes);
                      limitedNodes.push(td);
                  }
              }
              emptyCellsUntil(this.colCnt); // finish off the level
              rowStruct.moreEls = moreNodes; // for easy undoing later
              rowStruct.limitedEls = limitedNodes; // for easy undoing later
          }
      };
      // Reveals all levels and removes all "more"-related elements for a grid's row.
      // `row` is a row number.
      DayGrid.prototype.unlimitRow = function (row) {
          var rowStruct = this.eventRenderer.rowStructs[row];
          if (rowStruct.moreEls) {
              rowStruct.moreEls.forEach(removeElement);
              rowStruct.moreEls = null;
          }
          if (rowStruct.limitedEls) {
              rowStruct.limitedEls.forEach(function (limitedEl) {
                  limitedEl.classList.remove('fc-limited');
              });
              rowStruct.limitedEls = null;
          }
      };
      // Renders an <a> element that represents hidden event element for a cell.
      // Responsible for attaching click handler as well.
      DayGrid.prototype.renderMoreLink = function (row, col, hiddenSegs) {
          var _this = this;
          var _a = this.context, calendar = _a.calendar, view = _a.view, dateEnv = _a.dateEnv, options = _a.options, isRtl = _a.isRtl;
          var a = createElement('a', { className: 'fc-more' });
          a.innerText = this.getMoreLinkText(hiddenSegs.length);
          a.addEventListener('click', function (ev) {
              var clickOption = options.eventLimitClick;
              var _col = isRtl ? _this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
              var date = _this.props.cells[row][_col].date;
              var moreEl = ev.currentTarget;
              var dayEl = _this.getCellEl(row, col);
              var allSegs = _this.getCellSegs(row, col);
              // rescope the segments to be within the cell's date
              var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
              var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
              if (typeof clickOption === 'function') {
                  // the returned value can be an atomic option
                  clickOption = calendar.publiclyTrigger('eventLimitClick', [
                      {
                          date: dateEnv.toDate(date),
                          allDay: true,
                          dayEl: dayEl,
                          moreEl: moreEl,
                          segs: reslicedAllSegs,
                          hiddenSegs: reslicedHiddenSegs,
                          jsEvent: ev,
                          view: view
                      }
                  ]);
              }
              if (clickOption === 'popover') {
                  _this.showSegPopover(row, col, moreEl, reslicedAllSegs);
              }
              else if (typeof clickOption === 'string') { // a view name
                  calendar.zoomTo(date, clickOption);
              }
          });
          return a;
      };
      // Reveals the popover that displays all events within a cell
      DayGrid.prototype.showSegPopover = function (row, col, moreLink, segs) {
          var _this = this;
          var _a = this.context, calendar = _a.calendar, view = _a.view, theme = _a.theme, isRtl = _a.isRtl;
          var _col = isRtl ? this.colCnt - col - 1 : col; // HACK: props.cells has different dir system?
          var moreWrap = moreLink.parentNode; // the <div> wrapper around the <a>
          var topEl; // the element we want to match the top coordinate of
          var options;
          if (this.rowCnt === 1) {
              topEl = view.el; // will cause the popover to cover any sort of header
          }
          else {
              topEl = this.rowEls[row]; // will align with top of row
          }
          options = {
              className: 'fc-more-popover ' + theme.getClass('popover'),
              parentEl: view.el,
              top: computeRect(topEl).top,
              autoHide: true,
              content: function (el) {
                  _this.segPopoverTile = new DayTile(el);
                  _this.updateSegPopoverTile(_this.props.cells[row][_col].date, segs);
              },
              hide: function () {
                  _this.segPopoverTile.destroy();
                  _this.segPopoverTile = null;
                  _this.segPopover.destroy();
                  _this.segPopover = null;
              }
          };
          // Determine horizontal coordinate.
          // We use the moreWrap instead of the <td> to avoid border confusion.
          if (isRtl) {
              options.right = computeRect(moreWrap).right + 1; // +1 to be over cell border
          }
          else {
              options.left = computeRect(moreWrap).left - 1; // -1 to be over cell border
          }
          this.segPopover = new Popover(options);
          this.segPopover.show();
          calendar.releaseAfterSizingTriggers(); // hack for eventPositioned
      };
      // Given the events within an array of segment objects, reslice them to be in a single day
      DayGrid.prototype.resliceDaySegs = function (segs, dayDate) {
          var dayStart = dayDate;
          var dayEnd = addDays(dayStart, 1);
          var dayRange = { start: dayStart, end: dayEnd };
          var newSegs = [];
          for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
              var seg = segs_1[_i];
              var eventRange = seg.eventRange;
              var origRange = eventRange.range;
              var slicedRange = intersectRanges(origRange, dayRange);
              if (slicedRange) {
                  newSegs.push(__assign$1({}, seg, { eventRange: {
                          def: eventRange.def,
                          ui: __assign$1({}, eventRange.ui, { durationEditable: false }),
                          instance: eventRange.instance,
                          range: slicedRange
                      }, isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(), isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf() }));
              }
          }
          return newSegs;
      };
      // Generates the text that should be inside a "more" link, given the number of events it represents
      DayGrid.prototype.getMoreLinkText = function (num) {
          var opt = this.context.options.eventLimitText;
          if (typeof opt === 'function') {
              return opt(num);
          }
          else {
              return '+' + num + ' ' + opt;
          }
      };
      // Returns segments within a given cell.
      // If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
      DayGrid.prototype.getCellSegs = function (row, col, startLevel) {
          var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
          var level = startLevel || 0;
          var segs = [];
          var seg;
          while (level < segMatrix.length) {
              seg = segMatrix[level][col];
              if (seg) {
                  segs.push(seg);
              }
              level++;
          }
          return segs;
      };
      return DayGrid;
  }(DateComponent));

  var WEEK_NUM_FORMAT$1 = createFormatter({ week: 'numeric' });
  /* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
  ----------------------------------------------------------------------------------------------------------------------*/
  // It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
  // It is responsible for managing width/height.
  var AbstractDayGridView = /** @class */ (function (_super) {
      __extends$1(AbstractDayGridView, _super);
      function AbstractDayGridView() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.processOptions = memoize(_this._processOptions);
          _this.renderSkeleton = memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
          /* Header Rendering
          ------------------------------------------------------------------------------------------------------------------*/
          // Generates the HTML that will go before the day-of week header cells
          _this.renderHeadIntroHtml = function () {
              var _a = _this.context, theme = _a.theme, options = _a.options;
              if (_this.colWeekNumbersVisible) {
                  return '' +
                      '<th class="fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.weekNumberStyleAttr() + '>' +
                      '<span>' + // needed for matchCellWidths
                      htmlEscape(options.weekLabel) +
                      '</span>' +
                      '</th>';
              }
              return '';
          };
          /* Day Grid Rendering
          ------------------------------------------------------------------------------------------------------------------*/
          // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
          _this.renderDayGridNumberIntroHtml = function (row, dayGrid) {
              var _a = _this.context, options = _a.options, dateEnv = _a.dateEnv;
              var weekStart = dayGrid.props.cells[row][0].date;
              if (_this.colWeekNumbersVisible) {
                  return '' +
                      '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '>' +
                      buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                      options, dateEnv, { date: weekStart, type: 'week', forceOff: dayGrid.colCnt === 1 }, dateEnv.format(weekStart, WEEK_NUM_FORMAT$1) // inner HTML
                      ) +
                      '</td>';
              }
              return '';
          };
          // Generates the HTML that goes before the day bg cells for each day-row
          _this.renderDayGridBgIntroHtml = function () {
              var theme = _this.context.theme;
              if (_this.colWeekNumbersVisible) {
                  return '<td class="fc-week-number ' + theme.getClass('widgetContent') + '" ' + _this.weekNumberStyleAttr() + '></td>';
              }
              return '';
          };
          // Generates the HTML that goes before every other type of row generated by DayGrid.
          // Affects mirror-skeleton and highlight-skeleton rows.
          _this.renderDayGridIntroHtml = function () {
              if (_this.colWeekNumbersVisible) {
                  return '<td class="fc-week-number" ' + _this.weekNumberStyleAttr() + '></td>';
              }
              return '';
          };
          return _this;
      }
      AbstractDayGridView.prototype._processOptions = function (options) {
          if (options.weekNumbers) {
              if (options.weekNumbersWithinDays) {
                  this.cellWeekNumbersVisible = true;
                  this.colWeekNumbersVisible = false;
              }
              else {
                  this.cellWeekNumbersVisible = false;
                  this.colWeekNumbersVisible = true;
              }
          }
          else {
              this.colWeekNumbersVisible = false;
              this.cellWeekNumbersVisible = false;
          }
      };
      AbstractDayGridView.prototype.render = function (props, context) {
          _super.prototype.render.call(this, props, context);
          this.processOptions(context.options);
          this.renderSkeleton(context);
      };
      AbstractDayGridView.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.renderSkeleton.unrender();
      };
      AbstractDayGridView.prototype._renderSkeleton = function (context) {
          this.el.classList.add('fc-dayGrid-view');
          this.el.innerHTML = this.renderSkeletonHtml();
          this.scroller = new ScrollComponent('hidden', // overflow x
          'auto' // overflow y
          );
          var dayGridContainerEl = this.scroller.el;
          this.el.querySelector('.fc-body > tr > td').appendChild(dayGridContainerEl);
          dayGridContainerEl.classList.add('fc-day-grid-container');
          var dayGridEl = createElement('div', { className: 'fc-day-grid' });
          dayGridContainerEl.appendChild(dayGridEl);
          this.dayGrid = new DayGrid(dayGridEl, {
              renderNumberIntroHtml: this.renderDayGridNumberIntroHtml,
              renderBgIntroHtml: this.renderDayGridBgIntroHtml,
              renderIntroHtml: this.renderDayGridIntroHtml,
              colWeekNumbersVisible: this.colWeekNumbersVisible,
              cellWeekNumbersVisible: this.cellWeekNumbersVisible
          });
      };
      AbstractDayGridView.prototype._unrenderSkeleton = function () {
          this.el.classList.remove('fc-dayGrid-view');
          this.dayGrid.destroy();
          this.scroller.destroy();
      };
      // Builds the HTML skeleton for the view.
      // The day-grid component will render inside of a container defined by this HTML.
      AbstractDayGridView.prototype.renderSkeletonHtml = function () {
          var _a = this.context, theme = _a.theme, options = _a.options;
          return '' +
              '<table class="' + theme.getClass('tableGrid') + '">' +
              (options.columnHeader ?
                  '<thead class="fc-head">' +
                      '<tr>' +
                      '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                      '</tr>' +
                      '</thead>' :
                  '') +
              '<tbody class="fc-body">' +
              '<tr>' +
              '<td class="' + theme.getClass('widgetContent') + '"></td>' +
              '</tr>' +
              '</tbody>' +
              '</table>';
      };
      // Generates an HTML attribute string for setting the width of the week number column, if it is known
      AbstractDayGridView.prototype.weekNumberStyleAttr = function () {
          if (this.weekNumberWidth != null) {
              return 'style="width:' + this.weekNumberWidth + 'px"';
          }
          return '';
      };
      // Determines whether each row should have a constant height
      AbstractDayGridView.prototype.hasRigidRows = function () {
          var eventLimit = this.context.options.eventLimit;
          return eventLimit && typeof eventLimit !== 'number';
      };
      /* Dimensions
      ------------------------------------------------------------------------------------------------------------------*/
      AbstractDayGridView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
          _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto); // will call updateBaseSize. important that executes first
          this.dayGrid.updateSize(isResize);
      };
      // Refreshes the horizontal dimensions of the view
      AbstractDayGridView.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
          var dayGrid = this.dayGrid;
          var eventLimit = this.context.options.eventLimit;
          var headRowEl = this.header ? this.header.el : null; // HACK
          var scrollerHeight;
          var scrollbarWidths;
          // hack to give the view some height prior to dayGrid's columns being rendered
          // TODO: separate setting height from scroller VS dayGrid.
          if (!dayGrid.rowEls) {
              if (!isAuto) {
                  scrollerHeight = this.computeScrollerHeight(viewHeight);
                  this.scroller.setHeight(scrollerHeight);
              }
              return;
          }
          if (this.colWeekNumbersVisible) {
              // Make sure all week number cells running down the side have the same width.
              this.weekNumberWidth = matchCellWidths(findElements(this.el, '.fc-week-number'));
          }
          // reset all heights to be natural
          this.scroller.clear();
          if (headRowEl) {
              uncompensateScroll(headRowEl);
          }
          dayGrid.removeSegPopover(); // kill the "more" popover if displayed
          // is the event limit a constant level number?
          if (eventLimit && typeof eventLimit === 'number') {
              dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
          }
          // distribute the height to the rows
          // (viewHeight is a "recommended" value if isAuto)
          scrollerHeight = this.computeScrollerHeight(viewHeight);
          this.setGridHeight(scrollerHeight, isAuto);
          // is the event limit dynamically calculated?
          if (eventLimit && typeof eventLimit !== 'number') {
              dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
          }
          if (!isAuto) { // should we force dimensions of the scroll container?
              this.scroller.setHeight(scrollerHeight);
              scrollbarWidths = this.scroller.getScrollbarWidths();
              if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
                  if (headRowEl) {
                      compensateScroll(headRowEl, scrollbarWidths);
                  }
                  // doing the scrollbar compensation might have created text overflow which created more height. redo
                  scrollerHeight = this.computeScrollerHeight(viewHeight);
                  this.scroller.setHeight(scrollerHeight);
              }
              // guarantees the same scrollbar widths
              this.scroller.lockOverflow(scrollbarWidths);
          }
      };
      // given a desired total height of the view, returns what the height of the scroller should be
      AbstractDayGridView.prototype.computeScrollerHeight = function (viewHeight) {
          return viewHeight -
              subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
      };
      // Sets the height of just the DayGrid component in this view
      AbstractDayGridView.prototype.setGridHeight = function (height, isAuto) {
          if (this.context.options.monthMode) {
              // if auto, make the height of each row the height that it would be if there were 6 weeks
              if (isAuto) {
                  height *= this.dayGrid.rowCnt / 6;
              }
              distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
          }
          else {
              if (isAuto) {
                  undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
              }
              else {
                  distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
              }
          }
      };
      /* Scroll
      ------------------------------------------------------------------------------------------------------------------*/
      AbstractDayGridView.prototype.computeDateScroll = function (duration) {
          return { top: 0 };
      };
      AbstractDayGridView.prototype.queryDateScroll = function () {
          return { top: this.scroller.getScrollTop() };
      };
      AbstractDayGridView.prototype.applyDateScroll = function (scroll) {
          if (scroll.top !== undefined) {
              this.scroller.setScrollTop(scroll.top);
          }
      };
      return AbstractDayGridView;
  }(View$1));
  AbstractDayGridView.prototype.dateProfileGeneratorClass = DayGridDateProfileGenerator;

  var SimpleDayGrid = /** @class */ (function (_super) {
      __extends$1(SimpleDayGrid, _super);
      function SimpleDayGrid(dayGrid) {
          var _this = _super.call(this, dayGrid.el) || this;
          _this.slicer = new DayGridSlicer();
          _this.dayGrid = dayGrid;
          return _this;
      }
      SimpleDayGrid.prototype.firstContext = function (context) {
          context.calendar.registerInteractiveComponent(this, { el: this.dayGrid.el });
      };
      SimpleDayGrid.prototype.destroy = function () {
          _super.prototype.destroy.call(this);
          this.context.calendar.unregisterInteractiveComponent(this);
      };
      SimpleDayGrid.prototype.render = function (props, context) {
          var dayGrid = this.dayGrid;
          var dateProfile = props.dateProfile, dayTable = props.dayTable;
          dayGrid.receiveProps(__assign$1({}, this.slicer.sliceProps(props, dateProfile, props.nextDayThreshold, context.calendar, dayGrid, dayTable), { dateProfile: dateProfile, cells: dayTable.cells, isRigid: props.isRigid }), context);
      };
      SimpleDayGrid.prototype.buildPositionCaches = function () {
          this.dayGrid.buildPositionCaches();
      };
      SimpleDayGrid.prototype.queryHit = function (positionLeft, positionTop) {
          var rawHit = this.dayGrid.positionToHit(positionLeft, positionTop);
          if (rawHit) {
              return {
                  component: this.dayGrid,
                  dateSpan: rawHit.dateSpan,
                  dayEl: rawHit.dayEl,
                  rect: {
                      left: rawHit.relativeRect.left,
                      right: rawHit.relativeRect.right,
                      top: rawHit.relativeRect.top,
                      bottom: rawHit.relativeRect.bottom
                  },
                  layer: 0
              };
          }
      };
      return SimpleDayGrid;
  }(DateComponent));
  var DayGridSlicer = /** @class */ (function (_super) {
      __extends$1(DayGridSlicer, _super);
      function DayGridSlicer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      DayGridSlicer.prototype.sliceRange = function (dateRange, dayTable) {
          return dayTable.sliceRange(dateRange);
      };
      return DayGridSlicer;
  }(Slicer));

  var DayGridView = /** @class */ (function (_super) {
      __extends$1(DayGridView, _super);
      function DayGridView() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.buildDayTable = memoize(buildDayTable);
          return _this;
      }
      DayGridView.prototype.render = function (props, context) {
          _super.prototype.render.call(this, props, context); // will call _renderSkeleton/_unrenderSkeleton
          var dateProfile = this.props.dateProfile;
          var dayTable = this.dayTable =
              this.buildDayTable(dateProfile, props.dateProfileGenerator);
          if (this.header) {
              this.header.receiveProps({
                  dateProfile: dateProfile,
                  dates: dayTable.headerDates,
                  datesRepDistinctDays: dayTable.rowCnt === 1,
                  renderIntroHtml: this.renderHeadIntroHtml
              }, context);
          }
          this.simpleDayGrid.receiveProps({
              dateProfile: dateProfile,
              dayTable: dayTable,
              businessHours: props.businessHours,
              dateSelection: props.dateSelection,
              eventStore: props.eventStore,
              eventUiBases: props.eventUiBases,
              eventSelection: props.eventSelection,
              eventDrag: props.eventDrag,
              eventResize: props.eventResize,
              isRigid: this.hasRigidRows(),
              nextDayThreshold: this.context.nextDayThreshold
          }, context);
      };
      DayGridView.prototype._renderSkeleton = function (context) {
          _super.prototype._renderSkeleton.call(this, context);
          if (context.options.columnHeader) {
              this.header = new DayHeader(this.el.querySelector('.fc-head-container'));
          }
          this.simpleDayGrid = new SimpleDayGrid(this.dayGrid);
      };
      DayGridView.prototype._unrenderSkeleton = function () {
          _super.prototype._unrenderSkeleton.call(this);
          if (this.header) {
              this.header.destroy();
          }
          this.simpleDayGrid.destroy();
      };
      return DayGridView;
  }(AbstractDayGridView));
  function buildDayTable(dateProfile, dateProfileGenerator) {
      var daySeries = new DaySeries(dateProfile.renderRange, dateProfileGenerator);
      return new DayTable(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
  }

  var main = createPlugin({
      defaultView: 'dayGridMonth',
      views: {
          dayGrid: DayGridView,
          dayGridDay: {
              type: 'dayGrid',
              duration: { days: 1 }
          },
          dayGridWeek: {
              type: 'dayGrid',
              duration: { weeks: 1 }
          },
          dayGridMonth: {
              type: 'dayGrid',
              duration: { months: 1 },
              monthMode: true,
              fixedWeekCount: true
          }
      }
  });

  function Calendar$1(selector){
    const options = {
      eventLimit: 3,
      plugins: [ main ],
      defaultView: 'dayGridMonth',
      locale: es$1,
      displayEventTime: false,
      header: { left: '', center: '', right: '' },
      columnHeaderText: function(date) {
        let short = window.innerWidth > 640;
        date = instance.formatDate(date,{
          locale:'es',
          weekday:  short ? 'short' : 'narrow'
        });
        if(short){ date = date.split('.')[0]; }
        return date;
      }
    };
    const element =  $(`[data-calendar="${selector}"]`);
    const instance = new Calendar(element[0],options);
    const events = new Observer(['updateDate']);

    const methods = {
      'updateDate': {
        writable: false,
        value: (format)=>{
          if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
          format = instance.formatDate(instance.getDate(),format);
          format = format.slice(0,1).toUpperCase()+format.slice(1);
          events.notify('updateDate',[format]);
        }
      },
      'render': {
        writable: false,
        value: ()=>{
          // la barra de navegación mide 64px en altura por eso se la resta.
          let height = window.innerHeight - 64;
          instance.setOption('contentHeight',height);
          instance.render();
          this.updateDate();
        }
      },
      'next': {
        writable: false,
        value: ()=>{
          instance.next();
          this.updateDate();
        }
      },
      'prev': {
        writable: false,
        value: ()=>{
          instance.prev();
          this.updateDate();
        }
      },
      'today': {
        writable: false,
        value: ()=>{
          instance.today();
          this.updateDate();
        }
      },
      'events': {
        writable: false,
        value: {
          'on': events.register,
          'off': events.unregister
        }
      },
    };

    Object.defineProperties(this,methods);

  }

  function ToolBar(name){
    const element = $(`[data-navbar="${name}"]`);
    const state = new State();
    const { buttons, inputs } = Finder(element);

    const toggle = (state)=>{
      element[state ? 'removeClass' : 'addClass']('hidden');
      buttons.all.forEach((btn)=>{ btn[state ? 'on' : 'off'](); });
      inputs.all.forEach((input)=>{ input[state ? 'on' : 'off'](); });
    };

    const Methods = {
      'element': {
        get:()=>{ return element }
      },
      'name': {
        get: ()=>{ return name }
      },
      'buttons':{
        get: ()=>{ return buttons }
      },
      'inputs':{
        get: ()=>{ return inputs }
      },
      'state': {
        writable: false,
        value: state
      },
      'reset': {
        writable: false,
        value: ()=>{
          buttons.all.forEach((btn)=>{
            btn.off();
            btn.element.addClass('hidden');
          });
        }
      },
      'on':{
        writable: false,
        value: ()=>{ toggle(true); }
      },
      'off':{
        writable: false,
        value: ()=>{ toggle(false); }
      },
      'toggleBtns': {
        writable: false,
        value: (btns,state)=>{
          btns.forEach((name)=>{
            let btn = buttons.name[name];
            btn[state ? 'on' : 'off']();
            btn.element[state ? 'removeClass' : 'addClass']('hidden');
          });
        }
      }
    };

    Object.defineProperties(this,Methods);
  }

  function ToolBar$1(){
    const toolbar = new ToolBar('calendar');
    const dateTitle = toolbar.element.find('[data=date]');
    const methods = {
      'setDate': { value: function(value){ dateTitle.html(value); } }
    };

    Object.defineProperties(toolbar,methods);

    return toolbar;
  }

  function Calendar$2(){
    const view = new View({ name:'calendar', element: $('[data-content="calendar"]') });
    const toolbar = ToolBar$1();
    const calendar = new Calendar$1('main');
    const permissions = new Permissions();

    const routes = {
      '/calendar/*': function(ctx,next){
        if(!(this.state.value == 'calendar')){ this.state.value = 'calendar'; }
        next();
      },
      '/calendar/': permissions.index,
    };

    view.on = function(){ toolbar.on(); permissions.on(); };

    view.off = function(){ toolbar.off(); permissions.off(); };

    view.routes = [ routes, permissions.routes ];

    toolbar.buttons.name.prev.events.on('click',calendar.prev);

    toolbar.buttons.name.next.events.on('click',calendar.next);

    toolbar.buttons.name.today.events.on('click',calendar.today);

    calendar.events.on('updateDate',toolbar.setDate);

    calendar.render();


    return view
  }

  function ToolBar$2(){ return new ToolBar('profile'); }

  function Profile(){
    const view = new View({ name:'profile', element: $('[data-content="profile"]') });
    const toolbar = ToolBar$2();

    const routes = {
      '/profile/*': function(ctx,next){
        if(!(this.state.value == 'profile')){ this.state.value = 'profile'; }
        next();
      },
      '/profile/': function(){
      }

    };

    view.on = function(){ toolbar.on(); };
    view.off = function(){ toolbar.off(); };

    view.routes = [ routes ];

    return view
  }

  var compiler = createCommonjsModule(function (module, exports) {
  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  (function (Hogan) {
    // Setup regex  assignments
    // remove whitespace according to Mustache spec
    var rIsWhitespace = /\S/,
        rQuot = /\"/g,
        rNewline =  /\n/g,
        rCr = /\r/g,
        rSlash = /\\/g,
        rLineSep = /\u2028/,
        rParagraphSep = /\u2029/;

    Hogan.tags = {
      '#': 1, '^': 2, '<': 3, '$': 4,
      '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
      '{': 10, '&': 11, '_t': 12
    };

    Hogan.scan = function scan(text, delimiters) {
      var len = text.length,
          IN_TEXT = 0,
          IN_TAG_TYPE = 1,
          IN_TAG = 2,
          state = IN_TEXT,
          tagType = null,
          tag = null,
          buf = '',
          tokens = [],
          seenTag = false,
          i = 0,
          lineStart = 0,
          otag = '{{',
          ctag = '}}';

      function addBuf() {
        if (buf.length > 0) {
          tokens.push({tag: '_t', text: new String(buf)});
          buf = '';
        }
      }

      function lineIsWhitespace() {
        var isAllWhitespace = true;
        for (var j = lineStart; j < tokens.length; j++) {
          isAllWhitespace =
            (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
            (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
          if (!isAllWhitespace) {
            return false;
          }
        }

        return isAllWhitespace;
      }

      function filterLine(haveSeenTag, noNewLine) {
        addBuf();

        if (haveSeenTag && lineIsWhitespace()) {
          for (var j = lineStart, next; j < tokens.length; j++) {
            if (tokens[j].text) {
              if ((next = tokens[j+1]) && next.tag == '>') {
                // set indent to token value
                next.indent = tokens[j].text.toString();
              }
              tokens.splice(j, 1);
            }
          }
        } else if (!noNewLine) {
          tokens.push({tag:'\n'});
        }

        seenTag = false;
        lineStart = tokens.length;
      }

      function changeDelimiters(text, index) {
        var close = '=' + ctag,
            closeIndex = text.indexOf(close, index),
            delimiters = trim(
              text.substring(text.indexOf('=', index) + 1, closeIndex)
            ).split(' ');

        otag = delimiters[0];
        ctag = delimiters[delimiters.length - 1];

        return closeIndex + close.length - 1;
      }

      if (delimiters) {
        delimiters = delimiters.split(' ');
        otag = delimiters[0];
        ctag = delimiters[1];
      }

      for (i = 0; i < len; i++) {
        if (state == IN_TEXT) {
          if (tagChange(otag, text, i)) {
            --i;
            addBuf();
            state = IN_TAG_TYPE;
          } else {
            if (text.charAt(i) == '\n') {
              filterLine(seenTag);
            } else {
              buf += text.charAt(i);
            }
          }
        } else if (state == IN_TAG_TYPE) {
          i += otag.length - 1;
          tag = Hogan.tags[text.charAt(i + 1)];
          tagType = tag ? text.charAt(i + 1) : '_v';
          if (tagType == '=') {
            i = changeDelimiters(text, i);
            state = IN_TEXT;
          } else {
            if (tag) {
              i++;
            }
            state = IN_TAG;
          }
          seenTag = i;
        } else {
          if (tagChange(ctag, text, i)) {
            tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                         i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
            buf = '';
            i += ctag.length - 1;
            state = IN_TEXT;
            if (tagType == '{') {
              if (ctag == '}}') {
                i++;
              } else {
                cleanTripleStache(tokens[tokens.length - 1]);
              }
            }
          } else {
            buf += text.charAt(i);
          }
        }
      }

      filterLine(seenTag, true);

      return tokens;
    };

    function cleanTripleStache(token) {
      if (token.n.substr(token.n.length - 1) === '}') {
        token.n = token.n.substring(0, token.n.length - 1);
      }
    }

    function trim(s) {
      if (s.trim) {
        return s.trim();
      }

      return s.replace(/^\s*|\s*$/g, '');
    }

    function tagChange(tag, text, index) {
      if (text.charAt(index) != tag.charAt(0)) {
        return false;
      }

      for (var i = 1, l = tag.length; i < l; i++) {
        if (text.charAt(index + i) != tag.charAt(i)) {
          return false;
        }
      }

      return true;
    }

    // the tags allowed inside super templates
    var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

    function buildTree(tokens, kind, stack, customTags) {
      var instructions = [],
          opener = null,
          tail = null,
          token = null;

      tail = stack[stack.length - 1];

      while (tokens.length > 0) {
        token = tokens.shift();

        if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
          throw new Error('Illegal content in < super tag.');
        }

        if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
          stack.push(token);
          token.nodes = buildTree(tokens, token.tag, stack, customTags);
        } else if (token.tag == '/') {
          if (stack.length === 0) {
            throw new Error('Closing tag without opener: /' + token.n);
          }
          opener = stack.pop();
          if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
            throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
          }
          opener.end = token.i;
          return instructions;
        } else if (token.tag == '\n') {
          token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
        }

        instructions.push(token);
      }

      if (stack.length > 0) {
        throw new Error('missing closing tag: ' + stack.pop().n);
      }

      return instructions;
    }

    function isOpener(token, tags) {
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].o == token.n) {
          token.tag = '#';
          return true;
        }
      }
    }

    function isCloser(close, open, tags) {
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].c == close && tags[i].o == open) {
          return true;
        }
      }
    }

    function stringifySubstitutions(obj) {
      var items = [];
      for (var key in obj) {
        items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
      }
      return "{ " + items.join(",") + " }";
    }

    function stringifyPartials(codeObj) {
      var partials = [];
      for (var key in codeObj.partials) {
        partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
      }
      return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
    }

    Hogan.stringify = function(codeObj, text, options) {
      return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
    };

    var serialNo = 0;
    Hogan.generate = function(tree, text, options) {
      serialNo = 0;
      var context = { code: '', subs: {}, partials: {} };
      Hogan.walk(tree, context);

      if (options.asString) {
        return this.stringify(context, text, options);
      }

      return this.makeTemplate(context, text, options);
    };

    Hogan.wrapMain = function(code) {
      return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
    };

    Hogan.template = Hogan.Template;

    Hogan.makeTemplate = function(codeObj, text, options) {
      var template = this.makePartials(codeObj);
      template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
      return new this.template(template, text, this, options);
    };

    Hogan.makePartials = function(codeObj) {
      var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
      for (key in template.partials) {
        template.partials[key] = this.makePartials(template.partials[key]);
      }
      for (key in codeObj.subs) {
        template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
      }
      return template;
    };

    function esc(s) {
      return s.replace(rSlash, '\\\\')
              .replace(rQuot, '\\\"')
              .replace(rNewline, '\\n')
              .replace(rCr, '\\r')
              .replace(rLineSep, '\\u2028')
              .replace(rParagraphSep, '\\u2029');
    }

    function chooseMethod(s) {
      return (~s.indexOf('.')) ? 'd' : 'f';
    }

    function createPartial(node, context) {
      var prefix = "<" + (context.prefix || "");
      var sym = prefix + node.n + serialNo++;
      context.partials[sym] = {name: node.n, partials: {}};
      context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
      return sym;
    }

    Hogan.codegen = {
      '#': function(node, context) {
        context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                        'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                        't.rs(c,p,' + 'function(c,p,t){';
        Hogan.walk(node.nodes, context);
        context.code += '});c.pop();}';
      },

      '^': function(node, context) {
        context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
        Hogan.walk(node.nodes, context);
        context.code += '};';
      },

      '>': createPartial,
      '<': function(node, context) {
        var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
        Hogan.walk(node.nodes, ctx);
        var template = context.partials[createPartial(node, context)];
        template.subs = ctx.subs;
        template.partials = ctx.partials;
      },

      '$': function(node, context) {
        var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
        Hogan.walk(node.nodes, ctx);
        context.subs[node.n] = ctx.code;
        if (!context.inPartial) {
          context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
        }
      },

      '\n': function(node, context) {
        context.code += write('"\\n"' + (node.last ? '' : ' + i'));
      },

      '_v': function(node, context) {
        context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
      },

      '_t': function(node, context) {
        context.code += write('"' + esc(node.text) + '"');
      },

      '{': tripleStache,

      '&': tripleStache
    };

    function tripleStache(node, context) {
      context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    }

    function write(s) {
      return 't.b(' + s + ');';
    }

    Hogan.walk = function(nodelist, context) {
      var func;
      for (var i = 0, l = nodelist.length; i < l; i++) {
        func = Hogan.codegen[nodelist[i].tag];
        func && func(nodelist[i], context);
      }
      return context;
    };

    Hogan.parse = function(tokens, text, options) {
      options = options || {};
      return buildTree(tokens, '', [], options.sectionTags || []);
    };

    Hogan.cache = {};

    Hogan.cacheKey = function(text, options) {
      return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
    };

    Hogan.compile = function(text, options) {
      options = options || {};
      var key = Hogan.cacheKey(text, options);
      var template = this.cache[key];

      if (template) {
        var partials = template.partials;
        for (var name in partials) {
          delete partials[name].instance;
        }
        return template;
      }

      template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
      return this.cache[key] = template;
    };
  })( exports );
  });

  var template = createCommonjsModule(function (module, exports) {

  (function (Hogan) {
    Hogan.Template = function (codeObj, text, compiler, options) {
      codeObj = codeObj || {};
      this.r = codeObj.code || this.r;
      this.c = compiler;
      this.options = options || {};
      this.text = text || '';
      this.partials = codeObj.partials || {};
      this.subs = codeObj.subs || {};
      this.buf = '';
    };

    Hogan.Template.prototype = {
      // render: replaced by generated code.
      r: function (context, partials, indent) { return ''; },

      // variable escaping
      v: hoganEscape,

      // triple stache
      t: coerceToString,

      render: function render(context, partials, indent) {
        return this.ri([context], partials || {}, indent);
      },

      // render internal -- a hook for overrides that catches partials too
      ri: function (context, partials, indent) {
        return this.r(context, partials, indent);
      },

      // ensurePartial
      ep: function(symbol, partials) {
        var partial = this.partials[symbol];

        // check to see that if we've instantiated this partial before
        var template = partials[partial.name];
        if (partial.instance && partial.base == template) {
          return partial.instance;
        }

        if (typeof template == 'string') {
          if (!this.c) {
            throw new Error("No compiler available.");
          }
          template = this.c.compile(template, this.options);
        }

        if (!template) {
          return null;
        }

        // We use this to check whether the partials dictionary has changed
        this.partials[symbol].base = template;

        if (partial.subs) {
          // Make sure we consider parent template now
          if (!partials.stackText) partials.stackText = {};
          for (key in partial.subs) {
            if (!partials.stackText[key]) {
              partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
            }
          }
          template = createSpecializedPartial(template, partial.subs, partial.partials,
            this.stackSubs, this.stackPartials, partials.stackText);
        }
        this.partials[symbol].instance = template;

        return template;
      },

      // tries to find a partial in the current scope and render it
      rp: function(symbol, context, partials, indent) {
        var partial = this.ep(symbol, partials);
        if (!partial) {
          return '';
        }

        return partial.ri(context, partials, indent);
      },

      // render a section
      rs: function(context, partials, section) {
        var tail = context[context.length - 1];

        if (!isArray(tail)) {
          section(context, partials, this);
          return;
        }

        for (var i = 0; i < tail.length; i++) {
          context.push(tail[i]);
          section(context, partials, this);
          context.pop();
        }
      },

      // maybe start a section
      s: function(val, ctx, partials, inverted, start, end, tags) {
        var pass;

        if (isArray(val) && val.length === 0) {
          return false;
        }

        if (typeof val == 'function') {
          val = this.ms(val, ctx, partials, inverted, start, end, tags);
        }

        pass = !!val;

        if (!inverted && pass && ctx) {
          ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
        }

        return pass;
      },

      // find values with dotted names
      d: function(key, ctx, partials, returnFound) {
        var found,
            names = key.split('.'),
            val = this.f(names[0], ctx, partials, returnFound),
            doModelGet = this.options.modelGet,
            cx = null;

        if (key === '.' && isArray(ctx[ctx.length - 2])) {
          val = ctx[ctx.length - 1];
        } else {
          for (var i = 1; i < names.length; i++) {
            found = findInScope(names[i], val, doModelGet);
            if (found !== undefined) {
              cx = val;
              val = found;
            } else {
              val = '';
            }
          }
        }

        if (returnFound && !val) {
          return false;
        }

        if (!returnFound && typeof val == 'function') {
          ctx.push(cx);
          val = this.mv(val, ctx, partials);
          ctx.pop();
        }

        return val;
      },

      // find values with normal names
      f: function(key, ctx, partials, returnFound) {
        var val = false,
            v = null,
            found = false,
            doModelGet = this.options.modelGet;

        for (var i = ctx.length - 1; i >= 0; i--) {
          v = ctx[i];
          val = findInScope(key, v, doModelGet);
          if (val !== undefined) {
            found = true;
            break;
          }
        }

        if (!found) {
          return (returnFound) ? false : "";
        }

        if (!returnFound && typeof val == 'function') {
          val = this.mv(val, ctx, partials);
        }

        return val;
      },

      // higher order templates
      ls: function(func, cx, partials, text, tags) {
        var oldTags = this.options.delimiters;

        this.options.delimiters = tags;
        this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
        this.options.delimiters = oldTags;

        return false;
      },

      // compile text
      ct: function(text, cx, partials) {
        if (this.options.disableLambda) {
          throw new Error('Lambda features disabled.');
        }
        return this.c.compile(text, this.options).render(cx, partials);
      },

      // template result buffering
      b: function(s) { this.buf += s; },

      fl: function() { var r = this.buf; this.buf = ''; return r; },

      // method replace section
      ms: function(func, ctx, partials, inverted, start, end, tags) {
        var textSource,
            cx = ctx[ctx.length - 1],
            result = func.call(cx);

        if (typeof result == 'function') {
          if (inverted) {
            return true;
          } else {
            textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
            return this.ls(result, cx, partials, textSource.substring(start, end), tags);
          }
        }

        return result;
      },

      // method replace variable
      mv: function(func, ctx, partials) {
        var cx = ctx[ctx.length - 1];
        var result = func.call(cx);

        if (typeof result == 'function') {
          return this.ct(coerceToString(result.call(cx)), cx, partials);
        }

        return result;
      },

      sub: function(name, context, partials, indent) {
        var f = this.subs[name];
        if (f) {
          this.activeSub = name;
          f(context, partials, this, indent);
          this.activeSub = false;
        }
      }

    };

    //Find a key in an object
    function findInScope(key, scope, doModelGet) {
      var val;

      if (scope && typeof scope == 'object') {

        if (scope[key] !== undefined) {
          val = scope[key];

        // try lookup with get for backbone or similar model data
        } else if (doModelGet && scope.get && typeof scope.get == 'function') {
          val = scope.get(key);
        }
      }

      return val;
    }

    function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
      function PartialTemplate() {}    PartialTemplate.prototype = instance;
      function Substitutions() {}    Substitutions.prototype = instance.subs;
      var key;
      var partial = new PartialTemplate();
      partial.subs = new Substitutions();
      partial.subsText = {};  //hehe. substext.
      partial.buf = '';

      stackSubs = stackSubs || {};
      partial.stackSubs = stackSubs;
      partial.subsText = stackText;
      for (key in subs) {
        if (!stackSubs[key]) stackSubs[key] = subs[key];
      }
      for (key in stackSubs) {
        partial.subs[key] = stackSubs[key];
      }

      stackPartials = stackPartials || {};
      partial.stackPartials = stackPartials;
      for (key in partials) {
        if (!stackPartials[key]) stackPartials[key] = partials[key];
      }
      for (key in stackPartials) {
        partial.partials[key] = stackPartials[key];
      }

      return partial;
    }

    var rAmp = /&/g,
        rLt = /</g,
        rGt = />/g,
        rApos = /\'/g,
        rQuot = /\"/g,
        hChars = /[&<>\"\']/;

    function coerceToString(val) {
      return String((val === null || val === undefined) ? '' : val);
    }

    function hoganEscape(str) {
      str = coerceToString(str);
      return hChars.test(str) ?
        str
          .replace(rAmp, '&amp;')
          .replace(rLt, '&lt;')
          .replace(rGt, '&gt;')
          .replace(rApos, '&#39;')
          .replace(rQuot, '&quot;') :
        str;
    }

    var isArray = Array.isArray || function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    };

  })( exports );
  });

  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  // This file is for use with Node.js. See dist/ for browser files.


  compiler.Template = template.Template;
  compiler.template = compiler.Template;
  var hogan = compiler;

  const card = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("  <div class=\"header inline-flex h-16 pt-2 px-4\">");t.b("\n" + i);t.b("    <div class=\"w-56\">");t.b("\n" + i);t.b("      <div class=\"w-full flex items-center\">");t.b("\n" + i);t.b("        <span class=\"type w-2 h-2 abosolute rounded-full ");t.b(t.v(t.f("color",c,p,0)));t.b("\"></span>");t.b("\n" + i);t.b("        <p class=\"text-md text-gray-700 mx-2\">");t.b(t.v(t.f("type",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"w-full\">");t.b("\n" + i);t.b("        <p class=\"text-sm text-gray-600 pr-2\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"w-24 flex justify-end\">");t.b("\n" + i);t.b("      <div class=\"w-12 h-12 overflow-hidden rounded-full\">");t.b("\n" + i);t.b("        <img class=\"w-full\" src=\"");t.b(t.v(t.f("avatar",c,p,0)));t.b("\" alt=\"\">");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"body px-4 \">");t.b("\n" + i);t.b("    <div class=\"flex h-10 items-center\">");t.b("\n" + i);t.b("      <div class=\"mr-2\">");t.b("\n" + i);t.b("        <i class=\"far fa-calendar-alt\"></i>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"flex text-gray-700\">");t.b("\n" + i);t.b("        <p class=\"text-sm\" >");t.b(t.v(t.f("start",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("        <span class=\"text-sm mx-2\">-</span>");t.b("\n" + i);t.b("        <p class=\"text-sm\">");t.b(t.v(t.f("end",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"footer pb-2 px-4\">");t.b("\n" + i);t.b("    <div class=\"flex justify-between items-center h-10\">");t.b("\n" + i);t.b("      <button data-type=\"button\" type=\"button\" name=\"view\" class=\"flex text-gray-500 items-center\">");t.b("\n" + i);t.b("        <div class=\"mr-2\">");t.b("\n" + i);t.b("          <i class=\"far fa-eye\"></i>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <p class=\"text-sm\">Ver más</p>");t.b("\n" + i);t.b("      </button>");t.b("\n" + i);t.b("      <div class=\"flex text-white\">");t.b("\n" + i);t.b("        <button data-type=\"button\" type=\"button\" name=\"approve\" class=\"flex items-center w-16 bg-green-600 rounded p-1 mr-2\">");t.b("\n" + i);t.b("          <p class=\"text-sm text-center w-full\">aprobar</p>");t.b("\n" + i);t.b("        </button>");t.b("\n" + i);t.b("        <button data-type=\"button\" type=\"button\" name=\"deny\" class=\"flex items-center w-16 bg-red-600 rounded p-1\">");t.b("\n" + i);t.b("          <p class=\"text-sm text-center w-full\">negar</p>");t.b("\n" + i);t.b("        </button>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});

  function Card(solicitud){
    let {start,end,type,color,user,status} = solicitud;
    const element = $(document.createElement('div'));
    const css = ['denied','approved','pending','validating'];
    element.addClass(`solicitud m-4 bg-white ${css[status]} hidden`).append(
      card.render({
        type,
        avatar: `${window.location.origin}/${user.avatar}`,
        name: `${user.firstname} ${user.lastname}`,
        color,
        start,
        end
      })
    );
    const { buttons } = Finder(element);

    const methods = {
      'buttons': { get: ()=>{ return buttons } },
      'element': { get: ()=>{ return element } },
      'off': {
        writable: false,
        value: ()=>{
          element.addClass('hidden');
          buttons.all.forEach((btn)=>{ btn.off(); });
        }
      },
      'on': {
        writable: false,
        value: ()=>{
          element.removeClass('hidden');
          buttons.all.forEach((btn)=>{ btn.on(); });
        }
      },
      'status':{
        get: ()=>{ return status },
        set: (value)=>{
          element.addClass('hidden');
          element.removeClass(css[status]).addClass(css[value]);
          status = value;
        }
      }
    };

    Object.defineProperties(this,methods);

  }

  const Modes = {
    'mine': [
      {approve:false,deny:false},
      {approve:false,deny:false},
      {approve:false,deny:false},
      {approve:false,deny:false},
    ],
    'team': [
      {approve:false,deny:false},
      {approve:false,deny:false},
      {approve:true,deny:true},
      {approve:false,deny:false},
    ],
    'users': [
      {approve:false,deny:false},
      {approve:false,deny:false},
      {approve:false,deny:false},
      {approve:true,deny:true},
    ]
  };

  function Solicitud(solicitud,mode){
    let {status,id} = solicitud;
    const events = new Observer(['status update']);
    const card = new Card(solicitud);
    const methods = {
      'id':{ get: ()=>{ return id } },
      'card': { get: ()=>{return card } },
      'data': { get: ()=>{ return solicitud } },
      'status': {
        get: ()=>{ return status },
        set: (value)=>{
          events.notify('status update',[solicitud,value]);
          status = value;
          let visibility = mode[status];
          visibility = (visibility.approve ? 'removeClass' : 'addClass');
          card.buttons.name.approve.element[visibility]('hidden');
          card.buttons.name.deny.element[visibility]('hidden');
          card.status = status;
          solicitud.status = status;
        }
      },
      'events':{
        writable: false,
        value: {
          on: events.register,
          off: events.unregister
        }
      },
      'on':{
        writable: false,
        value: card.on
      },
      'off':{
        writable: false,
        value: card.off
      }
    };

    Object.defineProperties(this,methods);
    this.status = status;

  }

  function MySolicitud(solicitud){
    Solicitud.call(this,solicitud,Modes['mine']);
  }

  function TeamSolicitud(solicitud){
    Solicitud.call(this,solicitud,Modes['team']);
    if(this.status == 2){
      let solicitud = this;
      const { approve,deny } = this.card.buttons.name;
      approve.events.on('click',function(){ solicitud.status = 3; });
      deny.events.on('click',function(){ solicitud.status = 0; });
    }
  }

  function UsersSolicitud(solicitud){
    Solicitud.call(this,solicitud,Modes['users']);
    if(this.status == 3){
      let solicitud = this;
      const { approve,deny } = this.card.buttons.name;
      approve.events.on('click',function(){ solicitud.status = 1; });
      deny.events.on('click',function(){ solicitud.status = 0; });
    }
  }

  const dataMock = ()=>{
    const list = [];
    for (let owner = 0; owner < 3; owner++) {
      let type = (owner ? (owner == 1 ? 'team' : 'users') : 'mine');
      for (let j = 0; j < 20; j++) {
        let status = (j >= 5 ? (j >= 10 ? (j >= 15 ?  3 : 2) :  1) : 0);
        let data = {
          owner,
          status,
          user: {
            avatar: 'assets/public/img/placeholder.jpeg',
            firstname: 'Cesar '+type,
            lastname: 'Perex'
          },
          type: (!status ? 'denied' : (status == 1 ? 'approved' : (status == 2 ? 'pending' : 'validating' ) ) ),
          start: '10 Aug 2020',
          end: '10 Aug 2020',
          color: 'bg-blue-600'
        };
         list.push(data);
      }
    }
    return list;
  };

  function List(){
    const view = new View({ name:'solicitudes list', element: $('[data-solicitudes="list"]')});
    const solicitudes = [
      [[],[],[],[]],
      [[],[],[],[]],
      [[],[],[],[]],
    ];
    const map = {
      'owner': {
        'mine':0,
        'team': 1,
        'users': 2
      },
      'status': {
        'denied':0,
        'approved':1,
        'pending':2,
        'validating':3
      }
    };
    const state = {
      status: undefined,
      owner: undefined
    };
    const add = (solicitud)=>{
      let {owner,status} = solicitud;
      solicitud = new (owner ? (owner == 1 ? TeamSolicitud : UsersSolicitud) : MySolicitud)(solicitud);
      solicitud.data.index = (solicitudes[owner][status].push(solicitud) - 1);
      solicitud.events.on('status update',function(solicitud,update){
        let {owner,status,index} = solicitud;
        let obj = solicitudes[owner][status][index];
        solicitudes[owner][status][index] = false;
        solicitud.index = (solicitudes[owner][update].push(obj) - 1);
      });
      view.element.append(solicitud.card.element);
    };

    dataMock().forEach(add);

    const methods = {
      'show': {
        writable: false,
        value: (owner,status)=>{
          owner = map.owner[owner];
          status = map.status[status];
          if(owner !== state.owner || status !== state.status){
            if(state.status !== undefined && state.owner !== undefined){
              solicitudes[state.owner][state.status].forEach((solicitud) => {
                if(solicitud){ solicitud.off(); }
              });
            }

            state.owner = owner;
            state.status = status;

            solicitudes[state.owner][state.status].forEach((solicitud) => {
              if(solicitud){ solicitud.on(); }
            });

          }
        }
      },
      'get': {
        writable: false,
        value: ()=>{ return solicitudes; }
      },
      'find': {
        writable: false,
        value: (owner,status,id)=>{
          owner = map.owner[owner];
          status = map.status[status];
          return solicitudes[owner][status].find((s)=>{
            if(s){ return id == s.id }
            return false;
          });
        }
      }
    };

    Object.defineProperties(view,methods);

    return view
  }

  function Solicitudes(){
    return {list: List()}
  }

  function ToolBar$3(){
    const toolbar = new ToolBar('solicitudes');
    const select = toolbar.inputs.type.select;
    const urlSegments = ()=>{ return window.location.pathname.split('/app/dashboard/solicitudes/')[1].split('/'); };

    select.status.events.on('change',function(){
      let path = urlSegments(); path[1] = this.value;
      page_js(`/solicitudes/${path.join('/')}`);
    });
    if(select.owner){
      select.owner.events.on('change',function(){
        let path = urlSegments(); path[0] = this.value;
        page_js(`/solicitudes/${path.join('/')}`);
      });
    }

    toolbar.matchSelectToUrl = (status,owner)=>{
      if(select.status.value != status){
        select.status.off();
        select.status.options.select(status);
        select.status.on();
      }
      if(select.owner && select.owner.value != owner){
        select.owner.off();
        select.owner.options.select(owner);
        select.owner.on();
      }
    };

    return toolbar
  }

  function Solicitudes$1 (){
    const view = new View({ name:'solicitudes', element: $('[data-content="solicitudes"]')});
    const toolbar = ToolBar$3();
    const solicitudes = new Solicitudes();

    const routes = {
      '/solicitudes/*': function(ctx,next){
        if(!(this.state.value == 'solicitudes')){ this.state.value = 'solicitudes'; }
        next();
      },
      '/solicitudes/:owner/:status/:solicitud': function(ctx){
        let { owner, solicitud , status } = ctx.params;
        if(solicitud == 'all'){
          if(!(view.state.value !== 'view all')){ view.state.value = 'view all'; }
          toolbar.matchSelectToUrl(status,owner);
          solicitudes.list.show(owner,status);
        }


      }
    };

    view.routes = [routes];

    view.on = function(){ toolbar.on(); };
    view.off = function(){ toolbar.off(); };


    return view

  }

  const card$1 = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"w-full flex justify-center\">");t.b("\n" + i);t.b("  <div class=\"w-24 my-2 mx-4 rounded-full overflow-hidden\">");t.b("\n" + i);t.b("    <img class=\"w-full\" src=\"");t.b(t.v(t.f("avatar",c,p,0)));t.b("\" alt=\"\">");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\" w-full my-4 px-4 text-center\">");t.b("\n" + i);t.b("  <p class=\"text-sm font-bold my-2\">");t.b(t.v(t.f("area",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("  <p class=\"text-xs  my-2\">");t.b(t.v(t.f("position",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("  <p class=\"text-xs my-2\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\"w-full my-4 px-4 flex justify-center\">");t.b("\n" + i);t.b("  <button class=\"flex justify-center items-center text-sm text-gray-600\" data-type=\"button\" type=\"button\" name=\"profile\">");t.b("\n" + i);t.b("    <i class=\"far fa-eye\"></i>");t.b("\n" + i);t.b("    <p class=\"ml-2\">ver perfil</p>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});

  var si = typeof setImmediate === 'function', tick;
  if (si) {
    tick = function (fn) { setImmediate(fn); };
  } else if (typeof process !== 'undefined' && process.nextTick) {
    tick = process.nextTick;
  } else {
    tick = function (fn) { setTimeout(fn, 0); };
  }

  var NativeCustomEvent = commonjsGlobal.CustomEvent;

  function useNative () {
    try {
      var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
      return  'cat' === p.type && 'bar' === p.detail.foo;
    } catch (e) {
    }
    return false;
  }

  /**
   * Cross-browser `CustomEvent` constructor.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
   *
   * @public
   */

  var customEvent = useNative() ? NativeCustomEvent :

  // IE >= 9
  'function' === typeof document.createEvent ? function CustomEvent (type, params) {
    var e = document.createEvent('CustomEvent');
    if (params) {
      e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
    } else {
      e.initCustomEvent(type, false, false, void 0);
    }
    return e;
  } :

  // IE <= 8
  function CustomEvent (type, params) {
    var e = document.createEventObject();
    e.type = type;
    if (params) {
      e.bubbles = Boolean(params.bubbles);
      e.cancelable = Boolean(params.cancelable);
      e.detail = params.detail;
    } else {
      e.bubbles = false;
      e.cancelable = false;
      e.detail = void 0;
    }
    return e;
  };

  var eventmap = [];
  var eventname = '';
  var ron = /^on/;

  for (eventname in commonjsGlobal) {
    if (ron.test(eventname)) {
      eventmap.push(eventname.slice(2));
    }
  }

  const userRow = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"flex items-center cursor-move border-b border-gray-500 py-2 mx-2 w-full\">");t.b("\n" + i);t.b("  <div class=\"w-8 mr-2 rounded-full overflow-hidden\">");t.b("\n" + i);t.b("    <img class=\"w-full\" src=\"");t.b(t.v(t.f("avatar",c,p,0)));t.b("\" alt=\"\">");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <p class=\"text-gray-700 text-sm mx-2\">");t.b(t.v(t.f("name",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("  <p class=\"text-gray-700 text-sm mx-2\">");t.b(t.v(t.f("position",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}); 
  const card$2 = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");return t.fl(); },partials: {}, subs: {  }});

  var Components = {
    calendar: Calendar$2,
    profile: Profile,
    solicitudes: Solicitudes$1,
  };

  function Menu(){
    const menu = {};

    const elements = {
      content: $('#content'),
      container: $('#menu'),
      toggle: $('[data-menu="toggle"]')
    };

    const { buttons } = Finder(elements.container);

    const toggle = ()=>{
      buttons.all.forEach((btn)=>{ btn[ 'on' ](); });
      elements.content.toggleClass('open');
    };

    const init = ()=>{
      let current = window.location.pathname.split('/app/dashboard/')[1].split('/')[0];
      return (btn)=>{
        let route = btn.element.attr('data-route');
        if(route.split('/')[0] == current){ btn.element.addClass('border-l-2'); }
        btn.events.on('click',function(){
          buttons.all.forEach((btn)=>{ btn.element.removeClass('border-l-2'); });
          this.element.addClass('border-l-2');
          page_js(`/${route}`);
          toggle();
        });
      }
    };

    const methods = {
      'buttons': {
        get: ()=>{ return buttons }
      }
    };

    Object.defineProperties(menu,methods);

    elements.toggle.on('click',toggle);

    buttons.all.forEach(init());

    return menu;

  }

  function App(components){
    return ()=>{
      const state = new State();
      const menu = Menu();

      page_js({window: window });
      page_js.base('/app/dashboard');
      for (let component  in components) {
        components[component] = components[component](components);
        component = components[component];
        state.register({state: component.name, on: component.on, off: component.off});
        component.routes.forEach((routes)=>{ for (let route in routes) { page_js(route,routes[route].bind({state})); } });
      }

      page_js(window.location.pathname);
    }
  }

  $$1(document).ready(App(Components));

}($));
