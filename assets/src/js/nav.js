export default function (){
  const Elements = {};
  const Actions = {};
  const State = {};

  Elements.nav = $('nav')
  Elements.date = Elements.nav.find('[data="date"]');
  Elements.button = {};
  Elements.nav.find('button').each(function(){ let el = $(this); Elements.button[el.attr('name')] = el });
  Elements.menu = {};
  Elements.menu.container = $('#side-menu');
  Elements.menu.button = {};
  Elements.menu.container.find('button').each(function(){ let el = $(this); Elements.menu.button[el.attr('name')] = el });

  return {elements: Elements,actions: Actions,state: State}
}
