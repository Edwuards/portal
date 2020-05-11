import { Observer } from '../helpers.js';
import * as Inputs from '../inputs.js';

function Row(data){

  const ROW = $(document.createElement('div'));
  const INSTANCE = this;
  const BUTTONS = {
    all: [],
    name: {}
  };
  const INPUTS = {
    all: [],
    type:{}
  };
  const SUBJECT = new Observer(['alive']);
  const PROPS = {
    alive:false,
    id: data.id
  };
  const OPEN = ()=>{
    INPUTS.all.forEach((input)=>{ input.on(); });
    BUTTONS.all.forEach((btn)=>{ btn.on(); });
    PROPS.alive = true;
    return ROW
  };
  const CLOSE = ()=>{
    INPUTS.all.forEach((input)=>{ input.off(); });
    BUTTONS.all.forEach((btn)=>{ btn.off(); });
    PROPS.alive = false;
  };

  ROW.html(typeof data.html == 'function' ? data.html() : data.html )
  .addClass('flex w-full h-12 px-4 border-b')
  .attr('data','row');

  ROW.find('[data-type]').each(function(){
    let el = $(this),
    type = el.attr('data-type'),
    name = el.attr('name'),
    group = el.attr('data-group');

    if(type !== 'button'){
      if(!INPUTS.type[type]){ INPUTS.type[type] = {}; }
      if(group){
        if(!INPUTS.type[type][group]){ INPUTS.type[type][group] = {} }
        INPUTS.type[type][group][name] = el;
      }
      else{
        if(type == 'text'){
          el = new Inputs.TextInput(el);
        }
        else if(type == 'number'){
          el = new Inputs.NumberInput(el);
        }
        else if(type == 'select'){
          el = new Inputs.SelectInput(el);
        }
        else if(type == 'textarea'){
          el = new Inputs.TextAreaInput(el);
        }

        INPUTS.type[type][name] = el;
      }
    }
    else{
      BUTTONS.name[name] = new Inputs.Button(el);
      BUTTONS.all.push(BUTTONS.name[name]);
    }
  });

  for(let type in INPUTS.type){
    for (let input in INPUTS.type[type]) {
      let name = input;
      if(type == 'date'){
        input = INPUTS.type.date[input];
        INPUTS.type.date[name] = new Inputs.DateInput(input.month,input.day,input.year);
      }
      if(type == 'time'){
        input = INPUTS.type.time[input];
        INPUTS.type.time[name] = new Inputs.TimeInput(input.hour,input.minutes,input.time);
      }
      if(type == 'image'){
        input = INPUTS.type.image[input];
        INPUTS.type.image[name] = new Inputs.ImageInput(input.file,input.upload,input.preview);
      }
      if(type == 'status'){
        input = INPUTS.type.status[input];
        INPUTS.type.status[name] = new Inputs.StatusInput(input.status,input.indicator);
      }
      INPUTS.all.push(INPUTS.type[type][name]);
    }
  }

  const METHODS = {
    'element': {
      get:()=>{ return ROW }
    },
    'alive':{
      get:()=>{ return PROPS.alive; }
    },
    'id':{
      get:()=>{ return PROPS.id; }
    },
    'on': {
      configurable: true,
      get:()=>{ return OPEN; },
      set:(open)=>{
        Object.defineProperty(INSTANCE,'open',{
          configurable: false,
          writable: false,
          value:()=>{
            let form = OPEN();
            open.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
            return form;
          }
        });
      }
    },
    'off': {
      configurable: true,
      get:()=>{ return CLOSE; },
      set:(close)=>{
        Object.defineProperty(INSTANCE,'close',{
          configurable: false,
          writable: false,
          value:()=>{
            CLOSE();
            close.call({ inputs: INPUTS.type, buttons: BUTTONS.name });
          }
        });
      }
    },
    'buttons':{
      writable: false,
      value: BUTTONS.name,
    },
    'events':{
      writable: false,
      value: {
        on: SUBJECT.register,
        off: SUBJECT.unregister
      }
    },
    'disable':{
      writable: false,
      value: (toggle)=>{
        INPUTS.all.forEach((input)=>{ input.disable(toggle); });
      }
    },
    'inputs':{
      writable: false,
      value: INPUTS.type
    },
    'update': {
      configurable: true,
      set: (fn)=>{
        Object.defineProperty(INSTANCE,'update',{
          configurable: false,
          writable: false,
          value: fn
        })
      }
    }
  }

  Object.defineProperties(this,METHODS);
}

function Table(data){
  data.html = typeof data.html == 'function' ? data.html() : data.html;
  const TABLE = $(document.createElement('div'));
  const HTML = {
    row: data.html.row,
    table: data.html.table
  }
  const INSTANCE = this;
  const BUTTONS = {
    all: [],
    name: {}
  };
  const ROWS = {
    id: 0,
    all: [],
    add: ()=>{
      let row = ROWS.all[ROWS.all.push(new Row({id:ROWS.id++,html:HTML.row})) - 1];
      row.disable(true);
      SUBJECT.notify('addRow',[row]);
      return row;
    },
    remove: ()=>{

    },
    get: ()=>{ return ROWS.all },
    find: (find)=>{ return ROWS.all.find(find); }
  };
  const SUBJECT = new Observer(['open','close','addRow','removeRow','rowUpdate']);
  const PROPS = {
    alive:false,
    name:data.name,
    body: undefined
  };
  const OPEN = ()=>{
    TABLE.removeClass('hidden');
    ROWS.all.forEach((row)=>{ row.on(); });
    BUTTONS.all.forEach((btn)=>{ btn.on(); });
    PROPS.alive = true;
    return TABLE
  };
  const CLOSE = ()=>{
    TABLE.addClass('hidden');
    ROWS.all.forEach((row)=>{ row.off(); });
    BUTTONS.all.forEach((btn)=>{ btn.off(); });
    PROPS.alive = false;
  };

  TABLE.html(HTML.table).addClass('min-w-full h-full bg-gray-200 absolute p-10 hidden overflow-scroll').attr('data-table',data.name);
  PROPS.body = TABLE.find('.body');
  TABLE.find('[data-type="button"]').each(function(){
    let el = $(this),
    name = el.attr('name');
    BUTTONS.name[name] = new Inputs.Button(el);
    BUTTONS.all.push(BUTTONS.name[name]);
  });

  const METHODS = {
    'element': {
      get:()=>{ return TABLE }
    },
    'name':{
      get:()=>{ return PROPS.name; }
    },
    'alive':{
      get:()=>{ return PROPS.alive; }
    },
    'open': {
      configurable: true,
      get:()=>{ return OPEN; },
      set:(open)=>{
        Object.defineProperty(INSTANCE,'open',{
          configurable: false,
          writable: false,
          value:()=>{
            let form = OPEN();
            open.call({ inputs: ROWS, buttons: BUTTONS.name });
            return form;
          }
        });
      }
    },
    'close': {
      configurable: true,
      get:()=>{ return CLOSE; },
      set:(close)=>{
        Object.defineProperty(INSTANCE,'close',{
          configurable: false,
          writable: false,
          value:()=>{
            CLOSE();
            close.call({ inputs: ROWS, buttons: BUTTONS.name });
          }
        });
      }
    },
    'buttons':{
      writable: false,
      value: BUTTONS.name,
    },
    'events':{
      writable: false,
      value: {
        on: SUBJECT.register,
        off: SUBJECT.unregister
      }
    },
    'rows':{
      writable: false,
      value: (()=>{
        const OBJ = {};

        const METHODS = {
          'add': {
            configurable: true,
            set: (fn)=>{
              Object.defineProperty(OBJ,'add',{
                configurable: false,
                value: (data)=>{
                  let row = ROWS.add();
                  fn.call(row,data);
                  PROPS.body.append(row.element);
                  return row;
                }
              });
            }
          },
          'update': {
            configurable: true,
            set: (fn)=>{
              let update = (row)=>{
                return function(){
                  fn.apply(row,arguments);
                  SUBJECT.notify('rowUpdate',[row]);
                }
              };
              ROWS.all.forEach((r)=>{ r.update = update(r) });
              SUBJECT.register('addRow',function(row){ row.update = update(row) })
              Object.defineProperty(OBJ,'update',{
                configurable: false,
                enumerable: false,
                value: true
              });
            }
          },
          'get': {
            writable: false,
            value: ROWS.get
          },
          'find': {
            writable: false,
            value: ROWS.find
          }
        }

        Object.defineProperties(OBJ,METHODS);

        return OBJ;
      })()
    }
  }

  Object.defineProperties(this,METHODS);

}

export { Table }
