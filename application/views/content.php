<?php $this->load->view('nav/navbar'); ?>
<section id="content" class="flex flex-no-wrap overflow-hidden">
  <?php $this->load->view('nav/menu'); ?>
  <div class="body w-screen relative">
    <div id="calendar" class="w-full"></div>
    <div id="dataTable" class="w-screen h-full bg-gray-300 absolute top-0 z-30"></div>
  </div>
</section>
<?php $this->load->view('action_button'); ?>
<?php $this->load->view('modal'); ?>
