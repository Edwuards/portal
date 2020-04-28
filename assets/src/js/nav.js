export default function (){
  const Elements = {};
  const Actions = {};
  const State = {
    menu: false,
  };

  Elements.container = $('nav')
  Elements.content = $('#content');
  Elements.date = Elements.container.find('[data="date"]');
  Elements.bar = {};
  Elements.menu = {};
  Elements.menu.container = $('#menu');
  Elements.menu.button = {};
  Elements.button = {}
  Elements.button.menu = Elements.container.find('button[name="menu"]');
  Elements.container.find('[data-nav]').each(function(){
    let nav = $(this);
    let type = nav.attr('data-nav');
    Elements.bar[type]  = {};
    Elements.bar[type].button = {};
    nav.find('button').each(function(){
      let el = $(this);
      Elements.bar[type].button[el.attr('name')] = el;
    })
  });
  Elements.menu.container.find('button').each(function(){ let el = $(this); Elements.menu.button[el.attr('name')] = el });

  Actions.openMenu = ()=>{
    Elements.content.addClass('open');
    Elements.button.menu.children('i').removeClass('fa-bars').addClass('fa-times');
    State.menu = true;
  }
  Actions.closeMenu = ()=>{
    Elements.content.removeClass('open');
    Elements.button.menu.children('i').removeClass('fa-times').addClass('fa-bars');
    State.menu = false;
  }

  return {elements: Elements,actions: Actions,state: State}
}
