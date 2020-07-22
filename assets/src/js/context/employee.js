import { ToggleObjects } from '../helpers';
import { Calendar } from './content/calendar';
import { Profile } from './content/profile';

export function Context(dependencies){
  const context = [];

  {
    let { calendar } = dependencies;
    context.push(new Calendar(calendar));
    context.push(new Profile());
  }

  ToggleObjects.call(this,context,'calendar');

  this.active.on();
}
