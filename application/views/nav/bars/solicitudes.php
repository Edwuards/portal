<?php
  $states = [
    ['value'=>1,'title'=>'Aprobados'],
    ['value'=>2,'title'=>'Pendiente'],
    ['value'=>0,'title'=>'Rechazados']
  ];
  $options = '';
  foreach ($states as $state) {
    $options .= '<option  value="'.$state['value'].'">'.$state['title'].'</option>';
  }

  $select = SelectInput([
    'css'=>['cont'=>'','input'=>'border-b-2 border-red-600'],
    'label'=>'',
    'attrs'=>['name'=>'state'],
    'options'=>$options
  ]);

 ?>

<div data-nav="myAvisos" class="flex items-center w-full hidden">
  <p class="text-sm sm:text-xl mx-6"<?php echo $title ?></p>
  <?php echo $select; ?>
</div>
