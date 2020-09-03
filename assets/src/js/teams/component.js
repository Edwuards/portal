import { View, State } from '../helpers';
import ToolBar from '../toolbars/teams';
export default function(){
  const view = new View({name:'teams',toolbar: ToolBar() });
  const routes = {
    '/teams/*': function(ctx,next){
      if(!(this.state.value == 'teams')){ this.state.value = 'teams'; }
      next();
    },
    '/teams/view/all': function(){
      view.state.value = 'view all teams';
    },


  }

  view.routes = [routes];

  view.state.register({
    state: 'view all teams',
    on: ()=>{ view.toolbar.state.value = 'view all teams'; },
    off: ()=>{ }
  });

  return view;

}
