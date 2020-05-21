<?php
  $HTML = '';
  $Forms = [
    'users' => [
      'path'=>'forms/users/',
      'load'=> ['create','edit','profile','delete']
    ],

    'login' => [
      'path'=>'forms/users/',
      'load'=>['login']
    ],

    'permisions' => [
      'path'=>'forms/permisions/',
      'load'=>['permision','vacation','sick','homeOffice']
    ]
  ];

  foreach ($load as $forms) {
    $forms = $Forms[$forms];
    foreach($forms['load'] as $form) {
      $path = $forms['path'].$form;
      $HTML .= $this->load->view($path,[],true);
    }
  }

  echo $HTML;

?>
