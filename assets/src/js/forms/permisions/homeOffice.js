import { HTML } from '../templates.js';
import { Form } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let HomeOffice = undefined;
  Services.get.form('permisions/homeOffice',function(html){
    HomeOffice = new Form({
      name: 'homeOffice',
      title: 'Home Office',
      html: html,
      url:'permisions/create'
    });

    let close = undefined;
    HomeOffice.open = function(){
      close = this.buttons.send.events.on('click',HomeOffice.send);

    }
    HomeOffice.send = function(){
      this.inputs.date.finish.value = (this.inputs.date.start.value.getTime()/1000);

      let data = {
        notice: 4,
        comments: this.inputs.textarea.description.value,
        date_start: this.inputs.date.start.format,
        date_finish: this.inputs.date.finish.format,
      };

      this.close();
      this.buttons.send.events.unregister('click',close);

      return { error: false, data }

    }

  });

  return HomeOffice
}
