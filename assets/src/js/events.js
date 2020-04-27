import { default as actionsInit } from './actions.js';
import { Services } from './services.js';

function Events(){
  const {actions,elements} = actionsInit();

  console.log(Services);
  actions.calendar.render();
  elements.nav.buttons.menu.on('click',actions.open.menu);
  elements.nav.buttons.next.on('click',actions.calendar.next);
  elements.nav.buttons.prev.on('click',actions.calendar.prev);
  elements.nav.buttons.today.on('click',actions.calendar.today);
  elements.nav.menu.buttons.profile.on('click',actions.open.myProfile);
  elements.permisions.buttons.open.on('click',actions.open.permisions);
  elements.permisions.buttons.homeOffice.on('click',actions.open.form);
  elements.permisions.buttons.sick.on('click',actions.open.form);
  elements.permisions.buttons.vacation.on('click',actions.open.form);
  elements.permisions.buttons.permision.on('click',actions.open.form);
}

export { Events }
