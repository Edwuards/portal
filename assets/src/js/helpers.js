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
    get: ()=>{ return Object.keys(Events); }
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

    Events[event].push({id: ID++, notify: subscriber});
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

export { Observer }
