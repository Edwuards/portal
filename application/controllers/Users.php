<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class Users extends MY_Controller {


	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('UsersModel','Users');
	}

	public function login()
	{
		$this->isPost();
		if($this->session->verified){ return true; }
		else{
			$this->json($this->Users->login($this->input->post(null)));
		}

	}

	public function get()
	{

		$this->isPost();
		$this->isLoggedIn();

		$where = $this->input->post('where');
		$where = $where ? $where : [];

		$this->json($this->Users->find($where));

	}


}
