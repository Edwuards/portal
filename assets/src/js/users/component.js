import { View } from '../helpers';
import ToolBar from '../toolbars/users';

export default function(){
  const view = new View({name:'users',toolbar: ToolBar() });

  const routes = {
    '/users/*': function(ctx,next){
      if(!(state.get == 'users')){ state.set = 'users'; }
      next();
    },
    '/users/': function(){

    }

  }

  view.routes = [routes]

  return view;

}
