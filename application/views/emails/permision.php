<?php
  $message = [];
  $message['title'] = 'Permiso '.((int)$status == 0 ? 'Rechazado' : 'Aprobado');
  $message['message'] = 'El perimiso con el id: '.$id.' fue '.((int)$status == 0 ? 'rechazado' : 'aprobado');
  $message['button'] = [
    'text'=>'ver',
    'href'=>base_url('app/dashboard')
  ];

  echo $this->load->view('emails/message_and_button',$message,TRUE);

?>
