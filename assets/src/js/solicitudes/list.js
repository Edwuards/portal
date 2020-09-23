import { MySolicitud,TeamSolicitud,UsersSolicitud } from './solicitud';
import { View } from '../helpers';

const dataMock = ()=>{
  const list = [];
  for (let owner = 0; owner < 3; owner++) {
    let type = (owner ? (owner == 1 ? 'team' : 'users') : 'mine');
    for (let j = 0; j < 20; j++) {
      let status = (j >= 5 ? (j >= 10 ? (j >= 15 ?  3 : 2) :  1) : 0);
      let data = {
        owner,
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
       list.push(data);
    }
  }
  return list;
}

export default function(){
  const view = new View({ name:'solicitudes list', element: $('[data-solicitudes="list"]')});
  const solicitudes = [
    [[],[],[],[]],
    [[],[],[],[]],
    [[],[],[],[]],
  ];
  const map = {
    'owner': {
      'mine':0,
      'team': 1,
      'users': 2
    },
    'status': {
      'denied':0,
      'approved':1,
      'pending':2,
      'validating':3
    }
  };
  const state = {
    status: undefined,
    owner: undefined
  };
  const add = (solicitud)=>{
    let {owner,status} = solicitud;
    solicitud = new (owner ? (owner == 1 ? TeamSolicitud : UsersSolicitud) : MySolicitud)(solicitud);
    solicitud.data.index = (solicitudes[owner][status].push(solicitud) - 1);
    solicitud.events.on('status update',function(solicitud,update){
      let {owner,status,index} = solicitud;
      let obj = solicitudes[owner][status][index];
      solicitudes[owner][status][index] = false;
      solicitud.index = (solicitudes[owner][update].push(obj) - 1);
    });
    view.element.append(solicitud.card.element);
  };

  dataMock().forEach(add);

  const methods = {
    'show': {
      writable: false,
      value: (owner,status)=>{
        owner = map.owner[owner];
        status = map.status[status];
        if(owner !== state.owner || status !== state.status){
          if(state.status !== undefined && state.owner !== undefined){
            solicitudes[state.owner][state.status].forEach((solicitud) => {
              if(solicitud){ solicitud.off(); }
            });
          }

          state.owner = owner;
          state.status = status;

          solicitudes[state.owner][state.status].forEach((solicitud) => {
            if(solicitud){ solicitud.on(); }
          });

        }
      }
    },
    'get': {
      writable: false,
      value: ()=>{ return solicitudes; }
    },
    'find': {
      writable: false,
      value: (owner,status,id)=>{
        owner = map.owner[owner];
        status = map.status[status];
        return solicitudes[owner][status].find((s)=>{
          if(s){ return id == s.id }
          return false;
        });
      }
    }
  }

  Object.defineProperties(view,methods);

  return view
}
