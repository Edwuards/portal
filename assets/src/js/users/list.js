import Router from 'page';
import { User } from './user';
import { View } from '../helpers';

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
  let users = [];
  const view = new View({name: 'user list',element: $('[data-users="list"]')});
  const container = $('[data-users="list"]');
  const add = (user)=>{
    user = users[users.push(new User(user)) - 1];
    let { card } = user;
    card.buttons.name.profile.events.on('click',function(){
      Router(`/users/view/profile/${user.data.id}`);
    });
    container.append(card.element);
  }
  const selectCard = (e)=>{
    let el = $(e.currentTarget);
    el[el.hasClass('delete') ? 'removeClass' : 'addClass']('delete');
  }

  Data.forEach(add);

  view.state.register({
    state: 'view users',
    on: ()=>{ users.forEach((u)=>{ u.card.on(); }); },
    off: ()=>{ users.forEach((u)=>{ u.card.off(); }); }
  });

  view.state.register({
    state: 'delete users',
    on: ()=>{ view.element.on('click','.card',selectCard); },
    off: ()=>{
      view.element.off('click','.card',selectCard);
      view.element.children('.delete').removeClass('delete');
    }
  });

  view.off = function(){ users.forEach((u)=>{ u.card.off(); }); }

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
    'delete': {
      writable: false,
      value: ()=>{
        let remove = [];
        users.forEach((user,i) => {
          let { card } = user;
          let selected = card.element.hasClass('delete');
          if(selected){ remove[i] = true; card.element.remove(); }
        });

        users = users.reduce((a,c,i)=>{
            if(!remove[i]){ a.push(c); }
            return a;
        },[]);
      }
    }
  }

  Object.defineProperties(view,methods);



  return view
}
