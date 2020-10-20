<div data-content="profile" data-id="<?php echo $this->session->person; ?>" class="absolute w-full h-full bg-gray-300 overflow-y-scroll hidden">
  <div  class="relative bg-gray-300 flex flex-wrap items-start justify-center mt-10">
    <?php echo $this->load->view('profile/forms/profile',[],true); ?>
  </div>
</div>
