<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');
// header('Content-Type: application/javascript');

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('log_errors', true);
set_time_limit(0);
ini_set("memory_limit", "1024M");

define('DB_NAME', 'myskady');
define('DB_USER', 'root');
define('DB_PASSWORD', 'mysql');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('SITE_URL', substr('http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . "://" . $_SERVER['HTTP_HOST'] . str_replace(basename($_SERVER['SCRIPT_NAME']), "", $_SERVER['SCRIPT_NAME']), 0, -1));


$output = array();

//FUNCAO DE DEBUG
function debug($erro, $stop=false,$js=false){
	if(!$js){
		echo "<pre>", print_r($erro, 1), "</pre>";
		if($stop) die();
	}else{
		echo "<script> console.log('", print_r($erro, 1), "'); </script>";
	}
}

class Api {
	private $connection;
	private $result = array();
	private $salt = "diamantb2b";

	function __construct(){
		$this->connection = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
		mysql_select_db(DB_NAME) or die(mysql_error());
		mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
		// $re = mysql_query('SHOW VARIABLES LIKE "%character_set%";')or die(mysql_error());
		// while ($r = mysql_fetch_assoc($re)) {print_r ($r); echo "<br />";} exit;
		
		@session_start(); 
		@session_regenerate_id(true);

		return $this->generateformhash($this->salt);
	}

	function __destruct(){
		mysql_close($this->connection);
	}

	public function generateformhash($salt){
    	$hash = md5(mt_rand(1,1000000) . $salt);
    	$_SESSION['csrf_hash'] = $hash;
    	return array('csrf_hash'=>$hash);
	}
	
	public function isvalidformhash($hash){
    	return $_SESSION['csrf_hash'] === $hash;
	}

	public function category_list($parent){
		$sql = "SELECT ce.`cd_categoria`, ce.`ds_ecommerce`, ce.`cd_cat_sup`, ce.`ind_ativo`, ce.`dt_exclusao`, ce.`num_ordem`, (SELECT COUNT(cd_item) FROM item WHERE item.`cd_cat_eco` IN (ce.`cd_categoria`) ) as qtd_prods FROM categoria_ecommerce ce WHERE ce.`cd_cat_sup` = $parent AND ce.`ind_ativo` = 1 ORDER BY  ce.`num_ordem`; ";
		$records = mysql_query($sql, $this->connection); 
		while($rows = mysql_fetch_assoc($records))
			$this->result[] = $rows;

		//debug($this->result);
		return $this->result;
	}

	public function product_list($key=0){
		$where = "i.`cd_cat_eco` IN ($key)";
		$sql = "SELECT i.`cd_item`, i.`cd_agente_emp`, i.`ds_item`, i.`cd_barras_ean13`, i.`preco`, i.`modelo`, i.`linha`, i.`cd_cat_eco` FROM item i WHERE  $where  ORDER BY  i.`ds_item` ASC; ";
		$records = mysql_query($sql, $this->connection); 
		while($rows = mysql_fetch_assoc($records))
			$this->result[] = $rows;

		//debug($this->result);
		return $this->result;
	}

	public function product_item($key){

		if(is_numeric($key) && strlen($key) < 13){
			$where = "i.`cd_item` = '$key' ";
		}else if(is_numeric($key) && strlen($key) == 13){
			$where = "i.`cd_barras_ean13` = '$key' ";
		}else{
			$where = "i.`ds_item` LIKE '%$key%' ";
		}

		$sql = "SELECT i.`cd_item`, i.`cd_agente_emp`, i.`ds_item`, i.`cd_barras_ean13`, i.`preco`, i.`modelo`, i.`linha`, i.`cd_cat_eco` FROM item i WHERE  $whewre ORDER BY  i.`ds_item` ASC; ";
		$records = mysql_query($sql, $this->connection); 
		while($rows = mysql_fetch_assoc($records))
			$this->result[] = $rows;

		//debug($this->result);
		return $this->result;
	}

	public function order_close($data){
		$name='=?UTF-8?B?'.base64_encode('Jackson F. de A. Mafra').'?=';
		$subject='=?UTF-8?B?'.base64_encode("Pedido ".mt_rand(1,1000000)).'?=';
		$headers="From: Jackson F. de A. Mafra <jacksonfdam@gmail.com>\r\n".
			"Reply-To: jacksonfdam@gmail.com\r\n".
			"MIME-Version: 1.0\r\n".
			"Content-Type: text/plain; charset=UTF-8";
		$dados = json_decode($data);
		$mensagem = "Seguem os dados do Pedido - ".mt_rand(1,1000000);
		$mensagem .= print_r($dados,1);

		// echo $mensagem;
		mail('jacksonfdam@gmail.com',$subject,$mensagem,$headers);
	}

	public function authorize($where){
		$strCondition = '';
		if(is_array($where)):
			foreach($where as $key =>$val):
        		$strCondition .= " AND $key = '$val' ";
        	endforeach;
		else:
			$strCondition = $where;
		endif;
		$sql = "SELECT a1.`cd_agente`, a1.`cpf_cnpj`, a1.`apelido`, a1.`tp_cliente`, a.`email`, a.`skype` FROM agente_contato a LEFT OUTER JOIN agente a1 ON a.cd_agente=a1.cd_agente WHERE 1 $strCondition;";
		$records = mysql_query($sql, $this->connection); 
		while($rows = mysql_fetch_assoc($records))
			$this->result[] = $rows;

		//debug($this->result);
		return $this->result;
	}

}


$ApiReflect = new ReflectionClass('Api');
$class_methods = array();
foreach ($ApiReflect->getMethods() as $m):
	if ($m->class == 'Api' && $m->isPublic()):
		$class_methods[] = $m->name;
	endif;
endforeach;

///^\(11\) 9\d{4}-\d{4}|\((?:1[2-9]|[2-9]\d)\) [5-9]\d{3}-\d{4}$/
$Api = new Api();
// if(!isset($_SERVER['HTTP_X_CSRF_TOKEN']) && $_SERVER['HTTP_X_CSRF_TOKEN'] != $_SESSION['csrf_hash']){
// 	header("HTTP/1.0 404 Not Found");
// 	exit(-1);
// }

if (isset($_GET["action"]) && in_array($_GET["action"], $class_methods)):
	$class_func = strtolower($_GET["action"]);
	if(method_exists($Api ,"$class_func" ) ):
		switch ($class_func):
			case 'generateformhash':
				$output = $Api->generateformhash("diamantb2b");
			break;
			case 'order_close':
				$parent = isset($_POST["parent"]) ? $_POST["parent"] : 0;
				$output = $Api->order_close($parent);
			break;
			case 'category_list':
				$parent = isset($_POST["parent"]) ? (int)$_POST["parent"] : 0;
				$output = $Api->category_list($parent);
			break;
			case 'product_list':
				$parent = isset($_POST["parent"]) ?$_POST["parent"] : 0;
				$output = $Api->product_list($parent);
			break;

			case 'authorize':
				$cnpj = isset($_POST["cnpj"]) ? filter_var($_POST["cnpj"], FILTER_SANITIZE_NUMBER_INT) : 0;
				$celular = isset($_POST["celular"]) ? filter_var($_POST["celular"], FILTER_SANITIZE_NUMBER_INT) : 0;
				$email = isset($_POST["email"]) ? filter_var($_POST["email"], FILTER_SANITIZE_EMAIL) : 0;
				$output = $Api->authorize(array("cpf_cnpj"=>$cnpj,"num_celular"=>$celular,"email"=>$email,));
			break;
			
			default:
				break;
		endswitch;
		exit(json_encode($output));
	else:
		header("HTTP/1.0 404 Not Found");
 		die('Método não autorizado');
	endif;
else:
	header("HTTP/1.0 404 Not Found");
 	die('Chamada não autorizada');
endif;