import { default as calendarInit } from './calendar.js';
import { default as navInit } from './nav.js';
import { default as permisionsInit } from './permisions.js';
import { default as modalInit } from './modal.js';
import { default as tablesInit } from './tables/tables.js';
import { default as formsInit } from './forms/forms.js';

export default function(){
  const Forms = formsInit();
  const Calendar = calendarInit();
  const Nav = navInit();
  const Modal = modalInit();
  const Permisions = permisionsInit();
  const Tables = tablesInit(Modal,Forms);

  const Actions = {};
  const Elements = {};
  Actions.open = {};
  Actions.update = {};
  Actions.update.date = (format)=>{
    if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
    Nav.elements.date.html(Calendar.formatDate(Calendar.getDate(),format));
  }
  Actions.calendar = {};
  Actions.calendar.render = ()=>{
    Actions.update.date();
    // la barra de navegación mide 64px en altura por eso se la resta.
    let height = window.innerHeight - 64;
    Calendar.setOption('contentHeight',height);
    Calendar.render();
  }
  Actions.calendar.next = ()=>{
    Calendar.next();
    Actions.update.date();
  }
  Actions.calendar.prev = ()=>{
    Calendar.prev();
    Actions.update.date();
  }
  Actions.calendar.today = ()=>{
    Calendar.today();
    Actions.update.date();
  }
  Actions.open.menu = ()=>{
    if(Nav.state.menu){
      Nav.actions.closeMenu();
      Permisions.actions.show();
    }
    else{
      Nav.actions.openMenu();
      Permisions.actions.hide();
    }
  }
  Actions.open.permisions = ()=>{
    Permisions.actions[Permisions.state.open ? 'close' : 'open']();
  }
  Actions.open.permision = function(){
    let form = Forms.get($(this).attr('name'));
    Permisions.actions.close();
    let close = form.events.on('close',()=>{
      Modal.elements.button.close.trigger('click');
    });
    Modal.elements.button.close.on('click',()=>{
      if(form.alive){ form.close() }
      form.events.off('close',close);
      Modal.actions.close();
      Modal.elements.button.close.off('click')
    });

    Modal.actions.open({title: form.title, body: form.open() });
  };
  Actions.open.profile = function(){
    let form = Forms.get('profile');
    let close = form.events.on('close',()=>{
      Modal.elements.button.close.trigger('click');
    });
    Modal.elements.button.close.on('click',()=>{
      if(form.alive){ form.close() }
      form.events.off('close',close);
      Modal.actions.close();
      Modal.elements.button.close.off('click')
    });

    Modal.actions.open({title: form.title, body: form.open() });
  };
  Actions.open.table = function(){
    let name = $(this).attr('name');
    Tables.open(name);
    Nav.elements.button.menu.trigger('click');
    Nav.actions.updateMenu(name);
    Nav.actions.changeNavBar(name);
  };
  Actions.open.calendar = function(){
    Tables.close();
    Nav.elements.button.menu.trigger('click');
    Nav.actions.updateMenu('calendar');
    Nav.actions.changeNavBar('calendar');
    Nav.actions.closeMenu();
  };

  [['modal',Modal],['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}
