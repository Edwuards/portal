<div class="modal-cont flex w-screen h-full justify-center items-center absolute top-0 z-50">
  <div class="modal bg-white overflow-hidden rounded">
    <div class="header flex justify-center items-center text-gray-700 p-4">
      <p class="title text-xl w-full">Vacation</p>
      <button class="flex w-8 h-8 justify-center items-center" name="close">
       <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="body p-4">
      <?php echo $this->load->view('forms/permisions/vacation',[],true); ?>
    </div>
  </div>
</div>
