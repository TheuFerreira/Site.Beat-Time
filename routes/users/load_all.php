<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$daoUser = new DAOUser();
$users = $daoUser->getAll();
echo json_encode($users);
?>