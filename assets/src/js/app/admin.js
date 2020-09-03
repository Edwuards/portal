import $ from 'jquery';
import { State } from '../helpers';
import Calendar from '../calendar/component';
import Profile from '../profile/component';
import Solicitudes from '../solicitudes/component';
import Users from '../users/component';
import Teams from '../teams/component';
import Menu from '../menu/component';
import Router from 'page';

function App(){
  const state = new State();
  const menu = Menu();
  const calendar = Calendar();
  const profile = Profile();
  const solicitudes = Solicitudes();
  const users = Users();
  const teams = Teams();


  Router({window: window });
  Router.base('/app/dashboard');
  [calendar,profile,solicitudes,users,teams].forEach((component) => {
    state.register({state: component.name, on: component.on, off: component.off});
    component.routes.forEach((routes)=>{ for (let route in routes) { Router(route,routes[route].bind({state})); } });
  });

  Router(window.location.pathname);
}


$(document).ready(App);
