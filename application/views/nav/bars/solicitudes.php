<?php
  $states = [
    ['value'=>'approved','title'=>'Aprobadas'],
    ['value'=>'pending','title'=>'Pendiente'],
    ['value'=>'validating','title'=>'En Validación'],
    ['value'=>'denied','title'=>'Rechazadas']
  ];

  $owner = [
    'employee'=>[],
    'teamlead'=>[
      ['value'=>'mine','title'=>'Mías'],
      ['value'=>'team','title'=>'De mi Equipo'],
    ],
    'admin'=>[
      ['value'=>'mine','title'=>'Mías'],
      ['value'=>'team','title'=>'De mi equipo'],
      ['value'=>'users','title'=>'De usuarios'],
    ],
  ];

  $options = '';
  foreach ($states as $status) {
    $options .= '<option  value="'.$status['value'].'">'.$status['title'].'</option>';
  }

  $states = SelectInput([
    'css'=>['cont'=>'','input'=>'border-b-2 border-red-600'],
    'label'=>'',
    'attrs'=>['name'=>'status'],
    'options'=>$options
  ]);

  $options = '';
  foreach ($owner[$type] as $view) {
    $options .= '<option  value="'.$view['value'].'">'.$view['title'].'</option>';
  }

  if($options != ''){
    $owner = SelectInput([
      'css'=>['cont'=>'','input'=>'border-b-2 border-red-600'],
      'label'=>'',
      'attrs'=>['name'=>'owner'],
      'options'=>$options
    ]);
  }
  else{
    $owner = '';
  }

 ?>

<div data-navbar="solicitudes" class="flex items-center w-full hidden">
  <p class="text-sm sm:text-xl ml-6">Solicitudes</p>
  <div class="flex ml-6">
    <?php
      echo $states;
      echo $owner;
    ?>
  </div>
</div>
