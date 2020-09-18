import { Finder } from '../form/inputs';
import { card } from '../templates/users';

export function Card(data){
  const element = $(document.createElement('div'));

  element
  .addClass('w-56 m-4 bg-white py-4')
  .append(card.render({
    avatar: data.avatar,
    name: data.firstname,
    area: data.area,
    position: data.position
  }));

  const { buttons } = Finder(element);

  const methods = {
    'buttons': { get: ()=>{ return buttons } },
    'element': { get: ()=>{ return element } },
    'off': {
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.off(); })
      }
    },
    'on': {
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.on(); });
      }
    }
  }

  Object.defineProperties(this,methods);


}
