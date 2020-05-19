<div class="<?php echo $css['cont']; ?>">
  <div class="textarea relative <?php echo $css['input-cont']; ?>">
    <label class="px-2 mb-1 absolute text-md text-gray-700 " for="<?php echo $label; ?>"><?php echo $label; ?></label>
    <textarea <?php echo attrsToSting($attrs); ?> class="<?php echo $css['input']; ?> w-full text-sm" type="text"></textarea>
  </div>
  <p class="helper px-2 w-full"></p>
</div>
