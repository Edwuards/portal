import { HTML } from './templates.js';
import { Table } from './table.js';
export default function(Modal,Forms){
  const Container = $('#dataTable');
  const State = {
    open: false
  }
  const Tables = [
    new Table({
      name: 'users',
      html: HTML.users
    }),
    new Table({
      name: 'userAvisos',
      html: HTML.userAvisos
    }),
    new Table({
      name: 'myAvisos',
      html: HTML.myAvisos
    })
  ];

  const Users = Tables[0];
  const UserAvisos = Tables[1];
  const myAvisos = Tables[2];

  UserAvisos.rows.add = function(data){

  }

  Users.rows.add = function(data){
    this.inputs.text.id = data.id;
    this.inputs.text.name = data.name;
  }


  Users.buttons.addUser.events.on('click',function(){
    let form = Forms.userProfile;
    let close = form.events.on('close',()=>{
      Modal.element.button.close.trigger('click');
    });
    Modal.elements.button.close.on('click',()=>{
      if(form.alive){ form.close() }
      form.events.off('close',close);
      Modal.actions.close();
      Modal.elements.button.close.off('click')
    });

    Modal.actions.open({title: form.title, body: form.open() });
  });







  Tables.forEach((t)=>{ Container.append(t.element); })

  return {
    open: (name)=>{
      if(State.open){ State.open.close(); };
      let table = Tables.find((t)=>{ return t.name == name; })
      table.open();
      State.open = table;
      if(!Container.hasClass('active')){ Container.addClass('active'); }
    },
    close:()=>{
      if(State.open){
        State.open.close();
        State.open = false;
      }
      Container.removeClass('active');
    },
  }

}
