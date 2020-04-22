import { default as CalendarInit } from './calendar.js';
import { default as NavInit } from './nav.js';
import $ from 'jquery';

$(document).ready(function(){
  const Calendar = CalendarInit();
  const Nav = NavInit();
  Nav.elements.date.html(Calendar.formatDate(
    Calendar.getDate(),{ month: 'long', year: 'numeric'} )
  );
  let height = (window.innerHeight+1) - Nav.elements.nav.height()+24;
  Calendar.setOption('height',height);
  Calendar.render();
})
