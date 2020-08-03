<?php
  $buttons = [
    ['name'=>'profile','route'=>'profile','icon'=>'fas fa-user','text'=>'Mi Perfil'],
    ['name'=>'solicitudes','route'=>'solicitudes','icon'=>'fas fa-envelope','text'=>'Mis Avisos'],
    ['name'=>'calendar','route'=>'calendar','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ['name'=>'logout','route'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
  ];

  $html = $this->load->view('menu/menu',['buttons'=>$buttons],true);

  echo $html;

 ?>
