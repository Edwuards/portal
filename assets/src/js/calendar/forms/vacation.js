import { Form } from '../../form/form.js';

function Vacation(){
  
  const form = new Form({
    title: 'Vacación',
    name: 'vacation',
    url: 'permisions/create',
  });


  form.color = 'bg-teal-600';

  form.init = function(){
    this.buttons.name.send.events.on('click',this.send);
  }

  form.on = function(date){
    date = (date  == undefined ? new Date(Date.now()) : date );
  }

  form.send = function(){
    let data = {};
    data.date_start = this.inputs.type.date.start.value+' 10:00:00';
    data.date_finish = this.inputs.type.date.finish.value+' 10:00:00';
    data.notice = 2;

    return { error: false, data }
  }

  return form

}




export { Vacation }
