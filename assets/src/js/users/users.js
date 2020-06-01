import { Button } from '../inputs.js';
import { Observer } from '../helpers.js';
import { User } from './cards/index.js';
import { Create , Edit, Profile } from '../forms/user/index.js';
import { Services } from '../services.js';

function UsersList(name){
  const INSTANCE = this;
  const CONTAINER = $(`[data-users="${name}"]`);
  const LIST = CONTAINER.find('[name="list"]');
  const BUTTONS = {};
  const PROPS = {
    alive: false,
    users: [],
  };
  const SECTIONS = {
    create: new Component('create',Create),
    edit: new Component('edit',Edit),
  };
  const ADD = (user)=>{
    user = PROPS.users[PROPS.users.push(new User(user)) -1 ]
    user.buttons.view.events.on('click',function(){
      SECTIONS.edit.open(user.user);
    });
    if(PROPS.alive){ user.on(); }
    LIST.append(user.element);

  }
  const UPDATE = (user)=>{
    PROPS.users.find((card)=>{ return card.user.id == user.id}).update(user);
  }
  const DELETE = ()=>{
    PROPS.users.forEach((card)=>{
      if(card.element.hasClass('delete')){
        card.off(); card.element.remove();
        Services.delete.user({id:card.user.id},function(response){})
      };
    });
  }
  const METHODS = {
    'open':{
      writable: false,
      value: ()=>{
        PROPS.alive = true;
        for (let name in BUTTONS) { BUTTONS[name].on(); }
        PROPS.users.forEach(user => user.on() );
        CONTAINER.addClass('active');
      }
    },
    'close':{
      writable: false,
      value: ()=>{
        CONTAINER.removeClass('active');
        PROPS.alive = false;
        for (let name in BUTTONS) { BUTTONS[name].off(); }
        PROPS.users.forEach(user => user.off() );
      }
    },
    'update':{
      writable: false,
      value: (aviso)=>{

      }
    },
    'add': {
      configurable: true,
      value: ADD
    },
    'buttons':{
      writable: false,
      value: BUTTONS,
    }
  }


  CONTAINER
  .children('.header')
  .find('button').each(function(){
    let el = $(this),
    name = el.attr('name'),
    state = el.attr('data');

    BUTTONS[name] = new Button(el);
  });

  Object.defineProperties(this,METHODS);


  {
    let btns = this.buttons;
    btns.create.events.on('click',function(){
      SECTIONS.create.open();
    });

    btns.create.events.on('click',function(){
      SECTIONS.create.open();
    });

    btns.cancel.events.on('click',function(){
      btns.delete.element.data('active',true).removeClass('hidden');
      btns.confirm.element.addClass('hidden');
      btns.cancel.element.addClass('hidden');
      btns.create.element.removeClass('hidden');

      CONTAINER.find('.card.delete').removeClass('delete');
      CONTAINER.find('.card').off('click.delete');
    });

    btns.confirm.events.on('click',function(){
      DELETE();
      btns.cancel.element.trigger('click');
    });

    btns.delete.events.on('click',function(){
      CONTAINER.find('.card').on('click.delete',function(){
        $(this).toggleClass('delete');
      });
      btns.delete.element.data('active',true).addClass('hidden');
      btns.create.element.addClass('hidden');
      btns.cancel.element.removeClass('hidden');
      btns.confirm.element.removeClass('hidden');
    })
  }

  SECTIONS.edit.buttons.edit.events.on('click',function(){
    let btns = SECTIONS.edit.buttons;
    SECTIONS.edit.form.disable(false);
    btns.edit.element.addClass('hidden');
    btns.send.element.removeClass('hidden');
  });
  SECTIONS.edit.buttons.send.events.on('click',SECTIONS.edit.form.send);
  SECTIONS.edit.buttons.cancel.events.on('click',function(){
    let btns = SECTIONS.edit.buttons;

    btns.edit.element.removeClass('hidden');
    btns.send.element.addClass('hidden');

    SECTIONS.edit.close();
  });
  SECTIONS.edit.form.events.on('response',function(response){
    let { error, data} = response;
    if(!error){
      UPDATE(data);
      let btns = SECTIONS.edit.buttons;
      btns.edit.element.removeClass('hidden');
      btns.send.element.addClass('hidden');
    }
  });
  SECTIONS.edit.form.events.on('send',function(response){
    let { error, data} = response;
    if(!error){ SECTIONS.edit.close(); }
  });
  SECTIONS.create.buttons.cancel.events.on('click',SECTIONS.create.close);
  SECTIONS.create.buttons.send.events.on('click',SECTIONS.create.form.send);
  SECTIONS.create.form.events.on('send',function(response){
    let { error, data} = response;

    if(!error){
      let {name,lastname,email,avatar} = data;
      let fullname = name+' '+lastname;
      let position = '';
      ADD({fullname,position,email,avatar}); SECTIONS.create.close();
    }
  });
  SECTIONS.create.form.events.on('response',function(response){
    let { error, data} = response;
    if(!error){
      PROPS.users.find((card)=>{ return card.user.email == data.email; }).update(data);
    }
  });


}

function Component(name,form){
  const INSTANCE = this;
  const CONTAINER = $(`[data-users="${name}"]`);
  const BUTTONS = {};
  const FORM = form;


  const PROPS = {
    alive: false,
  };

  const METHODS = {
    'element':{
      get:()=>{ return CONTAINER }
    },
    'open':{
      configurable:true,
      writable: false,
      value: (data)=>{
        data ? FORM.open(data) : FORM.open();
        PROPS.alive = true;
        for (let name in BUTTONS) { BUTTONS[name].on(); }
        CONTAINER.removeClass('hidden');
      }
    },
    'close':{
      configurable:true,
      writable: false,
      value: ()=>{
        FORM.close();
        CONTAINER.addClass('hidden');
        PROPS.alive = false;
        for (let name in BUTTONS) { BUTTONS[name].off(); }
        CONTAINER.find('section').html(FORM.element);
      }
    },
    'buttons':{
      writable: false,
      value: BUTTONS,
    },
    'form': {
      get:()=>{ return FORM }
    }
  }



  CONTAINER
  .children('.header')
  .find('button').each(function(){
    let el = $(this),
    name = el.attr('name'),
    state = el.attr('data');

    BUTTONS[name] = new Button(el);
  });

  Object.defineProperties(this,METHODS);

}

function UserProfile(){
  Component.call(this,'profile',Profile)
  const METHODS = {
    'open':{
      writable: false,
      value: (data)=>{
        this.form.open(this.user);
        this.element.addClass('active');
      }
    },
    'close':{
      writable: false,
      value: ()=>{
        this.element.removeClass('active');
      }
    }
  }

  Object.defineProperties(this,METHODS);

}

export { UsersList, UserProfile }
