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

    private function uploadAvatar($base64)
    {

      preg_match("^data:image\/(?<extension>(?:png|gif|jpg|jpeg));base64,(?<image>.+)$", $base64, $matchings);
      $imageData = base64_decode($matchings['image']);
      $extension = $matchings['extension'];
      $filename = sprintf("%s.%s",(string)uniqid(),$extension);
      while(file_exists(UPLOAD_DIR.'avatars/'.$filename)){ $filename = sprintf("%s.%s",(string)uniqid(),$extension); }
      file_put_contents(UPLOAD_DIR.'avatars/'.$filename, $imageData);

      return $filename;
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

       $person['avatar'] = $this->uploadAvatar($person['avatar']);

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

    public function find($where = [])
    {
      $select = '
      persons.id as id,
      email,
      firstname,
      lastname,
      avatar,
      persons.position as position,
      w.id as area,
      ';

      foreach(['started','created','DOB'] as $date){
        $select .= 'UNIX_TIMESTAMP('.$date.') as '.$date.',';
      }

      $join = [
        ['work_positions as w','w.id = persons.position']
      ];

      return $this->join($select,$join,$where);

    }

  }

?>
