<div class="flex flex-col <?php echo (isset($css['cont']) ? $css['cont'] : ''); ?> mb-4">
  <label class="text-blue-700 mx-2 my-4 text-md font-bold" for="start"><?php echo $label; ?> </label>
  <input data-group="<?php echo $group; ?>" class="hidden" type="file" name="<?php echo $name; ?>" value="">
  <div class="m-auto <?php echo (isset($css['img']) ? $css['img'] : ''); ?>">
    <button type="button" name="upload">
      <img class="w-full" src="https://www.androfast.com/wp-content/uploads/2018/01/placeholder.png" alt="">
    </button>
  </div>
</div>
