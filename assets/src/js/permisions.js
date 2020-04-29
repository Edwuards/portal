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

  Actions.open = ()=>{
    State.open = true;
    Elements.container.addClass('active');
    Elements.button.open.children('i')
    .removeClass('fa-plus')
    .addClass('fa-times');
    Elements.actions.addClass('active').children('p').addClass('active');
  }

  Actions.close = ()=>{
    State.open = false;
    Elements.container.removeClass('active');
    Elements.actions.removeClass('active').children('p').removeClass('active');
    Elements.button.open.children('i')
    .removeClass('fa-times')
    .addClass('fa-plus');
  }

  return {elements: Elements, actions: Actions, state: State};
}
