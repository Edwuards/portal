<?php

  /**
   *
   */

  require(APPPATH.'/models/Crud.php');

  class Modelo_usuarios extends Crud
  {

    function __construct()
    {
        parent::__construct('usuarios');
    }

    public function existe($persona,$entidad)
    {
      $donde = [['persona','=',$person],['entidad','=',$entidad]];
      $this->resultado = $this->obtener('id',$donde);
      return count($this->resultado['datos']) > 0 ? $this->resultado['datos'][0]['id'] : false;
    }

    public function entidades($persona)
    {
      $donde = [['persona','=',$persona],['activo','=','1']];
      return $this->obtener('id,entidad',$donde);
    }

  }
?>
