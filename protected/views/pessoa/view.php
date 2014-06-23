<?php
/* @var $this PessoaController */
/* @var $model Pessoa */

$this->breadcrumbs=array(
	'Pessoas'=>array('index'),
	$model->id_pessoa,
);

$this->menu=array(
	array('label'=>'List Pessoa', 'url'=>array('index')),
	array('label'=>'Create Pessoa', 'url'=>array('create')),
	array('label'=>'Update Pessoa', 'url'=>array('update', 'id'=>$model->id_pessoa)),
	array('label'=>'Delete Pessoa', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id_pessoa),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Pessoa', 'url'=>array('admin')),
);
?>

<h1>View Pessoa #<?php echo $model->id_pessoa; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id_pessoa',
		'nm_pessoa',
		'id_cidade',
	),
)); ?>
