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

    public function create($data)
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
      $user = $data['user'];
      $userTypes = $data['userTypes'];

      $doesNotExist = $this->Persons->exist($user['email'])['error'];

      if($doesNotExist){
        $this->response = $this->Persons->create($user);
      }

      if(!$this->response['error']){
        $person = (string)$this->response['data']['id'];
        $this->addUserTypes($person,$userTypes);
        $this->response = $this->Access->create($person);
      }

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
  		// if(!in_array(1,$this->session->users)){
  		//  validate where clause since user is not admin
  		// }

      return $this->Persons->find($where);
    }


  }

?>
