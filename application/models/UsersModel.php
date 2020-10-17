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
        $this->load->model('TypeOfUsersModel','userTypes');
    }



    public function create($data)
    {
      $user = $data['user'];
      $userTypes = $data['userTypes'];
      $exist = $this->persons->exist($user['email']);

      if($exist){
        $this->response['error'] = true;
        $this->response['data'] = 'usuario con el correo '.$user['email'].' ya existe';
      }

      if(!$this->response['error']){
        $this->response = $this->persons->create($user);
      }

      if(!$this->response['error']){
        $random = rand(10,20);
        $multi = rand(2,6);
        for ($i=0; $i < 5; $i++) { $random *= $multi; }
        $verification = password_hash((string)$random, PASSWORD_DEFAULT);
        

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
