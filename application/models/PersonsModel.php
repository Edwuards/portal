<?php

  /**
   *
   */


  class PersonsModel extends MY_Model
  {


    function __construct()
    {
        parent::__construct('persons');
    }

    public function exist($email)
    {
      $where = [['email','=',$email]];
      $this->result = $this->get('id',$where);
      return count($this->result['data']) > 0 ? $this->result['data'][0]['id'] : false;
    }

    public function create($person)
    {
       $this->resetResponse();
       $insert = [
         'firstname'=>'',
         'lastname'=>'',
         'avatar'=>'',
         'position'=>'',
         'email'=>'',
         'DOB'=>''
       ];

       foreach ($insert as $key => $value) { $insert[$key] = $person[$key]; }
       $insert['state'] = 0;

       return $this->insert($insert);
    }

    public function find()
    {
      $where = [['email','=','cesar@figment.com.mx']];
      return $this->get('id,firstname',$where);
    }

  }

?>
