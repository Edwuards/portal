import { Rules, Test } from '../errors.js';
import { Observer } from '../helpers.js';
import flatpickr from 'flatpickr';
import  Spanish  from 'flatpickr/dist/l10n/es.js';

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
  'checkbox':CheckBoxInput
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
      else{
        found.inputs.type[type][name] = el;
      }
    }
    else{
      el = new Button(el);
      if(group){
        if(!found.buttons.group[group]){ found.buttons.group[group] = {}; }
        found.buttons.group[group][name] = el;
      }
      else{
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
          else{
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
  EventHandler.call(this,input)

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

function CheckBoxInput(input){
  Input.call(this,input);
  const methods = {
    'checked': {
      get: ()=>{
        return this.element[0].checked
      }
    }
  }
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
      get:()=>{ return props.data }
    },
    'file': {
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
  })

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
              found = e.classList.toString().indexOf('flatpickr') != -1
              if(found){ search = false};
            }
            else{
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
  }

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
  }

  Object.defineProperties(this,methods);

  this.events.on('click',this.close);
}


export { Finder, Types }
