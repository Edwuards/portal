import { Services } from '../services.js';

const HTML = {
  permisions:{
    permision: ()=>{ return Services.get.form('permisions/permision'); },
    homeOffice:  ()=>{ return Services.get.form('permisions/homeOffice'); },
    vacation:()=>{ return Services.get.form('permisions/vacation'); },
    sick: ()=>{ return Services.get.form('permisions/sick'); },
  },
  user: {
    create: ()=>{ return Services.get.form('user/create'); },
    edit: ()=>{ return Services.get.form('user/edit'); },
    profile: ()=>{ return Services.get.form('user/profile'); },
    delete: ()=>{ return Services.get.form('user/delete'); }
  }
}

export { HTML }
