import Router from 'page';
import { View, Modal } from '../helpers';
import { Card } from './card';

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




function User(data){
  const card = new Card(data);
  const methods = {
    'data': {
      get: ()=>{ return data }
    },
    'card': {
      get: ()=>{ return card }
    }
  }

  Object.defineProperties(this,methods);

}

export default function(){
  let users = [];
  let remove = [];
  const view = new View({name: 'user list',element: $('[data-users="list"]')});
  const modal = Modal();
  const add = (user)=>{
    user = users[users.push(new User(user)) - 1];
    let { card } = user;
    card.buttons.name.profile.events.on('click',function(){
      Router(`/users/view/profile/${user.data.id}`);
    });
    view.element.append(card.element);
  }
  const deleteUsers = ()=>{
    users = users.reduce((a,c,i)=>{
        if(!remove[i]){ a.push(c); }
        else{ c.card.element.remove();}
        return a;
    },[]);
  }
  const findSelectedUsers = ()=>{
    remove = [];
    users.forEach((user,i) => {
      let { card } = user;
      let selected = card.element.hasClass('delete');
      if(selected){ remove[i] = user.data.firstname + ' ' + user.data.lastname; }
    });

    return remove;

  }
  const selectCard = (e)=>{
    let el = $(e.currentTarget);
    el[el.hasClass('delete') ? 'removeClass' : 'addClass']('delete');
  }

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
      value: ()=>{ modal.on(findSelectedUsers()); }
    }
  }

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

  modal.confirm(()=>{
    deleteUsers();
    modal.off();
    Router('/users/view/all');
  });

  Object.defineProperties(view,methods);

  Data.forEach(add);

  return view
}
