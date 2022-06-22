<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, DELETE");

require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$daoUser = new DAOUser();
$result = $daoUser->login($username, $password);

echo json_encode($result);
?>