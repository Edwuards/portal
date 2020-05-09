<?php

$html = [
  'date' => DateInput(['group'=>'date']),
  'hour_start' => TimeInput(['group'=>'hour_start']),
  'hour_finish' => TimeInput(['group'=>'hour_finish']),
  'textarea' => TextAreaInput([
    'label'=>'Descrpción',
    'css'=>'w-full',
    'attrs'=>[ 'name'=>'description',]
  ]),
  'send'=> Button(['text'=>'Enviar','attrs'=>['name'=>'send']])
];

?>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha</p>
  <?php echo $html['date']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Horario de salida</p>
  <?php echo $html['hour_start']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Horario de regreso</p>
  <?php echo $html['hour_finish']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Asunto</p>
  <?php echo $html['textarea']; ?>
</div>
<?php echo FormFooter([$html['send']]); ?>
