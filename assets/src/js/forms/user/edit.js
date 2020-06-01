import { Form, Helper } from '../form.js';

const Edit = new Form({
  title: 'Editar Usuario',
  name: 'userEdit',
  url: 'users/edit',
});


Edit.init = function(){
  Helper.pickerUnfocus(this.inputs);
  let positions = this.inputs.select.work_position;
  let areas = this.inputs.select.work_area;
  areas.events.on('change',function(){
    let found = false;
    positions.options.get().addClass('hidden').removeAttr('selected').each(function(){
      let el = $(this);
      if(!found && (el.attr('data-area') == areas.value)){ el.attr('selected','selected'); found = true;}
      el[el.attr('data-area') == areas.value ? 'removeClass' : 'addClass']('hidden');
    });
  });
}

Edit.open = function(user) {
  this.disable(true);
  this.user = user;
  this.inputs.image.avatar.src = user.avatar;
  this.inputs.text.name.value = user.name;
  this.inputs.text.lastname.value = user.lastname;
  this.inputs.text.email.value = user.email;
  this.inputs.date.birthday.value = user.birthday;
  this.inputs.date.work_start.value = user.work_start;
  this.inputs.number.vacations.value = user.vacations;
  this.inputs.select.work_area.value = user.work_area;
  this.inputs.select.work_position.value = user.work_position;
}

Edit.send = function(){
  let data = {};
  data.name = this.inputs.text.name.value;
  data.lastname = this.inputs.text.lastname.value;
  data.email = this.inputs.text.email.value;
  data.work_position = this.inputs.select.work_position.value;
  data.work_start = this.inputs.date.work_start.value;
  data.birthday = this.inputs.date.birthday.value;
  data.vacations = this.inputs.number.vacations.value;
  if(this.inputs.image.avatar.changed){
    data.avatar = this.inputs.image.avatar.src;
  }
  let where = [['users.id','=',this.user.id]];

  return { error: false, data: {user:data,where} }

}


export { Edit }
