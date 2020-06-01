
function User({fullname,email,avatar,position}){

  return `
    <div class="flex flex-col items-center p-6 w-64 bg-white text-gray-700">
      <div class="w-16 h-16 mb-4 rounded-full overflow-hidden">
        <img name="avatar" class="avatar w-full h-full" src="${avatar}" alt="">
      </div>
      <div class="">
        <p name="position" class="text-xs text-center text-gray-700 font-bold mb-2">${position}</p>
        <p name="fullname" class="text-sm text-center mb-2">${fullname}</p>
        <p name="email" class="text-xs text-center text-gray-500 mb-2">${email}</p>
      </div>

      <div class="flex justify-between mt-4">
        <button type="button" name="view" class="font-bold text-xs flex items-center text-gray-600">
          <i class="fas fa-eye mx-2"></i>
          Ver Perfil
        </button>
      </div>
    </div>
    `;

}



export { User }
