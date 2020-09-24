import dragula from 'dragula';
import { View } from '../helpers';
import { Form } from '../form/form';
import { Users , Team } from './subcomponents';

export default function (userList){
  const team = new Team();
  const view = new View({name:'create team',element: $('[data-teams="create"]') });
  const users = Users(view.element.find('[name="userList"]'));
  const form =  new Form({ name: 'createTeam', url: 'createTeam' });
  form.view = {};
  form.view.body = form.element.find('.body');
  form.view.counter = form.view.body.find('[data="counter"]');
  form.view.leader = form.view.body.find('[data="leader"]');
  form.view.members = form.view.body.find('[data="members"]');
  form.off = function(){
    form.view.counter.text('0');
    form.view.leader.empty().addClass('border-2');
    form.view.members.empty().addClass('border-2');
    team.members.empty();
  }

  const drag = dragula([
    form.view.leader[0],
    form.view.members[0],
    users.body[0]
  ]);

  const members = {
    remove: (id)=>{
      team.members.remove(id);
      users.available.add(userList.find(id));
      form.view.counter.text(String(team.members.get().length));
    },
    add: (id,from)=>{
      users.available.remove(id);
      team.members.add(userList.find(id).data);
      form.view.counter.text(String(team.members.get().length));
    }
  }


  drag.on('drop',function(el,target,source){
    target = $(target); source = $(source);
    let id = Number($(el).attr('data-id'));
    const dropped = {
      on: target.attr('data'),
      from: source.attr('data')
    };

    if(dropped.on == 'members'){
      if(dropped.from == 'users'){ members.add(id); }
      else{ team.leader = null; }
      target.removeClass('border-2');
    }
    if(dropped.on == 'users'){
      if(dropped.from == 'leader'){ team.leader = null; }
      members.remove(id);
    }
    if(dropped.on == 'leader'){
      if(dropped.from == 'users'){ members.add(id); }
      if(team.leader !== null){
        let leader = form.view.leader.find(`[data-id="${team.leader}"]`);
        leader.detach();
        form.view.members.prepend(leader);
      }

      target.removeClass('border-2');
      team.leader = id;
    }

    {
      let members = team.members.get().length;
      if(dropped.from == 'leader'){ source.addClass('border-2'); }
      if(dropped.from == 'members' && (!members || (team.leader != null && members == 1)) ){ source.addClass('border-2'); }
    }

  });


  view.on = function(){ users.on(userList); form.on(); }

  view.off = function(){ users.off(); form.off(); }


  return view;
}
