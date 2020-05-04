<?php $this->load->view('nav/navbar'); ?>
<section id="content" class="flex flex-no-wrap overflow-hidden">
  <?php $this->load->view('nav/menu'); ?>
  <div class="body w-screen relative">
    <div id="calendar" class="w-full"></div>
    <?php $this->load->view('dashboard/dataTable'); ?>
  </div>
</section>
<?php $this->load->view('dashboard/action_button'); ?>
<?php $this->load->view('dashboard/modal'); ?>
