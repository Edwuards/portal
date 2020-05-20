<?php
$colors = [
  'bg-green-600','bg-teal-600','bg-blue-600','bg-indigo-600'
];
$buttons = [
  'css'=>'flex h-10 w-10 relative ml-2 mr-1 justify-center items-center rounded-full',
  'elements'=>[
    ['title'=>'Permiso','name'=>'permision','icon'=>'fas fa-clipboard-list'],
    ['title'=>'Vacación','name'=>'vacation','icon'=>'fas fa-plane-departure'],
    ['title'=>'Enfermedad','name'=>'sick','icon'=>'fas fa-notes-medical'],
    ['title'=>'Home Office','name'=>'homeOffice','icon'=>'fas fa-laptop-house']
  ]
];

$html = '';
$i = 0;
foreach ($buttons['elements'] as $button) {
  $html .= '
  <div class=" my-2 flex items-center justify-end absolute right-0 bottom-0 permision hide">
    <p class="text-sm mr-2 text-gray-700 font-bold w-24 text-right">'.$button['title'].'</p>
    <button type="button" name="'.$button['name'].'" class="'.$buttons['css'].' '.$colors[$i].'">
      <i class="text-md text-white '.$button['icon'].'"></i>
    </button>
  </div>';
  $i++;
}

?>



<div class="permisions-cont flex flex-col justify-end items-end right-0 bottom-0 z-20 pr-10 pb-10">
    <?php echo $html ?>
    <div class=" w-full my-2 flex items-center justify-end relative action">
      <button class="flex justify-center items-center rounded-full bg-white" type="button" name="avisar">
        <i class="text-md text-red-600 fas fa-bullhorn"></i>

        <!-- <img src="https://avisame.figment.com.mx/assets/img/icon_avisame.png" class="w-5" alt=""> -->
      </button>
    </div>
</div>
