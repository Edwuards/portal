import { default as actionsInit } from './actions.js';
import { Services } from './services.js';

function Events(){
  const {actions,elements} = actionsInit();

  actions.calendar.render();
  elements.nav.button.menu.on('click',actions.open.menu);
  elements.nav.bar.calendar.button.next.on('click',actions.calendar.next);
  elements.nav.bar.calendar.button.prev.on('click',actions.calendar.prev);
  elements.nav.bar.calendar.button.today.on('click',actions.calendar.today);
  elements.permisions.avisar.on('click',actions.avisar);
  elements.permisions.buttons.on('click',actions.open.permision);

}

export { Events }
