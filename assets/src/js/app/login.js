import { Form } from '../form/form';

$(document).ready(function(){
  const form = new Form({name: 'login',url: 'users/login' });
  const { buttons } = form;
  const { email , password } = form.inputs.type.text;

  form.error = form.element.find('.error');

  form.send = function(){
    form.error.text('');

    let data = {};
    let error = false;
    error = email.value == '' || password.value == '';
    if(error){ data = 'Datos incompletos'; }
    else{
      data.email = email.value;
      data.password = password.value;
    }

    return { error, data }

  }

  form.events.on('send',function(message){
    if(message.error){ form.error.text(message.data); }
  });

  form.events.on('response',function(response){
    if(!response.error){ window.location = `${window.location.origin}/app/dashboard`; }
    else{
      form.error.text('Credenciales incorrectas');
    }
  });

  form.init = function(){
    buttons.name.login.events.on('click',form.send);
  }


  form.on();
});
