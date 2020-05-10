import { Services } from '../services.js';

const HTML = {
  userAvisos: ()=>{
    return Services.get.table('userAvisos');
  },
  users: ()=>{
    return Services.get.table('users');
  },
  myAvisos:()=>{
    return Services.get.table('myAvisos');
  },
}

export { HTML }
