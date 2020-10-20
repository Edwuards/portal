<?php $person = $this->session->person; ?>

<div data-content="profile" data-id="<?php echo $person; ?>" class="absolute w-full h-full bg-white hidden">
  <div class="body w-full h-full relative bg-white">
    <section class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
      <?php echo $this->load->view('profile/forms/profile',[],true); ?>
    </section>
  </div>
</div>
