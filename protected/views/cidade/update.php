<?php
/* @var $this CidadeController */
/* @var $model Cidade */

$this->breadcrumbs=array(
	'Cidades'=>array('index'),
	$model->id_cidade=>array('view','id'=>$model->id_cidade),
	'Update',
);

$this->menu=array(
	array('label'=>'List Cidade', 'url'=>array('index')),
	array('label'=>'Create Cidade', 'url'=>array('create')),
	array('label'=>'View Cidade', 'url'=>array('view', 'id'=>$model->id_cidade)),
	array('label'=>'Manage Cidade', 'url'=>array('admin')),
);
?>

<h1>Update Cidade <?php echo $model->id_cidade; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>