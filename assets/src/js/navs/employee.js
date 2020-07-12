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
  Bars.calendar.on()
  return Navigation(Bars,Bars.calendar);

}
