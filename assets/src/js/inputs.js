import { Rules, Test } from './errors.js';
import { Observer } from './helpers.js';
import flatpickr from 'flatpickr';
import  Spanish  from 'flatpickr/dist/l10n/es.js';


function EventHandler(element,events){
  const INSTANCE = this;
  const OBSERVER = new Observer(events ? events : []);
  const EVENTS = {
    on: (type)=>{
      if(PROPS.alive && !PROPS.events[type]){
        PROPS.events[type] = true;
        let register = (type)=>{
          return function(){
            INSTANCE.element.off(type);
            OBSERVER.notify(type,[arguments]);
            INSTANCE.element.on(type,register(type));
          }
        };
        INSTANCE.element.on(type,register(type));
      }
    },
    off: (type)=>{
      PROPS.events[type] = false;
      INSTANCE.element.off(type);
    }
  };

  const PROPS = {
    events: {},
    alive: false,
    element: element
  };
  const METHODS = {
    'element': {
      get: ()=>{ return PROPS.element; }
    },
    'on':{
      configurable: true,
      writable: false,
      value: ()=>{
        PROPS.alive = true;
        OBSERVER.event.keys().forEach(EVENTS.on);
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        PROPS.alive = false;
        OBSERVER.event.keys().forEach(EVENTS.off);
      }
    },
    'events':{
      writable: false,
      value: {
        on: (type,fn)=>{
          if(!OBSERVER.event.exist(type)){ OBSERVER.event.create(type); }
          let index = OBSERVER.register(type,fn.bind(INSTANCE));
          EVENTS.on(type);
          return index;
        },
        off: (type,id)=>{
          let registered = OBSERVER.event.get(type);
          if(id == undefined){
            registered.forEach((id)=>{ OBSERVER.unregister(type,id); });
          }
          else{
            OBSERVER.unregister(type,id);
          }
        }
      }
    }
  };

  Object.defineProperties(this,METHODS);
}

function Button(BUTTON){
  EventHandler.call(this,BUTTON);
}

function Input(INPUT){

  let jquery = INPUT instanceof window.$;
  let test = Rules.is.instanceOfAny(
    (jquery ? INPUT[0] : INPUT),
    [HTMLInputElement,HTMLSelectElement,HTMLTextAreaElement]
  );

  if(!test.passed){ throw test.error; }
  EventHandler.call(this,INPUT)

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

  const INSTANCE = this;

  const PROPS = {};

  const METHODS = {
    'parent':{
      get: ()=>{
        if(!PROPS.parent){ PROPS.parent = INPUT.parent(); }
        return PROPS.parent;
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

  Object.defineProperties(this,METHODS);
}

function DateInput(INPUT){
  const PICKER = flatpickr(INPUT,{
    locale: Spanish,
    dateFormat: 'j M Y',
    defaultDate: new Date(Date.now()),
  });

  PICKER.config.onClose.push(function(){
    $(document).off('click.exitPicker');
  })

  Input.call(this,INPUT);

  const METHODS = {
    'picker':{
      get:()=>{ return PICKER; }
    },
    'close': {
      writable: false,
      value: ()=>{
        $(document).on('click.exitPicker',function(e){
          let close = e.target.classList.toString().indexOf('flatpickr') == -1;
          if(close){ PICKER.close(); $(document).off('click.exitPicker'); }
        });
      }
    },
    'value':{
      get:()=>{ return PICKER.formatDate(PICKER.selectedDates[0],'Y-m-d'); }
    }
  }

  Object.defineProperties(this,METHODS);

}

function TimeInput(INPUT){
  const PICKER = flatpickr(INPUT,{
    enableTime: true,
    noCalendar: true,
    locale: Spanish,
    dateFormat: 'h:i K',
    defaultDate: '10:00',
  });

  PICKER.config.onClose.push(function(){
    $(document).off('click.exitPicker');
  });

  Input.call(this,INPUT);

  const METHODS = {
    'picker':{
      get:()=>{ return PICKER; }
    },
    'close': {
      writable: false,
      value: ()=>{
        $(document).on('click.exitPicker',function(e){
          let close = e.target.classList.toString().indexOf('flatpickr') == -1;
          if(close){ PICKER.close(); $(document).off('click.exitPicker'); }
        });
      }
    },
    'value':{
      get:()=>{ return PICKER.formatDate(PICKER.selectedDates[0],'H:i:s'); }
    }
  }

  Object.defineProperties(this,METHODS);

}

export {
  TimeInput,
  DateInput,
  Button,
  Input
}
