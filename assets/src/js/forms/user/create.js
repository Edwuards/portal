import { Form, Helper } from '../form.js';

const Create = new Form({
  title: 'Nuevo Usuario',
  name: 'userCreate',
  url: 'users/create',
});


Create.init = function(){
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

Create.open = function(date) {
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

Create.send = function(){
  let data = {};
  data.name = this.inputs.text.name.value;
  data.lastname = this.inputs.text.lastname.value;
  data.email = this.inputs.text.email.value;
  data.work_start = this.inputs.date.work_start.value;
  data.work_position = this.inputs.select.work_position.value;
  data.birthday = this.inputs.date.birthday.value;
  data.vacations = this.inputs.number.vacations.value;
  data.avatar = this.inputs.image.avatar.src;
  
  return { error: false, data }
}


export { Create }
