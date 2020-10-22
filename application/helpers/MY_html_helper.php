<?php
  function attrsToSting($attrs){
    $html = '';
    foreach ($attrs as $key => $value) {
      $html .= ' '.$key.'="'.$value.'" ';
    }
    return $html;
  };

  function TextInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['type'] = 'text';
    $overWrite['attrs']['data-type'] = 'text';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function CheckBoxInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['type'] = 'checkbox';
    $overWrite['attrs']['data-type'] = 'checkbox';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function NumberInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['type'] = 'number';
    $overWrite['attrs']['data-type'] = 'number';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function DateInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : 'text-center',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['type'] = 'text';
    $overWrite['attrs']['data-type'] = 'date';
    $overWrite['css']['input-cont'] .= ' date';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function TimeInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : 'text-center',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];


    $overWrite['css']['input-cont'] .= ' time';
    $overWrite['type'] = 'text';
    $overWrite['attrs']['data-type'] = 'time';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function PasswordInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['attrs']['data-type'] = 'text';
    $overWrite['type'] = 'password';

    return $ci->load->view('inputs/input',$overWrite,true);
  }

  function SelectInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : '',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : [],
      'options'=> isset($data['options']) ? $data['options'] : ''
    ];

    $overWrite['attrs']['data-type'] = isset($data['attrs']['data-type']) ? $data['attrs']['data-type'] : 'select';

    return $ci->load->view('inputs/select',$overWrite,true);
  }

  function TextAreaInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : 'w-full',
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : 'w-full',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : 'h-full',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];
    $overWrite['attrs']['data-type'] = 'textarea';

    return $ci->load->view('inputs/textarea',$overWrite,true);
  }

  function ImageInput($data){
    $ci=& get_instance();
    $overWrite = [
      'label'=> isset($data['label']) ? $data['label'] : '',
      'css'=>[
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
        'img'=> isset($data['css']['img']) ? $data['css']['img'] : ''
      ],
      'attrs'=>[
        'img'=> isset($data['attrs']['img']) ? $data['attrs']['img'] : [],
        'button'=> isset($data['attrs']['button']) ? $data['attrs']['button'] : [],
        'input'=> isset($data['attrs']['input']) ? $data['attrs']['input'] : []
      ]
    ];

    $overWrite['attrs']['img']['data-type'] = 'image';
    $overWrite['attrs']['button']['data-type'] = 'image';
    $overWrite['attrs']['input']['data-type'] = 'image';

    return $ci->load->view('inputs/image',$overWrite,true);

  }

  function StatusInput($data){
    $overWrite = [
      'text'=> isset($data['text']) ? $data['text'] : '',
      'css'=> isset($data['css']) ? $data['css'] : '',
      'indicator'=>isset($data['indicator']) ? $data['indicator'] : [],
      'select'=>isset($data['select']) ? $data['select'] : [],
    ];
    $overWrite['indicator']['data-type'] = 'status';
    $overWrite['select']['data-type'] = 'status';

    return '<div class="'.$overWrite['css'].' mx-2 flex items-center">
      <div '.attrsToSting($overWrite['indicator']).' class="bg-yellow-500 rounded-full w-3 h-3 mx-2"></div>
      <select class="bg-white" '.attrsToSting($overWrite['select']).' >
        <option value="2" >Pendiente</option>
        <option value="1" >Autorizado</option>
        <option value="0" >Denegado</option>
      </select>
    </div>';

  }

  function Button($data){
    $ci=& get_instance();
    $overWrite = [
      'text'=> isset($data['text']) ? $data['text'] : '',
      'css'=> isset($data['css']) ? $data['css'] : 'py-2 px-4 mx-2 text-sm bg-blue-700 text-white',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['attrs']['data-type'] = 'button';

    $button = '<button '.attrsToSting($overWrite['attrs']).'class="'.$overWrite['css'].'" type="button" >'.$overWrite['text'].'</button>';

    return $button;

  }


  function FormFooter($buttons){
    $html = '';
    foreach ($buttons as $btn) { $html .= $btn.' '; };
    return '<div class="footer w-full pt-6">
              <div data="error" class="h-10 text-red-600 text-md py-2 text-center" >
              </div>
              <div class="flex"> '.$html.'</div>
            </div>';
  }

  function WorkAreasOptions(){
    $ci =& get_instance();
    $ci->load->model('WorkAreasModel','WorkAreas');
    $result = ['positions'=>'','areas'=>''];
    $positions = $ci->WorkAreas->positions()['data'];
    $areas = $ci->WorkAreas->get('id,area')['data'];
    foreach ($positions as $position) {
      $result['positions'] .= '<option data-area="'.$position['area'].'" value="'.$position['id'].'">'.$position['position'].'</option>';
    }
    foreach ($areas as $area) {
      $result['areas'] .= '<option  value="'.$area['id'].'">'.$area['area'].'</option>';
    }

    return $result;

  }

?>
