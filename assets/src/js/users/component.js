import { View, State } from '../helpers';
import ToolBar from '../toolbars/users';
import Users from './users';
export default function(){
  const view = new View({name:'users',toolbar: ToolBar() });
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
      users.profile.read(users.list.find(ctx.params.id).user);
    },
    '/users/create': function(ctx){
      view.state.value = 'create user';
    },

  }

  view.toolbar.events.on('edit profile',users.profile.edit);
  view.toolbar.events.on('cancel edit profile',users.profile.cancel);



  view.routes = [routes];

  view.state.register({
    state: 'view users',
    on: ()=>{
      users.list.on();
      view.toolbar.state.value = 'view users';
    },

    off: ()=>{ users.list.off(); },
  });

  view.state.register({
    state: 'create user',
    on: ()=>{
      users.create.on();
      view.toolbar.state.value = 'create user';
    },

    off: ()=>{ users.create.off(); },
  });

  view.state.register({
    state: 'profile',
    on: ()=>{
      users.profile.on();
      view.toolbar.state.value = 'read profile';
    },
    off: ()=>{ users.profile.off(); },
  });

  return view;

}
