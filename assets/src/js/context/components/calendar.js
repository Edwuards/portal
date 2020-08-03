import { Context } from './context';
import { Permissions } from '../../calendar/permissions';
import { Calendar } from '../../calendar/calendar';

function Component({navigation,router,state}){
  Context.call(this,'calendar');
  const nav = navigation.get.calendar;
  const calendar = new Calendar('main');
  const permissions = new Permissions({router});


  const routes = {
    '/calendar/*': function(ctx,next){
      if(!(state.get == 'calendar')){ state.set = 'calendar'; }
      next();
    },
    '/calendar/': permissions.index,
  }

  this.on = function(){
    navigation.set = 'calendar';
    permissions.on();
  }

  this.off = function(){
    permissions.off();
  }

  state.register({
    state: 'calendar',
    on: this.on,
    off: this.off
  });

  router.add(routes)

  router.add(permissions.routes);

  nav.buttons.name.prev.events.on('click',calendar.prev);

  nav.buttons.name.next.events.on('click',calendar.next);

  nav.buttons.name.today.events.on('click',calendar.today);

  calendar.register('updateDate',nav.date)

  calendar.render();
}

export { Component as Calendar }
