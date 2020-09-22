import { ToolBar } from './toolbar';

export default function(){
  const toolbar = new ToolBar('solicitudes');
  const select = toolbar.inputs.type.select;
  const urlSegments = ()=>{ return window.location.pathname.split('/app/dashboard/solicitudes/')[1].split('/'); }

  select.state.events.on('change',function(){
    let path = urlSegments(); path[1] = this.value;
    Router(`/solicitudes/${path.join('/')}`);
  });


}
