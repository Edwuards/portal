import { Form, Helper } from '../form.js';

const HomeOffice = new Form({
  title: 'Home Office',
  name: 'homeOffice',
  url: 'permisions/create',
});

let close = undefined;

HomeOffice.init = function(){
  Helper.pickerUnfocus(this.inputs);
}

HomeOffice.open = function(date) {
  close = this.buttons.send.events.on('click',this.send);
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

HomeOffice.close = function(){
  this.buttons.send.events.off('click',close);
}

HomeOffice.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value;
  data.date_finish = this.inputs.date.finish.value;
  data.comments = this.inputs.textarea.description.value;
  data.notice = 4;

  return { error: false, data }
}

export { HomeOffice }
