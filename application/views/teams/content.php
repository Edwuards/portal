<div data-content="teams" class="absolute w-full h-full bg-gray-300 overflow-y-scroll hidden">
  <?php foreach (['list','edit','create'] as $view) { $this->load->view('teams/'.$view); } ?>
</div>
