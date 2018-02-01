<?php
/*
class Context extends mysqli
{
    private $db_conn;

  	public function __construct($host, $user, $pass, $db) {
        $this->db_conn = new mysqli($host, $user, $pass, $db); 
    }

	public function InsertHandling($fields, $files){
        if ($this->db_conn->connect_errno) {
            die("Не удалось подключиться к MySQL: " . $this->db_conn->connect_error);
        }
        $query = $this->InsertBuilder($fields, $files);		
		$this->db_conn->query($query);
	}

    private function InsertBuilder($fields, $files)
    {
        $list_keys = [ 
            "Date",
            "Type",
            "Surname" ,
            "Name" ,
            "Patronymic" ,
            "Email" ,
            "Phone" ,
            "Radio" ,
            "Organization" ,
            "SocialStatus" ,
            "Zip-code" ,
            "Country" ,
            "Region" ,
            "Area" ,
            "City" ,
            "Street" ,
            "House" ,
            "Housing" ,
            "Apartment" ,
            "Text", 
        ];
        $keys="";
        $values = "";
        foreach ($list_keys as $key) {
            if ($fields[$key] != "" ){
                if ($keys!="") $keys.=",";
                $keys.=$key;
                if ($values!="") $values.=",";
                $values.="'".$fields[$key]."'"; 
            }
        }
        foreach ($files as $key => $file){
            if ($file["orig_name"] != "" ){
                if ($keys!="") $keys.=",";
                $keys.=$key."_name";
                if ($values!="") $values.=",";
                $values.="'".$file["orig_name"]."'";
                if ($keys!="") $keys.=",";
                $keys.=$key."_anchor";
                if ($values!="") $values.=",";
                $values.="'".$file["anchor"]."'"; 
            }
        }
        return "INSERT INTO elpriem_mo(".$keys.") VALUES (".$values.")"; 
    }
}*/
?>