import Create from './create';
import List from './list';

export default function(users){
  return {
    create: Create(users),
    list: List(users)
  }
}
