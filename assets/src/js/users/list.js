import { Card } from './card';
import Router from 'page';

const Data = (()=>{
  const users = [];
  for (let i = 1; i <= 20 ; i++) {
    users.push({
      id: i,
      firstname: 'Cesar Edwuards',
      lastname: 'Perez Robles',
      email: 'ejemplo@figment.com.mx',
      avatar: '/assets/img/placeholder.jpeg',
      area: 'Diseño',
      position: 'Diseñador Gráfico'
    });
  }

  return users;
})();

export default function(){
  const container = $('[data-users="list"]');
  const users = [];
  const list = {};
  const add = (user)=>{
    let card = users[users.push(new Card(user)) - 1];
    card.buttons.name.profile.events.on('click',function(){
      Router(`/users/view/profile/${card.user.id}`);
    });
    container.append(card.element);
  }

  Data.forEach(add);


  const methods = {
    'on':{
      writable: false,
      value: ()=>{
        container.removeClass('hidden');
        users.forEach((user) => { user.on() });
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        container.addClass('hidden');
        users.forEach((user)=>{ user.off() });
      }
    }
  }

  Object.defineProperties(list,methods);

  return list
}
