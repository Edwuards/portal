<?php

  /**
   *
   */


  class UsersModel extends MY_Model
  {


    function __construct()
    {
        parent::__construct('users');
        $this->load->model('PersonsModel','Persons');
        $this->load->model('AccessModel','Access');
    }

    private function addUserTypes($person,$types)
    {
      foreach ($types as $type) {
        $this->insert([
          'person'=>$person,
          'type'=>$type,
          'active'=>1
        ]);
      }
    }



    private function setSession($person)
    {
      $where = [
        ['person','=',$person],
        ['active','=','1']
      ];

      $users = [];
      foreach ( $this->get('type',$where)['data'] as $user ){
        array_push($users,$user['type']);
      }

      $apply = [
        'users'=>$users,
        'person'=>$person,
        'verified'=>true
      ];

      $this->session->set_userdata($apply);

    }

    public function create($user)
    {
      /*
        Data Structure
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

      $this->response = $this->Persons->exist($user['email'])['error'];
      $doesNotExist = $this->response['error'];

      if($doesNotExist){ $this->response = $this->Persons->create($user); }

      // if(!$this->response['error']){
      //   array_push($user['userTypes'],2);
      //   $person = (string)$this->response['data'];
      //   $this->addUserTypes($person,$user['userTypes']);
      //   $this->Access->create($person);
      //   $this->find([['persons.id','=',$person]]);
      // }

      return $this->response;
    }

    public function login($user)
    {
      $this->response = $this->Persons->exist($user['email']);

      if(!$this->response['error']){
        $credentials = [
          'person'=>$this->response['data'],
          'password'=>$user['password']
        ];
        $this->response = $this->Access->login($credentials);
      }

      if(!$this->response['error']){
        $this->setSession($credentials['person']);
      }

      return $this->response;

    }

    public function find($where = [])
    {


      // validation of where clause goes here

      $this->response = $this->Persons->find($where);

      if(!$this->response['error']){
        $persons = $this->response;

        foreach ($persons['data'] as &$person) {
          $this->get('type',[['person','=',(string)$person['id']]]);
          $person['userTypes'] = (
            !$this->response['error'] ?
            array_map(function($data){ return $data['type']; },$this->response['data']) :
            [] );
        }unset($person);

        $this->response = $persons;

       }

      return $this->response;

    }


  }

?>
