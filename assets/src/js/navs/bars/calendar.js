import { NavBar } from './navbar';

export function Calendar(calendar){
  NavBar.call(this,'calendar');
  const DateTitle = this.element.find('[data=date]');

  calendar.register('updateDate',function(stringDate){ DateTitle.html(stringDate); });

  this.buttons.name.prev.events.on('click',calendar.prev);

  this.buttons.name.next.events.on('click',calendar.next);

  this.buttons.name.today.events.on('click',calendar.today);

  calendar.updateDate();

}
