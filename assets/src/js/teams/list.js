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
    }
  }

  Object.defineProperties(view,methods);
  view.on = function(){ teams.forEach((team)=>{ team.card.on(); }); }
  view.off = function(){ teams.forEach((team)=>{ team.card.off(); }); }

  return view;

}
