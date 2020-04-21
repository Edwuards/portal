<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class Home extends CI_Controller {

	private $View;
	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->View = new View($this);


	}

	public function dashboard(){
		$scripts = [
			'js'=>['jquery','index'],
			'css'=>['index']
		];
		$views = ['nav'=>['content'=>'hello']];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

}
