import { Content } from './content';

export function Calendar(calendar){
  Content.call(this,'calendar');
  this.on = ()=>{
    calendar.permissions.on();
  }

  this.off = ()=>{
    calendar.permissions.off();
  }
}
