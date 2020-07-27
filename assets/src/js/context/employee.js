import { ToggleObjects } from '../helpers';
import { Calendar } from './components/calendar';
import { Profile } from './components/profile';
import { Navigation } from '../navs/employee';
import { Menu } from '../menu/employee';

export function App({calendar}){
  const menu = new Menu();
  const navigation = new Navigation();
  const app = this;
  ToggleObjects.call(this,[
    new Calendar({calendar,navigation}),
    new Profile({navigation})
  ]);





}
