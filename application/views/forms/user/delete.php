<?php

$html = [
  'name' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),
  'send'=> Button(['text'=>'Enviar','attrs'=>['name'=>'send']])
];
?>

<?php echo $html['image']; ?>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Info</p>
  <div class="flex">
    <?php echo $html['name']; ?>
    <?php echo $html['lastname']; ?>
  </div>
  <div class="flex">
    <?php echo $html['vacations']; ?>
    <?php echo $html['email']; ?>
  </div>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Cumpleaños</p>
  <?php echo $html['birthday']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de ingreso</p>
  <?php echo $html['work_start']; ?>
</div>


<?php echo FormFooter([$html['send']]); ?>
