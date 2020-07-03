<?php
  $buttons = [
    ['name'=>'profile','icon'=>'fas fa-user','text'=>'Mi Perfil'],
    ['name'=>'solicitudes','icon'=>'fas fa-envelope','text'=>'Mis Avisos'],
    ['name'=>'calendar','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ['name'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
  ];

  $html = $this->load->view('menu/base',['buttons'=>$buttons],true);

  echo $html;

 ?>
