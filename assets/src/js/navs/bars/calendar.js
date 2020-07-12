import { NavBar } from './navbar';

export function Calendar(calendar){
  const Nav = new NavBar('calendar');

  Nav.buttons.name.prev.events.on('click',function(){
    console.log('clicked prev');
    calendar.actions.prev();
  });

  Nav.buttons.name.next.events.on('click',function(){
    console.log('clicked next');
    calendar.actions.next();
  });

  return Nav
}
