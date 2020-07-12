import { Form, Helper } from '../form.js';
import { Services } from '../../services.js';

const Profile = new Form({
  title: '',
  name: 'userProfile',
  url: 'users/edit',
});


Profile.init = function(){
  Helper.pickerUnfocus(this.inputs);
  let positions = this.inputs.select.work_position;
  let areas = this.inputs.select.work_area;
  areas.events.on('change',function(){
    let found = false;
    positions.options.get().addClass('hidden').removeAttr('selected').each(function(){
      let el = $(this);
      if(!found && (el.attr('data-area') == areas.value)){ el.attr('selected','selected'); found = true;}
      el[el.attr('data-area') == areas.value ? 'removeClass' : 'addClass']('hidden');
    });
  });
  {
    let profile = this;
    profile.inputs.image.avatar.events.on('imgReady',function(){
      let src = this.src;
      let user = {'avatar':src};
      console.log(user);
      Services.update.user({
        where:[['users.id','=',profile.user.id]],
        user
      },function(response){

      });
      $('#menu .avatar img').attr('src',user.avatar);
    });
  }
}

Profile.open = function(user) {
  this.disable(true);
  this.inputs.image.avatar.disable(false);
  this.user = user;
  this.inputs.image.avatar.src = user.avatar;
  this.inputs.text.name.value = user.name;
  this.inputs.text.lastname.value = user.lastname;
  this.inputs.text.email.value = user.email;
  this.inputs.date.birthday.value = user.birthday;
  this.inputs.date.work_start.value = user.work_start;
  this.inputs.number.vacations.value = user.vacations;
  this.inputs.select.work_area.value = user.work_area;
  this.inputs.select.work_position.value = user.work_position;

}
//
// Profile.send = function(){
//   let data = {};
//   data.name = this.inputs.text.name.value;
//   data.lastname = this.inputs.text.lastname.value;
//   data.email = this.inputs.text.email.value;
//   data.work_position = this.inputs.select.work_position.value;
//   data.work_start = this.inputs.date.work_start.value;
//   data.birthday = this.inputs.date.birthday.value;
//   data.vacations = this.inputs.number.vacations.value;
//
//   let where = [['users.id','=',this.user.id]];
//
//   return { error: false, data: {user:data,where} }
//
// }


export { Profile }
