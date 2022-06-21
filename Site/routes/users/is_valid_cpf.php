<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';

$cpf = $_POST['cpf'];

$daoUser = new DAOUser();
$result = $daoUser->isValidCPF($cpf);

echo json_encode($result);
?>