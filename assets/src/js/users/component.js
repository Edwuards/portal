import { View, State } from '../helpers';
import ToolBar from '../toolbars/users';
import List from './list';
import Profile from './profile';

export default function(){
  const view = new View({name:'users',toolbar: ToolBar() });
  const users = List();
  const profile = Profile();

  const routes = {
    '/users/*': function(ctx,next){
      if(!(this.state.value == 'users')){ this.state.value = 'users'; }
      next();
    },
    '/users/view/all': function(){
      view.state.value = 'users';
    },
    '/users/view/profile/:id': function(){
      view.state.value = 'profile';
    },

  }

  view.routes = [routes];

  view.state.register({
    state: 'users',
    on: ()=>{ users.on(); view.toolbar.state.value = 'users'; },
    off: ()=>{ users.off(); },
  });

  view.state.register({
    state: 'profile',
    on: ()=>{ profile.on(); view.toolbar.state.value = 'profile'; },
    off: ()=>{ profile.off(); },
  });

  return view;

}
