import { Form } from '../../form/form.js';

export function Sick(){

  const form = new Form({
    title: 'Enfermedad',
    name: 'sick',
    url: 'permisions/create',
  });

  form.color = 'bg-blue-600';

  form.init = function(){
    this.buttons.name.send.events.on('click',this.send);
  }

  form.open = function(date) {
    date = (date  == undefined ? new Date(Date.now()) : date );
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
