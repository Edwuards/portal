<?php
  $html = '';
  foreach ($bars as $bar => $data) {
    $html .= $this->load->view('nav/bars/'.$bar,$data,true);
  }
?>

<nav class="flex h-16 items-center px-2 bg-white text-gray-700 z-10 relative">
  <button data-menu="toggle" class="w-10 h-10" type="button" name="menu" class="">
    <i class="text-md fas fa-bars"></i>
  </button>
  <?php echo $html ?>
  <button data-type="button" class="w-10 h-10 mx-2 sm:mx-4" type="button" name="notifications" class="mx-2">
    <i class="text-md fas fa-bell"></i>
  </button>
</nav>
