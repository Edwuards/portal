import { default as calendarInit } from './calendar.js';
import { default as navInit } from './nav.js';
import { default as permisionsInit } from './permisions.js';
import { default as modalInit } from './modal.js';
import { default as formsInit } from './forms/forms.js';
import { default as tablesInit } from './dataTable.js';
import { HTML } from './forms/templates.js';

export default function(){
  const Calendar = calendarInit();
  const Nav = navInit();
  const Modal = modalInit();
  const Forms = formsInit();
  const Permisions = permisionsInit();
  const Tables = tablesInit();
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
  Actions.open.form = function(){
    let btn = $(this);

    Modal.actions.open({title: 'form.title', body: HTML.permision() });
    Permisions.actions.close();
    Modal.elements.button.close.on('click',()=>{
      Modal.actions.close();

      Modal.elements.button.close.off('click')
    })
  };
  Actions.open.table = function(){
    let name = $(this).attr('name');
    Nav.elements.button.menu.trigger('click');
    Nav.actions.updateMenu(name);
    Nav.actions.changeNavBar(name);
    Tables.actions.open(name);

  };
  Actions.open.calendar = function(){
    Nav.elements.button.menu.trigger('click');
    Nav.actions.updateMenu('calendar');
    Nav.actions.changeNavBar('calendar');
    Nav.actions.closeMenu();
    Tables.actions.close();
  };

  [['modal',Modal],['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}
