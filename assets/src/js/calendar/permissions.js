import { Finder } from '../form/inputs';
import { Modal } from './modal';
import { Vacation } from './forms/vacation';
import { HomeOffice } from './forms/homeOffice';
import { Sick } from './forms/sick';
import { Permission } from './forms/permission';

export function Permissions({router}){
  const elements = {
    container: $('#permissions'),
    permissions: $('.permission')
  };

  const { buttons } = Finder(elements.container);

  const modal = new Modal();
  const options = {};
  const forms = {};

  forms.current = false;
  forms.all = [ Vacation(), HomeOffice(), Sick(), Permission() ];
  forms.open = (name)=>{
    let form = forms.all.find(form => name == form.name );
      forms.current = form;
      modal.open(form.title,form.color);
      options.close();
      form.on();
      form.element.removeClass('hidden');
  }
  forms.close = function(){
    if(forms.current){
      let form = forms.current;
      modal.close();
      form.off();
      form.element.addClass('hidden');
      forms.current = false;
    }
  }
  forms.init = (form)=>{
    const { name } = form;
    form.events.on('send',function(message){
      if(!message.error){ modal.buttons.name.close.element.trigger('click'); }
    });
    buttons.name[name].events.on('click',function(){ router.instance(`/solicit/${name}`); });
  }

  options.state = false;
  options.toggle  = function(){
    elements.container[ options.state  ? 'removeClass' : 'addClass' ]('active');
    elements.permissions[ options.state  ? 'addClass' : 'removeClass' ]('hide');
    buttons.name.toggle.element.children('i')
    .removeClass( options.state  ? 'fa-times' : 'fa-bullhorn')
    .addClass( options.state  ? 'fa-bullhorn': 'fa-times');
    options.state  = !options.state ;
  };
  options.open = ()=>{ if(!options.state){ options.toggle(); } }
  options.close = ()=>{ if(options.state){ options.toggle(); } }

  const methods = {
    'on':{
      writable: false,
      value: ()=>{
        modal.on();
        buttons.all.forEach((btn)=>{ btn.on(); });
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        modal.off();
        forms.close();
        options.close();
        buttons.all.forEach((btn)=>{ btn.off(); });
      }
    },
    'index': {
      writable: false,
      value: function(ctx){
        options.close();
        forms.close();
      }
    },
    'routes': {
      writable: false,
      value: {
        '/calendar/solicit/:permission': function(ctx){
          const { permission } = ctx.params;
          options.close();
          forms.open(permission);
        }
      }
    }
  }

  Object.defineProperties(this,methods);

  forms.all.forEach(forms.init);

  buttons.name.toggle.events.on('click',options.toggle);

  modal.buttons.name.close.events.on('click',function(){ router.instance('/calendar'); })

}
