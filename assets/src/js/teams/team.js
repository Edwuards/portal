import Create from './create';

export default function(users){
  return {
    create: Create(users)
  }
}
