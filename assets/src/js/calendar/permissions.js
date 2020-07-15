import { Finder } from '../form/inputs';
import { Modal } from './modal';
import { Vacation } from './forms/vacation';

export function Permissions(){
  const elements = {
    container: $('#permissions'),
    permissions: $('.permission')
  };

  const { buttons } = Finder(elements.container);

  const modal = new Modal();

  const vacation = Vacation();

  const state = {
    open: false,
  };

  const methods = {
    'on':{
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.on(); });
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.off(); });
        if(state.open){ buttons.name.toggle.element.trigger('click'); }
      }
    }
  }

  Object.defineProperties(this,methods);

  buttons.name.toggle.events.on('click',function(){
    elements.container[ state.open ? 'removeClass' : 'addClass' ]('active');
    elements.permissions[ state.open ? 'addClass' : 'removeClass' ]('hide');
    this.element.children('i')
    .removeClass( state.open ? 'fa-times' : 'fa-bullhorn')
    .addClass( state.open ? 'fa-bullhorn': 'fa-times');
    state.open = !state.open;
  });

  buttons.name.vacation.events.on('click',function(){
    modal.open('test');
    vacation.on();
    vacation.element.removeClass('hidden');
  });

}
