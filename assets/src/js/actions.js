import { default as calendarInit } from './calendar.js';
import { default as navInit } from './nav.js';
import { default as permisionsInit } from './permisions.js';
import { default as modalInit } from './modal.js';
import { default as formsInit } from './forms/forms.js';

export default function(){
  const Calendar = calendarInit();
  const Nav = navInit();
  const Modal = modalInit();
  const Forms = formsInit();
  const Permisions = permisionsInit();
  const Actions = {};
  const Elements = {};
  console.log(Nav);
  Actions.open = {};
  Actions.update = {};
  Actions.update.date = (format)=>{
    if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
    Nav.elements.date.html(Calendar.formatDate(Calendar.getDate(),format));
  }
  Actions.calendar = {};
  Actions.calendar.render = ()=>{
    Actions.update.date();
    /*
      Se le suma un pixel debido al border top del contendor del Calendar.
      Se le suma 24 pixels por el alto del header que contiene los dias
      dentro del calendar.
      su total son 25 pixels para que se ajuste al tamaño de la pantalla.
    */
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
    let form = Forms[btn.attr('name')];
    form.init();
    Modal.actions.open({title: form.title, body: form.form });
    Permisions.actions.close();
    Modal.elements.button.close.on('click',()=>{
      Modal.actions.close();
      form.close();
      Modal.elements.button.close.off('click')
    })

  };
  Actions.open.profile = ()=>{
    let form = Forms.profile;
    Nav.elements.menu.container.trigger('click');
    Modal.elements.button.edit.removeClass('hidden');
    Modal.elements.button.accept.addClass('hidden');
    Modal.actions.open({title: form.title, body: form.form });
    Modal.elements.button.close.on('click',()=>{
      Modal.actions.close();
      Modal.elements.button.edit.removeClass('hidden');
      Modal.elements.button.accept.addClass('hidden');
      Modal.elements.button.close.off('click')
    });
  }


  [['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}
