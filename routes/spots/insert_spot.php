<?php
require '../../database/dao/Connection.php';
require '../../database/dao/DAOSpot.php';
require '../../database/model/Spot.php';

$cpf = $_POST['cpf'];
$date = $_POST['date'];
$typeSpot = $_POST['type_spot'];

$spot = new Spot();
$spot->setDate($date);
$spot->setCPF($cpf);
$spot->setTypeSpot($typeSpot);

$daoSpot = new DAOSpot();
$result = $daoSpot->insert($spot);

echo json_encode($result);
?>