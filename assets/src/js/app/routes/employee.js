import page from 'page';

export function Routes(app){
  const { calendar } = app.get;
  const base = '/app/dashboard/employee';
  const routes = {
    '/calendar': function(ctx,next){
      app.set = 'calendar';
    },
    '/calendar/solicit/:name': calendar.solicit
  }

  page.base(base);
  page({window: window })
  for(let route in routes){
    page(route,routes[route]);
  }

  page('/calendar');
}
