import { Calendar } from '../calendar/calendar';
import { App } from '../context/employee';
import { Routes } from './routes/employee';
import $ from 'jquery';

$(document).ready(()=>{
  const calendar = new Calendar();
  const app = new App({calendar});
  const router = Routes(app);
});
