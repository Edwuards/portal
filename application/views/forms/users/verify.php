<?php

$html = [
  'password' => PasswordInput([
    'css'=>['cont'=>'w-full mx-1 mb-4','input-cont'=>'w-full mb-1 '],
    'label'=>'Nueva Contraseña',
    'attrs'=>['name'=>'password'],
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-full mx-1 mb-4 hidden','input-cont'=>'w-full mb-1'],
    'label'=>'Correo',
    'attrs'=>['name'=>'email','value'=>$email],
  ]),
  'send'=> Button([
    'text'=>'Verificar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 w-32 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<form class="w-full h-full" name="verify">
  <div class="w-full flex flex-col justify-center items-center px-6 sm:px-12 ">
    <?php echo $html['password']; ?>
    <?php echo $html['email']; ?>
  </div>


  <?php echo FormFooter([$html['send']]); ?>
</form>
