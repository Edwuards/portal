import $ from 'jquery';
import { State } from '../helpers';
import { Calendar } from '../calendar/component';
import { Profile } from '../users/profile';
import { Solicitudes } from '../solicitudes/component';
import { Users } from '../users/component';
import { Navigation } from '../navs/admin';
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
  new Users({navigation,router,state});

  router.instance(window.location.pathname);
}


$(document).ready(App);
