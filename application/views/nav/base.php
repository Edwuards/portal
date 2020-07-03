<?php
  $html = '';
  foreach ($bars as $bar => $data) {
    $html .= $this->load->view('nav/bars/'.$bar,$data,true);
  }
?>

<nav class="flex h-16 items-center px-2 bg-white text-gray-700 z-10 relative">
  <button class="w-10 h-10" type="button" name="menu" class="">
    <i class="text-md fas fa-bars"></i>
  </button>
  <?php echo $html ?>
</nav>
