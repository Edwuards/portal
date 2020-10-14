import { View } from '../helpers';
import { Card } from './card';

const Data = (users)=>{
  let teams = [];

  for (var i = 0; i < 5; i++) {
    let team = {
      id: i,
      members: [],
      avatar: `${window.location.origin}/assets/public/img/placeholder-team.png`,
      leader: users[4].data.id,
      name: 'Team '+i,
      area: 'Área de Ejemplo'
    };
    for (var j = 0; j < 5; j++) { team.members.push(users[j]); }
    teams.push(team);
  }

  return teams;

}

function Team(data){
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

export default function(users){
  let teams = [];
  const view = new View({name: 'team list', element: $('[data-teams="list"]') });
  const add = (team)=>{
    team = teams[teams.push(new Team(team)) - 1];
    view.element.append(team.card.element);
  }
  const selectCard = (e)=>{
    let el = $(e.currentTarget);
    el[el.hasClass('delete') ? 'removeClass' : 'addClass']('delete');
  }

  Data(users.all).forEach(add);


  const methods = {
    'all': {
      get: ()=>{ return teams }
    },
    'find': {
      writable: false,
      value: (id)=>{
        return teams.find((team)=>{ return team.data.id == id; });
      }
    },
    'delete': {
      writable: false,
      value: ()=>{
        let remove = [];
        teams.forEach((team,i) => {
          let { card } = team;
          let selected = card.element.hasClass('delete');
          if(selected){ remove[i] = true; card.element.remove(); }
        });

        teams = teams.reduce((a,c,i)=>{
            if(!remove[i]){ a.push(c); }
            return a;
        },[]);
      }
    }
  }

  Object.defineProperties(view,methods);

  view.state.register({
    state: 'view teams',
    on: ()=>{ teams.forEach((t)=>{ t.card.on(); }); },
    off: ()=>{ teams.forEach((t)=>{ t.card.off(); }); }
  });

  view.state.register({
    state: 'delete teams',
    on: ()=>{ view.element.on('click','.card',selectCard); },
    off: ()=>{
      view.element.off('click','.card',selectCard);
      view.element.children('.delete').removeClass('delete');
    }
  });

  view.off = function(){ teams.forEach((t)=>{ t.card.off(); }); }


  return view;

}
