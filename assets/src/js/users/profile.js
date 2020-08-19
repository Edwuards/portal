import { View } from '../helpers';

export function Profile({navigation,router,state}){
  View.call(this,'profile');
  const nav = navigation.get.profile;

  const routes = {
    '/profile/*': function(ctx,next){
      if(!(state.get == 'profile')){ state.set = 'profile'; }
      next();
    },
    '/profile/': function(){
    }

  }


  this.on = function(){
    navigation.set = 'profile';
  }

  this.off = function(){
  }

  state.register({state:'profile', on:this.on, off:this.off});

  router.add(routes);

}
