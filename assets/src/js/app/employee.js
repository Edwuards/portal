import $ from 'jquery';
import { State } from '../helpers';
import { Calendar } from '../calendar/component';
import { Profile } from '../user/profile';
import { Solicitudes } from '../solicitudes/component';
import { Navigation } from '../navs/employee';
import { Menu } from '../menu/employee';
import { Router } from '../router';

function App(){
  const state = new State();
  const router = new Router();
  const navigation = new Navigation();
  router.instance.base('/app/dashboard');

  new Menu({router});
  new Calendar({navigation,router,state});
  new Profile({navigation,router,state});
  new Solicitudes({navigation,router,state});

  router.instance(window.location.pathname);
}


$(document).ready(App);
