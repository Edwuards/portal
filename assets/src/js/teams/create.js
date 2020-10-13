import TeamView from './team';

export default function (Users){
  const view = TeamView({
    view: {name: 'create user', element: $('[data-teams="create"]')},
    form: {name: 'createTeam', url:'createTeam'}
  });

  return {
    on: ()=>{
      view.on();
      view.load({ users: Users.all });
      view.disable(false);
    },
    off: view.off
  }
}
