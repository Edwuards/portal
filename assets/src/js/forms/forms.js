import { HTML } from './templates.js';
import { Form } from './form.js';
import { Rules } from './rules.js';

const Forms = {};

Forms.permision = {
  name:'permision',
  title: 'Permiso',
  html: HTML.permision,
  buttons: ['accept'],
  init: function(){
    this.group.date = this.createDateInput(this.group.date);
    this.group.hour_start = this.createTimeInput(this.group.hour_start);
    this.group.hour_finish = this.createTimeInput(this.group.hour_finish);
  },
  open: function(){
    this.buttons.send.removeClass('hidden');
  },
  send: function(){
    let a = Rules.timeEmpty(this.group.hour_start);
    if(a){ console.log(this.group.hour_start.time())}
  }
}

Forms.homeOffice = {
  name:'homeOffice',
  title:'Home Office',
  html: HTML.homeOffice,
  buttons: ['accept'],
  init: function(){
    this.group.date = this.createDateInput(this.group.date);
    this.group.hour_start = this.createTimeInput(this.group.hour_start);
    this.group.hour_finish = this.createTimeInput(this.group.hour_finish);
  },
}

Forms.vacation = {
  name:'vacation',
  title: 'Vacación',
  html: HTML.vacation,
  buttons: ['accept'],
  init: function(){
    this.group.date_start = this.createDateInput(this.group.date_start);
    this.group.date_finish = this.createDateInput(this.group.date_finish);
  },
}

Forms.sick = {
  name:'sick',
  title:'Enfermedad',
  html: HTML.sick,
  buttons: ['accept'],
  init: function(){
    this.group.date_start = this.createDateInput(this.group.date_start);
    this.group.date_finish = this.createDateInput(this.group.date_finish);
    this.previewImg(this.input.img,this.button.upload,this.button.upload.children('img'));
  },
  close: function(){
    // remplazar el src por una ruta relativa de un img placeholder
    let img = this.button.upload.children('img');
    img.attr('src','https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png');
  }
}

Forms.profile = {
  name:'profile',
  title:'Mi Perfil',
  html: HTML.profile,
  buttons: ['edit'],
  init: function(){
    let input = this.input;
    let img = this.button.upload.children('img');
    this.button.upload.on('click',()=>{
      input.img[0].value = '';
      input.img.trigger('click');
    });
    this.input.img.on('input',function(){ previewImg(input.img,img); });
  },
  close: function(){
    // remplazar el src por una ruta relativa de un img placeholder
    let img = this.button.upload.children('img');
    img.attr('src','https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png');
  }
}

export default ()=>{ for (let name in Forms) { Forms[name] = new Form(Forms[name]); } return Forms }
