import { ToggleObjects } from '../helpers';
import { Calendar } from './bars/calendar';
import { Profile } from './bars/profile';

export function Navigation(){
  ToggleObjects.call(this,[
    new Calendar(),
    new Profile()
  ]);

}
