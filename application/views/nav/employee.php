<?php

  $bars = [
    'calendar'=>[],
    'profile'=>[],
    'solicitudes'=>['type'=>'employee']
  ];

  $html = $this->load->view('nav/base',['bars'=>$bars],true);

  echo $html;

?>
