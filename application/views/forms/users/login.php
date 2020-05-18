<?php

$html = [
  'password' => PasswordInput([
    'css'=>['cont'=>'w-full mx-1','input'=>'w-full'],
    'label'=>'Contraseña',
    'attrs'=>['name'=>'password'],
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-full mx-1','input'=>'w-full'],
    'label'=>'Correo',
    'attrs'=>['name'=>'email'],
  ]),
  'send'=> Button(['text'=>'Login','attrs'=>['name'=>'send']])
];

?>

<div class="w-full flex flex-col justify-center items-center px-6 sm:px-12 ">
  <?php echo $html['email']; ?>
  <?php echo $html['password']; ?>
</div>



<?php echo FormFooter([$html['send']]); ?>
