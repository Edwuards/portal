<div class="<?php echo $css['cont']; ?>">
  <div class="<?php echo $css['input-cont']; ?> input relative ">
    <label class=" text-sm text-gray-600 " for="<?php echo $label; ?>"><?php echo $label; ?></label>
    <input <?php echo attrsToSting($attrs); ?> class="<?php echo $css['input']; ?> h-full w-full bottom-0 text-md " type="<?php echo $type ?>" >
  </div>
  <p class="helper px-2 w-full"></p>
</div>
