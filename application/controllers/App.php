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
		if($this->session->verified){ redirect('app/dashboard'); }

		$scripts = [
			'js'=>['jquery','login'],
			'css'=>['base','index']
		];
		$views = ['users/login'=>''];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'Login']);
	}

	public function logout()
	{
		$method = $this->input->method();
		if($method != 'post')
		{
			redirect('app/dashboard');
		}
		else{
			$this->session->sess_destroy();
		}
	}

	public function dashboard()
	{
		// if(!$this->session->verified){ redirect('app/login'); }

		$scripts = [
			'js'=>['jquery',($this->session->role > 1 ? 'user2' : 'user1')],
			'css'=>['base','index']
		];
		$views = ['content'=>['work'=>$this->work_areas()]];
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

	public function test(){
		$fecha = new DateTime('now', new DateTimeZone('America/Mexico_City'));
		print_r($fecha->format('Y-m-d H:i:s'));
	}


	private function work_areas()
	{
		$this->load->database();
		$areas = $this->db->select('id,title')
		->from('work_areas')
		->get()->result_array();


		$positions = $this->db->select('id,title,area')
		->from('work_positions')
		->get()->result_array();

		return ['areas'=>$areas,'positions'=>$positions];

	}





}
