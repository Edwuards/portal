import { Services } from '../services.js';

const HTML = {
  permision: ()=>{
    return Services.get.form('permision');
  },
  homeOffice:  ()=>{
    return Services.get.form('homeOffice');
  },
  vacation:()=>{
    return Services.get.form('vacation');
  },
  sick: ()=>{
    return Services.get.form('sick');
  },
  myProfile: ()=>{
    return Services.get.form('myProfile');
  },
  userProfile: ()=>{
    return Services.get.form('userProfile');
  }
}

export { HTML }
