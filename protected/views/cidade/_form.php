<?php
/* @var $this CidadeController */
/* @var $model Cidade */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'cidade-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'nm_cidade'); ?>
		<?php echo $form->textField($model,'nm_cidade',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'nm_cidade'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'nm_estado'); ?>
		<?php 
                    $estadoList = array(null => ''); // estou anulando o valor da array caso ela exista
                    $estadoList = CHtml::listdata($estados, 'id_estado',function($estado) {
                        return CHtml::encode($estado->nm_estado);
                    });
                 ?>
		<?php echo $form->dropDownList($model,'id_estado',$estadoList); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->