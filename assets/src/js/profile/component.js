import { View } from '../helpers';
import ToolBar from '../toolbars/profile';

export default function(){
  const view = new View({ name:'profile', toolbar: ToolBar() });

  const routes = {
    '/profile/*': function(ctx,next){
      if(!(this.state == 'profile')){ this.state = 'profile'; }
      next();
    },
    '/profile/': function(){
    }

  }

  view.routes = [ routes ];

  return view
}
