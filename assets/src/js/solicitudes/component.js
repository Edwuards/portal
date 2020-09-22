import { View } from '../helpers';
import Solicitudes from './solicitudes';
import ToolBar from '../toolbars/solicitudes';
import Router from 'page';

export default function (){
  const view = new View({ name:'solicitudes', element: $('[data-content="solicitudes"]')});
  const toolbar = ToolBar();
  const solicitudes = new Solicitudes();

  const routes = {
    '/solicitudes/*': function(ctx,next){
      if(!(this.state.value == 'solicitudes')){ this.state.value = 'solicitudes'; }
      next();
    },
    '/solicitudes/:owner/:status/:solicitud': function(ctx){
      let { owner, solicitud , status } = ctx.params;
      if(solicitud == 'all'){
        if(!(view.state.value !== 'view all')){ view.state.value = 'view all'; }
        toolbar.matchSelectToUrl(status,owner);
        solicitudes.list.show(owner,status);
      }


    }
  }

  view.routes = [routes];

  view.on = function(){ toolbar.on(); }
  view.off = function(){ toolbar.off(); }


  return view

}
