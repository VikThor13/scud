<?php
//require_once 'application/core/context.php';
class Model_Main extends Model
{
	private $_login;
	private $_pass;

	public function __construct($login, $pass){
		$this->_login = $login;
		$this->_pass = $pass;
	}

	public function IsAuthorized()
	{
		$conn = sqlsrv_connect( "NOTEBOOK-VIK\SQLEXPRESS", array( "Database"=>"Authorize", "UID"=>"sa", "PWD"=>"Vik130919940", "CharacterSet"=>"UTF-8"));
		if( $conn ) {      
			$query="SELECT UID FROM Authorize.dbo.Users WHERE login = '".$this->_login."' AND password = '".md5(md5($this->_pass))."'";
			$result=sqlsrv_query($conn, $query);
			if( $result === false )
			{
				 echo "Error in statement preparation/execution.\n";
				 die( print_r( sqlsrv_errors(), true));
			}
			elseif (sqlsrv_fetch_array( $result) == NULL){
				return false;
			}
			else{
				
				$token = md5(time().$this->_login);
				$_SESSION['token'] = $token;
				sqlsrv_close($conn);
				return true;
			}
		}
		else{
			echo "Соединение не удалось, ошибка:";
			die( print_r( sqlsrv_errors(), true));
		}
		sqlsrv_close($conn);
	}	
}
?>