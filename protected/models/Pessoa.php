<?php

/**
 * This is the model class for table "pessoa".
 *
 * The followings are the available columns in table 'pessoa':
 * @property integer $id_pessoa
 * @property string $nm_pessoa
 * @property integer $id_cidade
 *
 * The followings are the available model relations:
 * @property Cidade $idCidade
 */
class Pessoa extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'pessoa';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nm_pessoa', 'required'),
			array('id_cidade', 'numerical', 'integerOnly'=>true),
			array('nm_pessoa', 'length', 'max'=>45),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id_pessoa, nm_pessoa, id_cidade', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'idCidade' => array(self::BELONGS_TO, 'Cidade', 'id_cidade'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_pessoa' => 'Id Pessoa',
			'nm_pessoa' => 'Nm Pessoa',
			'id_cidade' => 'Id Cidade',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id_pessoa',$this->id_pessoa);
		$criteria->compare('nm_pessoa',$this->nm_pessoa,true);
		$criteria->compare('id_cidade',$this->id_cidade);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Pessoa the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
        
//        public function getNomePessoa($term)
//        {
////            $criteria=new CDbCriteria ( array(
////                'condition' => 'nm_pessoa LIKE :term',
////                'params' => array (':term' => '%$term%') 
////                 ));
////                 
////                $criteria -> distinct = true;
////                $criteria -> select = 'nm_pessoa';
////                
////                $query = $this->findAll($criteria);
////                $list = array();
////                foreach ($query as $criteria){
////                $list[] = $criteria -> nm_pessoa;    
////                }
////                return $list;
//            return array('Teste1','Teste1','Teste1');
//        }
        
        public function getAutoCompleteNomePessoa($term)
       {
               $q = new CDbCriteria( array(
                       'condition' => "nm_pessoa LIKE :term",
                       'params'    => array(':term' => "%$term%")
               ));

               $q->distinct = true;
               $q->select = array('nm_pessoa','id_pessoa');

               $query = $this->findAll($q);
               $list = array();
               foreach($query as $q){
                       $list[] = $q->nm_pessoa;
               }
               return $list;
       }
        
}
