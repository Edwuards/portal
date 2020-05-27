<nav class="flex h-16 items-center px-2 bg-white text-gray-700 z-10 relative">
  <button class="w-10 h-10" type="button" name="menu" class="">
    <i class="text-md fas fa-bars"></i>
  </button>
  <?php $this->load->view('nav/calendar'); ?>
  <?php $this->load->view('nav/profile'); ?>
  <?php $this->load->view('nav/users'); ?>
  <?php $this->load->view('nav/myAvisos'); ?>
  <?php $this->load->view('nav/userAvisos'); ?>

</nav>
