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
      date = Instance.formatDate(date,{
        locale:'es',
        weekday:  short ? 'short' : 'narrow'
      });
      if(short){ date = date.split('.')[0]; }
      return date;
    }
  }
  const Elements = calendar: $('#calendar')
  const Instance = new Calendar(Element[0],Options);
  const Actions = {}
  Actions.updateDate = (format)=>{
    if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
    format = Instance.formatDate(Instance.getDate(),format);
    format = format.slice(0,1).toUpperCase()+format.slice(1);
    // Nav.elements.date.html(format);
    // Use an observable to notify  Nav
  }
  Actions.render = ()=>{
    Actions.update.date();
    // la barra de navegación mide 64px en altura por eso se la resta.
    let height = window.innerHeight - 64;
    Instance.setOption('contentHeight',height);
    Instance.render();
  }
  Actions.next = ()=>{
    Instance.next();
    Actions.updateDate();
  }
  Actions.prev = ()=>{
    Instance.prev();
    Actions.updateDate();
  }
  Actions.today = ()=>{
    Instance.today();
    Actions.updateDate();
  }
  Actions.open = ()=>{
    Element.addClass('active');
  }
  Actions.close = ()=>{
    Element.removeClass('active');
  }

  return {
    instance: Instance,
    element: Element,
    actions: Actions
  }
}
