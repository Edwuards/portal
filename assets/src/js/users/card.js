import { Finder } from '../form/inputs';
import { card } from '../templates/users';
import Router from 'page';

export function Card(data){
  const element = $(document.createElement('div'));

  element
  .addClass('card w-56 m-4 bg-white py-4')
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

  buttons.name.profile.events.on('click',function(){
    Router(`/users/view/profile/${user.data.id}`);
  });

  Object.defineProperties(this,methods);


}
