export default function (){
  const Actions = {};
  const Elements = {};
  const State = {};

  Elements.container = $('#dataTable');
  Elements.tables = {};
  Elements.container.find('[data-table]').each(function(){
    let el = $(this);
    Elements.tables[el.attr('data-table')] = el;
  });

  Actions.changeTable = (table)=>{
    for (let name in Elements.tables) {
      console.log(table == name);
      Elements.tables[name][table == name ? 'removeClass' : 'addClass' ]('hidden');
    }
  }
  Actions.open = (table)=>{
    Elements.container.addClass('active');
    Actions.changeTable(table);
  }
  Actions.close = ()=>{
    Elements.container.removeClass('active');
    Actions.changeTable(false);
  }

  return {actions: Actions, elements: Elements, state: State}

}
