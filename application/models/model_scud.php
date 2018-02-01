<?php
//require_once 'application/core/context.php';
class Model_scud extends Model
{
	public function __construct(){
	}

	public function get_data()
	{
		$conn = sqlsrv_connect( "NOTEBOOK-VIK\SQLEXPRESS", array( "Database"=>"FLEX_DB_1660", "UID"=>"sa", "PWD"=>"Vik130919940", "CharacterSet"=>"UTF-8"));
		$where = "";
		$result = null;
		if(isset($_GET["event"])){
			if($_GET["event"]=="101" || $_GET["event"]=="102"){ 
				$where=" WHERE E.EVENT_TYPE_ID = ".$_GET["event"]; 
			}
			elseif($_GET["event"]=="all"){ 
				$where=" WHERE (E.EVENT_TYPE_ID = 101 OR E.EVENT_TYPE_ID = 102)"; 
			}
			if($_GET["date_ot"]!=""){ 
				$where.=" AND E.EVENT_TIME >= CONVERT(datetime,'".$_GET["date_ot"]." 00:00:00.000', 104)"; 
			}
			if($_GET["date_do"]!=""){ 
				$where.=" AND E.EVENT_TIME <= CONVERT(datetime,'".$_GET["date_do"]." 23:59:59.999', 104)"; 
			}
			if($_GET["fio"]!=""){ 
				$fio = explode(" ", $_GET["fio"]);
				$where.=" AND U.LAST_NAME = '".$fio[0]."'";
				if(isset($fio[1])) $where.=" AND U.FIRST_NAME = '".$fio[1]."'";
				if(isset($fio[2])) $where.=" AND U.MIDDLE_NAME = '".$fio[2]."'"; 
			}
		}
		else{
			$where=" WHERE (E.EVENT_TYPE_ID = 101 OR E.EVENT_TYPE_ID = 102)";
		}
		if( $conn ) {      
			$query="SELECT TOP 1000 U.LAST_NAME, U.FIRST_NAME, U.MIDDLE_NAME, D.NAME AS TURNSTILE, ET.TITLE AS EVENT , E.EVENT_TIME AS DATE
				FROM FLEX_DB_1660.dbo.EVENTS AS E 
				join FLEX_DB_1660.dbo.USERS AS U ON E.USER_SID = U.SID
				join FLEX_DB_1660.dbo.EVENT_TYPES AS ET ON E.EVENT_TYPE_ID = ET.ID
				join FLEX_DB_1660.dbo.DEVICES AS D ON D.SID = E.DEVICE_SID ".$where." ORDER BY E.EVENT_TIME DESC";
			$result=sqlsrv_query($conn, $query);
			if( $result === false )
			{
				 echo "Error in statement preparation/execution.\n";
				 die( print_r( sqlsrv_errors(), true));
			}
			if( sqlsrv_fetch( $result) === false )
			{
				echo "Error in retrieving row.\n";
				die( print_r( sqlsrv_errors(), true));
			}
		}
		else{
			echo "Соединение не удалось, ошибка:";
			die( print_r( sqlsrv_errors(), true));
		}
		while ($row = sqlsrv_fetch_array( $result))
		{
			$data [] = $row;
		};
		return $data;
		sqlsrv_close($conn);
	}	
}
?>