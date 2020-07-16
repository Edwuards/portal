import { Finder } from '../form/inputs';

export function Modal(){
  const elements = {};
  elements.container = $('[data-modal="permissions"]');
  elements.modal = elements.container.find('.modal');
  elements.header = elements.modal.find('.header');
  elements.title = elements.header.find('.title');
  elements.type = elements.header.find('.type');

  const { buttons } = Finder(elements.header);

  const methods = {
    'open': {
      writable: false,
      value: (title,type)=>{
        buttons.name.close.on();
        elements.title.html(title);
        elements.type.addClass(type);
        elements.container.addClass('active');
        elements.container.on('click',(e)=>{
          if($(e.target).hasClass('modal-cont')){
            buttons.name.close.element.trigger('click');
          }
        });
      }
    },
    'close': {
      writable: false,
      value: ()=>{
        elements.container.off('click').removeClass('active');
        buttons.name.close.off();
      }
    },
    'buttons': {
      get: ()=>{ return buttons }
    }
  };

  Object.defineProperties(this,methods);

}
