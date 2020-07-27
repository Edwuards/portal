import { Finder } from '../form/inputs';

export function Component(){

  const elements = {
    content: $('#content'),
    container: $('#menu'),
    menu: $('[data-menu="toggle"]')
  }

  const state = {
    open: false,
  }

  const { buttons } = Finder(elements.container);

  const toggle = ()=>{
    buttons.all.forEach((btn)=>{ btn[state.open ? 'off' : 'on' ](); });
    elements.content.toggleClass('open');
  }

  const buttonClicked = (btn)=>{
    btn.events.on('click',function(){
      buttons.all.forEach((btn)=>{ btn.element.removeClass('border-l-2'); })
      this.element.addClass('border-l-2');
    });
  }

  const methods = {
    'buttons': {
      get: ()=>{ return buttons }
    }
  }

  Object.defineProperties(this,methods);

  elements.menu.on('click',toggle);

  buttons.all.forEach(buttonClicked);

}
