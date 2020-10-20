import { ToolBar } from './toolbar';
import { Observer } from '../helpers';
import Router from 'page';

export default function(){
  const toolbar = new ToolBar('profile');
  const buttons = toolbar.buttons;
  const observer = new Observer([
    'edit profile',
    'cancel edit profile',
  ]);

  const groups = {
    'view profile': ['edit'],
    'edit profile': ['exit','cancel','confirm']
  };

  toolbar.events = {
    on: observer.register,
    off: observer.unregister
  }

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'view profile',
    on:()=>{
      toolbar.title.text('Mi Perfil');
      toolbar.toggleBtns(groups['view profile'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['view profile'],false); }
  });

  toolbar.state.register({
    state:'edit profile',
    on:()=>{
      buttons.name.confirm.element.children('p').text('Guardar');
      toolbar.title.text('Editar Mi Perfil');
      toolbar.toggleBtns(groups['edit profile'],true);
    },
    off: ()=>{ toolbar.toggleBtns(groups['edit profile'],false); }
  });

  buttons.name.edit.events.on('click',function(){
    toolbar.state.value = 'edit profile';
    observer.notify('edit profile');
  });

  buttons.name.cancel.events.on('click',function(){
    let state = toolbar.state.value;
    if( state == 'edit profile'){
      toolbar.state.value = 'view profile';
      observer.notify('cancel edit profile')
    }
    else if(state == 'edit profile'){
      Router('/profile/view');
    }
  });

  buttons.name.exit.events.on('click',function(){ Router('/profile/view'); });

  return toolbar

}
