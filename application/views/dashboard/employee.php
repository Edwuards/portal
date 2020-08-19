<?php
  $dashboard = [
    'nav'=>'employee',
    'menu'=>'employee',
    'content'=>[
      'calendar/calendar'=>[],
      'users/profile'=>[],
      'solicitudes/solicitudes'=>[]
    ]
  ];

  $dashboard = $this->load->view('dashboard/dashboard',$dashboard,true);

  echo $dashboard;
?>
