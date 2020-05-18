<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class App extends CI_Controller {

	private $View;
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('html');
		$this->View = new View($this);
	}

	public function index(){
		if(!$this->session->verified){ redirect('app/login'); }
		else{ redirect('app/dashboard',301); }
	}

	public function login()
	{
		$scripts = [
			'js'=>['jquery','login'],
			'css'=>['base','index']
		];
		$views = ['login'=>''];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'Login']);
	}

	public function logout()
	{
		// $method = $this->input->method();
		// if($method != 'post')
		// {
		// 	redirect('app/dashboard');
		// }
		// else{
			$this->session->sess_destroy();
		// }
	}

	public function dashboard()
	{
		if(!$this->session->verified){ redirect('app/login'); }

		$scripts = [
			'js'=>['jquery','app'],
			'css'=>['base','index']
		];
		$views = ['content'=>''];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

	public function forms()
	{

		$method = $this->input->method();
		if($method != 'post')
		{
			redirect('app/login');
		}

		$name = $this->input->post('name');
		if($name !== 'users/login' && !$this->session->verified )
		{
			redirect('app/login');
		}

		$html = $this->load->view('forms/'.$name,'',true);
		$this->output
		->set_content_type('text/html')
		->set_output($html);
	}


}
