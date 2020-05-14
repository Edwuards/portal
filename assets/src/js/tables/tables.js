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
      this.buttons.delete.events.on('click',openForm(forms.delete,()=>{ return row.user; }));

    }

    Users.buttons.addUser.events.on('click',openForm(forms.create,()=>{ return true }));

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

    forms.delete.events.on('response',function(response){
      if(!response.error){
        let user = response.data;
        let row = Users.rows.find((r)=>{ return r.user.id == user; });
        row.die();
      }
    })

    Services.get.user({},(response)=>{
      if(!response.error){
        console.log(response);
        response.data.forEach(Users.rows.add);
      }
    });
  }

  {
    let getUpdates = ()=>{
      let date = new Date();
      let format = ()=>{
        let dateFormat = date.toLocaleDateString('es-MX').split('/').reduce((a,c)=>{ if(c.length == 1){ c = '0'+c; } return a = c+'-'+a; });
        let timeFormat = date.toString().slice(16,24);
        return `${dateFormat} ${timeFormat}`;
      }

      let update = ()=>{
        let where = [['request.modified','>=',format()]];
        Services.get.aviso({where},function(response){
          let { error,data } = response;
          if(!error){
            data.forEach((aviso)=>{
              myAvisos.rows.find((row)=>{ return row.aviso.id ==  aviso.id}).update(aviso);
            });
            date.setTime(Date.now());;
          }
        });
        setTimeout(update,(1000 * 60));
      }
      update();

    }

    myAvisos.rows.update = function(aviso){
      this.aviso.status = aviso.status;
      this.inputs.status.aviso.value = aviso.status;
    }

    myAvisos.rows.add = function(aviso){
      this.aviso = aviso;
      this.inputs.text.id.value = aviso.id;
      this.inputs.text.type.value = aviso.type;
      this.inputs.status.aviso.value = aviso.status;
    }

    let forms = {};
    ['permision','sick','vacation','homeOffice'].forEach((name)=>{
      forms[name] = Forms.get(name);
    });

    for(let form in forms){
      form = forms[form];
      form.events.on('response',function(response){
        if(!response.error){
          let data = response.data;
          myAvisos.rows.add(response.data);
        }
      });
    }

    Services.get.aviso({where: [['user','=','1']]},function(response){
      if(!response.error){  response.data.forEach(myAvisos.rows.add); }
      getUpdates();
    });
  }

  {
    let getUpdates = ()=>{
      let date = new Date();
      let format = ()=>{
        let dateFormat = date.toLocaleDateString('es-MX').split('/').reduce((a,c)=>{ if(c.length == 1){ c = '0'+c; } return a = c+'-'+a; });
        let timeFormat = date.toString().slice(16,24);
        return `${dateFormat} ${timeFormat}`;
      }

      let update = ()=>{
        let where = [['request.created','>=',format()]];
        Services.get.aviso({where},function(response){
          let { error,data } = response;
          if(!error){ data.forEach(UserAvisos.rows.add); }
          date.setTime(Date.now());;
        });
        setTimeout(update,(1000 * 60));
      }

      update();

    }

    UserAvisos.rows.add = function(aviso){
      this.inputs.status.aviso.disable(false);

      this.aviso = aviso;
      this.inputs.text.id.value = aviso.id;
      this.inputs.text.type.value = aviso.type;
      this.inputs.text.user.value = aviso.user;
      this.inputs.status.aviso.value = aviso.status;

      aviso = this.aviso;

      this.inputs.status.aviso.events.on('change',function(){
        let value = this.value;
        aviso.status = value
        let update = {
          where: [['request.id','=',aviso.id]],
          aviso: {status: value}
        }
        Services.update.aviso(update,()=>{})
      });

    }

    Services.get.aviso({},function(response){
        if(!response.error){ response.data.forEach(UserAvisos.rows.add); }
        getUpdates();
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
