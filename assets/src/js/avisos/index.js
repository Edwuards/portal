import { Avisos } from './avisos.js';
import { AvisoUpdateCard, AvisoReadCard } from './cards/index.js';
import { Services } from '../services.js';

export default ()=>{
  const UserAvisos = new Avisos('users');
  UserAvisos.add = function(aviso){
    let status = aviso.status;
    let update = undefined;
    aviso = new AvisoUpdateCard(aviso);

    aviso.events.on('updateStatus',function(data){
      let {id,status} = data;
      let update = {
        aviso:{status},
        where:[['request.id','=',id]]
      };

      Services.update.aviso(update,function(response){
        let {error,data} = response;
        if(!error){
          if(status){
            aviso.buttons.approve.element.addClass('hidden');
            aviso.message.text('Aprobado');
            aviso.element.addClass('approved');
          }
          else{
            aviso.message.text('Rechazado');
            aviso.element.addClass('declined');
            aviso.buttons.approve.element.addClass('hidden');
            aviso.buttons.decline.element.addClass('hidden');
          }
          setTimeout(()=>{
            UserAvisos.update(aviso);
            aviso.message.text('');
            aviso.element.removeClass('approved declined');
          },1000);
        }
      });
    });

    return aviso;
  }

  const myAvisos = new Avisos('mine');
  myAvisos.add = function(aviso){
    let status = aviso.status;
    let update = undefined;
    aviso = new AvisoReadCard(aviso);

    aviso.events.on('updateStatus',function(data){
      let {id,status} = data;
      let update = {
        aviso:{status},
        where:[['request.id','=',id]]
      };

      Services.update.aviso(update,function(response){
        let {error,data} = response;
        if(!error){

          UserAvisos.update(aviso);

        }
      });
    });

    return aviso;
  }

  Services.get.aviso({},function(response){
    let {error,data} = response;
    if(!error){ data.forEach(aviso => UserAvisos.add(aviso)) }
  });

  Services.get.myAvisos({},function(response){
    let {error,data} = response;
    if(!error){ data.forEach(aviso => myAvisos.add(aviso)) }
  });

  return { UserAvisos,myAvisos }
}
