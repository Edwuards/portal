import { Finder } from '../form/inputs';
import { Modal } from './modal';
import { Vacation } from './forms/vacation';
import { HomeOffice } from './forms/homeOffice';
import { Sick } from './forms/sick';
import { Permission } from './forms/permission';

export function Permissions(){
  const elements = {
    container: $('#permissions'),
    permissions: $('.permission')
  };

  const { buttons } = Finder(elements.container);

  const modal = new Modal();

  const forms = {};
  forms.all = [ Vacation(), HomeOffice(), Sick(), Permission() ];
  forms.open = (name)=>{
    let form = forms.all.find(form => name == form.name );
      state.currentForm = form;
      buttons.name.toggle.element.trigger('click');
      modal.open(form.title,form.color);
      form.on();
      form.element.removeClass('hidden');
  }
  forms.close = function(){
    let form = state.currentForm;
    modal.close();
    form.off();
    form.element.addClass('hidden');
  }

  forms.init = (form)=>{
    form.events.on('send',function(message){
      if(!message.error){ modal.buttons.name.close.element.trigger('click'); }
    });
  }

  const toggle = function(){
    elements.container[ state.open ? 'removeClass' : 'addClass' ]('active');
    elements.permissions[ state.open ? 'addClass' : 'removeClass' ]('hide');
    this.element.children('i')
    .removeClass( state.open ? 'fa-times' : 'fa-bullhorn')
    .addClass( state.open ? 'fa-bullhorn': 'fa-times');
    state.open = !state.open;
  };

  const state = {
    open: false,
    currentForm: false
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
        if(state.open){ buttons.name.toggle.element.trigger('click'); }
        if(state.currentForm){ modal.buttons.name.close.element.trigger('click'); }
        buttons.all.forEach((btn)=>{ btn.off(); });
      }
    },
    'buttons':{
      get: ()=>{ return buttons }
    },
    'form':{
      writable: false,
      value: forms.open
    }
  }


  Object.defineProperties(this,methods);

  forms.all.forEach(forms.init);

  buttons.name.toggle.events.on('click',toggle);

  modal.buttons.name.close.events.on('click',forms.close);

  // buttons.name.vacation.events.on('click',forms.open('vacation'));
  //
  // buttons.name.sick.events.on('click',forms.open('sick'));
  //
  // buttons.name.homeOffice.events.on('click',forms.open('homeOffice'));
  //
  // buttons.name.permission.events.on('click',forms.open('permission'));

}
