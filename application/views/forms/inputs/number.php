<div class="<?php echo $css ?> mb-4">
  <div class="input mb-1 h-12 relative ">
    <label class="px-2 mb-1 absolute text-md text-blue-700 " for="<?php echo $label; ?>"><?php echo $label; ?></label>
    <input data-group="<?php echo $group; ?>" class="h-8 w-full px-2 pb-1 absolute bottom-0 text-sm" type="number" min="<?php echo $min; ?>" max="<?php echo $max; ?>" name="<?php echo $name; ?>" value="">
  </div>
  <p class="helper px-2 w-full"></p>
</div>
