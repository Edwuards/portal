import { Finder } from '../../form/inputs';

export function NavBar(name){
  const Element = $(`[data-navbar="${name}"]`);

  const { buttons, inputs } = Finder(Element);


  const Methods = {
    'element': {
      get:()=>{ return Element }
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
      value: function(){
        Element.removeClass('hide');
        buttons.all.forEach((btn)=>{ btn.on(); });
        inputs.all.forEach((input)=>{ input.on(); });
      }
    },
    'off':{
      value: function(){
        Element.addClass('hide');
        buttons.all.forEach((btn)=>{ btn.off(); });
        inputs.all.forEach((input)=>{ input.off(); });
      }
    }
  }

  Object.defineProperties(this,Methods);
}
