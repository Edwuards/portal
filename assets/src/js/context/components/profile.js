import { Context } from './context';

export function Profile({navigation}){
  Context.call(this,'profile');
  const nav = navigation.get.profile;

  this.on = ()=>{
    navigation.set = 'profile';
    console.log('profile on');
  }

  this.off = ()=>{
    console.log('profile off');
  }
}
