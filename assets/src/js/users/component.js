import { View, State } from '../helpers';
import ToolBar from '../toolbars/users';
import List from './list';

export default function(){
  const view = new View({name:'users',toolbar: ToolBar() });
  const users = List();
  const component = new State();

  const routes = {
    '/users/*': function(ctx,next){
      if(!(this.state == 'users')){ this.state = 'users'; }
      next();
    },
    '/users/view/all': function(){
      component.state = 'users';

    },
    '/users/view/profile/:id': function(){

    },

  }

  view.routes = [routes];

  component.register({state:'users',on:users.on,off:users.off})

  return view;

}
