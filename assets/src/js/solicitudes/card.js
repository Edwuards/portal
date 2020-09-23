import { Finder } from '../form/inputs';
import { card as template } from '../templates/solicitudes';

export function Card(solicitud){
  let {start,end,type,color,user,status} = solicitud;
  const element = $(document.createElement('div'));
  const css = ['denied','approved','pending','validating'];
  element.addClass(`solicitud m-4 bg-white ${css[status]} hidden`).append(
    template.render({
      type,
      avatar: `${window.location.origin}/${user.avatar}`,
      name: `${user.firstname} ${user.lastname}`,
      color,
      start,
      end
    })
  );
  const { buttons } = Finder(element);

  const methods = {
    'buttons': { get: ()=>{ return buttons } },
    'element': { get: ()=>{ return element } },
    'off': {
      writable: false,
      value: ()=>{
        element.addClass('hidden');
        buttons.all.forEach((btn)=>{ btn.off(); })
      }
    },
    'on': {
      writable: false,
      value: ()=>{
        element.removeClass('hidden');
        buttons.all.forEach((btn)=>{ btn.on(); });
      }
    },
    'status':{
      get: ()=>{ return status },
      set: (value)=>{
        element.addClass('hidden');
        element.removeClass(css[status]).addClass(css[value]);
        status = value;
      }
    }
  }

  Object.defineProperties(this,methods);

}
