<?php
  $message = [
    'title'=>'Bienvenido',
    'message'=>'Hola '.$user['name'].', haz clic en el botón para poder verificar tu cuenta.',
    'button'=>[
       'text'=>'verificar',
       'href'=>base_url('app/verify/'.$user['id'].'/'.$user['code'])
    ]
  ];

  echo $this->load->view('emails/message_and_button',$message,TRUE);

?>
