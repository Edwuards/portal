import { View } from '../helpers';

export default function (){
  const view = new View({name:'create team',element: $('[data-teams="create"]') });
  return view;
}
