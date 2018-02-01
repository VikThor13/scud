<?php
class Controller_scud extends Controller
{
	function action_index()
	{
		$this->model = new Model_scud();
		$data = $this->model->get_data(); 
		$this->view->generate('scud_view.html', 'template_view.html', $data);
	}
}
?>