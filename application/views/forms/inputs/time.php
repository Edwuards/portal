<?php
  $inputs = [
    'number'=>[
      'css'=>'w-1/3 mx-1',
      'label'=>'Hora',
      'attrs'=>[
        'name'=>'hour',
        'min'=>'1',
        'max'=>'12'
      ]
    ],
    'number'=>[
      'css'=>'w-1/3 mx-1',
      'label'=>'Minutos',
      'attrs'=>[
        'name'=>'minutes',
        'min'=>'0',
        'max'=>'59'
      ]
    ],
    'select'=>[
      'css'=>'w-1/3 mx-1',
      'label'=>'<i class="far fa-clock"></i>',
      'attrs'=>[
        'name'=>'amPm'
      ]
    ]
  ];

  $html = '';

  foreach ($inputs as $key => $data) {
    $data['attrs']['data-group'] = $group;
    $data['attrs']['data-type'] = 'time';

    if($key == 'number'){
      $html .= NumberInput($data);
    }
    else{
      $html .= SelectInput($data);
    }

  }


?>

<div class="flex">
  <?php  echo $html; ?>
</div>
