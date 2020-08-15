<?php
  $buttons = [
    ['name'=>'profile','route'=>'profile','icon'=>'fas fa-user','text'=>'Mi Perfil'],
    ['name'=>'calendar','route'=>'calendar','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ['name'=>'mensajes','route'=>'messages','icon'=>'fas fa-envelope','text'=>'Mensajes'],
    ['name'=>'solicitudes','route'=>'solicitudes/mine/approved','icon'=>'fas fa-clipboard-list','text'=>'Solicitudes'],
    ['name'=>'logout','route'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
  ];

  $html = $this->load->view('menu/menu',['buttons'=>$buttons],true);

  echo $html;

 ?>
