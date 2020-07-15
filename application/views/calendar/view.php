
<div data-content="calendar" class="w-full">
  <div id="calendar" class="w-full active"></div>
  <?php
    echo $this->load->view('calendar/permissions',[],true);
    echo $this->load->view('calendar/modal',[],true);
  ?>
  </div>
</div>
