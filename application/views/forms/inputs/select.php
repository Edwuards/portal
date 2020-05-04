<div class="<?php echo $css; ?> mb-4">
  <div class=" w-full select mb-1 h-12 relative ">
    <label class="px-2 mb-1 absolute text-md text-blue-700 " for="<?php $label; ?>"><?php echo $label ?></label>
    <select data-group="<?php echo $group; ?>" class="w-full h-8 px-2 pb-1 absolute bottom-0 text-sm" name="<?php echo $name ?>">
      <?php  echo (isset($options) ? $options : ''); ?>
    </select>
  </div>
  <p class="helper px-2 w-full"></p>
</div>
