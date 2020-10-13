import Create from './create';
import List from './list';
import Edit from './Edit';

export default function(users){
  return {
    create: Create(users),
    list: List(users),
    view: Edit(users)
  }
}
