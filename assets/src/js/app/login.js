import { Login } from '../forms/user/login.js';
import $ from 'jquery';

$(document).ready(function(){
  $('#login').append(Login.open());
});
