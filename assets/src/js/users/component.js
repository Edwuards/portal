import { View, State } from '../helpers';
import ToolBar from '../toolbars/users';
import Users from './subcomponents';
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
    '/users/delete': function(){
      view.state.value = 'delete users';
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
  toolbar.events.on('delete users',users.list.delete);

  view.on = function(){ users.list.on(); toolbar.on(); }
  view.off = function(){ users.list.off(); toolbar.off(); }

  view.list = users.list

  view.routes = [routes];

  view.state.register({
    state: 'view users',
    on: ()=>{
      users.list.on();
      users.list.state.value = 'view users';
      toolbar.state.value = 'view users';
    },
    off: ()=>{ },
  });

  view.state.register({
    state: 'delete users',
    on: ()=>{
      users.list.state.value  = 'delete users';
      toolbar.state.value = 'delete users';
    },
    off: ()=>{ },
  });

  view.state.register({
    state: 'create user',
    on: ()=>{
      users.list.off();
      users.create.on();
      toolbar.state.value = 'create user';
    },
    off: ()=>{ users.create.off(); },
  });

  view.state.register({
    state: 'profile',
    on: ()=>{
      users.list.off();
      users.profile.on();
      toolbar.state.value = 'read profile';
    },
    off: ()=>{ users.profile.off(); },
  });

  return view;

}
