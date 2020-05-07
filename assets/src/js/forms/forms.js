import { HTML } from './templates.js';
import { Form } from './form.js';
import { Rules } from './rules.js';

function success(res){

  let message = $(document.createElement('div'));
  message.addClass('lateral-message flex text-md p-2 pt-2 z-20 bg-green-700 text-white').html(`
    <i class="fas fa-paper-plane"></i>
    <p class="mx-2">Solicitud enviada </p>
  `);
  $('body').append(message);
  setTimeout(()=>{
    message.addClass('active');
    setTimeout(()=>{
      message.css('opacity','0');
      setTimeout(()=>{ message.remove(); },1000);
    },1000);
  },100)
}

function send(opt,fn){
  $.ajax({
    url: `${window.location.origin}/${opt.url}`,
    async: (opt.aysnc ? opt.async : true),
    method: 'post',
    data: opt.data,
    success: (fn == undefined ? success : fn)
  });

}

const Forms = {};

Forms.permision = {
  name:'permision',
  title: 'Permiso',
  html: HTML.permision,
  buttons: ['send'],
  init: function(){
    this.group.date = this.createDateInput(this.group.date);
    this.group.hour_start = this.createTimeInput(this.group.hour_start);
    this.group.hour_finish = this.createTimeInput(this.group.hour_finish);
  },
  open: function(){
    this.buttons.send.removeClass('hidden');
  },
  send: function(){
    let time = {};
    let date = {};
    let description = this.textarea.description.val().trim();
    time.start = this.group.hour_start.time();
    time.finish = this.group.hour_finish.time();
    date.start = this.group.date.date();
    date.finish = this.group.date.date();

    date.start.setHours(time.start.hour,time.start.minutes);
    date.finish.setHours(time.finish.hour,time.finish.minutes);

    date.start = this.group.date.format(date.start);
    date.finish = this.group.date.format(date.finish);

    let data = {
      notice: 1,
      date_start: date.start,
      date_finish: date.finish,
      comments: description,
    }

    send({url:'permisions/create',data});

  }
}

Forms.homeOffice = {
  name:'homeOffice',
  title:'Home Office',
  html: HTML.homeOffice,
  buttons: ['send'],
  init: function(){
    this.group.date = this.createDateInput(this.group.date);
  },
  open: function(){
    this.buttons.send.removeClass('hidden');
  },
  send: function(){

    let date = {};
    let description = this.textarea.description.val().trim();
    date.start = this.group.date.date();
    date.finish = this.group.date.date();

    date.start.setHours(10);
    date.finish.setHours(19);

    date.start = this.group.date.format(date.start);
    date.finish = this.group.date.format(date.finish);

    let data = {
      notice: 2,
      date_start: date.start,
      date_finish: date.finish,
      comments: description,
    };

    send({url:'permisions/create',data})
  }
}

Forms.vacation = {
  name:'vacation',
  title: 'Vacación',
  html: HTML.vacation,
  buttons: ['send'],
  init: function(){
    this.group.date_start = this.createDateInput(this.group.date_start);
    this.group.date_finish = this.createDateInput(this.group.date_finish);
  },
  open: function(){
    this.buttons.send.removeClass('hidden');
  },
  send:function(){
    let date = {};
    date.start = this.group.date_start.date();
    date.finish = this.group.date_finish.date();

    date.start.setHours(10);
    date.finish.setHours(10);

    date.start = this.group.date_start.format(date.start);
    date.finish = this.group.date_finish.format(date.finish);

    let data = {
      notice: 3,
      date_start: date.start,
      date_finish: date.finish,
    };

    send({url:'permisions/create',data})
  }
}

Forms.sick = {
  name:'sick',
  title:'Enfermedad',
  html: HTML.sick,
  buttons: ['send'],
  init: function(){
    this.group.date_start = this.createDateInput(this.group.date_start);
    this.group.date_finish = this.createDateInput(this.group.date_finish);
    this.previewImg(this.input.img,this.button.upload,this.button.upload.children('img'));
  },
  open: function(){
    this.buttons.send.removeClass('hidden');
  },
  close: function(){
    // remplazar el src por una ruta relativa de un img placeholder
    let img = this.button.upload.children('img');
    img.attr('src','https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png');
  },
  send: function(){
    let date = {};
    date.start = this.group.date_start.date();
    date.finish = this.group.date_finish.date();

    date.start.setHours(10);
    date.finish.setHours(19);

    date.start = this.group.date_start.format(date.start);
    date.finish = this.group.date_finish.format(date.finish);

    let data = {
      notice: 4,
      date_start: date.start,
      date_finish: date.finish,
    };

    send({url:'permisions/create',data});
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
