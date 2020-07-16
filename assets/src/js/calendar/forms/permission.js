import { Form } from '../../form/form.js';

export function Permission(){

  const form = new Form({
    title: 'Permiso',
    name: 'permission',
    url: 'permisions/create',
  });

  form.color = 'bg-green-600';

  form.init = function(){
    this.buttons.name.send.events.on('click',this.send);
  }

  form.open = function(date){
    date = (date  == undefined ? new Date(Date.now()) : date );
  }

  form.send = function(){
    let inputs = this.inputs.type;
    let data = {};
    data.date_start = inputs.date.start.value+' '+inputs.time.start.value;
    data.date_finish = inputs.date.finish.value+' '+inputs.time.finish.value;
    data.comments = inputs.textarea.description.value;
    data.notice = 1;

    return { error: false, data }
  }

  return form

}
