function base_url(url){
  return `${window.location.origin}/${url}`;
};

const Services = {};
Services.get = {};
Services.get.user = (data,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`users/get`),
    data: data,
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}
Services.get.profile = (fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`users/profile`),
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}
Services.get.aviso = (data,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`permisions/get`),
    data: data,
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}
Services.get.myAvisos = (data,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`permisions/mine`),
    data: data,
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}

Services.update = {};
Services.update.aviso = (data,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`permisions/update`),
    data: data,
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}

Services.delete = {}
Services.delete.user = (data,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`users/delete`),
    data: data,
    method: 'post',
    async: true,
    success: fn
  };

  $.ajax(settings);
}

export { Services }
