import { HTML } from '../templates.js';
import { Form } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Vacation = undefined;
  Services.get.form('permisions/vacation',function(html){
    Vacation = new Form({
      name: 'vacation',
      title: 'Vacación',
      html: html,
      url:'permisions/create'
    });

    let close = undefined;
    Vacation.send = function(){
      let data = {
        notice: 2,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };

      this.buttons.send.events.unregister('click',close);
      this.close();

      return { error: false, data }

    }
    Vacation.open = function(){
      close = this.buttons.send.events.on('click',Vacation.send);
    }

  });

  return Vacation
}
