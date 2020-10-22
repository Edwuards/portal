import Create from './create';
import Profile from './profile';
import List from './list';

export default function(){
  const create = Create();
  const profile = Profile();
  const list = List();

  create.events.on('response',function(response){
    const { error, data } = response;
    if(!error){ list.add(data[0]); }
  });


  return { create, profile, list }
}
