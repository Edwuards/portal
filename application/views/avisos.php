<div data-avisos="<?php echo $name; ?>" class="w-full h-full absolute top-0 bg-gray-300 ">
  <div class="header w-full h-12 bg-white shadow-lg pl-16  text-gray-500">
    <button data="2" type="button" name="pending" class="p-1 border-b-2 border-red-600 ml-2 mr-4 hover:text-gray-700 text-gray-700">Pendiente</button>
    <button data="1" type="button" name="approved" class="p-1 mr-4 hover:text-gray-700">Aprobados</button>
    <button data="0" type="button" name="declined" class="p-1 mr-4 hover:text-gray-700">Rechazados</button>
  </div>
  <div class="body w-full">

    <section name="pending" class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6">
    </section>

    <section name="approved" class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6 hidden">
    </section>

    <section name="declined" class="flex flex-wrap justify-center w-full h-full relative overflow-y-scroll p-6 hidden">
    </section>

  </div>
</div>
