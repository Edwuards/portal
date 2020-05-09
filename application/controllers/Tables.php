<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH.'/objects/View.php');

class Table extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('html');
	}


	public function get($table){
		$tables = [
			'userAvisos'=>$this->userAvisos,
			'myAvisos'=> $this->myAvisos,
			'users'=> $this->users;
		];

		if(key_exists($table, $tables)){
			$table = Table($table,$tables[$table]);
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($value [, $options, $depth]))


	}



	private $userAvisos = [
		'buttons'=>[],
		'content'=>[
			[
				'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
				'row'=>Button([
					'css'=>'w-10 h-10 mx-2',
					'text'=>'text-blue-500 fas fa-paper-plane',
					'attrs'=>['name'=>'liberar']
				])
			],
			[
				'header'=>RowHeaderCell(['text'=>'ID','css'=>'w-10']),
				'row'=>RowTextCell(['css'=>'w-10','attrs'=>[ 'name'=>'id' ] ])
			],
			[
				'header'=>RowHeaderCell(['text'=>'Tipo','css'=>'w-20']),
				'row'=>RowTextCell(['css'=>'w-20','attrs'=>[ 'name'=>'request' ] ])
			],
			[
				'header'=>RowHeaderCell(['text'=>'Estado','css'=>'w-40']),
				'row'=>StatusInput([
					'css'=>'w-40',
					'select'=>[ 'name'=>'status', 'data-group'=>'status' ],
					'indicator'=>[ 'name'=>'indicator', 'data-group'=>'status']
				])
			],
			[
				'header'=>RowHeaderCell(['text'=>'User ID','css'=>'w-20']),
				'row'=>RowTextCell(['css'=>'w-20','attrs'=>[ 'name'=>'userId' ] ])
			],
			[
				'header'=>RowHeaderCell(['text'=>'Nombre','css'=>'w-20']),
				'row'=>RowTextCell(['css'=>'w-20','attrs'=>[ 'name'=>'name' ] ])
			]
		]
	];

	private $users = [
		'buttons'=>[
			Button([
				'css'=>'w-10 h-10 mx-2',
				'text'=>'text-xl text-green-500 fas fa-user-plus',
				'attrs'=>['name'=>'addUser']
			]),
			Button([
				'css'=>'w-10 h-10 mx-2',
				'text'=>'text-md text-red-500 fas fa-user-times',
				'attrs'=>['name'=>'deleteUser']
			]),
		],
		'content'=>[
			[
				'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
				'row'=>Button([
					'css'=>'w-10 h-10 mx-2',
					'text'=>'text-blue-500 fas fa-eye',
					'attrs'=>['name'=>'profile']
				])
			],
			[
				'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
				'row'=>Button([
					'css'=>'w-10 h-10 mx-2',
					'text'=>'text-red-500 fas fa-trash-alt',
					'attrs'=>['name'=>'delete']
				])
			],
			[
				'header'=>RowHeaderCell(['text'=>'ID','css'=>'w-10']),
				'row'=>RowTextCell(['css'=>'w-10','attrs'=>[ 'name'=>'id' ] ])
			],
			[
				'header'=>RowHeaderCell(['text'=>'Nombre','css'=>'w-10']),
				'row'=>RowTextCell(['css'=>'w-10','attrs'=>[ 'name'=>'name' ] ])
			]
		]
	];

}
