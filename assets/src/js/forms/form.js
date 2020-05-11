import { Observer } from '../helpers.js';
import * as Inputs from '../inputs.js';

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
  }

  FORM.html(typeof data.html == 'function' ? data.html() : data.html );

  FORM.attr('name',data.name);

  FORM.find('[data-type]').each(function(){
    let el = $(this),
    type = el.attr('data-type'),
    name = el.attr('name'),
    group = el.attr('data-group');

    if(type !== 'button'){
      if(!INPUTS.type[type]){ INPUTS.type[type] = {}; }
      if(group){
        if(!INPUTS.type[type][group]){ INPUTS.type[type][group] = {} }
        INPUTS.type[type][group][name] = el;
      }
      else{
        if(type == 'text'){
          el = new Inputs.TextInput(el);
        }
        else if(type == 'number'){
          el = new Inputs.NumberInput(el);
        }
        else if(type == 'select'){
          el = new Inputs.SelectInput(el);
        }
        else if(type == 'textarea'){
          el = new Inputs.TextAreaInput(el);
        }

        INPUTS.type[type][name] = el;
      }
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
        INPUTS.type.date[name] = new Inputs.DateInput(input.month,input.day,input.year);
      }
      if(type == 'time'){
        input = INPUTS.type.time[input];
        INPUTS.type.time[name] = new Inputs.TimeInput(input.hour,input.minutes,input.time);
      }
      if(type == 'image'){
        input = INPUTS.type.image[input];
        INPUTS.type.image[name] = new Inputs.ImageInput(input.file,input.upload,input.preview);
      }
      if(type == 'status'){
        input = INPUTS.type.status[input];
        INPUTS.type.status[name] = new Inputs.StatusInput(input.status,input.indicator);
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
            close.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
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

export { Form }
