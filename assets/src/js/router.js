import page from 'page';

export function Router(){
  const methods = {
    'add': {
      writable:false,
      value: (routes)=>{
        for(let route in routes){
          page(route,routes[route]);
        }
      }
    },
    'instance': {
      get:()=>{ return page }
    }
  }

  page({window: window });

  Object.defineProperties(this,methods);
}
