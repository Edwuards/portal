import { View } from '../helpers';
import { Card } from './card';
import { Team } from './subcomponents';

const Data = (users)=>{
  let teams = [];

  for (var i = 0; i < 5; i++) {
    let team = {
      id: i,
      members: [],
      avatar: `${window.location.origin}/assets/public/img/placeholder-team.png`,
      leader: users[5].data.id,
      name: 'Team '+i,
      area: 'Área de Ejemplo'
    };
    for (var j = 0; j < 5; j++) { team.members.push(users[j].data.id); }
    teams.push(team);
  }

  return teams;

}

export default function(users){
  const view = new View({name: 'team list', element: $('[data-teams="list"]') });
  let teams = [];

  const add = (team)=>{
    team = teams[teams.push(new Team(team)) - 1];
    team.card = new Card(team);
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
        return teams.find((team)=>{ return team.id == id; });
      }
    }
  }

  Object.defineProperties(view,methods);
  view.on = function(){ teams.forEach((team)=>{ team.card.on(); }); }
  view.off = function(){ teams.forEach((team)=>{ team.card.off(); }); }

  return view;

}
