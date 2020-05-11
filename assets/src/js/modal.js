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
  Elements.button = {};
  Elements.errors = Elements.container.find('.errors');
  Elements.footer.find('button').each(function(){
    let el = $(this);
    Elements.button[el.attr('name')] = el;
  });
  Elements.allButtons = Elements.footer.find('button');
  Elements.button.close = Elements.header.find('button[name="close"]');

  Actions.open = (data)=>{
    Elements.title.html(data.title);
    Elements.body.html(data.body);

    Elements.container.addClass('active').removeClass('close');
    Elements.modal.addClass('active').removeClass('close');
  }

  Actions.close = ()=>{
    Elements.container.addClass('close').removeClass('active');
    Elements.modal.addClass('close').removeClass('active');
    Elements.title.html('');
    Elements.body.html('');
    Elements.allButtons.addClass('hidden');
  }

  return { elements: Elements, actions: Actions}

}
