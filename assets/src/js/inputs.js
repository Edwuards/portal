import { Rules, Test } from './errors.js';
import { Observer } from './helpers.js';

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
            SUBJECT.notify(type,arguments);
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
      value: INPUT
    },
    'on': {
      configurable: true,
      writable: false,
      value: function(){
        EVENTS.on('component.init');
        this.element.trigger('component.init');
      }
    },
    'off': {
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
      get: ()=>{ return this.element.val().trim(); }
    }
  };

  ['component.init','focus','input','blur'].forEach(SUBJECT.event.create);

  SUBJECT.register('component.init',function(){
    let types = SUBJECT.event.get().reduce((a,c)=>{
      if(c != 'component.init'){ a.push(c); }
      return a;
    },[]);
    types.forEach(EVENTS.on);
  })

  Object.defineProperties(this,METHODS);

}

function TextInput(INPUT){
  Input.call(this,INPUT);
  this.element.attr('type','text');

  this.rules.add(Rules.is.notEmtpy);
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
      get:()=>{ return Number(this.element.val()); }
    },
    'max':{
      get: ()=>{ return PROPS.max },
      set: maxMinSetter(true)
    },
    'min':{
      get: ()=>{ return PROPS.min },
      set: maxMinSetter(false)
    }
  }

  Object.defineProperties(this,METHODS);

  this.element.attr('type','number');
  this.max = Number(this.element.attr('max'));
  this.min = Number(this.element.attr('min'));
}

function TextAreaInput(INPUT){
  Input.call(this,INPUT);
  this.rules.add(Rules.is.notEmtpy);
}

function SelectInput(INPUT){
  Input.call(this,INPUT);

  const OPTIONS = {
    add: (option)=>{
      let el = $(document.createElement('option'));
      el.text(option.text).val(option.value);
      this.element.append(el);
    },
    remove: (value)=>{
      this.element.find(`[value="${value}"]`).remove();
    },
    get: ()=>{ return this.element.children(); }
  }

  const METHODS = {
    'options':{
      writable: false,
      value: OPTIONS
    }
  }

  Object.defineProperties(this,METHODS);

}

function DateInput(MONTH,DAY,YEAR){
  Input.call(this,$(document.createElement('input')));

  const DATE = new Date();

  MONTH = new SelectInput(MONTH);
  DAY = new SelectInput(DAY);
  YEAR = new SelectInput(YEAR);

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
        [MONTH,DAY,YEAR].forEach((input)=>{
          input.on();
        });
      }
    },
    'off': {
      writable: false,
      value: function(){
        [MONTH,DAY,YEAR].forEach((input)=>{
          input.off();
        });
      }
    },
    'events': {
      writable: false,
      value: {
        on: (type,fn)=>{
          [MONTH,DAY,YEAR].forEach((input)=>{
            input.events.on(type,fn);
          });
        },
        off: (type)=>{
          [MONTH,DAY,YEAR].forEach((input)=>{
            input.events.off(type);
          });
        },
        unregister: (type,index)=>{
          [MONTH,DAY,YEAR].forEach((input)=>{
            input.events.unregister(type,index);
          });
        }
      }
    },
    'disable':{
      configurable: true,
      writable: true,
      value: function(on){
        [MONTH,DAY,YEAR].forEach((input)=>{
          input.disable(on);
        });
      }
    },
    'value': {
      configurable: true,
      get: ()=>{ return DATE; }
    }
  };

}

export { SelectInput }
