<?php
/* @var $this ClienteController */
/* @var $model Cliente */
/* @var $form CActiveForm */
?>

<div class="form-inline">

	<?php $form=$this->beginWidget('EBootstrapActiveForm', array(
		'action'=> Yii::app()->createUrl($this->route),
		'method'=>'get',
	)); ?>

	<?php
    $form->widget('zii.widgets.jui.CJuiAutoComplete',array(
      	'name'=>'nm_pessoa',
		     'model' => $pessoa,
       	 'source'=> Yii::app()->createUrl("/listaPessoa/autoCompleteNomePessoa"),
       	 'options'=>array(
       		  'minLength'=>'1',
       	  ),
       	'htmlOptions'=>array(
			       'placeholder' => 'Nome da Pessoa',
       		 'style'=>'height:20px; width: 107px;',
       	),
    ));
?>
  <button type="submit" class="btn btn-info">Buscar</button>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
