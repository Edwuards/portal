<?php
  function attrsToSting($attrs){
    $html = '';
    foreach ($attrs as $key => $value) {
      $html .= ' '.$key.'="'.$value.'" ';
    }
    return $html;
  };

  function DateInput($data){
    $ci=& get_instance();
    return $ci->load->view('forms/inputs/date',$data,true);
  }

  function TimeInput($data){
    $ci=& get_instance();
    return $ci->load->view('forms/inputs/time',$data,true);
  }

  function TextInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> [
        'input'=> isset($data['css']['input']) ? $data['css']['input'] : '',
        'cont'=> isset($data['css']['cont']) ? $data['css']['cont'] : '',
      ],
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['attrs']['data-type'] = isset($data['attrs']['data-type']) ? $data['attrs']['data-type'] : 'text';

    return $ci->load->view('forms/inputs/text',$overWrite,true);
  }

  function NumberInput($data){
    $ci=& get_instance();
    $overWrite = [
      'css'=> isset($data['css']) ? $data['css'] : '',
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];

    $overWrite['attrs']['data-type'] = isset($data['attrs']['data-type']) ? $data['attrs']['data-type'] : 'number';

    return $ci->load->view('forms/inputs/number',$overWrite,true);

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
      'css'=> isset($data['css']) ? $data['css'] : '',
      'label'=> isset($data['label']) ? $data['label'] : '',
      'attrs'=> isset($data['attrs']) ? $data['attrs'] : []
    ];
    $overWrite['attrs']['data-type'] = isset($data['attrs']['data-type']) ? $data['attrs']['data-type'] : 'textarea';

    return $ci->load->view('forms/inputs/textarea',$overWrite,true);
  }

  function ImageInput($data){
    $ci=& get_instance();
    $overWrite = [
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
    return '<div class="w-full">
              <div data="error" class="text-red-500 mx-2 w-full text-sm" >
              </div>
              <div class="flex"> '.$html.'</div>
            </div>';
  }

?>
