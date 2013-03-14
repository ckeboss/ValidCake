<?php 
date_default_timezone_set('America/Chicago');

//Connect to database
include('database.php');

//Build the comment
$comment = array('name' => sanitize($_POST['name']), 'email' => $_POST['email'], 'comment' => sanitize($_POST['comment']), 'created' => date('Y-m-d H:i:s'));

//Build the query
$query = sprintf(
	"INSERT INTO `comments` SET `name` = '%s', `email` = '%s', `comment` = '%s', `created` = '%s';",
	mysql_real_escape_string($comment['name']),
	mysql_real_escape_string($comment['email']),
	mysql_real_escape_string($comment['comment']),
	mysql_real_escape_string($comment['created'])
);

//Validate the comment, return errors if there are any
$validation = validate($comment);
if (!empty($validation))
{
	echo json_encode(array('status' => 'error', 'data' => $validation));
	exit;
}

//Query the database
if (!mysql_query($query)) 
{
	echo json_encode(array('status' => 'error', 'message' => 'Error saving the comment'));
	exit;
}

$comment['created'] = date('D, M j, Y g:ia', strtotime($comment['created']));
$comment['gravatar_url'] = 'http://gravatar.com/avatar/'.md5(trim(strtolower($comment['email']))).'?d=404&s=60';

//Check if gravatar exists
$headers = get_headers($comment['gravatar_url']);
if (strpos($headers[0], '404') !== false)
	$comment['gravatar_url'] = '';

//Return success
echo json_encode(array('status' => 'success', 'data' => $comment));
exit;

/**
 * Validates a comment
 */
function validate($comment)
{
	$email_regex = "/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,4}|museum|travel)$/i";
	$errors = array();
	if (strlen($comment['name']) < 2 or strlen($comment['name']) > 26) $errors['name'] = 'Between 2 and 26 chars';
	if (!preg_match($email_regex, $comment['email']) and $comment['email'] != '') $errors['email'] = 'Valid Email, plz';
	if (strlen($comment['comment']) < 10 or strlen($comment['comment']) > 255) $errors['comment'] = 'Between 10 and 255 chars';
	return $errors;
}

function sanitize($string)
{
	return nl2br(trim(preg_replace("/\n+/", "\n", htmlspecialchars($string))));
}
?>