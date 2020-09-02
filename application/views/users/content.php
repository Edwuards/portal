<div data-content="users" class="absolute w-full h-full bg-gray-300 overflow-y-scroll hidden">
  <?php foreach (['list','profile','create'] as $view) { $this->load->view('users/'.$view); } ?>
</div>
