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
    }),
    vacation: new Form({
      name: 'vacation',
      title: 'Vacación',
      html: HTML.permisions.vacation,
    }),
    homeOffice: new Form({
      name: 'homeOffice',
      title: 'Trabajo desde casa',
      html: HTML.permisions.homeOffice,
    }),
    sick: new Form({
      name: 'sick',
      title: 'Enfermedad',
      html: HTML.permisions.sick,
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
    delte: new Form({
      title: 'Eliminar Usuario',
      name: 'deleteUser',
      html: HTML.myProfile,
    })
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

  User.edit.buttons.cancel.events.on('click',function(){
    User.edit.close();
  });

  User.edit.buttons.send.events.on('click',User.edit.send);



  [Permisions,User].forEach(Helper.exportForm);

  return {
    get:(name)=>{ return Forms.find((f)=>{ return f.name == name; }); }
  }

}
