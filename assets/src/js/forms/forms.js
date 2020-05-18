import { default as User } from './user/index.js';
import { default as Permisions } from './permisions/index.js';

export default function(){
  const Forms = [];

  User.forEach((form)=>{ Forms.push(form); });
  Permisions.forEach((form)=>{ Forms.push(form); });

  return {
    get:(name)=>{ return Forms.find((f)=>{ return f.name == name; }); }
  }

}
