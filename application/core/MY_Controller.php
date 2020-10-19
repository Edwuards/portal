<?php

  class MY_Controller extends CI_Controller
  {
    private $response = [ 'error'=>0, 'data'=>false ];

    public function __construct()
    {
      parent::__construct();
    }

    private function resetResponse(){
      $this->response = [ 'error'=>0, 'data'=>false ];
    }


    public function json($data)
    {
      $this->output
  		->set_content_type('application/json')
  		->set_output(json_encode($data));
    }

    public function isPost(){
      $method = $this->input->method();
  		if($method != 'post'){ redirect('app/login'); }
    }

    public function isLoggedIn(){
      if(!$this->session->verified){ redirect('app/login'); }
    }


  }

?>
