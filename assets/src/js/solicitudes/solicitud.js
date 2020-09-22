import { Card } from './card';

const Modes = {
  'mine': [
    {approve:false,deny:false},
    {approve:false,deny:false},
    {approve:false,deny:false},
    {approve:false,deny:false},
  ],
  'team': [
    {approve:false,deny:false},
    {approve:false,deny:false},
    {approve:true,deny:true},
    {approve:false,deny:false},
  ],
  'users': [
    {approve:false,deny:false},
    {approve:false,deny:false},
    {approve:false,deny:false},
    {approve:true,deny:true},
  ]
}

function Solicitud(solicitud,mode){
  let {status,id} = solicitud;
  const card = new Card(solicitud);
  const methods = {
    'id':{ get: ()=>{ return id } },
    'card': { get: ()=>{return card } },
    'data': { get: ()=>{ return solicitud } },
    'status': {
      get: ()=>{ return status },
      set: (value)=>{
        status = value;
        let visibility = mode[status];
        visibility = (visibility.approve ? 'removeClass' : 'addClass');
        card.buttons.name.approve.element[visibility]('hidden');
        card.buttons.name.deny.element[visibility]('hidden');
        card.status = status;
        solicitud.status = status;
      }
    },
    'on':{
      writable: false,
      value: card.on
    },
    'off':{
      writable: false,
      value: card.off
    }
  }

  Object.defineProperties(this,methods);
  this.status = status;

}

function MySolicitud(solicitud){
  Solicitud.call(this,solicitud,Modes['mine']);
}

function TeamSolicitud(solicitud){
  Solicitud.call(this,solicitud,Modes['team']);
}

function UsersSolicitud(solicitud){
  Solicitud.call(this,solicitud,Modes['users']);
}

export { UsersSolicitud,TeamSolicitud,MySolicitud }
