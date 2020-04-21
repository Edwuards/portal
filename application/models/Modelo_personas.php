<?php

  /**
   *
   */

  require(APPPATH.'/models/Crud.php');

  class Modelo_personas extends Crud
  {

    private $resultado = [ 'error'=>0, 'datos'=>false ];

    function __construct()
    {
        parent::__construct('personas');
    }

    public function existe($correo)
    {
      $donde = [['correo','=',$correo]];
      $this->resultado = $this->obtener('id',$donde);
      return count($this->resultado['datos']) > 0 ? $this->resultado['datos'][0]['id'] : false;
    }
    
  }

?>
