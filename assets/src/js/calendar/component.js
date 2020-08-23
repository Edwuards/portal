import { View } from '../helpers';
import { Permissions } from './permissions';
import { Calendar } from './calendar';
import ToolBar from '../toolbars/calendar';

export default function(){
  const view = new View({ name:'calendar',toolbar: ToolBar() });
  const calendar = new Calendar('main');
  const permissions = new Permissions();

  const routes = {
    '/calendar/*': function(ctx,next){
      if(!(this.state.value == 'calendar')){ this.state.value = 'calendar'; }
      next();
    },
    '/calendar/': permissions.index,
  }

  view.on = function(){ permissions.on(); }

  view.off = function(){ permissions.off(); }

  view.routes = [ routes, permissions.routes ]

  view.toolbar.buttons.name.prev.events.on('click',calendar.prev);

  view.toolbar.buttons.name.next.events.on('click',calendar.next);

  view.toolbar.buttons.name.today.events.on('click',calendar.today);

  calendar.events.on('updateDate',view.toolbar.setDate);

  calendar.render();


  return view
}
