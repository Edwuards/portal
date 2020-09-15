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
    Events[event].forEach((sub)=>{ sub.notify.apply(null,(update == undefined ? [] : update)); });
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
        if(!registered[state]){ registered[state] = {on,off}; }
      },
    },
    'value': {
      set: (state)=>{
        if(registered[state]){
          if(current.state){ current.value.off(); }
          current.state = state;
          current.value = registered[state];
          current.value.on();
        }
      },
      get: ()=>{ return current.state }
    },
  }

  Object.defineProperties(this,methods);

}

function View({name,element}){
  const self = this;
  const state = new State();
  const display = (state)=>{ element[ state ? 'removeClass' : 'addClass' ]('hidden'); }
  const on = ()=>{ display(true); }
  const off = ()=>{ display(false); }
  const redefine = (prop,action)=>{
    return (fn)=>{
      Object.defineProperty(self,prop,{
        configurable: false,
        value: ()=>{ action(); fn(); }
      });
    }

  };

  const methods = {
    'state': {
      writable: false,
      value: state
    },
    'element': { get: ()=>{ return element } },
    'name':{ get: ()=>{ return name; } },
    'on':{
      configurable: true,
      get: ()=>{ return on },
      set: redefine('on',on)
    },
    'off':{
      configurable: true,
      get: ()=>{ return off },
      set: redefine('off',off)
    }
  };

  Object.defineProperties(this,methods);

}

export { Observer, State ,View }
