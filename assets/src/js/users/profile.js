import { Form } from '../form/form';

export default function(){
  let user = undefined;
  const form = new Form({
    name: 'usersProfile',
    url: 'users/edit'
  });
  const loadUser = (()=>{
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

  form.container = $('[data-users="profile"]');

  form.on = function(){ form.container.removeClass('hidden'); }

  form.off = function(){ form.container.addClass('hidden'); }

  form.read = function(data){
    user = data;
    form.disable(true);
    loadUser(user);
  }

  form.edit = function(){ form.disable(false); }

  form.cancel = function(){
    form.disable(true);
    loadUser(user);
  }

  return form
}
