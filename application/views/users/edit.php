
<div data-users="edit" class="w-full h-full bg-white absolute z-10 top-0 hidden">
  <div class="header flex justify-end w-full h-12 bg-white shadow-lg pr-16  text-gray-500">
      <button type="button" name="edit" class="mr-6 flex items-center text-blue-600">
        <i class="fas fa-pencil-alt mx-2"></i>
        Editar
      </button>
      <button type="button" name="send" class="mr-6 flex items-center text-green-600 hidden">
        <i class="fas fa-check mx-2"></i>
        Listo
      </button>
      <button type="button" name="cancel" class="flex items-center text-red-600">
        <i class="fas fa-times mx-2"></i>
        Cancelar
      </button>
  </div>
  <div class="body w-full h-full relative bg-white">
    <section class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
      <form name="userEdit" class="bg-white p-6">
        <div class="flex items-center w-full my-4">
          <?php echo $html['image']; ?>
          <div class="flex flex-col justify-center w-full ml-6">
            <div class="w-full mb-4">
              <?php echo $html['name']; ?>
            </div>
            <div class="w-full">
              <?php echo $html['apellido']; ?>
            </div>
          </div>
        </div>
        <div class="flex my-4">
          <?php echo $html['birthday']; ?>
          <?php echo $html['email']; ?>
        </div>
        <div class="flex my-4">
          <?php echo $html['work_area']; ?>
          <?php echo $html['work_position']; ?>
        </div>
        <div class="flex my-4">
          <?php echo $html['work_start']; ?>
          <?php echo $html['vacations']; ?>
        </div>
      </form>
    </section>
  </div>
</div>
