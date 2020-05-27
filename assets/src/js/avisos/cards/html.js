import flatpickr from 'flatpickr';

function Aviso({id,type,title,user,start,end}){

  type = (type  == 1 ? 'bg-green-600' : (type == 2 ? 'bg-teal-600' : (type == 3 ? 'bg-blue-600' : 'bg-indigo-600') ));
  start = flatpickr.formatDate(start, 'j M Y h:i K');
  end = flatpickr.formatDate(end, 'j M Y h:i K');

  return `
  <div class="message absolute w-full h-full font-bold sm:text-xl"></div>
  <div class="z-10 relative shadow-xl bg-white text-gray-700 p-2 rounded m-4">
    <div class="flex items-center">
      <div class="w-12 h-12 mx-2 flex item-center rounded-full overflow-hidden">
        <img src="${window.location.origin}/assets/public/img/placeholder.jpeg" class="w-full">
      </div>
      <div class="mx-2">

        <div class="flex justify-between text-sm my-1">
          <p class="w-40">${user}</p>
          <div class="flex items-center justify-end w-32">
            <div class="mx-2 w-2 h-2 ${type} rounded-full"></div>
            <p>${title}</p>
          </div>
        </div>

        <div class="flex items-center text-sm my-2">
          <i class="fas fa-calendar-alt"></i>
          <div class="flex items-center ml-1">
            <p class="text-xs mx-1 w-32">${start}</p>
            <p class="mx-1">-</p>
            <p class="text-xs mx-1 w-32">${end}</p>
          </div>
        </div>

      </div>
    </div>
    <div class="w-full flex mt-2 justify-between items-center">
      <p class="ml-2 flex items-center text-xs text-gray-500">
        #${id}
      </p>
      <div class="flex justify-end">
        <button type="button" class="flex items-center text-xs  text-green-600 px-2 py-1 rounded mx-1" name="approve">
            <i class="fas fa-check"></i>
            <p class="ml-2 text-xs">Aprobar</p>
        </button>
        <button type="button" class="flex items-center text-xs text-red-600 px-2 py-1 rounded mx-1" name="decline">
            <i class="fas fa-times"></i>
            <p class="ml-2 text-xs">Rechazar</p>
        </button>
      </div>
    </div>
  </div>`;

}


function AvisoReadOnly({type,title,user,start,end}){

  type = (type  == 1 ? 'bg-green-600' : (type == 2 ? 'bg-teal-600' : (type == 3 ? 'bg-blue-600' : 'bg-indigo-600') ));
  start = flatpickr.formatDate(start, 'j M Y h:i K');
  end = flatpickr.formatDate(end, 'j M Y h:i K');

  return `
  <div class="message absolute w-full h-full font-bold sm:text-xl"></div>
  <div class="z-10 relative shadow-xl bg-white text-gray-700 p-2 rounded m-4">
    <div class="flex items-center">
      <div class="mx-2">

        <div class="flex items-center text-sm my-1">
            <div class="mr-2 w-2 h-2 ${type} rounded-full"></div>
            <p>${title}</p>
        </div>

        <div class="flex items-center text-sm my-2">
          <i class="fas fa-calendar-alt"></i>
          <div class="flex items-center justify-between ml-1">
            <p class="text-xs mx-1 w-32">${start}</p>
            <p class="mx-1">-</p>
            <p class="text-xs mx-1 w-32">${end}</p>
          </div>
        </div>

      </div>
    </div>
    <div class="w-full flex mt-2 justify-between items-center">
      <button type="button" name="view" class="ml-2 flex items-center text-xs text-gray-500">
        <i class="fas fa-eye mr-2"></i>
        <p>Ver más</p>
      </button>
      <div class="flex justify-end hidden">
        <button type="button" class="flex items-center text-xs text-red-600 px-2 py-1 rounded mx-1" name="cancel">
            <i class="fas fa-trash"></i>
            <p class="ml-2 text-xs">Cancelar</p>
        </button>
      </div>
    </div>
  </div>`;

}



export { Aviso, AvisoReadOnly }
