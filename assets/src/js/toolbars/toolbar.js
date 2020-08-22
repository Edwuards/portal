import { Finder } from '../form/inputs';

export function ToolBar(name){
  const element = $(`[data-navbar="${name}"]`);

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
    'on':{
      writable: false,
      value: ()=>{ toggle(true); }
    },
    'off':{
      writable: false,
      value: ()=>{ toggle(false); }
    }
  }

  Object.defineProperties(this,Methods);
}
