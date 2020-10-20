import { Form } from '../form/form';

export default function(){
  const form = new Form({
    name: 'userProfile',
    url: 'users/edit'
  });
  const load = (()=>{
    const inputs = {};
    let elements = form.inputs;
    [
      elements.type.image,
      elements.type.text,
      elements.type.date,
      elements.type.select
    ].forEach((type)=>{
      for(let input in type){
        input = type[input];
        inputs[input.name] = input;
      }
    });

    return (user)=>{
      for(let prop in user){
        if(inputs[prop]){ inputs[prop].value = user[prop]; }
      }
    }
  })();


  form.read = function(){
    form.disable(true);
  }

  form.edit = function(){
    form.inputs.type.image.avatar.disable(false);
  }

  form.load = function(userID){
    $.ajax({
      method: 'POST',
      url: `${window.location.origin}/users/get`,
      data: { where : [['persons.id','=',userID]] },
      success: (response)=>{
        let { error , data} = response;
        if(!error){
          data = data[0];
          ['started','DOB'].forEach((prop) => {
            data[prop] = new Date(data[prop] * 1000);
          });
        }

        load(data);

      }
    });

  }

  return form
}
