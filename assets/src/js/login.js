import { default as loginInit } from './forms/user/login.js';
import $ from 'jquery';

const Login = loginInit();
$(document).ready(function(){
  $('#login').append(Login.open());
});
