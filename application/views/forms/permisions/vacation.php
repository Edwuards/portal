<?php

$html = [
  'date_start' => DateInput(['group'=>'date_start']),
  'date_finish' => DateInput(['group'=>'date_finish']),
  'send'=> Button(['text'=>'Enviar','attrs'=>['name'=>'send']])
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

<?php echo FormFooter([$html['send']]); ?>
