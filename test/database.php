<?php
if ($_SERVER['SystemRoot'] == 'C:\\Windows')
{
	define('DB_USER', 'root');
	define('DB_PASS', '');
	define('DB_NAME', 'validcake');
	define('DB_HOST', 'localhost');
}
else
{
	define('DB_USER', 'trevorsg_admin');
	define('DB_PASS', 'iamasdf');
	define('DB_NAME', 'trevorsg_validcake');
	define('DB_HOST', 'localhost');
}

$db_conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if (!mysql_select_db(DB_NAME, $db_conn))
{
	echo json_encode(array('status' => 'error', 'message' => 'Error connecting to database'));
	exit;
} 
?>