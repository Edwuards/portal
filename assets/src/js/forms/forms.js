import { HTML } from './templates.js';
import { Form } from './form.js';
import { Rules } from './rules.js';

const Permision = new Form({
  name: 'permision',
  title: 'Permiso',
  html: HTML.permision,
});

const Vacation = new Form({
  name: 'vacation',
  title: 'Vacación',
  html: HTML.vacation,
});

const HomeOffice = new Form({
  name: 'homeOffice',
  title: 'Trabajo desde casa',
  html: HTML.homeOffice,
});

const Sick = new Form({
  name: 'sick',
  title: 'Enfermedad',
  html: HTML.sick,
});

const myProfile = new Form({
  title: 'Mi Perfil',
  name: 'myProfile',
  html: HTML.myProfile,
});

const userProfile = new Form({
  title: 'Perfil de usuario',
  name: 'userProfile',
  html: HTML.userProfile,
});


export {
  Permision,
  Vacation,
  HomeOffice,
  myProfile,
  userProfile,
  Sick
}
