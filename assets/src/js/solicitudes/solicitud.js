import { Card } from './card';
import { Observer } from '../helpers';

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
  const events = new Observer(['status update']);
  const card = new Card(solicitud);
  const methods = {
    'id':{ get: ()=>{ return id } },
    'card': { get: ()=>{return card } },
    'data': { get: ()=>{ return solicitud } },
    'status': {
      get: ()=>{ return status },
      set: (value)=>{
        events.notify('status update',[solicitud,value]);
        status = value;
        let visibility = mode[status];
        visibility = (visibility.approve ? 'removeClass' : 'addClass');
        card.buttons.name.approve.element[visibility]('hidden');
        card.buttons.name.deny.element[visibility]('hidden');
        card.status = status;
        solicitud.status = status;
      }
    },
    'events':{
      writable: false,
      value: {
        on: events.register,
        off: events.unregister
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
  if(this.status == 2){
    let solicitud = this;
    const { approve,deny } = this.card.buttons.name;
    approve.events.on('click',function(){ solicitud.status = 3; });
    deny.events.on('click',function(){ solicitud.status = 0; });
  }
}

function UsersSolicitud(solicitud){
  Solicitud.call(this,solicitud,Modes['users']);
  if(this.status == 3){
    let solicitud = this;
    const { approve,deny } = this.card.buttons.name;
    approve.events.on('click',function(){ solicitud.status = 1; });
    deny.events.on('click',function(){ solicitud.status = 0; });
  }
}

export { UsersSolicitud,TeamSolicitud,MySolicitud }
