import { ToolBar } from './toolbar';
import Router from 'page';

export default function(){
  const toolbar = new ToolBar('solicitudes');
  const select = toolbar.inputs.type.select;
  const urlSegments = ()=>{ return window.location.pathname.split('/app/dashboard/solicitudes/')[1].split('/'); }

  select.status.events.on('change',function(){
    let path = urlSegments(); path[1] = this.value;
    Router(`/solicitudes/${path.join('/')}`);
  });
  if(select.owner){
    select.owner.events.on('change',function(){
      let path = urlSegments(); path[0] = this.value;
      Router(`/solicitudes/${path.join('/')}`);
    });
  }

  toolbar.matchSelectToUrl = (status,owner)=>{
    if(select.status.value != status){
      select.status.off();
      select.status.options.select(status);
      select.status.on();
    }
    if(select.owner.value != owner){
      select.owner.off();
      select.owner.options.select(owner);
      select.owner.on();
    }
  }

  return toolbar
}
