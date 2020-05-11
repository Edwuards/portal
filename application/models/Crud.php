<?php

  class Crud extends CI_Model
  {
    private $tabla;
    private $resultado = [ 'error'=>0, 'data'=>false ];

    public function __construct($tabla)
    {
      parent::__construct();
      $this->load->database();
      $this->tabla = $tabla;
    }

    private function resultReset(){
      $this->resultado = [ 'error'=>0, 'data'=>false ];
    }

    private function revisarParametroDonde($donde)
    {
      $llaves = ['=','!=','>','<','>=','<='];
      if(gettype($donde) != 'array')
      {
        $this->resultado['error'] = 1;
        $this->resultado['data'] = 'el parametro "donde" no es un arreglo';
      }

      if(!$this->resultado['error'])
      {
        foreach($donde as $clausura)
        {
          if(!is_array($clausura))
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = ['toda clasura deben ser un arreglo '];
          }

          if($this->resultado['error']){ break; }

          if(count($clausura) != 3)
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = 'Toda clausura del parametro donde llevara esta estructura --> [columna,operador,valor]';
            break;
          }

          foreach ($clausura as $valor)
          {
            if(gettype($valor) != 'string')
            {
              $this->resultado['error'] = 1;
              $this->resultado['data'] = 'Los valores del arreglo del parametro donde deberan ser cadenas';
              break;
            }
          }

          if($this->resultado['error']){ break; }

          if(!in_array($clausura[1], $llaves))
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = 'el operador de una clausura solo puede un de los siguientes valores: = != > < >= <= ';
          }

          if($this->resultado['error']){ break; }

        }
      }

    }

    private function revisarParametroOrdenar($ordenar)
    {
      $llaves = ['ASC','DESC','asc','desc'];

      if(gettype($ordenar) != 'array')
      {
        $this->resultado['error'] = 1;
        $this->resultado['data'] = 'el parametro "ordenar" no es un arreglo de arreglos';
      }

      if(!$this->resultado['error'])
      {
        foreach($ordenar as $clausura)
        {
          if(!is_array($clausura))
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = ['toda clasura deben ser un arreglo '];
          }

          if($this->resultado['error']){ break; }

          if(count($clausura) != 2)
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = 'Toda clausura del parametro ordenar llevara esta estructura --> [columna,operador]';
            break;
          }

          foreach ($clausura as $valor)
          {
            if(gettype($valor) != 'string')
            {
              $this->resultado['error'] = 1;
              $this->resultado['data'] = 'Los valores del arreglo del parametro ordenar deberan ser cadenas';
              break;
            }
          }

          if($this->resultado['error']){ break; }

          if(!in_array($clausura[1], $llaves))
          {
            $this->resultado['error'] = 1;
            $this->resultado['data'] = 'el operador de una clausura solo puede un de los siguientes valores: ASC, DESC';
          }

          if($this->resultado['error']){ break; }

        }
      }
    }

    private function revisarParametroLimite($limite)
    {

      if(gettype($limite) != 'array')
      {
        $this->resultado['error'] = 1;
        $this->resultado['data'] = 'el parametro "limite" no es un arreglo';
      }

      if(!$this->resultado['error'])
      {
        if(count($limite) > 2){
          $this->resultado['error'] = 1;
          $this->resultado['data'] = 'El arreglo solo debe contener de uno a dos valores';
        }

      }

      if(!$this->resultado['error'])
      {

        foreach ($limite as $valor)
        {
          if(gettype($valor) != 'integer'){
            $this->resultado['error'] = 1;
            $this->resultado['data'] = 'Todos los valores deben ser numeros';
            break;
          }
        }

      }
    }

    private function donde(&$consulta,$donde)
    {
      foreach ($donde as $clausura){ $consulta->where($clausura[0].' '.$clausura[1],$clausura[2]); }
    }

    private function ordenar(&$consulta,$ordenar)
    {
      foreach ($ordenar as $clausura){ $consulta->order_by($clausura[0],$clausura[1]); }
    }

    private function limite(&$consulta,$limite)
    {
      if(count($limite) == 2)
      {
        $consulta->limit($limite[0],$limite[1]);
      }
      else{
        $consulta->limit($limite[0]);
      }
    }

    public function get($selecionar, $donde = [],$ordenar = [],$limite = [])
    {
      $this->resultReset();
      if($selecionar == false || gettype($selecionar) != 'string' || $selecionar == '')
      {
        $selecionar = '*';
      }

      $consulta = $this->db->select($selecionar)->from($this->tabla);

      if($donde != []){ $this->revisarParametroDonde($donde); }

      if(!$this->resultado['error'] && count($donde)){ $this->donde($consulta,$donde); }

      if($ordenar != []){ $this->revisarParametroOrdenar($ordenar); }

      if(!$this->resultado['error'] && count($ordenar)){ $this->ordenar($consulta,$ordenar); }

      if($limite != []){ $this->revisarParametroLimite($limite); }

      if(!$this->resultado['error'] && count($limite)){ $this->limite($consulta,$limite); }

      if(!$this->resultado['error']){ $this->resultado['data'] = $consulta->get()->result_array(); }

      return $this->resultado;

    }

    public function insert($data = [])
    {
      $this->resultReset();
      $this->db->insert($this->tabla,$data);
      $this->resultado['data'] = ['id'=>$this->db->insert_id()];
      return $this->resultado;
    }

    public function update($data = [],$donde = [])
    {
      $this->resultReset();
      if(gettype($data) != 'array' || count($data) == 0)
      {
        $this->resultado['error'] = 1;
        $this->resultado['data'] = 'el primer parametro debe ser un arreglo asociativo';
      }

      if(!$this->resultado['error']){ $consulta = $this->db->set($data); }

      if(!$this->resultado['error'] && ($donde != []) )
      {
        $this->revisarParametroDonde($donde);
        if(!$this->resultado['error']){ $this->donde($consulta,$donde); }
      }

      if(!$this->resultado['error']){
        $consulta->update($this->tabla);
        if($this->db->affected_rows() == 0)
        {
          $this->resultado['error'] = 1;
          $this->resultado['data'] = 'No se realizo ninguna actualizacion con los parametros proporcionados';
        }

      }

      return $this->resultado;

    }

    public function delete($donde = [])
    {
      $this->resultReset();
      $consulta = $this->db;
      if($donde != [])
      {
       $this->revisarParametroDonde($donde);
       if(!$this->resultado['error']){ $this->donde($consulta,$donde); }
      }

      if(!$this->resultado['error']){
        $consulta->delete($this->tabla);
        if($this->db->affected_rows() == 0)
        {
          $this->resultado['error'] = 1;
          $this->resultado['data'] = 'No se borro ningun dato con los parametros proporcionados';
        }
      }

      return $this->resultado;
    }

    public function json($data)
    {
      $this->output
  		->set_content_type('application/json')
  		->set_output(json_encode($data));
    }

  }

?>
