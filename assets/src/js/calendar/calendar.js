import { Calendar as CalendarCore } from '@fullcalendar/core';
import { Observer } from '../helpers';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';

export function Calendar(selector){
  const options = {
    eventLimit: 3,
    plugins: [ dayGridPlugin ],
    defaultView: 'dayGridMonth',
    locale: esLocale,
    displayEventTime: false,
    header: { left: '', center: '', right: '' },
    columnHeaderText: function(date) {
      let short = window.innerWidth > 640;
      date = instance.formatDate(date,{
        locale:'es',
        weekday:  short ? 'short' : 'narrow'
      });
      if(short){ date = date.split('.')[0]; }
      return date;
    }
  };
  const element =  $(`[data-calendar="${selector}"]`);
  const instance = new CalendarCore(element[0],options);
  const events = new Observer(['updateDate']);

  const methods = {
    'updateDate': {
      writable: false,
      value: (format)=>{
        if(format == undefined){ format = { month: 'long', year: 'numeric'}; }
        format = instance.formatDate(instance.getDate(),format);
        format = format.slice(0,1).toUpperCase()+format.slice(1);
        events.notify('updateDate',[format]);
      }
    },
    'render': {
      writable: false,
      value: ()=>{
        // la barra de navegación mide 64px en altura por eso se la resta.
        let height = window.innerHeight - 64;
        instance.setOption('contentHeight',height);
        instance.render();
        this.updateDate();
      }
    },
    'next': {
      writable: false,
      value: ()=>{
        instance.next();
        this.updateDate();
      }
    },
    'prev': {
      writable: false,
      value: ()=>{
        instance.prev();
        this.updateDate();
      }
    },
    'today': {
      writable: false,
      value: ()=>{
        instance.today();
        this.updateDate();
      }
    },
    'events': {
      writable: false,
      value: {
        'on': events.register,
        'off': events.unregister
      }
    },
  }

  Object.defineProperties(this,methods);

}
