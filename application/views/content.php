<?php $this->load->view('nav/navbar'); ?>
<section id="content" class="flex flex-no-wrap overflow-hidden z-10">
  <?php $this->load->view('nav/menu'); ?>
  <div class="body w-screen relative">
    <div id="calendar" class="w-full"></div>
    <?php $this->load->view('permisions'); ?>
  </div>
</section>
<?php $this->load->view('modal'); ?>
