import { Form, Helper } from '../form.js';

const Login = new Form({
  title: 'Login',
  name: 'login',
  url: 'users/login',
});

let close = undefined;
Login.open = function(){
  close = this.buttons.send.events.on('click',Login.send);
}

Login.send = function(){
  $('[data="error"]').text('');
  Login.buttons.send.events.off('click',close);

  let data = {}
  data.email = this.inputs.text.email.value;
  data.password = this.inputs.text.password.value;
  return {error: false, data };
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


export {Login}
