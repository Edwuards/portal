function base_url(url){
  return `${window.location.origin}/${url}`;
};

const Services = {};
Services.get = {};
Services.get.form = (name,fn,sync)=>{
  let html = '';
  let settings = {
    url: base_url(`app/forms`),
    method: 'post',
    data:{ name },
    async: sync ? sync : false,
    success:fn
  };

  $.ajax(settings);

}
Services.get.table = (name,fn)=>{
  let obj = '';
  let settings = {
    url: base_url(`tables/get/${name}`),
    async: false,
    success:fn
  };

  $.ajax(settings);

}
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

export { Services }
