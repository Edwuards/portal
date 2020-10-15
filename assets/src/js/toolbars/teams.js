import { ToolBar } from './toolbar';
import { Observer } from '../helpers';
import Router from 'page';

export default function(){
  const toolbar = new ToolBar('teams');
  const buttons = toolbar.buttons;

  const observer = new Observer([
    'edit team',
    'cancel edit team',
    'create team',
    'delete teams'
  ]);
  const groups = {
    'view teams': ['create','delete'],
    'create team': ['exit','cancel','confirm'],
    'edit team': ['exit','cancel','confirm'],
    'view team': ['exit','edit'],
    'delete teams': ['exit','cancel','confirm'],
  };

  toolbar.events = {
    on: observer.register,
    off: observer.unregister
  }

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'view teams',
    on:()=>{
      toolbar.title.text('Equipos');
      toolbar.toggleBtns(groups['view teams'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['view teams'],false); }
  });

  toolbar.state.register({
    state:'view team',
    on:()=>{
      toolbar.title.text('Perfil de Equipo');
      toolbar.toggleBtns(groups['view team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['view team'],false); }
  });

  toolbar.state.register({
    state:'create team',
    on:()=>{
      buttons.name.confirm.element.children('p').text('Crear Equipo');
      toolbar.title.text('Crear Equipo');
      toolbar.toggleBtns(groups['create team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['create team'],false); }
  });

  toolbar.state.register({
    state:'edit team',
    on:()=>{
      buttons.name.confirm.element.children('p').text('Guardar');
      toolbar.title.text('Editar Equipo');
      toolbar.toggleBtns(groups['edit team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['edit team'],false); }
  });

  toolbar.state.register({
    state:'delete teams',
    on:()=>{
      buttons.name.confirm.element.children('p').text('Eliminar');
      toolbar.title.text('Eliminar Equipos');
      toolbar.toggleBtns(groups['delete teams'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['delete teams'],false); }
  });


  buttons.name.create.events.on('click',function(){ Router('/teams/create'); });

  buttons.name.cancel.events.on('click',function(){
    let state = toolbar.state.value;
    if( state == 'edit team'){
      toolbar.state.value = 'view team';
      observer.notify('cancel edit team');
    }
    else if(state == 'create team' || state == 'delete teams'){
      Router('/teams/view/all');
    }
  });

  buttons.name.exit.events.on('click',function(){ Router('/teams/view/all'); });

  buttons.name.edit.events.on('click',function(){
    toolbar.state.value = 'edit team';
    observer.notify('edit team');
  });

  buttons.name.confirm.events.on('click',function(){
    let state = toolbar.state.value;
    if(state == 'delete teams'){ observer.notify('delete teams'); }

  });

  buttons.name.delete.events.on('click',function(){
    Router('/teams/delete');
  });


  return toolbar;

}
