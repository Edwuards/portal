export function User(data){
  let {
    firstname,
    lastname,
    email,
    birthday,
    avatar,
    position
  } = data;

  const methods = {
    'firstname': {
      get: ()=>{ return firstname; }
    },
    'lastname': {
      get: ()=>{ return lastname; }
    },
    'fullname': {
      get: ()=>{ return `${firstname} ${lastname}`; }
    },
    'email': {
      get: ()=>{ return email; }
    },
    'avatar': {
      get: ()=>{ return avatar; }
    },
    'position': {
      get: ()=>{ return position; }
    }
  }
}
