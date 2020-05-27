<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------
| email params
| -------------------------------------------------------------------
| 
|
*/

$config['mailtype']     = 'html';
//$config['priority']     = 3;
$config['protocol']     = 'smtp';
$config['smtp_host']    = 'ssl://mail.figment.com.mx';
$config['smtp_port']    = 465; //587
//$config['smtp_crypto']  = '';
$config['smtp_user']    = 'avisame@figment.com.mx';
$config['smtp_pass']    = 'c7@ofzTM!2m';
$config['charset'] 			= 'utf-8';
$config['smtp_timeout'] = 20;
$config['newline']      = "\r\n";