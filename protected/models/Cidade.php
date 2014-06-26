<?php

/**
 * This is the model class for table "cidade".
 *
 * The followings are the available columns in table 'cidade':
 * @property integer $id_cidade
 * @property string $nm_cidade
 * @property integer $id_estado
 *
 * The followings are the available model relations:
 * @property Estado $idEstado
 * @property Pessoa[] $pessoas
 */
class Cidade extends CActiveRecord
{

    private $a = 2;
            
    public function __call($name, $arguments) {
        
        ;
    }
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'cidade';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('nm_cidade', 'required'),
			array('id_estado', 'numerical', 'integerOnly'=>true),
			array('nm_cidade', 'length', 'max'=>45),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id_cidade, nm_cidade, id_estado', 'safe', 'on'=>'search'),
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
			'idEstado' => array(self::BELONGS_TO, 'Estado', 'id_estado'),
			'pessoas' => array(self::HAS_MANY, 'Pessoa', 'id_cidade'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id_cidade' => Yii::t('cidade','id_cidade'),
                        'nm_cidade' => Yii::t('cidade','nm_cidade'),
                        'nm_estado' => Yii::t('estado','nm_estado'),
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

		$criteria->compare('id_cidade',$this->id_cidade);
		$criteria->compare('nm_cidade',$this->nm_cidade,true);
		$criteria->compare('id_estado',$this->id_estado);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Cidade the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
        
        public function getA(){
            return $this->a;
        }
        
        public function setA($valor) {
            $b = 3;
            
            $this->a += $b;
            $this->a = $this->a + $b;
            
        }
}
