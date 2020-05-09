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
  const SUBJECT = new Observer(['open','close','send']);
  const PROPS = {
    alive:false,
    title:data.title,
    name:data.name
  };
  const OPEN = ()=>{
    INPUTS.all.forEach((input)=>{ input.on(); });
    BUTTONS.all.forEach((btn)=>{ btn.on(); });
    PROPS.alive = true;
    return FORM
  };
  const CLOSE = ()=>{
    INPUTS.all.forEach((input)=>{ input.off(); });
    BUTTONS.all.forEach((btn)=>{ btn.off(); });
    PROPS.alive = false;
  };

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
      el = new Inputs.Button(el);
      BUTTONS.name[name] = new Inputs.Button(el);
      BUTTONS.all.push(el);
    }
  });

  for(let type in INPUTS.type){
    for (let input in INPUTS.type[type]) {
      if(type == 'date'){
        input = INPUTS.type.date[input];
        INPUTS.type.date[input] = new Inputs.DateInput(input.month,input.day,input.year);
      }
      if(type == 'time'){
        input = INPUTS.type.time[input];
        INPUTS.type.time[input] = new Inputs.TimeInput(input.hour,input.minutes,input.time);
      }
      if(type == 'image'){
        input = INPUTS.type.image[input];
        INPUTS.type.image[input] = new Inputs.ImageInput(input.file,input.upload,input.preview);
      }
      INPUTS.all.push(INPUTS.type[type][input]);
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
          value:()=>{
            let form = OPEN();
            open.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
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
          value:()=>{
            INPUTS.all.forEach((input)=>{ input.off(); });
            let value = send.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
            SUBJECT.notify('send',value);
          }
        });
      }
    },
    'buttons':{
      writable: false,
      value: BUTTONS.name,
    },
    'events':{
      writable: false,
      value: {
        on: SUBJECT.register,
        off: SUBJECT.unregister
      }
    }
  }

  Object.defineProperties(this,METHODS);
}

export { Form }
