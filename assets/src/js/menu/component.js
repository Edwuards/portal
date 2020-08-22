import { Finder } from '../form/inputs';
import Router from 'page';

export default function(){
  const menu = {};

  const elements = {
    content: $('#content'),
    container: $('#menu'),
    toggle: $('[data-menu="toggle"]')
  }

  const state = {
    open: false,
  }

  const { buttons } = Finder(elements.container);

  const toggle = ()=>{
    buttons.all.forEach((btn)=>{ btn[state.open ? 'off' : 'on' ](); });
    elements.content.toggleClass('open');
  }

  const init = ()=>{
    let current = window.location.pathname.split('/app/dashboard/')[1].split('/')[0];
    return (btn)=>{
      let route = btn.element.attr('data-route');
      if(route.split('/')[0] == current){ btn.element.addClass('border-l-2'); }
      btn.events.on('click',function(){
        buttons.all.forEach((btn)=>{ btn.element.removeClass('border-l-2'); })
        this.element.addClass('border-l-2');
        Router(`/${route}`);
        toggle();
      });
    }
  }

  const methods = {
    'buttons': {
      get: ()=>{ return buttons }
    }
  }

  Object.defineProperties(menu,methods);

  elements.toggle.on('click',toggle);

  buttons.all.forEach(init());

  return menu;

}
