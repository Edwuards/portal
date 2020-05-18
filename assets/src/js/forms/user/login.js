import { HTML } from '../templates.js';
import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Login = undefined;
  Services.get.form('users/login',function(html){
    Login = new Form({
      title: 'Login',
      name: 'login',
      html: html,
      url: 'users/login',
    });

    let close = undefined;
    Login.open = function(){
      close = this.buttons.send.events.on('click',Login.send);
      Helper.notEmptyText(this.inputs.text);
      Helper.notEmptyText(this.inputs.password);
    }

    Login.send = function(){
      $('[data="error"]').text('');
      Login.buttons.send.events.unregister('click',close);

      return {error: false, data: Helper.collectValues(this.inputs) };
    }

    Login.events.on('response',function(response){
      if(response.error){
        close = Login.buttons.send.events.on('click',Login.send);
        $('[data="error"]').text(response.data);
      }
      else{
        window.location.href = `${window.location.origin}/app/dashboard`;
      }
    });

  });

  return Login
}
