<?php
/* @var $this PessoaController */
/* @var $data Pessoa */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_pessoa')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id_pessoa), array('view', 'id'=>$data->id_pessoa)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('nm_pessoa')); ?>:</b>
	<?php echo CHtml::encode($data->nm_pessoa); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_cidade')); ?>:</b>
	<?php echo CHtml::encode($data->id_cidade); ?>
	<br />


</div>