import { View } from '../helpers';
import { Solicitudes } from './solicitudes';
import ToolBar from '../toolbars/solicitudes';
import Router from 'page';

export default function (){
  const view = new View({ name:'solicitudes', element: $('[data-content="solicitudes"]')});
  const toolbar = ToolBar();
  const body = view.element.children('.body');
  const solicitudes = new Solicitudes(body);
  const select = toolbar.inputs.type.select;
  const urlSegments = ()=>{ return window.location.pathname.split('/app/dashboard/solicitudes/')[1].split('/'); }

  const routes = {
    '/solicitudes/*': function(ctx,next){
      if(!(this.state.value == 'solicitudes')){ this.state.value = 'solicitudes'; }
      next();
    },
    '/solicitudes/:view/:status': solicitudes.view
  }

  view.routes = [routes];

  view.on = function(){ toolbar.on(); }
  view.off = function(){ toolbar.off(); }


  select.state.events.on('change',function(){
    let path = urlSegments(); path[1] = this.value;
    Router(`/solicitudes/${path.join('/')}`);
  });

  return view

}
