<?php
  $states = [
    ['value'=>'approved','title'=>'Aprobados'],
    ['value'=>'pending','title'=>'Pendiente'],
    ['value'=>'validating','title'=>'En Validación'],
    ['value'=>'denied','title'=>'Rechazados']
  ];

  $views = [
    'employee'=>[],
    'teamlead'=>[
      ['value'=>'mine','title'=>'Míos'],
      ['value'=>'team','title'=>'Equipo'],
    ]
  ];

  $options = '';
  foreach ($states as $state) {
    $options .= '<option  value="'.$state['value'].'">'.$state['title'].'</option>';
  }

  $states = SelectInput([
    'css'=>['cont'=>'','input'=>'border-b-2 border-red-600'],
    'label'=>'',
    'attrs'=>['name'=>'state'],
    'options'=>$options
  ]);

  $options = '';
  foreach ($views[$type] as $view) {
    $options .= '<option  value="'.$view['value'].'">'.$view['title'].'</option>';
  }

  if($options != ''){
    $views = SelectInput([
      'css'=>['cont'=>'','input'=>'border-b-2 border-red-600'],
      'label'=>'',
      'attrs'=>['name'=>'views'],
      'options'=>$options
    ]);
  }
  else{
    $views = '';
  }

 ?>

<div data-navbar="solicitudes" class="flex items-center w-full hidden">
  <p class="text-sm sm:text-xl ml-6">Solicitudes</p>
  <div class="flex ml-6">
    <?php
      echo $states;
      echo $views;
    ?>
  </div>
</div>
