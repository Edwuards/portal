<?php
  $html = '';
  $buttons = [
    'users'=> [
      ['name'=>'perfil','icon'=>'fas fa-user','text'=>'Mi Perfil'],
      ['name'=>'avisos','icon'=>'fas fa-envelope','text'=>'Mis Avisos'],
      ['name'=>'calendar','icon'=>'far fa-calendar-alt','text'=>'Calendario'],
      ['name'=>'logout','icon'=>'fas fa-power-off','text'=>'Cerrar Sesión']
    ]
  ];

  foreach ($buttons['users'] as $button) {
    $html .= '
    <button class="flex items-center mb-4 ml-2 pl-2 items-center '.
    ($button['name'] == 'calendar' ?  'border-l-2' : '')
    .' border-red-600" type="button" name="'.$button['name'].'">
      <i class="text-md '.$button['icon'].'"></i>
      <p class="ml-2">'.$button['text'].'</p>
    </button>';
  }

  $buttons['users'] = $html; $html = '';


 ?>
<div id="menu" class="bg-gray-200 text-gray-700 h-full p-4">
    <div class="h-8 flex w-full m-4 sm:hidden">
       <img src="https://avisame.figment.com.mx/assets/img/logo.png" class="h-full">
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

    </div>
</div>
