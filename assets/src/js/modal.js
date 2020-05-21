export default function(){
  const Actions = {};
  const Elements = {
    container : $('#modal-cont'),
    modal: $('#modal'),
    header: $('#modal > .header'),
    body: $('#modal > .body'),
    footer: $('#modal > .footer')
  }

  Elements.title = Elements.header.find('.title');
  Elements.close = Elements.header.find('button[name="close"]');

  Actions.open = (data)=>{
    Elements.title.html(data.title);
    Elements.body.html(data.body);
    Elements.container.addClass('active');
    Elements.container.on('click',function(e){
      if($(e.target).hasClass('modal-cont')){
        Elements.close.trigger('click')
      }
    });
  }

  Actions.close = ()=>{
    Elements.container.off('click');
    Elements.container.removeClass('active');
  }

  return { elements: Elements, actions: Actions}

}
