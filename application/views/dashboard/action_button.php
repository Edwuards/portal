<?php
$buttons = [
  'css'=>'flex h-12 w-12 relative ml-2 justify-center items-center rounded-full bg-blue-900 shadow-xl',
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
  <div class=" flex w-48 my-4 items-center justify-end relative action">
    <p class="text-sm mr-2 font-bold">'.$button['title'].'</p>
    <button type="button" name="'.$button['name'].'" class="'.$buttons['css'].'">
      <i class="text-md text-white '.$button['icon'].'"></i>
    </button>
  </div>';
}

?>



<div id="permisions" class="absolute inset-0 z-10">
  <div class="button-cont mb-20 mr-6 absolute bottom-0 right-0 overflow-hidden">
    <?php echo $html ?>
  </div>
  <div class="open flex m-6 items-center justify-end absolute bottom-0 right-0">
    <button class="flex h-12 w-12 relative justify-center items-center rounded-full bg-blue-900 shadow-xl" type="button" name="open">
      <i class="text-lg text-white fas fa-plus"></i>
    </button>
  </div>
</div>
