import { View } from '../helpers';
import { Solicitudes } from './solicitudes';
import Toolbar from '../toolbars/solicitudes';

export default function (){
  const view = new View({ name:'solicitudes',toolbar: ToolBar() });
  const body = view.element.children('.body');
  const solicitudes = new Solicitudes();
  const select = view.toolbar.inputs.type.select;
  const urlSegments = ()=>{ return window.location.pathname.split('/app/dashboard/solicitudes/')[1].split('/'); }

  const routes = {
    '/solicitudes/*': function(ctx,next){
      if(!(this.state == 'solicitudes')){ this.state = 'solicitudes'; }
      next();
    },
    '/solicitudes/:view/:status': solicitudes.view
  }

  view.routes = [routes];

  solicitudes.events.on('add',function(card){ body.append(card); });

  solicitudes.start();

  select.state.events.on('change',function(){
    let path = urlSegments(); path[1] = this.value;
    router.instance(`/solicitudes/${path.join('/')}`);
  });

  return view

}
