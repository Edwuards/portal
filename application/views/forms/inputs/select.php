<div class="<?php echo $css; ?> mb-4">
  <div class=" w-full select mb-1 h-12 relative ">
    <label class="px-2 mb-1 absolute text-md text-blue-700"  ><?php echo $label ?></label>
    <select <?php echo attrsToSting($attrs); ?> class="w-full h-8 px-2 pb-1 absolute bottom-0 text-sm">
      <?php  echo $options; ?>
    </select>
  </div>
  <p class="helper px-2 w-full"></p>
</div>
