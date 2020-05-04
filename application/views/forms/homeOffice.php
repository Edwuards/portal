<?php

$html = [
  'date' => $this->load->view('forms/inputs/date',['group'=>'date'],true),
  'hour_start' => $this->load->view('forms/inputs/time',['group'=>'hour_start'],true),
  'hour_finish' => $this->load->view('forms/inputs/time',['group'=>'hour_finish'],true),
  'textarea' => $this->load->view('forms/inputs/textarea',[
    'label'=>'Descrpción',
    'name'=>'description',
    'css'=>'w-full',
    'group'=>''
  ],true)
];
 ?>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha</p>
  <?php echo $html['date']; ?>
</div>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Asunto</p>
  <?php echo $html['textarea']; ?>
</div>
