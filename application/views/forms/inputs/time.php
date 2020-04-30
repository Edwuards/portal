<?php
  $inputs = [
    [
      'type'=>'number',
      'css'=>'w-1/3 mx-1',
      'label'=>'Hora',
      'name'=>'hour',
      'min'=>'1',
      'max'=>'12'
    ],
    [
      'type'=>'number',
      'css'=>'w-1/3 mx-1',
      'label'=>'Minutos',
      'name'=>'minutes',
      'min'=>'0',
      'max'=>'59'
    ],
    [
      'type'=>'select',
      'css'=>'w-1/3 mx-1',
      'label'=>'AM/PM',
      'name'=>'year'
    ]
  ];

  $html = '';

  foreach ($inputs as $data) {
    $html .= $this->load->view('forms/inputs/'.$data['type'],$data,true);
  }


?>

<div class="flex">
  <?php  echo $html; ?>
</div>
