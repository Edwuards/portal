import { Card } from './card';

export function User(data){
  const card = new Card(data);
  const methods = {
    'data': {
      get: ()=>{ return data }
    },
    'card': {
      get: ()=>{ return card }
    }
  }

  Object.defineProperties(this,methods);

}
