import { Avisos } from './avisos.js';
import { AvisoUpdateCard, AvisoReadCard } from './cards/index.js';
import { Services } from '../services.js';

export default (Calendar)=>{
  const ID = $('[data-user-id]').attr('data-user-id');
  const UserAvisos = new Avisos('users');
  UserAvisos.add = function(aviso){
    let status = aviso.status;
    let update = undefined;
    aviso = new AvisoUpdateCard(aviso);

    aviso.events.on('updateStatus',function(data){
      let {id,status,email} = data;
      let update = {
        aviso:{status},
        email:email,
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
          myAvisos.update(aviso);
        }
      });
    });

    return aviso;
  }
  const addEvent = ({start,end,id,title,color})=>{
    start = new Date(start * 1000);
    end = new Date(end * 1000);
    Calendar.instance.addEvent({
      id,
      start,
      end,
      title,
      backgroundColor: color,
      borderColor: color,
      textColor: '#ffffff',
    });
  }

  Services.get.aviso({},function(response){
    let {error,data} = response;
    if(!error){
      data.forEach((aviso)=>{
        (aviso.userID == ID ? myAvisos : UserAvisos).add(aviso);
        if(Number(aviso.status)){ addEvent(aviso); }
      });

    }
  });


  return { UserAvisos,myAvisos }
}
