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


export {
  Permision,
  Vacation,
  HomeOffice,
  Sick
}
