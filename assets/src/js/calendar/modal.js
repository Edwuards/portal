import { Finder } from '../form/inputs';

export function Modal(){
  const elements = {};
  elements.container = $('[data-modal="permissions"]');
  elements.modal = elements.container.find('.modal');
  elements.header = elements.modal.find('.header');
  elements.title = elements.header.find('.title');
  elements.type = elements.header.find('.type');

  const { buttons } = Finder(elements.header);

  const state = { type: undefined };

  const methods = {
    'on': {
      writable: false,
      value: ()=>{
        buttons.name.close.on();
        elements.container.on('click',(e)=>{
          if($(e.target).hasClass('modal-cont')){
            buttons.name.close.element.trigger('click');
          }
        });
      }
    },
    'off': {
      writbale: false,
      value: ()=>{
        buttons.name.close.off();
        elements.container.off('click');
      }
    },
    'open': {
      writable: false,
      value: (title,type)=>{
        state.type = type;
        elements.title.html(title);
        elements.type.addClass(type);
        elements.container.addClass('active');
      }
    },
    'alive': {
      get: ()=>{ return ALIVE }
    },
    'buttons':{
      get: ()=>{ return buttons }
    },
    'close': {
      writable: false,
      value: ()=>{
        elements.type.removeClass(state.type);
        elements.container.removeClass('active');
      }
    }
  };

  Object.defineProperties(this,methods);


}
