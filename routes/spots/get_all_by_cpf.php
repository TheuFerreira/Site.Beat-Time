<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';

$cpf = $_POST['cpf'];

$daoSpot = new DAOSpot();
$result = $daoSpot->getAllByCPF($cpf);

echo json_encode($result);
?>