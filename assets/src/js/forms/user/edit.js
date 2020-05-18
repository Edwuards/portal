import { HTML } from '../templates.js';
import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Edit = undefined;
  Services.get.form('users/edit',function(html){
    Edit = new Form({
      title: 'Editar usuario',
      name: 'editUser',
      html: 'users/edit',
      url: 'users/edit',
    });

    let edit = undefined, cancel = undefined, send = undefined;
    Edit.open = function(user){
      edit = this.buttons.edit.events.on('click',function(){
        Edit.disable(false);
        Edit.buttons.cancel.element.removeClass('hidden');
        Edit.buttons.send.element.removeClass('hidden');
        Edit.buttons.edit.element.addClass('hidden');
      });

      cancel =this.buttons.cancel.events.on('click',Edit.close);

      send = this.buttons.send.events.on('click',Edit.send);

      this.user = user.id;
      this.disable(true);
      this.buttons.send.element.addClass('hidden');
      this.buttons.cancel.element.addClass('hidden');
      this.buttons.edit.element.removeClass('hidden');

      Helper.notEmptyText(this.inputs.text);
      Helper.notEmptyNumber(this.inputs.number);

      this.inputs.text.name.value = user.name;
      this.inputs.text.lastname.value = user.lastname;
      this.inputs.text.email.value = user.email;
      this.inputs.number.vacations.value = user.vacations;
      this.inputs.date.birthday.value = Number(user.birthday);
      this.inputs.date.work_start.value = Number(user.work_start);
    };

    Edit.send = function(){
      return {
        error: false,
        data: {
          user: Helper.collectValues(this.inputs),
          where:[['id','=',this.user]]
        }
      }
    };

    Edit.close = function(){
      this.buttons.edit.events.unregister('click',edit);
      this.buttons.send.events.unregister('click',send);
      this.buttons.cancel.events.unregister('click',cancel);

    }

  });

  return Edit
}
