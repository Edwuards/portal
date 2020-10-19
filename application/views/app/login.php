<?php
$html = [
  'email' => TextInput([
    'label'=>'Correo',
    'css'=>['cont'=>'w-full my-4'],
    'attrs'=>['name'=>'email']
  ]),
  'password' => PasswordInput([
    'label'=>'Contraseña',
    'css'=>['cont'=>'w-full my-4'],
    'attrs'=>['name'=>'password']
  ])
]

?>

<div class="flex justify-center items-center w-screen h-screen bg-gray-200">
  <form id="login" name="login" class="p-4 bg-white flex flex-col items-center shadow-2xl">
    <h1 class="text-lg m-2">
      <img src="/assets/public/img/figment_logo.png" class="w-16 h-16"alt="">
    </h1>
    <div class="inputs w-3/4">
      <?php
        echo $html['email'];
        echo $html['password'];
      ?>
    </div>
    <div class="buttons flex items-center justify-center">
      <button type="button" name="login" class="p-2 bg-blue-600 text-white rounded">Iniciar Sessión</button>
    </div>
  </form>
</div>
