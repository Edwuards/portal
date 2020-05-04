<?php

$html = [
  'image'=> $this->load->view('forms/inputs/image',[
    'css'=>[
      'cont'=>'flex-col-reverse items-center',
      'img'=>'w-1/2 rounded-full overflow-hidden' ],
    'group'=>'',
    'name'=>'img',
    'label'=>'Avatar'
    ],true),
  'name' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-full mx-1','input'=>'w-full disabled'],
    'group'=>'',
    'name'=>'name',
    'label'=>'Nombre'
    ],true),
  'work_position' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'work_position',
    'label'=>'Puesto'
    ],true),
  'work_area' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'work_area',
    'label'=>'Área'
    ],true),
  'email' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'email',
    'label'=>'Correo'
    ],true),
  'birthday' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'birthday',
    'label'=>'Cumpleaños'
    ],true),
  'vacations' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'vacations',
    'label'=>'Vacaciones'
    ],true),
  'work_start' => $this->load->view('forms/inputs/text',[
    'css'=>['cont'=>'w-1/2 mx-1','input'=>'w-full'],
    'group'=>'',
    'name'=>'work_start',
    'label'=>'Fecha de ingreso'
    ],true),
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
