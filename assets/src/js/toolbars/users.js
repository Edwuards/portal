import { ToolBar } from './toolbar';
import { Observer } from '../helpers';
import Router from 'page';

export default function(){
  const toolbar = new ToolBar('users');
  const buttons = toolbar.buttons;
  const observer = new Observer([
    'edit profile',
    'cancel edit profile',
  ]);

  const groups = {
    'view users': ['create','delete'],
    'create user': ['exit','cancel','save'],
    'edit profile': ['exit','cancel','save'],
    'read profile': ['exit','edit']
  };

  toolbar.events = {
    on: observer.register,
    off: observer.unregister
  }

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'view users',
    on:()=>{
      toolbar.title.text('Usuarios');
      toolbar.toggleBtns(groups['view users'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['view users'],false); }
  });

  toolbar.state.register({
    state:'create user',
    on:()=>{
      toolbar.title.text('Crear Usuario');
      toolbar.toggleBtns(groups['create user'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['create user'],false); }
  });

  toolbar.state.register({
    state:'read profile',
    on:()=>{
      toolbar.title.text('Perfil de Usuario');
      toolbar.toggleBtns(groups['read profile'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['read profile'],false); }
  });

  toolbar.state.register({
    state:'edit profile',
    on:()=>{
      toolbar.title.text('Editar Usuario');
      toolbar.toggleBtns(groups['edit profile'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['edit profile'],false); }
  });

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
