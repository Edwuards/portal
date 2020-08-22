<?php
  $dashboard = [
    'nav'=>'admin',
    'menu'=>'admin',
    'content'=>[
      'calendar'=>[],
      'profile'=>[],
      'users'=>[],
      'solicitudes'=>[]
    ]
  ];

  $dashboard = $this->load->view('dashboard/template',$dashboard,true);

  echo $dashboard;
?>
