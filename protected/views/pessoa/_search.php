<?php
/* @var $this PessoaController */
/* @var $model Pessoa */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id_pessoa'); ?>
		<?php echo $form->textField($model,'id_pessoa'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'nm_pessoa'); ?>
		<?php echo $form->textField($model,'nm_pessoa',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'id_cidade'); ?>
		<?php echo $form->textField($model,'id_cidade'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->