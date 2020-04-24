export default function(){
  const Actions = {};
  const State = {};
  const Elements = {};

  Elements.container = $('#permisions');
  Elements.buttons = {};
  Elements.container.find('button').each(function(){ let el = $(this); Elements.buttons[el.attr('name')] = el });
  Elements.actions = Elements.container.find('.action');

  Actions.open = ()=>{
    Elements.container.addClass('active');
    Elements.buttons.open.addClass('hidden');
    Elements.actions.removeClass('hidden');
  }

  Actions.close = ()=>{
    Elements.container.removeClass('active');
    Elements.actions.addClass('hidden');
    Elements.buttons.open.removeClass('hidden');
  }

  return {elements: Elements, actions: Actions, state: State};
}
