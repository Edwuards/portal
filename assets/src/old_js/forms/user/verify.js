import { Form, Helper } from '../form.js';

const Verify = new Form({
  title: 'Verify',
  name: 'verify',
  url: 'users/verify',
});

let close = undefined;

Verify.open = function(){
  close = this.buttons.send.events.on('click',Verify.send);
}

Verify.send = function(){
  $('[data="error"]').text('');
  Verify.buttons.send.events.off('click',close);

  let data = {}
  data.email = this.inputs.text.email.value;
  data.password = this.inputs.text.password.value;
  return {error: false, data };
}

Verify.events.on('response',function(response){
  if(response.error){
    close = Verify.buttons.send.events.on('click',Verify.send);
    $('[data="error"]').text(response.data);
  }
  else{
    window.location.href = `${window.location.origin}/app/dashboard`;
  }
});


export {Verify}
