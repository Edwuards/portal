<?php
  $forms = '';

  foreach (['homeOffice','permission','sick','vacation'] as $form) {
    $form = 'calendar/forms/'.$form;
    $forms .= $this->load->view($form,[],true);
  }

?>
<div id="modal-cont" class="modal-cont flex w-screen h-full justify-center items-center absolute top-0 z-50">
  <div id="modal" class="modal bg-white overflow-hidden rounded">
    <div class="header flex justify-center items-center text-gray-700 p-4">
      <div class="title w-full flex items-center border-b-2 border-gray-400 pb-2 mt-2 mr-4">
      </div>
      <button data-type="button" class="flex w-8 h-8 justify-center items-center" name="close">
       <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="body p-4">
      <?php echo $forms; ?>
    </div>
  </div>
</div>
