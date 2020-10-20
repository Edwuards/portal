<?php

  /**
   *
   */


  class WorkAreasModel extends MY_Model
  {


    function __construct()
    {
        parent::__construct('work_areas');
    }

    public function positions()
    {
      $select = ' wp.id, wp.area, wp.position ';
      $join = [ ['work_positions as wp','wp.area = work_areas.id'] ];
      return $this->join($select,$join);
    }


  }

?>
