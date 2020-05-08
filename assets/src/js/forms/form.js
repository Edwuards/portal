function Form(data){
  const FORM = $(document.createElement('form'));
  const TITLE = data.title;
  FORM.html(data.html);
  FORM.attr('name',data.name);

  FORM.find('input,select,button,textarea').each(function(){
    let el = $(this);
  })


}



export { Form }
