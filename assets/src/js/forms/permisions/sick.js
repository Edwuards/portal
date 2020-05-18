import { HTML } from '../templates.js';
import { Form } from '../form.js';
import { Services } from '../../services.js';


export default function(){
  let Sick = undefined;
  Services.get.form('permisions/sick',function(html){
    Sick = new Form({
      name: 'sick',
      title: 'Enfermedad',
      html: html,
      url:'permisions/create'
    });

    let close = undefined;
    Sick.open = function(){
      close = Sick.buttons.send.events.on('click',Sick.send);

    }
    Sick.send = function(){
      let data = {
        notice: 3,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };
      this.buttons.send.events.unregister('click',close);
      this.close();

      return { error: false, data }

    }

  });

  return Sick
}
