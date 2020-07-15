<?php

$html = [
  'date_start' => DateInput(['attrs'=>['name'=>'start']]),
  'date_finish' => DateInput(['attrs'=>['name'=>'finish']]),
  'description' => TextAreaInput([
    'attrs'=>[
      'name'=>'description',
      'placeholder'=>'Agregar Descripción',
    ]
  ]),
  'image'=> ImageInput([
    'css'=>['cont'=>'w-full','img'=>'w-1/3' ],
    'attrs'=>[
      'input'=>[
        'data-group'=>'medicalProof',
        'name'=>'file'
      ],
      'button'=>[
        'data-group'=>'medicalProof',
        'name'=>'upload',
      ],
      'img'=>[
        'data-group'=>'medicalProof',
        'name'=>'preview',
        'src'=>"https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png"
      ]
    ]
  ]),
  'send'=> Button([
    'text'=>'solicitar',
    'attrs'=>['name'=>'send'],
    'css'=>'py-2 px-4 mx-2 text-sm bg-red-600 text-white rounded'
  ])
];

?>

<form name="sick" class="hidden" >
  <div class="body">

    <div class="flex items-center mb-6">
      <div class="w-8 h-8 flex items-center justify-center text-gray-700 mr-2">
        <i class="far fa-clock"></i>
      </div>
      <div class="flex w-full items-center">
        <?php echo $html['date_start']; ?>
        <div class="h-px w-2 mx-2 bg-gray-700">
        </div>
        <?php echo $html['date_finish']; ?>
      </div>
    </div>
    <div class="flex items-start mb-6">
      <div class="w-8 h-8 flex items-start justify-center text-gray-700 mr-2 mt-1">
        <i class="fas fa-align-left"></i>
      </div>
      <?php echo $html['description']; ?>
    </div>
    <div class="flex items-start mb-6">
      <div class="w-8 h-8 flex items-start justify-center text-gray-700 mr-2 mt-1">
        <i class="fas fa-paperclip"></i>
      </div>
      <?php echo $html['image']; ?>
    </div>


  </div>
  <?php echo FormFooter([$html['send']]); ?>
</form>
