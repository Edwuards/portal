<?php
  $inputs = [
    [
      'type'=>'number',
      'data'=>[
        'css'=>'w-1/3 mx-1',
        'label'=>'Hora',
        'attrs'=>[
          'name'=>'hour',
          'min'=>'1',
          'max'=>'12'
        ]
      ]
    ],
    [
      'type'=>'number',
      'data'=>[
        'css'=>'w-1/3 mx-1',
        'label'=>'Minutos',
        'attrs'=>[
          'name'=>'minutes',
          'min'=>'0',
          'max'=>'59'
        ]
      ]
    ],
    [
      'type'=>'select',
      'data'=>[
        'css'=>'w-1/3 mx-1',
        'label'=>'<i class="far fa-clock"></i>',
        'attrs'=>[
          'name'=>'time'
        ]
      ]
    ]
  ];

  $html = '';

  foreach ($inputs as $input) {
    $input['data']['attrs']['data-group'] = $group;
    $input['data']['attrs']['data-type'] = 'time';

    if($input['type'] == 'number'){
      $html .= NumberInput($input['data']);
    }
    else{
      $html .= SelectInput($input['data']);
    }

  }


?>

<div class="flex">
  <?php  echo $html; ?>
</div>
