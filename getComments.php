<?php 

//Connect to database
$user = 'root';
$pass = '';
$db   = 'validcake';
$path = 'localhost';
$db_conn = mysql_connect($path, $user, $pass);
if (!mysql_select_db($db, $db_conn))
{
	echo json_encode(array('status' => 'error', 'message' => 'Error connecting to database'));
	exit;
} 

//Build the query
$query = "SELECT * FROM `comments` ORDER BY `created` DESC LIMIT 25";

//Query the database
$result = mysql_query($query);
if (!$result)
{
	echo json_encode(array('status' => 'error', 'message' => 'Error retrieving comments'));
	exit;	
} 

$result_arr = res2arr($result);

//Return success and the data
echo json_encode(array('status' => 'success', 'data' => $result_arr));
exit;

/**
 * Turns a mysql resource handle to an array
 */
function res2arr($handle)
{
	$results = array();
	while ($row = mysql_fetch_assoc($handle))
	{
		$row['created'] = date('D, M j, Y g:ia', strtotime($row['created']));
		$row['gravatar_url'] = 'http://gravatar.com/avatar/'.md5(trim(strtolower($row['email']))).'?d=404&s=60';
		unset($row['email']);
		
		//Check if gravatar exists
		$headers = get_headers($row['gravatar_url']);
		if (strpos($headers[0], '404') !== false)
			$row['gravatar_url'] = '';
		
		$results[] = $row;	
	}
	return $results;
}
?>