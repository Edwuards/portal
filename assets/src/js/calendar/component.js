import { View } from '../helpers';
import { Permissions } from './permissions';
import { Calendar } from './calendar';
import ToolBar from '../toolbars/calendar';

export default function(){
  const view = new View({ name:'calendar', element: $('[data-content="calendar"]') });
  const toolbar = ToolBar();
  const calendar = new Calendar('main');
  const permissions = new Permissions();

  const routes = {
    '/calendar/*': function(ctx,next){
      if(!(this.state.value == 'calendar')){ this.state.value = 'calendar'; }
      next();
    },
    '/calendar/': permissions.index,
  }

  view.on = function(){ toolbar.on(); permissions.on(); }

  view.off = function(){ toolbar.off(); permissions.off(); }

  view.routes = [ routes, permissions.routes ]

  toolbar.buttons.name.prev.events.on('click',calendar.prev);

  toolbar.buttons.name.next.events.on('click',calendar.next);

  toolbar.buttons.name.today.events.on('click',calendar.today);

  calendar.events.on('updateDate',toolbar.setDate);

  calendar.render();


  return view
}
