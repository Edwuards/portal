import { ToolBar } from './toolbar';
import { Observer } from '../helpers';
import Router from 'page';

export default function(){
  const toolbar = new ToolBar('users');
  const buttons = toolbar.buttons;
  const toggle = (btns,state)=>{
    btns.forEach((name)=>{
      let btn = buttons.name[name];
      btn[state ? 'on' : 'off']();
      btn.element[state ? 'removeClass' : 'addClass']('hidden');
    })
  }
  const observer = new Observer([
    'edit profile',
    'cancel edit profile',
    'create user',
  ]);
  const groups = {
    'view users': ['create','delete'],
    'create user': ['exit','cancel','save'],
    'edit profile': ['exit','cancel','save'],
    'read profile': ['exit','edit']
  };

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'view users',
    on:()=>{
      toolbar.title.text('Usuarios');
      toggle(groups['view users'],true);
    },
    off: ()=>{ toggle(groups['view users'],false); }
  });

  toolbar.state.register({
    state:'create user',
    on:()=>{
      toolbar.title.text('Crear Usuario');
      toggle(groups['create user'],true);
    },
    off: ()=>{ toggle(groups['create user'],false); }
  });

  toolbar.state.register({
    state:'read profile',
    on:()=>{
      toolbar.title.text('Perfil de Usuario');
      toggle(groups['read profile'],true);
    },
    off: ()=>{ toggle(groups['read profile'],false); }
  });

  toolbar.state.register({
    state:'edit profile',
    on:()=>{
      toolbar.title.text('Editar Usuario');
      toggle(groups['edit profile'],true);
    },
    off: ()=>{ toggle(groups['edit profile'],false); }
  });

  toolbar.events = {
    on: observer.register,
    off: observer.unregister
  }

  buttons.name.exit.events.on('click',function(){ Router('/users/view/all'); });

  buttons.name.edit.events.on('click',function(){
    toolbar.state.value = 'edit profile';
    observer.notify('edit profile');
  });

  buttons.name.create.events.on('click',function(){ Router('/users/create'); });


  buttons.name.cancel.events.on('click',function(){
    if(toolbar.state.value == 'edit profile'){
      toolbar.state.value = 'read profile';
      observer.notify('cancel edit profile')
    }
    else if(toolbar.state.value == 'create user'){
      toolbar.state.value = 'read profile';
      Router('/users/view/all');
    }
  });


  return toolbar;

}
