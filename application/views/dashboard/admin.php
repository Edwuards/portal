<?php
  $dashboard = [
    'nav'=>'admin',
    'menu'=>'admin',
    'content'=>[
      'calendar'=>[],
      'profile'=>[],
      'users'=>[],
      'solicitudes'=>[],
      'teams'=>[]
    ]
  ];

  $dashboard = $this->load->view('dashboard/template',$dashboard,true);

  echo $dashboard;
?>
