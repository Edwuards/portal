<?php

  /**
   *
   */

  require(APPPATH.'/models/Crud.php');

  class PermisionsModel extends Crud
  {

    private $response = [ 'error'=>false, 'data'=>false ];

    function __construct()
    {
        parent::__construct('request');
    }

    public function create($permision)
    {
      $this->response = [ 'error'=>false, 'data'=>false ];
      $date = new DateTime('now', new DateTimeZone('America/Mexico_City'));
      $date = $date->format('Y-m-d H:i:s');
      $permision['status'] = 2;
      $permision['user'] = $this->session->id;
      $permision['modified'] = $date;
      $permision['created'] = $date;

      $this->response = $this->insert($permision);

      if(!$this->response['error']){
        $id = (string)$this->response['data']['id'];
        $this->response['data'] = $this->find([['request.id','=',$id]])['data'][0];
      }

      return $this->response;
    }

    public function find($where = [],$order = [],$limit = [])
    {
      $select = '
        request.id,
        request.user as userID,
        notice.id as type,
        notice.title as title,
        notice.color as color,
        concat(users.name," ",users.lastname) as user,
        request.status,
        users.email,
        users.avatar,
      ';

      foreach (['date_start'=>'start','date_finish'=>'end'] as $key => $alias) {
        $select .= 'UNIX_TIMESTAMP(request.'.$key.') as '.$alias.',';
      }

      if(!count($order)){ $order = [['request.status','desc']]; }

      $join = [
        ['users','request.user = users.id'],
        ['notice','request.notice = notice.id']
      ];

      return $this->join($select,$join,$where,$order);

    }

  }

?>
