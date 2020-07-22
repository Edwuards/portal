import { Finder } from '../form/inputs';

export function Component(inject,current){
  const {navigation: Navigation, context:Context } = inject;

  const elements = {
    content: $('#content'),
    container: $('#menu'),
    menu: $('[data-menu="toggle"]')
  }

  const state = {
    open: false,
    context: current.context,
    navigation: current.navigation
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
    },
    'changeContext':{
      writable:false,
      value: (change)=>{
        let close = false;
        let {context,navbar} = change;
        if(state.context !== context){
          state.context = context;
          close = true;
          Context.change(context);
        }
        if(state.navbar !== navbar){
          state.navbar = navbar;
          close = true;
          Navigation.change(navbar);
        }

        if(close){ elements.menu.trigger('click'); }
      }
    }
  }

  Object.defineProperties(this,methods);

  elements.menu.on('click',toggle);

  buttons.all.forEach(buttonClicked);

}
