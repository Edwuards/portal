import { View } from '../helpers';

function Component({navigation,router,state}){
  View.call(this,'users');
  const nav = navigation.get.solicitudes;

  const routes = {
    '/users/*': function(ctx,next){
      if(!(state.get == 'users')){ state.set = 'users'; }
      next();
    },
    '/users/': function(){

    }

  }

  this.on = function(){
    navigation.set = 'users';
  }

  this.off = function(){
  }

  state.register({state:'users', on:this.on, off:this.off});

  router.add(routes);

}

export { Component as Users }
