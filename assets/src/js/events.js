import { default as actionsInit } from './actions.js';
import { Forms } from './forms.js';

function Events(){
  const {actions,elements} = actionsInit();
  $('#modal > .body').html(Forms.vacation.form);
  actions.calendar.render();
  elements.nav.buttons.menu.on('click',actions.open.menu);
  elements.nav.buttons.next.on('click',actions.calendar.next);
  elements.nav.buttons.prev.on('click',actions.calendar.prev);
  elements.nav.buttons.today.on('click',actions.calendar.today);
  elements.permisions.buttons.open.on('click',actions.open.permisions);
}

export { Events }
