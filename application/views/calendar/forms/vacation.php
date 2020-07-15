<?php

$html = [
  'date_start' => DateInput(['attrs'=>['name'=>'start']]),
  'date_finish' => DateInput(['attrs'=>['name'=>'finish']]),
  'send'=> Button([
    'text'=>'solicitar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<form name="vacation" class="hidden" >
  <div class="body">

    <div class="flex items-center mb-6">
      <div class="w-8 h-8 flex items-center justify-center text-gray-700 mr-2">
        <i class="far fa-clock"></i>
      </div>
      <div class="flex w-full items-center">
        <?php echo $html['date_start']; ?>
        <div class="h-px w-2 mx-2 bg-gray-700">
        </div>
        <?php echo $html['date_finish']; ?>
      </div>
    </div>

  </div>
  <?php echo FormFooter([$html['send']]); ?>
</form>