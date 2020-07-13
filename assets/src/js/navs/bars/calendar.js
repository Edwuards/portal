import { NavBar } from './navbar';

export function Calendar(calendar){
  const Nav = new NavBar('calendar');
  const DateTitle = Nav.element.find('[data=date]');

  calendar.actions.register('updateDate',function(stringDate){ DateTitle.html(stringDate); });

  Nav.buttons.name.prev.events.on('click',calendar.actions.prev);

  Nav.buttons.name.next.events.on('click',calendar.actions.next);

  Nav.buttons.name.today.events.on('click',calendar.actions.today);

  return Nav
}
