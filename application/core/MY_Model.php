<?php

  class MY_Model extends CI_Model
  {
    private $table;
    protected $response = [ 'error'=>0, 'data'=>false ];

    public function __construct($table)
    {
      parent::__construct();
      $this->load->database();
      $this->table = $table;
    }

    protected function resetResponse(){
      $this->response = [ 'error'=>0, 'data'=>false ];
    }

    private function revisarParametroDonde($donde)
    {
      $llaves = ['=','!=','>','<','>=','<='];
      if(gettype($donde) != 'array')
      {
        $this->response['error'] = 1;
        $this->response['data'] = 'el parametro "donde" no es un arreglo';
      }

      if(!$this->response['error'])
      {
        foreach($donde as $clausura)
        {
          if(!is_array($clausura))
          {
            $this->response['error'] = 1;
            $this->response['data'] = ['toda clasura deben ser un arreglo '];
          }

          if($this->response['error']){ break; }

          if(count($clausura) != 3)
          {
            $this->response['error'] = 1;
            $this->response['data'] = 'Toda clausura del parametro donde llevara esta estructura --> [columna,operador,valor]';
            break;
          }

          foreach ($clausura as $valor)
          {
            if(gettype($valor) != 'string')
            {
              $this->response['error'] = 1;
              $this->response['data'] = 'Los valores del arreglo del parametro donde deberan ser cadenas';
              break;
            }
          }

          if($this->response['error']){ break; }

          if(!in_array($clausura[1], $llaves))
          {
            $this->response['error'] = 1;
            $this->response['data'] = 'el operador de una clausura solo puede un de los siguientes valores: = != > < >= <= ';
          }

          if($this->response['error']){ break; }

        }
      }

    }

    private function revisarParametroOrdenar($ordenar)
    {
      $llaves = ['ASC','DESC','asc','desc'];

      if(gettype($ordenar) != 'array')
      {
        $this->response['error'] = 1;
        $this->response['data'] = 'el parametro "ordenar" no es un arreglo de arreglos';
      }

      if(!$this->response['error'])
      {
        foreach($ordenar as $clausura)
        {
          if(!is_array($clausura))
          {
            $this->response['error'] = 1;
            $this->response['data'] = ['toda clasura deben ser un arreglo '];
          }

          if($this->response['error']){ break; }

          if(count($clausura) != 2)
          {
            $this->response['error'] = 1;
            $this->response['data'] = 'Toda clausura del parametro ordenar llevara esta estructura --> [columna,operador]';
            break;
          }

          foreach ($clausura as $valor)
          {
            if(gettype($valor) != 'string')
            {
              $this->response['error'] = 1;
              $this->response['data'] = 'Los valores del arreglo del parametro ordenar deberan ser cadenas';
              break;
            }
          }

          if($this->response['error']){ break; }

          if(!in_array($clausura[1], $llaves))
          {
            $this->response['error'] = 1;
            $this->response['data'] = 'el operador de una clausura solo puede un de los siguientes valores: ASC, DESC';
          }

          if($this->response['error']){ break; }

        }
      }
    }

    private function revisarParametroLimite($limite)
    {

      if(gettype($limite) != 'array')
      {
        $this->response['error'] = 1;
        $this->response['data'] = 'el parametro "limite" no es un arreglo';
      }

      if(!$this->response['error'])
      {
        if(count($limite) > 2){
          $this->response['error'] = 1;
          $this->response['data'] = 'El arreglo solo debe contener de uno a dos valores';
        }

      }

      if(!$this->response['error'])
      {

        foreach ($limite as $valor)
        {
          if(gettype($valor) != 'integer'){
            $this->response['error'] = 1;
            $this->response['data'] = 'Todos los valores deben ser numeros';
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

    public function get($selecionar, $donde = [],$ordenar = [],$limite = [],$join = [])
    {
      $this->resetResponse();
      if($selecionar == false || gettype($selecionar) != 'string' || $selecionar == '')
      {
        $selecionar = '*';
      }

      $consulta = $this->db->select($selecionar)->from($this->table);

      if($donde != []){ $this->revisarParametroDonde($donde); }

      if(count($join)){ foreach ($join as $clause) { $consulta->join($clause[0],$clause[1]); } }

      if(!$this->response['error'] && count($donde)){ $this->donde($consulta,$donde); }

      if($ordenar != []){ $this->revisarParametroOrdenar($ordenar); }

      if(!$this->response['error'] && count($ordenar)){ $this->ordenar($consulta,$ordenar); }

      if($limite != []){ $this->revisarParametroLimite($limite); }

      if(!$this->response['error'] && count($limite)){ $this->limite($consulta,$limite); }

      if(!$this->response['error']){ $this->response['data'] = $consulta->get()->result_array(); }

      return $this->response;

    }

    public function insert($data = [])
    {
      $this->resetResponse();
      $this->db->insert($this->table,$data);
      $this->response['data'] = ['id'=>$this->db->insert_id()];
      return $this->response;
    }

    public function update($data = [],$donde = [])
    {
      $this->resetResponse();
      if(gettype($data) != 'array' || count($data) == 0)
      {
        $this->response['error'] = 1;
        $this->response['data'] = 'el primer parametro debe ser un arreglo asociativo';
      }

      if(!$this->response['error']){ $consulta = $this->db->set($data); }

      if(!$this->response['error'] && ($donde != []) )
      {
        $this->revisarParametroDonde($donde);
        if(!$this->response['error']){ $this->donde($consulta,$donde); }
      }

      if(!$this->response['error']){
        $consulta->update($this->table);
        if($this->db->affected_rows() == 0)
        {
          $this->response['error'] = 1;
          $this->response['data'] = 'No se realizo ninguna actualizacion con los parametros proporcionados';
        }

      }

      return $this->response;

    }

    public function delete($donde = [])
    {
      $this->resetResponse();
      $consulta = $this->db;
      if($donde != [])
      {
       $this->revisarParametroDonde($donde);
       if(!$this->response['error']){ $this->donde($consulta,$donde); }
      }

      if(!$this->response['error']){
        $consulta->delete($this->table);
        if($this->db->affected_rows() == 0)
        {
          $this->response['error'] = 1;
          $this->response['data'] = 'No se borro ningun dato con los parametros proporcionados';
        }
      }

      return $this->response;
    }

    public function join($select,$join = [],$where = [],$order=[],$limit=[])
    {
      return $this->get($select,$where,$order,$limit,$join);
    }

    public function email($email)
    {

      $this->load->library('email');
      $this->email->from('avisame@figment.com.mx', 'Figment');
      $this->email->to($email['to']);

      $this->email->subject($email['subject']);
      $this->email->message($email['message']);

      $this->email->send();
    }

    public function json($data)
    {
      $this->output
  		->set_content_type('application/json')
  		->set_output(json_encode($data));
    }


  }

?>
