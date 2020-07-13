import { Navigation } from './navigation';
import { Calendar } from './bars/calendar';

export function EmployeeNavigationBars(dependencies){
  const Bars = {
    calendar: undefined
  };

  {
    let { calendar } = dependencies;
    Bars.calendar = Calendar(calendar);
  }

  return new Navigation(Bars,Bars.calendar);

}
