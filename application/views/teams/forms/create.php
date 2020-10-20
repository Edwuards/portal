<?php
$options = WorkAreasOptions();

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
  'team name' => TextInput([
    'css'=>['cont'=>'w-full mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Nombre',
    'attrs'=>['name'=>'name'],
  ]),

  'work area' => SelectInput([
    'css'=>['cont'=>'w-1/2 mx-1 mb-2','input'=>'pb-2 pl-1'],
    'label'=>'Área',
    'attrs'=>['name'=>'work_area'],
    'options'=>$options['areas']
  ]),
];
?>


<form name="createTeam" class="bg-white p-6 w-1/2">
  <h1 class="text-xl text-gray-700">Equipo</h1>
  <div class="w-full">
    <div class="flex items-center w-full my-4">
      <?php echo $html['image']; ?>
      <div class="flex flex-col justify-center w-full ml-6">
        <div class="w-full mb-4">
          <?php echo $html['team name']; ?>
        </div>
        <div class="w-full">
          <?php echo $html['work area']; ?>
        </div>
      </div>
    </div>
  </div>
  <div class="body px-4">
    <div class="w-full my-2">
      <p class="text-md text-gray-700">Líder de área</p>
      <div data="leader" class="flex felx-col mb-2 border-2 border-dashed border-gray-600">

      </div>

    </div>

    <div class="w-full my-2 scroll">
      <p class="text-md text-gray-700">Integrantes <span data="counter">0</span> </p>
      <div data="members" class="flex flex-col mb-2 border-2 border-dashed border-gray-600">

      </div>

    </div>
  </div>

</form>
