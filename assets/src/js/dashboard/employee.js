import { Calendar } from '../calendar/calendar';
import { EmployeeNavigationBars } from '../navs/employee';
import $ from 'jquery';

$(document).ready(()=>{
  const calendar = Calendar();
  const navigation = EmployeeNavigationBars({calendar});
});
