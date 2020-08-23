import { Finder } from '../form/inputs';

export default function(){
  const profile = {};
  const element = $('[data-users="profile"]');
  const { inputs } = Finder(element);

  const methods = {
    'read': {
      writable: false,
      value: (user)=>{
        // Set user data
        inputs.all.forEach((input)=>{ input.disable(true); });
      }
    },
    'edit': {
      writable: false,
      value: ()=>{
        inputs.all.forEach((input)=>{ input.disable(false); });
      }
    },
    'on': {
      writable: false,
      value: ()=>{
        element.removeClass('hidden');
        inputs.all.forEach((input)=>{ input.on(); })
      }
    },
    'off': {
      writable: false,
      value: ()=>{
        element.addClass('hidden');
        inputs.all.forEach((input)=>{ input.off(); })

      }
    }
  }

  Object.defineProperties(profile,methods);

  return profile
}
