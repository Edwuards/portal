<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class App extends MY_Controller {

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

		$this->isLoggedIn();
		redirect('app/dashboard',301);
	}

	public function dashboard()
	{
		$segment = $this->uri->segment(3,0);
		if(!$this->session->verified){ redirect('app/login'); }
		if(!$segment){ redirect('app/dashboard/calendar/'); }
		else if($segment == 'logout'){ redirect('app/logout'); }

		$user = in_array('1',$this->session->users) ? 'admin' : 'employee';
		$dashboard = 'dashboard/'.$user;

		$scripts = [
			'js'=>['jquery',$user],
			'css'=>['base','index']
		];
		$views = [ $dashboard => [] ];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

	public function login()
	{
		if(!$this->session->verified){
			$scripts = [
				'js'=>['jquery','login'],
				'css'=>['base','index']
			];
			$views = [ 'app/login' => [] ];
			$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
		}
		else{
			redirect('app/dashboard/calendar/');
		}

	}

	public function logout(){
		$this->session->unset_userdata(['person','verified','users']);
		redirect('app/login');
	}


	public function test()
	{
		$this->json(sprintf("%s.%s",(string)uniqid(),'png'));
	}



}
