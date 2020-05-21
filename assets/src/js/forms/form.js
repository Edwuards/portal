import { Observer } from '../helpers.js';
import * as Inputs from '../inputs.js';

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
        inputs.date[input].events.on('focus',function(){ this.close(); });
      }
    }
    if(inputs.time){
      for (let input in inputs.time){
        inputs.time[input].events.on('focus',function(){ this.close(); });
      }
    }
  }
}

function Form(data){
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
    element:undefined,
    alive:false,
    title: undefined,
    name:data.name,
    url: data.url,
    async: data.async ? data.async : true,
    method: data.method ? data.method : 'POST',
    json: data.json ? data.json : false
  };
  const OPEN = ()=>{
    if(typeof PROPS.init == 'function' ){ PROPS.init.call(INSTANCE); PROPS.init = true; }
    INPUTS.all.forEach((input)=>{ input.on(); });
    BUTTONS.all.forEach((btn)=>{ btn.on(); });
    PROPS.alive = true;
    SUBJECT.notify('open',[true]);
    return PROPS.element
  };
  const CLOSE = ()=>{
    PROPS.element[0].reset();
    PROPS.element.detach();
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
  }

  PROPS.title = `
    <span class="w-2 h-2 abosolute mx-2 rounded-full bg-teal-600"></span>
    <p>${data.title}</p>
  `;
  $(document).ready(function(){
    PROPS.element = $(`form[name="${data.name}"]`);
    PROPS.element.find('[data-type]').each(function(){

      let el = $(this),
      type = el.attr('data-type'),
      name = el.attr('name');
      if(type !== 'button'){
        if(!INPUTS.type[type]){ INPUTS.type[type] = {}; }
        INPUTS.type[type][name] = el;
      }
      else{
        BUTTONS.name[name] = new Inputs.Button(el);
        BUTTONS.all.push(BUTTONS.name[name]);
      }
    });

    for(let type in INPUTS.type){
      for (let input in INPUTS.type[type]) {
        let name = input;
        if(type == 'date'){
          input = INPUTS.type.date[input];
          INPUTS.type.date[name] = new Inputs.DateInput(input);
        }
        else if(type == 'time'){
          input = INPUTS.type.time[input];
          INPUTS.type.time[name] = new Inputs.TimeInput(input);
        }
        else if(type == 'textarea' || type == 'text'){
          input = INPUTS.type[type][input];
          INPUTS.type[type][name] = new Inputs.Input(input);
        }
        INPUTS.all.push(INPUTS.type[type][name]);
      }
    }

  });

  const METHODS = {
    'element': {
      get:()=>{ return PROPS.element }
    },
    'name':{
      get:()=>{ return PROPS.name; }
    },
    'alive':{
      get:()=>{ return PROPS.alive; }
    },
    'title':{
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
    'init': {
      configurable: true,
      set:(init)=>{
        PROPS.init = init;
        Object.defineProperty(INSTANCE,'init',{
          writable: false,
          value:true,
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
      value: {
        on: SUBJECT.register,
        off: SUBJECT.unregister
      }
    },
    'disable': {
      writable: false,
      value: (toggle)=>{
        INPUTS.all.forEach((input)=>{ input.disable(toggle); });
      }
    }
  }

  Object.defineProperties(this,METHODS);
}

export { Form, Helper }
