import { Observer } from '../helpers.js';
import { Finder } from './inputs.js';

export function Form(data){
  const instance = this;
  const events = new Observer(['on','off','send','response','error']);
  const props = {
    element:$(`form[name="${data.name}"]`),
    alive:false,
    title: data.title,
    name:data.name,
    url: data.url,
    async: data.async ? data.async : true,
    method: data.method ? data.method : 'POST',
    json: data.json ? data.json : false
  };
  const on = ()=>{
    inputs.all.forEach((input)=>{ input.on(); });
    buttons.all.forEach((btn)=>{ btn.on(); });
    if(typeof props.init == 'function' ){ props.init.call(instance); props.init = true; }
    props.alive = true;
    events.notify('on',[true]);
    return props.element
  };
  const off = ()=>{
    props.element[0].reset();
    inputs.all.forEach((input)=>{ input.off(); });
    buttons.all.forEach((btn)=>{ btn.off(); });
    props.alive = false;
    events.notify('off',[true]);
  };
  const send = (message)=>{
    events.notify('send',[message]);
    if(!message.error){
      $.ajax({
        url: `${window.location.origin}/${props.url}`,
        method: props.method,
        data: props.json ? JSON.stringify(message.data) : message.data,
        async: props.async,
        success: (response)=>{ events.notify('response',[response]); },
        error: (response)=>{ events.notify('error',[response]); }
      });
    }
  }
  const { inputs, buttons } = Finder(props.element);

  const methods = {
    'element': {
      get:()=>{ return props.element }
    },
    'name':{
      get:()=>{ return props.name; }
    },
    'alive':{
      get:()=>{ return props.alive; }
    },
    'title':{
      get:()=>{ return props.title; }
    },
    'on': {
      configurable: true,
      get:()=>{ return on; },
      set:(fn)=>{
        Object.defineProperty(instance,'on',{
          configurable: false,
          writable: false,
          value:function(){
            on();
            fn.apply(instance,arguments);
          }
        });
      }
    },
    'off': {
      configurable: true,
      get:()=>{ return off; },
      set:(fn)=>{
        Object.defineProperty(instance,'off',{
          configurable: false,
          writable: false,
          value:()=>{
            off();
            fn.call(instance);
          }
        });
      }
    },
    'send': {
      configurable: true,
      set:(send)=>{
        Object.defineProperty(instance,'send',{
          configurable: false,
          writable: false,
          value:function(){
            send(send.apply(instance,arguments));
          }
        });
      }
    },
    'init': {
      configurable: true,
      set:(init)=>{
        props.init = init;
        Object.defineProperty(instance,'init',{
          writable: false,
          value:true,
        });
      }
    },
    'buttons':{
      get: ()=>{ return buttons }
    },
    'inputs':{
      get: ()=>{ return inputs }
    },
    'events':{
      writable: false,
      value: {
        on: events.register,
        off: events.unregister
      }
    },
    'disable': {
      writable: false,
      value: (toggle)=>{
        inputs.all.forEach((input)=>{ input.disable(toggle); });
      }
    }
  }

  Object.defineProperties(this,methods);
}
