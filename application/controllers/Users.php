<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class Users extends CI_Controller {

	private $response;

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('UsersModel','Users');
	}

	private function json($data)
	{
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($data));
	}

	private function resetResponse()
	{
		$this->response = ['error'=>false,'data'=>false];
	}

	public function create()
	{
		$this->resetResponse();

		$method = $this->input->method();
		if($method != 'post'){
			$this->response['error'] = true;
			$this->response['data'] = 'Solo por metódo POST';
		}
		else{
			$user = $this->input->post(NULL);
			$this->response = $this->Users->create($user);
			if(!$this->response['error']){
				$id = $this->response['data']['id'];
				$this->response = $this->get([['id','=',$id]]);
			}
		}

		$this->json($this->response);

	}

	public function get(){
		$this->resetResponse();

		$method = $this->input->method();
		if($method != 'post'){
			$this->response['error'] = true;
			$this->response['data'] = 'Solo por metódo POST';
		}
		else{
			$query = $this->input->post('where');
			$query = is_array($query) ? $query : [];
			$this->response = $this->Users->find($query);
		}

		$this->json($this->response);

	}

	public function edit(){
		$this->resetResponse();

		$method = $this->input->method();
		if($method != 'post'){
			$this->response['error'] = true;
			$this->response['data'] = 'Solo por metódo POST';
		}

		if(!$this->response['error']){
			$where = $this->input->post('where');
			if( !is_array($where) || (count($where) == 0) ){
				$this->response['error'] = true;
				$this->response['message'] = 'Necesitas una cluasura where --> [[key,operand,value]]';
			}
		}

		if(!$this->response['error']){
			$user = $this->input->post('user');
			$this->response = $this->Users->update($user,$where);
		}

		if(!$this->response['error']){
			$this->response['data'] = $this->Users->find($where)['data'][0]; 
		}

		$this->json($this->response);

	}

}
