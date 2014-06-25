<?php
/* @var $this PessoaController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Lista Pessoa',
);

?>

<h1>Lista Pessoas</h1>

<?php

$this->widget('zii.widgets.grid.CGridView', array(
    'dataProvider'=>$dataProvider,
    'columns'=>array(
        array('name' => 'Cod',
              'value' => '$data -> id_pessoa'),
        array('name' => 'Nome',
              'value' => '$data -> nm_pessoa'),
        array('name' => 'Cidade',
              'value' => '$data -> idCidade->nm_cidade'),
        array('name' => 'estado',
              'value' => '$data -> idCidade->idEstado->nm_estado'),
    ),
));

?>