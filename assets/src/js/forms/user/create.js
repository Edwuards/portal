import { HTML } from '../templates.js';
import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Create = undefined;
  Services.get.form('users/create',function(html){
    Create = new Form({
      title: 'Nuevo usuario',
      name: 'createUser',
      html: html,
      url: 'users/create',
    });

    let close = undefined;
    Create.open = function(){
      close = this.buttons.send.events.on('click',Create.send);
      Helper.notEmptyText(this.inputs.text);
      Helper.notEmptyNumber(this.inputs.number);
    }

    Create.send = function(){
      return {error: false, data: Helper.collectValues(this.inputs) };
    }

    Create.events.on('close',function(){
      this.buttons.send.events.unregister('click',close);
    });

  });

  return Create
}
