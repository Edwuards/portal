import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import $ from 'jquery';

$(document).ready(function(){
  var calendarEl = document.getElementById('cal');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ],
    defaultView: 'dayGridMonth',
    height: window.innerHeight,
    locale: esLocale
  })
  calendar.render();
  console.log(calendar);

})
