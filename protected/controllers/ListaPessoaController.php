<?php

class ListaPessoaController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column1';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
                $model = new Pessoa;
                $model->unsetAttributes();
//		$dataProvider=new CActiveDataProvider('Pessoa');
		$this->render('index',array(
                    'model' => $model,
                    'dataProvider'=>$model->search()
		));
	}
        
//        public function actionAutoCompleteNomePessoa($term)
//        {
//            echo CJSON::encode(Pessoa::model()->getNomePessoa($term));
//        }
        
        public function actionAutoCompleteNomePessoa($term)
        {
          echo CJSON::encode(Pessoa::model()->getAutoCompleteNomePessoa($term));
        }
        
	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Estado the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Pessoa::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Estado $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='estado-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}