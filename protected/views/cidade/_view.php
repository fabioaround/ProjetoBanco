<?php
/* @var $this CidadeController */
/* @var $data Cidade */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_cidade')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id_cidade), array('view', 'id'=>$data->id_cidade)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('nm_cidade')); ?>:</b>
	<?php echo CHtml::encode($data->nm_cidade); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_estado')); ?>:</b>
	<?php echo CHtml::encode($data->idEstado->nm_estado); ?>
	<br />


</div>