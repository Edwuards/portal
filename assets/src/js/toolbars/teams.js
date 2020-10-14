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
  ]);
  const groups = {
    'view teams': ['create','delete'],
    'create team': ['exit','cancel','save'],
    'edit team': ['exit','cancel','save'],
    'view team': ['exit','edit']
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
      toolbar.title.text('Crear Equipo');
      toolbar.toggleBtns(groups['create team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['create team'],false); }
  });

  toolbar.state.register({
    state:'edit team',
    on:()=>{
      toolbar.title.text('Editar Equipo');
      toolbar.toggleBtns(groups['edit team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['edit team'],false); }
  });

  buttons.name.create.events.on('click',function(){ Router('/teams/create'); });

  buttons.name.cancel.events.on('click',function(){
    if(toolbar.state.value == 'create team'){ Router('/teams/view/all'); }
    if(toolbar.state.value == 'edit team'){
      toolbar.state.value = 'view team';
      observer.notify('cancel edit team');
    }
  });

  buttons.name.exit.events.on('click',function(){ Router('/teams/view/all'); });

  buttons.name.edit.events.on('click',function(){
    toolbar.state.value = 'edit team';
    observer.notify('edit team');
  });



  return toolbar;

}
