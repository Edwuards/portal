import { Form, Helper } from '../form.js';

const Vacation = new Form({
  title: 'Vacación',
  name: 'vacation',
  url: 'permisions/create',
});

let close = undefined;

Vacation.init = function(){
  Helper.pickerUnfocus(this.inputs);
  this.buttons.send.events.on('click',this.send);
}

Vacation.open = function(date){
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

Vacation.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value+' 10:00:00';
  data.date_finish = this.inputs.date.finish.value+' 10:00:00';
  data.notice = 2;

  return { error: false, data }
}



export { Vacation }
