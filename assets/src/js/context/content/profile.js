import { Content } from './content';

export function Profile(){
  Content.call(this,'profile');
  this.on = ()=>{
    console.log('profile on');
  }

  this.off = ()=>{
    console.log('profile off');
  }
}
