import { Rules, Test } from './errors.js';

function Observer(events){
  const Events = {};

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
    Events[event].forEach((notify)=>{ notify.apply(null,update); });
  }

  this.register = (event,subscriber)=>{
  	let test = Test([
      [Rules.is.defined,[event,Events]],
      [Rules.is.function,[subscriber]]
    ]);

    if(!test.passed){ throw test.error; }

    return Events[event].push(subscriber) - 1;
  }

  this.unregister = (event,index)=>{
  	let test = undefined ;
	  [
      Rules.is.defined(event,Events),
      Rules.has.index(Events[event],index)
    ].some((check)=>{ test = check ; return !test.passed; });

	  if(!test.passed){ throw test.error; }

    Events[event]  = Events[event].reduce((a,c,i)=>{
      if(i !== index){ a.push(c); }
      return a;

    },[]);
  }

  if(Rules.is.array(events).passed){
	  events.forEach(this.event.create);
  }

}

export { Observer }
