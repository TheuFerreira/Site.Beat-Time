<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$cpf = $_POST['cpf'];

$daoUser = new DAOUser();
$result = $daoUser->getUser($cpf);

if ($result[0]['file_name'] != null)
    $result[0]['file_name'] = "uploads/" . $result[0]['file_name'];

echo json_encode($result);
?>