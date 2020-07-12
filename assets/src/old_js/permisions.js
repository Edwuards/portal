export default function(){
  const Actions = {};
  const Elements = {};
  const State = {
    open:false
  };

  Elements.container = $('#permisions');
  Elements.permisions = $('.permision');
  Elements.buttons = Elements.container.find('button.form');
  Elements.avisar = Elements.container.find('button[name="avisar"]');

  Actions.open = ()=>{
    State.open = true;
    Elements.container.addClass('active');
    Elements.permisions.removeClass('hide');
    Elements.avisar.children('i').removeClass('fa-bullhorn').addClass('fa-times');
  }

  Actions.close = ()=>{
    State.open = false;
    Elements.container.removeClass('active');
    Elements.permisions.addClass('hide');
    Elements.avisar.children('i').removeClass('fa-times').addClass('fa-bullhorn');

  }

  return {elements: Elements, actions: Actions, state: State};
}
