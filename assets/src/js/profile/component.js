import { View } from '../helpers';
import ToolBar from '../toolbars/profile';
import Profile from './profile.js';

export default function(){
  const view = new View({ name:'profile', element: $('[data-content="profile"]') });
  const toolbar = ToolBar();
  const userID = view.element.attr('data-id');
  const profile = Profile();

  const routes = {
    '/profile/*': function(ctx,next){
      if(!(this.state.value == 'profile')){ this.state.value = 'profile'; }
      next();
    },
    '/profile/view': function(){
      view.state.value = 'view profile';
    },
    '/profile/edit': function(){
      view.state.value = 'edit profile';
    }
  }

  profile.load(userID);

  view.on = function(){ toolbar.on(); profile.on(); }
  view.off = function(){ toolbar.off(); profile.off(); }

  view.state.register({
    state: 'view profile',
    on: ()=>{
      profile.read();
      toolbar.state.value = 'view profile';
    },
    off: ()=>{ return true }
  })

  view.routes = [ routes ];

  return view
}
