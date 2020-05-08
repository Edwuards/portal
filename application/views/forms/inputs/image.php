<div class="flex flex-col <?php echo $css['cont']; ?> mb-4">
  <label class="text-blue-700 mx-2 my-4 text-md font-bold" for="start"><?php echo $label; ?> </label>
  <input <?php echo attrsToSting($attrs['image']); ?> type="file" >
  <div class="m-auto <?php echo $css['img']; ?>">
    <button type="button" <?php echo attrsToSting($attrs['button']); ?> >
      <img <?php echo attrsToSting($attrs['img']); ?> class="w-full"  >
    </button>
  </div>
</div>
