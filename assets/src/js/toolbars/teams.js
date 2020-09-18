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
    'view all teams': ['create','delete'],
    'create team': ['exit','cancel','save'],
    'edit team': ['exit','cancel','save'],
    'view team': ['exit','edit']
  };

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'view all teams',
    on:()=>{
      toolbar.title.text('Equipos');
      toolbar.toggleBtns(groups['view all teams'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['view all teams'],false); }
  });

  toolbar.state.register({
    state:'create team',
    on:()=>{
      toolbar.title.text('Crear Equipo');
      toolbar.toggleBtns(groups['create team'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['create team'],false); }
  });

  buttons.name.create.events.on('click',function(){ Router('/teams/create'); });

  buttons.name.cancel.events.on('click',function(){
    if(toolbar.state.value = 'create team'){ Router('/teams/view/all'); }

  });



  return toolbar;

}
