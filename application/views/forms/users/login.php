<?php

$html = [
  'password' => PasswordInput([
    'css'=>['cont'=>'w-full mx-1 mb-4','input-cont'=>'w-full mb-1 h-12'],
    'label'=>'Contraseña',
    'attrs'=>['name'=>'password'],
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-full mx-1 mb-4','input-cont'=>'w-full mb-1 h-12'],
    'label'=>'Correo',
    'attrs'=>['name'=>'email'],
  ]),
  'send'=> Button([
    'text'=>'iniciar sesión',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 w-32 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<div class="w-full flex flex-col justify-center items-center px-6 sm:px-12 ">
  <?php echo $html['email']; ?>
  <?php echo $html['password']; ?>
</div>



<?php echo FormFooter([$html['send']]); ?>
