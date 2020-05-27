<?php $this->load->view('nav/navbar'); ?>
<section id="content" class="flex flex-no-wrap overflow-hidden z-10">
  <?php $this->load->view('nav/menu'); ?>
  <div class="body w-screen relative">
    <div id="calendar" class="w-full active"></div>
    <?php $this->load->view('permisions'); ?>
    <?php $this->load->view('avisos',['name'=>'users']); ?>
    <?php $this->load->view('avisos',['name'=>'mine']); ?>
    <?php $this->load->view('forms/users/profile',['work'=>$work]); ?>
    <?php $this->load->view('users/list',['work'=>$work]); ?>
  </div>
</section>
<section name="forms" class="hidden">
  <?php $this->load->view('forms/index',['load'=>['permisions']]); ?>
</section>
<?php $this->load->view('modal'); ?>
