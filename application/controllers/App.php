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
		$this->load->model('UsersModel','users');
	}

	public function index()
	{

		if(!$this->session->verified){ redirect('app/login'); }
		else{ redirect('app/dashboard',301); }
	}

	public function dashboard()
	{
		if(!$this->session->verified){ redirect('app/login'); }
		$dashboard = 'dashboard/admin';
		$scripts = [
			'js'=>['jquery','admin'],
			'css'=>['base','index']
		];
		$views = [ $dashboard => [] ];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

	public function login()
	{
		$scripts = [
			'js'=>['jquery'],
			'css'=>['base','index']
		];
		$views = [ 'app/login' => [] ];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);

	}



}
