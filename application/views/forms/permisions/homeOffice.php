<?php

$html = [
  'date_start' => DateInput(['group'=>'start']),
  'date_finish' => DateInput(['group'=>'finish']),
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
  <?php echo $html['date_start']; ?>
</div>

<div class="hidden">
  <?php echo $html['date_finish']; ?>
</div>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Asunto</p>
  <?php echo $html['textarea']; ?>
</div>

<?php echo FormFooter([$html['send']]); ?>
