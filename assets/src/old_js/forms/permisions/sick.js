import { Form, Helper } from '../form.js';

const Sick = new Form({
  title: 'Enfermedad',
  name: 'sick',
  url: 'permisions/create',
});

Sick.init = function(){
  Helper.pickerUnfocus(this.inputs);
  this.buttons.send.events.on('click',this.send);
}

Sick.open = function(date) {
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

Sick.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value+' 10:00:00';
  data.date_finish = this.inputs.date.finish.value+' 10:00:00';
  data.comments = this.inputs.textarea.description.value;
  data.notice = 3;

  return { error: false, data }
}


export { Sick }