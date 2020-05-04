const Rules = {};

Rules.timeEmpty = (data)=>{
  let error = false;
  const { hour, minutes } = data.inputs;
  const parent = {
    hour: hour.parent(),
    minutes: minutes.parent()
  };
  const time = data.time();

  parent.hour.removeClass('error');
  parent.minutes.removeClass('error');

  if(!Boolean(time.hour)){
    parent.hour.addClass('error').siblings('.helper').text('Vacio');
    error = true;
  }
  if(time.minutes == '' || time.minutes == undefined){
    parent.minutes.addClass('error').siblings('.helper').text('Vacio');
    error = true;
  }

  return error;

}

Rules.textEmpty = (input)=>{
  let p = input.parent();
  let error = false;
  const value = input.val().trim();
  p.removeClass('error');

  if(value == '' || value == undefined){
    p.addClass('error').siblings('.helper').text('Vacio');
    error = true;
  }

  return error;
}
export { Rules };
