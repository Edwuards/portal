<?php

  /**
   *
   */

  require(APPPATH.'/models/Crud.php');

  class Modelo_usuarios extends Crud
  {

    function __construct()
    {
        parent::__construct('stores');
    }

    public function test(){
      return $this->obtener('id',[['id','>=','100']],[['id','asc']],[1]);
    }
  }
?>
