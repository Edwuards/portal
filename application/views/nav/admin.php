<?php

  $bars = [
    'calendar'=>[],
    'profile'=>[],
    'users'=>[],
    'teams'=>[],
    'solicitudes'=>['type'=>'employee']
  ];

  $html = $this->load->view('nav/nav',['bars'=>$bars],true);

  echo $html;

?>
