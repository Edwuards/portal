import { Finder } from '../form/inputs';
import { User } from './user';
import { card } from '../templates/users';

export function Card(data){
  const element = $(document.createElement('div'));
  const user = new User(data);

  element
  .addClass('w-56 m-4 bg-white py-4')
  .append(card.render({
    name: user.fullname,
    area: user.area,
    position: user.position
  }));

  const { buttons } = Finder(element);

  const methods = {
    'user': { get: ()=>{ return user } },
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
