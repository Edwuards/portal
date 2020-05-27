import { Verify } from '../forms/user/verify.js';
import $ from 'jquery';

$(document).ready(function(){
  $('#login').append(Verify.open());
});
