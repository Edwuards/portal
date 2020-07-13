<?php
  $forms = '';

  foreach (['homeOffice','permission','sick','vacation'] as $form) {
    $form = 'calendar/forms/'.$form;
    $forms .= $this->load->view($form,[],true);
  }

?>

<div data-content="calendar" class="w-full">
  <div id="calendar" class="w-full active"></div>
  <?php echo $this->load->view('calendar/permissions',[],true);   ?>
  <div class="hidden"> <?php echo $forms; ?> </div>
</div>
