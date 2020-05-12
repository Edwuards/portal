<?php

  /**
   *
   */

  require(APPPATH.'/models/Crud.php');

  class UsersModel extends Crud
  {

    private $response = [ 'error'=>false, 'data'=>false ];

    function __construct()
    {
        parent::__construct('users');
    }

    private function exist($correo)
    {
      $donde = [['email','=',$correo]];
      $this->result = $this->get('id',$donde);
      return count($this->result['data']) > 0 ? $this->result['data'][0]['id'] : false;
    }

    public function create($user)
    {
      $this->response = [ 'error'=>false, 'data'=>false ];
      $exist = $this->exist($user['email']);

      if($exist){
        $this->response['error'] = true; $this->response['data'] = 'usuario con el correo '.$user['email'].' ya existe';
      }

      if(!$this->response['error']){
        $random = rand(10,20);
        $multi = rand(2,6);
        for ($i=0; $i < 5; $i++) { $random *= $multi; }
        $random = $user['name'].$user['lastname'].(string)$random;
        $user['avatar'] = 'https://scontent.fmex1-1.fna.fbcdn.net/v/t1.0-9/87105879_2932147320180000_864174972170403840_n.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=iDIiMDlQrYoAX8EkUIZ&_nc_ht=scontent.fmex1-1.fna&oh=cd1a48c38e0769b499d0cdeab2d1fd67&oe=5EDF6664';
        $user['password'] = password_hash($random,PASSWORD_DEFAULT);
        $user['role'] = 1;

        $this->response = $this->insert($user);
      }

      if(!$this->response['error']){
        $id = (string)$this->response['data']['id'];
        $this->response['data'] = $this->find([['id','=',$id]])['data'][0];
      }

      return $this->response;
    }

    public function find($where = [],$order = [],$limit = [])
    {
      $select = 'id,name,lastname,email,vacations,';
      foreach (['work_start','birthday'] as $date) {
        $select .= 'UNIX_TIMESTAMP('.$date.') as '.$date.',';
      }
      return  $this->get($select,$where,$order,$limit);
    }

  }

?>
