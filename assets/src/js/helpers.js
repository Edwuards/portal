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
        value: function(){ action(); fn.apply(null,arguments); }
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

function Modal(){
  const observer = new Observer(['cancel','confirm']);
  const elements = {
    cont: $(document.createElement('div')),
    modal: $(document.createElement('div')),
    message: $(document.createElement('div')),
    list: $(document.createElement('div')),
    btnCont: $(document.createElement('div')),
    buttons: {
      cancel: $(document.createElement('button')),
      confirm: $(document.createElement('button'))
    }
  };
  const on = (data)=>{
    elements.cont.removeClass('hidden');
    elements.buttons.confirm.on('click',()=>{ observer.notify('confirm'); });
    elements.buttons.cancel.on('click',()=>{ observer.notify('cancel'); off(); });
    elements.list.empty();
    data.forEach((item, i) => {
      let p = document.createElement('p');
      p.textContent = item;
      let css = 'p-2 mx-4 border-b border-gray-600'.split(' ');
      css.forEach((style)=>{ p.classList.add(style); });
      elements.list.append(p);
    });

  };
  const off = ()=>{
    elements.cont.addClass('hidden');
    elements.buttons.confirm.off('click');
    elements.buttons.cancel.off('click');
  };

  elements.cont.addClass('absolute w-screen h-screen top-0 left-0 z-10 flex justify-center items-center hidden')
  .css('background-color','rgba(0,0,0,.7)').append(elements.modal);

  elements.modal.addClass('bg-white p-4')
  .css({width:'500px',height:'350px'})
  .append(elements.message)
  .append(elements.list)
  .append(elements.btnCont);

  elements.message.addClass('my-4 text-center')

  elements.list.addClass('w-full overflow-y-scroll px-4')
  .css('height','calc(100% - 125px)');

  elements.btnCont.addClass('w-full flex justify-around items-center my-4')
  .append(elements.buttons.cancel)
  .append(elements.buttons.confirm);

  elements.buttons.confirm.addClass('flex items-center text-white text-sm bg-green-600 rounded p-2 mr-2')
  .text('confirmar');
  elements.buttons.cancel.addClass('flex items-center text-white text-sm bg-red-600 rounded p-2 mr-2')
  .text('cancelar');

  $('body').append(elements.cont);

  return {
    on,
    off,
    message: (message)=>{ elements.message.text(message); },
    confirm: (fn)=>{ observer.register('confirm',fn); },
    cancel: (fn)=>{ observer.unregister('cancel',fn); }
  }

}


export { Observer, State ,View , Modal}
