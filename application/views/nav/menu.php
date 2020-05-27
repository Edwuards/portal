<?php
  $html = '';
  $buttons = [
    'users'=> [
      ['name'=>'profile','icon'=>'fas fa-user','text'=>'Mi Perfil'],
      ['name'=>'myAvisos','icon'=>'fas fa-envelope','text'=>'Mis Avisos'],
      ['name'=>'calendar','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
    ],
    'rh'=> [
      ['name'=>'users','icon'=>'fas fa-users','text'=>'Usuarios'],
      ['name'=>'userAvisos','icon'=>'fas fa-clipboard-list','text'=>'Avisos de Usuarios'],
    ],
    'logout'=>[
      ['name'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
    ]
  ];



  $render = function($button){
    return '
    <button class="flex items-center mb-4 ml-2 pl-2 items-center '.
    ($button['name'] == 'calendar' ?  'border-l-2' : '')
    .' border-red-600" type="button" name="'.$button['name'].'">
      <i class="text-md '.$button['icon'].'"></i>
      <p class="ml-2">'.$button['text'].'</p>
    </button>';
  };

  foreach ($buttons['users'] as $button) {
    $html .= $render($button);
  }

  $buttons['users'] = $html; $html = '';

  foreach ($buttons['rh'] as $button) {
    $html .= $render($button);
  }

  $buttons['rh'] = $html; $html = '';

  foreach ($buttons['logout'] as $button) {
    $html .= $render($button);
  }

  $buttons['logout'] = $html; $html = '';


 ?>
<div id="menu" class="bg-gray-200 text-gray-700 h-full p-4">
    <div class="h-8 flex w-full m-4 sm:hidden">
       <img src="<?php echo $this->session->avatar; ?>" class="h-full">
     </div>
    <div class="flex w-full mb-2 px-2 items-center">
      <div class="avatar w-10 h-10">
        <img class="w-full" src="<?php echo $this->session->avatar; ?>" alt="">
      </div>
      <div class="ml-4">
        <p class="text-sm font-hairline"><?php echo $this->session->name; ?></p>
        <p class="text-sm font-hairline">Puesto de Trabajo</p>
      </div>
    </div>
    <div class="w-full mt-6" >
      <?php echo $buttons['users']; ?>

      <?php if($this->session->role > 1 ){ echo $buttons['rh']; }?>
      <?php echo $buttons['logout']; ?>

    </div>
</div>
