import { Rules, Test } from './errors.js';
import { Observer } from './helpers.js';


function Input(el){
  let test = Rules.is.instanceOf(el,HTMLInputElement);
  if(!test.passed){ throw test.error; }

  const Events = {
    'focus':[],
    ''
  }

  this.register = (event,procedure)=>{

  }

}
