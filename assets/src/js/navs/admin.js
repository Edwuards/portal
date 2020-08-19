import { ToggleObjects } from '../helpers';
import { Calendar } from './bars/calendar';
import { Profile } from './bars/profile';
import { Solicitudes } from './bars/solicitudes';
import { Users } from './bars/users';

export function Navigation(){
  ToggleObjects.call(this,[
    new Calendar(),
    new Profile(),
    new Solicitudes(),
    new Users(),
  ]);

}
