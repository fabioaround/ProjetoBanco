<?php

class ListaPessoaController extends Controller
{
 	public $layout='//layouts/column1';

	 public function accessRules()
	 {
		  return array(
			 array('allow', // allow authenticated user
				  'actions'=>array('index', 'view', 'autoCompleteNomePessoa', 'autoCompleteNomeCidade', 'autoCompleteNomeEstado' ),
				  'users'=>array('*'),
			 ),
			 array('deny',  // deny all users
				  'users'=>array('*'),
			 ),
		 );
	 }

	public function actionIndex()
	{
		 $dataProvider=new CActiveDataProvider('Pessoa');
		 $this->render('index',array(
     'dataProvider'=>$dataProvider
		 ));
	}

 public function actionautoCompleteNomePessoa($term)
	{
		 echo CJSON::encode(Pessoa::model()->getAutoCompleteNomePessoa($term));
	}
}
