function base_url(url){
  return `${window.location.origin}/${url}`;
};

const Services = {};
Services.get = {};
Services.get.form = (name)=>{
  let html = '';
  let settings = {
    url: base_url(`home/forms`),
    method: 'post',
    data:{ name },
    async: false,
    success:(data)=>{ html = data }
  };

  $.ajax(settings);

  return html;
}
Services.get.table = (name)=>{
  let obj = '';
  let settings = {
    url: base_url(`tables/get/${name}`),
    async: false,
    success:(data)=>{ obj = data }
  };

  $.ajax(settings);

  return obj;
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

export { Services }
