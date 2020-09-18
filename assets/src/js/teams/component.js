import { View, State } from '../helpers';
import ToolBar from '../toolbars/teams';
import Team from './team';

export default function({users}){
  const view = new View({name:'teams',element: $('[data-content="teams"]') });
  const toolbar = ToolBar();
  const team = Team(users.list);

  const routes = {
    '/teams/*': function(ctx,next){
      if(this.state.value != 'teams'){ this.state.value = 'teams'; }
      next();
    },
    '/teams/view/all': function(){
      view.state.value = 'view all teams';
    },
    '/teams/create': function(){
      view.state.value = 'create team';
    }
  }

  view.on = function(){ toolbar.on(); }
  view.off = function(){ toolbar.off(); }
  view.users = users.list;

  view.routes = [routes];

  view.state.register({
    state: 'view all teams',
    on: ()=>{ toolbar.state.value = 'view all teams'; },
    off: ()=>{ }
  });

  view.state.register({
    state: 'create team',
    on: ()=>{ toolbar.state.value = 'create team'; team.create.on(); },
    off: ()=>{ team.create.off(); }
  });

  return view;

}
