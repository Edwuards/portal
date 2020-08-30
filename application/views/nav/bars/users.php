<?php
  $button = function($data){
    $group = function($attr){ if(isset($attr)){ return 'data-group="'.$attr.'"'; }; return ''; };
    return '<button data-type="button" type="button" '.$group($data['group']).' name="'.$data['name'].'" class="hidden flex items-center p-1 '.$data['css'].'">
      <i class="fas '.$data['i'].' mr-2"></i>
      <p class="text-sm"> '.$data['text'].'</p>
    </button>';
  };
  $buttons = [];
  $buttons['users'] = [
    ['i'=>'fas fa-user-plus','group'=>'users','name'=>'create','text'=>'Agregar','css'=>'text-green-600 mr-4'],
    ['i'=>'fas fa-user-times','group'=>'users','name'=>'delete','text'=>'Eliminar','css'=>'text-red-600 mr-4'],
  ];
  $buttons['read profile'] = [
    ['i'=>'fas fa-arrow-left','group'=>'readProfile','name'=>'exit','text'=>'','css'=>'text-gray-600 ml-4'],
    ['i'=>'fas fa-edit','group'=>'readProfile','name'=>'edit','text'=>'Editar','css'=>'text-blue-600 mr-4'],
  ];
  $buttons['edit profile'] = [
    ['i'=>'fas fa-ban','group'=>'editProfile','name'=>'cancel','text'=>'Cancelar','css'=>'text-red-600 mr-4'],
    ['i'=>'fas fa-check','group'=>'editProfile','name'=>'save','text'=>'Guardar','css'=>'text-green-600 mr-4'],
  ];

  $buttons['users'] = array_merge($buttons['users'],$buttons['edit profile']);
  array_push($buttons['users'],$buttons['read profile'][1]);

?>

</div>

<div data-navbar="users" class="flex items-center w-full hidden">
  <?php echo $button($buttons['read profile'][0]); ?>
  <p data="title" class="text-sm sm:text-xl mx-6">Usuarios</p>
  <div class="flex"> <?php foreach ($buttons['users'] as $data){ echo $button($data); }; ?> </div>
</div>
