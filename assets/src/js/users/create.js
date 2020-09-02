import { Form } from '../form/form';

export default function(){
  const form = new Form({
    name: 'createUser',
    url: 'users/create'
  });

  form.container = $('[data-users="create"]');

  form.on = function(){ form.container.removeClass('hidden'); }

  form.off = function(){ form.container.addClass('hidden'); }


  return form
}
