import { HTML } from '../templates.js';
import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

export default function(){
  let Delete = undefined;
  Services.get.form('users/delete',function(html){
    Delete = new Form({
      title: 'Eliminar Usuario',
      name: 'deleteUser',
      html: 'users/delete',
      url: 'users/delete'
    });

    let send = undefined, cancel = undefined;
    Delete.open = function(user){
      send = this.buttons.send.events.on('click',Delete.send);
      cancel = this.buttons.cancel.events.on('click',Delete.close);
      this.user = user;
      this.element.find('[data="message"]').text(`
        Estás seguro de elimiar el usuario : ${user.name}
        con el id: ${user.id}
        `);
    }

    Delete.send = function(){
      this.close();
      return { error: false, data:{id:this.user.id} }
    }

    Delete.close = function(){
      this.buttons.send.events.unregister('click',send);
      this.buttons.cancel.events.unregister('click',close);
    }



  });

  return Delete
}
