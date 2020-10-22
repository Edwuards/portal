import { View, Modal } from '../helpers';
import { Card } from './card';
import Router from 'page';

const Data = (users)=>{
  let teams = [];
  if(users.length){

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
  let remove = [];
  const view = new View({name: 'team list', element: $('[data-teams="list"]') });
  const modal = Modal();
  const add = (team)=>{
    team = teams[teams.push(new Team(team)) - 1];
    view.element.append(team.card.element);
  }
  const findSelectedTeams = ()=>{
    remove = [];
    teams.forEach((team,i) => {
      let { card } = team;
      let selected = card.element.hasClass('delete');
      if(selected){ remove[i] = team.data.name; }
    });
    return remove;
  }
  const deleteTeams = ()=>{
    teams = teams.reduce((a,c,i)=>{
        if(!remove[i]){ a.push(c); }
        else{ c.card.element.remove();}

        return a;
    },[]);
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
      value: ()=>{ modal.on(findSelectedTeams()); }
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

  modal.confirm(()=>{
    deleteTeams();
    modal.off();
    Router('/teams/view/all');
  });
  modal.message('Seguro que quieres eleminar los siguientes equipos :');


  return view;

}
