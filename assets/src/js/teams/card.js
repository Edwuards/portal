import { Finder } from '../form/inputs';
import { card } from '../templates/teams';

export function Card(data){
  const element = $(document.createElement('div'));

  element
  .addClass('card m-4 bg-white')
  .append(card.render({
    avatar: data.avatar,
    area: data.area,
    name: data.name,
    members: data.members.get().length,
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
