import { State } from '../helpers';
import Menu from '../menu/component';
import Router from 'page';

export default function(components){
  return ()=>{
    const state = new State();
    const menu = Menu();

    Router({window: window });
    Router.base('/app/dashboard');
    for (let component  in components) {
      components[component] = components[component](components);
      component = components[component];
      state.register({state: component.name, on: component.on, off: component.off});
      component.routes.forEach((routes)=>{ for (let route in routes) { Router(route,routes[route].bind({state})); } });
    }

    Router(window.location.pathname);
  }
}
