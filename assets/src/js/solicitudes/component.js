import { View } from '../helpers';
import { Solicitudes } from './solicitudes';

function Component({navigation,router,state}){
  View.call(this,'solicitudes');
  const nav = navigation.get.solicitudes;
  const body = this.element.children('.body');
  const solicitudes = new Solicitudes({router});
  const select = nav.inputs.type.select;
  const url = { view: '', status: ''};

  const routes = {
    '/solicitudes/*': function(ctx,next){
      if(!(state.get == 'solicitudes')){ state.set = 'solicitudes'; }
      next();
    },
    '/solicitudes/:view/:status': solicitudes.view

  }

  this.on = function(){
    navigation.set = 'solicitudes';
  }

  this.off = function(){
  }

  solicitudes.events.on('add',function(card){ body.append(card); });

  solicitudes.start();

  select.state.events.on('change',function(){
    url.status = this.value;
  })

  state.register({state:'solicitudes', on:this.on, off:this.off});

  router.add(routes);

}

export { Component as Solicitudes }
