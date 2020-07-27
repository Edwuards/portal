import { NavBar } from './navbar';

export function Calendar(){
  NavBar.call(this,'calendar');
  const dateTitle = this.element.find('[data=date]');

  const methods = {
    'date': { value: function(value){ dateTitle.html(value); } }
  };

  Object.defineProperties(this,methods);

}
