import { Form, Helper } from '../form.js';

const HomeOffice = new Form({
  title: 'Home Office',
  name: 'homeOffice',
  url: 'permisions/create',
});

HomeOffice.init = function(){
  Helper.pickerUnfocus(this.inputs);
  this.buttons.send.events.on('click',this.send);
}

HomeOffice.open = function(date) {
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

HomeOffice.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value + ' 10:00:00';
  data.date_finish = this.inputs.date.finish.value + ' 10:00:00';
  data.comments = this.inputs.textarea.description.value;
  data.notice = 4;

  return { error: false, data }
}

export { HomeOffice }
