<?php
$buttons = [
  'css'=>'flex h-10 w-10 relative mt-1 mb-1 justify-center items-center rounded-full bg-blue-900 shadow-xl',
  'elements'=>[
    ['title'=>'Permiso','name'=>'permision','icon'=>'fas fa-clipboard-list'],
    ['title'=>'Vacación','name'=>'vacation','icon'=>'fas fa-plane-departure'],
    ['title'=>'Enfermedad','name'=>'sick','icon'=>'fas fa-notes-medical'],
    ['title'=>'Home Office','name'=>'homeOffice','icon'=>'fas fa-laptop-house']
  ]
];

$html = '';

foreach ($buttons['elements'] as $button) {
  $html .= '<div class="flex items-center hidden action">
    <p class="text-sm mr-2 font-bold">'.$button['title'].'</p>
    <button type="button" name="'.$button['name'].'" class="'.$buttons['css'].'">
      <i class="text-md text-white '.$button['icon'].'"></i>
    </button>
  </div>';
}

?>


<div id="permisions" class="absolute right-0 bottom-0 p-2 z-10">
  <div class="button-cont flex flex-col h-full items-end justify-end">
    <?php echo $html ?>
    <div class="flex items-center">
      <button class="flex h-10 w-10 relative mt-1 mb-1 justify-center items-center rounded-full bg-blue-900 shadow-xl" type="button" name="open">
        <i class="text-lg text-white fas fa-plus"></i>
      </button>
    </div>
  </div>
</div>
