import { Finder } from '../form/inputs';

export function Permissions(){
  const Elements = {
    container: $('#permissions'),
    permissions: $('.permission')
  };

  const { buttons } = Finder(Elements.container);

  let state = false;

  const Methods = {
    'on':{
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.on(); });
      }
    },
    'off':{
      writable: false,
      value: ()=>{
        buttons.all.forEach((btn)=>{ btn.off(); });
        if(state){ buttons.name.toggle.element.trigger('click'); }
      }
    }
  }

  Object.defineProperties(this,Methods);

  buttons.name.toggle.events.on('click',function(){
    Elements.container[ state ? 'removeClass' : 'addClass' ]('active');
    Elements.permissions[ state ? 'addClass' : 'removeClass' ]('hide');
    this.element.children('i')
    .removeClass( state ? 'fa-times' : 'fa-bullhorn')
    .addClass( state ? 'fa-bullhorn': 'fa-times');
    state = !state;
  });
}
