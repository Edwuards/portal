import { userRow } from '../templates/teams';
import { View } from '../helpers';
import { Finder } from '../form/inputs';


function Users(users,element,available){
  const view = new View({name: 'users list', element: element });
  (available = !available ? users.all.map((user)=> user.data) : available );


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

  view.on = function(){
    available.forEach((user) => {
      user = {
        id: user.id,
        avatar: user.avatar,
        name: user.firstname,
        position: user.position
      };

      view.body.append(userRow.render(user));
    });
    search.on();
  }

  view.off = function(){ view.body.empty(); search.off(); }

  view.available = {
    add: (user)=>{ available.push({
        id: user.id,
        avatar: user.avatar,
        name: user.firstname,
        position: user.position
      });
    },
    remove: (id)=>{
      available = available.reduce((list,user,i)=>{
        if(id != user.id){ list.push(user); }
        return list;
      },[]);
    },
    reset: ()=>{ available = users.all.map((user)=> user.data) }
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
        'empty': ()=>{ members = []; },
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

export {Users,Team}
