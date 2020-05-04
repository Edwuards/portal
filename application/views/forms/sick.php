<?php

$html = [
  'date_start' => $this->load->view('forms/inputs/date',['group'=>'date_start'],true),
  'date_finish' => $this->load->view('forms/inputs/date',['group'=>'date_finish'],true),
  'image'=> $this->load->view('forms/inputs/image',[
    'css'=>['cont'=>'','img'=>'w-2/3' ],
    'group'=>'',
    'name'=>'img',
    'label'=>
    'Receta Medica'
    ],true)
];
?>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de salida</p>
  <?php echo $html['date_start']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de regreso</p>
  <?php echo $html['date_finish']; ?>
</div>

<?php echo $html['image']; ?>
