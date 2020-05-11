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
    'css'=>['cont'=>'w-full mx-1','input'=>'w-full'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),
  'work_position' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Puesto',
    'attrs'=>['name'=>'work_position'],
  ]),
  'work_area' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Área',
    'attrs'=>['name'=>'work_area'],
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Coreo',
    'attrs'=>['name'=>'email'],
  ]),
  'birthday' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Cumpleaños',
    'attrs'=>['name'=>'birthday'],
  ]),
  'vacations' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Vacaciones',
    'attrs'=>['name'=>'vacations'],
  ]),
  'work_start' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'label'=>'Fecha de ingreso',
    'attrs'=>['name'=>'work_start'],
  ]),
  'send'=> Button(['text'=>'Guardar','attrs'=>['name'=>'send']]),
  'edit'=> Button(['text'=>'Editar','attrs'=>['name'=>'edit']]),
  'cancel'=> Button(['text'=>'Cancelar','attrs'=>['name'=>'cancel']])
];
?>

<?php echo $html['image']; ?>
<?php echo $html['name']; ?>
<div class="flex">
  <?php echo $html['birthday']; ?>
  <?php echo $html['email']; ?>
</div>
<div class="flex">
  <?php echo $html['work_area']; ?>
  <?php echo $html['work_position']; ?>
</div>
<div class="flex">
  <?php echo $html['work_start']; ?>
  <?php echo $html['vacations']; ?>
</div>

<?php echo FormFooter([$html['send'],$html['edit'],$['cancel']]); ?>
