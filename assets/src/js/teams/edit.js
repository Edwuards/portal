import TeamView from './team';

export default function (Users){
  const view = TeamView({
    view: {name: 'edit user', element: $('[data-teams="edit"]')},
    form: {name: 'editTeam', url:'createTeam'}
  });
  let currentTeam = undefined;

  const load = (team)=>{
    currentTeam = team;
    let exclude = team.members.map(m => m.data.id);
    let data = {};
    data.team = {
      name: team.name,
      area: team.area,
      avatar: team.avatar,
      leader: team.leader,
      members: team.members.map(m => m)
    };

    data.users = Users.all.reduce((a,c)=>{
      if(exclude.indexOf(c.data.id) == -1){ a.push(c); }
      return a
    },[]);

    view.load(data);
  }

  return {
    on: ()=>{ view.disable(true); view.on() },
    off: view.off,
    load: load,
    edit:(toggle)=>{
      view.disable(!toggle);
      if(!toggle){ load(currentTeam); }
    }
  }
}
