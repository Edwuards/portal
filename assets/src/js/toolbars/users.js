import { ToolBar } from './toolbar';

export default function(){
  const toolbar = new ToolBar('users');
  const buttons = toolbar.buttons;
  const toggle = (btns,state)=>{
    for (let btn in btns) {
      btn = btns[btn];
      btn[state ? 'on' : 'off']();
      btn.element[state ? 'removeClass' : 'addClass']('hidden');
    }
  }

  toolbar.title = toolbar.element.find('[data="title"]');

  toolbar.state.register({
    state:'users',
    on:()=>{
      toolbar.title.text('Usuarios');
      toggle(buttons.group.users,true);
    },
    off: ()=>{ toggle(buttons.group.users,false); }
  });

  toolbar.state.register({
    state:'read profile',
    on:()=>{
      toolbar.title.text('Perfil de Usuario');
      toggle(buttons.group.readProfile,true);
    },
    off: ()=>{ toggle(buttons.group.readProfile,false); }
  });

  toolbar.state.register({
    state:'edit profile',
    on:()=>{
      toolbar.title.text('Editar Usuario');
      toggle(buttons.group.editProfile,true);
    },
    off: ()=>{ toggle(buttons.group.editProfile,false); }
  });

  return toolbar;

}
