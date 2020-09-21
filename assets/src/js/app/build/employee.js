import $ from 'jquery';
import { State } from '../helpers';
import Calendar from '../calendar/component';
import Profile from '../profile/component';
import Solicitudes from '../solicitudes/component';
import Users from '../users/component';
import Menu from '../menu/component';
import Router from 'page';

function App(){
  const app = new State();
  const menu = Menu();
  const views = [
    Calendar(),
    Profile(),
    Solicitudes(),
  ];

  Router({window: window });
  Router.base('/app/dashboard');

  views.forEach((view) => {
    app.register({state: view.name, on: view.on, off: view.off});
    view.routes.forEach((routes)=>{ for (let route in routes) { Router(route,routes[route].bind(app)); } });
  });

  Router(window.location.pathname);
}


$(document).ready(App);