import dragula from 'dragula';
import { View, Observer } from '../helpers';
import { Form } from '../form/form';
import { row } from '../templates/users';
import { Finder } from '../form/inputs';

function Users(users,element){
  const view = new View({name: 'users list', element: element });
  let available = [];

  const { search } = Finder(view.element).inputs.type.text;

  search.events.on('input',function(){
    let value = this.value;
    let children = view.body.children();
    if(value){
      let found = [];
      children.addClass('hidden');

      available.forEach((user) => {
        let pattern = new RegExp(`${value}`,'gi');
        if(user.name.search(pattern) != -1){ found.push(user.id); }
      });

      children.each((i,el)=>{
        let id = Number(el.attributes['data-id'].value);
        if(found.indexOf(id) != -1){ el.classList.remove('hidden'); }
      })

    }
    else{
      children.removeClass('hidden');
    }
  })

  view.body = view.element.find('.body');

  view.on = function(){
    users.all.forEach((user) => {
      user = {
        id: user.data.id,
        avatar: user.data.avatar,
        name: user.data.firstname,
        position: user.data.position
      };

      view.body.append(row.render(user));
      available.push(user);
    });
    search.on();
  }

  view.off = function(){ view.body.empty(); available = []; search.off(); }

  view.available = {
    add: (user)=>{ available.push(user); },
    remove: (id)=>{
      available = available.reduce((list,user,i)=>{
        if(id != user.id){ list.push(user); }
        return list;
      },[]);
    }
  }



  return view
}

function Team(){
  let members = [];
  let leader = null;
  let area = undefined;
  let name = undefined;

  const methods = {
    'name':{
      get: ()=>{ return name },
      set: (value)=>{ name = value }
    },
    'area':{
      get: ()=>{ return area },
      set: (value)=>{ area = value }
    },
    'members':{
      writable: false,
      value: {
        'get': ()=>{ return members; },
        'add': (user)=>{ members.push(user); },
        'remove': (id)=>{
          members = members.reduce((list,user,i)=>{
            if(id != user.id){ list.push(user); }
            return list;
          },[]);
        }
      }
    },
    'leader':{
      set: (value)=>{ leader = value; },
      get: ()=>{ return leader; }
    }
  }

  Object.defineProperties(this,methods);

}

function setLeader(user){
  if(team.leader !== null){
    let leader = elements.leader.find(`[data-id="${team.leader}"]`);
    leader.detach();
    elements.members.prepend(leader);
  }

  team.leader = user;
}

function Drag(containers){
  const events = new Observer([
    'dropped on users',
    'dropped on leader',
    'dragged from users',
    'dragged from leader',
    'dropped'
  ]);

  const drag = dragula(containers);

  drag.on('drop',function(el,target,source){
    target = $(target); source = $(source);
    let user = Number($(el).attr('data-id'));
    const dragged = {
      to: target.attr('data'),
      from: source.attr('data'),
    };

    if(dragged.to == 'users'){ events.notify('dropped on users',[user]); }
    if(dragged.to == 'leader'){ events.notify('dropped on leader',[user]); }
    if(dragged.to == 'leader' || dragged.to == 'members'){ target.removeClass('border-2'); }
    if(dragged.from == 'users'){ events.notify('dragged from users',[user]); };

    if(dragged.from == 'leader'){ events.notify('dragged from leader',[user]); source.addClass('border-2'); }

    events.notify('dropped',[user]);

  });



  return {
    on: events.register,
    off: events.unregister
  };

}

function teamForm(){
  const form = new Form({ name: 'createTeam', url: 'createTeam' });
  form.view = {};
  form.view.body = form.element.find('.body');
  form.view.leader = form.view.body.find('[data="leader"]');
  form.view.members = form.view.body.find('[data="members"]');

  form.off = function(){
    form.view.leader.empty().addClass('border-2');
    form.view.members.empty().addClass('border-2');
  }

  return form;

}


export default function (userList){
  const team = new Team();
  const view = new View({name:'create team',element: $('[data-teams="create"]') });
  const users = Users(userList,view.element.find('[name="userList"]'));
  const form = teamForm();
  const drag = Drag([
    form.view.leader[0],
    form.view.members[0],
    users.body[0]
  ]);

  drag.on('dropped on users',function(user){
    team.members.remove(user);
    users.available.add(userList.find(user).data);
  });
  drag.on('dropped on leader',function(user){
    if(team.leader !== null){
      let leader = form.view.leader.find(`[data-id="${team.leader}"]`);
      leader.detach();
      form.view.members.prepend(leader);
    }
    team.leader = user;
  });
  drag.on('dragged from users',function(user){
    users.available.remove(user);
    team.members.add(userList.find(user).data);
  });
  drag.on('dragged from leader',function(user){
    team.leader = null;
  });
  drag.on('dropped',function(user){
    let members = team.members.get().length;
    if( !members || (members == 1 && team.leader != null) ){
        form.view.members.addClass('border-2');
    }
  });


  view.on = function(){ users.on(); form.on(); }

  view.off = function(){ users.off(); form.off(); }


  return view;
}
