import { View } from '../helpers';
import ToolBar from '../toolbars/teams';
import Teams from './teams';

export default function({users}){
  const view = new View({name:'teams',element: $('[data-content="teams"]') });
  const toolbar = ToolBar();
  const teams = Teams(users.list);

  const routes = {
    '/teams/*': function(ctx,next){
      if(this.state.value != 'teams'){ this.state.value = 'teams'; }
      next();
    },
    '/teams/view/all': function(){
      view.state.value = 'view teams';
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
    state: 'view teams',
    on: ()=>{
      teams.list.on();
      toolbar.state.value = 'view teams';
    },
    off: ()=>{ teams.list.off(); }
  });

  view.state.register({
    state: 'create team',
    on: ()=>{ toolbar.state.value = 'create team'; teams.create.on(); },
    off: ()=>{ teams.create.off(); }
  });

  return view;

}
