<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class Permisions extends CI_Controller {

	private $response;

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('PermisionsModel','Permisions');

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

		if(!$this->response['error']){
			$permision = $this->input->post(NULL);
			$this->response = $this->Permisions->create($permision);
		}


		$this->json($this->response);

	}

	public function get()
	{
		$this->resetResponse();

		$method = $this->input->method();
		if($method != 'post'){
			$this->response['error'] = true;
			$this->response['data'] = 'Solo por metódo POST';
		}
		else{
			$query = $this->input->post('where');
			$query = is_array($query) ? $query : [];
			if($this->session->role < 2){ $query[] = ['request.user','=',$this->session->id]; }
			$this->response = $this->Permisions->find($query);
		}

		$this->json($this->response);

	}

	public function mine()
	{
		$this->resetResponse();

		$method = $this->input->method();
		if($method != 'post'){
			$this->response['error'] = true;
			$this->response['data'] = 'Solo por metódo POST';
		}
		else{
			$query = $this->input->post('where');
			$query = is_array($query) ? $query : [];
			$this->response = $this->Permisions->find($query);
		}

		$this->json($this->response);

	}

	public function update()
	{
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
				$this->response['data'] = 'Necesitas una cluasura where --> [[key,operand,value]]';
			}
		}

		if(!$this->response['error']){
			$aviso = $this->input->post('aviso');
			$email = $this->input->post('email');
			$aviso['modified'] = new DateTime('now', new DateTimeZone('America/Mexico_City'));
			$aviso['modified'] = $aviso['modified']->format('Y-m-d H:i:s');
			$this->response = $this->Permisions->update($aviso,$where);
		}

		if(!$this->response['error']){
			$this->response['data'] = $this->Permisions->find($where)['data'][0];
			$this->Permisions->email([
				'to'=>$email,
				'subject'=>'Permiso Actualizado',
				'message'=>$this->load->view('emails/permision',$this->response['data'],true)
			]);
		}

		$this->json($this->response);

	}

}
