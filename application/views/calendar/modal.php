<?php
  $forms = '';

  foreach (['homeOffice','permission','sick','vacation'] as $form) {
    $form = 'calendar/forms/'.$form;
    $forms .= $this->load->view($form,[],true);
  }

?>
<div data-modal="permissions" class="modal-cont flex w-screen h-full justify-center items-center fixed top-0 sm:absolute">
  <div class="modal bg-white overflow-hidden rounded w-screen h-full sm:w-5/12 sm:h-auto">
    <div class="header flex justify-center items-center text-gray-700 m-4 border-b-2 border-gray-400 ">
      <div class="w-full flex items-center pb-2 mr-4">
        <span class="type w-2 h-2 abosolute mx-2 rounded-full "></span>
        <p class="title text-lg sm:text-md"></p>
      </div>
      <button data-type="button" class="flex w-8 h-8 justify-center items-center pb-2" name="close">
       <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="body p-4">
      <?php echo $forms; ?>
    </div>
  </div>
</div>
