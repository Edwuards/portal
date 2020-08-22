<?php
$options = [
  'areas'=>'',
  'positions'=>''
];

foreach ($work['positions'] as $position) {
  $options['positions'] .= '<option data-area="'.$position['area'].'" value="'.$position['id'].'">'.$position['title'].'</option>';
}
foreach ($work['areas'] as $area) {
  $options['areas'] .= '<option  value="'.$area['id'].'">'.$area['title'].'</option>';
}

$html = [
  'image'=> ImageInput([
    'css'=>['cont'=>'items-center','img'=>'w-40 h-40 rounded-full overflow-hidden' ],
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
    'css'=>['cont'=>'w-full mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),
  'apellido' => TextInput([
    'css'=>['cont'=>'w-full mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Apellido',
    'attrs'=>['name'=>'lastname'],
  ]),
  'work_position' => SelectInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Puesto',
    'attrs'=>['name'=>'work_position'],
    'options'=>$options['positions']
  ]),
  'work_area' => SelectInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Área',
    'attrs'=>['name'=>'work_area'],
    'options'=>$options['areas']
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Coreo',
    'attrs'=>['name'=>'email'],
  ]),
  'birthday' => DateInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Cumpleaños',
    'attrs'=>['name'=>'birthday'],
  ]),
  'vacations' => NumberInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Días de Vacaciones',
    'attrs'=>['name'=>'vacations','min'=>'6','max'=>'14','value'=>'6'],
  ]),
  'work_start' => DateInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Fecha de ingreso',
    'attrs'=>['name'=>'work_start'],
  ]),

];
?>


<div data-users="create" class="w-full h-full bg-white absolute z-10 top-0 hidden">
  <div class="header flex justify-end w-full h-12 bg-white shadow-lg pr-16  text-gray-500">
      <button type="button" name="send" class="mr-6 flex items-center text-green-600">
        <i class="fas fa-check mx-2"></i>
        Listo
      </button>
      <button type="button" name="cancel" class="flex items-center text-red-600">
        <i class="fas fa-times mx-2"></i>
        Cancelar
      </button>
  </div>
  <div class="body w-full h-full relative bg-white">
    <section class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
      <form name="userCreate" class="bg-white p-6">
        <div class="flex items-center w-full my-4">
          <?php echo $html['image']; ?>
          <div class="flex flex-col justify-center w-full ml-6">
            <div class="w-full mb-4">
              <?php echo $html['name']; ?>
            </div>
            <div class="w-full">
              <?php echo $html['apellido']; ?>
            </div>
          </div>
        </div>
        <div class="flex my-4">
          <?php echo $html['birthday']; ?>
          <?php echo $html['email']; ?>
        </div>
        <div class="flex my-4">
          <?php echo $html['work_area']; ?>
          <?php echo $html['work_position']; ?>
        </div>
        <div class="flex my-4">
          <?php echo $html['work_start']; ?>
          <?php echo $html['vacations']; ?>
        </div>

      </form>
    </section>
  </div>
</div>
