<?php
/* @var $this ClienteController */
/* @var $model Cliente */
/* @var $form CActiveForm */
?>

<div class="form-inline">
<?php $form=$this->beginWidget('CActiveForm', array(
               'action'=> Yii::app()->createUrl($this->route),
               'method'=>'get',
       )); ?>

<?php
//   $form->widget('zii.widgets.jui.CJuiAutoComplete',array(
//             'name'=>'nm_pessoa',
//                    'model' => $model,
//               'source'=> Yii::app()->createUrl('/listaPessoa/autoCompleteNomePessoa'),
//               
//               'options'=>array(
//                        'minLength'=>'1',
//                ),
//              'htmlOptions'=>array(
//                              'placeholder' => 'Nome da Pessoa',
//                       'style'=>'height:20px; width: 120px;',
//              ),
//   ));
   
   $form->widget('zii.widgets.jui.CJuiAutoComplete',array(
     'name'=>'nm_cidade',
     'model' => $model,
       'source'=> Yii::app()->createUrl('/listaPessoa/autoCompleteNomePessoa'),
       'options'=>array(
         'minLength'=>'1',
        ),
      'htmlOptions'=>array(
        'placeholder' => 'Nome da Cidade',
        'style'=>'height:20px; width: 107px;',
      ),
  ));
?>
    
<?php $this->endWidget(); ?>
</div>



