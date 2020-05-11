<?php

$html = [
  'image'=> ImageInput([
    'css'=>['cont'=>'items-center','img'=>'w-32 h-32 rounded-full overflow-hidden' ],
    'label'=>'Avatar',
    'attrs'=>[
      'input'=>[
        'data-group'=>'avatar',
        'name'=>'file'
      ],
      'button'=>[
        'data-group'=>'avatar',
        'name'=>'upload',
      ],
      'img'=>[
        'data-group'=>'avatar',
        'name'=>'preview',
        'src'=>"https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png"
      ]
    ]
  ]),
  'name' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),
  'lastname' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Apellido',
    'attrs'=>['name'=>'lastname'],
  ]),
  'birthday' => DateInput(['group'=>'birthday']),
  'work_start' => DateInput(['group'=>'work_start']),
  // 'work_position' => SelectInput([
  //   'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
  //   'label'=>'Puesto',
  //   'attrs'=>['name'=>'work_position'],
  // ]),
  // 'work_area' => SelectInput([
  //   'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
  //   'label'=>'Área',
  //   'attrs'=>['name'=>'work_area'],
  // ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Coreo',
    'attrs'=>['name'=>'email'],
  ]),
  'vacations' => NumberInput([
    'css'=>'mx-1 w-1/2',
    'label'=>'Vacaciones',
    'attrs'=> ['name'=>'vacations','min'=>'6','max'=>'14'],
  ]),
  'send'=> Button(['text'=>'Enviar','attrs'=>['name'=>'send']])
];

?>

<?php echo $html['image']; ?>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Info</p>
  <div class="flex">
    <?php echo $html['name']; ?>
    <?php echo $html['lastname']; ?>
  </div>
  <div class="flex">
    <?php echo $html['vacations']; ?>
    <?php echo $html['email']; ?>
  </div>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Cumpleaños</p>
  <?php echo $html['birthday']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de ingreso</p>
  <?php echo $html['work_start']; ?>
</div>


<?php echo FormFooter([$html['send']]); ?>
