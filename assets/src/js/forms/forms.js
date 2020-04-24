import { HTML } from './templates.js';

const Forms = {};

function Form(form){
  this.title = form.title;
  this.inputs = {};
  this.buttons = {};
  this.form = $(document.createElement('form'));
  this.form.attr('data',form.name).addClass('w-ful');
  this.form.html(form.html);

  this.init = function(){
    if(form.init != undefined){ form.init.call(this); }
    for (let name in this.inputs) {
      let input = this.inputs[name];
      if(input.attr('data') == 'datepicker'){ input.datetimepicker(); }
    }
  }

  this.close = function(){
    this.form[0].reset();
    if(form.close != undefined){ form.close.call(this); }
  }

  this.form.find('input').each(function(i,input){
    input = $(input);
    this.inputs[input.attr('name')] = input;
  }.bind(this));

  this.form.find('button').each(function(i,button){
    button = $(button);
    this.buttons[button.attr('name')] = button;
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
    let inputs = this.inputs;
    let img = this.buttons.upload.children('img');
    this.buttons.upload.on('click',()=>{
      inputs.img[0].value = '';
      inputs.img.trigger('click');
    });
    this.inputs.img.on('input',function(){ previewImg(inputs.img,img); });
  }
}

export default ()=>{ for (let name in Forms) { Forms[name] = new Form(Forms[name]); } return Forms }
