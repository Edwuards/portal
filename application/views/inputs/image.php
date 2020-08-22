<div class="flex flex-col <?php echo $css['cont']; ?> mb-4">
  <input class="hidden" <?php echo attrsToSting($attrs['input']); ?> type="file" >
  <div class="<?php echo $css['img']; ?>">
    <button type="button" <?php echo attrsToSting($attrs['button']); ?> class="w-full h-full">
      <img <?php echo attrsToSting($attrs['img']); ?> class="w-full h-full"  >
    </button>
  </div>
</div>
