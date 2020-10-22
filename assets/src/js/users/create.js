import { Form } from '../form/form';

export default function(){
  const form = new Form({
    name: 'createUser',
    url: 'users/create'
  });
  const inputs = form.inputs.type;

  form.container = $('[data-users="create"]');

  form.on = function(){
    form.container.removeClass('hidden');
  }

  form.off = function(){ form.container.addClass('hidden'); }

  form.send = function(){

    let error = false;
    let data = { userTypes: [] };

    ['text','date','image','select'].forEach((type)=>{
      type = inputs[type];
      for(let input in type){ data[input] = type[input].value; };
    });

    for(let input in inputs.checkbox){
      input = inputs.checkbox[input];
      if(input.checked){ data.userTypes.push(input.value); }
    }


    console.log(data);

    return {error,data}

  }

  return form
}
