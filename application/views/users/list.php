
<div data-users="list" class="w-full h-full absolute top-0 z-0 bg-gray-300 ">
  <div class="header flex items-center w-full h-12 bg-white shadow-lg pl-16  text-gray-500">
    <button  type="button" name="create" class="flex items-center p-1 mr-4 text-green-600"> <i class="fas fa-user-plus mr-2"></i> Agregar</button>
    <button  type="button" name="delete" class="flex items-center p-1 mr-4 text-red-600" ><i class="fas fa-user-times mr-2"></i> Eliminar</button>
    <button type="button" name="cancel" class="flex items-center p-1 mr-4 text-gray-600 hidden">
      <i class="fas fa-ban mx-2"></i>
      Cancelar
    </button>
    <button type="button" name="confirm" class="flex items-center p-1 mr-4 text-red-600 hidden">
      <i class="fas fa-trash mx-2"></i>
      Confirmar
    </button>
  </div>
  <div class="body w-full flex">
    <section name="list" class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
    </section>
  </div>

  <?php $this->load->view('forms/users/create'); ?>
  <?php $this->load->view('forms/users/edit'); ?>

</div>
