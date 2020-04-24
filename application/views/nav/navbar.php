<nav class="flex justify-center items-center px-2">
  <div class="icon flex justify-center items-center">
    <button type="button" name="menu" class="">
      <i class="fas fa-bars"></i>
    </button>
  </div>

  <div data="calendar" class="flex justify-center items-center">

    <button type="button" name="prev" class="mx-2">
      <i class="fas fa-chevron-left"></i>
    </button>
    <p data="date" class="mx-2 text-sm"></p>
    <button type="button" name="next" class="mx-2">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>

  <div class="flex justify-center items-center">
    <button type="button" name="today" class="mx-2">
      <i class="fas fa-calendar-day"></i>
    </button>
  </div>

  <div class="flex justify-center items-center">
    <button type="button" name="notifications" class="mx-2">
      <i class="fas fa-bell"></i>
    </button>
  </div>

</nav>

<?php $this->load->view('nav/lateral'); ?>
