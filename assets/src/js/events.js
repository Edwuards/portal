import { default as actionsInit } from './actions.js';
import { Services } from './services.js';

function Events(){
  const {actions,elements} = actionsInit();

  actions.calendar.render();
  elements.nav.button.menu.on('click',actions.open.menu);
  elements.nav.bar.calendar.button.next.on('click',actions.calendar.next);
  elements.nav.bar.calendar.button.prev.on('click',actions.calendar.prev);
  elements.nav.bar.calendar.button.today.on('click',actions.calendar.today);
  elements.nav.menu.button.logout.on('click',actions.logout);
  elements.nav.menu.button.users.on('click',actions.open.table);
  elements.nav.menu.button.myAvisos.on('click',actions.open.table);
  elements.nav.menu.button.userAvisos.on('click',actions.open.table);
  elements.nav.menu.button.calendar.on('click',actions.open.calendar);
  elements.nav.menu.button.myProfile.on('click',actions.open.profile);
  elements.modal.errors.on('modalError',actions.modalError);


}

export { Events }
