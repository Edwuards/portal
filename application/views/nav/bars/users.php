<?php
  $createButton = function($data){
    return '<button data-type="button" type="button" name="'.$data['name'].'" class="hidden flex items-center p-1 '.$data['css'].'">
      <i class="fas '.$data['i'].' mr-2"></i>
      <p class="text-sm"> '.$data['text'].'</p>
    </button>';
  };
  $buttons = [];
  $buttons['exit'] = ['i'=>'fas fa-arrow-left','name'=>'exit','text'=>'','css'=>'text-gray-600 ml-4'];
  $buttons['all'] = [
    ['i'=>'fas fa-user-plus','name'=>'create','text'=>'Agregar','css'=>'text-green-600 mr-4'],
    ['i'=>'fas fa-user-times','name'=>'delete','text'=>'Eliminar','css'=>'text-red-600 mr-4'],
    ['i'=>'fas fa-edit','name'=>'edit','text'=>'Editar','css'=>'text-blue-600 mr-4'],
    ['i'=>'fas fa-ban','name'=>'cancel','text'=>'Cancelar','css'=>'text-red-600 mr-4'],
    ['i'=>'fas fa-check','name'=>'confirm','text'=>'Guardar','css'=>'text-green-600 mr-4'],
  ];

  $exit = $createButton($buttons['exit']);
  $all = '';
  foreach ($buttons['all'] as $button) { $all .= $createButton($button); }

?>


<div data-navbar="users" class="flex items-center w-full hidden">
  <?php echo $exit; ?>
  <p data="title" class="text-sm sm:text-xl mx-6">Usuarios</p>
  <div class="flex"> <?php echo $all; ?> </div>
</div>
