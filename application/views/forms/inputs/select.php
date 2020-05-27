<div class="<?php echo $css['cont']; ?> mb-2">
  <div class="<?php echo $css['input-cont']; ?> select relative ">
    <label class="text-sm text-gray-600"  ><?php echo $label ?></label>
    <select <?php echo attrsToSting($attrs); ?> class="w-full h-8 px-2 pb-1  bottom-0 text-mf">
      <?php  echo $options; ?>
    </select>
  </div>
  <p class="helper px-2 w-full"></p>
</div>
