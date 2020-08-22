<div class="<?php echo $css['cont']; ?>">
  <div class="<?php echo $css['input-cont']; ?> flex flex-col">
    <label class="text-sm text-gray-600"  ><?php echo $label ?></label>
    <select <?php echo attrsToSting($attrs); ?> class="<?php echo $css['input'] ?> h-10 px-2 text-md">
      <?php  echo $options; ?>
    </select>
  </div>
  <p class="helper px-2 w-full"></p>
</div>
