import { Button } from '../inputs.js';

function Avisos(name){
  const INSTANCE = this;
  const CONTAINER = $(`[data-avisos="${name}"]`);
  const SECTIONS = {};
  const BUTTONS = {};
  const PROPS = {
    alive: false,
    avisos: [],
    current: [],
    state: 2
  };
  const ADD = (aviso)=>{
    aviso = PROPS.avisos[PROPS.avisos.push(aviso) - 1];
    let status = Number(aviso.status);
    if(status == 1){ SECTIONS.approved.prepend(aviso.element); }
    else if(status == 2){ SECTIONS.pending.prepend(aviso.element); }
    else { SECTIONS.declined.prepend(aviso.element); }

    if(PROPS.alive){ aviso.on(); }
    if(PROPS.state == status){ PROPS.current.push(aviso); }

  };
  const STATE = (current,state)=>{
    if(state !== PROPS.status){
      PROPS.status = state;
      for(let button in BUTTONS){
        BUTTONS[button].element[ current == button ? 'addClass' : 'removeClass']('text-gray-700 border-b-2 border-red-600');
        SECTIONS[button][ current == button ? 'removeClass' : 'addClass']('hidden');
      }
      PROPS.current.forEach(aviso => aviso.off());
      PROPS.current = [];
      PROPS.avisos.forEach((aviso)=>{
        if(aviso.status == state){ aviso.on(); PROPS.current.push(aviso); }
      });
    }
  }
  const METHODS = {
    'open':{
      writable: false,
      value: ()=>{
        PROPS.alive = true;
        for (let name in BUTTONS) { BUTTONS[name].on(); }
        PROPS.current.forEach(aviso => aviso.on() );
        CONTAINER.addClass('active');
      }
    },
    'close':{
      writable: false,
      value: ()=>{
        CONTAINER.removeClass('active');
        PROPS.alive = false;
        for (let name in BUTTONS) { BUTTONS[name].off(); }
        PROPS.current.forEach(aviso => aviso.off() );
      }
    },
    'update':{
      writable: false,
      value: (aviso)=>{
        aviso.off();
        aviso.element.detach();
        if(aviso.status){ SECTIONS.approved.prepend(aviso.element); }
        else{ SECTIONS.declined.prepend(aviso.element); }
      }
    },
    'add': {
      configurable: true,
      set: (fn)=>{
        Object.defineProperty(INSTANCE,'add',{
          writable: false,
          value: function(){
            ADD(fn.apply(null,arguments));
          }
        });
      }
    }
  }

  CONTAINER
  .children('.body')
  .find('section').each(function(){
    let el = $(this);
    SECTIONS[el.attr('name')] = el;
  });

  CONTAINER
  .children('.header')
  .find('button').each(function(){
    let el = $(this),
    name = el.attr('name'),
    state = el.attr('data');

    BUTTONS[name] = new Button(el);
    BUTTONS[name].events.on('click',function(){ STATE(name,state); });
  });

  Object.defineProperties(this,METHODS);

}


export { Avisos }
