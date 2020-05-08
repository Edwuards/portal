<?php

$html = [
  'date_start' => DateInput(['group'=>'date_start']),
  'date_finish' => DateInput(['group'=>'date_finish']),
  'image'=> ImageInput([
    'css'=>['cont'=>'','img'=>'w-2/3' ],
    'label'=>'Receta Medica',
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
  ])
];


?>

<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de salida</p>
  <?php echo $html['date_start']; ?>
</div>
<div class="w-full mb-2">
  <p class="text-blue-700 mx-2 my-4 text-md font-bold">Fecha de regreso</p>
  <?php echo $html['date_finish']; ?>
</div>

<?php echo $html['image']; ?>
