import { Calendar as CalendarCore } from '@fullcalendar/core';
import { Observer } from '../helpers';
import { Permissions } from './permissions';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';

export function Calendar(){
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
  };
  const Element =  $('#calendar');
  const Instance = new CalendarCore(Element[0],Options);
  const Actions = {};
  const Events = new Observer(['updateDate']);
  const permissions = new Permissions();

  Actions.updateDate = (format)=>{
    if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
    format = Instance.formatDate(Instance.getDate(),format);
    format = format.slice(0,1).toUpperCase()+format.slice(1);
    Events.notify('updateDate',[format]);
  }
  Actions.render = ()=>{
    // la barra de navegación mide 64px en altura por eso se la resta.
    let height = window.innerHeight - 64;
    Instance.setOption('contentHeight',height);
    Instance.render();
    Actions.updateDate();
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
  Actions.register = Events.register;

  permissions.on();
  Actions.render();

  return {
    permissions,
    instance: Instance,
    element: Element,
    actions: Actions
  }
}
