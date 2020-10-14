import { userRow } from '../templates/teams';
import { View } from '../helpers';
import { Finder } from '../form/inputs';
import { Form } from '../form/form';
import dragula from 'dragula';


function Users(element){
  let available = [];
  const view = new View({name: 'users list', element: element });
  const { search } = Finder(view.element).inputs.type.text;

  search.events.on('input',function(){
    let value = this.value;
    let children = view.body.children();
    if(value){
      let members = [];
      children.addClass('hidden');
      children.each((i,el)=>{ members[Number(el.attributes['data-id'].value)] = el; });

      available.forEach((user) => {
        if(user.name.search(new RegExp(`${value}`,'gi')) != -1){ members[user.id].classList.remove('hidden');  }
      });

    }
    else{
      children.removeClass('hidden');
    }
  })

  view.body = view.element.find('.body');

  view.on = function(users){
    available = users;
    available.forEach((user)=>{ view.body.append(userRow.render(user)); });
    search.on();
  }

  view.off = function(){ view.body.empty(); search.off(); }

  view.available = {
    add: (user)=>{ available.push(user); },
    remove: (id)=>{
      let removed = undefined;
      available = available.reduce((list,user,i)=>{
        if(id != user.id){ list.push(user); }
        else{ removed = user; }
        return list;
      },[]);
      return removed;
    }
  };

  return view
}

function Team(data){
  let members = [];
  let leader = null;
  let area = undefined;
  let name = undefined;
  let id = undefined;
  let avatar = undefined;
  const form =  new Form({ name: data.name, url: data.url });
  const inputs = form.inputs.type;
  form.view = {};
  form.team = {};
  form.view.body = form.element.find('.body');
  form.view.counter = form.view.body.find('[data="counter"]');
  form.view.leader = form.view.body.find('[data="leader"]');
  form.view.members = form.view.body.find('[data="members"]');
  form.off = function(){
    form.view.counter.text('0');
    form.view.leader.empty().addClass('border-2');
    form.view.members.empty().addClass('border-2');
    members = [];
  }
  form.on = function(team){
    if(team){
      form.team.name = team.name;
      form.team.area = team.area;
      form.team.avatar = team.avatar;
      form.team.leader = team.leader;
      if(team.leader){ form.view.leader.removeClass('border-2'); }
      if(team.members.length){ form.view.members.removeClass('border-2'); }
      team.members.forEach((member)=>{
        form.team.members.add(member);
        form.view[team.leader == member.id ? 'leader' : 'members'].append(userRow.render(member));
      });
    }
  }



  const methods = {

    'name':{
      get: ()=>{ return inputs.text.name.value; },
      set: (value)=>{ inputs.text.name.value = value }
    },
    'area':{
      get: ()=>{ return inputs.select.work_area.value; },
      set: (value)=>{ inputs.select.work_area.value = value }
    },
    'avatar':{
      get: ()=>{ return inputs.image.avatar.value },
      set: (value)=>{ inputs.image.avatar.value = value }
    },
    'members':{
      writable: false,
      value: {
        'get': ()=>{ return members; },
        'add': (user)=>{
          form.view.counter.text(members.push(user));
        },
        'remove': (id)=>{
          let removed = undefined;
          members = members.reduce((list,user,i)=>{
            if(id != user.id){ list.push(user); }
            else{ removed = user; }
            return list;
          },[]);

          form.view.counter.text(members.length);
          return removed;
        }
      }
    },
    'leader':{
      set: (userID)=>{ leader = userID; },
      get: ()=>{ return leader; }
    }
  }

  Object.defineProperties(form.team,methods);

  return form;

}

export default function(data){
  const formatUser = (user)=>{
    return {
      id: user.data.id,
      avatar: user.data.avatar,
      name: user.data.firstname,
      position: user.data.position
    }
  }
  const view = new View(data.view);
  const form = Team(data.form);
  const users = Users(view.element.find('[name="userList"]'));
  const containers = [ form.view.leader[0],form.view.members[0],users.body[0]];
  const options = { moves:(el)=>{ return Number(el.attributes['data-drag'].value) } }
  const drag = dragula(containers,options);

  const members = {
    remove: (id)=>{
      users.available.add(form.team.members.remove(id));
    },
    add: (id)=>{
      form.team.members.add(users.available.remove(id));
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
      else{ form.team.leader = null; }
      target.removeClass('border-2');
    }
    if(dropped.on == 'users'){
      if(dropped.from == 'leader'){ form.team.leader = null; }
      members.remove(id);
    }
    if(dropped.on == 'leader'){
      if(dropped.from == 'users'){ members.add(id); }
      if(form.team.leader !== null){
        let leader = form.view.leader.find(`[data-id="${form.team.leader}"]`);
        leader.detach();
        form.view.members.prepend(leader);
      }

      target.removeClass('border-2');
      form.team.leader = id;
    }

    {
      let members = form.team.members.get().length;
      if(dropped.from == 'leader'){ source.addClass('border-2'); }
      if(dropped.from == 'members' && (!members || (form.team.leader != null && members == 1)) ){ source.addClass('border-2'); }
    }

  });

  view.load = function(data){
    if(data.team){ data.team.members = data.team.members.map(formatUser); }
    users.on(data.users.map(formatUser));
    form.on((data.team ? data.team : undefined));
  }

  view.off = function(){ users.off(); form.off(); }

  view.disable = (toggle)=>{
    form.disable(toggle);
    form.view.members.find('[data-drag]').attr('data-drag',(toggle ? '0' : '1'));
    users.body.find('[data-drag]').attr('data-drag',(toggle ? '0' : '1'));
  }

  return view;

}
