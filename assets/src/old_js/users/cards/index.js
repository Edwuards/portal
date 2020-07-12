import * as HTML from './html.js';
import { Button } from '../../inputs.js';
import { Observer } from '../../helpers.js';

function Card(user,TEMPLATE){
  user.work_start = new Date(user.work_start * 1000);
  user.birthday = new Date(user.birthday * 1000);

  const INSTANCE = this;
  const CARD = $(document.createElement('div'));
  const PROPS = {
    user
  }
  const BUTTONS = {};
  const OBSERVER = new Observer(['updateStatus']);
  const METHODS = {
    'user':{
      get: ()=>{ return PROPS.user },
      set: (value)=>{ PROPS.user = value }
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
    'events': {
      writable: false,
      value: {
        on: OBSERVER.register,
        off: OBSERVER.unregister,
      }
    }
  }

  CARD.addClass('card relative m-4')
  .html(TEMPLATE(PROPS.user))
  .find('button')
  .each(function(){
    let name = $(this).attr('name');
    BUTTONS[name] = new Button($(this));
  });

  Object.defineProperties(this,METHODS);

}

function User(user){
  const INSTANCE = this;
  Card.call(this,user,HTML.User);
  this.element.find('[name]').each(function(){
    let el = $(this);
    INSTANCE[el.attr('name')] = el;
  });

  this.update = (user)=>{
    user.work_start = new Date(user.work_start * 1000);
    user.birthday = new Date(user.birthday * 1000);
    INSTANCE.user = user;
    INSTANCE.avatar.attr('src',user.avatar);
    INSTANCE.position.html(user.position);
    INSTANCE.fullname.html(user.fullname);
    INSTANCE.email.html(user.email);
  }

}

export { User }
