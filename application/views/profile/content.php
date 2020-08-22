<?php
$options = [
  'areas'=>'',
  'positions'=>''
];
//
// foreach ($work['positions'] as $position) {
//   $options['positions'] .= '<option data-area="'.$position['area'].'" value="'.$position['id'].'">'.$position['title'].'</option>';
// }
// foreach ($work['areas'] as $area) {
//   $options['areas'] .= '<option  value="'.$area['id'].'">'.$area['title'].'</option>';
// }
//

$html = [
  'image'=> ImageInput([
    'css'=>['cont'=>'items-center','img'=>'w-40 h-40 rounded-full overflow-hidden' ],
    'label'=>'Avatar',
    'attrs'=>[
      'input'=>[
        'data-group'=>'avatar',
      ],
      'button'=>[
        'data-group'=>'avatar',
      ],
      'img'=>[
        'data-group'=>'avatar',
        'src'=>"https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png"
      ]
    ]
  ]),
  'name' => TextInput([
    'css'=>['cont'=>'mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),
  'apellido' => TextInput([
    'css'=>['cont'=>'mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Apellido',
    'attrs'=>['name'=>'lastname'],
  ]),
  'work_position' => SelectInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Puesto',
    'attrs'=>['name'=>'work_position'],
    'options'=>$options['positions']
  ]),
  'work_area' => SelectInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Área',
    'attrs'=>['name'=>'work_area'],
    'options'=>$options['areas']
  ]),
  'email' => TextInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Coreo',
    'attrs'=>['name'=>'email'],
  ]),
  'birthday' => DateInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Cumpleaños',
    'attrs'=>['name'=>'birthday'],
  ]),
  'vacations' => NumberInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Días de Vacaciones',
    'attrs'=>['name'=>'vacations','min'=>'7','max'=>'14'],
  ]),
  'work_start' => DateInput([
    'css'=>['cont'=>'sm:w-1/2 mx-4 my-2','input'=>'pb-2 pl-1'],
    'label'=>'Fecha de ingreso',
    'attrs'=>['name'=>'work_start'],
  ]),

];


?>

<div data-content="profile" class="absolute w-full h-full bg-white hidden">

  <div class="body w-full h-full relative bg-white">
    <section class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
      <form name="userProfile" class="bg-white">
        <div class="flex flex-col sm:flex-row items-center w-full my-4">
          <?php echo $html['image']; ?>
          <div class="flex flex-col justify-center w-full sm:ml-6">
            <div class="mb-2">
              <?php echo $html['name']; ?>
            </div>
            <div class="mb-2">
              <?php echo $html['apellido']; ?>
            </div>
          </div>
        </div>
        <div class="flex flex-col my-4 sm:flex-row">
          <?php echo $html['birthday']; ?>
          <?php echo $html['email']; ?>
        </div>
        <div class="flex flex-col my-4 sm:flex-row">
          <?php echo $html['work_area']; ?>
          <?php echo $html['work_position']; ?>
        </div>
        <div class="flex flex-col my-4 sm:flex-row">
          <?php echo $html['work_start']; ?>
          <?php echo $html['vacations']; ?>
        </div>
      </form>
    </section>
  </div>
</div>
