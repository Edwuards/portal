<?php

  /**
   *
   */


  class UsersModel extends MY_Model
  {

    private $response = [ 'error'=>false, 'data'=>false ];

    function __construct()
    {
        parent::__construct('users');
        $this->load->model('PersonsModel','persons');
        $this->load->model('AccessModel','access');
    }


    public function create($data)
    {
      /*
        $user = [
          'firstname'=>'',
          'lastname'=>'',
          'avatar'=>'',
          'position'=>'',
          'email'=>'',
          'DOB'=>''
        ];

        $userTypes = [int,int]
      */
      $user = $data['user'];
      $userTypes = $data['userTypes'];

      $this->response = $this->persons->exist($user['email']);

      if(!$this->response['error']){
        $this->response = $this->persons->create($user);
      }

      if(!$this->response['error']){
        $person = (string)$this->response['data']['id'];
        foreach ($userTypes as $type) {
          $this->insert([
            'person'=>$person,
            'type'=>$type,
            'active'=>1
          ]);
        }
      }

      if(!$this->response['error']){
        $this->response = $this->access->create($person);
      }


      return $this->response;
    }



  }

?>
