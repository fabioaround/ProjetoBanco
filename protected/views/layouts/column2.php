<?php /* @var $this Controller */ ?>
  <?php $this->beginContent('//layouts/main'); ?>

  <div class="container-fluid">
	  <div class="row-fluid">
		  <div class="span9">
			  <div id="content">
				  <?php echo $content; ?>
			  </div>
			  <!-- content -->
		  </div>
		  <div class="span3">
			  <?php 
			  $this->widget('EBootstrapSidebar', array(
				  'items'=> 
					  $this->menu
				  ,
			  ));?>
		  </div>
	  </div>
  </div>
  <?php $this->endContent(); ?>