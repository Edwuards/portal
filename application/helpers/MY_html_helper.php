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

    return $ci->load->view('forms/inputs/input',$overWrite,true);
  }

  function DateInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : 'h-8',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : 'text-center',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : 'w-24',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['type'] = 'text';
    $overWrite['attrs']['data-type'] = 'date';
    $overWrite['css']['input-cont'] .= ' date';

    return $ci->load->view('forms/inputs/input',$overWrite,true);
  }

  function TimeInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input-cont'=> isset($data['css']['input-cont']) ? $data['css']['input-cont'] : 'h-8',
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : 'text-center',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : 'w-16',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];


    $overWrite['css']['input-cont'] .= ' time';
    $overWrite['type'] = 'text';
    $overWrite['attrs']['data-type'] = 'time';

    return $ci->load->view('forms/inputs/input',$overWrite,true);
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

    $overWrite['attrs']['data-type'] = 'password';
    $overWrite['type'] = 'password';

    return $ci->load->view('forms/inputs/input',$overWrite,true);
  }

  function SelectInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> isset($data['css']) ? $data['css'] : '',
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : [],
      'options'=> isset($data['options']) ? $data['options'] : ''
    ];

    $overWrite['attrs']['data-type'] = isset($data['attrs']['data-type']) ? $data['attrs']['data-type'] : 'select';

    return $ci->load->view('forms/inputs/select',$overWrite,true);
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

    return $ci->load->view('forms/inputs/textarea',$overWrite,true);
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

    return $ci->load->view('forms/inputs/image',$overWrite,true);

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
    return '<div class="footer w-full mt-6">
              <div data="error" class="text-red-600 text-sm my-6 text-center" >
              </div>
              <div class="flex"> '.$html.'</div>
            </div>';
  }

?>
