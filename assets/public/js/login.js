(function ($$1) {
  'use strict';

  $$1 = $$1 && Object.prototype.hasOwnProperty.call($$1, 'default') ? $$1['default'] : $$1;

  function base_url(url){
    return `${window.location.origin}/${url}`;
  }
  const Services = {};
  Services.get = {};
  Services.get.form = (name,fn,sync)=>{
    let settings = {
      url: base_url(`app/forms`),
      method: 'post',
      data:{ name },
      async: sync ? sync : false,
      success:fn
    };

    $.ajax(settings);

  };
  Services.get.table = (name,fn)=>{
    let settings = {
      url: base_url(`tables/get/${name}`),
      async: false,
      success:fn
    };

    $.ajax(settings);

  };
  Services.get.user = (data,fn)=>{
    let settings = {
      url: base_url(`users/get`),
      data: data,
      method: 'post',
      async: true,
      success: fn
    };

    $.ajax(settings);
  };
  Services.get.aviso = (data,fn)=>{
    let settings = {
      url: base_url(`permisions/get`),
      data: data,
      method: 'post',
      async: true,
      success: fn
    };

    $.ajax(settings);
  };

  Services.update = {};
  Services.update.aviso = (data,fn)=>{
    let settings = {
      url: base_url(`permisions/update`),
      data: data,
      method: 'post',
      async: true,
      success: fn
    };

    $.ajax(settings);
  };

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
      get: ()=>{ return Object.keys(Events); }
    };

    this.notify = (event,update)=>{
      let test = Rules.is.defined(event,Events);
      if(!test.passed){ throw test.error; }
      Events[event].forEach((sub)=>{ sub.notify.apply(null,update); });
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

    this.log = ()=>{ console.log(Events); };

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

  function Button(BUTTON){

    const SUBJECT = new Observer();

    const INSTANCE = this;

    const EVENTS = {
      state: {},
      on: (type)=>{
        if(!EVENTS.state[type]){
          EVENTS.state[type] = true;
          let update = (type)=>{
            return function(){
              INSTANCE.element.off(type);
              SUBJECT.notify(type,[arguments]);
              INSTANCE.element.on(type,update(type));
            }
          };
          INSTANCE.element.on(type,update(type));
        }
      },
      off: (type)=>{
        EVENTS.state[type] = false;
        INSTANCE.element.off(type);
      }
    };

    const METHODS = {
      'element': {
        writable: false,
        value: BUTTON
      },
      'on': {
        configurable: true,
        writable: false,
        value: function(){
          SUBJECT.event.get().forEach(EVENTS.on);
        }
      },
      'off': {
        configurable: true,
        writable: false,
        value: ()=>{
          SUBJECT.event.get().forEach(EVENTS.off);
        }
      },
      'events': {
        configurable: true,
        writable: false,
        value: {
          on: (type,fn)=>{
            if(SUBJECT.event.get().indexOf(type) == -1){ SUBJECT.event.create(type); }
            let index = SUBJECT.register(type,fn.bind(INSTANCE));
            EVENTS.on(type);
            return index;
          },
          off: EVENTS.off,
          unregister: SUBJECT.unregister
        }
      },
    };

    ['click'].forEach(SUBJECT.event.create);

    Object.defineProperties(this,METHODS);

  }

  function Input(INPUT){

    let jquery = INPUT instanceof window.$;
    let test = Rules.is.instanceOfAny(
      (jquery ? INPUT[0] : INPUT),
      [HTMLInputElement,HTMLSelectElement,HTMLTextAreaElement]
    );

    if(!test.passed){ throw test.error; }

    const TEST = {
      rules: [],
      map: {},
      addRule: (rule)=>{
        TEST.map[rule.name] = TEST.rules.push([rule.test,rule.args]) - 1;
      },
      removeRule: (name)=>{
        let index = TEST.map[name];
        if(index !== undefined){
          TEST.rules  = TEST.rules.reduce((a,c,i)=>{
            if(i !== index){ a.push(c); }
            return a;
          },[]);
        }
      },
      run: ()=>{
        let rules = TEST.rules.map((check)=>{
          let copy = [check[0],[]];
          if(Array.isArray(check[1])){ copy[1] = copy[1].concat(check[1]); }
          copy[1].unshift(INSTANCE.value);
          return copy;
        });

        return Test(rules);
      }
    };

    const SUBJECT = new Observer();

    const INSTANCE = this;

    const EVENTS = {
      state: {},
      on: (type)=>{
        if(!EVENTS.state[type]){
          EVENTS.state[type] = true;
          let update = (type)=>{
            return function(){
              INSTANCE.element.off(type);
              SUBJECT.notify(type,[arguments]);
              INSTANCE.element.on(type,update(type));
            }
          };
          INSTANCE.element.on(type,update(type));
        }
      },
      off: (type)=>{
        EVENTS.state[type] = false;
        INSTANCE.element.off(type);
      }
    };

    const PROPS = {};

    const METHODS = {
      'element': {
        writable: false,
        value: INPUT
      },
      'parent':{
        get: ()=>{
          if(!PROPS.parent){ PROPS.parent = INPUT.parent(); }
          return PROPS.parent;
        }
      },
      'on': {
        configurable: true,
        writable: false,
        value: function(){
          SUBJECT.event.get().forEach(EVENTS.on);
        }
      },
      'off': {
        configurable: true,
        writable: false,
        value: ()=>{
          SUBJECT.event.get().forEach(EVENTS.off);
        }
      },
      'events': {
        configurable: true,
        writable: false,
        value: {
          on: (type,fn)=>{
            if(SUBJECT.event.get().indexOf(type) == -1){ SUBJECT.event.create(type); }
            let index = SUBJECT.register(type,fn.bind(INSTANCE));
            EVENTS.on(type);
            return index;
          },
          off: EVENTS.off,
          unregister: SUBJECT.unregister
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
          add: TEST.addRule,
          remove: TEST.removeRule,
          test: TEST.run
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

    ['focus','input','blur'].forEach(SUBJECT.event.create);

    Object.defineProperties(this,METHODS);

  }

  function TextInput(INPUT){
    Input.call(this,INPUT);
    this.element.attr('type','text');

    this.rules.add('not empty',Rules.is.notEmtpy);
  }

  function PasswordInput(INPUT){
    Input.call(this,INPUT);
    this.element.attr('type','password');
  }

  function NumberInput(INPUT){
    Input.call(this,INPUT);

    const PROPS = {};

    function maxMinSetter(max){
      let name = `${max ? 'max' : 'min'} number`;
      let test = max ? Rules.is.lessThan : Rules.is.greaterThan;
      return function(value){
        PROPS[max ? 'max' : 'min'] = value;
        let args = max ? [(PROPS.max+1)] : [(PROPS.min-1)];
        this.element.attr((max ? 'max' : 'min'),value);
        this.rules.remove(name);
        this.rules.add({ name, test, args });
      }
    }

    const METHODS = {
      'value':{
        get:()=>{ return Number(this.element.val()); },
        set: (value)=>{
          value = Number(value);
          if(!isNaN(value)){
            this.element.val(value);
            this.element.trigger('input');
          }
        }
      },
      'max':{
        get: ()=>{ return PROPS.max },
        set: maxMinSetter(true)
      },
      'min':{
        get: ()=>{ return PROPS.min },
        set: maxMinSetter(false)
      }
    };

    Object.defineProperties(this,METHODS);

    this.element.attr('type','number');
    this.max = Number(this.element.attr('max'));
    this.min = Number(this.element.attr('min'));
  }

  function TextAreaInput(INPUT){
    Input.call(this,INPUT);
    this.rules.add('not empty',Rules.is.notEmtpy);
  }

  function SelectInput(INPUT){
    Input.call(this,INPUT);

    const OPTIONS = {
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

    const METHODS = {
      'options':{
        writable: false,
        value: OPTIONS
      }
    };

    Object.defineProperties(this,METHODS);

  }

  function DateInput(MONTH,DAY,YEAR){
    Input.call(this,$(document.createElement('input')));

    MONTH = new SelectInput(MONTH);
    DAY = new SelectInput(DAY);
    YEAR = new SelectInput(YEAR);

    const GROUP = [MONTH,DAY,YEAR];
    const DATE = new Date();

    const METHODS = {
      'month':{
        get: ()=>{ return MONTH }
      },
      'day':{
        get: ()=>{ return DAY }
      },
      'year':{
        get: ()=>{ return YEAR }
      },
      'on': {
        writable: false,
        value: function(){
          GROUP.forEach((input)=>{
            input.on();
          });
        }
      },
      'off': {
        writable: false,
        value: function(){
          GROUP.forEach((input)=>{
            input.off();
          });
        }
      },
      'events': {
        writable: false,
        value: {
          on: (type,fn)=>{
            GROUP.forEach((input)=>{
              input.events.on(type,fn);
            });
          },
          off: (type)=>{
            GROUP.forEach((input)=>{
              input.events.off(type);
            });
          },
          unregister: (type,index)=>{
            GROUP.forEach((input)=>{
              input.events.unregister(type,index);
            });
          }
        }
      },
      'disable':{
        configurable: true,
        writable: true,
        value: function(on){
          GROUP.forEach((input)=>{
            input.disable(on);
          });
        }
      },
      'format':{
        get: ()=>{
          let date = DATE.toLocaleDateString('es-MX').split('/').reduce((a,c)=>{ if(c.length == 1){ c = '0'+c; } return a = c+'-'+a; });
          return `${date} ${DATE.toString().slice(16,24)}`;
        }
      },
      'value': {
        configurable: true,
        set: (unixTimeStamp)=>{
          let test = Rules.is.number(unixTimeStamp);
          if(!test.passed){ throw test.error; }
          DATE.setTime(unixTimeStamp * 1000);

          GROUP.forEach((input)=>{
            let attr = input.element.attr('name');
            let fn = (attr == 'month' ? 'getMonth' : (attr == 'day' ? 'getDate' : 'getFullYear'));
            input.value = DATE[fn]();
          });

        },
        get: ()=>{ return DATE; }
      }
    };

    Object.defineProperties(this,METHODS);

    GROUP.forEach((input)=>{
      let attr = input.element.attr('name');
      let fn = (attr == 'month' ? 'setMonth' : (attr == 'day' ? 'setDate' : 'setFullYear'));
      input.events.on('change',function(){
        DATE[fn](Number(this.value));
      });
    });

    {
      let date = new Date();
      let year = Number(date.getFullYear());
      let month = date.getMonth();
      let days = new Date(year,(month+1),0).getDate();

      for(let month = 0; month < 12; month++){
        let text = new Intl.DateTimeFormat('es-MX',{month:'long'}).format(new Date(year,month));
        MONTH.options.add({text,value:month});
      }
      MONTH.options.select(month);
      MONTH.element.data('days',days);

      for(var i = 1; i <= days; i++){ DAY.options.add({text:i,value:i}); }
      DAY.options.select(date.getDate());

      for(var i = 1900; i <= 2021; i++){ YEAR.options.add({text:i,value:i}); }
      YEAR.options.select('2020');
      MONTH.events.on('change',function(){
        let days = {};
        days.current = Number(this.element.data('days'));
        days.update = new Date();
        days.update.setMonth(Number(this.value)+1);
        days.update.setDate(0);
        days.update = days.update.getDate();
        let add = days.update > days.current;

        if(add){
          add = days.update - days.current;
          while(add){
            days.current++;
            let exist = DAY.options.find(days.current);
            if(exist){ exist.removeClass('hidden'); }
            else { DAY.options.add({text:days.current,value:days.current}); }
            add--;
          }
        }
        else {
          DAY.options.get().each(function(i){
            if((i+1) > days.update){ $(this).addClass('hidden'); }
          });
        }

        DAY.options.select(1);
        this.element.data('days',days.update);
      });

    }

  }

  function TimeInput(HOUR,MINUTES,TIME){
    Input.call(this,$(document.createElement('input')));

    HOUR = new NumberInput(HOUR);
    MINUTES = new NumberInput(MINUTES);
    TIME = new SelectInput(TIME);

    const GROUP = [HOUR,MINUTES,TIME];

    const METHODS = {
      'hour':{
        get: ()=>{ return HOUR }
      },
      'minute':{
        get: ()=>{ return MINUTES }
      },
      'time':{
        get: ()=>{ return TIME }
      },
      'on': {
        writable: false,
        value: function(){
          GROUP.forEach((input)=>{ input.on(); });
        }
      },
      'off': {
        writable: false,
        value: function(){
          GROUP.forEach((input)=>{ input.off(); });
        }
      },
      'events': {
        writable: false,
        value: {
          on: (type,fn)=>{
            GROUP.forEach((input)=>{ input.events.on(type,fn); });
          },
          off: (type)=>{
            GROUP.forEach((input)=>{ input.events.off(type); });
          },
          unregister: (type,index)=>{
            GROUP.forEach((input)=>{
              input.events.unregister(type,index);
            });
          }
        }
      },
      'disable':{
        configurable: true,
        writable: true,
        value: function(on){
          GROUP.forEach((input)=>{ input.disable(on); });
        }
      },
      'value': {
        configurable: true,
        get: ()=>{
          return {
            hour: (TIME.value == 'pm' ? (HOUR.value + 12) : HOUR.value),
            minutes: MINUTES.value
          }
        }
      }
    };

    Object.defineProperties(this,METHODS);

    ['am','pm'].forEach((val)=>{ TIME.options.add({value: val,text: val.toUpperCase() }); });

  }

  function ImageInput(INPUT,BUTTON,IMG){
    Input.call(this,INPUT);
    BUTTON = new Button(BUTTON);
    const INSTANCE = this;
    const ON = INSTANCE.on;
    const OFF = INSTANCE.off;
    const PROPS = {
      img: IMG,
      reader: new FileReader(),
      file: undefined,
      data: undefined
    };
    const METHODS = {
      'value': {
        get:()=>{ return PROPS.file }
      },
      'on': {
        configurable: true,
        writable: false,
        value: function(){
          ON.call(this);
          BUTTON.on();
        }
      },
      'off': {
        configurable: true,
        writable: false,
        value: function(){
          OFF.call(this);
          BUTTON.off();
          IMG.attr('src','https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png');
        }
      }
    };

    Object.defineProperties(this,METHODS);

    PROPS.reader.onload = (e)=>{
      PROPS.img.attr('src',e.target.result);
      PROPS.data = e.target.result;
    };

    BUTTON.events.on('click',function(){
      INSTANCE.element.val('');
      INSTANCE.element.trigger('click');
    });

    this.events.on('change',function(){
      PROPS.file = this.element[0].files[0];
      PROPS.reader.readAsDataURL(PROPS.file);
    });

  }

  function StatusInput(INPUT,STATUS){


    SelectInput.call(this,INPUT);

    let METHODS = {
      'update': {
        writable: false,
        value: function(){
          let value = Number(this.value);
          this.options.select(this.value);
          STATUS.removeClass('bg-yellow-500 bg-green-500 bg-red-500');
          if(value == 1){ STATUS.addClass('bg-green-500'); }
          if(value == 2){ STATUS.addClass('bg-yellow-500'); }
          if(value == 0){ STATUS.addClass('bg-red-500'); }
        }
      },
      'value':{
        get: ()=>{ return this.element.val(); },
        set: (value)=>{
          this.element.val(value);
          this.update();
        }
      }
    };

    Object.defineProperties(this,METHODS);

    this.events.on('change',this.update);

  }

  const Helper = {
    notEmptyText: (inputs)=>{
      for(let input in inputs){
        input = inputs[input];
        input.events.on('input',function(){
          let value = this.value;
          this.parent[value != '' ? 'addClass' : 'removeClass']('active');
        });
      }
    },
    notEmptyNumber: (inputs)=>{
      for(let input in inputs){
        input = inputs[input];
        input.events.on('input',function(){
          let value = this.value;
          if(!this.parent.hasClass('active')){ this.parent.addClass('active'); }
          this.value = (value > this.max ? this.max : ( value < this.min ? this.min : value ) );
        });
      }
    },
    collectValues: (inputs)=>{
      const MAP = {};
      for (let type in inputs) {
        for(let name in inputs[type]){
          MAP[name] = inputs[type][name][type == 'date' ? 'format': 'value'];
        }
      }
      return MAP;
    },
  };

  function Form(data){

    const FORM = $(document.createElement('form'));
    const INSTANCE = this;
    const BUTTONS = {
      all: [],
      name: {}
    };
    const INPUTS = {
      all: [],
      type:{}
    };
    const SUBJECT = new Observer(['open','close','send','response','error']);
    const PROPS = {
      alive:false,
      title:data.title,
      name:data.name,
      url: data.url,
      async: data.async ? data.async : true,
      method: data.method ? data.method : 'POST',
      json: data.json ? data.json : false
    };
    const OPEN = ()=>{
      INPUTS.all.forEach((input)=>{ input.on(); });
      BUTTONS.all.forEach((btn)=>{ btn.on(); });
      PROPS.alive = true;
      SUBJECT.notify('open',[true]);
      return FORM
    };
    const CLOSE = ()=>{
      FORM[0].reset();
      INPUTS.all.forEach((input)=>{ input.off(); });
      BUTTONS.all.forEach((btn)=>{ btn.off(); });
      PROPS.alive = false;
      SUBJECT.notify('close',[true]);

    };
    const SEND = (message)=>{
      SUBJECT.notify('send',[message]);
      if(!message.error){
        $.ajax({
          url: `${window.location.origin}/${PROPS.url}`,
          method: PROPS.method,
          data: PROPS.json ? JSON.stringify(message.data) : message.data,
          async: PROPS.async,
          success: (response)=>{ SUBJECT.notify('response',[response]); },
          error: (response)=>{ SUBJECT.notify('error',[response]); }
        });
      }
    };


    FORM.html(data.html);

    FORM.attr('name',data.name).addClass('w-full h-full');

    FORM.find('[data-type]').each(function(){
      let el = $(this),
      type = el.attr('data-type'),
      name = el.attr('name'),
      group = el.attr('data-group');

      if(type !== 'button'){
        if(!INPUTS.type[type]){ INPUTS.type[type] = {}; }
        if(group){
          if(!INPUTS.type[type][group]){ INPUTS.type[type][group] = {}; }
          INPUTS.type[type][group][name] = el;
        }
        else {
          if(type == 'text'){
            el = new TextInput(el);
          }
          else if(type == 'number'){
            el = new NumberInput(el);
          }
          else if(type == 'select'){
            el = new SelectInput(el);
          }
          else if(type == 'textarea'){
            el = new TextAreaInput(el);
          }
          else if(type == 'password'){
            el = new PasswordInput(el);
          }

          INPUTS.type[type][name] = el;
        }
      }
      else {
        BUTTONS.name[name] = new Button(el);
        BUTTONS.all.push(BUTTONS.name[name]);
      }
    });

    for(let type in INPUTS.type){
      for (let input in INPUTS.type[type]) {
          let name = input;
          if(type == 'date'){
            input = INPUTS.type.date[input];
            INPUTS.type.date[name] = new DateInput(input.month,input.day,input.year);
          }
          if(type == 'time'){
            input = INPUTS.type.time[input];
            INPUTS.type.time[name] = new TimeInput(input.hour,input.minutes,input.time);
          }
          if(type == 'image'){
            input = INPUTS.type.image[input];
            INPUTS.type.image[name] = new ImageInput(input.file,input.upload,input.preview);
          }
          if(type == 'status'){
            input = INPUTS.type.status[input];
            INPUTS.type.status[name] = new StatusInput(input.status,input.indicator);
          }
          INPUTS.all.push(INPUTS.type[type][name]);
        }
      }

    const METHODS = {
      'element': {
        get:()=>{ return FORM }
      },
      'name':{
        get:()=>{ return PROPS.name; }
      },
      'alive':{
        get:()=>{ return PROPS.alive; }
      },
      'title':{
        set:(title)=>{ PROPS.title = title;},
        get:()=>{ return PROPS.title; }
      },
      'open': {
        configurable: true,
        get:()=>{ return OPEN; },
        set:(open)=>{
          Object.defineProperty(INSTANCE,'open',{
            configurable: false,
            writable: false,
            value:function(){
              let form = OPEN();
              open.apply(INSTANCE,arguments);
              return form;
            }
          });
        }
      },
      'close': {
        configurable: true,
        get:()=>{ return CLOSE; },
        set:(close)=>{
          Object.defineProperty(INSTANCE,'close',{
            configurable: false,
            writable: false,
            value:()=>{
              CLOSE();
              close.call(INSTANCE);
            }
          });
        }
      },
      'send': {
        configurable: true,
        set:(send)=>{
          Object.defineProperty(INSTANCE,'send',{
            configurable: false,
            writable: false,
            value:function(){
              SEND(send.apply(INSTANCE,arguments));
            }
          });
        }
      },
      'buttons':{
        writable: false,
        value: BUTTONS.name,
      },
      'inputs':{
        writable: false,
        value: INPUTS.type,
      },
      'events':{
        writable: false,
        value: (()=>{
          const OBJ = {};
          Object.defineProperties(OBJ,{
            'on':{ get: ()=>{ return SUBJECT.register } },
            'off':{ get: ()=>{ return SUBJECT.unregister } },
          });
          return OBJ
        })()
      },
      'disable': {
        writable: false,
        value: (toggle)=>{
          INPUTS.all.forEach((input)=>{ input.disable(toggle); });
        }
      }
    };

    Object.defineProperties(this,METHODS);
  }

  function loginInit(){
    let Login = undefined;
    Services.get.form('users/login',function(html){
      Login = new Form({
        title: 'Login',
        name: 'login',
        html: html,
        url: 'users/login',
      });

      let close = undefined;
      Login.open = function(){
        close = this.buttons.send.events.on('click',Login.send);
        Helper.notEmptyText(this.inputs.text);
        Helper.notEmptyText(this.inputs.password);
      };

      Login.send = function(){
        $('[data="error"]').text('');
        Login.buttons.send.events.unregister('click',close);

        return {error: false, data: Helper.collectValues(this.inputs) };
      };

      Login.events.on('response',function(response){
        if(response.error){
          close = Login.buttons.send.events.on('click',Login.send);
          $('[data="error"]').text(response.data);
        }
        else {
          window.location.href = `${window.location.origin}/app/dashboard`;
        }
      });

    });

    return Login
  }

  const Login = loginInit();
  $$1(document).ready(function(){
    $$1('#login').append(Login.open());
  });

}($));
