import { Rules, Test } from '../errors.js';
import { Observer } from '../helpers.js';
import flatpickr from 'flatpickr';
import  Spanish  from 'flatpickr/dist/l10n/es.js';

const Helper = {
  setDate: (inputs,date)=>{
    if(inputs.date){
      for (let input in inputs.date){
        inputs.date[input].picker.setDate(date);
      }
    }
    if(inputs.time){
      for (let input in inputs.time){
        inputs.time[input].picker.setDate(date);
      }
    }
  },
  pickerUnfocus: (inputs)=>{
    if(inputs.date){
      for (let input in inputs.date){
        inputs.date[input].events.on('click',function(){ this.close(); });
      }
    }
    if(inputs.time){
      for (let input in inputs.time){
        inputs.time[input].events.on('click',function(){ this.close(); });
      }
    }
  }
}



function Finder(container){
  const found = {
    buttons: { name: {}, all: [] },
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
      else{
        found.inputs.type[type][name] = el;
      }
    }
    else{
      found.buttons.name[name] = new Button(el);
      found.buttons.all.push(found.buttons.name[name]);
    }




  });

  for(let type in found.inputs.type){
    for (let input in found.inputs.type[type]) {
      let name = input;
      if(type == 'date'){
        input = found.inputs.type.date[input];
        found.inputs.type.date[name] = new DateInput(input);
      }
      else if(type == 'time'){
        input = found.inputs.type.time[input];
        found.inputs.type.time[name] = new TimeInput(input);
      }
      else if(type == 'textarea' || type == 'text' || type == 'number'){
        input = found.inputs.type[type][input];
        found.inputs.type[type][name] = new Input(input);
      }
      else if(type == 'select'){
        input = found.inputs.type[type][input];
        found.inputs.type[type][name] = new SelectInput(input);
      }
      else if(type == 'image'){
        input = found.inputs.type.image[input];
        found.inputs.type.image[name] = new ImageInput(input.file,input.upload,input.preview);
      }
      found.inputs.all.push(found.inputs.type[type][name]);
    }
  }


  return found;
}

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
      if(type == 'click.d'){ debugger; }
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
      configurable: true,
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
      value: OPTIONS
    }
  };

  Object.defineProperties(this,METHODS);
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
    data: undefined,
    changed: false,
  };
  const METHODS = {
    'changed': {
      get: ()=>{ return PROPS.changed; }
    },
    'value': {
      get:()=>{ return PROPS.file }
    },
    'src':{
      get: ()=>{ return PROPS.data; },
      set: (value)=>{ PROPS.img.attr('src',value); }
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
    INSTANCE.element.trigger('imgReady');
  };

  BUTTON.events.on('click',function(){
    INSTANCE.element.val('');
    INSTANCE.element.trigger('click');
  });

  this.events.on('change',function(){
    PROPS.changed = true;
    PROPS.file = this.element[0].files[0];
    PROPS.reader.readAsDataURL(PROPS.file);
  });

}

function DateInput(INPUT){
  const PICKER = flatpickr(INPUT,{
    locale: Spanish,
    dateFormat: 'j M Y',
    defaultDate: new Date(Date.now()),
    disableMobile: true
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
          e = e.target;
          let search = true, found = false;
          while(search){
            if(e.tagName !== 'BODY'){
              found = e.classList.toString().indexOf('flatpickr') != -1
              if(found){ search = false};
            }
            else{
              search = false;
            }
            e = e.parentElement;
          }
          if(!found){ PICKER.close(); $(document).off('click.exitPicker'); }
        });
      }
    },
    'value':{
      set: (date)=>{ PICKER.setDate(date); },
      get:()=>{ return PICKER.formatDate(PICKER.selectedDates[0],'Y-m-d'); }
    }
  }

  Object.defineProperties(this,METHODS);

  this.events.on('click',this.close);

}

function TimeInput(INPUT){
  const PICKER = flatpickr(INPUT,{
    enableTime: true,
    noCalendar: true,
    locale: Spanish,
    dateFormat: 'h:i K',
    defaultDate: '10:00',
    disableMobile: true
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
      set:(value)=>{ PICKER.setDate(date); },
      get:()=>{ return PICKER.formatDate(PICKER.selectedDates[0],'H:i:s'); }
    }
  }

  Object.defineProperties(this,METHODS);

  this.events.on('click',this.close);
}


const Types = {
  'time':TimeInput,
  'date':DateInput,
  'select':SelectInput,
  'image':ImageInput,
  'button':Button,
  'input':Input
};

export { Finder, Types }
