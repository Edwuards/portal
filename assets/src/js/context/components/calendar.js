import { Context } from './context';

export function Calendar({calendar,navigation}){
  Context.call(this,'calendar');
  const nav = navigation.get.calendar;
  const permissions = calendar.permissions;

  this.on = function(){
    navigation.set = 'calendar';
    permissions.on();
  }

  this.off = function(){
    permissions.off();
  }

  this.solicit = function(ctx){
    const { name } = ctx.params;
    permissions.form(name);
  }

  calendar.register('updateDate',nav.date)

  nav.buttons.name.prev.events.on('click',calendar.prev);

  nav.buttons.name.next.events.on('click',calendar.next);

  nav.buttons.name.today.events.on('click',calendar.today);

  calendar.render();
}
