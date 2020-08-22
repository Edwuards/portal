<?php
  $nav = $this->load->view('nav/'.$nav,[],true);
  $menu = $this->load->view('menu/'.$menu,[],true);

  $body = '';

  foreach ($content as $view => $data) {
    $body .= $this->load->view($view.'/content',$data,true);
  }

?>


<?php echo $nav; ?>
<section id="content" class="flex flex-no-wrap overflow-hidden z-10">
  <?php echo $menu; ?>
  <div class="body w-screen relative">
    <?php echo $body; ?>
  </div>
</section>
