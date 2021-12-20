<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$userName = $_POST['user_name'];

$daoUser = new DAOUser();
$result = $daoUser->isValidUserName($userName);

echo json_encode($result);
?>