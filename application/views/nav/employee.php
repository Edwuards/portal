<?php

  $bars = [
    'calendar'=>[],
    'profile'=>[]
  ];

  $html = $this->load->view('nav/base',['bars'=>$bars],true);

  echo $html;

?>
