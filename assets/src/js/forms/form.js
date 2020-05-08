import { Observer } from './helpers.js';
import * as Inputs from '../inputs.js';

function Form(data){
  const FORM = $(document.createElement('form'));
  const INSTANCE = this;
  const TITLE = data.title;
  const BUTTONS = {
    all: [],
    name: {}
  };
  const INPUTS = {
    all: [],
    type:{}
  };
  const SUBJECT = new Observer(['open','close','send']);

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
        if(!INPUTS.type[type][group]){ INPUT.type[type][group] = {} }
        INPUT.type[type][group][name] = el;
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

        INPUT.type[type][name] = el;
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
        INPUTS.type.time[input] = new Inputs.DateInput(input.hour,input.minutes,input.time);
      }
      INPUTS.all.push(INPUTS.type[type][input]);
    }
  }

  const METHODS = {
    'element': {
      get:()=>{ return FORM }
    },
    'open': {
      configurable: true,
      get:()=>{
        return ()=>{
          INPUTS.all.forEach((input)=>{ input.on(); });
          BUTTONS.all.forEach((btn)=>{ btn.on(); });
          return FORM
        };
      },
      set:(open)=>{
        Object.defineProperty(INSTANCE,'open',{
          configurable: false,
          writable: false,
          value:()=>{
            return ()=>{
            BUTTONS.all.forEach((btn)=>{ btn.on(); });
            INPUTS.all.forEach((input)=>{ input.on(); });
            open.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
            return FORM;
          }
        });
      }
    },
    'close': {
      configurable: true,
      get:()=>{
        return ()=>{
          INPUTS.all.forEach((input)=>{ input.off(); })
          BUTTONS.all.forEach((btn)=>{ btn.off(); })
        };
      },
      set:(close)=>{
        Object.defineProperty(INSTANCE,'close',{
          configurable: false,
          writable: false,
          value:()=>{
            INPUTS.all.forEach((input)=>{ input.off(); });
            BUTTONS.all.forEach((btn)=>{ btn.off(); })
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
    }
    'events':{
      writable: false,
      value: {
        on: SUBJECT.register,
        off: SUBJECT.unregister
      }
    }
  }


}

export { Form }
