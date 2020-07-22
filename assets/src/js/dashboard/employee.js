import { Calendar } from '../calendar/calendar';
import { Navigation } from '../navs/employee';
import { Context } from '../context/employee';
import { Menu } from '../menu/employee';
import $ from 'jquery';

$(document).ready(()=>{
  const calendar = new Calendar();
  const navigation = new Navigation({calendar});
  const context = new Context({calendar});
  const menu = new Menu({context,navigation});
});
