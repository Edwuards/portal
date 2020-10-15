import Create from './create';
import Profile from './profile';
import List from './list';

export default function(){
  return {
    create: Create(),
    profile: Profile(),
    list: List()
  }
}
