import { default as calendarInit } from './calendar.js';
import { default as navInit } from './nav.js';
import { default as permisionsInit } from './permisions.js';

export default function(){
  const Calendar = calendarInit();
  const Nav = navInit();
  const Permisions = permisionsInit();
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
    let lateral = Nav.elements.lateral.container;
    lateral.addClass('open');
    lateral.on('click',function(e){
      let target = $(e.target);
      if(target.attr('id') == 'side-menu'){
        lateral.removeClass('open');
        lateral.off('click');
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


  [['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}
