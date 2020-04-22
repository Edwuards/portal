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
			'css'=>['base','index']
		];
		$views = [
			'nav'=>['content'=>'hello'],
			'content'=>false
		];
		$this->View->render(['scripts'=>$scripts,'views'=>$views,'title'=>'dashboard']);
	}

}
