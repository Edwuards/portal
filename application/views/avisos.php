<div id="avisos" class="w-full h-full absolute top-0 z-50 bg-gray-300 ">
  <div class="header w-full h-12 bg-white shadow-lg pl-16  text-gray-500">
    <button type="button" name="pending" class="p-1 border-b-2 border-red-600 ml-2 mr-4 hover:text-gray-700 text-gray-700">Pendiente</button>
    <button type="button" name="approved" class="p-1 mr-4 hover:text-gray-700">Aprobados</button>
    <button type="button" name="declined" class="p-1 mr-4 hover:text-gray-700">Rechazados</button>
  </div>
  <div class="body w-full flex relative overflow-y-scroll p-6">

    <div class="card absolute shadow-xl bg-white text-gray-700 p-2 rounded m-4">
      <div class="flex items-center">
        <div class="w-12 h-12 mx-2 flex item-center rounded-full overflow-hidden">
          <img src="<?php echo base_url('assets/public/img/placeholder.jpeg'); ?>" class="w-full">
        </div>
        <div class="mx-2">

          <div class="flex justify-between text-sm my-1">
            <p class="w-40">Carlos Antonio Salazar</p>
            <p class="flex items-center">
              <span class="mx-2 w-2 h-2 bg-teal-600 relative rounded-full"></span>
              Vacación
            </p>
          </div>

          <div class="flex items-center text-sm my-2">
            <i class="fas fa-calendar-alt"></i>
            <div class="flex items-center ml-1">
              <p class="text-xs mx-1">18 may 2020 10:00pm</p>
              <p class="mx-1">-</p>
              <p class="text-xs mx-1">18 may 2020 10:00pm</p>
            </div>
          </div>

        </div>
      </div>
      <div class="w-full flex mt-2 justify-between items-center">
        <button type="button" name="view" class="ml-2 flex items-center text-xs text-gray-500">
          <i class="fas fa-eye mr-2"></i>
          <p>Ver más</p>
        </button>
        <div class="flex justify-end">
          <button type="button" class="flex items-center text-xs  text-green-600 px-2 py-1 rounded mx-1" name="approve">
              <i class="fas fa-check"></i>
              <p class="ml-2 text-xs">Aprobar</p>
          </button>
          <button type="button" class="flex items-center text-xs text-red-600 px-2 py-1 rounded mx-1" name="approve">
              <i class="fas fa-times"></i>
              <p class="ml-2 text-xs">Rechazar</p>
          </button>
      </div>
      </div>
    </div>

  </div>
</div>
