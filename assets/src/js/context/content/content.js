export function Content(name){
  const self = this;
  const container = $(`[data-content="${name}"]`);
  const display = (state)=>{ container[ state ? 'removeClass' : 'addClass' ]('hidden'); }
  const methods = {
    'name':{
      get:()=>{ return name; }
    },
    'on':{
      configurable: true,
      set: (fn)=>{
        Object.defineProperty(self,'on',{
          configurable: false,
          value: ()=>{
            display(true);
            fn();
          }
        });
      }
    },
    'off':{
      configurable: true,
      set: (fn)=>{
        Object.defineProperty(self,'off',{
          configurable: false,
          value: ()=>{
            display(false);
            fn();
          }
        });
      }
    }
  };

  Object.defineProperties(this,methods);
}
