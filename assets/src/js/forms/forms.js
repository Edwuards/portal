import { HTML } from './templates.js';

const Forms = {};

function Form(form){
  const Inputs = ['input','button','textarea','select'];
  this.title = form.title;
  this.form = $(document.createElement('form'));
  this.form.attr('data',form.name).addClass('w-ful');
  this.form.html(form.html);

  this.init = function(){
    if(form.init != undefined){ form.init.call(this); }
    for (let name in this.input) {
      let input = this.input[name];
      if(input.attr('data') == 'datepicker'){ input.datetimepicker(); }
    }
  }

  this.close = function(){
    this.form[0].reset();
    if(form.close != undefined){ form.close.call(this); }
  };

  Inputs.forEach(function(type){
    this.form.find(type).each(function(i,element){ element = $(element);
    this[type] = {}; this[type][element.attr('name')] = element; }.bind(this));
  }.bind(this));

}

function previewImg(input,img){
  let file = input[0].files[0];
  let reader = new FileReader();
  reader.onload = function(e){ img.attr('src',e.target.result); }
  reader.readAsDataURL(file);
}

Forms.permision = {
  name:'permision',
  title: 'Permiso',
  html: HTML.permision
}

Forms.homeOffice = {
  name:'homeOffice',
  title:'Home Office',
  html: HTML.homeOffice
}

Forms.vacation = {
  name:'vacation',
  title: 'Vacación',
  html: HTML.vacation
}

Forms.sick = {
  name:'sick',
  title:'Enfermedad',
  html: HTML.sick,
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

Forms.profile = {
  name:'profile',
  title:'Mi Perfil',
  html: HTML.profile,
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
