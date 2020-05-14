<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class App extends CI_Controller {

	private $View;
	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('html');
		$this->View = new View($this);
	}

	public function login(){
		$scripts = [
			'js'=>['login'],
			'css'=>['base','login']
		];
		$views = ['login'=>''];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'Login']);
	}

	public function dashboard(){
		$scripts = [
			'js'=>['jquery','datepicker','index'],
			'css'=>['base','index']
		];
		$views = ['content'=>''];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

	public function forms(){
		$name = $this->input->post('name');
		$html = $this->load->view('forms/'.$name,'',true);
		$this->output
		->set_content_type('text/html')
		->set_output($html);
	}



}