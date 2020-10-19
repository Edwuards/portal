<?php

  /**
   *
   */


  class AccessModel extends MY_Model
  {

    private $response = [ 'error'=>false, 'data'=>false ];

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

  }

?>
