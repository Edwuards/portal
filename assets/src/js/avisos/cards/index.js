import * as HTML from './html.js';
import { Button } from '../../inputs.js';
import { Observer } from '../../helpers.js';

function Card({id,status,start,end,user,title,type,email},TEMPLATE){
  const INSTANCE = this;
  const CARD = $(document.createElement('div'));
  const PROPS = {
    id,
    start: new Date(start * 1000),
    end: new Date(end * 1000),
    type,
    user,
    title,
    status,
    email
  }
  const BUTTONS = {};
  const OBSERVER = new Observer(['updateStatus']);
  const METHODS = {
    'aviso':{
      writable: false,
      value : {
        id: PROPS.id,
        start: PROPS.start,
        end: PROPS.end,
        user: PROPS.user,
        title: PROPS.title,
        status: PROPS.status
      }
    },
    'element': {
      writable: false,
      value: CARD
    },
    'buttons':{
      writable: false,
      value: BUTTONS
    },
    'on':{
      configurable: true,
      writable: false,
      value: ()=>{
        for (let name in BUTTONS) {
          BUTTONS[name].on();
        }
      }
    },
    'off':{
      configurable: true,
      writable: false,
      value: ()=>{
        for (let name in BUTTONS) {
          BUTTONS[name].off();
        }
      }
    },
    'status':{
      get:()=>{ return PROPS.status; },
      set:(status)=>{
        PROPS.status = Number(status) ;
        OBSERVER.notify('updateStatus',[{id: PROPS.id, status,email}]);
      }
    },
    'events': {
      writable: false,
      value: {
        on: OBSERVER.register,
        off: OBSERVER.unregister,
      }
    }
  }

  CARD.addClass('card relative')
  .html(TEMPLATE(PROPS))
  .find('button')
  .each(function(){
    let name = $(this).attr('name');
    BUTTONS[name] = new Button($(this));
  });

  Object.defineProperties(this,METHODS);

}

function AvisoReadCard(aviso){
  const INSTANCE = this;
  Card.call(this,aviso,HTML.AvisoReadOnly);
}

function AvisoUpdateCard(aviso){
  const INSTANCE = this;
  Card.call(this,aviso,HTML.Aviso);

  this.message = this.element.find('.message');

  aviso.status = Number(aviso.status);


  if(aviso.status == 1){
    this.buttons.approve.element.addClass('hidden');
    this.buttons.decline.events.on('click',function(){ INSTANCE.status = 0; });
  }

  if(aviso.status == 2){
    this.buttons.decline.events.on('click',function(){ INSTANCE.status = 0; });
    this.buttons.approve.events.on('click',function(){ INSTANCE.status = 1; });
  }

  if(!aviso.status){
    this.buttons.approve.element.addClass('hidden');
    this.buttons.decline.element.addClass('hidden');
  }
}


export { AvisoUpdateCard, AvisoReadCard }
