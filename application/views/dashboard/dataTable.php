<div id="dataTable" class="w-screen h-full absolute bg-white top-0 left-0 z-10">
  <div class="header flex w-full h-16 justify-start items-center shadow-md">
    <button class="flex w-16 h-16 justify-center items-center" name="close">
     <i class="text-xl fas fa-times"></i>
   </button>
    <div class="title w-auto ml-2">
      <p class="text-xl font-bold"> Usuarios </p>
    </div>
  </div>
  <div class="body overflow-scroll relative">
    <?php $this->load->view('tables/my_avisos'); ?>

  </div>
  <div class="footer flex w-full h-16 px-4 justify-start items-center ">
    <button class="py-2 px-4 mx-2 text-sm bg-blue-900 text-white hidden" type="button" name="edit">Editar</button>
    <button class="py-2 px-4 mx-2 text-sm bg-blue-900 text-white hidden" type="button" name="edit">Borrar</button>
    <button class="py-2 px-4 mx-2 text-sm bg-blue-900 text-white" type="button" name="accept">Agregar</button>
  </div>
</div>
