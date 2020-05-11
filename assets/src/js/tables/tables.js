import { HTML } from './templates.js';
import { Table } from './table.js';
import { Services } from '../services.js';

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

  {

    let forms = {
      'create':Forms.get('createUser'),
      'edit':Forms.get('editUser'),
      'delete':Forms.get('deleteUser')
    };

    let openForm = (form,data)=>{
      return function(){
        let close = form.events.on('close',()=>{
          Modal.elements.button.close.trigger('click');
        });
        Modal.elements.button.close.on('click',()=>{
          if(form.alive){ form.close() }
          form.events.off('close',close);
          Modal.actions.close();
          Modal.elements.button.close.off('click')
        });
        Modal.actions.open({title: form.title, body: form.open(data()) });
      }
    }

    Users.rows.update = function(user){
      this.user = user;
      this.inputs.text.id.value = user.id;
      this.inputs.text.name.value = user.name;
    }

    Users.rows.add = function(user){
      this.update(user);
      this.user = user;
      let row = this;
      this.buttons.edit.events.on('click',openForm(forms.edit,()=>{ return row.user; }));
      // this.buttons.delete.events.on('click',openForm(forms.delete));

    }

    Users.buttons.addUser.events.on('click',openForm(forms.create));

    forms.create.events.on('response',function(response){
      if(!response.error){
        Users.rows.add(response.data);
        Modal.elements.button.close.trigger('click');
      }
    });

    forms.edit.events.on('response',function(response){
      if(!response.error){
        let user = response.data;
        let row = Users.rows.find((r)=>{ return r.user.id == user.id; });
        row.update(user);
        forms.edit.close();
      }

    });

    Services.get.user({},(response)=>{
      if(!response.error){
        console.log(response);
        response.data.forEach(Users.rows.add);
      }
    });
  }

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
