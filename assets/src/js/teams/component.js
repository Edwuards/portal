import { View } from '../helpers';
import ToolBar from '../toolbars/teams';
import Teams from './subcomponents';

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
    '/teams/view/team/:id': function(ctx){
      view.state.value = 'view team';
      teams.view.load(teams.list.find(ctx.params.id).data);
    },
    '/teams/delete': function(){
      view.state.value = 'delete teams';
    },
    '/teams/create': function(){
      view.state.value = 'create team';
    }
  }

  toolbar.events.on('edit team',function(){ teams.view.edit(true); })
  toolbar.events.on('cancel edit team',function(){ teams.view.edit(false); });
  toolbar.events.on('delete teams',teams.list.delete);

  view.on = function(){ teams.list.on(); toolbar.on(); }
  view.off = function(){ teams.list.off(); toolbar.off(); }
  view.users = users.list;

  view.routes = [routes];

  view.state.register({
    state: 'delete teams',
    on: ()=>{
      teams.list.state.value  = 'delete teams';
      toolbar.state.value = 'delete teams';
    },
    off: ()=>{ },
  });

  view.state.register({
    state: 'view teams',
    on: ()=>{
      teams.list.on();
      teams.list.state.value  = 'view teams';
      toolbar.state.value = 'view teams';
    },
    off: ()=>{ }
  });

  view.state.register({
    state: 'view team',
    on: ()=>{
      teams.list.off();
      teams.view.on();
      toolbar.state.value = 'view team';
    },
    off: ()=>{ teams.view.off(); }
  });

  view.state.register({
    state: 'create team',
    on: ()=>{
      teams.list.off();
      toolbar.state.value = 'create team';
      teams.create.on();
    },
    off: ()=>{ teams.create.off(); }
  });

  return view;

}
