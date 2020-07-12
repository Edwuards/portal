<?php
  /*
    Data structure
    $buttons = [
      ['name'=>string,'icon'=>string,'text'=>string ],
    ]
  */
  $html = '';
  $render = function($button){
    return '
    <button class="flex items-center mb-4 ml-2 pl-2 items-center '.
    ($button['name'] == 'calendar' ?  'border-l-2' : '')
    .' border-red-600" type="button" name="'.$button['name'].'">
      <i class="text-md '.$button['icon'].'"></i>
      <p class="ml-2">'.$button['text'].'</p>
    </button>';
  };

  foreach ($buttons as $button) {
    $html .= $render($button);
  }

?>

<div id="menu" class="bg-gray-200 text-gray-700 h-full p-4">

    <div class="flex w-full mb-2 px-2 items-center">
      <div class="avatar w-10 h-10 overflow-hidden rounded-full">
        <img class="w-full h-full" src="" alt="">
      </div>
      <div class="ml-4">
        <p class="text-sm font-hairline"></p>
        <p class="text-sm font-hairline"></p>
      </div>
    </div>
    <div class="w-full mt-6" >
      <?php echo $html ?>
    </div>
</div>
