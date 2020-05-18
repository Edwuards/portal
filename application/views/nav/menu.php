<?php
  $css = '';
  if($this->session->role < 2){ $css = 'hidden'; }

 ?>
<div id="menu" class="bg-gray-200 h-full p-4">
    <div class="flex w-full mb-4"> <p>Avisame</p> </div>
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
      <button class="flex w-full mb-2 p-2 items-center hidden" type="button" name="myProfile">
        <i class="w-10 text-xl far fa-user-circle"></i>
        <p class="ml-2">Perfil</p>
      </button>
      <button class="flex w-full mb-2 p-2 items-center" type="button" name="logout">
        <i class="w-10 text-xl fas fa-door-open"></i>
        <p class="ml-2">Salir</p>
      </button>
      <button class="flex w-full mb-2 p-2 items-center border-l-4 border-blue-600" type="button" name="calendar">
        <i class="w-10 text-xl far fa-calendar"></i>
        <p class="ml-2">Calendario</p>
      </button>
      <button class="flex w-full mb-2 p-2 items-center" type="button" name="myAvisos">
        <i class="w-10 fas fa-envelope"></i>
        <p class="ml-2">Mis Avisos</p>
      </button>
      <button class="flex w-full mb-2 p-2 items-center <?php echo $css; ?>" type="button" name="users">
        <i class="w-10 text-xl fas fa-users"></i>
        <p class="ml-2">Usuarios</p>
      </button>
      <button class="flex w-full mb-2 p-2 items-center <?php echo $css; ?>" type="button" name="userAvisos">
        <i class="w-10 text-xl fas fa-clipboard-list"></i>
        <p class="ml-2">Avisos de usuarios</p>
      </button>

    </div>
</div>
