function base_url(url){
  return `${window.location.origin}/${url}`;
};

const Services = {};
Services.get = {};
Services.get.form = (name)=>{
  let html = '';
  let settings = {
    url: base_url(`home/forms/${name}`),
    method: 'GET',
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

export { Services }
