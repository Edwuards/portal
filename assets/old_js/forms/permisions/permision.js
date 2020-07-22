import { Form, Helper } from '../form.js';

const Permision = new Form({
  title: 'Permiso',
  name: 'permision',
  url: 'permisions/create',
});

Permision.init = function(){
  Helper.pickerUnfocus(this.inputs);
  this.buttons.send.events.on('click',this.send);
}

Permision.open = function(date) {
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

Permision.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value+' '+this.inputs.time.start.value;
  data.date_finish = this.inputs.date.finish.value+' '+this.inputs.time.finish.value;
  data.comments = this.inputs.textarea.description.value;
  data.notice = 1;

  return { error: false, data }
}

export { Permision }
