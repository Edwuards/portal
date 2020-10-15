import { Form } from '../../form/form.js';

export function Sick(){

  const form = new Form({
    name: 'sick',
    url: 'permisions/create',
  });



  form.title = 'Enfermedad',
  form.color = 'bg-blue-600';
  form.init = function(){
    this.buttons.name.send.events.on('click',this.send);
  }

  form.on = function(date) {
    let inputs = this.inputs.type;
    date = (date  == undefined ? new Date(Date.now()) : date );
    for(let i in inputs.date){ inputs.date[i].picker.setDate(date); }

  }

  form.send = function(){
    let inputs = this.inputs.type;
    let data = {};
    data.date_start = inputs.date.start.value+' 10:00:00';
    data.date_finish = inputs.date.finish.value+' 10:00:00';
    data.comments = inputs.textarea.description.value;
    data.notice = 3;

    return { error: false, data }
  }

  return form
}
