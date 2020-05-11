import { Rules, Test } from './errors.js';
import { Observer } from './helpers.js';

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
  }

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
        return DATE.toJSON().slice(0, 19).replace('T', ' ');
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

    for(var i = 1900; i <= 2021; i++){ i; YEAR.options.add({text:i,value:i}); }
    YEAR.options.select('2020');
    MONTH.events.on('change',function(){
      let days = {}
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
          else{ DAY.options.add({text:days.current,value:days.current}); }
          add--;
        }
      }
      else{
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
  }

  Object.defineProperties(this,METHODS);

  PROPS.reader.onload = (e)=>{
    PROPS.img.attr('src',e.target.result);
    PROPS.data = e.target.result;
  }

  BUTTON.events.on('click',function(){
    INSTANCE.element.val('');
    INSTANCE.element.trigger('click');
  });

  this.events.on('change',function(){
    PROPS.file = this.element[0].files[0];
    PROPS.reader.readAsDataURL(PROPS.file);
  })

}

function StatusInput(INPUT,STATUS){

  SelectInput.call(this,INPUT);

  this.events.on('change',function(){
    let value = Number(this.value);
    STATUS.removeClass('bg-yellow-500 bg-green-500 bg-red-500');
    if(value == 1){ STATUS.addClass('bg-yellow-500'); }
    if(value == 2){ STATUS.addClass('bg-green-500'); }
    if(value == 0){ STATUS.addClass('bg-red-500'); }
  });

}

export {
  TimeInput,
  DateInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  NumberInput,
  ImageInput,
  StatusInput,
  Input,
  Button
}
