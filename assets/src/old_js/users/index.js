import { UsersList, UserProfile } from './users.js';
import { Services } from '../services.js';

export default ()=>{
  const Users = new UsersList('list');
  const Profile = new UserProfile();


  Services.get.profile(function(response){
    let {error,data} = response;
    if(!error){
      Profile.user = data;
      Services.get.user({where:[['users.id','!=',Profile.user.id]]},function(response){
        let {error,data} = response;
        if(!error){ data.forEach(user => Users.add(user)); }
      });
    }
  });

  return { Users, Profile }
}
