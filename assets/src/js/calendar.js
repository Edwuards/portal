import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function (){
  const Options = {
    eventLimit: 3,
    plugins: [ dayGridPlugin ],
    defaultView: 'dayGridMonth',
    locale: esLocale,
    displayEventTime: false,
    header: { left: '', center: '', right: '' },
    columnHeaderText: function(date) {
      let short = window.innerWidth > 640;
      date = CALENDAR.formatDate(date,{
        locale:'es',
        weekday:  short ? 'short' : 'narrow'
      });
      if(short){ date = date.split('.')[0]; }
      return date;
    }
  }
  const Elements = {
    calendar: $('#calendar')
  }
  const CALENDAR = new Calendar(Elements.calendar[0],Options);

  return {
    instance: CALENDAR,
    open: ()=>{ Elements.calendar.addClass('active'); },
    close: ()=>{Elements.calendar.removeClass('active'); }
  }
}
