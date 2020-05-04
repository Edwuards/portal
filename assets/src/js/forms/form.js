function Form(form){
  const Events = [];
  const INPUTS = ['input','button','textarea','select'];
  const Exe = {
    open: []
  };
  const Buttons = {};
  let Init = false;

  this.addEvent = (el,type,fn)=>{
    Events.push({el,type,fn});
    el.on(type,fn);
  }
  this.title = form.title;
  this.setButtons = function(buttons){
    for (let name in buttons) {
      this.buttons[name] = buttons[name];
      if(name !== 'close'){
        this.buttons[name].addClass('hidden');
      }
    }
  };
  this.buttons = {};
  this.form = $(document.createElement('form'));
  this.form.attr('data',form.name).addClass('w-ful');
  this.form.html(form.html);
  this.group = {};
  this.createDateInput = function(Inputs){
    let obj = dateInput(Inputs);
    Exe.open.push(dateInputEvents.bind(this,Inputs));
    return obj
  };
  this.createTimeInput = function(Inputs){
    let obj = timeInput(Inputs);
    Exe.open.push(timeInputEvents.bind(this,Inputs));
    return obj;
  };
  this.previewImg = function(input,button,img){
    this.addEvent(button,'click',()=>{
      input[0].value = '';
      input.trigger('click');
    });
    this.addEvent(input,'input',()=>{
      input.previewImg(img);
    });
  }

  this.send = form.send;

  this.open = function(){
    if(Init == false && form.init !== undefined){
      Init = true;
      form.init.call(this);
    };
    if(form.open !== undefined){ form.open.call(this); }
    Exe.open.forEach((fn)=>{ fn(); });

  }

  this.close = function(){
    this.form[0].reset();
    if(form.close != undefined){ form.close.call(this); }
    Events.forEach((e)=>{ e.el.off(e.type); });
  };

  INPUTS.forEach(function(type){

    this[type] = {};

    this.form.find(type).each(function(i,element){
      element = $(element);
      let parent = element.parent();
      organize.call(this,element,type);
      if(type == 'input' && element.attr('type') == 'file'){
        element.previewImg = previewImg;
      }

      element.error = (on)=>{
        if(on === true){
          parent.addClass('error')
        }
        else if(on === false){
          parent.removeClass('error');
        }

      }
      element.active = (on)=>{
        if(on !== undefined){
          parent.removeClass('notEmtpy');
          parent[ on ? 'addClass' : 'removeClass' ]('active');
          parent.data('active',on);
          if(!on){
            let value = element.val()
            if(typeof value == 'string'){ value = value.trim(); };
            if(Boolean(value)){
              parent.addClass('notEmtpy');
            }
          }
        }

        return parent.data('active')
      }
      Exe.open.push(function(){
        this.addEvent(element,'focus',()=>{ element.active(true); });
        this.addEvent(element,'blur',()=>{ element.active(false); });

      }.bind(this))

    }.bind(this));

  }.bind(this));

}

function organize(element,type){
  let group = element.attr('data-group');
  let name = element.attr('name');
  if(group != undefined && group != '' ){
    if(this[type][group] == undefined){ this[type][group] = {}; }
    if(this.group[group] == undefined){ this.group[group] = {}; }
    this[type][group][name] = element;
    this.group[group][name] = element;
  }
  else{
    this[type][name] = element;
  }
}

function timeInput(Inputs){
  let option = undefined;
  ['am','pm'].forEach((str,i)=>{
    option = $(document.createElement('option'));
    option.attr('value',str).text(str.toUpperCase());
    if(i == 1){option.attr('selected','selected'); }
    Inputs.amPm.append(option);
  });
  Inputs.amPm.parent().addClass('notEmtpy');

  return {
    inputs:Inputs,
    time: ()=>{
      let afternoon = Inputs.amPm.val() == 'pm';
      let hour = Number(Inputs.hour.val());
      if(hour != '' || hour != 0){
        hour = afternoon ? (hour+12) : hour ;
      }
      let minutes = Inputs.minutes.val();
      return {hour,minutes,time: `${hour}:${minutes}` }
    }
  }

}

function timeInputEvents(Inputs){
  const MaxMinConstraints = (min,max,input)=>{
    let value = Number(input.val());
    if(value < min || value == NaN){ value = `0${1}`; }
    else if(value < 10){ value = `0${String(value)}`;  }
    else if(value > max){ value = max; }


    input.val(value);
  }

  const change = (max,min,input)=>{
    return ()=>{
      input.off('input');
      MaxMinConstraints(max,min,input);
      input.on('input',change(max,min,input));
    }
  };

  const focus = function(input){
    return ()=>{
      let value = input.val();
      if(value == ''){
        input.val(input.attr('name') == 'minutes' ? '00' : '01');
      }
    }
  };

  [
    [Inputs.hour,1,12],
    [Inputs.minutes,0,59]
  ].forEach(function(data){
    this.addEvent(data[0],'focus',focus(data[0]));
    this.addEvent(data[0],'input',change(data[1],data[2],data[0]));
  }.bind(this));
}

function dateInputEvents(Inputs){
  const addDays = (diff,days)=>{
    let option = undefined;
    while(diff){
      days++;
      option = Inputs.day.find(`[value="${days}"]`);
      if(option.length){ option.removeClass('hidden'); }
      else{
        option = $(document.createElement('option'));
        option.attr('value',days).text(days);
        Inputs.day.append(option);
      }
      diff--;
    };
    Inputs.month.data('days',days);
  }

  const removeDays = (diff,days)=>{
    while(diff){
      Inputs.day.find(`[value="${days}"]`).addClass('hidden');
      days--;
      diff--;
    };
    Inputs.month.data('days',days);
  }

  const update = ()=>{
    let value = Inputs.month.val();
    let days = Inputs.month.data('days');
    let year = Inputs.month.data('year');
    let updateDays = new Date(year,value,0).getDate();
    Inputs.day.find('[selected="selected"]').removeAttr('selected');
    Inputs.day.find('[value="1"]').attr('selected','selected');
    if(updateDays > days){ addDays((updateDays - days),days); }
    else if(updateDays < days){ removeDays((days - updateDays),days); }
  }

  this.addEvent(Inputs.month,'change',update);

}

function dateInput(Inputs){
  let date = new Date(Date.now());
  let year = date.getFullYear();
  let days = undefined,
  option = undefined,
  day = undefined;

  for (var i = 0; i < 12; i++) {
    let month = date.getMonth();
    let html = new Intl.DateTimeFormat('es-MX',{month:'long'}).format(new Date(year,i));
    option = $(document.createElement('option'));
    if(month == i){
      option.attr('selected','selected');
      days = new Date(year,month,0).getDate();
      Inputs.month.data('days',days);
    }
    option.attr('value',i+1).html(html);
    Inputs.month.append(option);
  }

  for (var i = 0; i < days; i++) {
    option = $(document.createElement('option'));
    option.attr('value',i+1).text(i+1);
    Inputs.day.append(option);
  }

  Inputs.month.data('year',year);

  option = $(document.createElement('option'));
  option.text(year).attr('value',year).attr('selected','selected');
  Inputs.year.append(option)

  option = $(document.createElement('option'));
  option.text(String(Number(year)+1)).attr('value',year);
  Inputs.year.append(option);

  ['month','day','year'].forEach((name)=>{
    Inputs[name].parent().addClass('notEmtpy');
  });

  return {
    date: ()=>{
      return new Date(Inputs.year.val(),Inputs.month.val()-1,Inputs.day.val())
    }
  }

}

function previewImg(img){
  let reader = new FileReader();
  reader.onload = function(e){ img.attr('src',e.target.result); }
  reader.readAsDataURL(this[0].files[0]);
}

export { Form }
