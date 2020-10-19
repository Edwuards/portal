<?php

  /**
   *
   */


  class AccessModel extends MY_Model
  {


    function __construct()
    {
        parent::__construct('access');
    }

    private function verificationCode()
    {
      $random = rand(10,20);
      $multi = rand(2,6);
      for ($i=0; $i < 5; $i++) { $random *= $multi; }
      return (string)$random;
    }


    public function create($person)
    {

      // email is verification sent here
      return $this->insert([
        'person'=>$person,
        'password'=>'',
        'verification'=>$this->verificationCode(),
        'state'=>0
      ]);
    }

    public function setPassword($credentials)
    {

    }

    public function login($credentials)
    {
      $where = [['person','=',$credentials['person']]];
      $this->get('state,password',$where);
      if(!$this->response['error']){
        $password = $this->response['data'][0]['password'];
        $state = $this->response['data'][0]['state'];
      }

      if(!$state){
        $this->response['error'] = 1;
        $this->response['data'] = 'Usuario no a sido verficado';
      }

      if(!$this->response['error']){
        $verify = password_verify($credentials['password'],$password);
        if(!$verify){
          $this->response['error'] = 1;
          $this->response['data'] = 'Credenciales incorrectas';
        }
      }

      return $this->response;


    }

  }

?>
