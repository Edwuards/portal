const Forms = {};

function Form(form){
  this.inputs = {};
  this.form = $(document.createElement('form'));
  this.form.attr('data',form.name).addClass('w-ful');
  this.form.html(form.html);

  this.form.find('input').each(function(i,input){
    input = $(input);
    if(input.attr('data') == 'datepicker' ){ input.datetimepicker(); }
    this.inputs[input.attr('name')] = input;
  }.bind(this));

  this.form.find('button').each(function(i,button){
    button = $(button);
    this.inputs[button.attr('name')] = button;
  }.bind(this));

}

Forms.permision = {
  name:'permision',
  html: ()=>{
    return `
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Inicio de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_start" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Fin de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_finish" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Motivo : </label>
      <textarea class="bg-gray-300 h-24 px-4 py-2" name="comments" value="">
      </textarea>
    </div>
    `;
  }
}

Forms.homeOffice = {
  name:'homeOffice',
  html: ()=>{
    return `
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Inicio de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_start" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Fin de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_finish" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Objetivos : </label>
      <textarea class="bg-gray-300 h-24 px-4 py-2" name="comments" value="">
      </textarea>
    </div>
    `;
  }
}

Forms.vacation = {
  name:'vacation',
  html: ()=>{
    return `
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Inicio de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_start" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Fin de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_finish" value="">
    </div>
    `;
  }
}

Forms.sick = {
  name:'sick',
  html: ()=>{
    return `
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Inicio de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_start" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Fin de fecha : </label>
      <input data="datepicker" class="bg-gray-300 h-10 px-4 py-2" type="text" name="date_finish" value="">
    </div>
    <div class="flex flex-col mb-4">
      <label class="mb-2"for="start">Receta Medica : </label>
      <input class="hidden" type="file" name="img" value="">
      <div class="w-1/2 m-auto">
        <button type="button" name="upload">
          <img class="w-full" src="https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png" alt="">
        </button>
      </div>
    </div>
    `;
  }
}

for (let name in Forms) { Forms[name] = new Form(Forms[name]); }

export { Forms };
