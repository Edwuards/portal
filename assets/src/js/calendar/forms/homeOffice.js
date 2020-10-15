import { Form } from '../../form/form.js';

export function HomeOffice(){

  const form = new Form({
    name: 'homeOffice',
    url: 'permisions/create',
  });

  form.color = 'bg-indigo-600';
  form.title = 'Home Office';

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
    data.date_start = inputs.date.start.value + ' 10:00:00';
    data.date_finish = inputs.date.finish.value + ' 10:00:00';
    data.comments = inputs.textarea.description.value;
    data.notice = 4;

    return { error: false, data }
  }

  return form

}
