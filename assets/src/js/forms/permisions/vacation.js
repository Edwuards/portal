import { Form, Helper } from '../form.js';

const Vacation = new Form({
  title: 'Vacación',
  name: 'vacation',
  url: 'permisions/create',
});

let close = undefined;

Vacation.init = function(){
  Helper.pickerUnfocus(this.inputs);
}

Vacation.open = function(date){
  close = this.buttons.send.events.on('click',this.send);
  date = (date  == undefined ? new Date(Date.now()) : date );
  Helper.setDate(this.inputs,date);
}

Vacation.close = function(){
  this.buttons.send.events.off('click',close);
}

Vacation.send = function(){
  let data = {};
  data.date_start = this.inputs.date.start.value;
  data.date_finish = this.inputs.date.finish.value;
  data.notice = 2;

  return { error: false, data }
}



export { Vacation }
