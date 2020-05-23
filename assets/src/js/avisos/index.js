import { Avisos } from './avisos.js';
import { Services } from '../services.js';

export default ()=>{
  const UserAvisos = new Avisos('users');
  Services.get.aviso({},function(response){
    let {error,data} = response;
    if(!error){ data.forEach(aviso => UserAvisos.add(aviso)) }
  });
  
  return { UserAvisos }
}
