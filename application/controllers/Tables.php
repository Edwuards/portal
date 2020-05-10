<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tables extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('html');
	}

	public function get($table)
	{
		$tables = [
			'userAvisos',
			'myAvisos',
			'users'
		];

		if(in_array($table, $tables)){
			$table = Table($this->{$table}());
		}
		else{
			$table = ['error'=>true,'message'=>'La mesa no que solicitas no existe' ];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($table));

	}

	private function userAvisos()
	{
		return [
			'buttons'=>[],
			'content'=>[
				[
					'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
					'row'=>Button([
						'css'=>'w-10 h-10 mx-2',
						'text'=>'<i class="text-blue-500 fas fa-paper-plane"></i>',
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
	}

	private function myAvisos()
	{
		return [
			'buttons'=>[],
			'content'=>[
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
			]
		];
	}


	private function users()
	{
		return [
			'buttons'=>[
				Button([
					'css'=>'w-10 h-10 mx-2',
					'text'=>'<i class="text-xl text-green-500 fas fa-user-plus"></i>',
					'attrs'=>['name'=>'addUser']
				]),
			],
			'content'=>[
				[
					'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
					'row'=>Button([
						'css'=>'w-10 h-10 mx-2',
						'text'=>'<i class="text-blue-500 fas fa-eye"></i>',
						'attrs'=>['name'=>'profile']
					])
				],
				[
					'header'=>RowHeaderCell(['text'=>'','css'=>'w-10']),
					'row'=>Button([
						'css'=>'w-10 h-10 mx-2',
						'text'=>'<i class="text-red-500 fas fa-trash-alt"></i>',
						'attrs'=>['name'=>'deleteUser']
					])
				],
				[
					'header'=>RowHeaderCell(['text'=>'ID','css'=>'w-10']),
					'row'=>RowTextCell(['css'=>'w-10','attrs'=>[ 'name'=>'id' ] ])
				],
				[
					'header'=>RowHeaderCell(['text'=>'Nombre','css'=>'w-40']),
					'row'=>RowTextCell(['css'=>'w-40','attrs'=>[ 'name'=>'name' ] ])
				]
			]
		];
	}


}
