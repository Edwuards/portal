import { Aviso } from './cards/index.js';
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
    if(status == 1){ SECTIONS.approved.append(aviso.element); }
    else if(status == 2){ SECTIONS.pending.append(aviso.element); }
    else { SECTIONS.declined.append(aviso.element); }

    if(PROPS.alive){ aviso.on(); }
    if(PROPS.state == status){ PROPS.current.push(aviso); }

  }
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
      }
    },
    'close':{
      writable: false,
      value: ()=>{
        PROPS.alive = false;
        for (let name in BUTTONS) { BUTTONS[name].off(); }
        PROPS.current.forEach(aviso => aviso.off() );
      }
    },
    'add': {
      writable: false,
      value: (aviso)=>{
        let status = aviso.status;
        aviso = PROPS.avisos[PROPS.avisos.push(new Aviso(aviso)) - 1];
        if(status == 1){ SECTIONS.approved.append(aviso.element); }
        else if(status == 2){ SECTIONS.pending.append(aviso.element); }
        else { SECTIONS.declined.append(aviso.element); }

        if(PROPS.state == status){ PROPS.current.push(aviso); }

        aviso.events.on('updateStatus',function(){
          console.log(arguments);
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

  console.log(INSTANCE);
}


export { Avisos }
