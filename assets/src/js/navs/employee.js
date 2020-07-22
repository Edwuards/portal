import { ToggleObjects } from '../helpers';
import { Calendar } from './bars/calendar';
import { Profile } from './bars/profile';

export function Navigation(dependencies){
  const bars = [];

  {
    let { calendar } = dependencies;
    bars.push(new Calendar(calendar));
    bars.push(new Profile());
  }

  ToggleObjects.call(this,bars,'calendar');

  this.active.on();

}
