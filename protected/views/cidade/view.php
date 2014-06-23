<?php
/* @var $this CidadeController */
/* @var $model Cidade */

$this->breadcrumbs=array(
	'Cidades'=>array('index'),
	$model->id_cidade,
);

$this->menu=array(
	array('label'=>'List Cidade', 'url'=>array('index')),
	array('label'=>'Create Cidade', 'url'=>array('create')),
	array('label'=>'Update Cidade', 'url'=>array('update', 'id'=>$model->id_cidade)),
	array('label'=>'Delete Cidade', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id_cidade),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Cidade', 'url'=>array('admin')),
);
?>

<h1>View Cidade #<?php echo $model->id_cidade; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id_cidade',
		'nm_cidade',
		'id_estado',
	),
)); ?>
