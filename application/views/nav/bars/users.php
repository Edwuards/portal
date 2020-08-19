<?php
  $html = '';
  $buttons = [
    ['i'=>'fas fa-user-plus','name'=>'create','text'=>'Agregar','css'=>'text-green-600'],
    ['i'=>'fas fa-user-times','name'=>'delete','text'=>'Eliminar','css'=>'text-red-600'],
  ];

  foreach ($buttons as $button) {
    $html .= '<button  type="button" name="'.$button['name'].'" class="flex items-center p-1 mr-4 '.$button['css'].'">
      <i class="fas '.$button['i'].' mr-2"></i>
      '.$button['text'].'
    </button>';
  }

?>

</div>

<div data-navbar="users" class="flex items-center w-full hidden">

  <p class="text-sm sm:text-xl mx-6">Usuarios</p>
  <div class="flex"> <?php echo $html; ?> </div>
</div>
