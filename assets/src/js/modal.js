export default function(){
  const Actions = {};
  const Elements = {
    container : $('#modal-cont'),
    modal: $('#modal'),
    header: $('#modal > .header'),
    body: $('#modal > .body'),
    footer: $('#modal > .footer')
  }

  Elements.title = Elements.header.find('.title > p');
  Elements.buttons = {};

  Elements.footer.find('button').each(function(){
    let el = $(this);
    Elements.buttons[el.attr('name')] = el;
  });
  Elements.buttons.close = Elements.header.find('button[name="close"]');

  Actions.open = (data)=>{
    Elements.container.addClass('open');
    Elements.title.html(data.title);
    Elements.body.html(data.body);

  }

  Actions.close = ()=>{
    Elements.container.removeClass('open');
    Elements.title.html('');
    Elements.body.html('');

  }


  return { elements: Elements, actions: Actions}

}
