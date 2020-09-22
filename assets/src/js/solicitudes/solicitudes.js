import { MySolicitud,TeamSolicitud,UsersSolicitud } from './solicitud';
import { Observer } from '../helpers';

const dataMock = (obj,body)=>{

  for (let i = 0; i < 3; i++) {
    let type = (i ? (i == 1 ? 'team' : 'users') : 'mine');
    let fn = (i ? (i == 1 ? TeamSolicitud : UsersSolicitud) : MySolicitud);
    obj[type] = [[],[],[],[]];
    for (let j = 0; j < 20; j++) {
      let status = (j >= 5 ? (j >= 10 ? (j >= 15 ?  3 : 2) :  1) : 0);
      let data = {
        status,
        user: {
          avatar: 'assets/public/img/placeholder.jpeg',
          firstname: 'Cesar '+type,
          lastname: 'Perex'
        },
        type: (!status ? 'denied' : (status == 1 ? 'approved' : (status == 2 ? 'pending' : 'validating' ) ) ),
        start: '10 Aug 2020',
        end: '10 Aug 2020',
        color: 'bg-blue-600'
      }
       body.append(obj[type][status][obj[type][status].push(new fn(data)) - 1].card.element);
    }
  }
}


export function Solicitudes(body){
  const solicitudes = {};
  const statusMap = {
    'denied':0,
    'approved':1,
    'pending':2,
    'validating':3
  }
  const state = {
    type: undefined,
    status: undefined
  };

  dataMock(solicitudes,body);
  const methods = {
    'type': {
      writable: false,
      value: (ctx)=>{
        let { type , status } = ctx.params;
        if(type !== state.type){
          if(state.type !== undefined){
            solicitudes[state.type][state.status].forEach((solicitud) => {
              solicitud.off();
            });
          }

          state.type = type;

        }

        if(status !== state.status){
          if(state.status !== undefined){
            solicitudes[state.type][state.status].forEach((solicitud) => {
              solicitud.off();
            });
          }
          state.status = statusMap[status];
        }


        solicitudes[state.type][state.status].forEach((solicitud) => {
          solicitud.on();
        });

      }
    }
  };

  Object.defineProperties(this,methods);


}
