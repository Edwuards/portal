import { Context } from './context';
import { Permissions } from '../../calendar/permissions';
import { Calendar } from '../../calendar/calendar';

function Component({navigation,router}){
  Context.call(this,'calendar');
  const nav = navigation.get.calendar;
  const calendar = new Calendar('main');
  const permissions = new Permissions({router});
  const self = this;
  let ALIVE = false;


  router.instance.base('/app/dashboard/calendar');
  const routes = {
    '/*': function(ctx,next){
      if(!ALIVE){ self.on(); }
      next();
    },
    '/index': permissions.index,
  }

  this.on = function(){
    ALIVE = true;
    navigation.set = 'calendar';
    permissions.on();
  }

  this.off = function(){
    ALIVE = false;
    permissions.off();
  }

  router.add(routes)

  router.add(permissions.routes);

  nav.buttons.name.prev.events.on('click',calendar.prev);

  nav.buttons.name.next.events.on('click',calendar.next);

  nav.buttons.name.today.events.on('click',calendar.today);

  calendar.register('updateDate',nav.date)

  calendar.render();
}

export { Component as Calendar }
