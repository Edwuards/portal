import { Finder } from '../form/inputs';
import { State } from '../helpers';


export function ToolBar(name){
  const element = $(`[data-navbar="${name}"]`);
  const state = new State();
  const { buttons, inputs } = Finder(element);

  const toggle = (state)=>{
    element[state ? 'removeClass' : 'addClass']('hidden');
    buttons.all.forEach((btn)=>{ btn[state ? 'on' : 'off'](); });
    inputs.all.forEach((input)=>{ input[state ? 'on' : 'off'](); });
  }

  const Methods = {
    'element': {
      get:()=>{ return element }
    },
    'name': {
      get: ()=>{ return name }
    },
    'buttons':{
      get: ()=>{ return buttons }
    },
    'inputs':{
      get: ()=>{ return inputs }
    },
    'state': {
      writable: false,
      value: state
    },
    'reset': {
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{
          btn.off();
          btn.element.addClass('hidden');
        });
      }
    },
    'on':{
      writable: false,
      value: ()=>{ toggle(true); }
    },
    'off':{
      writable: false,
      value: ()=>{ toggle(false); }
    },
    'toggleBtns': {
      writable: false,
      value: (btns,state)=>{
        btns.forEach((name)=>{
          let btn = buttons.name[name];
          btn[state ? 'on' : 'off']();
          btn.element[state ? 'removeClass' : 'addClass']('hidden');
        })
      }
    }
  }

  Object.defineProperties(this,Methods);
}
