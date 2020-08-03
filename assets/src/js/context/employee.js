import { State } from '../helpers';
import { Calendar } from './components/calendar';
import { Profile } from './components/profile';
import { Navigation } from '../navs/employee';
import { Menu } from '../menu/employee';
import { Router } from './router';

export function App(){
  const state = new State();
  const router = new Router();
  const navigation = new Navigation();
  router.instance.base('/app/dashboard');

  new Menu({router});
  new Calendar({navigation,router,state})
  new Profile({navigation,router,state})

  console.log()
  router.instance(window.location.pathname);
}
