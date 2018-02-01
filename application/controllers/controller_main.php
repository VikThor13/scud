<?php
class Controller_Main extends Controller
{	
	function action_index()
	{
		if(isset($_POST['login']) && isset($_POST['password']))
		{
			$login = $_POST['login'];
			$password =$_POST['password'];

			$this->model = new Model_Main($login, $password);
			
			if($this->model->IsAuthorized())
			{
				$data["login_status"] = "<p>Доступ разрешен</p>";
				session_start();
				echo $_SESSION[$login];
				$_SESSION[$login] = true;
				header('Location:/scud/');
			}
			else
			{
				$data["login_status"] = "<p style='color: red;'>Вы ввели неверную пару логин/пароль</p>";
			}
		}
		else
		{
			$data["login_status"] = "";
		}
		$this->view->generate('main_view.html', 'template_view.html', $data);
	}
}
?>