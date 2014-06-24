<?php 

Yii::import('zii.widgets.grid.CButtonColumn');

class EBootstrapButtonColumn extends CButtonColumn {
	
	public $viewButtonLabel = '<i class="icon icon-info-sign"></i>';
	public $viewButtonImageUrl = false;
	
	public $updateButtonLabel = '<i class="icon icon-pencil"></i>';
	public $updateButtonImageUrl = false;
	
	public $deleteButtonLabel = '<i class="icon icon-trash"></i>';
	public $deleteButtonImageUrl = false;
	
	public function init() {
		$this->viewButtonLabel = '<i class="icon-white icon icon-info-sign" title="' . Yii::t('global', 'info') . '"></i>';
		$this->updateButtonLabel = '<i class="icon-white icon icon-pencil" title="' . Yii::t('global', 'editar') . '"></i>';
		$this->deleteButtonLabel = '<i class="icon-white icon icon-trash" title="' . Yii::t('global', 'remover') . '"></i>';		
		$this->viewButtonOptions['class'] = 'view btn btn-inverse';
		$this->updateButtonOptions['class'] = 'update btn btn-inverse';
		$this->deleteButtonOptions['class'] = 'delete btn btn-inverse';
		parent::init();
	}
}

?>