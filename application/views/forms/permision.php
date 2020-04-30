<?php
  $date = $this->load->view('forms/inputs/date','',true);
  $time = $this->load->view('forms/inputs/time','',true);
  $textarea = $this->load->view('forms/inputs/textarea',[
    'label'=>'Descrpción',
    'name'=>'description',
    'css'=>'w-full',
  ],true);
 ?>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha</p>
  <?php echo $date; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Horario de salida</p>
  <?php echo $time; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Horario de regreso</p>
  <?php echo $time; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Asunto</p>
  <?php echo $textarea; ?>
</div>
