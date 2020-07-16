<?php

$html = [
  'date_start' => DateInput([
    'css'=>['cont'=>'w-24'],
    'attrs'=>['name'=>'start']
  ]),
  'date_finish' => DateInput([
    'css'=>['cont'=>'w-24'],
    'attrs'=>['name'=>'finish']
  ]),
  'description' => TextAreaInput([
    'attrs'=>[
      'name'=>'description',
      'placeholder'=>'Agregar Descripción',
    ]
  ]),
  'send'=> Button([
    'text'=>'solicitar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 text-md bg-red-600 text-white rounded w-full sm:w-auto sm:text-sm'
  ])
];

?>

<form name="homeOffice" class="hidden h-full" >
  <div class="body">

    <div class="flex items-center mb-6">
      <div class="w-8 h-8 flex items-center justify-center text-gray-700 mr-2">
        <i class="far fa-calendar"></i>
      </div>
      <div class="flex w-full items-center">
        <?php echo $html['date_start']; ?>
        <div class="h-px w-2 mx-2 bg-gray-700">
        </div>
        <?php echo $html['date_finish']; ?>
      </div>
    </div>
    <div class="flex items-start mb-6">
      <div class="w-8 h-8 flex items-start justify-center text-gray-700 mr-2 mt-1">
        <i class="fas fa-align-left"></i>
      </div>
      <?php echo $html['description']; ?>
    </div>

  </div>
  <?php echo FormFooter([$html['send']]); ?>
</form>
