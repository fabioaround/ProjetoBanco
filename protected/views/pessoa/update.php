<?php
/* @var $this PessoaController */
/* @var $model Pessoa */

$this->breadcrumbs=array(
	'Pessoas'=>array('index'),
	$model->id_pessoa=>array('view','id'=>$model->id_pessoa),
	'Update',
);

$this->menu=array(
	array('label'=>'List Pessoa', 'url'=>array('index')),
	array('label'=>'Create Pessoa', 'url'=>array('create')),
	array('label'=>'View Pessoa', 'url'=>array('view', 'id'=>$model->id_pessoa)),
	array('label'=>'Manage Pessoa', 'url'=>array('admin')),
);
?>

<h1>Update Pessoa <?php echo $model->id_pessoa; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>