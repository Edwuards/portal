<?php
$buttons = [
  'css'=>'flex h-12 w-12 relative ml-2 justify-center items-center rounded-full bg-blue-700 shadow-xl',
  'elements'=>[
    ['title'=>'Permiso','name'=>'permision','icon'=>'fas fa-clipboard-list'],
    ['title'=>'Vacación','name'=>'vacation','icon'=>'fas fa-plane-departure'],
    ['title'=>'Enfermedad','name'=>'sick','icon'=>'fas fa-notes-medical'],
    ['title'=>'Home Office','name'=>'homeOffice','icon'=>'fas fa-laptop-house']
  ]
];

$html = '';

foreach ($buttons['elements'] as $button) {
  $html .= '
  <div class=" w-full my-2 flex items-center justify-end relative action">
    <p class="text-sm mr-2 font-bold">'.$button['title'].'</p>
    <button type="button" name="'.$button['name'].'" class="'.$buttons['css'].'">
      <i class="text-md text-white '.$button['icon'].'"></i>
    </button>
  </div>';
}

?>



<div id="permisions" class="absolute flex flex-col justify-end items-end right-0 bottom-0 p-6 z-10">
  <div class="relative mb-2 flex flex-col items-end right-0 bottom-0 overflow-hidden w-48">
    <?php echo $html ?>
  </div>
  <div class="relative open flex justify-end ">
    <button class="flex h-12 w-12 justify-center items-center rounded-full bg-red-600 shadow-xl" type="button" name="open">
      <i class="text-lg text-white fas fa-plus"></i>
    </button>
  </div>
</div>
