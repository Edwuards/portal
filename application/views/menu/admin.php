<?php
  $buttons = [
    ['name'=>'profile','route'=>'profile/view','icon'=>'fas fa-user','text'=>'Mi Perfil'],
    ['name'=>'calendar','route'=>'calendar/','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ['name'=>'solicitudes','route'=>'solicitudes/mine/approved/all','icon'=>'fas fa-clipboard-list','text'=>'Solicitudes'],
    ['name'=>'teams','route'=>'teams/view/all','icon'=>'fas fa-sitemap','text'=>'Equipos'],
    ['name'=>'users','route'=>'users/view/all','icon'=>'fas fa-users','text'=>'Usuarios'],
    ['name'=>'logout','route'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
  ];

  $html = $this->load->view('menu/menu',['buttons'=>$buttons],true);

  echo $html;

 ?>
