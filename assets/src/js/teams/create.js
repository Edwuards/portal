import TeamView from './subcomponents';

export default function (Users){
  const view = TeamView({
    view: {name: 'create user', element: $('[data-teams="create"]')},
    form: {name: 'createTeam', url:'createTeam'}
  });

  return {
    on: ()=>{ view.on({ users: Users.all }); },
    off: view.off
  }
}
