export default function(){
  const Actions = {};
  const Elements = {};
  const State = {
    open:false
  };

  Elements.container = $('#permisions');
  Elements.button = {};
  Elements.container.find('button').each(function(){ let el = $(this); Elements.button[el.attr('name')] = el });
  Elements.actions = Elements.container.find('.action');
  Elements.btnContainer = Elements.actions.parent();
  Elements.openContainer = Elements.button.open.parent();

  Actions.hide = ()=>{
    Elements.openContainer.addClass('hide');
  }

  Actions.show = ()=>{
    Elements.openContainer.removeClass('hide');
  }

  Actions.open = ()=>{
    State.open = true;
    Elements.container.addClass('active');
    Elements.btnContainer
    .addClass('active')
    .removeClass('w-0');
    Elements.button.open.children('i')
    .removeClass('fa-plus')
    .addClass('fa-times');
    Elements.actions.addClass('active').children('p').addClass('active');
  }

  Actions.close = ()=>{
    State.open = false;
    Elements.container.removeClass('active');
    Elements.btnContainer
    .removeClass('active')
    .addClass('w-0');
    Elements.actions.removeClass('active').children('p').removeClass('active');
    Elements.button.open.children('i')
    .removeClass('fa-times')
    .addClass('fa-plus');

  }

  return {elements: Elements, actions: Actions, state: State};
}
