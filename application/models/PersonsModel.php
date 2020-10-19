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
      $this->resetResponse();
      $where = [['email','=',$email]];
      $this->response = $this->get('id',$where);
      if(count($this->response['data']) > 0){
        $this->response['data'] = $this->response['data'][0]['id'];
      }
      else{
        $this->response['error'] = 1;
        $this->response['data'] = 'usuario con el correo '.$email.'no existe';
      }

      return $this->response;
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
