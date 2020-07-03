<div class="<?php echo $css ?> mb-4">
  <div class="input mb-1 h-12 relative ">
    <label class="px-2 mb-1 absolute text-md text-blue-700 " for="<?php echo $label; ?>"><?php echo $label; ?></label>
    <input <?php echo attrsToSting($attrs); ?> class="w-full px-2 pb-1 text-md" type="number">
  </div>
  <p class="helper px-2 w-full"></p>
</div>
