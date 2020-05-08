<?php
  $select = [
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Mes',
      'attrs'=>[
        'name'=>'month'
      ]
    ],
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Día',
      'attrs'=>[
        'name'=>'day'
      ]
    ],
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Año',
      'attrs'=>[
        'name'=>'year'
      ]
    ]
  ];

  $html = '';

  foreach ($select as $data) {
    $data['attrs']['data-group'] = $group;
    $data['attrs']['data-type'] = 'date';
    $html .= SelectInput($data);
  }


?>

<div class="flex">
  <?php  echo $html; ?>
</div>
