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

	public function index()
	{
		// if(!$this->session->verified){ redirect('app/login'); }
		// else{ redirect('app/dashboard',301); }
	}

	public function dashboard()
	{
		// if(!$this->session->verified){ redirect('app/login'); }
		$dashboard = 'dashboard/employee';
		$scripts = [
			'js'=>['jquery','employee'],
			'css'=>['base','index']
		];
		$views = [ $dashboard => [] ];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

	public function verify($id,$code)
	{
		$user = null;
		$this->load->model('UsersModel','Users');
		$where = [
			['users.id','=',(string)$id],
			['users.verified','=','0']
		];

		$response = $this->Users->get('email,code',$where);

		if(!$response['error'])
		{
			$user = $response['data'][0];
			$response['error'] = !password_verify($code,$user['code']);
		}


		if(!$response['error'])
		{
			unset($user['code']);
			$scripts = [
				'js'=>['jquery','verify'],
				'css'=>['base','index']
			];
			$views = ['users/verify'=>['user'=>$user]];
			$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'Verificar']);
		}
		else{
			redirect('app/login');
		}

	}








}
