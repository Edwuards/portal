<?php

$html = [
  'date_start' => DateInput([
    'css'=>['cont'=>'w-1/2'],
    'attrs'=>['name'=>'start']
  ]),
  'date_finish' => DateInput([
    'css'=>['cont'=>'w-1/2'],
    'attrs'=>['name'=>'finish'
    ]]),
  'time_start' => TimeInput([
    'css'=>['cont'=>'w-1/2'],
    'attrs'=>['name'=>'start']]),
  'time_finish' => TimeInput([
    'css'=>['cont'=>'w-1/2'],
    'attrs'=>['name'=>'finish']]),
  'description' => TextAreaInput([
    'attrs'=>[
      'name'=>'description',
      'placeholder'=>'Agregar Descripción',
    ]
  ]),
  'send'=> Button([
    'text'=>'solicitar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<form name="permision" class="permisions" >
  <div class="body">

    <div class="flex items-center mb-6">
      <div class="w-8 h-8 flex items-center justify-center text-gray-700 mr-2">
        <i class="far fa-clock"></i>
      </div>
      <div class="flex  items-center">
        <div class="flex w-2/6">
          <?php echo $html['date_start']; ?>
          <?php echo $html['time_start']; ?>
        </div>
        <div class="h-px w-2 mx-2 bg-gray-700">
        </div>
        <div class="flex w-2/6">
          <?php echo $html['date_finish']; ?>
          <?php echo $html['time_finish']; ?>
        </div>
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
