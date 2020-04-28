export default function(){
  const Actions = {};
  const State = {};
  const Elements = {};

  Elements.container = $('#permisions');
  Elements.button = {};
  Elements.container.find('button').each(function(){ let el = $(this); Elements.button[el.attr('name')] = el });
  Elements.actions = Elements.container.find('.action');

  Actions.open = ()=>{
    Elements.container.addClass('active');
    Elements.button.open.addClass('hidden');
    Elements.actions.removeClass('hidden');
  }

  Actions.close = ()=>{
    Elements.container.removeClass('active');
    Elements.actions.addClass('hidden');
    Elements.button.open.removeClass('hidden');
  }

  return {elements: Elements, actions: Actions, state: State};
}
