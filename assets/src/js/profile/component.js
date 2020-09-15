import { View } from '../helpers';
import ToolBar from '../toolbars/profile';

export default function(){
  const view = new View({ name:'profile', element: $('[data-content="profile"]') });
  const toolbar = ToolBar();

  const routes = {
    '/profile/*': function(ctx,next){
      if(!(this.state.value == 'profile')){ this.state.value = 'profile'; }
      next();
    },
    '/profile/': function(){
    }

  }

  view.on = function(){ toolbar.on(); }
  view.off = function(){ toolbar.off(); }

  view.routes = [ routes ];

  return view
}
