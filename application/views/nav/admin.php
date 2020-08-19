<?php

  $bars = [
    'calendar'=>[],
    'profile'=>[],
    'users'=>[],
    'solicitudes'=>['type'=>'employee']
  ];

  $html = $this->load->view('nav/nav',['bars'=>$bars],true);

  echo $html;

?>
