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

    public function exist($correo)
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
        $code = (string)$random;
        if($user['avatar'] == ''){
          $user['avatar'] = 'https://scontent.fmex1-1.fna.fbcdn.net/v/t1.0-9/87105879_2932147320180000_864174972170403840_n.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=iDIiMDlQrYoAX8EkUIZ&_nc_ht=scontent.fmex1-1.fna&oh=cd1a48c38e0769b499d0cdeab2d1fd67&oe=5EDF6664';
        }
        $user['verified'] = 0;
        $user['role'] = 1;
        $user['code'] = password_hash($random, PASSWORD_DEFAULT);

        $this->response = $this->insert($user);

      }

      if(!$this->response['error']){
        $id = (string)$this->response['data']['id'];
        $this->response['data'] = $this->find([['users.id','=',$id]])['data'][0];
        $this->response['data']['code'] = $code;
      }

      return $this->response;
    }

    public function find($where = [],$order = [],$limit = [])
    {
      $select = '
      users.id,
      avatar,
      CONCAT(name," ",lastname) as fullname,
      name,
      lastname,
      email,
      vacations,
      work_position,
      w.area as work_area,
      w.title as position,
      users.role,
      ';
      foreach (['work_start','birthday'] as $date) {
        $select .= 'UNIX_TIMESTAMP('.$date.') as '.$date.',';
      }
      // if(!count($order)){ $order = [['request.status','desc']]; }

      $join = [
        ['work_positions as w','work_position = w.id']
      ];

      return $this->join($select,$join,$where);


    }

    public function login($user)
    {
      if(!$this->exist($user['email']))
      {
        $this->response['error'] = true;
        $this->response['data'] = 'credenciales incorrectas';
      }

      if(!$this->response['error'])
      {
        $where = [['email','=',$user['email']]];
        $verify = $this->get('*',$where)['data'][0];
        if(!password_verify($user['password'],$verify['password']))
        {
          $this->response['error'] = true;
          $this->response['data'] = 'credenciales incorrectas';
        }
      }

      if(!$this->response['error']){
        unset($verify['password']);
        $verify = $this->find($where)['data'][0];
        $this->session->set_userdata([
          'id'=>$verify['id'],
          'role'=>$verify['role'],
          'name'=>$verify['fullname'],
          'avatar'=>$verify['avatar'],
          'position'=>$verify['position'],
          'verified'=>true
        ]);

        $this->response['data'] = $verify;
      }


      return $this->response;

    }

  }

?>
