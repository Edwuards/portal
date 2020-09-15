import { View, State } from '../helpers';
import ToolBar from '../toolbars/users';
import Users from './users';
export default function(){
  const view = new View({name:'users',element: $('[data-content="users"]')});
  const toolbar = ToolBar();
  const users = Users();
  const routes = {
    '/users/*': function(ctx,next){
      if(!(this.state.value == 'users')){ this.state.value = 'users'; }
      next();
    },
    '/users/view/all': function(){
      view.state.value = 'view users';
    },
    '/users/view/profile/:id': function(ctx){
      view.state.value = 'profile';
      users.profile.read(users.list.find(ctx.params.id).data);
    },
    '/users/create': function(ctx){
      view.state.value = 'create user';
    },

  }

  toolbar.events.on('edit profile',users.profile.edit);
  toolbar.events.on('cancel edit profile',users.profile.cancel);

  view.on = function(){ toolbar.on(); }
  view.off = function(){ toolbar.off(); }

  view.routes = [routes];

  view.state.register({
    state: 'view users',
    on: ()=>{
      users.list.on();
      toolbar.state.value = 'view users';
    },
    off: ()=>{ users.list.off(); },
  });

  view.state.register({
    state: 'create user',
    on: ()=>{
      users.create.on();
      toolbar.state.value = 'create user';
    },

    off: ()=>{ users.create.off(); },
  });

  view.state.register({
    state: 'profile',
    on: ()=>{
      users.profile.on();
      toolbar.state.value = 'read profile';
    },
    off: ()=>{ users.profile.off(); },
  });

  return view;

}
