export default function (){
  const Elements = {};
  const Actions = {};
  const State = {};

  Elements.nav = $('nav')
  Elements.date = Elements.nav.find('[data="date"]');
  Elements.buttons = {};
  Elements.nav.find('button').each(function(){ let el = $(this); Elements.buttons[el.attr('name')] = el });

  return {elements: Elements,actions: Actions,state: State}
}
