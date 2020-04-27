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

  console.log(Modal);

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
    let height = (window.innerHeight+25) - Nav.elements.nav.height();
    Calendar.setOption('height',height);
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
    let menu = Nav.elements.menu.container;
    menu.addClass('open');
    menu.on('click',function(e){
      let target = $(e.target);
      if(target.attr('id') == 'side-menu'){
        menu.removeClass('open');
        menu.off('click');
      }
    })
  }
  Actions.open.permisions = ()=>{
    Permisions.actions.open();
    Permisions.elements.container.on('click',function(e){
      let target = $(e.target);
      if(target.hasClass('button-cont')){
        Permisions.actions.close();
        Permisions.elements.container.off('click');
      };
    });
  }
  Actions.open.form = function(){
    let btn = $(this);
    let form = Forms[btn.attr('name')];
    form.init();
    Modal.actions.open({title: form.title, body: form.form });
    Permisions.actions.close();
    Modal.elements.buttons.close.on('click',()=>{
      Modal.actions.close();
      form.close();
      Modal.elements.buttons.close.off('click')
    })

  };
  Actions.open.myProfile = ()=>{
    let form = Forms.myProfile;
    Nav.elements.menu.container.trigger('click');
    Modal.elements.buttons.edit.removeClass('hidden');
    Modal.elements.buttons.accept.addClass('hidden');
    Modal.actions.open({title: form.title, body: form.form });
    Modal.elements.buttons.close.on('click',()=>{
      Modal.actions.close();
      Modal.elements.buttons.edit.removeClass('hidden');
      Modal.elements.buttons.accept.addClass('hidden');
      Modal.elements.buttons.close.off('click')
    });
  }
  [['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}