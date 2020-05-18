import { HTML } from '../templates.js';
import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Permision = undefined;
  Services.get.form('permisions/permision',function(html){
    Permision = new Form({
      name: 'permision',
      title: 'Permiso',
      html: html,
      url:'permisions/create'
    });

    let close = undefined;
    Permision.open = function(){
      this.inputs.date.finish.disable(true);
      Helper.notEmptyNumber(this.inputs.time);
      Helper.notEmptyText(this.inputs.textarea);
      close = Permisions.permision.buttons.send.events.on('click',Permisions.permision.send);
    }
    Permision.send = function(){
      this.inputs.date.finish.value = (this.inputs.date.start.value.getTime()/1000);
      let data = {
        notice: 1,
        comments:this.inputs.textarea.description.value,
        date_start: this.inputs.date.start.value,
        date_finish: this.inputs.date.finish.value,
      };

      let time = {
        start: this.inputs.time.start.value,
        finish: this.inputs.time.finish.value
      }

      data.date_start.setHours(time.start.hour);
      data.date_start.setMinutes(time.start.minutes);
      data.date_finish.setHours(time.finish.hour);
      data.date_finish.setMinutes(time.finish.minutes);
      data.date_start = this.inputs.date.start.format;
      data.date_finish = this.inputs.date.finish.format;

      this.close();

      return { error: false, data }

    }
    Permision.events.on('send',()=>{
      Permisions.permision.buttons.send.events.unregister('click',close);
    });


  });

  return Permision
}
