import { ToggleObjects } from '../helpers';
import { Calendar } from './bars/calendar';
import { Profile } from './bars/profile';
import { Solicitudes } from './bars/solicitudes';

export function Navigation(){
  ToggleObjects.call(this,[
    new Calendar(),
    new Profile(),
    new Solicitudes(),
  ]);

}
