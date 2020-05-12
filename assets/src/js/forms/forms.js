import { HTML } from './templates.js';
import { Form } from './form.js';
import { Rules } from './rules.js';

export default function(){
  const Forms = [];

  const Helper = {
    notEmptyText: (inputs)=>{
      for(let input in inputs){
        input = inputs[input];
        input.events.on('input',function(){
          let value = this.value;
          this.parent[value != '' ? 'addClass' : 'removeClass']('active');
        })
      }
    },
    notEmptyNumber: (inputs)=>{
      for(let input in inputs){
        input = inputs[input];
        input.events.on('input',function(){
          let value = this.value;
          if(!this.parent.hasClass('active')){ this.parent.addClass('active'); }
          this.value = (value > this.max ? this.max : ( value < this.min ? this.min : value ) );
        });
      }
    },
    collectValues: (inputs)=>{
      const MAP = {};
      for (let type in inputs) {
        for(let name in inputs[type]){
          MAP[name] = inputs[type][name][type == 'date' ? 'format': 'value'];
        }
      }
      return MAP;
    },
    exportForm:(form)=>{
      for(let name in form){ Forms.push(form[name]); }
    }
  }

  const Permisions = {
    permision: new Form({
      name: 'permision',
      title: 'Permiso',
      html: HTML.permisions.permision,
      url:'permisions/create'
    }),
    vacation: new Form({
      name: 'vacation',
      title: 'Vacación',
      html: HTML.permisions.vacation,
      url:'permisions/create'
    }),
    homeOffice: new Form({
      name: 'homeOffice',
      title: 'Trabajo desde casa',
      html: HTML.permisions.homeOffice,
      url:'permisions/create'
    }),
    sick: new Form({
      name: 'sick',
      title: 'Enfermedad',
      html: HTML.permisions.sick,
      url:'permisions/create'
    })
  }

  const User = {
    create:  new Form({
      title: 'Nuevo usuario',
      name: 'createUser',
      html: HTML.user.create,
      url: 'users/create',
    }),
    edit:  new Form({
      title: 'Editar usuario',
      name: 'editUser',
      html: HTML.user.edit,
      url: 'users/edit',
    }),
    profile: new Form({
      title: 'Mi Perfil',
      name: 'myProfile',
      html: HTML.myProfile,
    }),
    delete: new Form({
      title: 'Eliminar Usuario',
      name: 'deleteUser',
      html: HTML.user.delete,
      url: 'users/delete'
    })
  }

  {
    let close = undefined;
    Permisions.permision.open = function(){
      this.inputs.date.finish.disable(true);
      Helper.notEmptyNumber(this.inputs.time);
      Helper.notEmptyText(this.inputs.textarea);
      close = Permisions.permision.buttons.send.events.on('click',Permisions.permision.send);
    }
    Permisions.permision.send = function(){
      this.inputs.date.finish.value = (this.inputs.date.start.value.getTime()/1000);
      let data = {
        notice: 1,
        comments:this.inputs.textarea.description.value,
        date_start: this.inputs.date.start.value,
        date_finish: this.inputs.date.finish.value,
      };

      let time = {
        start: this.inputs.time.start.value,
        finish: this.inputs.time.finish.value
      }

      data.date_start.setHours(time.start.hour);
      data.date_start.setMinutes(time.start.minutes);
      data.date_finish.setHours(time.finish.hour);
      data.date_finish.setMinutes(time.finish.minutes);
      data.date_start = this.inputs.date.start.format;
      data.date_finish = this.inputs.date.finish.format;

      this.close();

      return { error: false, data }

    }
    Permisions.permision.events.on('send',()=>{
      Permisions.permision.buttons.send.events.unregister('click',close);
    });
  }

  {
    let close = undefined;
    Permisions.vacation.send = function(){
      let data = {
        notice: 2,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };

      Permisions.vacation.buttons.send.events.unregister('click',close);
      this.close();

      return { error: false, data }

    }
    Permisions.vacation.open = function(){
      close = Permisions.vacation.buttons.send.events.on('click',Permisions.vacation.send);

    }
  }

  {
    let close = undefined;
    Permisions.sick.open = function(){
      close = Permisions.sick.buttons.send.events.on('click',Permisions.sick.send);

    }
    Permisions.sick.send = function(){
      let data = {
        notice: 3,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };
      Permisions.sick.buttons.send.events.unregister('click',close);
      this.close();

      return { error: false, data }

    }
  }

  {
    let close = undefined;
    Permisions.homeOffice.open = function(){
      close = Permisions.homeOffice.buttons.send.events.on('click',Permisions.homeOffice.send);

    }
    Permisions.homeOffice.send = function(){
      this.inputs.date.finish.value = (this.inputs.date.start.value.getTime()/1000);

      let data = {
        notice: 4,
        comments: this.inputs.textarea.description.value,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };

      this.close();
      Permisions.homeOffice.buttons.send.events.unregister('click',close);

      return { error: false, data }

    }
  }

  User.create.open = function(){
    Helper.notEmptyText(this.inputs.text);
    Helper.notEmptyNumber(this.inputs.number);
  }

  User.create.send = function(){
    return {error: false, data: Helper.collectValues(this.inputs) };
  }

  User.create.buttons.send.events.on('click',User.create.send);

  User.edit.open = function(user){
    this.user = user.id;
    this.disable(true);
    this.buttons.send.element.addClass('hidden');
    this.buttons.cancel.element.addClass('hidden');
    this.buttons.edit.element.removeClass('hidden');

    Helper.notEmptyText(this.inputs.text);
    Helper.notEmptyNumber(this.inputs.number);

    this.inputs.text.name.value = user.name;
    this.inputs.text.lastname.value = user.lastname;
    this.inputs.text.email.value = user.email;
    this.inputs.number.vacations.value = user.vacations;
    this.inputs.date.birthday.value = Number(user.birthday);
    this.inputs.date.work_start.value = Number(user.work_start);
  };

  User.edit.send = function(){
    return {
      error: false,
      data: {
        user: Helper.collectValues(this.inputs),
        where:[['id','=',this.user]]
      }
    }
  };

  User.edit.buttons.edit.events.on('click',function(){
    User.edit.disable(false);
    User.edit.buttons.cancel.element.removeClass('hidden');
    User.edit.buttons.send.element.removeClass('hidden');
    User.edit.buttons.edit.element.addClass('hidden');
  });

  User.edit.buttons.cancel.events.on('click',User.edit.close);

  User.edit.buttons.send.events.on('click',User.edit.send);

  User.delete.open = function(user){
    this.user = user;
    this.element.find('[data="message"]').text(`
      Estás seguro de elimiar el usuario : ${user.name}
      con el id: ${user.id}
    `);
  }

  User.delete.send = function(){
    this.close();
    return { error: false, data:{id:this.user.id} }
  }

  User.delete.buttons.send.events.on('click',User.delete.send);

  User.delete.buttons.cancel.events.on('click',User.delete.close);

  [Permisions,User].forEach(Helper.exportForm);

  return {
    get:(name)=>{ return Forms.find((f)=>{ return f.name == name; }); }
  }

}
