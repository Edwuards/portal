<?php

$html = [
  'delete'=> Button(['text'=>'Borrar','attrs'=>['name'=>'send']]),
  'cancel'=> Button(['text'=>'Cancelar','attrs'=>['name'=>'cancel']])
];
?>

<div class="flex flex-col justify-around h-full">

  <div data="message" class="w-full mt-12 px-4 mb-2 h-full text-lg ">

  </div>
  <?php echo FormFooter([$html['cancel'],$html['delete']]); ?>
</div>
