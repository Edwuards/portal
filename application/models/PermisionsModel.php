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
      $permision['user'] = 1;
      $permision['status'] = 2;

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
        notice.id as type,
        notice.title as title,
        concat(users.name," ",users.lastname) as user,
        request.status,
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
