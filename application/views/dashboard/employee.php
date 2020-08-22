<?php
  $dashboard = [
    'nav'=>'employee',
    'menu'=>'employee',
    'content'=>[
      'calendar'=>[],
      'profile'=>[],
      'solicitudes'=>[]
    ]
  ];

  $dashboard = $this->load->view('dashboard/template',$dashboard,true);

  echo $dashboard;
?>
