<?php
  $buttons = [
    ['name'=>'profile','route'=>'profile/','icon'=>'fas fa-user','text'=>'Mi Perfil'],
    ['name'=>'calendar','route'=>'calendar/','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ['name'=>'mensajes','route'=>'messages','icon'=>'fas fa-envelope','text'=>'Mensajes'],
    ['name'=>'solicitudes','route'=>'solicitudes/mine/approved','icon'=>'fas fa-clipboard-list','text'=>'Solicitudes'],
    ['name'=>'teams','route'=>'teams/','icon'=>'fas fa-sitemap','text'=>'Equipos'],
    ['name'=>'users','route'=>'users/view/all','icon'=>'fas fa-users','text'=>'Usuarios'],
    ['name'=>'apps','route'=>'apps/','icon'=>'fas fa-laptop','text'=>'Apps'],
    ['name'=>'logout','route'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
  ];

  $html = $this->load->view('menu/menu',['buttons'=>$buttons],true);

  echo $html;

 ?>
