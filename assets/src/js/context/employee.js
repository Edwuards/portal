import { ToggleObjects } from '../helpers';
import { Calendar } from './components/calendar';
import { Profile } from './components/profile';
import { Navigation } from '../navs/employee';
import { Menu } from '../menu/employee';
import { Router } from './router';

export function App(){
  const router = new Router();
  const menu = new Menu();
  const navigation = new Navigation();

  new Calendar({navigation,router})
  new Profile({navigation,router})

  router.instance.show(window.location.pathname);
}
