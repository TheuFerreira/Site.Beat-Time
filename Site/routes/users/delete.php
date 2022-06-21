<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOUser.php';
require '../../database/model/User.php';

$cpf = $_POST['cpf'];

$user = new User();
$user->setCPF($cpf);

$daoUser = new DAOUser();
$result = $daoUser->delete($user);
echo $result;
?>