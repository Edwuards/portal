import { default as actionsInit } from './actions.js';
import { Services } from './services.js';

function Events(){
  const {actions,elements} = actionsInit();

  actions.calendar.render();
  elements.nav.button.menu.on('click',actions.open.menu);
  elements.nav.button.next.on('click',actions.calendar.next);
  elements.nav.button.prev.on('click',actions.calendar.prev);
  elements.nav.button.today.on('click',actions.calendar.today);
  elements.nav.menu.button.profile.on('click',actions.open.profile);
  elements.permisions.button.open.on('click',actions.open.permisions);
  elements.permisions.button.homeOffice.on('click',actions.open.form);
  elements.permisions.button.sick.on('click',actions.open.form);
  elements.permisions.button.vacation.on('click',actions.open.form);
  elements.permisions.button.permision.on('click',actions.open.form);
}

export { Events }
