import { default as calendarInit } from './calendar.js';
import { default as navInit } from './nav.js';
import { default as permisionsInit } from './permisions.js';
import { default as modalInit } from './modal.js';
import { default as formsInit } from './forms/index.js';
import { default as avisosInit } from './avisos/index.js';
import { default as usersInit } from './users/index.js';

export default function(){
  const Calendar = calendarInit();
  const Modal = modalInit();
  const Permisions = permisionsInit();
  const Forms = formsInit();
  const { Users,Profile } = usersInit();
  const { UserAvisos, myAvisos } = avisosInit(Calendar);
  const Nav = navInit({Calendar,UserAvisos,myAvisos, Users,Profile});



  const Actions = {};
  const Elements = {};
  Actions.open = {};
  Actions.update = {};
  Actions.update.date = (format)=>{
    if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
    format = Calendar.instance.formatDate(Calendar.instance.getDate(),format);
    format = format.slice(0,1).toUpperCase()+format.slice(1);
    Nav.elements.date.html(format);
  }
  Actions.calendar = {};
  Actions.calendar.addEvent = ({start,end,id,title,color})=>{
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
  Actions.calendar.render = ()=>{
    Actions.update.date();
    // la barra de navegación mide 64px en altura por eso se la resta.
    let height = window.innerHeight - 64;
    Calendar.instance.setOption('contentHeight',height);
    Calendar.instance.render();
  }
  Actions.calendar.next = ()=>{
    Calendar.instance.next();
    Actions.update.date();
  }
  Actions.calendar.prev = ()=>{
    Calendar.instance.prev();
    Actions.update.date();
  }
  Actions.calendar.today = ()=>{
    Calendar.instance.today();
    Actions.update.date();
  }
  Actions.open.menu = ()=>{
    if(Nav.state.menu){
      Nav.actions.closeMenu();
    }
    else{
      Nav.actions.openMenu();
    }
  }
  Actions.avisar = ()=>{
    Permisions.actions[Permisions.state.open ? 'close' : 'open']();
  }
  Actions.open.permision = function(){
    let form = Forms.get($(this).attr('name'));
    Permisions.actions.close();

    let send = form.events.on('send',function(request){
      let { error, data } = request;
      if(!error){
        let response = form.events.on('response',function(res){
          let { error, data } =  res;
          if(!error){
            Actions.calendar.addEvent(data);
            myAvisos.add(data);
          }
          form.events.off('response',response);
        });
      }
      form.close()
    });

    let close = form.events.on('close',function(){
      form.events.off('send',send);
      Modal.elements.close.trigger('click');
    });

    Modal.elements.close.on('click',()=>{
      if(form.alive){ form.close() }
      form.events.off('close',close);
      Modal.actions.close();
      Modal.elements.close.off('click')
    });

    Modal.actions.open({title: form.title, body: form.open() });
  };
  Actions.open.menuContent = function(){
    let name = $(this).attr('name');
    Nav.elements.button.menu.trigger('click');
    Nav.actions.content(name)
  };

  Actions.logout = function(){
    $.ajax({
      url:`${window.location.origin}/app/logout`,
      method: 'post',
      success:function(){ window.location.href = `${window.location.origin}/app/login`; }
    });
  };

  [['modal',Modal],['nav',Nav],['permisions',Permisions]].forEach((data)=>{ Elements[data[0]] = data[1].elements; })

  return {actions:Actions, elements: Elements}
}
