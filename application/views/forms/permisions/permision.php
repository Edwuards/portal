<?php

$html = [
  'date_start' => TextInput([
    'label'=>'',
    'css'=>[
      'cont'=>'w-24',
      'input-cont'=>'h-8 datetime',
      'input'=>'text-center'
    ]
  ]),
  'time_start' => TextInput([
    'label'=>'',
    'css'=>[
      'cont'=>'w-16',
      'input-cont'=>'h-8 datetime',
      'input'=>'text-center'
    ]
  ]),
  'date_finish' => TextInput([
    'label'=>'',
    'css'=>[
      'cont'=>'w-24',
      'input-cont'=>'h-8 datetime',
      'input'=>'text-center'
    ]
  ]),
  'time_finish' => TextInput([
    'label'=>'',
    'css'=>[
      'cont'=>'w-16',
      'input-cont'=>'h-8 datetime',
      'input'=>'text-center'
    ]
  ]),
  // 'date_finish' => DateInput(['group'=>'finish']),
  // 'hour_start' => TimeInput(['group'=>'start']),
  // 'hour_finish' => TimeInput(['group'=>'finish']),
  // 'textarea' => TextAreaInput([
  //   'label'=>'Descrpción',
  //   'css'=>'w-full',
  //   'attrs'=>[ 'name'=>'description',]
  // ]),
  'send'=> Button([
    'text'=>'solicitar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<div class="flex items-center">
  <div class="w-8 h-8 flex items-center justify-center text-gray-700">
    <i class="far fa-clock"></i>
  </div>
  <div class="flex w-full items-center">
    <?php echo $html['date_start']; ?>
    <?php echo $html['time_start']; ?>
    <div class="h-px w-2 mx-2 bg-gray-700">
    </div>
    <?php echo $html['date_finish']; ?>
    <?php echo $html['time_finish']; ?>
  </div>
</div>
<?php echo FormFooter([$html['send']]); ?>
