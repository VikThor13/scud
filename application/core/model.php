<?php
class Model
{
	public function get_data()
	{
		return array();
	}

	protected function get_template_data($host)
	{
		return Config::$mo[$host];
	}
}
?>