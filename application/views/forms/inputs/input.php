<div class="<?php echo $css['cont']; ?>">
  <div class="<?php echo $css['input-cont']; ?> flex flex-col">
    <label class=" text-sm text-gray-600 " for="<?php echo $label; ?>"><?php echo $label; ?></label>
    <input <?php echo attrsToSting($attrs); ?> class="<?php echo $css['input']; ?> h-10 text-md " type="<?php echo $type ?>" >
  </div>
  <p class="helper px-2 w-full"></p>
</div>
