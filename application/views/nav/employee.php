<?php

  $bars = [
    'calendar'=>[],
    'profile'=>[],
    'solicitudes'=>['type'=>'employee']
  ];

  $html = $this->load->view('nav/nav',['bars'=>$bars],true);

  echo $html;

?>
