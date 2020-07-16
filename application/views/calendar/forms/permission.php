<?php

$html = [
  'date_start' => DateInput([
    'css'=>['cont'=>'w-24'],
    'attrs'=>['name'=>'start']
  ]),
  'date_finish' => DateInput([
    'css'=>['cont'=>'w-24'],
    'attrs'=>['name'=>'finish'
    ]]),
  'time_start' => TimeInput([
    'css'=>['cont'=>'w-20'],
    'attrs'=>['name'=>'start']]),
  'time_finish' => TimeInput([
    'css'=>['cont'=>'w-20'],
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
    'css'=>'py-2 px-4 mx-2 text-md bg-red-600 text-white rounded w-full sm:w-auto sm:text-sm'
  ])
];

?>

<form name="permission" class="hidden h-full" >
  <div class="body">

    <div class="flex items-start pb-6 sm:items-center">
      <div class="w-8 h-8 flex items-center justify-center text-gray-700 mr-2 mt-1 sm:mt-0">
        <i class="far fa-calendar"></i>
      </div>
      <div class="flex flex-col w-10/12 items-start sm:items-center sm:w-auto sm:flex-row">
        <div class="flex mb-2 sm:mb-0">
          <?php echo $html['date_start']; ?>
          <?php echo $html['time_start']; ?>
        </div>
        <div class="h-px w-2 mx-2 bg-gray-700 hidden sm:block">
        </div>
        <div class="flex flex-row-reverse sm:flex-row">
          <?php echo $html['time_finish']; ?>
          <?php echo $html['date_finish']; ?>
        </div>
      </div>
    </div>
    <div class="flex items-start pb-6 sm:items-center">
      <div class="w-8 h-8 flex items-start justify-center text-gray-700 mr-2 mt-1">
        <i class="fas fa-align-left"></i>
      </div>
      <?php echo $html['description']; ?>
    </div>


  </div>
  <?php echo FormFooter([$html['send']]); ?>
</form>
