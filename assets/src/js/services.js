function base_url(url){
return `${window.location.origin}/index.php/${url}`;
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

export { Services }
