import Router from 'page';
import { User } from './user';

const Data = (()=>{
  const users = [];
  for (let i = 1; i <= 20 ; i++) {
    users.push({
      id: i,
      firstname: ['Cesar Edwuards','Pablo','Juan','Victor'][i%4],
      lastname: 'Perez Robles',
      email: 'ejemplo@figment.com.mx',
      avatar: '/assets/public/img/placeholder.jpeg',
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
    user = users[users.push(new User(user)) - 1];
    let { card } = user;
    card.buttons.name.profile.events.on('click',function(){
      Router(`/users/view/profile/${user.data.id}`);
    });
    container.append(card.element);
  }

  Data.forEach(add);


  const methods = {
    'all': {
      get:()=>{ return users; }
    },
    'find': {
      writable: false,
      value: (id)=>{
        return users.find((user)=>{ return user.data.id == id; });
      }
    },
    'on':{
      writable: false,
      value: ()=>{
        container.removeClass('hidden');
        users.forEach((user) => { user.card.on() });
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        container.addClass('hidden');
        users.forEach((user)=>{ user.card.off() });
      }
    }
  }

  Object.defineProperties(list,methods);

  return list
}
