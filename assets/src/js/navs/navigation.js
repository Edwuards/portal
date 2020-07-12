export function Navigation(Bars,current){
  let Current = current;
  return (name)=>{
    Current.off();
    for (let bar in Bars) {
      if(Bars[bar].name == name){
        Bars[bar].on();
        Current = Bars[bar];
      }
    }
  }
}
