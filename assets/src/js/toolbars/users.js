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

  toolbar.state.register({
    state:'users',
    on:()=>{ toggle(buttons.group.users,true); },
    off: ()=>{ toggle(buttons.group.users,false); }
  });

  toolbar.state.register({
    state:'profile',
    on:()=>{ toggle(buttons.group.profile,true); },
    off: ()=>{ toggle(buttons.group.profile,false); }
  });

  return toolbar;

}
