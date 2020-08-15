<?php $this->load->view('nav/employee'); ?>
<section id="content" class="flex flex-no-wrap overflow-hidden z-10">
  <?php $this->load->view('menu/employee'); ?>
  <div class="body w-screen relative">
    <?php
      $this->load->view('calendar/calendar');
      $this->load->view('user/profile');
      $this->load->view('solicitudes/solicitudes');
    ?>
  </div>
</section>

</div>
