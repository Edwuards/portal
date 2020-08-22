import { ToolBar } from './toolbar';


export default function(){
  const toolbar = new ToolBar('calendar');
  const dateTitle = toolbar.element.find('[data=date]');
  const methods = {
    'setDate': { value: function(value){ dateTitle.html(value); } }
  };

  Object.defineProperties(toolbar,methods);

  return toolbar;
}
