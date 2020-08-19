<?php
  $dashboard = [
    'nav'=>'admin',
    'menu'=>'admin',
    'content'=>[
      'calendar/calendar'=>[],
      'users/users'=>[],
      'users/profile'=>[],
      'solicitudes/solicitudes'=>[]
    ]
  ];

  $dashboard = $this->load->view('dashboard/dashboard',$dashboard,true);

  echo $dashboard;
?>
