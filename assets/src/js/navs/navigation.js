export function Navigation(Bars,current){
  let Current = current;

  const Methods = {
    'current': {
      get: ()=>{ return current.name }
    },
    'change': {
      enumerable: true,
      writable: false,
      value: (name)=>{
        Current.off();
        for (let bar in Bars) {
          if(Bars[bar].name == name){
            Bars[bar].on();
            Current = Bars[bar];
          }
        }
      }
    }
  }

  Current.on();
  Object.defineProperties(this,Methods);
}
