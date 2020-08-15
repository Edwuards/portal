import { Rules, Test } from './errors.js';

function Observer(events){
  const Events = {};
  let ID = 0;

  this.event = {
    create: (event)=>{
      let test = undefined;
  	  [
    		Rules.is.string(event),
    		Rules.is.notDuplicateProperty(event,Events)
  	  ].some((check)=>{ test = check ; return !test.passed; });

      if(!test.passed){ throw test.error; }
      Events[event] = [];
    },
    delete: (event)=>{
      let test = undefined ;
  	  [
    		Rules.is.string(event),
    		Rules.is.defined(event,Events)
  	  ].some((check)=>{ test = check; return !test.passed });

    	if(!test.passed){ throw test.error; }

      delete Events[event];
    },
    keys: ()=>{ return Object.keys(Events); },
    get: (event)=>{ return Events[event].map((e)=>{ return e.id }); },
    exist: (event)=>{ return this.event.keys().indexOf(event) != -1 }
  }

  this.notify = (event,update)=>{
    let test = Rules.is.defined(event,Events);
    if(!test.passed){ throw test.error; }
    Events[event].forEach((sub)=>{ sub.notify.apply(null,update); });
  }

  this.register = (event,subscriber)=>{
  	let test = Test([
      [Rules.is.defined,[event,Events]],
      [Rules.is.function,[subscriber]]
    ]);

    if(!test.passed){ throw test.error; }
    ID++;
    Events[event].push({id: ID, notify: subscriber});
    return ID;
  }

  this.unregister = (event,id)=>{
  	let test = undefined ;
	  [
      Rules.is.defined(event,Events),
    ].some((check)=>{ test = check ; return !test.passed; });

	  if(!test.passed){ throw test.error; }

    Events[event]  = Events[event].reduce((a,c)=>{
      if(c.id !== id){ a.push(c); }
      return a;

    },[]);
  }

  if(Rules.is.array(events).passed){
	  events.forEach(this.event.create);
  }

}

function ToggleObjects(list){
  const map = {};
  let active = undefined;

  const Methods = {
    'active': {
      get: ()=>{ return active }
    },
    'get':{
      get: ()=>{ return map }
    },
    'set': {
      set: (name)=>{
        if(active && active.name !== name){
          active.off();
          active = map[name];
          active.on();
        }

        if(!active){
          active = map[name];
          active.on();
        }
      }
    }
  }

  Object.defineProperties(this,Methods);
  list.forEach((obj)=>{ map[obj.name] = obj; });
}

function State(){
  const registered = {};
  const current = {
    state: undefined,
    value: undefined
  };

  const methods = {
    'register': {
      writable: false,
      value: ({state,on,off})=>{
        if(!registered[state]){
          registered[state] = {on,off}
        }
      },
    },
    'set': {
      set: (state)=>{
        if(registered[state]){
          if(current.state){ current.value.off(); }
          current.state = state;
          current.value = registered[state];
          current.value.on();
        }
      }
    },
    'get': {
      get: ()=>{ return current.state }
    }
  }

  Object.defineProperties(this,methods);

}

function View(name){
  const self = this;
  const container = $(`[data-content="${name}"]`);
  const display = (state)=>{ container[ state ? 'removeClass' : 'addClass' ]('hidden'); }
  const methods = {
    'element': { get: ()=>{ return container } },
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

export { Observer, ToggleObjects, State ,View}
