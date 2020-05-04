<?php
  $select = [
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Mes',
      'name'=>'month'
    ],
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Día',
      'name'=>'day'
    ],
    [
      'css'=>'w-1/3 mx-1',
      'label'=>'Año',
      'name'=>'year'
    ]
  ];

  $html = '';

  foreach ($select as $data) {
    $data['group'] = $group;
    $html .= $this->load->view('forms/inputs/select',$data,true);
  }


?>

<div class="flex">
  <?php  echo $html; ?>
</div>
