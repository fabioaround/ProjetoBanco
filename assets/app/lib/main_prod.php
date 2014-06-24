<?php
// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');
Yii::setPathOfAlias('editable', dirname(__FILE__).'/../components/widgets/x-editable');



// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'MySkady Produção',
		
	'sourceLanguage' => 'pt_br',
	'language' => 'pt-br',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
	    'application.widgets.*',
		'application.extensions.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'%izg',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
                //@integrator
                'integrator' => array(
                                        'components' => array(
                                                            'integrator' => array('class'=>'application.components.Integrator')
                                      )
                                    ),            
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
                'coreMessages'=>array(
                    'basePath'=>'protected/messages',
                ),
		// uncomment the following to enable URLs in path-format
		/*
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		*/
		// uncomment the following to use a MySQL database
		'db'=>array(
			'class'=>'CDbConnection',
			'connectionString' => 'mysql:host=mysql.myskady.com.br;dbname=myskady;charset=utf8;',
                       // 'connectionString' => 'mysql:host=mysql.myskady.com.br;dbname=myskady;',
			'emulatePrepare' => true,
			'username' => 'myskady',
			'password' => 'prddb1n212',
                        'charset' => 'utf8',
		),

		'integratorDb'=>array(
                            'class'=>'CDbConnection',                                            
                            'connectionString' => 'mysql:host=mysql.myskady.com.br;dbname=myskady03;charset=utf8;',
                            'emulatePrepare' => false,
                            'username' => 'myskady03',
                            'password' => '1ntdb1n212',
                            'charset' => 'utf8',
                  ),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
		// Handling Session
		'session' => array (
		    'class' => 'system.web.CDbHttpSession',
		    'connectionID' => 'db',
		    'sessionTableName' => 'session_storage',
			'timeout' => 90800,
		),
		//X-editable config
		'editable' => array(
				'class'     => 'editable.EditableConfig',
				'form'      => 'plain',        //form style: 'bootstrap', 'jqueryui', 'plain'
				'mode'      => 'popup',            //mode: 'popup' or 'inline'
				'defaults'  => array(              //default settings for all editable elements
				'emptytext' => 'Clique para editar'
				)
		),
		'Smtpmail'=>array(
				'class'=>'application.extensions.smtpmail.PHPMailer',
				'Host'=>"smtp.myskady.com.br",
				'Username'=>'rastreador@myskady.com.br',
				'Password'=>'2Me8j15dtcpEE',
				'Mailer'=>'smtp',
				'Port'=>587,
				'SMTPAuth'=>true
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'admin@myskady.com.br',
	),
	'charset' => 'utf-8'
);
