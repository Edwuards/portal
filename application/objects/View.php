<?php

class View {

  private $CI;
  public function __construct($CI){
    $this->CI = $CI;
  }

	public function render($html){
		/*
			Estructura del parametro
			$html = [
				'titulo'=> string,
				'scripts' => [...],
				'views' => [
					'nombre_de_archivo' => datos_a_pasar
				]
		 	]
		*/

		$header = [
			'scripts'=>$this->loadAssets($html['scripts']),
			'title'=> $html['title']
		];

		$this->CI->load->view('app/header',$header);
		foreach ($html['views'] as $view => $data) { $this->CI->load->view($view,$data); }
		$this->CI->load->view('app/footer');
	}

	private function loadAssets($assets){
		// $assets = ['tipo'=>['nombre_de_archivo'] ]
		// la función regresa una cadena

		$html = '';
		function js($file){ return '<script type="text/javascript" src="'.base_url().'assets/public/js/'.$file.'.js"> </script>'; }
		function css($file){ return '	<link rel="stylesheet" href="'.base_url().'assets/public/css/'.$file.'.css">'; };
		foreach ($assets as $type => $files) { foreach ($files as $file) { $html .= $type($file); } }
		return $html;
	}

}
