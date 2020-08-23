export function User(data){
  let {
    id,
    firstname,
    lastname,
    email,
    avatar,
    area,
    position
  } = data;

  const methods = {
    'id': { get: ()=>{ return id } },
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
    },
    'area': {
      get: ()=>{ return area; }
    }
  }

  Object.defineProperties(this,methods);
}
